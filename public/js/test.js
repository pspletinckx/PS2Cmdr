angular.module('jadeAngularExpress')

.controller('TestCtrl',[function(){

  this.map4 =[
"Indar_Tile_-64_032_LOD3.jpg",
"Indar_Tile_-32_032_LOD3.jpg",
"Indar_Tile_000_032_LOD3.jpg",
"Indar_Tile_032_032_LOD3.jpg",

"Indar_Tile_-64_000_LOD3.jpg",
"Indar_Tile_-32_000_LOD3.jpg",
"Indar_Tile_000_000_LOD3.jpg",
"Indar_Tile_032_000_LOD3.jpg",

"Indar_Tile_-64_-32_LOD3.jpg",
"Indar_Tile_-32_-32_LOD3.jpg",
"Indar_Tile_000_-32_LOD3.jpg",
"Indar_Tile_032_-32_LOD3.jpg",

"Indar_Tile_-64_-64_LOD3.jpg",
"Indar_Tile_-32_-64_LOD3.jpg",
"Indar_Tile_000_-64_LOD3.jpg",
"Indar_Tile_032_-64_LOD3.jpg"

];

}])


.directive("drawing", function(){
  return {
    restrict: "A",
    link: function(scope, element){
      var ctx = element[0].getContext('2d');
      
      // variable that decides if something should be drawn on mousemove
      var drawing = false;
      
      // the last coordinates before the current move
      var centerX;
      var centerY;
      var map4 =[
		"Indar_Tile_-64_032_LOD3.jpg",
		"Indar_Tile_-32_032_LOD3.jpg",
		"Indar_Tile_000_032_LOD3.jpg",
		"Indar_Tile_032_032_LOD3.jpg",

		"Indar_Tile_-64_000_LOD3.jpg",
		"Indar_Tile_-32_000_LOD3.jpg",
		"Indar_Tile_000_000_LOD3.jpg",
		"Indar_Tile_032_000_LOD3.jpg",

		"Indar_Tile_-64_-32_LOD3.jpg",
		"Indar_Tile_-32_-32_LOD3.jpg",
		"Indar_Tile_000_-32_LOD3.jpg",
		"Indar_Tile_032_-32_LOD3.jpg",

		"Indar_Tile_-64_-64_LOD3.jpg",
		"Indar_Tile_-32_-64_LOD3.jpg",
		"Indar_Tile_000_-64_LOD3.jpg",
		"Indar_Tile_032_-64_LOD3.jpg"

		];

		console.log(window.innerWidth);
	function drawMap(){
		// var mapscale = window.innerWidth/4;
		var mapscale = 700/4;

		  ctx.scale(1, -1);
	      var image = new Image();
	      image.src="http://localhost:3000/map/Indar4/"+map4[0];
	      ctx.drawImage(image,0,-100,100,100);

	      image.src="http://localhost:3000/map/Indar4/"+map4[1];
	      //ctx.drawImage(image,mapscale,0,mapscale,mapscale);

	      for (var i = map4.length - 1; i >= 0; i--) {
	      	image.src="http://localhost:3000/map/Indar4/"+map4[i];
	      	ctx.drawImage(image,i%4*mapscale,Math.floor(i/4)*mapscale*-1-mapscale,mapscale,mapscale);
	      };
	      ctx.scale(1, -1);
  	}

/*      for (var i = map4.length - 1; i >= 0; i--) {
      	console.log(map4[i]);
		image.src="http://localhost:3000/map/Indar4/"+map4[i];
		image.id=i*mapscale;
		      image.addEventListener("load",function(){
		      	ctx.drawImage(image,image.id,image.id,image.id%4,image.id/4);
		      	console.log(image.id);
		      });


      };*/
      
      
      drawMap();
      element.bind('mousedown', function(event){
        
        centerX = event.offsetX;
        centerY = event.offsetY;
        
        // begins new line
        ctx.beginPath();
        
        drawing = true;
      });

      element.bind('mousemove', function(event){
        if(drawing){
          // get current mouse position
          currentX = event.offsetX;
          currentY = event.offsetY;
          
          
          draw(centerX, centerY, currentX, currentY);
        }
        
      });

      element.bind('mouseup', function(event){
        // stop drawing
        drawing = false;
      });
        
      // canvas reset
      function reset(){
       element[0].width = element[0].width; 
      }
      
      function draw(startX, startY, currentX, currentY){
        reset();
        var sizeX = currentX - startX;
        var sizeY = currentY - startY;
        drawMap();
        ctx.rect(startX, startY, sizeX, sizeY);
        ctx.lineWidth = 3;
        // color
        ctx.strokeStyle = '#fff';
        // draw it
        ctx.stroke();
      }
    }
  };
});