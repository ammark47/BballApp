import Sidebar from "react-sidebar";
import SidebarContent from './SidebarContent';
import MaterialTitlePanel from './MaterialTitlePanel';
import ThumbNail from './ThumbNail';

var TeamActions = require('../actions/TeamActions');
var TeamStore = require('../stores/TeamStore');
import { render } from 'react-dom';
import React from 'react';

window.React = React;

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
};

export default class Navs extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._onChange = this._onChange.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.setState = this.setState.bind(this);

    this.state = {
      transitions: true,
      touch: true,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
      sidebarOpen: false, 
      sidebarDocked: false,
      name: this.getStateFromStore(),
    };
  }




  getStateFromStore() {
    return TeamStore.getSelected();
      
  }


   componentWillMount() {
    var mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});

  }

   mediaQueryChanged() {
    this.setState({sidebarDocked: this.state.mql.matches});
  }

  componentDidMount() {
    TeamStore.addChangeListener(this._onChange);
    
  }


  componentWillUnmount() {
    TeamStore.removeChangeListener(this._onChange);
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetOpen(open) {
    this.setState({sidebarOpen: open});
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  toggleOpen(ev) {
    this.setState({sidebarOpen: !this.state.sidebarOpen});

    if (ev) {
      ev.preventDefault();
    }
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

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
  }

  render() {
     
    let sidebar = <SidebarContent lock={this.props.lock} />;

    let contentHeader = (
      <span>
        {!this.state.docked &&
         <a onClick={this.toggleOpen} href='#' style={styles.contentHeaderMenuLink}>=</a>}
        <span> {this.state.name}</span>
      </span>);

    let sidebarProps = {
      sidebar: sidebar,
      docked: this.state.sidebarDocked,
      open: this.state.sidebarOpen,
      touch: this.state.touch,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,

    };

    return (
      <Sidebar {...sidebarProps}>
        <MaterialTitlePanel title={<a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>= &nbsp; {this.state.name}</a>}>
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
  }

  _onChange() {
    var team = this.getStateFromStore();
    this.setState({name: team});
  }

}

