var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeamConstants = require('../constants/TeamConstants');

var TeamActions = {
	recieveTeamName: function(name) {
		AppDispatcher.handleAction({
			actionType: TeamConstants.RECIEVE_TEAM,
			name: name
		})
	},

	setTeamName: function(index) {
		AppDispatcher.handleAction({
			actionType: TeamConstants.SET_NAME,
			index: index
		})
	},

	setHoverTeam: function(hoverTeam) {
		AppDispatcher.handleAction({
			actionType: TeamConstants.ADD_HOVER,
			hover: hoverTeam
		})
	},

	removeHoverTeam: function(){
		AppDispatcher.handleAction({
			actionType: TeamConstants.REMOVE_HOVER
		})
	}

}

module.exports = TeamActions;