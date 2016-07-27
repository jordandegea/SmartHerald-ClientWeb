/* global CounterPart */

import React, { PropTypes, Component } from 'react';
import {Alert, Input, NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import ReactQuill from 'react-quill';

import Parse from "parse";
import ParseReact from "parse-react";


import CounterPart from 'counterpart';
import Translate from 'react-translate-component';
import cookie from 'react-cookie';


var PackageInformationBlock = React.createClass({

  getInitialState: function() {
    return {
      token: cookie.load('paiement_token'),
      pack:null,
      packs:[],
      message:''
    };
  },
  
  
  componentDidMount: function() {
    var self = this;
    var query = new Parse.Query('Package');
    query.equalTo("type", "messagesusers");
    query.ascending("price");
    query.find({
      success: function(results) {
        self.state.packs = results;
        self.forceUpdate();
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },

  handleSubmit: function(e){ 
    e.stopPropagation();
    e.preventDefault();
    
    var self = this;

    var service = this.props.service.service ;
    Parse.Cloud.run('change_description', 
      { 
        description: service.get("description"), 
        serviceId: service.id 
      }).then(function(service) {
        //self.state.messageObject = message ;
        // Execute any logic that should take place after the object is saved.
        alert('Description changed: ' + service.id);
      },
      function(service, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to edit object, with error code: ' + error.message);
      }
    );
  },

  onPackageSelected :function(pack, type){
    console.log(pack);
    console.log(type);
    var self = this;
    var service = this.props.service.service ;

    if (type == "messagesusers"){
      this.setState({message:"Creating payment. You will be redirected soon. "});
      return Parse.Cloud.run(
        'paypal_set_express_checkout', 
        { 
          packageName: pack,
          serviceId:service.id,
          sandbox:false
        }).then(
          function(response){
            var object = JSON.parse(response);
            self.setState({
                message:'You should be redirect soon. If nothing happens, use this url: '+object["url"]+''
            });
            cookie.save('paiement_token', object["token"], { path: '/' });
            window.location.href = object["url"];
          },
          function(error){

          }
        );
    }
  },
  
  render: function() {

    return (
      <div className="col-xs-12">
        <Alert bsStyle="warning">
          Prices are not fixed yet. We are calculating the most suitable price for each option. 
        </Alert>

        {(this.state.message != '')?<div className="row">
              <Alert bsStyle="warning">
                {this.state.message} 
              </Alert>
            </div>:null
        }
        <div className="row">
          <div className="col-xs-12">
            <PageHeader>Add messages users</PageHeader>
          </div>
        </div>

        <div className="row">   
        {
          this.state.packs.map(function(c) {
            return (<div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <StatWidget style="primary"
                        icon="fa fa-paper-plane fa-3x"
                        count={c.get("values")["messagesusers"]}
                        headerText="Messages Users remaining" 
                        footerText={c.get('price')+" EUR"}
                        onClick={this.onPackageSelected.bind(this, c.get("canonicalName"), c.get("type"))} />
              </div>);
          },this)
        }
        </div>

      </div>
    );
  }

});


var Package = React.createClass({

  render: function() {
    return (
      <div>        
        <PackageInformationBlock  {...this.props}  />
      </div>
    );
  }

});

export default Package;