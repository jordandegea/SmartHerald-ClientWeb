import React from "react";
import { Router, Route, DefaultRoute, RouteHandler, Redirect } from "react-router";

import BaseLayout from "../components/layouts/Base";
import DashboardLayout from "../components/layouts/Dashboard";

import DashboardOverviewPage from "../components/pages/dashboard/Overview";
import DashboardWriteMessagePage from "../components/pages/dashboard/WriteMessage";
import DashboardEditMessagePage from "../components/pages/dashboard/WriteMessage";
import DashboardMessagesPage from "../components/pages/dashboard/Messages";
import DashboardReportsPage from "../components/pages/dashboard/Reports";
import DashboardPackagesPage from "../components/pages/dashboard/Packages";

import LoginPage from "../components/pages/Login";
import RegisterPage from "../components/pages/Register";
import PaymentCompletedPage from "../components/pages/PaymentCompleted";
import LogoutPage from "../components/pages/Logout";

var Routes = React.createClass({

  statics: {
    getRoutes: function() {
      return (
          <Route name="base" path="/" handler={BaseLayout}>
            <Route name="dashboard" path="/dashboard" handler={DashboardLayout}>
              <Route name="dashboard.home" path="/home" handler={DashboardOverviewPage} />
              <Route name="dashboard.messages" path="/messages" handler={DashboardMessagesPage} />
              <Route name="dashboard.writemessage" path="/writemessage" handler={DashboardWriteMessagePage} />
              <Route name="dashboard.editmessage" path="/editmessage/:message" handler={DashboardEditMessagePage} />
              <Route name="dashboard.overview" path="/overview" handler={DashboardOverviewPage} />
              <Route name="dashboard.reports" path="/reports" handler={DashboardReportsPage} />
              <Route name="dashboard.packages" path="/packages" handler={DashboardPackagesPage} />
              
              <DefaultRoute name="dashboard.default" handler={DashboardOverviewPage} />
            </Route>
            <Route name="login" path="/login" handler={LoginPage} />
            <Route name="register" path="/register" handler={RegisterPage} />
            <Route name="payment_complete" path="/payment/complete" handler={ PaymentCompletedPage} />
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