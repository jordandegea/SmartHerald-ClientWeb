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

      deleteModal:false,
      actionModal:false,
      actionObjectId:null
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
      services: this.props.parseQuery
    };
  },

  onActionClicked: function(e){
    this.setState({
      actionModal:true,
      actionObjectId:e 
    });
  },
  onDeleteClicked: function(e){
    this.setState({
      deleteModal:true,
      actionObjectId:e 
    });
  },
  onModalYes: function(e){
    if (this.state.actionModal){
      this.props.onButton(this.state.actionObjectId);
    }else if(this.state.deleteModal){
      this.props.onDelete(this.state.actionObjectId)
    }
    this.setState({
      deleteModal:false,
      actionModal:false,
      actionObjectId:null
    });
  },
  onModalNo: function(e){
    this.setState({
      deleteModal:false,
      actionModal:false,
      actionObjectId:null
    });
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
                    <div className="col-xs-12 col-sm-8 col-md-9 col-lg-9">
                      <small>{this.props.introSmall}</small>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                      <div className="dataTables_length" id="dataTables-example_length">
                        <label>
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
                              {(() => {
                                if(this.props.buttonMessage!=null){
                                  return (
                                    <th style={{ width:128 }} >Actions</th>
                                  );
                                }
                              })()}
                          </tr>
                          </thead>
                        <tbody> 
                        {
                          displayedServices.map(function(c) {
                          
                            //var boundClick = this.onEditButton.bind(this, c.objectId);
                            var boundClickAction = this.onActionClicked.bind(this,c.objectId);
                            var boundClickDelete = this.onDeleteClicked.bind(this,c.objectId);
                            return (<tr role="row">
                                <td>{c.createdAt.toUTCString()}</td>
                                <td>{c.summary}</td>
                                {(() => {
                                  if(this.props.buttonMessage!=null){
                                    return (
                                      <td style={{ width:192 }}>
                                          <Button onClick={boundClickAction} bsStyle="warning btn-block" bsSize="small">{this.props.buttonMessage}</Button>
                                      </td>
                                      );
                                  }
                                })()}
                                <td style={{ width:30 }}>
                                    <Button onClick={boundClickDelete} bsStyle="danger btn-block" bsSize="small"><i className="fa fa-times"></i></Button>
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


            <div className="modal" style={ (this.state.actionModal)?{display:"block"}:{} }>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel">Confirmation</h4>
                  </div>
                  <div className="modal-body">
                    Do you really want to {this.props.buttonMessage}?
                  </div>
                  <div className="modal-footer">
                    <button onClick={this.onModalNo} type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                    <button onClick={this.onModalYes} type="button" className="btn btn-primary">Yes, do it</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal" style={ (this.state.deleteModal)? {display:"block"}:{} }>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel">Confirmation</h4>
                  </div>
                  <div className="modal-body">
                    Do you really want to delete?
                  </div>
                  <div className="modal-footer">
                    <button onClick={this.onModalNo} type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                    <button onClick={this.onModalYes} type="button" className="btn btn-primary">Yes, delete it</button>
                  </div>
                </div>
              </div>
            </div>

          </div>


      
    );
  },
  
});

var Messages = React.createClass({
  mixins: [Router.Navigation],

  getInitialState() {
    return {
      listSent:false,
      listPreview:false,
      listEdition:true
    };
  },


  swapListSent: function(){
    this.setState({
      listSent:!this.state.listSent
    });
  },
  swapListPreview: function(){
    this.setState({
      listPreview:!this.state.listPreview
    });
  },
  swapListEdition: function(){
    this.setState({
      listEdition:!this.state.listEdition
    });
  },



  onEditMessage: function(objectId){
    this.transitionTo('dashboard.writemessage', this.props, {message:objectId});
  },

  onSendMessage: function(objectId){
    var self = this;
    var service = this.props.service.service;
    Parse.Cloud.run('send', 
      {
        messageId: objectId,
        serviceId: service.id 
      }).then(
        function(object) {
          self.forceUpdate();
        },
        function(service, error) {
          alert('Failed to edit object, with error code: ' + error.message);
        }
      );
  },

  onDeleteMessage:function(objectId){
    var Message = Parse.Object.extend("Message");
    var query = new Parse.Query(Message);
    query.get(objectId, {
      success: function(message) {
        message.destroy().then(
          function(object){
            this.transitionTo('dashboard.overview', this.props);
          },
          function(error){
            alert('Failed to destroy object, with error code: ' + error.message);
          }
        )
      },
      error: function(message, error) {
        alert('Failed to get object, with error code: ' + error.message);
      }
    });
  },

  onDeleteMessageCreator:function(objectId){
    var MessageCreator = Parse.Object.extend("MessageCreator");
    var query = new Parse.Query(MessageCreator);
    query.get(objectId, {
      success: function(messageCreator) {
        messageCreator.destroy().then(
          function(object){
            this.transitionTo('dashboard.overview', this.props);
          },
          function(error){
            alert('Failed to destroy object, with error code: ' + error.message);
          }
        )
      },
      error: function(message, error) {
        alert('Failed to get object, with error code: ' + error.message);
      }
    });

  },

  render: function() {
    return (
      <div>
      <br />
         <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <button onClick={this.swapListSent} className={this.state.listSent?"btn btn-block btn-primary":"btn btn-block btn-default"}>Sent</button>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <button onClick={this.swapListPreview} className={this.state.listPreview?"btn btn-block btn-primary":"btn btn-block btn-default"}>In preview</button>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <button onClick={this.swapListEdition} className={this.state.listEdition?"btn btn-block btn-primary":"btn btn-block btn-default"}>In edition</button>
          </div>
        </div>

        <div className={this.state.listSent?"row":"hidden"}>
          <div className="col-lg-12">
            <PageHeader>Messages sent</PageHeader>
          </div>
        </div>

        <div className={this.state.listSent?"row":"hidden"}>    
          <MessagesListBlock {...this.props} 
            parseQuery={(new Parse.Query('Message')).equalTo("sent", true).equalTo("service", this.props.service.service).descending("createdAt")}
            buttonMessage={null} 
            onDelete={this.onDeleteMessage}
            introSmall={"You can preview this message on your phone with the same account. "} 
            />
        </div>

        <div className={this.state.listPreview?"row":"hidden"}>
          <div className="col-lg-12">
            <PageHeader>Messages in preview</PageHeader>
          </div>
        </div>

        <div className={this.state.listPreview?"row":"hidden"}>    
          <MessagesListBlock {...this.props} 
            parseQuery={(new Parse.Query('Message')).equalTo("sent", false).equalTo("service", this.props.service.service).descending("createdAt")}
            buttonMessage={"Send"} 
            onButton={this.onSendMessage} 
            onDelete={this.onDeleteMessage}
            introSmall={"You can preview this message on your phone with the same account. "} 
            />
        </div>

        <div className={this.state.listEdition?"row":"hidden"}>
          <div className="col-lg-12">
            <PageHeader>Messages in edition</PageHeader>
          </div>
        </div>

        <div className={this.state.listEdition?"row":"hidden"}>    
          <MessagesListBlock {...this.props} 
            parseQuery={(new Parse.Query('MessageCreator')).equalTo("service", this.props.service.service).descending("createdAt")}
            buttonMessage={"Edit"} 
            onButton={this.onEditMessage} 
            onDelete={this.onDeleteMessageCreator}
            introSmall={"Those messages are in edition mode. "} 
            />
          </div>
      </div>
    );
  }

});

export default Messages;