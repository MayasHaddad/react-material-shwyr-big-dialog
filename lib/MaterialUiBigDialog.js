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
	top: 5,
  	position: 'fixed',
	backgroundColor: 'white',
	borderRadius: 2 + 'px',
	left: 50 + '%',
  transform: 'translate(' + -50 + '%)',
  opacity: 1 + '!important'
};

var closeBoxCrossStyle = {
	float: 'right',
	marginRight: 0.25 + 'em'
};

var dialogBoxWrapper = {
  width: 100 + '%',
  height: 100 + '%',
  top: 0,
  left: 0,
  backgroundColor: 'black',
  position: 'fixed',
  opacity: 0.7
};

var MaterialUiBigDialog = React.createClass({

	/**
	 * restricts the type of the props that the component must be provided with
	 */
	propTypes: {
		display: React.PropTypes.boolean,
		text: React.PropTypes.string,
		rating: React.PropTypes.string,
		title: React.PropTypes.string,
		submitCallback: React.PropTypes.func
	},

	/**
	 * initializes the state variables
	 */
	getInitialState: function() {
		
		return {displayDialog: this.props.display, isOwner: true};
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
    		document.getElementsByTagName("body")[0].style.overflowY = "hidden";
		
		    var body = this.props.children;
			var title = React.createElement('h1',  {style: { fontFamily: 'roboto', marginLeft: 5 + 'px' }, dangerouslySetInnerHTML:{__html:this.props.title}});
			var closeBoxCross = React.createElement('a', {onClick: this.closeDialog, style: closeBoxCrossStyle, dangerouslySetInnerHTML:{__html: "&#x274C"}});
			var modalEffectElement = React.createElement('div', {style: dialogBoxWrapper, dangerouslySetInnerHTML:{__html: "&nbsp;"}});
			
			if(this.state.isOwner === true) {
				var submitButton = React.createElement(FlatButton, {onClick: this.props.submitCallback, style: {float: 'right'}, label: "Keep", primary: true});
				var cancelButton = React.createElement(FlatButton, {onClick: this.closeDialog, style: {float: 'right'}, label: "Cancel", secondary: true});
				var dialogBoxOwned = React.createElement('div', {style: materialDialogBoxStyle}, closeBoxCross, title, body, submitButton, cancelButton);
 		        return React.createElement('div', {}, modalEffectElement, dialogBoxOwned);
    		} else {
				var closeButton = React.createElement(FlatButton, {onClick: this.closeDialog, style: {float: 'right'}, label: "Close", default: true});
				var dialogBoxGuest = React.createElement('div', {style: materialDialogBoxStyle}, closeBoxCross, title, body, closeButton);
        		return React.createElement('div', {}, modalEffectElement, dialogBoxGuest);
			}
	  }

	  document.getElementsByTagName("body")[0].style.overflowY = "auto";
	  return null;
  }
});

module.exports = MaterialUiBigDialog;
