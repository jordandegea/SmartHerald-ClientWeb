/* global Parse */

import React from 'react';
import Router from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import Parse from "parse"


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
    return <div className="col-md-4 col-md-offset-4">

        <div className="text-center">
          <h1 className="login-brand-text">SB Admin React</h1>
          <h3 className="text-muted">Created by <a href="http://startreact.com">StartReact.com</a> team</h3>
        </div>

        <Panel header={<h3>Please Sign In</h3>} className="login-panel">

          <form role="form" onSubmit={this.handleLogin}>
            <fieldset>
              <div className="form-group">
                <Input onChange={this.setLoginID} className="form-control" placeholder="Username" ref="loginID" type="text" autofocus="" name="name" />
              </div>

              <div className="form-group">
                <Input onChange={this.setPassword} className="form-control" placeholder="Password" ref="password" type="password" name="password" />
              </div>
              <Input type="checkbox" label="Remember Me" />
              <Button type="submit" bsSize="large" bsStyle="success" block>Login</Button>
              
            </fieldset>
          </form>

        </Panel>
        
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

  changeServiceOfUser: function(service){
     var ServiceParseObject = Parse.Object.extend("Service");
        var query = new Parse.Query(ServiceParseObject);
        query.get(service.objectId, {
          success: function(service) {
            Parse.User.current().set("defaultService", service);
            user.save(null, {
              success: function(user) {
                // This succeeds, since the user was authenticated on the device

                // Get the user from a non-authenticated method
                var query = new Parse.Query(Parse.User);
                query.get(user.objectId, {
                  success: function(userAgain) {

                  }
                });
              }
            });
          },
            error: function(object, error) {
                console.log(error);

            }
        });
  },

  handleLogin: function(e){
    
    e.stopPropagation();
    e.preventDefault();
    
    var self = this;
    Parse.User.logIn(this.state.loginID, this.state.password, {
        success: function(user) {
        console.log(user);
        console.log(user.get("defaultService"));
        if ( user.get("defaultService") == undefined){
            
        }else{
            self.transitionTo('dashboard');
        }
      },
      error: function(user, error) {
          console.log(error);
      }
    }
    );

  }

});

export default LoginPage;