/* global CounterPart */

import React, { PropTypes, Component } from 'react';
import {Input, NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import ReactQuill from 'react-quill';

import Parse from "parse";
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
  
  render: function() {
    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Your information</PageHeader>
          </div>
        </div>

        <div className="row">    
          <div className="col-lg-4 col-md-6 col-xs-12">
            <Panel header={<span>{this.props.service.service.attributes.name}</span>} >
              <div className="row">
                <div className="col-sm-12">
                  <form role="form" onSubmit={this.handleSubmit}>
                    
                    <div className="form-group">
                      <label className="control-label">Description</label>
                    
                      <ReactQuill theme="snow"
                          value={this.state.description}
                          onChange={this.onDescriptionChange} >
                        <ReactQuill.Toolbar key="toolbar"
                            ref="toolbar"
                            items={ReactQuill.Toolbar.defaultItems} />
                        <div key="editor"
                            ref="editor"
                            className="quill-contents"
                            style={ {height:200} } />
                     </ReactQuill>
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


var Overview = React.createClass({

  render: function() {
    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Overview</PageHeader>
          </div>
        </div>

        <ServiceInformationBlock  {...this.props}  />
        
            <div className="row">    
          <Translate {...this.props} content="example.greeting" />
        </div>

      </div>
    );
  }

});

export default Overview;