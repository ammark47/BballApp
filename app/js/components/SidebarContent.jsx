import React, {PropTypes} from 'react';
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
    this.state = {
      final_links: this._createList(),
      isShowingModal: false,
      initial_links: first_links,
    };
  }

  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})


  pushName(name) {
                TeamActions.setTeamName(name);
                
            }

  _createList() {
          let links = ["Atlanta Hawks", "Boston Celtics", 
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

          let final_links = [];


          for(let j=0; j < links.length; j++) {
            let team = links[j];
          
            final_links.push(
                <a key={links[j]} style={styles.base.sidebarLink} onClick={this.pushName.bind(null, team)} onMouseOver={this.enterHover.bind(null, links[j])} onMouseLeave={this.exitHover}>{team}

                </a>
              );
          }
          return (final_links);
  }

  componentDidMount() {
      var final_links = this._createList();
  }

  enterHover(team_name) {
    
      TeamActions.setHoverTeam(team_name);
    
  }

  exitHover() {
    TeamActions.removeHoverTeam();
  }

  changeLinks() {
      
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
        {this.state.final_links}
      </MaterialTitlePanel>);
  }
}

export default SidebarContent;
// hover feature 
// onMouseOver={this.enterHover.bind(null, links[j])} onMouseLeave={this.exitHover}

//search feature
// <Search
        //     items={this.state.initial_links}
        //     placeholder='Search for your team'
        //     onChange={this.changeLinks}/>
//module.exports = SidebarContent;