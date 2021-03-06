// Generated by CoffeeScript 1.9.1
var React, Textarea, classNames, marked, objectAssign,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

React = require('react/addons');

Textarea = require('react-textarea-autosize');

marked = require('marked');

classNames = require('classnames');

objectAssign = require('object-assign');

module.exports = React.createClass({
  displayName: 'MarkdownTextarea',
  getDefaultProps: function() {
    return {
      clearOnSave: false,
      buttonText: "Save",
      onSave: function(value) {},
      onDelete: function() {},
      onChange: function(value) {},
      deleteButton: false,
      spinnerOptions: {},
      navTabStyle: {},
      tabStyle: {
        cursor: 'pointer',
        display: 'inline-block',
        listStyle: 'none'
      },
      textareaWrapperStyle: {},
      tabActiveStyle: {},
      textareaStyle: {
        display: 'block',
        resize: 'none'
      },
      previewStyle: {},
      buttonStyle: {},
      deleteButtonStyle: {}
    };
  },
  getInitialState: function() {
    var state;
    state = {
      active: 'write',
      value: this.props.initialValue != null ? this.props.initialValue : ""
    };
    return state;
  },
  render: function() {
    var previewStyle, previewTabClasses, tabs, textarea, writeStyle, writeTabClasses;
    writeTabClasses = classNames({
      'react-markdown-textarea__nav__item': true,
      'react-markdown-textarea__nav__item--active': this.state.active === "write"
    });
    previewTabClasses = classNames({
      'react-markdown-textarea__nav__item': true,
      'react-markdown-textarea__nav__item--active': this.state.active === "preview"
    });
    if (this.state.active === "write") {
      writeStyle = objectAssign({}, this.props.tabStyle, this.props.tabActiveStyle);
      previewStyle = this.props.tabStyle;
    } else if (this.state.active === "preview") {
      writeStyle = this.props.tabStyle;
      previewStyle = objectAssign({}, this.props.tabStyle, this.props.tabActiveStyle);
    }
    if (this.state.active === 'write') {
      textarea = React.createElement(Textarea, React.__spread({}, this.props, {
        "className": "react-markdown-textarea__textarea",
        "value": this.state.value,
        "onChange": this.handleChange,
        "ref": "textarea",
        "style": this.props.textareaStyle
      }));
    } else {
      textarea = React.createElement("div", {
        "className": "react-markdown-textarea__preview",
        "style": this.props.previewStyle,
        "dangerouslySetInnerHTML": {
          __html: marked(this.state.value)
        }
      });
    }
    if (!this.props.noPreview) {
      tabs = React.createElement("ul", {
        "className": "react-markdown-textarea__nav",
        "onMouseDown": this.toggleTab,
        "style": this.props.navTabStyle
      }, React.createElement("li", {
        "className": writeTabClasses,
        "style": writeStyle
      }, "Write"), React.createElement("li", {
        "className": previewTabClasses,
        "style": previewStyle
      }, "Preview"));
    }
    return React.createElement("div", {
      "className": "react-markdown-textarea"
    }, tabs, React.createElement("div", {
      "className": "react-markdown-textarea__textarea-wrapper",
      "style": this.props.textareaWrapperStyle
    }, textarea, React.createElement("button", {
      "onClick": this._onSave,
      "style": this.props.buttonStyle,
      "disabled": (this.props.saving ? "disabled" : false),
      "className": "react-markdown-textarea__save-button"
    }, this.props.buttonText), (this.props.deleteButton ? React.createElement("button", {
      "style": this.props.deleteButtonStyle,
      "onClick": this._onDelete,
      "disabled": (this.props.saving ? "disabled" : false),
      "className": "react-markdown-textarea__delete-button"
    }, "Delete") : void 0), (this.props.saving && (this.props.spinner != null) ? this.props.spinner(this.props.spinnerOptions) : void 0)));
  },
  toggleTab: function(e) {
    if (e.target.tagName !== "LI") {
      return;
    }
    if (indexOf.call(e.target.className.split(/\s+/), "react-markdown-textarea__nav__item--active") >= 0) {
      return;
    }
    if (this.state.active === "write") {
      return this.setState({
        active: 'preview'
      });
    } else {
      return this.setState({
        active: 'write'
      });
    }
  },
  handleChange: function(e) {
    var newValue;
    newValue = this.refs.textarea.getDOMNode().value;
    this.setState({
      value: newValue
    });
    return this.props.onChange(newValue);
  },
  _onSave: function() {
    var saveSuccessful = this.props.onSave(this.state.value);
    if(saveSuccessful && this.props.clearOnSave) {
      this.setState({ value: ''});
    }
    return saveSuccessful;
  },
  _onDelete: function() {
    return this.props.onDelete();
  }
});
