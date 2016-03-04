import React from 'react';
import AsyncElement from '../../../common/AsyncElement';

var PreMessages = React.createClass({

  mixins: [ AsyncElement ],

  bundle: require('bundle?lazy!./Messages.jsx'),

  preRender: function () {
  	return <div></div>;
  }
});

export default PreMessages;