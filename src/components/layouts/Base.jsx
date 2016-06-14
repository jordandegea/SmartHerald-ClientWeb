import React from "react";
import { Route, DefaultRoute, RouteHandler } from "react-router";


var Base = React.createClass({
	getDefaultProps: function() {
    	return {
      		service: class {
			  constructor() {
			    this.service = null;
			  }
			  get service() {
			    return this.service;
			  }
			  set service(service){
			  	this.service = service; 
			  }
			}
    	};
  	},
  
  render: function() {
  	return (
      <div id="container">
        <RouteHandler {...this.props} />
      </div>
    );
  }

});

export default Base;