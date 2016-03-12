/* global CounterPart */

import React, { PropTypes, Component } from 'react';
import {NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button, Input, Col, Row} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import ReactQuill from 'react-quill';

import CounterPart from 'counterpart';
import Translate from 'react-translate-component';

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
    return {text:""};
  },
  onTextChange: function(value) {
    this.setState({ text:value });
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
                  <form>
                    <Input type="textarea" label="Summary" rows="2" />
                    
                    <div className="form-group">
                      <label className="control-label">Content</label>
                    
                      <ReactQuill theme="snow"
                          onChange={this.onTextChange} >
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