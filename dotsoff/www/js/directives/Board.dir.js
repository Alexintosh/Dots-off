(function(){
	'use strict';

	angular
	.module('dotsoff')
	.directive('board', Board);

	function Board($compile){
		return {
			restrict: 'E',
			template: [
				'<div class="screen">',
					'<div class="board">',
						'<div class="clear" ng-repeat="row in rows.schema track by $index">',
							'<dot ng-repeat="(k, v) in rows.schema[$index] track by k" row="{{$parent.$index}}" col="{{k}}" on="{{v}}"></dot>',
						'</div>',
					'</div>',
					'<button ng-click="restart()" class="button button-positive">Restart</button>',
				'</div>'
			].join(''),
			controller: function($rootScope, $scope, $element, Game, $compile, $timeout, $ionicPopup){
				var board = $element[0];
				$scope.render = render;
				$scope.restart = restart;
				this.calculateAdjacent = calculateAdjacent;

				$rootScope.$on('game.play', startLevel);
				
				function startLevel(){
					render();
				}

				function restart(){
					$scope.moves = 0;
					$scope.rows = [];
					$timeout(function(){
						render();
					}, 300)
				}

				function render(){
					resetAnimation();
					$scope.moves = 0;
					var lvl = Game.setLevel( Game.settings.level );
					lvl = JSON.parse(JSON.stringify(lvl));
					$scope.rows = lvl;
				}

				function resetAnimation(){
					var result = document.getElementsByClassName("dot");
					for(var i in result){
						if( result[i].classList !== undefined){
							result[i].className = 'dot animated';
							//result[i].classList.add('rotateIn');
							//result[i].classList.remove('pulse');
						}
					}
				}

				function calculateAdjacent(y, x){
					var rows = $scope.rows.schema;
					var _rows = Game.move(y, x, rows);	

					$scope.$apply(function(){
						$scope.rows = { schema: _rows };
						$scope.moves++;
						if( Game.isSolved(rows) ) endGame();	
					});
				}

				function endGame(){
					$timeout(function(){
						var alertPopup = $ionicPopup.alert({
							title: 'You won!',
							template: 'In '+$scope.moves+' moves'
						});
						alertPopup.then(function(res) {
							Game.settings.level++;
								var next = Game.setLevel( Game.settings.level );
								if(next) render(); 
						});

					}, 600);
				}
			}
		};
	}
})();
