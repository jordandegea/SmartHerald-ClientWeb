import React from "react";
import { Router, Route, DefaultRoute, RouteHandler, Redirect } from "react-router";

import BaseLayout from "../components/layouts/Base";
import DashboardLayout from "../components/layouts/Dashboard";

import DashboardHomePage from "../components/pages/dashboard/Home";
import DashboardOverviewPage from "../components/pages/dashboard/Overview";
import DashboardWriteMessagePage from "../components/pages/dashboard/WriteMessage";
import DashboardEditMessagePage from "../components/pages/dashboard/WriteMessage";
import DashboardMessagesPage from "../components/pages/dashboard/Messages";
import DashboardReportsPage from "../components/pages/dashboard/Reports";

import LoginPage from "../components/pages/Login";
import LogoutPage from "../components/pages/Logout";

var Routes = React.createClass({

  statics: {
    getRoutes: function() {
      return (
          <Route name="base" path="/" handler={BaseLayout}>
            <Route name="dashboard" path="/dashboard" handler={DashboardLayout}>
              <Route name="dashboard.home" path="/home" handler={DashboardHomePage} />
              <Route name="dashboard.messages" path="/messages" handler={DashboardMessagesPage} />
              <Route name="dashboard.writemessage" path="/writemessage" handler={DashboardWriteMessagePage} />
              <Route name="dashboard.editmessage" path="/editmessage/:message" handler={DashboardEditMessagePage} />
              <Route name="dashboard.overview" path="/overview" handler={DashboardOverviewPage} />
              <Route name="dashboard.reports" path="/reports" handler={DashboardReportsPage} />
              
              <DefaultRoute name="dashboard.default" handler={DashboardHomePage} />
            </Route>
            <Route name="login" path="/login" handler={LoginPage} />
            <Route name="logout" path="/logout" handler={LogoutPage} />
            <DefaultRoute name="default" handler={DashboardLayout} />
            <Redirect from="/" to="login" />
          </Route>
      );
    }
  },
  render: function() {
  
  }
  
});

export default Routes;