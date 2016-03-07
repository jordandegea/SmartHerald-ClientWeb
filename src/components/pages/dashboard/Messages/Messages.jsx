/* global CounterPart */

import React, { PropTypes, Component } from 'react';
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

  observe: function() {
    console.log(Parse.User.current().get("services"));
    return {
      services: (new Parse.Query('Message')).equalTo("service", Parse.User.current().attributes.defaultService)
    };
  },
      
  
  render: function() {
    // Render the menu with all the services available
    
    
    var odd = true ;
    return (
        <div className="col-lg-12"> 
          <div> 
            <div className="dataTable_wrapper">
                <div id="dataTables-example_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                  
                  <div className="row">
                    <div className="col-sm-9">
                      <div className="dataTables_length" id="dataTables-example_length">
                        <label>Show <select name="dataTables-example_length" aria-controls="dataTables-example" className="form-control input-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div id="dataTables-example_filter" className="dataTables_filter">
                        <label>Search:<input type="search" className="form-control input-sm" placeholder="" aria-controls="dataTables-example" /></label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <table className="table table-striped table-bordered table-hover dataTable no-footer" id="dataTables-example" role="grid" aria-describedby="dataTables-example_info">
                        <thead>
                          <tr role="row"><th className="sorting_asc" tabIndex="0" aria-controls="dataTables-example" rowSpan="1" colSpan="1" aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" style={ {width: 265} }>Rendering engine</th><th className="sorting" tabIndex="0" aria-controls="dataTables-example" rowSpan="1" colSpan="1" aria-label="Browser: activate to sort column ascending" style={ {width: 321} }>Browser</th><th className="sorting" tabIndex="0" aria-controls="dataTables-example" rowSpan="1" colSpan="1" aria-label="Platform(s): activate to sort column ascending" style={ {width: 299} }>Platform(s)</th><th className="sorting" tabIndex="0" aria-controls="dataTables-example" rowSpan="1" colSpan="1" aria-label="Engine version: activate to sort column ascending" style={ {width: 231} }>Engine version</th><th className="sorting" tabIndex="0" aria-controls="dataTables-example" rowSpan="1" colSpan="1" aria-label="CSS grade: activate to sort column ascending" style={ {width: 180} }>CSS grade</th></tr>
                        </thead>
                        <tbody> 
                        {
                          this.data.services.map(function(c) {
                          
                            //var boundClick = this.changeServiceOfUser.bind(this, c.objectId);
                            return (<tr role="row">
                                <td className="sorting_1">{c.summary}</td>
                                <td><FormattedRelative value={c.createdAt} /></td>
                                <td>Win 98+ / OSX.2+</td>
                                <td className="center">1.7</td>
                                <td className="center">A</td>
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
                        Showing 1 to 10 of 57 entries
                      </div>
                    </div>
                    <div className="col-xs-12" >
                    <center>
                      <Pagination activePage={1}
                        items={6} perPage={10} 
                        first={true} last={true}
                        prev={true} next={true}
                        onSelect={ (pageNumber) => {} } /> 
                                </center>
                    </div>
                  </div>
                </div>
              </div>
             	 
            </div>
        </div>

      
    );
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
          <MessagesListBlock />
        </div>

      </div>
    );
  }

});

export default Messages;