(function(){
	'use strict';

	angular
	.module('dotsoff')
	.controller('GameCtrl', GameCtrl);

	function GameCtrl($rootScope, Game, $timeout){
		var vm = this;
		vm.showStartScreen = true;

		vm.start = start;

		function start(){
			vm.showStartScreen = false;
			$rootScope.$broadcast('game.play');
		}
		
		$timeout(start, 150);
	}
})();
