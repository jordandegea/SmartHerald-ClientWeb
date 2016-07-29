/**
 * App entry point
 */

// Polyfill

import "babel-core/polyfill";

// Libraries
import React from "react";
import ReactDOM from "react-dom";
import Router from "react-router";
import Parse from "parse";
import ParseReact from "parse-react";


// Base styling
import "./common/styles/app.less";

// Routers
import Routes from "./routers/Routes";


// ID of the DOM element to mount app on
const DOM_APP_EL_ID = "app";

// Initialize routes depending on session
let routes;

routes = Routes.getRoutes();


Parse.initialize("com.sinenco.smartherald", "com.sinenco.smartherald");
//Parse.serverURL = "http://localhost/parse";
Parse.serverURL = "http://smartherald.com/parse";
Parse.User.current();

// Start the router
Router.run(routes, Router.HashLocation, function(Handler) {
  ReactDOM.render(<Handler />, document.getElementById(DOM_APP_EL_ID));
});
