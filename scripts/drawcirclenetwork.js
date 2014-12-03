$(function(){
  var nodeDistri = {
                   width : 600,
                  height : 600,
                coordArr : [],
               colorType : ["#f60","#900","#410b92","#072e75","#026c0e","#022606","#8e3a08","#9d068d"],//define node colortype
               coordData : [{
                              ip : "1.12.6.7",
                              master : true,
                              group : 1
                            },{
                              ip : "2.12.6.7",
                              group : 2,
                              master : true,
                            },{
                              ip : "1.12.6.7",
                              master : true,
                              group : 0
                            },{
                              ip : "2.12.6.7",
                              group : 1
                            },{
                              ip : "3.12.6.7",
                              group : 2
                            },{
                              ip : "4.12.6.7",
                              group : 2
                            },{
                              ip : "3.12.6.7",
                              group : 0
                            },{
                              ip : "5.12.6.7",
                              group : 0
                            },{
                              ip : "6.12.6.7",
                              group : 1
                          }],
              drawCircle : function(){
                  var draw = SVG('drawing').size('100%', '100%');
                  draw.circle(this.width).attr({ 
                      fill : '#fff'
                  }).stroke({
                     width : 5,
                     color : '#08c' 
                  }).move(5,5).animate(5, SVG.easing.bounce).after(function(){
                    nodeDistri.initSmallCircle(draw);//add small circle to network
                  });
              },
                drawLine : function(params){
                  var thisline = params.draw.line(params.x1, params.y1, params.x2, params.y2).stroke({
                     width : 3,
                     color : nodeDistri.colorType[params.group] 
                  }).attr({
                                  id : "netWorkLine-" + params.idNum,
                     "data-masterip" : params.masterIp,
                     "data-commonip" : params.commonIp
                  }).mouseover(function(e){
                    $("#thisposition").show().html("This id is "+this.attr().id).animate({
                       "top" : e.pageY,
                      "left" : e.pageX
                    });
                  }).mouseout(function(){
                    $("#thisposition").hide();
                  })
              },
         randowmPosition : function(){
                var thisRandom = _.random(35,300),
                    thisY = Math.sqrt(90000 - Math.pow(thisRandom,2));
                return {
                  x : thisRandom,
                  y : thisY
                }
        },
         initSmallCircle : function(obj){
               var coordData = _.shuffle(this.coordData),//out of order
                   len = coordData.length,
                   i;
               var draw = obj,
                   circleType = "commoncircle",
                   strokeWidth,
                   circlePosion,
                   circlePosionX,
                   circlePosionY,
                   fillColor;
                for(i = 0; i < len; i ++){
                      circlePosion = nodeDistri.randowmPosition(),
                      circlePosionX = circlePosion.x,
                      circlePosionY = circlePosion.y,
                      fillColor = nodeDistri.colorType[coordData[i].group];
                      if(coordData[i].master){
                          circleType = "mastercircle";
                          if(circlePosionX % 2 == 0){
                              circlePosionY = -circlePosionY;
                          }
                       circlePosionX = -circlePosionX;
                         strokeWidth = 8;
                      }else{
                           fillColor = "#fff";
                          circleType = "commoncircle";
                         strokeWidth = 2;
                        if(circlePosionX % 2 == 0){
                            circlePosionY = -circlePosionY;
                        }
                      }
                      +function addSmallCircle(cond){
                        var thisCircle = draw.circle(10).x(300).y(300).animate(800, SVG.easing.bounce).move(circlePosionX+300,circlePosionY+300).attr({ 
                                 fill : fillColor,
                                   id : "smallcircle" + i,
                                class : "smallcircle " + circleType,
                         "data-group" : coordData[i].group,
                         "data-order" : i,
                            "data-ip" : coordData[i].ip
                        })
                        thisCircle.stroke({
                           width : strokeWidth,
                           color : nodeDistri.colorType[coordData[i].group] 
                        }).after(function(){
                          nodeDistri.drawAllLine(obj);
                        })
                        draw.text(function(add) {
                          //add.tspan(coordData[i].ip).x(circlePosionX+320).y(circlePosionY+320);
                        });
                      }()
                }
          },
            drawAllLine : function (obj){
                  var commonCircle = $(".commoncircle"),
                      masterCircle = $(".mastercircle"),
                      len = commonCircle.length,
                      mlen = masterCircle.length,
                      i;
                  if((len+mlen) == this.coordData.length){
                    for(i = 0; i < mlen; i ++){
                        (function(n){
                          var draw = obj,
                              masterEq = masterCircle.eq(n),
                              masterIp = masterEq.attr("data-ip"),
                              m,
                              thisCircle;
                          for(m = 0; m < len; m++){
                              thisCircle = commonCircle.eq(m);
                              if(thisCircle.attr("data-group") == masterEq.attr("data-group")){
                                  nodeDistri.drawLine({
                                        draw : draw,
                                          x1 : thisCircle.attr("cx"),
                                          y1 : thisCircle.attr("cy"),
                                          x2 : masterEq.attr("cx"),
                                          y2 : masterEq.attr("cy"),
                                       group : masterEq.attr("data-group"),
                                    masterIp : masterIp,
                                    commonIp : thisCircle.attr("data-ip"),
                                      idNum : m
                                  });
                              }
                          }
                        })(i)
                    }
                  }
          }
    };
    if(SVG.supported){
      nodeDistri.drawCircle();// create node dirtribution
    }else{
      $("#drawing")[0].innerHTML = "您的浏览器不支持SVG矢量图！"
    }
})