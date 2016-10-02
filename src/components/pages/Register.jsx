/* global Parse */

import React from 'react';
import Router from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import Parse from "parse";
import cookie from 'react-cookie';


var RegisterPage = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function(){
    return {
      price:null,
      username: '',
      password: '',
      email:'',
      name:cookie.load('register_name'),
      description:cookie.load('register_description'),
      website:cookie.load('register_website'),
      employees:cookie.load('register_employees'),
      clients:cookie.load('register_clients'),
      error:'',
      free_access:false,
      free_access_code:"",
      step:1,
      checked: false,
      checking: true,
      register: false
    };
  },


  componentDidMount(){
    var self = this;
    var query = new Parse.Query('Package');
    query.equalTo("canonicalName", "creation");
    query.first().then(
      function(object) {
        self.setState({price:object.get("price")});
      },
      function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    );
  },

  render: function(){
    return <div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">

        <div className="text-center">
          <h1 className="login-brand-text">Smart Herald: Create your access</h1>
          <h3 className="text-muted">Created by <a href="http://sinenco.com">sinenco.com</a></h3>
        </div>


        <Panel className="login-panel">
          { (this.state.error != '')?
          <div className="alert alert-warning alert-dismissible" role="alert">
            {this.state.error}
          </div>
          : null }

          <form role="form" onSubmit={this.handleSubmit}>
            <fieldset className={(this.state.step==1) ? '' :'hidden' } >
              <div className="form-group">
                <Input 
                    onChange={this.setUsername} className="form-control" 
                    autoComplete={"off"} autoCorrect={"off"} 
                    autoCapitalize={"off"} spellCheck={false} 
                    placeholder="Username" ref="loginID" 
                    type="text" autofocus="" 
                    name="name" />
              </div>

              <div className="form-group">
                <Input onChange={this.setPassword} className="form-control" placeholder="Password" ref="password" type="password" name="password" />
              </div>

              <div className={this.state.register ? 'form-group' :'hidden' }>
                <Input onChange={this.setEmail} className="form-control" placeholder="Email" ref="email" type="email" name="email" />
              </div>

              <Button onClick={this.setRegisterFalse} type="submit" bsSize="large" bsStyle="primary" block>Log In</Button>
              <Button onClick={this.setRegisterTrue} type="submit" bsSize="large" bsStyle="primary" block>Register</Button>

            </fieldset>
            <fieldset className={(this.state.step==2)  ? '' :'hidden' } >
              
              <div className="form-group">
                <Input 
                    onChange={this.setName} className="form-control" 
                    autoComplete={"off"} autoCorrect={"off"} 
                    autoCapitalize={"off"} spellCheck={false} 
                    value={this.state.name}
                    placeholder="Company Name" ref="name" 
                    type="text" autofocus="" 
                    name="description" />
              </div>
              
              <div className="form-group">
                <Input 
                    onChange={this.setDescription} className="form-control" 
                    autoComplete={"off"} autoCorrect={"off"} 
                    autoCapitalize={"off"} spellCheck={false} 
                    value={this.state.description}
                    placeholder="Description" ref="description" 
                    type="text" autofocus="" 
                    name="description" />
              </div>

              <br />
              <small>For statistics and contracts purpose, please fill the following information with rounded values. </small>
              <div className="form-group">
                <Input 
                    onChange={this.setWebsite} className="form-control" 
                    autoComplete={"off"} autoCorrect={"off"} 
                    autoCapitalize={"off"} spellCheck={false} 
                    placeholder="Website address" ref="website" 
                    value={this.state.website}
                    type="text" autofocus="" 
                    name="website" />
              </div>
              <div className="form-group">
                <Input 
                    onChange={this.setEmployees} className="form-control" 
                    autoComplete={"off"} autoCorrect={"off"} 
                    autoCapitalize={"off"} spellCheck={false} 
                    placeholder="Number of employees" ref="employees" 
                    value={this.state.employees}
                    type="text" autofocus="" 
                    name="employees" />
              </div>
              <div className="form-group">
                <Input 
                    onChange={this.setClients} className="form-control" 
                    autoComplete={"off"} autoCorrect={"off"} 
                    autoCapitalize={"off"} spellCheck={false} 
                    placeholder="Number of clients" ref="clients" 
                    value={this.state.clients}
                    type="text" autofocus="" 
                    name="clients" />
              </div>
              
              <Button type="submit" bsSize="large" bsStyle="primary" block>Check availability</Button>
              <br />
              <Button onClick={this.setStepToPrevious} type="submit" bsSize="small" bsStyle="warning" block>Previous</Button>

            </fieldset>
            <fieldset className={(this.state.step==3)  ? '' :'hidden' } >
              <div className="well">
                <div className="form-group">
                  <Input 
                      onChange={this.setFreeAccessCode} className="form-control" 
                      autoComplete={"off"} autoCorrect={"off"} 
                      autoCapitalize={"off"} spellCheck={false} 
                      placeholder="Free access code" ref="free_access_code" 
                      type="text" autofocus="" 
                      name="free_access_code" />
                </div>
                <Button onClick={this.setFreeAccessTrue} type="submit" bsSize="large" bsStyle="success" block>Check free access code</Button>
              </div>
              <br />

              <Button onClick={this.setFreeAccessFalse} type="submit" bsSize="large" bsStyle="success" block>Or by Paypal - {this.state.price} EUR</Button>
              <br /> 
              <Button onClick={this.setStepToPrevious} type="submit" bsSize="small" bsStyle="warning" block>Previous</Button>
              
            </fieldset>
          </form>

        </Panel>
        
      </div>
      

  },


  setStepToPrevious:function(e){
    if (this.state.step == 1){
      return;
    }
    this.setState({
      step:this.state.step-1
    });
    e.stopPropagation();
    e.preventDefault();
  },
  setCheckingStateFalse: function(e) {
    this.setState({
      checking:false
    });
  },
  setCheckingStateTrue: function(e) {
    this.setState({
      checking:true
    });
  }, 
  setFreeAccessFalse: function(e) {
    this.setState({
      free_access:false
    });
  },
  setFreeAccessTrue: function(e) {
    this.setState({
      free_access:true
    });
  }, 
  setRegisterFalse: function(e) {
    if ( this.state.register == true){
      this.setState({
        register:false
      });
      e.stopPropagation();
      e.preventDefault();
    }
  },
  setRegisterTrue: function(e) {
    if ( this.state.register == false){
      this.setState({
        register:true
      });
      e.stopPropagation();
      e.preventDefault();
    }
  },

  setFreeAccessCode: function(e) {
    this.setState({
      free_access_code:e.target.value
    });
  }, 

  setUsername: function(e) {
    this.setState({
      username: e.target.value
    });
  },

  setPassword: function(e) {
    this.setState({
      password: e.target.value
    });
  },

  setEmail: function(e) {
    this.setState({
      email: e.target.value
    });
  },

  setName: function(e) {
    this.setState({
      name: e.target.value
    });
  },

  setDescription: function(e) {
    this.setState({
      description: e.target.value
    });
  },

  setWebsite: function(e) {
    this.setState({
      website: e.target.value
    });
  },

  setEmployees: function(e) {
    this.setState({
      employees: e.target.value
    });
  },

  setClients: function(e) {
    this.setState({
      clients: e.target.value
    });
  },


  handleSubmit: function(e){
    e.stopPropagation();
    e.preventDefault();
    
    var self = this;
    if (this.state.step == 1){
      if (this.state.register){

          var user = new Parse.User();
          user.set("username", self.state.username);
          user.set("password", self.state.password);
          user.set("email", self.state.email);

          return user.signUp().then(
            function(user) {
              self.setState({step: 2});
            },
            function(error) {
              self.setState({
                  error:'Impossible to register, try a new account name'
              });
              self.setState({register: true});
            }
          ); 
      }else{
        Parse.User.logIn(this.state.username, this.state.password)
        .then(
          function(user) {
              self.setState({step: 2});
          },
          function(error) {
            self.setState({
                error:error.message
            });
          });
      }
    }else if(this.state.step == 2){

      var canonicalName = self.state.name;
      canonicalName = canonicalName.toLowerCase();
      canonicalName = canonicalName.replace(" ","+");
      if (canonicalName.length > 2){
        var queryCanonicalName = new Parse.Query('Service');
        queryCanonicalName.equalTo("canonicalName", canonicalName);
        var queryName = new Parse.Query('Service');
        queryName.equalTo("name", self.state.name);
        var mainQuery = Parse.Query.or(queryCanonicalName, queryName);
      }else{
          self.setState({
              error:'The name of your company is too short'
          });
          throw new Error("", 666);
      }

      cookie.save('register_name', self.state.name, { path: '/' });
      cookie.save('register_description', self.state.description, { path: '/' });
      cookie.save('register_website', self.state.website, { path: '/' });
      cookie.save('register_employees', self.state.employees, { path: '/' });
      cookie.save('register_clients', self.state.clients, { path: '/' });

      return mainQuery.count()
      .then(
        function(number){
          if(number == 0){
            self.setState({step: 3});
          }else{
            self.setState({
                error:'A company with this name already exists. Il you own this company, contact us: admin@sinenco.com'
            });
            throw new Error("", 666);
          }
        }
      );

    }else if (this.state.step == 3){

      if (this.state.free_access){
        return Parse.Cloud.run(
          'creation_free_access', 
          { 
            packageName: "creation",
            name:self.state.name,
            description: self.state.description,
            website:self.state.website,
            employees:self.state.employees,
            clients:self.state.clients,
            access_code:self.state.free_access_code,
            sandbox:false
          })
          .then(
            function(response){
              var object = JSON.parse(response);
              cookie.save('paiement_token', object["token"], { path: '/' });
              //self.transitionTo('payment_complete', this.props);
            },
            function(error){
              self.setState({
                  error:'wrong access code'
              });
            }
          );
        
      }else{
        return Parse.Cloud.run(
          'paypal_set_express_checkout', 
          { 
            packageName: "creation",
            name:self.state.name,
            description: self.state.description,
            website:self.state.website,
            employees:self.state.employees,
            clients:self.state.clients,
            sandbox:false
          })
          .then(
            function(response){
              var object = JSON.parse(response);
              self.setState({
                  error:'If nothing happens, use this url: '+object["url"]+''
              });
              cookie.save('paiement_token', object["token"], { path: '/' });
              window.location.href = object["url"];
            },
            function(error){
              console.log(error);
            }
          );
        }
      }
  }

});

export default RegisterPage;