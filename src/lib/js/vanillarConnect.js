import $ from "jquery";



class Connect {

    constructor(args){
        this.Container= $(args.container);
        this.SVG = $(args.SVG);  
        console.log(args);
        this.resetSVGsize();
    }
    //helper functions, it turned out chrome doesn't support Math.sgn() 
     signum(x) {
        return (x < 0) ? -1 : 1;
    }
     absolute(x) {
        return (x < 0) ? -x : x;
    }
    
     drawPath( path, startX, startY, endX, endY) {
        // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
        var stroke =  parseFloat(path.css("stroke-width"));
        // check if the svg is big enough to draw the path, if not, set heigh/width
        if ( this.SVG.attr("height") <  endY)       
        this.SVG.attr("height", endY);
    
        if ( this.SVG.attr("width" ) < (startX + stroke) ) 
        this.SVG.attr("width", (startX + stroke));
    
        if ( this.SVG.attr("width" ) < (endX   + stroke) ) 
        this.SVG.attr("width", (endX   + stroke));
        
        var deltaX = (endX - startX) * 0.15;
        var deltaY = (endY - startY) * 0.15;
        // for further calculations which ever is the shortest distance
        var delta  =  deltaY <  this.absolute(deltaX) ? deltaY :  this.absolute(deltaX);
    
        // set sweep-flag (counter/clock-wise)
        // if start element is closer to the left edge,
        // draw the first arc counter-clockwise, and the second one clock-wise
        var arc1 = 0; var arc2 = 1;
        if (startX > endX) {
            arc1 = 1;
            arc2 = 0;
        }
        // draw tha pipe-like path
        // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
        path.attr("d",  "M"  + startX + " " + startY +
                        " V" + (startY + delta) +
                        " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta* this.signum(deltaX)) + " " + (startY + 2*delta) +
                        " H" + (endX - delta* this.signum(deltaX)) + 
                        " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
                        " V" + endY );
    }
    
     connectElements( path, startElem, endElem) {
          
        startElem = $(startElem)
        endElem = $(endElem)
        path = $(path)
        // if first element is lower than the second, swap!
        if(startElem.offset().top > endElem.offset().top){
            var temp = startElem;
            startElem = endElem;
            endElem = temp;
        }
    
        // get (top, left) corner coordinates of the svg container   
        var svgTop  =   this.Container.offset().top;
        var svgLeft =   this.Container.offset().left;
    
        // get (top, left) coordinates for the two elements
        var startCoord = startElem.offset();
        var endCoord   = endElem.offset();
    
        // calculate path's start (x,y)  coords
        // we want the x coordinate to visually result in the element's mid point
        var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
        var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset
    
            // calculate path's end (x,y) coords
        var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
        var endY = endCoord.top  - svgTop;
    
        // call function for drawing the path
        this.drawPath(path, startX, startY, endX, endY);
    }
     resetSVGsize(){
        this.SVG.attr("height", "0");
        this.SVG.attr("width", "0"); 
    }
    
    
     connectAll() {
        // // connect all the paths you want!
        // this.connectElements($("#svg1"), $("#path1"), $("#red"),   $("#teal"));
        // this.connectElements($("#svg1"), $("#path3"), $("#red"),    $("#orange"));
        // this.connectElements($("#svg1"), $("#path3"), $("#teal"),   $("#aqua")  );
        // this.connectElements($("#svg1"), $("#path4"), $("#red"),    $("#aqua")  ); 
        // this.connectElements($("#svg1"), $("#path5"), $("#purple"), $("#teal")  );
        // this.connectElements($("#svg1"), $("#path6"), $("#orange"), $("#green") );
    
        // this.connectElements($("#svg1"), $("#path1"), $("#teal"), $("#red") );
    }
    checkIt(){
        this.connectAll() 
    }
    }
    
    export default Connect;
    