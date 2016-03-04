import React from 'react';
import AsyncElement from '../../../common/AsyncElement';

var PreReports = React.createClass({

  mixins: [ AsyncElement ],

  bundle: require('bundle?lazy!./Reports.jsx'),

  preRender: function () {
  	return <div></div>;
  }
});

export default PreReports;