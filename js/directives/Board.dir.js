(function(){
	'use strict';

	angular
	.module('dotsoff')
	.directive('board', Board);

	function Board(){
		return {
			restrict: 'E',
			template: [
				'<div class="screen" ng-if="gameStarted">',
					'<div class="bar bar-header bar-light">',
						'<div class="h1 title">Level {{levelCounter}}&nbsp;',
							'<span ng-if="mode == \'default\'"> | <i class="icon ion-android-time"> {{time}}</i></span>',
						'</div>',
						'<button ng-click="setPause()" class="button button-clear button-positive">',
							'<span ng-if="!pause">Pause</span>',
							'<span ng-if="pause">Play</span>',
						'</button>',
					'</div>',
					'<div class="board">',
						'<div class="clear" ng-repeat="row in rows.schema track by $index">',
							'<dot ng-repeat="(k, v) in rows.schema[$index] track by k" solution="{{isSolution($parent.$index, k)}}" row="{{$parent.$index}}" col="{{k}}" on="{{v}}"></dot>',
						'</div>',
					'</div>',
					'<p class="commands">',
						'<button ng-click="restart()" ng-if="gameStarted" class="button button-outline button-positive">Restart</button>',
						'<button ng-click="menu()" ng-if="gameStarted" class="button button-outline button-calm">Menu</button>',
					'</p>',
				'</div>'
			].join(''),
			controller: function($rootScope, $scope, $element, Game, $compile, $timeout, $ionicPopup, $interval){
				var timer;
				var c = this;
				$scope.render = render;
				$scope.restart = restart;
				$scope.setPause = setPause;
				$scope.menu = menu;
				$scope.isSolution = isSolution;
				$scope.time = Game.settings.levelTimer;
				$scope.levelCounter = Game.settings.level + 1;
				$scope.moves = 0;				
				$scope.pause = false;
				$scope.mode = 'default';
				$scope.gameStarted = 0;
				c.calculateAdjacent = calculateAdjacent;
				c.moves = $scope.moves;

				$rootScope.$on('game.play', function(){
					$scope.levelCounter = Game.settings.level + 1;
					startLevel();
				});
				$rootScope.$on('game.play.endless', function(){
					$scope.mode = 'endless';
					$scope.levelCounter = 1;
					startLevel();
				});

				function startLevel(){
					render();
				}

				function setPause(){
					if(!$scope.pause){
						$scope.pause = true;
						$interval.cancel(timer);
						return true;
					}
					$scope.pause = false;
					startTimer();
				}

				function startTimer(){
					if( $scope.mode != 'default' ) return true;
					timer = $interval(function(){
						$scope.time--;
						if( $scope.time < 1) endGame(false);
					}, 1000);
				}

				function restart(){
					$interval.cancel(timer);
					$scope.time = Game.settings.levelTimer;
					$scope.pause = false;
					$scope.rows = [];
					$timeout(function(){
						render();
					}, 100);
				}

				function menu(){
					$interval.cancel(timer);
					$scope.mode = 'default';
					$scope.gameStarted = 0;
					$rootScope.$broadcast('game.menu');
				}

				function render(){
					var lvl;
					$scope.pause = false;
					$scope.moves = 0;
					c.moves = 0;
					$scope.gameStarted = 1;
					$scope.time = Game.settings.levelTimer;

					if($scope.mode == 'endless') lvl = Game.setLevel( 'endless' );
					else lvl = Game.setLevel( Game.settings.level );

					lvl = JSON.parse(JSON.stringify(lvl));
					$scope.rows = lvl;
					startTimer();
				}

				function isSolution(y, x){
					return 0;
					/*
					TODO
					for(var i in $scope.rows.solution){
						var comb = $scope.rows.solution[i];
						if( (comb[0] == x) && (comb[1] == y) ){
							return 1;
						}
					}
					return 0;
					*/
				}

				function calculateAdjacent(y, x){
					if($scope.pause) return false;
					var rows = $scope.rows.schema;
					var _rows = Game.move(y, x, rows);

					$scope.$apply(function(){
						$scope.rows = { schema: _rows };
						$scope.moves++;
						c.moves++;
						if( Game.isSolved(rows) ) endGame(true);
					});
				}

				function endGame(_win){
					$rootScope.$broadcast('game.level.end');
					var win = _win || false;
					$interval.cancel(timer);
					var tpl = {};

					setPause();

					if(win){
						tpl.title = "You won!";
						tpl.template = $scope.moves + ' moves ' +
						( $scope.mode == 'default' ? 'and ' + (Game.settings.levelTimer - $scope.time) + ' seconds' : '');
						tpl.button = 'Next level';
					} else {
						tpl.title = "You lost :(";
						tpl.template = 'Out of time!<br/> <strong>' + $scope.moves + '</strong> moves';
						tpl.button = 'Restart';
					}
					$timeout(function(){
						var alertPopup = $ionicPopup.alert({
							title: tpl.title,
							template: tpl.template,
							okText: tpl.button
						});
						alertPopup.then(function() {
							if(win)	Game.settings.level++;
							else {
								restart();
								return true;
							}

							var next = Game.setLevel( Game.settings.level );
							if(next) {
								$scope.levelCounter++;
								$scope.rows = [];
								$timeout(function(){
									render();
								}, 100);
							}
						});

					}, 600);
				}
			}
		};
	}
})();
