/* global CounterPart */

import React, { PropTypes, Component } from 'react';
import {Input, NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import ReactQuill from 'react-quill';

import Parse from "parse";
import Router, { Link, RouteHandler } from "react-router";
import ParseReact from "parse-react";


import CounterPart from 'counterpart';
import Translate from 'react-translate-component';


var ServiceInformationBlock = React.createClass({

  getInitialState: function() {
    return {
      description:this.props.service.service.attributes.description
    };
  },
  
  onDescriptionChange: function(value) {
    this.setState({ description:value });
  },
  
  handleSubmit: function(e){
    
    e.stopPropagation();
    e.preventDefault();
    
    var self = this;

    var service = this.props.service.service ;
    Parse.Cloud.run('change_description', 
      { 
        description: this.state.description, 
        serviceId: service.id 
      }).then(function(service) {
        console.log(service);
        //self.state.messageObject = message ;
        // Execute any logic that should take place after the object is saved.
        //alert('Description changed: ' + service.id);
      },
      function(service, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to edit object, with error code: ' + error.message);
      }
    );
  },
  
  render: function() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-xs-6">

        <div className="row">
          <div className="col-xs-12">
            <PageHeader>Your information</PageHeader>
          </div>
        </div>

        <div className="row">    
          <div className="col-xs-12">
            <Panel>
              <div className="row">
                <div className="col-sm-12">
                  <h3>{this.props.service.service.attributes.name}</h3>
                  <form role="form" onSubmit={this.handleSubmit}>
                    
                    <div className="form-group">
                      <textarea  className="form-control" onChange={this.onDescriptionChange} placeholder="Description">{this.state.description}</textarea>
                    </div>
                    
                    <Button bsStyle="primary" type="submit" >Save Information</Button>
                  </form>
                </div>
              </div>
            </Panel>
          </div>
        </div>

      </div>
    );
  }

});

var ServiceStatsBlock = React.createClass({
  
   getInitialState() {
    var self = this ;
    var service = this.props.service.service ;
    console.log(service);
    var serviceConfiguration = service.get('configuration');
    serviceConfiguration.fetch().then(
        function(object) {
          self.setState({
            messagesUsers: object.get("messagesUsers"),
            users: object.get("subscriptions")
          });
        },
        function(error){
          alert("Impossible to retrieve information, please contact us");
        }
    );
    return {
      messagesUsers : "...",
      users : "..."
    };
  },
  
  render: function() {
    return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div className="row">
            <div className="col-lg-12">
              <PageHeader>Stats</PageHeader>
            </div>
          </div>

          <div className="col-xs-12 col-lg-6">
            <StatWidget style="primary"
                    icon="fa fa-paper-plane fa-4x"
                    count={this.state.messagesUsers}
                    headerText="Messages remaining" 
                    footerText="Upgrade package"
                    linkTo="dashboard.packages" />
          </div>
          <div className="col-xs-12 col-lg-6">
            <StatWidget style = "panel-green"
                    icon = "fa fa-users fa-3x"
                    count = {this.state.users}
                    headerText="Users" />
          </div>

        </div>
      );
    }
});



var ServiceOptionsBlock = React.createClass({
  
   getInitialState() {
    var self = this ;
    var service = this.props.service.service ;

    var serviceConfiguration = service.get('configuration');
    serviceConfiguration.fetch().then(
        function(object) {
          self.setState({
            loading:false,
            iOSStandalone: serviceConfiguration.get("iOSStandalone"),
            iOSStandaloneExpire: serviceConfiguration.get("iOSStandaloneExpire")
          });
        },
        function(error){
          alert("Impossible to retrieve information, please contact us");
        }
    );
    return {
      loading:true,
      iOSStandalone:null,
      iOSStandaloneExpire:null
    };
  },
  
  render: function() {
    return (
      <div>
        <div className={this.state.loading?"hidden":"col-xs-12"}>
          <div className="row">
            <div className="col-lg-12">
              <PageHeader>Options</PageHeader>
            </div>
          </div>

          <Panel header={<h3>Standalone iOS App<div className="pull-right">
              <Link to="dashboard.packages"><i className="fa fa-plus fa-fw"></i></Link>
            </div></h3>
            } bsStyle="success">
            { this.state.iOSStandalone ? <span>You are using the iOS Standalone App</span>: <span>Standalone app allows you to have your own app. Contact us for more information. Click on the button to purchase. </span>}
          </Panel>
        </div>

        <div className={ (!this.state.loading)?"hidden":"col-xs-12"}>
          <div className="row">
            <div className="col-lg-12">
              <PageHeader>Loading options...</PageHeader>
            </div>
          </div>
        </div>
      </div>
      );
    }
});

var Overview = React.createClass({

  render: function() {
    return (
      <div>

        <ServiceInformationBlock  {...this.props}  />

        <ServiceStatsBlock  {...this.props}  />
                
        <ServiceOptionsBlock  {...this.props}  />


        <div className="col-xs-12 col-md-6">
          <Panel header={<h3>QRCode to download the Shared Applications</h3>
            } bsStyle="success">
            <a href='http://www.unitag.io/qrcode'>
              <img className="img-responsive" src='http://www.unitag.io/qreator/generate?crs=xnjFkEn%252FP85fCPDXJ%252FXXKnPnKU%252FtWVh9E7ei8Ex%252BR4XsTvus59MiRl4OtJ5Y%252F3aRXopA7Qn4wJ6m3qLfsP4IWv39ocSd3mMczmj1AuyiW6K%252F58n8n8s5NK61vAUi6GUR9QhYs1xUoNWG3PC4owAgU1Q%252FHThW3FIfdeEUqZ%252BlJgc%253D&crd=fhOysE0g3Bah%252BuqXA7NPQ5vKNaWI8m207oHOsyXhdOrqdL%252B70qcSmXjiM9K5oJyJ0mEQSZ5jgNWV4hFyl7Nr98qv66gdiRt1edfB099JF74%253D' alt='QR Code'/>
            </a>
            </Panel>
        </div>

        <div className="col-xs-12 col-md-6">
          <Panel header={<h3>QRCode to download the Standalone Applications</h3>
            } bsStyle="success">
            Not available now
            </Panel>
        </div>

      </div>
    );
  }

});

export default Overview;