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
				scope.col = attrs.col;
				scope.row = attrs.row;
				scope.boardCtrl = boardCtrl;

				elem[0].style.background = scope.getColor();
				elem[0].classList.add('animated');
				elem[0].classList.add('zoomIn');

				attrs.$observe('on', function(value){
					if( value == '1') {
						//elem[0].classList.remove('flip');
						elem[0].classList.add('on');
						$timeout(function(){
							elem[0].classList.remove('zoomIn');						
							elem[0].classList.add('pulse');
						}, 800)
					}
					else {
						elem[0].classList.remove('on');
						elem[0].classList.remove('pulse');
						elem[0].classList.add('zoomIn');
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

				dot.addEventListener('click', click, false);
				$scope.getColor = getColor;
				
				function click(){
					var result = document.getElementsByClassName("dot");
					for(var i in result){
						if( result[i].classList !== undefined)
						result[i].classList.remove('flip');
					}
					var col = parseInt( $attrs.col, 10);
					var row = parseInt( $attrs.row, 10);
					//$element[0].classList.remove('flip');
					//$element[0].classList.add('flip');
					$scope.boardCtrl.calculateAdjacent( row, col );
				}

				function getColor(){
					return color[Math.floor(Math.random() * color.length)];
				}
			}
		};
	}
})();
