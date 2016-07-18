/* global Parse */

import React from 'react';
import Router from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import Parse from "parse"


var RegisterPage = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function(){
    return {
    };
  },


  render: function(){
    return <div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">

        <div className="text-center">
          <h1 className="login-brand-text">SharedNews: Registration Completed</h1>
        </div>


        <Panel className="login-panel">
         Thank you for your subscription. You will receive an email to confirm the creation as soon as possible. 
        </Panel>
        
      </div>
      

  },


});

export default RegisterPage;