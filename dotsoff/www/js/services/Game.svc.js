(function(){
	'use strict';

	angular
	.module('dotsoff')
	.factory('Game', Game);

	function Game(){
		
		var game = {
			lvls: getLevels(),
			setLevel: setLevel
		};

		return game;

		function getLevels(){
			var lvls = [];
			lvls.push( { 
				schema : [
					[ 1, 0, 0, 0 ,0 ],
					[ 0, 1, 0, 0, 0 ],
					[ 0, 0, 1, 0, 0 ],
					[ 0, 0, 0, 1, 0 ],
					[ 0, 0, 0, 0, 1 ]
				]
			});
			return lvls;
		}

		function setLevel( ){
			return game.lvls[0];
		}
	}
})();
