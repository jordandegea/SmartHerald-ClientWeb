/* global Parse */

import React from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import Parse from "parse";


var LoginPage = React.createClass({

  getInitialState: function(){
    return {
      loginID: '',
      password: '',
      isSubmitted: false
    };
  },

  mixins: [Router.Navigation],

  render: function(){
    return <div>
      <div className="col-xs-12 col-md-10 col-md-offset-1">
        
        <div className="alert alert-warning alert-dismissible" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <p>By continuing to browse this site, you consent to set cookies to audience measurement purposes. No information will be sent to advertisers. </p>
        </div>
      
      </div>

      <div className="col-xs-12 col-md-4 col-md-offset-4">
        
        <div className="text-center">
          <h1 className="login-brand-text">Smart Herald: Client Dashboard</h1>
          <h3 className="text-muted">Created by <a href="http://sinenco.com">sinenco.com</a></h3>
        </div>

        <Panel header={<h3>Please Sign In</h3>} className="login-panel">

          <form role="form" onSubmit={this.handleLogin}>
            <fieldset>
              <div className="form-group">
                <Input 
                    onChange={this.setLoginID} className="form-control" 
                    autoComplete={"off"} autoCorrect={"off"} 
                    autoCapitalize={"off"} spellCheck={false} 
                    placeholder="Username" ref="loginID" 
                    type="text" autofocus="" 
                    name="name" />
              </div>

              <div className="form-group">
                <Input onChange={this.setPassword} className="form-control" placeholder="Password" ref="password" type="password" name="password" />
              </div>
              <Input type="checkbox" label="Remember Me" />
              <Button type="submit" bsSize="large" bsStyle="success" block>Login</Button>
              <br />
              <Link to="register"><Button bsSize="large" bsStyle="primary" block>Create your access</Button></Link>
              
            </fieldset>
          </form>

        </Panel>
        
      </div>
    </div>
      

  },

  setLoginID: function(e) {

    this.setState({
      loginID: e.target.value,
      loginError: ''
    });

  },

  setPassword: function(e) {

    this.setState({
      password: e.target.value,
      loginError: ''
    });

  },

  handleLogin: function(e){
    e.stopPropagation();
    e.preventDefault();
    
    var self = this;
    Parse.User.logIn(this.state.loginID, this.state.password, {
      success: function(user) {
        /* Check if services exists */
        var ServiceParseObject = Parse.Object.extend("ServicesOwners");
        var query = new Parse.Query(ServiceParseObject);
        query.include("service");
        query.find({
          success: function(objects) {
            if ( objects.length > 0 ){
                self.props.service.service = objects[0].get("service");
                self.transitionTo('dashboard.overview', this.props);
            }else{
              console.log("No service owned");
            }
          },
          error: function(object, error) {
                console.log(error);
            }
        })
      },
      error: function(user, error) {
          console.log(error);
      }
    }
    );

  }

});

export default LoginPage;