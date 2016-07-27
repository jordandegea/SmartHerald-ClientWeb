import React from 'react';
import AsyncElement from '../../../common/AsyncElement';

var PrePackage = React.createClass({

  mixins: [ AsyncElement ],

  bundle: require('bundle?lazy!./Packages.jsx'),

  preRender: function () {
  	return <div></div>;
  }
});

export default PrePackage;