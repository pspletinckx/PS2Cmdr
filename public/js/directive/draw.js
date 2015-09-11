angular.module('jadeAngularExpress')
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

  function drawAllMap(scale,x,y){
    if (scale==null) return;
    if (scale <2) drawMap4(scale,x,y);
    if (scale <4 && scale >=2)drawMap8(scale,x,y);
    }

	function drawMap4(scale,x,y){
		// var mapscale = window.innerWidth/4;
    var xpos = x;
    var ypos = y;
    var scale = scale;

		var mapscale = 700/4;
      ctx.scale(scale,scale);
      ctx.translate(xpos,ypos);

		  ctx.scale(1, -1);
	      var image = new Image();
	      for (var i = map4.length - 1; i >= 0; i--) {
	      	image.src="http://localhost:3000/map/Indar4/"+map4[i];
	      	ctx.drawImage(image,i%4*mapscale,Math.floor(i/4)*mapscale*-1-mapscale,mapscale,mapscale);
	      };
	      ctx.scale(1, -1);
  	}
      
      function drawMap8(scale,x,y){
    // var mapscale = window.innerWidth/4;
    var xpos = x;
    var ypos = y;
    var scale = scale;

    var mapscale = 700/8;
      ctx.scale(scale,scale);
      ctx.translate(xpos,ypos);

      ctx.scale(1, -1);
       
        var dimentions = 8;
        for (var i = dimentions-1; i >= 0; i--) {
            for (var j = 8-1; j >= 0; j--) {
              console.log("new object-----------------------------------------------------------------");
            console.log("j: "+j);
            console.log("i: "+i);
            console.log("a: "+partToString((i-4)*128/dimentions)+" b: "+partToString((3-j)*128/dimentions));
            var fileName ="Indar_Tile_"+partToString((i-4)*128/dimentions)+"_"+partToString((3-j)*128/dimentions)+"_LOD2.jpg";
            console.log(fileName);
            var image = new Image();
            image.src="http://localhost:3000/map/Indar8/"+fileName;
            ctx.drawImage(image,i*mapscale,Math.floor(j)*mapscale*-1-mapscale,mapscale,mapscale);
            console.log(i*mapscale);
            console.log(j*mapscale*-1-mapscale);
          };
        };
        ctx.scale(1, -1);
    }
      
      drawAllMap(1,0,0);
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

      function partToString(number){
        if (number>0&& number<99) return "0"+number;
        else if (number<0) return ""+number;
        else if (number == 0) return "000";
      }
      
      function draw(startX, startY, currentX, currentY){
        reset();
        var sizeX = currentX - startX;
        var sizeY = currentY - startY;
        drawAllMap(1,0,0);
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