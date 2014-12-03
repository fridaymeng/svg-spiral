//add event to big circle
  $("#SvgjsEllipse1006").on("click",function(e){
    var thisX = e.pageX,
      thisY = e.pageY,
      xAndY = Math.pow(thisX-305,2) + Math.pow(thisY-305,2);
    if(false){//xAndY > 88500 && xAndY < 91500
      var draw = thisDraw.draw,
        coordArr = netWork.coordArr,
        coordNum = coordArr.length;
      var smallCircle = draw.circle(10, 10).x(thisX-5).y(thisY-5).attr({ 
               fill : '#fff',
                 id : "smallcircle"+coordNum,
              class : "smallcircle",
           "data-order" : coordNum
      }).stroke({
         width : 3,
         color : '#900' 
      });
      coordArr[coordNum] = {};
      coordArr[coordNum].x = thisX;
      coordArr[coordNum].y = thisY;
      netWork.smallCircleClick(draw);
      if(coordNum > 0){
        var preCoord = coordArr[coordNum-1],
          coordX = preCoord.x,
          coordY = preCoord.y;
        netWork.drawLine(draw,thisX,thisY,coordX,coordY,coordNum);
      }
    }
  })
  //netWork.smallCircleClick(thisDraw.draw);//add event to small circle
  smallCircleClick : function(circle){
                var smallcircle = $("ellipse.smallcircle"),
                    len = smallcircle.length,
                    i;
                for(i = 0; i < len; i ++){
                  (function(n,circle){
                    smallcircle.eq(n).off("click").on("click",function(e){
                        var thisCircle = $(this),
                            draw = circle,
                            coordArr = netWork.coordArr,
                            coordNum = coordArr.length,
                            thisX = thisCircle.attr("cx"),
                            thisY = thisCircle.attr("cy");
                        coordArr[coordNum] = {};
                        coordArr[coordNum].x = thisX;
                        coordArr[coordNum].y = thisY;
                  if(/mastercircle/.test(thisCircle.attr("class"))){
                    if(/clicked/.test(thisCircle.attr("class"))){
                      thisCircle.attr({
                               "class" : "smallcircle mastercircle",
                        "stroke-width" : 3
                      });
                    }else{
                      thisCircle.attr({
                               "class" : "smallcircle mastercircle clicked",
                        "stroke-width" : 10
                      });
                    }
                  }else{
                    var masterCircle = $(".mastercircle.clicked");
                    if(masterCircle.length > 0){
                      var coordX = masterCircle.attr("cx"),
                          coordY = masterCircle.attr("cy");
                      netWork.drawLine(draw,thisX,thisY,coordX,coordY,coordNum);
                    }
                  }
                    })
                  })(i,circle)
                }
          },