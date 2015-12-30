import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import MaterialTitlePanel from './MaterialTitlePanel';
import Radium from 'radium';
var TeamActions = require('../actions/TeamActions');

import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import Search from 'react-search';



const styles = {
  base: {
            sidebar: {
              width: 256,
            },
            sidebarLink: {
              display: 'block',
              padding: '16px 0px',
              color: '#757575',
              textDecoration: 'none',
              borderRadius: "10px"
            },
            divider: {
              margin: '8px 0',
              height: 1,
              backgroundColor: '#757575',
            },

            ':hover' : {
            backgroundColor: '00FFFF'
            },
      },
};

let first_links = ["Atlanta Hawks", "Boston Celtics", 
                      "Brooklyn Nets",
                      "Charlotte Hornets",
                      "Chicago Bulls",
                      "Cleveland Cavaliers", 
                      "Dallas Mavericks",
                      "Denver Nuggets",
                      "Detroit Pistons",
                      "Golden State Warriors", "Houston Rockets", 
                      "Indiana Pacers",
                      "LA Clippers",
                      "LA Lakers",
                      "Memphis Grizzlies", 
                      "Miami Heat",
                      "Milwaukee Bucks",
                      "Minnesota Timberwolves",
                      "New Orleans Pelicans",
                      "New York Knicks",
                      "Oklahoma City Thunder",
                      "Orlando Magic",
                      "Philadelphia Sixers",
                      "Phoenix Suns",
                      "Portland Trail Blazers",
                      "Sacramento Kings",
                      "San Antonio Spurs",
                      "Toronto Raptors",
                      "Utah Jazz", "Washington Wizards"];

@Radium
class SidebarContent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.enterHover = this.enterHover.bind(this);
    this.exitHover = this.exitHover.bind(this);
    this.pushName = this.pushName.bind(this);
    this.createList = this.createList.bind(this);
    this.changeLinks = this.changeLinks.bind(this);
    this.setState = this.setState.bind(this);
    this.state = {
      result_links: this.createList(),
      isShowingModal: false,
      initial_links: first_links,
    };
  }

  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})


  pushName(name) {
                TeamActions.setTeamName(name);
                
            }

  createList(results) {
    let initial_links = first_links;
    
    if(typeof results == 'undefined' || results.length == 0) {
          var links = [];
           links = initial_links;

            } else {
              links = results;
            }
          
          let result_links = [];


          for(let j=0; j < links.length; j++) {
            let team = links[j];
          
            result_links.push(
                <a key={links[j]} style={styles.base.sidebarLink} onClick={this.pushName.bind(null, team)} onMouseOver={this.enterHover.bind(null, links[j])} onMouseLeave={this.exitHover}>{team}

                </a>
              );
          }
          return (result_links);

  }

  componentDidMount() {
      var result_links = this.createList();

  }

  enterHover(team_name) {
    
      TeamActions.setHoverTeam(team_name);
    
  }

  exitHover() {
    TeamActions.removeHoverTeam();
  }

  changeLinks(e, results) {
       this.setState({result_links: this.createList(results)});
      
  }

  render() {
    let style = styles.base.sidebar;

    if (this.props.style) {
      style = update(style, {$merge: this.props.style});
    }


    return (
      <MaterialTitlePanel title="Menu" style={style}>
        <a href='#' style={styles.base.sidebarLink}>Home</a>
        <a onClick={this.handleClick} style={styles.base.sidebarLink}>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1>Coming Soon!</h1>
              </ModalDialog>
            </ModalContainer>
          }

        Log In

        </a>
        <div style={styles.base.divider} />
            <Search
                items={this.state.initial_links}
                placeholder='Search for your team'
                onChange={this.changeLinks}/>
            {this.state.result_links}
      </MaterialTitlePanel>);
  }
}

export default SidebarContent;
// hover feature 
// onMouseOver={this.enterHover.bind(null, links[j])} onMouseLeave={this.exitHover}

