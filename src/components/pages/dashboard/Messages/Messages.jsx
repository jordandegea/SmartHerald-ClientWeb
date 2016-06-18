/* global CounterPart */

import React, { PropTypes, Component } from 'react';

import Router, { Link, RouteHandler } from "react-router";

import {Pagination, Panel, Well, Button, PageHeader} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import Parse from "parse";
import ParseReact from "parse-react";

import CounterPart from 'counterpart';
import Translate from 'react-translate-component';
import {IntlMixin, FormattedRelative}  from 'react-intl';

CounterPart.registerTranslations('en', {
  example: {
    greeting: 'Hello %(name)s! How are you today?'
  }
});

CounterPart.registerTranslations('de', {
  example: {
    greeting: 'Hallo, %(name)s! Wie geht\'s dir heute so?'
  }
});

var MessagesListBlock = React.createClass({
  mixins: [ParseReact.Mixin,IntlMixin], // Enable query subscriptions
  
  getInitialState() {
    return {
      currentPage : 1,
      maxPage : 0,
      nbResults : 0,
      nbResultsPerPage : 10,
    };
  },
  
  
  
  pageChangedHandler: function(event, selectedEvent) {
    this.setState({
      currentPage: selectedEvent.eventKey
    });
  },

  resultPerPageChangedHandler: function(event){
         this.setState({
           nbResultsPerPage: event.target.value
         });
  },


  observe: function() {
    return {
      services: (new Parse.Query('Message')).equalTo("service", this.props.service.service).descending("createdAt")
    };
  },
      
  
  render: function() {
    // Render the menu with all the services available
    this.state.nbResults = this.data.services.length; 
    this.state.maxPage = Math.ceil(this.state.nbResults/this.state.nbResultsPerPage);
    
    var showing = (this.state.currentPage*this.state.nbResultsPerPage)- (this.state.nbResultsPerPage-1);
    if ( showing < 1 ){
      showing = 1 ; 
    }
    
    var to = this.state.currentPage*this.state.nbResultsPerPage ;
    if ( to > this.state.nbResults){
      to = this.state.nbResults;
    }
    
    var of = this.state.nbResults;
                    
    var displayedServices = [];
    
    var k = 0;
    for ( var i = (showing-1) ; i < to ; i ++){
      displayedServices[k++] = this.data.services[i];
    }
  
    var odd = true ;
    
    return (
        <div className="col-lg-12"> 
          <div> 
            <div className="dataTable_wrapper">
                <div id="dataTables-example_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                  
                  <div className="row">
                    <div className="col-sm-9">
                      <div className="dataTables_length" id="dataTables-example_length">
                        <label>Show &nbsp;
                        <select onChange={this.resultPerPageChangedHandler} name="selectEntries" aria-controls="ariaEntriesSelect" className="form-control input-sm">
                         <option value="10">10</option>
                         <option value="20">20</option>
                         <option value="50">50</option>
                        </select>&nbsp; entries</label>
                      </div>
                    </div>
                    
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <table className="table table-striped table-bordered table-hover dataTable no-footer" id="selectEntrieTable" role="grid" aria-describedby="messagesEntries">
                        <thead>
                          <tr role="row">
                            <th>Date</th>
                            <th>Summary</th>
                            <th>Actions</th>
                          </tr>
                          </thead>
                        <tbody> 
                        {
                          displayedServices.map(function(c) {
                          
                            //var boundClick = this.onEditButton.bind(this, c.objectId);
                            
                            return (<tr role="row">
                                <td>{c.createdAt.toUTCString()}</td>
                                <td>{c.summary}</td>
                                <td>
                                  <Link to="dashboard.editmessage" params={{ "message": c.objectId }}  >
                                    <Button  bsStyle="warning col-xs-12 col-sm-6" bsSize="small">Edit</Button>
                                  </Link>
                                </td>
                              </tr>);
                          }, this)
                        }
                         
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="dataTables_info" id="dataTables-example_info" role="status" aria-live="polite">
                        Showing {showing} to {to} of {of} entries
                      </div>
                    </div>
                    <div className="col-xs-12" >
                    <center>
                      <Pagination activePage={this.state.currentPage}
                        items={this.state.maxPage} perPage={this.state.nbResultsPerPage} 
                        first={true} last={true}
                        prev={true} next={true}
                        onSelect={ this.pageChangedHandler } /> 
                                </center>
                    </div>
                  </div>
                </div>
              </div>
             	 
            </div>
        </div>

      
    );
  },
  
  onEditButton : function(objectId){
    //console.log(objectId);
  }
});

var Messages = React.createClass({

  render: function() {
    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Messages</PageHeader>
          </div>
        </div>

        <div className="row">    
          <MessagesListBlock {...this.props} />
        </div>

      </div>
    );
  }

});

export default Messages;