import React from 'react';
import {Panel} from 'react-bootstrap';
import {Link} from 'react-router';

var StatWidget = React.createClass({
  render: function(){

    var footer = null;
    if ( this.props.linkTo != undefined ){
      footer = (<Link to={this.props.linkTo}>
                    <span className="pull-left">{this.props.footerText}</span>
                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                    <div className="clearfix"></div>
                  </Link>);
    }else if ( this.props.onClick){

      footer = (<a className="btn btn-block" onClick={this.props.onClick}>
                    <span className="pull-left">{this.props.footerText}</span>
                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                    <div className="clearfix"></div></a>);
    }
    return (
      <Panel className="stat" bsStyle={this.props.style}

        header={<div className="row">
                  <div className="col-xs-3">
                    <i className={this.props.icon}></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{this.props.count}</div>
                    <div>{this.props.headerText}</div>
                  </div>
                </div>}
        footer={footer}
        >
      </Panel>
          
    );
  }
});

export default StatWidget;