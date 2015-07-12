(function(){
	'use strict';

	angular
	.module('dotsoff')
	.directive('board', Board);

	function Board($compile){
		return {
			restrict: 'E',
			template: [
				'<div class="board">',
					'<div class="clear" ng-repeat="row in rows.schema track by $index">',
						'<dot ng-repeat="(k, v) in rows.schema[$index] track by k" row="{{$parent.$index}}" col="{{k}}" on="{{v}}"></dot>',
					'</div>',
				'</div>'
			].join(''),
			controller: function($rootScope, $scope, $element, Game, $compile, $timeout){
				var board = $element[0];
				$scope.dots = [];
				$scope.render = render;
				this.calculateAdjacent = calculateAdjacent;

				$rootScope.$on('game.play', startLevel);
				
				function startLevel(){
					console.log('start');
					render();
				}

				function render(){
					$scope.rows = Game.setLevel();
				}

				function calculateAdjacent(y, x){
					var rows = $scope.rows.schema;

					if( rows[y][x] == 1 ) rows[y][x] = 0;
					else rows[y][x] = 1;
					//Up
					if(rows[(y+1)] !== undefined){
						if( rows[(y+1)][x] == 1 ) rows[(y+1)][x] = 0;
						else rows[(y+1)][x] = 1;
					}
					//Down
					if(rows[(y-1)] !== undefined){
						if( rows[y-1][x] == 1 ) rows[y-1][x] = 0;
						else rows[y-1][x] = 1;
					}
					//Right
					if(rows[y][(x+1)] !== undefined){
						if( rows[y][x+1] == 1 ) rows[y][x+1] = 0;
						else rows[y][x+1] = 1;
					}
					//Left
					if(rows[y][(x-1)] !== undefined){
						if( rows[y][x-1] == 1 ) rows[y][x-1] = 0;
						else rows[y][x-1] = 1;
					}

					$scope.$apply(function(){
						$scope.rows = { schema: rows };
					});
				}
			}
		};
	}
})();
