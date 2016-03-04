/* global CounterPart */

import React, { PropTypes, Component } from 'react';
import {NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button} from "react-bootstrap";

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

var Messages = React.createClass({

  render: function() {
    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Messages</PageHeader>
          </div>
        </div>

        <div className="row">    
          <Translate {...this.props} content="example.greeting" />
        </div>

      </div>
    );
  }

});

export default Messages;