(function(){
	'use strict';

	angular
	.module('dotsoff')
	.directive('board', Board);

	function Board(){
		return {
			restrict: 'E',
			template: [
				'<div class="board">',
					'<div class="clear" ng-repeat="row in rows track by $index">',
						'<dot ng-repeat="(k, v) in rows[$index] track by k" data-on="{{v}}">{{v}}</dot>',
					'</div>',
				'</div>'
			].join(''),
			
			controller: function($rootScope, $scope, $element, Game){
				var board = $element[0];
				$scope.dots = [];
				$scope.render = render;

				$rootScope.$on('game.play', startLevel);
				
				function startLevel(){
					console.log('start');
					render();
				}

				function render(){
					$scope.rows = Game.setLevel().schema;
					console.log( $scope.rows);
				}
			}
		};
	}
})();
