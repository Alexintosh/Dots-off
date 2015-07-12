(function(){
	'use strict';

	angular
	.module('dotsoff')
	.directive('dot', Dot);

	function Dot(){
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

				attrs.$observe('on', function(value){
					if( value == '1') elem.css('background-color', 'white');
					else elem.css('background-color', 'red');
					scope.val = attrs.on;
				});
			},
			controller: function($rootScope, $scope, $element, $attrs){
				var dot = $element[0];

				dot.addEventListener('click', click, false);
				
				function click(){
					var col = parseInt( $attrs.col, 10);
					var row = parseInt( $attrs.row, 10);
					//console.log( 'col: '+$attrs.col );
					//console.log( 'row: '+$attrs.row );
					//console.log( $attrs.on );
					$scope.boardCtrl.calculateAdjacent( row, col );
				}
			}
		};
	}
})();
