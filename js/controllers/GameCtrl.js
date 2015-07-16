(function(){
	'use strict';

	angular
	.module('dotsoff')
	.controller('GameCtrl', GameCtrl);

	function GameCtrl($rootScope, Game, $localStorage){
		var vm = this;
		vm.showStartScreen = true;
		vm.start = start;
		vm.arcade = arcade;
		vm.menu = menu;
		vm.startEndless = startEndless;
		vm.lvls = Game.lvls;
		vm.setLevel = setLevel;
		var c = [];
		for(var i = 0; i < 25; i++){
			c.push( getColor() );
		}
		vm.colors = c;

		Game.settings.lastLevel = parseInt($localStorage.get('arcadeLevel')) || 0;
		vm.level = Game.settings.lastLevel;

		$rootScope.$on('game.menu', menu);
		$rootScope.$on('game.arcade', arcade);

		function menu(){
			Game.settings.lastLevel = parseInt($localStorage.get('arcadeLevel')) || 0;
			vm.level = Game.settings.lastLevel;
			vm.showMenu = false;
			vm.showStartScreen = true;
		}

		function arcade(){
			Game.settings.lastLevel = parseInt($localStorage.get('arcadeLevel')) || 0;
			vm.level = Game.settings.lastLevel;
			vm.showStartScreen = false;
			vm.showMenu = true;
		}

		function setLevel(i){
			if(i > Game.settings.lastLevel) return false;
			Game.settings.level = i;
			vm.showMenu = false;
			$rootScope.$broadcast('game.play');			
		}

		function start(){
			vm.showStartScreen = false;
			vm.showMenu = false;
			$rootScope.$broadcast('game.play');
		}

		function startEndless(){
			vm.showStartScreen = false;
			$rootScope.$broadcast('game.play.endless');
		}

		function getColor(i){
			var color = [
				'#81B3FF',
				'#E35C41',
				'#FF4900',
				'#FF7B06',
				'#FF525F',
				'#1AB5A2',
				'#78C26A',
				'#DBCF1F'
			];

			return color[Math.floor(Math.random() * color.length)];
		}
	}
})();
