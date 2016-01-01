var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TeamConstants = require('../constants/TeamConstants');
var _ = require('underscore');



var _team = "New York Knicks"; var _original = "New York Knicks";
var _localTeam = localStorage.getItem('_localTeam');
//set the team name when side menu is clicked and reserving the original team when being hovered
function setName(name) {
	_team = name;
	_original = name;
	localStorage.setItem('_localTeam', name);
	localStorage.setItem('_localOriginal', name);
	
}

//set a temp team name when sidemenu item is being hovered
function setHover(team) {
	_original = _team;
	localStorage.setItem('_localOriginal', _team);

	_team = team;
	localStorage.setItem('_localTeam', team);

}

function removeHover() {
	//console.log(_original);
	_team = _original;
	localStorage.setItem('_localTeam', _original);
}

var TeamStore = _.extend({}, EventEmitter.prototype, {
	getSelected: function() {
		var _localTeam = localStorage.getItem('_localTeam');

		if(_localTeam !== "undefined"){
			// console.log(typeof (_localTeam) );
			return _localTeam;
		} else {

		return _team;
	}
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callback) {
		this.on('change', callback);
		
		
	},

	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	}
});


AppDispatcher.register(function(payload){
	var action = payload.action;
	var text;

	switch(action.actionType) {
		case TeamConstants.SET_NAME:
			setName(action.index);
			break;
		case TeamConstants.ADD_HOVER:
			setHover(action.hover);
			break;
		case TeamConstants.REMOVE_HOVER:
			removeHover();
			break;
		default:
			return true;
	}

	TeamStore.emitChange();
	

	return true;
});

module.exports = TeamStore;
