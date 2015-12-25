import React from 'react';
import ReactDOM from 'react-dom';
import MaterialTitlePanel from './MaterialTitlePanel';
var TeamActions = require('../actions/TeamActions');



const styles = {
  sidebar: {
    width: 256,
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
};

class SidebarContent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.enterHover = this.enterHover.bind(this);
    this.exitHover = this.exitHover.bind(this);
    this.pushName = this.pushName.bind(this);
    this.state = {final_links: this._createList()};
  }

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
                <a key={links[j]} href='#' style={styles.sidebarLink} onClick={this.pushName.bind(null, team)} onMouseOver={this.enterHover.bind(null, links[j])} onMouseLeave={this.exitHover}>{team}</a>
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

  render() {
    let style = styles.sidebar;

    if (this.props.style) {
      style = update(style, {$merge: this.props.style});
    }


    return (
      <MaterialTitlePanel title="Menu" style={style}>
        <a href='index.html' style={styles.sidebarLink}>Home</a>
        <a href='responsive_example.html' style={styles.sidebarLink}>Log In</a>
        <div style={styles.divider} />
        {this.state.final_links}
      </MaterialTitlePanel>);
  }
}

// hover feature removed for now
// onMouseOver={this.enterHover.bind(null, links[j])} onMouseLeave={this.exitHover}
export default SidebarContent;