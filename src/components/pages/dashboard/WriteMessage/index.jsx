import React from 'react';
import AsyncElement from '../../../common/AsyncElement';

var PreWriteMessage = React.createClass({

  mixins: [ AsyncElement ],

  bundle: require('bundle?lazy!./WriteMessage.jsx'),

  preRender: function () {
  	return <div></div>;
  }
});

export default PreWriteMessage;