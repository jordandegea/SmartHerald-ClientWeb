import React from "react";
import Router, { Link, RouteHandler } from "react-router";

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar} from "react-bootstrap";
import $ from "jQuery";
import classNames from "classnames";
import Parse from "parse";
import ParseReact from "parse-react";


/**
 * ServicesListHomePage
 * 
 * Block in the top menu
 * Display all services editable by the client
 */
var ServicesListHomePage = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions

  observe: function() {
    console.log(Parse.User.current().get("services"));
    return {
      services: (new Parse.Query('Service')).equalTo("owner", Parse.User.current())
    };
  },
    
   /* When the client will click on a service. 
    * We change the interface by taking the new service and rerender */ 
  changeServiceOfUser: function(serviceId){
    var self = this ; 
    var ServiceParseObject = Parse.Object.extend("Service");
    var query = new Parse.Query(ServiceParseObject);
    query.get(serviceId, {
      success: function(service) {
        Parse.User.current().set("defaultService", service);
        Parse.User.current().save(null, {
          success: function(user) {
            self.forceUpdate();
          },
            error: function(object, error) {
                // It can be good to add something to display if failed
                console.log(error);
            }
        });
      },
        error: function(object, error) {
            // It can be good to add something to display if failed
            console.log(error);

        }
    });
  },
  
  render: function() {
    // Render the menu with all the services available
    return (
        <NavDropdown title={Parse.User.current().attributes.defaultService.attributes.name} >
        {
            this.data.services.map(function(c) {
            var boundClick = this.changeServiceOfUser.bind(this, c.objectId);
            return (<MenuItem >
                <Link to="dashboard" onClick={boundClick}>
                  <i className="fa fa-user fa-fw"></i>{c.name}
                </Link>
              </MenuItem>);
          }, this)
        }
        </NavDropdown>
      
    );
  }
});

var HomePage = React.createClass({
   mixins: [Router.Navigation],
  
  
  componentWillMount: function() {
    this.setState({Height: $(window).height()});
  },

  componentDidMount: function() {

  },

  componentWillUnmount: function(){
    
    $(window).unbind('resize',this.adjustResize);

  },

  getInitialState: function(){
    
    if ( Parse.User.current() == null ){
      this.transitionTo('login', {});
    }
    
        console.log(Parse.User.current().attributes)
          return {
      uiElementsCollapsed: true,
      chartsElementsCollapsed: true,
      multiLevelDropdownCollapsed: true,
      thirdLevelDropdownCollapsed: true,
      samplePagesCollapsed: true
    };

  },

  toggleMenu: function(){
    if($(".navbar-collapse").hasClass('collapse')){
      $(".navbar-collapse").removeClass('collapse');  
    }
    else{
      $(".navbar-collapse").addClass('collapse');
    }
  },


  render: function() {

    return (
        <div id="wrapper" className="content">

          <Navbar brand={<span><img src={require('../../../common/img/logo.png')} alt="Start React" title="Start React" />
            <span>&nbsp;SB Admin React - Poney</span>
            <a href="http://startreact.com/" title="Start React" rel="home">StartReact.com</a>
            <button type="button" className="navbar-toggle" onClick={this.toggleMenu} style={{position: 'absolute', right: 0, top: 0}}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            </span>} fluid={true}  style={ {margin: 0} }>
            <ul className="nav navbar-top-links navbar-right">
              <Nav style={ {margin: 0} }>
                
                <ServicesListHomePage />
                
                <NavDropdown title={Parse.User.current().attributes.username} >
                  <MenuItem eventKey="1">
                    <i className="fa fa-user fa-fw"></i> User Profile
                  </MenuItem> 
                  <MenuItem eventKey="2">
                    <i className="fa fa-gear fa-fw"></i> Settings
                  </MenuItem> 
                  <MenuItem eventKey="3">
                    <a href="http://www.strapui.com/" onClick={ () => { window.location='http://www.strapui.com/'; } }>
                      <i className="fa fa-eye fa-fw"></i> Premium React Themes
                    </a>
                  </MenuItem> 
                  <MenuItem divider />
                  <MenuItem eventKey="4">
                    <Link to="login">
                      <i className="fa fa-sign-out fa-fw"></i> Logout
                    </Link>
                  </MenuItem>
                </NavDropdown>

              </Nav>
            </ul> 
            <div className="navbar-default sidebar" style={ { 'marginLeft': '-20px' } } role="navigation">
              <div className="sidebar-nav navbar-collapse">
                
                <ul className="nav in" id="side-menu">

                  <li className="sidebar-search">
                    <div className="input-group custom-search-form">
                      <input type="text" className="form-control" placeholder="Search..." />
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button">
                          <i className="fa fa-search"></i>
                        </button>
                      </span>
                    </div>
                  </li>
              
                  <li>
                    <Link to="dashboard.home"><i className="fa fa-dashboard fa-fw"></i> &nbsp;Dashboard</Link>
                  </li>
                        
                  <li className={classNames({'active': !this.state.chartsElementsCollapsed})}>
                    <a href="javascript:void(0)" onClick={ () => { this.setState({chartsElementsCollapsed: !this.state.chartsElementsCollapsed}); return false; } }>
                      <i className="fa fa-bar-chart-o fa-fw"></i> &nbsp;Charts<span className="fa arrow"></span>
                    </a>
                    <ul className={classNames({'nav nav-second-level': true, 'collapse': this.state.chartsElementsCollapsed})}>
                      <li>
                        <Link to="dashboard.flot-charts">Flot Charts</Link>
                      </li>
                      <li>
                        <Link to="dashboard.morrisjs-charts">Morris.js Charts</Link>
                      </li>
                    </ul>
                  </li>
              
                  <li> 
                    <Link to="dashboard.tables"><i className="fa fa-table fa-fw"></i> &nbsp;Tables</Link>
                  </li> 
              
                  <li> 
                    <Link to="dashboard.forms"><i className="fa fa-edit fa-fw"></i> Forms</Link> 
                  </li>
                    
                  <li className={classNames({'active': !this.state.uiElementsCollapsed})}> 
                    <a href="javascript:void(0)" onClick={ () => { this.setState({uiElementsCollapsed: !this.state.uiElementsCollapsed}); return false; } }><i className="fa fa-edit fa-fw"></i> UI Elements<span className="fa arrow"></span></a> 

                    <ul className={classNames({'nav nav-second-level': true, 'collapse': this.state.uiElementsCollapsed})}>
                      <li>
                        <Link to="dashboard.panels-wells">Panels and Wells</Link> 
                      </li>
                      <li>
                        <Link to="dashboard.buttons">Buttons</Link> 
                      </li>
                      <li>
                        <Link to="dashboard.notifications">Notifications</Link>
                      </li>
                      <li>
                        <Link to="dashboard.typography">Typography</Link> 
                      </li>
                      <li>
                        <Link to="dashboard.icons"> Icons</Link>
                      </li>
                      <li>
                        <Link to="dashboard.grid">Grid</Link>
                      </li>
                    </ul>
                  </li>
                    
                  <li className={classNames({'active': !this.state.multiLevelDropdownCollapsed})}>
                    <a href="javascript:void(0)" onClick={ () => { this.setState({multiLevelDropdownCollapsed: !this.state.multiLevelDropdownCollapsed}); return false; } }>
                      <i className="fa fa-sitemap fa-fw"></i>&nbsp;Multi-Level Dropdown<span className="fa arrow"></span>
                    </a>
                    <ul className={classNames({'nav nav-second-level': true, 'collapse': this.state.multiLevelDropdownCollapsed})}>
                      <li>
                        <a href="javascript:void(0)">Second Level Item</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Second Level Item</a>
                      </li>
                      <li className={classNames({'active': !this.state.thirdLevelDropdownCollapsed})}>
                        <a href="javascript:void(0)" onClick={ () => { this.setState({thirdLevelDropdownCollapsed: !this.state.thirdLevelDropdownCollapsed}); return false; } }>
                          Third Level<span className="fa arrow"></span>
                        </a>
                        <ul className={classNames({'nav nav-second-level': true, 'collapse': this.state.thirdLevelDropdownCollapsed})}>
                          <li>
                            <a href="javascript:void(0)">Third Level Item</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">Third Level Item</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">Third Level Item</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">Third Level Item</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li> 
                    
                  <li className={classNames({'active': !this.state.samplePagesCollapsed})}>
                    <a href="javascript:void(0)" onClick={ () => { this.setState({samplePagesCollapsed: !this.state.samplePagesCollapsed}); return false; } }>
                      <i className="fa fa-files-o fa-fw"></i>&nbsp;Sample Pages<span className="fa arrow"></span>
                    </a> 
                    <ul className={classNames({'nav nav-second-level': true, 'collapse': this.state.samplePagesCollapsed})}>
                      <li>
                        <Link to="dashboard.blank">Blank Page</Link>
                      </li>
                      <li>
                        <Link to="login">Login Page</Link>
                      </li>
                    </ul>
                  </li>
                    
                  <li>
                    <a href="http://www.strapui.com/">Premium React Themes</a>
                  </li>

                </ul>

              </div>
            </div>

          </Navbar>

          <div id="page-wrapper" className="page-wrapper" ref="pageWrapper" style={{minHeight: this.state.Height}}>
            <RouteHandler {...this.props} />
          </div>

        </div>

    );
  },

  statics: {
    fetchData: function(params) {
      }
  }
  
});

export default HomePage;
