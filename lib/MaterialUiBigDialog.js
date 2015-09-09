var React = require('react');
require('../css/main.css');

  var mui = require('material-ui'),
  FlatButton = mui.FlatButton,
  ThemeManager = new mui.Styles.ThemeManager();
var materialDialogBoxStyle = {
	overflowY: 'auto',
	width: 99 + '%',
	height: 99 + '%',
	boxShadow: 2 + 'px ' + 2 + 'px ' + 10 + 'px grey',
	position: 'fixed',
	top: 5,
	backgroundColor: 'white',
	borderRadius: 2 + 'px',
	marginLeft: 'auto',
	marginRight: 'auto'
};

var closeBoxCrossStyle = {
	float: 'right',
	marginRight: 0.25 + 'em'
};

var MaterialUiBigDialog = React.createClass({
 	
	/**
	 * restricts the type of the props that the component must be provided with
	 */
	propTypes: { 
		text: React.PropTypes.string,
		rating: React.PropTypes.string,
		title: React.PropTypes.string,
		submitCallback: React.PropTypes.func
	},
	
	/**
	 * initializes the state variables
	 */
	getInitialState: function() {
		return {displayDialog: true, isOwner: true};	
	},
	
	// Important!
	/**
	 * important to print the material-ui elements on the UI
	 */
	childContextTypes : {
       muiTheme: React.PropTypes.object
	},

	/**
	 * important to print the material-ui elements on the UI
	 */
	getChildContext: function() {
    	return {
      		muiTheme: ThemeManager.getCurrentTheme()
    	};
  	},
  	
	/**
	 * this function closes the dialog box by setting the state variable displayDialog to false
	 */
	closeDialog: function() {
		  this.setState({displayDialog: false});
	},
	
	/**
	 * renders the a big dialog box
	 */
	render: function() {
	  if(this.state.displayDialog === true) {
		var body = this.props.children;
		var title = React.createElement('h1',  {style: { fontFamily: 'roboto', marginLeft: 5 + 'px' }, dangerouslySetInnerHTML:{__html:this.props.title}});
		var closeBoxCross = React.createElement('a', {onClick: this.closeDialog, style: closeBoxCrossStyle, dangerouslySetInnerHTML:{__html: "&#x274C"}});
		
		if(this.state.isOwner === true) {
				var submitButton = React.createElement(FlatButton, {onClick: this.props.submitCallback, style: {float: 'right'}, label: "Keep", primary: true});
				var cancelButton = React.createElement(FlatButton, {onClick: this.closeDialog, style: {float: 'right'}, label: "Cancel", secondary: true});
				return React.createElement('div', {style: materialDialogBoxStyle}, closeBoxCross, title, body, submitButton, cancelButton);
		} else {
				var closeButton = React.createElement(FlatButton, {onClick: this.closeDialog, style: {float: 'right'}, label: "Close", default: true});
				return React.createElement('div', {style: materialDialogBoxStyle}, closeBoxCross, title, body, closeButton);
		}
	  }
	  return null;
  }
});

module.exports = MaterialUiBigDialog;
