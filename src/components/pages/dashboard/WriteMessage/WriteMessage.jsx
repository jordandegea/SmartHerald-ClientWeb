/* global CounterPart */

import React, { PropTypes, Component } from 'react';
import {NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button, Input, Col, Row} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import ReactQuill from 'react-quill';

import CounterPart from 'counterpart';
import Translate from 'react-translate-component';


import Parse from "parse";
import ParseReact from "parse-react";

CounterPart.registerTranslations('en', {
  example: {
    greeting: 'Hello %(name)s! How are you today?'
  }
});

CounterPart.registerTranslations('de', {
  example: {
    greeting: 'Hallo, %(name)s! Wie geht\'s dir heute so?'
  }
});

var WriteMessage = React.createClass({

  getInitialState: function() {
  
    var self = this;
  
    if (this.props.params.hasOwnProperty("message")){
      var Message = Parse.Object.extend("Message");
      var query = new Parse.Query(Message);
      query.get(this.props.params.message, {
        success: function(message) {
          
            self.setState( { 
              messageObject:message,
              summary:message.attributes.summary,
              content:message.attributes.content
            });
            
            self.forceUpdate();
            
        },
        error: function(message, error) {
            //console.log(error);
        
            self.transitionTo('dashboard.messages');
        }
      });
    }
  
    return {
      messageObject:null,
      summary:"",
      content:""
    };
  },
  
  onContentChange: function(value) {
    this.setState({ content:value });
  },
  
  onSummaryChange: function(e) {
    this.setState({ summary:e.target.value });
  },
  
  handleSubmit: function(e){
    
    e.stopPropagation();
    e.preventDefault();
    
    var self = this;
    var service = this.props.service.service; 
    if ( this.state.messageObject === null ){
      var Message = Parse.Object.extend("Message");
      var message = new Message();

      message.set("summary", this.state.summary);
      message.set("content", this.state.content);
      message.set("service", service);
      
    }else{
      var message = this.state.messageObject ;

      message.set("summary", this.state.summary);
      message.set("content", this.state.content);
      message.set("service", service);
      
    }
    
    message.save(null, {
      success: function(message) {
        self.state.messageObject = message ;
        // Execute any logic that should take place after the object is saved.
        //alert('New object created with objectId: ' + message.id);
        //console.log(message);
      },
      error: function(message, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  },
  
  render: function() {
    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <PageHeader>WriteMessage</PageHeader>
          </div>
        </div>

        <div className="row">    
          <div className="col-lg-6">
            <Panel header={<span>Basic Form Elements</span>} >
              <div className="row">
                <div className="col-sm-12">
                  <form role="form" onSubmit={this.handleSubmit}>
                    <Input type="textarea" label="Summary" rows="2" value={this.state.summary} onChange={this.onSummaryChange}/>
                    
                    <div className="form-group">
                      <label className="control-label">Content</label>
                    
                      <ReactQuill theme="snow"
                        value={this.state.content}
                          onChange={this.onContentChange} >
                        <ReactQuill.Toolbar key="toolbar"
                            ref="toolbar"
                            items={ReactQuill.Toolbar.defaultItems} />
                        <div key="editor"
                            ref="editor"
                            className="quill-contents"
                            style={ {height:400} } />
                     </ReactQuill>
                    </div>
                    
                    <Button bsStyle="primary" type="submit" >Save Message</Button>
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

export default WriteMessage;