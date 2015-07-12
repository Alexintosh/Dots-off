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
				level: 0
			};
		}

		function getLevels(){
			var lvls = [];
			lvls.push( { 
				schema : [
					[ 0, 0, 0, 0 ,0 ],
					[ 0, 0, 1, 0, 0 ],
					[ 0, 1, 1, 1, 0 ],
					[ 0, 0, 1, 0, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});

			lvls.push( { 
				schema : [
					[ 1, 0, 0, 0 ,0 ],
					[ 0, 1, 0, 0, 0 ],
					[ 0, 0, 1, 0, 0 ],
					[ 0, 0, 0, 1, 0 ],
					[ 0, 0, 0, 0, 1 ]
				]
			});

			lvls.push( { 
				schema : [
					[ 1, 1, 0, 1 ,1 ],
					[ 1, 0, 1, 0, 1 ],
					[ 0, 1, 1, 1, 0 ],
					[ 1, 0, 1, 0, 1 ],
					[ 1, 1, 0, 1, 1 ]
				]
			});

			lvls.push( { 
				schema : [
					[ 0, 1, 0, 1 ,0 ],
					[ 1, 1, 0, 1, 1 ],
					[ 0, 1, 0, 1, 0 ],
					[ 1, 0, 1, 0, 1 ],
					[ 1, 0, 1, 0, 1 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 1, 0, 0, 0 ,1 ],
					[ 1, 1, 0, 1, 1 ],
					[ 0, 0, 1, 0, 0 ],
					[ 1, 0, 1, 0, 0 ],
					[ 1, 0, 1, 1, 0 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 1, 1, 0, 1 ,1 ],
					[ 0, 0, 0, 0, 0 ],
					[ 1, 1, 0, 1, 1 ],
					[ 0, 0, 0, 0, 1 ],
					[ 1, 1, 0, 0, 0 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 1, 1, 1, 1, 1 ],
					[ 1, 1, 1, 1, 1 ],
					[ 1, 1, 1, 1, 1 ],
					[ 1, 1, 1, 1, 1 ],
					[ 1, 1, 1, 1, 1 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 0, 0, 0, 1, 1 ],
					[ 0, 0, 0, 1, 1 ],
					[ 0, 0, 0, 0, 0 ],
					[ 1, 1, 0, 0, 0 ],
					[ 1, 1, 0, 0, 0 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 0, 0, 0, 0, 0 ],
					[ 0, 1, 1, 1, 0 ],
					[ 1, 1, 1, 1, 1 ],
					[ 0, 1, 1, 1, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 0, 0, 0, 0 ,0 ],
					[ 0, 1, 1, 1, 0 ],
					[ 0, 1, 1, 1, 0 ],
					[ 0, 1, 1, 1, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 1, 1, 0, 1, 1 ],
					[ 1, 1, 0, 1, 1 ],
					[ 0, 0, 0, 0, 0 ],
					[ 1, 1, 0, 1, 1 ],
					[ 1, 1, 0, 1, 1 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 1, 1, 1, 1, 1 ],
					[ 1, 0, 0, 0, 1 ],
					[ 1, 0, 0, 0, 1 ],
					[ 1, 0, 0, 0, 1 ],
					[ 1, 1, 1, 1, 1 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 0, 0, 1, 1, 1 ],
					[ 0, 0, 0, 1, 1 ],
					[ 1, 0, 0, 0, 1 ],
					[ 1, 1, 0, 0, 0 ],
					[ 1, 1, 1, 0, 0 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 0, 0, 0, 0 ,0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 1, 0, 0, 0, 1 ],
					[ 0, 1, 0, 1, 0 ],
					[ 0, 0, 1, 0, 0 ],
					[ 0, 1, 0, 1, 0 ],
					[ 1, 0, 0, 0, 1 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 1, 1, 1, 1, 1 ],
					[ 1, 0, 1, 0, 1 ],
					[ 1, 1, 1, 1, 1 ],
					[ 1, 0, 1, 0, 1 ],
					[ 1, 1, 1, 1, 1 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 0, 0, 0, 0, 1 ],
					[ 0, 0, 0, 1, 1 ],
					[ 0, 0, 1, 0, 1 ],
					[ 0, 1, 0, 0, 1 ],
					[ 1, 1, 1, 1, 1 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 0, 0, 0, 0 ,0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 0, 0, 0, 0 ,0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			lvls.push( { 
				schema : [
					[ 0, 0, 0, 0 ,0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0 ]
				]
			});
			return lvls;
		}

		function setLevel( level ){
			if( game.lvls[level] !== undefined) return game.lvls[level];
			return {
				schema: generate()
			};
		}

		function generate(){
			var schema = [];
			for(var i = 0; i<5; i++){
				schema[i] = [];
				for(var y = 0; y<5; y++){
					var val = Math.round(Math.random());
					schema[i][y] = val;
				}
			}
			return schema;

		}

		function move(y, x, schema){
			var rows = schema;

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
			return schema;
		}

		function canBeSolved(schema){
			console.log(schema);
			for(var i = 0; i<schema.length; i++){
				var string = '';
				for(var y = 0; y<schema[i].length; y++){
					string += ', '+schema[i][y];
					if( schema[i][y] > 0){
						var t = move(i, y, schema);	
						//return canBeSolved(t)
						break;
					}
				
				}
				console.log(string);
			}
		}

		function isSolved(schema){
			for(var i = 0; i<schema.length; i++)	
				for(var y = 0; y<schema[i].length; y++)	
					if( schema[i][y] > 0)
						return false

			return true;
		}
	}
})();
