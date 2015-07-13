(function(){
	'use strict';

	angular
	.module('dotsoff')
	.controller('GameCtrl', GameCtrl);

	function GameCtrl($rootScope, Game, $timeout){
		var vm = this;
		vm.showStartScreen = true;

		vm.start = start;
		vm.startEndless = startEndless;

		$rootScope.$on('game.menu', menu);

		function menu(){
			vm.showStartScreen = true;
		}

		function start(){
			vm.showStartScreen = false;
			$rootScope.$broadcast('game.play');
		}

		function startEndless(){
			vm.showStartScreen = false;
			$rootScope.$broadcast('game.play.endless');
		}
		
	}
})();
