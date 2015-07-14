(function(){
	'use strict';

	angular
	.module('dotsoff')
	.factory('Game', Game);

	function Game(){

		var game = {
			lvls: getLevels(),
			setLevel: setLevel,
			isSolved: isSolved,
			settings: Settings(),
			generate: generate,
			move: move
		};

		return game;

		function Settings(){
			return {
				level: 0,
				grid: 4,
				difficulty: 7,
				levelTimer: 60
			};
		}

		function getLevels(){
			var lvls = [];
			/*
			lvls.push( {
				schema : [
					[ 0, 0, 0, 0 ,0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			*/

			lvls.push( {
				schema: [
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 1, 0, 0 ],
					[ 0, 1, 1, 1, 0 ],
					[ 0, 0, 1, 0, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});

			lvls.push( {
				schema: [
					[ 1, 0, 0, 0, 0 ],
					[ 0, 1, 0, 0, 0 ],
					[ 0, 0, 1, 0, 0 ],
					[ 0, 0, 0, 1, 0 ],
					[ 0, 0, 0, 0, 1 ]
				]
			});

			lvls.push( {
				schema: [
					[ 1, 1, 0, 1, 1 ],
					[ 1, 0, 1, 0, 1 ],
					[ 0, 1, 1, 1, 0 ],
					[ 1, 0, 1, 0, 1 ],
					[ 1, 1, 0, 1, 1 ]
				]
			});

			lvls.push( {
				schema: [
					[ 0, 1, 0, 1, 0 ],
					[ 1, 1, 0, 1, 1 ],
					[ 0, 1, 0, 1, 0 ],
					[ 1, 0, 1, 0, 1 ],
					[ 1, 0, 1, 0, 1 ]
				]
			});
			lvls.push( {
				schema: [
					[ 1, 0, 0, 0, 1 ],
					[ 1, 1, 0, 1, 1 ],
					[ 0, 0, 1, 0, 0 ],
					[ 1, 0, 1, 0, 0 ],
					[ 1, 0, 1, 1, 0 ]
				]
			});
			lvls.push( {
				schema: [
					[ 1, 1, 0, 1, 1 ],
					[ 0, 0, 0, 0, 0 ],
					[ 1, 1, 0, 1, 1 ],
					[ 0, 0, 0, 0, 1 ],
					[ 1, 1, 0, 0, 0 ]
				]
			});
			lvls.push( {
				schema: [
					[ 1, 1, 1, 1, 1 ],
					[ 1, 1, 1, 1, 1 ],
					[ 1, 1, 1, 1, 1 ],
					[ 1, 1, 1, 1, 1 ],
					[ 1, 1, 1, 1, 1 ]
				]
			});
			lvls.push( {
				schema: [
					[ 0, 0, 0, 1, 1 ],
					[ 0, 0, 0, 1, 1 ],
					[ 0, 0, 0, 0, 0 ],
					[ 1, 1, 0, 0, 0 ],
					[ 1, 1, 0, 0, 0 ]
				]
			});
			lvls.push( {
				schema: [
					[ 0, 0, 0, 0, 0 ],
					[ 0, 1, 1, 1, 0 ],
					[ 1, 1, 1, 1, 1 ],
					[ 0, 1, 1, 1, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			lvls.push( {
				schema: [
					[ 0, 0, 0, 0, 0 ],
					[ 0, 1, 1, 1, 0 ],
					[ 0, 1, 1, 1, 0 ],
					[ 0, 1, 1, 1, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			lvls.push( {
				schema: [
					[ 1, 1, 0, 1, 1 ],
					[ 1, 1, 0, 1, 1 ],
					[ 0, 0, 0, 0, 0 ],
					[ 1, 1, 0, 1, 1 ],
					[ 1, 1, 0, 1, 1 ]
				]
			});
			lvls.push( {
				schema: [
					[ 1, 1, 1, 1, 1 ],
					[ 1, 0, 0, 0, 1 ],
					[ 1, 0, 0, 0, 1 ],
					[ 1, 0, 0, 0, 1 ],
					[ 1, 1, 1, 1, 1 ]
				]
			});
			lvls.push( {
				schema: [
					[ 0, 0, 1, 1, 1 ],
					[ 0, 0, 0, 1, 1 ],
					[ 1, 0, 0, 0, 1 ],
					[ 1, 1, 0, 0, 0 ],
					[ 1, 1, 1, 0, 0 ]
				]
			});
			lvls.push( {
				schema: [
					[ 1, 0, 0, 0, 1 ],
					[ 0, 1, 0, 1, 0 ],
					[ 0, 0, 1, 0, 0 ],
					[ 0, 1, 0, 1, 0 ],
					[ 1, 0, 0, 0, 1 ]
				]
			});
			lvls.push( {
				schema: [
					[ 1, 1, 1, 1, 1 ],
					[ 1, 0, 1, 0, 1 ],
					[ 1, 1, 1, 1, 1 ],
					[ 1, 0, 1, 0, 1 ],
					[ 1, 1, 1, 1, 1 ]
				]
			});
			lvls.push( {
				schema: [
					[ 0, 0, 0, 0, 1 ],
					[ 0, 0, 0, 1, 1 ],
					[ 0, 0, 1, 0, 1 ],
					[ 0, 1, 0, 0, 1 ],
					[ 1, 1, 1, 1, 1 ]
				]
			});
			lvls.push( {
				schema: [
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			lvls.push( {
				schema: [
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			lvls.push( {
				schema: [
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			return lvls;
		}

		function setLevel( level ){
			if( game.lvls[level] !== undefined && level != 'endless') return game.lvls[level];
			return generate();
		}

		function generate(){
			//var schema = [];
			/*
			var schema = [
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ]
			];
			*/

			var schema = function(){
				var t = [];
				for(var i = 0; i <= game.settings.grid; i++ ){
					t[i] = [];
					for(var j = 0; j <= game.settings.grid; j++ ){
						t[i].push(0);
					}
				}
				return t;
			}();

			var solution = [];

			for(var i = 0; i < game.settings.difficulty; i++ ){
				var x = Math.round( Math.random() * game.settings.grid);
				var y = Math.round( Math.random() * game.settings.grid);
				solution.push([y, x]);
				schema = move(y, x, schema);
			}

			return {
				schema: schema,
				solution: solution
			};

		}

		function move(y, x, schema){
			var rows = schema;
			if( y > game.settings.grid || x > game.settings.grid ) return rows;

			if( rows[y][x] == 1 ) rows[y][x] = 0;
			else rows[y][x] = 1;
			//Up
			if(rows[(y + 1)] !== undefined){
				if( rows[(y + 1)][x] == 1 ) rows[(y + 1)][x] = 0;
				else rows[(y + 1)][x] = 1;
			}
			//Down
			if(rows[(y - 1)] !== undefined){
				if( rows[y - 1][x] == 1 ) rows[y - 1][x] = 0;
				else rows[y - 1][x] = 1;
			}
			//Right
			if(rows[y][(x + 1)] !== undefined){
				if( rows[y][x + 1] == 1 ) rows[y][x + 1] = 0;
				else rows[y][x + 1] = 1;
			}
			//Left
			if(rows[y][(x - 1)] !== undefined){
				if( rows[y][x - 1] == 1 ) rows[y][x - 1] = 0;
				else rows[y][x - 1] = 1;
			}
			return schema;
		}

		function isSolved(schema){
			for(var i = 0; i < schema.length; i++ )
				for(var y = 0; y < schema[i].length; y++ )
					if( schema[i][y] > 0) return false;

			return true;
		}
	}
})();
