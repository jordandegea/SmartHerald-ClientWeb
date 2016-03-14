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
    return {
      messageObject:null,
      summary:"",
      content:""
    };
  },
  
  onContentChange: function(value) {
    this.setState({ content:value });
  },
  
  onSummaryChange: function(value) {
    this.setState({ summary:value });
  },
  
  handleSubmit: function(e){
    
    e.stopPropagation();
    e.preventDefault();
    
    var self = this;
    
          console.log("mog");
    if ( this.state.messageObject === null ){
      var Message = Parse.Object.extend("Message");
      var message = new Message();

          console.log("mog2");
      message.set("summary", this.state.summary);
      message.set("content", this.state.content);
      message.set("service", Parse.User.current().attributes.defaultService);
      
          console.log("mog3");
      message.save(null, {
        success: function(message) {
          console.log("mog4");
          // Execute any logic that should take place after the object is saved.
          alert('New object created with objectId: ' + message.id);
          console.log(message);
        },
        error: function(message, error) {
          console.log("mog5");
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });
    }

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
                    <Input type="textarea" label="Summary" rows="2" onChange={this.onSummaryChange}/>
                    
                    <div className="form-group">
                      <label className="control-label">Content</label>
                    
                      <ReactQuill theme="snow"
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