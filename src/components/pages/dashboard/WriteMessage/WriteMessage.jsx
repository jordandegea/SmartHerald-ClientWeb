/* global CounterPart */

import React, { PropTypes, Component } from 'react';
import {NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button, Input, Col, Row} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";


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
                    
                    <Input type="textarea" id="theeditable" label="Content of your message" rows="10" />
                    
                    <Button bsStyle="primary" type="submit" disabled>Disabled Button</Button>
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