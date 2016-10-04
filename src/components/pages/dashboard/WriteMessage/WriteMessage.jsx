/* global CounterPart */

import React, { PropTypes, Component } from 'react';
import {NavDropdown, MenuItem, DropdownButton, Navbar, Nav, NavItem, Panel, PageHeader, ListGroup, ListGroupItem, Button, Input, Col, Row, FormGroup, FormControl, ControlLabel, Checkbox} from "react-bootstrap";

import StatWidget from "../../../common/StatWidget.js";

import Router from 'react-router';
import ReactDOM from 'react-dom';
import RawHtml from "react-raw-html"

import CounterPart from 'counterpart';
import Translate from 'react-translate-component';

import TinyMCE from 'react-tinymce';

import Parse from "parse";
import ParseReact from "parse-react";

CounterPart.registerTranslations('en', {
  write_message: {
    ask_template: 'Need a good template? contact us at admin@sinenco.com'
  }
});

CounterPart.registerTranslations('en', {
  write_message: {
    ask_template: 'Besoin d\'un template ? contactez nous à l\'adresse admin@sinenco.com'
  }
});

var Frame = React.createClass({

  render: function() {
    return <iframe style={{
              width: 320,
              height: 568,
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor:"#AAAAAA",
              borderRadius:"6px",
              padding:"4px"
          }}
              ref='iframe'>
          </iframe>
    ;
  },
  componentDidMount: function() {
    this.renderFrameContents();
  },
  renderFrameContents: function() {
    if(this.refs.iframe.contentDocument.readyState === 'complete') {
       ReactDOM.render(this.props.children, this.refs.iframe.contentDocument.body);
    } else {
       setTimeout(this.renderFrameContents, 0);
    }
  },
  componentDidUpdate: function() {
    this.renderFrameContents();
  },
  componentWillUnmount: function() {
    React.unmountComponentAtNode(this.refs.iframe.contentDocument.body);
  }
});

var startContent = '<div class="jumbotron text-center">'+
      '<h1>Sample message</h1>' +
      '<p>Clic on "Reload preview"</p>' +
      '<p><img src="http://a1.mzstatic.com/us/r30/Purple62/v4/8c/75/d7/8c75d713-e520-851b-4e94-bebd41cb03b9/icon175x175.jpeg" width="64" height="64" /></p>' +
      '</div>' +
      '<div class="container">' +
      '<div class="row">' +
      '<div class="col-sm-4">' +
      '<h3>You can have title</h3>' +
      '<p>And <strong>different</strong> <em>style</em></p>' +
      '</div>' +
      '<div class="col-sm-4">' +
      '<h3>Top menu</h3>' +
      '<p>Don\'t hesitate to check menus, especially view</p>' +
      '<p>You can access source code with "Tools"</p>' +
      '</div>' +
      '<div class="col-sm-4">' +
      '<h3>HTML</h3>' +
      '<p>This message is formatted with HTML, CSS and javascript</p>' +
      '</div>' +
      '</div>' +
      '</div>';



var WriteMessage = React.createClass({

  

  getInitialState: function() {
  
    var self = this;

    if (this.props.query.hasOwnProperty("message")){
      var MessageCreator = Parse.Object.extend("MessageCreator");
      var query = new Parse.Query(MessageCreator);
      query.get(this.props.query.message, {
        success: function(message) {
          
          var content = message.attributes.content;
          var base_css = message.attributes

          if ( content == ""){
            content = startContent;
            base_css = "bootstrap";
          }
          self.setState( { 
            messageObject:message,
            summary:message.attributes.summary,
            content:content,
            base_css:base_css,
            custom_css:message.attributes.custom_css,
            js_jquery:message.attributes.js_jquery,
            js_jquery_v:message.attributes.js_jquery_v,
            js_bootstrap:message.attributes.js_bootstrap,
            started:true
          });
      
          tinyMCE.get('tinyeditor').setContent(content);
          
          self.forceUpdate();
        },
        error: function(message, error) {
            self.transitionTo('dashboard.messages');
        }
      });
    }
  
    return {
      started:false,
      built:false,

      messageObject:null,
      
      editorContent:true,
      editorStyle:false,
      editorPreview:true,

      summary:"",
      base_css:"",
      custom_css:"",
      js_jquery:false,
      js_jquery_v:"",
      js_bootstrap:false,

      sourceContent:false,
      fullContent:"",

      content:startContent

    };
  },
  
  mixins: [Router.Navigation],

  onChangeContent: function(e) {
    this.setState({ 
      content:e.target.getContent()
    });
  },
  

  onChangeBaseCSS: function(e) {
    this.setState({
      base_css:e.target.value
    });
    this.setFullContent();
  },
  onChangeCustomCSS: function(e) {
    this.setState({
      custom_css:e.target.value
    });
  },
  onChangeJSJQuery: function(e) {
    this.setState({
      js_jquery:!this.state.js_jquery
    });
  },
  onChangeJSJQueryV: function(e) {
    this.setState({
      js_jquery_v:e.target.value
    });
  },
  onChangeJSBootstrap: function(e) {
    this.setState({
      js_bootstrap:!this.state.js_bootstrap
    });
  },
  onChangeSummary: function(e) {
    this.setState({ 
      summary:e.target.value
    });
  },
  onPreviewAsked: function(e){
    this.setState({
      fullContent:this.getFullContent()
    });
  },


  getFullContent: function(){
    /* Cloud code copy */

    var base_css = this.state.base_css;
    var custom_css = this.state.custom_css;

    var js_jquery = this.state.js_jquery;
    var js_jquery_v = this.state.js_jquery_v;
    var js_bootstrap = this.state.js_bootstrap;

    var content = "<html><head>";

    content += "</title>"+this.state.summary+"</title>"
    content += "<meta charset=\"utf-8\">"+
            "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
          "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>";
    if (base_css != "" ){
      content += "<link type=\"text/css\" rel=\"stylesheet\" href=\"{$"+base_css+"}\" media=\"all\"/>";
    }
    if (custom_css != "" ){
      content += "<style>"+custom_css+"</style>";
    }

    content += "</head><body>"

    content += this.state.content;

    if ( js_jquery ){
      if ( typeof(js_jquery_v) == "undefined" ){
        content += "<script src=\"{$js_jquery}\" />";
      }else{
        content += "<script src=\"{$js_jquery"+js_jquery_v+"}\" />";
      } 
    }
    if (js_bootstrap){
      content += "<script src=\"{$js_bootstrap}\" />";
    }

    content += "</body>";
    content += "</html>"

    content = content.replace("{$js_jquery}","http://code.jquery.com/jquery-3.1.1.min.js");
    content = content.replace("{$js_jquery3.1.1}","http://code.jquery.com/jquery-3.1.1.min.js");
    content = content.replace("{$bootstrap}","https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
    content = content.replace("{$bootswatch_cerulean}", "https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/cerulean/bootstrap.min.css");
    content = content.replace("{$js_bootstrap}","https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");

    return content;
  },
  

  
  swapSource: function(){
    /*console.log(this.state.content);
    var short_part = this.state.content.substring(0,50).toLowerCase();
    console.log(short_part);
    if(short_part.indexOf("<html") > -1){
      alert("Security: HTLM source","Impossible to go in editor mode when html source created. ");
      return;
    }
    if(short_part.indexOf("<!doctype") > -1){
      alert("Security: HTLM source","Impossible to go in editor mode when html source created. ");
      return;
    }*/
    this.setState({
      sourceContent:!this.state.sourceContent
    })
  },

  swapEditorContent: function(){
    this.setState({
      editorContent:!this.state.editorContent
    });
  },
  swapEditorStyle: function(){
    this.setState({
      editorStyle:!this.state.editorStyle
    });
  },
  swapEditorPreview: function(){
    this.setState({
      editorPreview:!this.state.editorPreview
    });
  },




  onCreateAsked: function(){
    var service = this.props.service.service;
    Parse.Cloud.run('create_message_builder', 
      {
        serviceId: service.id 
      }).then(
        function(object) {
          var datas = JSON.parse(object);
          var MessageCreator = Parse.Object.extend("MessageCreator");
          self.state.messageObject = new Message();
          self.state.messageObject.id = datas.messageId;
          self.setState({
            started:true
          });
          return self.state.messageObject.fetch();
        },
        function(service, error) {
          alert('Failed to edit object, with error code: ' + error.message);
        }
      );

  },

  handleBuild: function(e){
    
    e.stopPropagation();
    e.preventDefault();

    var self = this;
    var message = this.state.messageObject;
    var service = this.props.service.service;
    if ( confirm("Are you sure? \nAfter sending the message, you can't edit it. ")){
      Parse.Cloud.run('build_message', 
      {
        messageCreatorId : message.id,
      }).then(
        function(object) {
          self.setState({
            build:true,
            started:false
          });
        },
        function(service, error) {
          alert('Failed to edit object, with error code: ' + error.message);
        }
      );
    }
  },


  handleSave: function(e){
    
    e.stopPropagation();
    e.preventDefault();

    var self = this;
    var service = this.props.service.service; 
    var messageCreator = this.state.messageObject;

    messageCreator.set( "summary",    this.state.summary);
    messageCreator.set( "content",    this.state.content);
    messageCreator.set( "base_css",   this.state.base_css);
    messageCreator.set( "custom_css", this.state.custom_css);
    messageCreator.set( "js_jquery",  this.state.js_jquery);
    messageCreator.set( "js_jquery_v",this.state.js_jquery_v);
    messageCreator.set( "js_bootstrap",this.state.js_bootstrap);
      
    return messageCreator.save().then(
        function(object) {
          alert('Successfully saved');
        },
        function(service, error) {
          alert('Failed to save object, with error code: ' + error.message);
        }
    );
  },

  render: function() {
    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Message editor</PageHeader>
          </div>
        </div>

        <div className={(this.state.built)?"row":"hidden"}>
          <div className="col-xs-12">
            <p>The message has been built. You can see the result on your phone.</p>
          </div>
        </div>

        <div className={(!this.state.built && !this.state.started)?"row":"hidden"}>
          <div className="col-xs-12">
            <p>You maybe have already some messages. To you really want to create a new one ?</p>
          </div>
          <div className="col-xs-12 col-md-6">
            <button className="btn btn-default" onClick={this.onCreateAsked}>Create a new one</button>
          </div>
          <div className="col-xs-12 col-md-6">
            <button className="btn btn-primary">Go to my messages</button>
          </div>

        </div>


        <div className={(!this.state.built && this.state.started)?"row":"hidden"}>

          <div className="row">

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <button onClick={this.swapEditorContent} className={this.state.editorContent?"btn btn-block btn-primary":"btn btn-block btn-default"}>Content</button>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <button onClick={this.swapEditorStyle} className={this.state.editorStyle?"btn btn-block btn-primary":"btn btn-block btn-default"}>Style</button>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <button onClick={this.swapEditorPreview} className={this.state.editorPreview?"btn btn-block btn-primary":"btn btn-block btn-default"}>Preview</button>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-sm-push-2 col-lg-4">
              <div className="col-sm-6">
                <Button bsStyle="btn btn-block btn-success" onClick={this.handleSave}>Save Message</Button>
              </div>
              <div className="col-sm-6">
                <Button bsStyle="btn btn-block btn-warning" onClick={this.handleBuild}>Build Message</Button>
              </div>
            </div>
          </div>
          <br />

          <div className={this.state.editorContent?"col-lg-6":"hidden"}>
            <Panel header={<span>Edition</span>} >
              <div className="row">
                <div className="col-sm-12">
                  <form role="form">
                    <Input type="textarea" label="Summary" rows="2" value={this.state.summary} onChange={this.onChangeSummary}/>
                    
                    <div className="form-group">
                      <label className="control-label">Content</label>
                      <TinyMCE
                        id={"tinyeditor"}
                        ref="tinyeditor"
                        content={this.state.content}
                        config={{
                          selector: 'textarea',
                          height: 500,
                          theme: 'modern',
                          plugins: [
                            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                            'searchreplace wordcount visualblocks visualchars code fullscreen',
                            'insertdatetime media nonbreaking save table contextmenu directionality',
                            'emoticons template paste textcolor colorpicker textpattern imagetools'
                          ],
                          toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                          toolbar2: 'print preview media | forecolor backcolor emoticons',
                          image_advtab: true,
                          templates: [
                            { title: 'Test template 1', content: 'Test 1' },
                            { title: 'Test template 2', content: 'Test 2' }
                          ],
                          content_css: [
                            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                            '//www.tinymce.com/css/codepen.min.css'
                          ]
                        }}
                        onChange={this.onChangeContent}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </Panel>
          </div>

          <div className={this.state.editorStyle?"col-lg-6":"hidden"}>
            <Panel header={<span>Style</span>} >
              <div className="row">
                <div className="col-sm-12">
                  <form role="form">
                    <div className="form-group">
                    <label for="base_css">Base CSS</label>
                    <select className="form-control" id="base_css" onChange={this.onChangeBaseCSS}>
                      <option value=""></option>
                      <option value="bootstrap">bootstrap</option>
                      <option value="bootstrap_cerulean">bootswatch cerulean</option>
                    </select>
                    </div>

                    <Input type="textarea" label="Custom CSS" rows="20" value={this.state.custom_css} onChange={this.onChangeCustomCSS}/>
                    
                    <Input type="checkbox" label="JS Bootstrap" value={this.state.js_bootstrap} onChange={this.onChangeJSBootstrap}/>
                    <Input type="checkbox" label="JQuery" value={this.state.js_jquery} onChange={this.onChangeJSJQuery}/>

                    <div className={this.state.js_jquery?"form-group":"hidden"}>
                      <label for="js_jquery">JQuery version</label>
                      <select className="form-control" id="js_jquery" onChange={this.onChangeJSJQueryV}>
                        <option value="3.1.1">3.1.1</option>
                      </select>
                    </div>
                    
                    <Translate {...this.props} content="write_message.ask_template" />
                  </form>
                </div>
              </div>
            </Panel>
          </div>

          <div className={this.state.editorPreview?"col-lg-6":"hidden"}>
            <Panel header={<span>Preview</span>} >
              <div className="row">
                <div className="col-sm-12 text-center">
                  <button onClick={this.onPreviewAsked} className="btn btn-block btn-primary">Reload preview</button>
                  <br />
                  <Frame>
                    <div>
                       <RawHtml.div>
                       {this.state.fullContent}
                       </RawHtml.div>
                    </div>
                  </Frame>
                </div>
              </div>
            </Panel>
          </div>
        </div>

      </div>
    );
  }

});

export default WriteMessage;