(function(){
	'use strict';

	angular
	.module('dotsoff')
	.directive('dot', Dot);

	function Dot(){
		return {
			restrict: 'E',
			template: [
				'<div class="dot">',
				'</div>'
			].join(''),

			replace: true,

			link: function(scope, elem, attrs) {
				if( attrs.on == '1') elem.css('background-color', 'white');
			},
			controller: function($rootScope, $scope, $element){
				var dot = $element[0];

				dot.addEventListener('click', click, false);

				function click(){
					console.log('cliiiiiiiiik');
				}
			}
		};
	}
})();
