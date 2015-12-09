import Sidebar from "react-sidebar";
import SidebarContent from './SidebarContent';
import MaterialTitlePanel from './MaterialTitlePanel';
import ThumbNail from './ThumbNail';
var TeamActions = require('../actions/TeamActions');
var TeamStore = require('../stores/TeamStore');

var React = require('react');


const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
};

var Navs = React.createClass({
  getStateFromStore() {
    return TeamStore.getSelected();
      
  },

  getInitialState() {
    return {
      docked: true,
      open: false,
      transitions: true,
      touch: true,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
      name: this.getStateFromStore()
    };
  },

  componentDidMount: function() {
    TeamStore.addChangeListener(this._onChange);
    
  },

  componentWillUnmount: function() {
    TeamStore.removeChangeListener(this._onChange);
  },



  onSetOpen(open) {
    this.setState({open: open});
  },



  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  },



  renderPropNumber(prop) {
    let setMethod = (ev) => {
      let newState = {};
      newState[prop] = parseInt(ev.target.value);
      this.setState(newState);
    };

    return (
      <p key={prop}>
         {prop} <input type='number' onChange={setMethod} value={this.state[prop]} />
      </p>);
  },

  render() {
    let sidebar = <SidebarContent />;

    let contentHeader = (
      <span>
        {!this.state.docked &&
         <a onClick={this.menuButtonClick} href='#' style={styles.contentHeaderMenuLink}>=</a>}
        <span> {this.state.name}</span>
      </span>);

    let sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      open: this.state.open,
      touch: this.state.touch,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    };

    return (
      <Sidebar {...sidebarProps}>
        <MaterialTitlePanel title={this.state.name}>
          <div className="content">
              <div className="wrap">
                 <div className="control" role="main" style={{"height": "2180px"}}>
                      
                       <ThumbNail />
   
                  </div>
              </div>
          </div>
        </MaterialTitlePanel>
      </Sidebar>
    );
  },

  _onChange() {
    var team = this.getStateFromStore();
    this.setState({name: team});
   
  },
});


module.exports = Navs;