import React from 'react';
import AsyncElement from '../../../common/AsyncElement';

var PreOverview = React.createClass({

  mixins: [ AsyncElement ],

  bundle: require('bundle?lazy!./Overview.jsx'),

  preRender: function () {
  	return <div></div>;
  }
});

export default PreOverview;