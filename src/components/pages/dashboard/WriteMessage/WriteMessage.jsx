/* global CounterPart */

import React, { PropTypes, Component } from 'react';
import {NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button, Input, Col, Row} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import ReactQuill from 'react-quill';
import ReactDOM from 'react-dom';
import RawHtml from "react-raw-html"

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

var Frame = React.createClass({

  render: function() {
    return <iframe />;
  },
  componentDidMount: function() {
    this.renderFrameContents();
  },
  renderFrameContents: function() {
    var doc = this.getDOMNode().contentDocument
    if(doc.readyState === 'complete') {
       ReactDOM.render(this.props.children, doc.body);
    } else {
       setTimeout(this.renderFrameContents, 0);
    }
  },
  componentDidUpdate: function() {
    this.renderFrameContents();
  },
  componentWillUnmount: function() {
    React.unmountComponentAtNode(this.getDOMNode().contentDocument.body);
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
  },

  handleSubmit: function(e){
    
    e.stopPropagation();
    e.preventDefault();
    
    var self = this;
    var service = this.props.service.service; 
    if ( this.state.messageObject === null ){
      /* Create a message
       * @param request.user
       * @param request.params.serviceId
       * @param request.params.summary
       * @param request.params.content */
      Parse.Cloud.run('write_message', 
      { 
        summary: this.state.summary, 
        content: this.state.content, 
        serviceId: service.id 
      }).then(
        function(object) {
          self.transitionTo('dashboard.messages', this.props);
          /*
          var datas = JSON.parse(object);
          var Message = Parse.Object.extend("Message");
          self.state.messageObject = new Message();
          self.state.messageObject.id = datas.messageId;
          self.state.messageObject.fetch();
          */
        },
        function(service, error) {
          alert('Failed to edit object, with error code: ' + error.message);
        }
      );
    }else{
      /* Edit the message 
       * @param request.user
       * @param request.params.serviceId
       * @param request.params.messageId
       * @param request.params.summary
       * @param request.params.content */
      var message = this.state.messageObject ;

      Parse.Cloud.run('edit_message', 
      { 
        summary: this.state.summary, 
        content: this.state.content, 
        serviceId: service.id,
        messageId: message.id
      }).then(
        function(object) {
          /*
          var Message = Parse.Object.extend("Message");
          self.state.messageObject = new Message();
          self.state.messageObject.id = messageId;
          self.state.messageObject.fetch();
          */
          self.transitionTo('dashboard.messages', this.props);
        },
        function(service, error) {
          alert('Failed to edit object, with error code: ' + error.message);
        }
      );
      
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
            <Panel header={<span>Edition</span>} >
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

          <div className="col-lg-6">
            <Panel header={<span>Preview</span>} >
              <div className="row">
                <div className="col-sm-12">
                  <form role="form" onSubmit={this.handleSend}>
                    <div className="form-group">
                      <Frame >
                      <div>
                         <RawHtml.div>{this.state.content}</RawHtml.div>
                      </div>
                      </Frame>
                    </div>
                    <Button bsStyle="primary pull-right" type="submit" >Send Message</Button>
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