(function(){
	'use strict';

	angular
	.module('dotsoff')
	.directive('dot', Dot);

	function Dot($timeout){
		return {
			require: '^board',
			restrict: 'E',
			template: [
				'<div class="dot">',
					//'{{row}},{{col}} - {{val}}',
				'</div>'
			].join(''),
			replace: true,
			link: function(scope, elem, attrs, boardCtrl) {
				var animation = 'zoomIn';
				scope.col = attrs.col;
				scope.row = attrs.row;
				scope.boardCtrl = boardCtrl;

				elem[0].style.background = scope.getColor();
				elem[0].classList.add('animated');
				elem[0].classList.add('zoomIn');

				//if( parseInt(attrs.solution) === 1) elem[0].style.background = '#000';

				if(attrs.on == '1'){
					$timeout(function(){
						elem[0].classList.add('pulse');
					}, 600);
				}	

				attrs.$observe('on', function(value){
					elem[0].className = 'dot animated';
					if( value == '1') {
						elem[0].classList.add('on');
					}
					else {
						//if(scope.boardCtrl.moves <= 0) 
						elem[0].classList.add(animation);
					}
					scope.val = attrs.on;
				});
			},
			controller: function($rootScope, $scope, $element, $attrs){
				var dot = $element[0];
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

				$rootScope.$on('game.level.end', function(){
					$element[0].className = 'dot animated zoomOut';
				});

				dot.addEventListener('click', click, false);
				$scope.getColor = getColor;

				function click(){
					var col = parseInt( $attrs.col, 10);
					var row = parseInt( $attrs.row, 10);
					$scope.boardCtrl.calculateAdjacent( row, col );
				}

				function getColor(){
					return color[Math.floor(Math.random() * color.length)];
				}
			}
		};
	}
})();
