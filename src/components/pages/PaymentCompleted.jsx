/* global Parse */

import React from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import Parse from "parse";
import cookie from 'react-cookie';


var PaymentCompletedPage = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function(){
    return {
      token: cookie.load('paiement_token'),
      progress:true,
      success:false,
      message:''
    };
  },

  componentDidMount(){
    if ( typeof(this.state.token) != "undefined" ){
      this.setState({
        progress:false,
        success:false,
        message:"No paiement token received. No paiement proceed. "
      });
    }else{
      var self = this;

      Parse.Cloud.run(
        'paiement_check', 
        { 
          paiement_token: this.state.token,
          sandbox:false
        }).then(
          function(object){
            self.setState({
              progress:false,
              success:true
            });
            console.log(object);
          },
          function(error){
            self.setState({
              progress:false,
              success:false
            });
            console.log(error);
          }
        );
    }
  },

  render: function(){
    return <div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">

        <div className="text-center">
        { (this.state.progress) ?<h1 className="login-brand-text">Smart Herald: Payment in progress</h1>:null}
        { (!this.state.progress && this.state.success) ? <h1 className="login-brand-text">Smart Herald: Payment completed</h1>:null}
        { (!this.state.progress && !this.state.success) ?<h1 className="login-brand-text">Smart Herald: failure</h1>:null}
        </div>


        <Panel className={this.state.progress ? 'login-panel' :'hidden' } >
          Checking paiement...
        </Panel>
        <Panel className={(!this.state.progress && this.state.success) ? 'login-panel' :'hidden' } >
          Thank you for your purchase.  You can log in. 
        </Panel>
        <Panel className={(!this.state.progress && !this.state.success) ? 'login-panel' :'hidden' } >
          Payment failed. An email has been sent to the administrator. <br /><br />
          <Link to="login"><Button bsSize="large" bsStyle="primary" block>Retry</Button></Link>
        </Panel>
          <br /><br />
          <Link to="login"><Button bsSize="large" bsStyle="success" block>Login Page </Button></Link>
        
      </div>
      

  },


});

export default PaymentCompletedPage;