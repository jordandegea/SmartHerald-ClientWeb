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
      name:'',
      description:'',
      error:'',
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
        console.log(object);
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
          <h1 className="login-brand-text">SharedNews: Create your access</h1>
          <h3 className="text-muted">Created by <a href="http://sinenco.com">sinenco.com</a></h3>
        </div>


        <Panel className="login-panel">
          { (this.state.error != '')?
          <div className="alert alert-warning alert-dismissible" role="alert">
            {this.state.error}
          </div>
          : null }

          <form role="form" onSubmit={this.handleSubmit}>
            <fieldset>
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

              <br />

              <div className="form-group">
                <Input 
                    onChange={this.setName} className="form-control" 
                    autoComplete={"off"} autoCorrect={"off"} 
                    autoCapitalize={"off"} spellCheck={false} 
                    placeholder="Company Name" ref="name" 
                    type="text" autofocus="" 
                    name="description" />
              </div>
              
              <div className="form-group">
                <Input 
                    onChange={this.setDescription} className="form-control" 
                    autoComplete={"off"} autoCorrect={"off"} 
                    autoCapitalize={"off"} spellCheck={false} 
                    placeholder="Description" ref="description" 
                    type="text" autofocus="" 
                    name="description" />
              </div>

              <Button onClick={this.setCheckingStateTrue} type="submit" bsSize="large" bsStyle="primary" block>Check</Button>
              <br />
              { this.state.checked ?  <Button onClick={this.setCheckingStateFalse} type="submit" bsSize="large" bsStyle="success" block>Create - {this.state.price} EUR</Button>: null }
              
            </fieldset>
          </form>

        </Panel>
        
      </div>
      

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


  handleSubmit: function(e){
    e.stopPropagation();
    e.preventDefault();
    
    this.state.error = 'Checking information';

    var self = this;
    Parse.User.logIn(this.state.username, this.state.password)
    .then(
      function(user) {
          self.setState({register: false});
      },
      function(error) {
        if ( self.state.checking == true){
          self.setState({
              error:'Impossible to login, a new account will be created'
          });
          self.setState({register: true});
        }else{
          var user = new Parse.User();
          user.set("username", self.state.username);
          user.set("password", self.state.password);
          user.set("email", self.state.email);

          return user.signUp(); 
        }
      }
    ).then(
      function(object){
        var canonicalName = self.state.name;
        canonicalName = canonicalName.toLowerCase();
        canonicalName = canonicalName.replace(" ","+");
        if (canonicalName.length > 2){
          var queryCanonicalName = new Parse.Query('Service');
          queryCanonicalName.equalTo("canonicalName", canonicalName);
          var queryName = new Parse.Query('Service');
          queryName.equalTo("name", self.state.name);
          var mainQuery = Parse.Query.or(queryCanonicalName, queryName);
          return mainQuery.count();
        }else{
            self.setState({
                error:'The name of your company is too short'
            });
            throw new Error("", 666);
        }
      }).then(
        function(number){
          if(number == 0){
            if (self.state.checking == false){
              // On crée l'achat
              return Parse.Cloud.run(
                'paypal_set_express_checkout', 
                { 
                  packageName: "creation",
                  name:self.state.name,
                  description: self.state.description,
                  sandbox:false
                });
            }else{
              self.setState({
                  error:'Check Ok, you can continue. ',
                  checked: true
              });
            }
          }else{
            self.setState({
                error:'A company with this name already exists. Il you own this company, contact us: admin@sinenco.com'
            });
            throw new Error("", 666);
          }
        }
      ).then(
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

});

export default RegisterPage;