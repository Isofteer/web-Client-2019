import $ from 'jquery';

class HTMLSVGconnect {

    constructor(options) {
        this.pluginName = "HTMLSVGconnect";
        this.defaults = {
            stroke: "#000000",
            strokeWidth: 2,
            orientation: "vertical",
            class: "",
            // Array of objects with properties "start" & "end" that
            // define the selectors of the elements to connect:
            // i.e., {start: "#purple", end: "#green"}.
            // Optional properties:
            //  "stroke": [color],
            //  "strokeWidth": [px],
            //  "orientation": [horizontal|vertical|auto (default)]
            //  "offset": [px]
            //paths: []
        };
       
        this.options = options;
        this.settings = $.extend({}, this.defaults, this.options);
        this.$element =$("#divId")
       
    }


    Plugin() {

        this.$element.find("svg").remove();

        this.$svg = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"));

        this.$svg.attr("height", 0).attr("width", 0);

        this.$element.append(this.$svg);
        // text
        this.$text = $(document.createElementNS("http://www.w3.org/2000/svg", "text"));

        this.$svg.append(this.$text);      

        // Draw the paths, and store references to the loaded elements.
        this.loadedPaths = $.map(this.settings.paths, $.proxy(this.connectSetup, this));
        $(window).off("resize").on("resize",(e)=>{
            e.stopPropagation();
            this.handleResize(this);     
        });
    }

    handleResize(self){      
         self.Plugin();     
    }
     // Recalculate paths.
     reset () {
        this.$svg.attr("height", 0).attr("width", 0);
        $.map(this.loadedPaths, $.proxy(this.connectElements, this));
      }

      connectSetup(pathConfig, i) {
        if (pathConfig.hasOwnProperty("start") && pathConfig.hasOwnProperty("end")) {
          var $start = $(pathConfig.start), $end = $(pathConfig.end);
          // Start/end elements exist.
          if ($start.length && $end.length) {
            var $path = $(document.createElementNS("http://www.w3.org/2000/svg", "path"));
            // Custom/default path properties.
            var stroke = pathConfig.hasOwnProperty("stroke") ? pathConfig.stroke : this.settings.stroke;
            var strokeWidth = pathConfig.hasOwnProperty("strokeWidth") ? pathConfig.strokeWidth : this.settings.strokeWidth;
            var path_class = pathConfig.hasOwnProperty("class") ? pathConfig.class : this.settings.class;
            var pathId = "path_" + i;
            $path.attr("fill", "none")
              .attr("stroke", stroke)
              .attr("stroke-width", strokeWidth)
              .attr("class", path_class)
              .attr("id", pathId);
            this.$svg.append($path);
  
            if (pathConfig.text) {
              var $tspan = this._createSvgTextPath(pathConfig.text, strokeWidth, pathId);
            }
  
            var pathData = {
              "path": $path,
              "start": $start,
              "end": $end,
              "text": pathConfig.text,
              "tspan": $tspan,
              "orientation": pathConfig.hasOwnProperty("orientation") ? pathConfig.orientation : this.settings.orientation,
              "offset": pathConfig.hasOwnProperty("offset") ? parseInt(pathConfig.offset) : 0
              };

            this.connectElements(pathData);

            this.$pathData = pathData;

            // Save for reference.
            return pathData;
          }
        }
        return null; // Ignore/invalid.
      }
  
      _createSvgTextPath (text, strokeWidth, pathId) {
        // textPath
        var textPathElement = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
        textPathElement.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + pathId);
        textPathElement.setAttribute("startOffset", "50%");
        var $textPath = $(textPathElement);
        this.$text.append($textPath);
        var tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        $textPath.append($(tspan));
        var dy = (strokeWidth / 2) + 2;
        tspan.setAttribute("dy",  - dy);
        // need to reset the dy, another tspan is needed
        var otherTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        $textPath.append($(otherTspan));
        otherTspan.setAttribute("dy", dy);
        $(otherTspan).text(" ");
        var $tspan = $(tspan);
        return $tspan;
      }


  
      // Whether the path should originate from the top/bottom or the sides;
      // based on whichever is greater: the horizontal or vertical gap between the elements
      // (this depends on the user positioning the elements sensibly,
      // and not overlapping them).
      determineOrientation ($startElem, $endElem) {
        // If first element is lower than the second, swap.
        if ($startElem.offset().top > $endElem.offset().top) {
          var temp = $startElem;
          $startElem = $endElem;
          $endElem = temp;
        }
        var startBottom = $startElem.offset().top + $startElem.outerHeight();
        var endTop = $endElem.offset().top;
        var verticalGap = endTop - startBottom;
        // If first element is more left than the second, swap.
        if ($startElem.offset().left > $endElem.offset().left) {
          var temp2 = $startElem;
          $startElem = $endElem;
          $endElem = temp2;
        }
        var startRight = $startElem.offset().left + $startElem.outerWidth();
        var endLeft = $endElem.offset().left;
        var horizontalGap = endLeft - startRight;
        return horizontalGap > verticalGap ? "vertical" : "horizontal";
      }
  
      connectElements (pathData) {
        var $startElem = pathData.start,
        $endElem = pathData.end,
        orientation = pathData.orientation;
        // Orientation not set per path and/or defaulted to global "auto".
        if (orientation != "vertical" && orientation != "horizontal") {
          orientation = this.determineOrientation($startElem, $endElem);
        }
        var swap = false;
        if (orientation == "vertical") {
          // If first element is more left than the second.
          swap = $startElem.offset().left > $endElem.offset().left;
        } else { // Horizontal
          // If first element is lower than the second.
          swap = $startElem.offset().top > $endElem.offset().top;
        }
        if (swap) {
          var temp = $startElem;
          $startElem = $endElem;
          $endElem = temp;
        }
        // Get (top, left) corner coordinates of the svg container.
        var svgTop = this.$element.offset().top;
        var svgLeft = this.$element.offset().left;
  
        // Get (top, left) coordinates for the two elements.
        var startCoord = $startElem.offset();
        var endCoord = $endElem.offset();
  
        // Centre path above/below or left/right of element.
        var centreSX = 0.5, centreSY = 1,
          centreEX = 0.5, centreEY = 0;
        if (orientation == "vertical") {
          centreSX = 1;
          centreSY = 0.5;
          centreEX = 0;
          centreEY = 0.5;
        }
        // Calculate the path's start/end coordinates.
        // We want to align with the elements' mid point.
        var startX = startCoord.left + centreSX * $startElem.outerWidth() - svgLeft;
        var startY = startCoord.top + centreSY * $startElem.outerHeight() - svgTop;
        var endX = endCoord.left + centreEX * $endElem.outerWidth() - svgLeft;
        var endY = endCoord.top + centreEY * $endElem.outerHeight() - svgTop;
  
        this.drawPath(pathData.path, pathData.offset, orientation, startX, startY, endX, endY);
        if (pathData.text != undefined && pathData.tspan != undefined) {
          this.drawText(pathData.text, pathData.tspan);
        }
      }
  
      drawPath ($path, offset, orientation, startX, startY, endX, endY) {
        var stroke = parseFloat($path.attr("stroke-width"));
        // Check if the svg is big enough to draw the path, if not, set height/width.
        if (this.$svg.attr("width") < (Math.max(startX, endX) + stroke)) this.$svg.attr("width", (Math.max(startX, endX) + stroke));
        if (this.$svg.attr("height") < (Math.max(startY, endY) + stroke)) this.$svg.attr("height", (Math.max(startY, endY) + stroke));
  
        var deltaX = (Math.max(startX, endX) - Math.min(startX, endX)) * 0.15;
        var deltaY = (Math.max(startY, endY) - Math.min(startY, endY)) * 0.15;
        // For further calculations whichever is the shortest distance.
        var delta = Math.min(deltaY, deltaX);
        // Set sweep-flag (counter/clockwise)
        var arc1 = 0; var arc2 = 1;
  
        if (orientation == "vertical") {
          var sigY = this.sign(endY - startY);
          // If start element is closer to the top edge,
          // draw the first arc counter-clockwise, and the second one clockwise.
          if (startY < endY) {
            arc1 = 1;
            arc2 = 0;
          }
          // Draw the pipe-like path
          // 1. move a bit right, 2. arch, 3. move a bit down, 4.arch, 5. move right to the end
          $path.attr("d", "M" + startX + " " + startY +
            " H" + (startX + offset + delta) +
            " A" + delta + " " + delta + " 0 0 " + arc1 + " " + (startX + offset + 2 * delta) + " " + (startY + delta * sigY) +
            " V" + (endY - delta * sigY) +
            " A" + delta + " " + delta + " 0 0 " + arc2 + " " + (startX + offset + 3 * delta) + " " + endY +
            " H" + endX);
        } else {
          //Horizontal
          var sigX = this.sign(endX - startX);
          // If start element is closer to the left edge,
          // draw the first arc counter-clockwise, and the second one clockwise.
          if (startX > endX) {
            arc1 = 1;
            arc2 = 0;
          }
          // Draw the pipe-like path
          // 1. move a bit down, 2. arch, 3. move a bit to the right, 4.arch, 5. move down to the end
          $path.attr("d", "M" + startX + " " + startY +
            " V" + (startY + offset + delta) +
            " A" + delta + " " + delta + " 0 0 " + arc1 + " " + (startX + delta * sigX) + " " + (startY + offset + 2 * delta) +
            " H" + (endX - delta * sigX) +
            " A" + delta + " " + delta + " 0 0 " + arc2 + " " + endX + " " + (startY + offset + 3 * delta) +
            " V" + endY);
        }
      }
  
      /*
       * Draw text for a path, takes the text for a path and the id of the path element and will create a textPath element.
       */
      drawText (text, $textPath) {
        $textPath.text(text);
      }
  
      /*
       * Add array of path objects
       * e.g., var paths = [{ start: "#red", end: "#green" }, { start: "#aqua", end: "#green", stroke: "blue" }];
       * Public method within the plugin's prototype:
       * $("#svgContainer").HTMLSVGconnect("addPaths", paths);
       */
      addPaths(paths) {
        var loadedPaths = $.map(paths, $.proxy(this.connectSetup, this));
        Array.prototype.push.apply(this.loadedPaths, loadedPaths);
      }
  
      // Chrome Math.sign() support.
      sign (x) {
        return x > 0 ? 1 : x < 0 ? -1 : x;
      }
  
   
    

}
export default HTMLSVGconnect;
