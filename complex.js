'use strict'
{
  var canvas = document.querySelector('canvas');//canvas取得
  var ctx = canvas.getContext('2d');//context取得
  var canvasW = 1000;//canvasの横幅
  var canvasH = 1000;//canvasの縦幅
  var oX;//原点x
  var oY;//原点y
  var clickX;//クリック座標x
  var clickY;//クリック座標y
  var x;
  var y;
  var amp;//振幅
  var p;//初期位相
  var inputAng;
  var af;
  var t;
  var resultX_cos;
  var resultY_cos;
  var resultX_cos2;
  var resultY_cos2;
  var resultX_sin;
  var resultY_sin;
  var resultX_sin2;
  var resultY_sin2;
  var rect;
  var clickX2;
  var clickY2;

  //画像読み込み
  var img_sin = new Image();
  var img_cos = new Image();
  img_sin.src = "img/sin.png";
  img_cos.src = "img/cos.png";
  
  var clickAng =document.getElementById("angular");

  window.onload = function(){
    canvas.width = canvasW;
    canvas.height = canvasH;
    oX = Math.ceil(canvasW/4);// 原点計算
    oY = Math.ceil(canvasH/4);
    drawInit();//座標軸初期化
    
    //クリック時に行う描画の処理
    canvas.addEventListener("click", draw, false);
    clickAng.addEventListener("click", redraw, false);
      
    //単位円クリック時の描画
    function draw(e){
      if(clickX<352 && clickX>148&&clickY<352 &&clickY>148){

        //座標軸初期化
        drawInit();

        //クリック座標取得と計算, border分-2
        rect = e.target.getBoundingClientRect();
        clickX = e.clientX - Math.floor(rect.left)-2;
        clickY = e.clientY - Math.floor(rect.top)-2 ;

        clickX2 = clickX;//クリック座標を保存
        clickY2 = clickY;
        
        //表示する座標値の計算
        x = (clickX - oX)/100;//原点からの距離を変換してxに代入
        y = -(clickY - oY)/100;//原点からの距離を変換してyに代入
        if(x >= -1 && x <=1 && y >= -1 && y <=1){
          // ctx.fillText(`取得座標 x = ${x}, y = ${y}`, 600, 700);
          ctx.fillText(`${Math.round(Math.sqrt(x*x+y*y)*1000)/1000}`, 560, 825);
        }

        //原点からクリック座標に伸びる線
        ctx.beginPath();
        ctx.moveTo(clickX,clickY);
        ctx.lineTo(oX, oY);
        ctx.stroke();

        //********************************************************
        //パラメータ1
        amp = Math.sqrt(x*x+y*y);//振幅
        p = Math.atan2(y, x);//初期位相

        //青線に変更
        ctx.strokeStyle = "#fecdcc";
        ctx.fillStyle = "#fecdcc";
        ctx.setLineDash([2, 2]);

        //クリック座標から伸びる横線
        ctx.beginPath();
        ctx.moveTo(clickX,clickY);
        ctx.lineTo(1000, clickY);
        ctx.stroke();

        //クリック座標から伸びる縦線
        ctx.beginPath();
        ctx.moveTo(clickX, clickY);
        ctx.lineTo(clickX, 1000);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(clickX,550.0-100.0*amp*Math.cos(p));
        ctx.lineTo(1000,550.0-100.0*amp*Math.cos(p));
        ctx.stroke();

        //青線をもとに戻す
        ctx.setLineDash([]);
        ctx.fillStyle = "#696969";

        //クリック位置の点を描画
        ctx.beginPath(); // パスの初期化
        ctx.arc(clickX, clickY, 5, 0, Math.PI*2);
        ctx.closePath(); // パスを閉じる
        ctx.fill(); // 軌跡の範囲を塗りつぶす

        //********************************************************
        //描線の設定
        ctx.beginPath();
        ctx.strokeStyle = "#c92e36";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([]);
        
        //パラメータ2
        inputAng = document.getElementById('angular');
        af= inputAng.value;//角周波数
        t = 1.0;//秒数

        //表示
        ctx.fillText(`${inputAng.value} π [rad/s]`, 860, 745);
        ctx.strokeStyle = "#c92e36";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(860,753);
        ctx.lineTo(965,753);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(557,830);
        ctx.lineTo(613,830);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(557,878);
        ctx.lineTo(665,878);
        ctx.stroke();

        ctx.setLineDash([1, 1]);
        ctx.fillText(`${Math.round(Math.atan2(y,x)*1000)/1000} [rad]`, 560, 870);

        //sin波
        ctx.moveTo(450,clickY);//始点
        for (var i = 0.0; i <= 450.0*t; i += 1.0) {
          var resultX_sin = i;
          var resultY_sin = amp*Math.sin(af*Math.PI*(i/450.0)+p);
          ctx.lineTo(resultX_sin +450.0,250.0-100.0*resultY_sin);
        }
        ctx.setLineDash([]);
        ctx.stroke();

        //cos波1
        ctx.beginPath();
        ctx.moveTo(450,550.0-100.0*amp*Math.cos(p));//始点
        for (var i = 0.0; i <= 450.0*t; i += 1.0) {
          resultX_cos = i;
          resultY_cos = amp*Math.cos(af*Math.PI*(i/450.0)+p);
          ctx.lineTo(resultX_cos+450.0,550.0-100.0* resultY_cos);
        }
        ctx.setLineDash([]);
        ctx.stroke();

        //cos波2
        ctx.beginPath();
        ctx.moveTo(clickX,450);//始点
        for (var i = 0.0; i <= 450.0*t; i += 1.0) {
          resultX_cos2 = amp*Math.cos(af*Math.PI*(i / 450.0) + p)
          resultY_cos2 = i;
          ctx.lineTo(250.0 + 100.0 * resultX_cos2, resultY_cos2 + 450.0);
        }
        ctx.setLineDash([]);
        ctx.stroke();
        //********************************************************
      }
    }

    function redraw(e){
      drawInit();
      ctx.fillText(`${Math.round(Math.sqrt(x*x+y*y)*1000)/1000}`, 560, 825);
  
      //原点からクリック座標に伸びる線の再描画
      ctx.beginPath();
      ctx.moveTo(clickX2,clickY2);
      ctx.lineTo(oX, oY);
      ctx.stroke();

      //********************************************************
      //パラメータ1の再計算
      amp = Math.sqrt(x*x+y*y);//振幅
      p = Math.atan2(y, x);//初期位相

      //青線に変更
      ctx.strokeStyle = "#fecdcc";
      ctx.fillStyle = "#fecdcc";
      ctx.setLineDash([2, 2]);

      //クリック座標から伸びる横線の再描画
      ctx.beginPath();
      ctx.moveTo(clickX2,clickY2);
      ctx.lineTo(1000, clickY2);
      ctx.stroke();

      //クリック座標から伸びる縦線の再描画
      ctx.beginPath();
      ctx.moveTo(clickX2, clickY2);
      ctx.lineTo(clickX2, 1000);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(clickX2,550.0-100.0*amp*Math.cos(p));
      ctx.lineTo(1000,550.0-100.0*amp*Math.cos(p));
      ctx.stroke();
    
      ctx.beginPath();
      ctx.moveTo(clickX2,550.0-100.0*amp*Math.cos(p));
      ctx.lineTo(1000,550.0-100.0*amp*Math.cos(p));
      ctx.stroke();

      //青線をもとに戻す
      ctx.setLineDash([]);
      ctx.fillStyle = "#696969";

      //クリック位置の点を描画
      ctx.beginPath(); // パスの初期化
      ctx.arc(clickX2, clickY2, 5, 0, Math.PI*2);
      ctx.closePath(); // パスを閉じる
      ctx.fill(); // 軌跡の範囲を塗りつぶす

      //********************************************************
      //描線の設定
      ctx.beginPath();
      ctx.strokeStyle = "#c92e36";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([]);
      
      //パラメータ2
      inputAng = document.getElementById('angular');
      af= inputAng.value;//角周波数
      t = 1.0;//秒数

      //表示
      ctx.fillText(`${inputAng.value} π [rad/s]`, 860, 745);
      ctx.strokeStyle = "#c92e36";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(860,753);
      ctx.lineTo(965,753);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(557,830);
      ctx.lineTo(613,830);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(557,878);
      ctx.lineTo(665,878);
      ctx.stroke();

      ctx.setLineDash([1, 1]);
      ctx.fillText(`${Math.round(Math.atan2(y,x)*1000)/1000} [rad]`, 560, 870);

      //sin波
      ctx.moveTo(450,clickY2);//始点
      for (var i = 0.0; i <= 450.0*t; i += 1.0) {
        resultX_sin = i;
        resultY_sin = amp*Math.sin(af*Math.PI*(i/450.0)+p);
        ctx.lineTo(resultX_sin +450.0,250.0-100.0*resultY_sin);
      }
      ctx.setLineDash([]);
      ctx.stroke();

      //cos波1
      ctx.beginPath();
      ctx.moveTo(450,550.0-100.0*amp*Math.cos(p));//始点
      for (var i = 0.0; i <= 450.0*t; i += 1.0) {
        resultX_cos = i;
        resultY_cos = amp*Math.cos(af*Math.PI*(i/450.0)+p);
        ctx.lineTo(resultX_cos+450.0,550.0-100.0* resultY_cos);
      }
      ctx.setLineDash([]);
      ctx.stroke();

      //cos波2
      ctx.beginPath();
      ctx.moveTo(clickX2,450);//始点
      for (var i = 0.0; i <= 450.0*t; i += 1.0) {
        resultX_cos2 = amp*Math.cos(af*Math.PI*(i / 450.0) + p)
        resultY_cos2 = i;
        ctx.lineTo(250.0 + 100.0 * resultX_cos2, resultY_cos2 + 450.0);
      }
      ctx.setLineDash([]);
      ctx.stroke();
      //********************************************************

    }


    canvas.addEventListener("mousemove", (e) => {
      ctx.clearRect(0, 0, 160, 130);
      ctx.strokeStyle = "black";
      ctx.fillStyle = "black";

      //クリック座標取得と計算, border分-2
      var rect = e.target.getBoundingClientRect();
      clickX = e.clientX - Math.floor(rect.left)-2;
      clickY = e.clientY - Math.floor(rect.top)-2 ;


      //表示する座標値の計算
      var x = (clickX - oX)/100;//原点からの距離を変換してxに代入
      var y = -(clickY - oY)/100;//原点からの距離を変換してyに代入
      if(x >= -1 && x <=1 && y >= -1 && y <=1){
        ctx.font = '10pt Arial';
        ctx.fillText(`座標 x=${x}, y=${y}`,30, 30);
      }
    });
  }

  function drawInit(){
    if(typeof canvas.getContext==='undefined'){
      return;
    }
    //描画クリア
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.font = '15pt Arial';
    ctx.fillText(`複素正弦波の振幅・位相・周波数`,350, 50);
      
    //座標軸のスタイル指定
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#b4b4b4";
    ctx.fillStyle = "#696969";
    ctx.font = '11pt Arial';
    var axisLength = 125;//軸の長さ

    //x軸描画
    // x座標軸を描画
    ctx.beginPath();
    ctx.moveTo(axisLength, oY);
    ctx.lineTo(canvasW -500 - axisLength, oY);
    ctx.stroke();
    // x座標軸の矢印を描画
    ctx.beginPath();
    ctx.moveTo(canvasW -500 - axisLength, oY);//circleを左寄せするため-500
    ctx.lineTo(canvasW -500 - axisLength - 10, oY - 7);
    ctx.lineTo(canvasW -500 - axisLength - 10, oY + 7);
    ctx.fill();

    //y軸描画
    // y座標軸を描画
    ctx.beginPath();
    ctx.moveTo(oX, axisLength);
    ctx.lineTo(oX, canvasH -500 - axisLength);
    ctx.stroke();
    // y座標軸の矢印を描画
    ctx.beginPath();
    ctx.moveTo(oX, axisLength);
    ctx.lineTo(oX - 7, axisLength + 10);
    ctx.lineTo(oX + 7, axisLength + 10);
    ctx.fill();

    //座標軸の文字と円を描画
    ctx.beginPath();
    var maxWidth = 100;
    ctx.fillText('0', oX - 13, oY + 15, maxWidth);
    ctx.fillText('-1', oX - 117, oY + 15, maxWidth);
    ctx.fillText('1', oX + 105, oY + 15, maxWidth);
    ctx.fillText('+j', oX - 20, oY - 107, maxWidth);
    ctx.fillText('-j', oX - 15, oY + 115, maxWidth);
    ctx.fillText('虚部', oX - 10, oY - axisLength - 6, maxWidth);
    ctx.fillText('実部', oX + axisLength + 5, oY + 4, maxWidth);
    ctx.arc(oX, oY, 100, 0, 2 * Math.PI, true);
    ctx.stroke();//表示


    //右座標軸
    ctx.beginPath();
    ctx.moveTo(425,250);
    ctx.lineTo(925,250);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(450,125);
    ctx.lineTo(450,375);
    ctx.stroke();

    //軸ラベル
    ctx.beginPath();
    var maxWidth = 100;
    ctx.fillText('0', 438, oY + 15, maxWidth);
    ctx.fillText('-1', 434, 367, maxWidth);
    ctx.fillText('1', 438, 165, maxWidth);
    ctx.fillText('0.5', 666, 275, maxWidth);
    ctx.fillText('1', 896, 275, maxWidth);
    ctx.fillText('時間 t [s]', 930, 255, maxWidth);
    ctx.stroke();//表示

    //0.5目盛
    ctx.beginPath();
    ctx.moveTo(675,240);
    ctx.lineTo(675,260);
    ctx.stroke();
    //1目盛
    ctx.beginPath();
    ctx.moveTo(900,240);
    ctx.lineTo(900,260);
    ctx.stroke();
    //縦1目盛
    ctx.beginPath();
    ctx.moveTo(445,150);
    ctx.lineTo(455,150);
    ctx.stroke();
    //縦-1目盛
    ctx.beginPath();
    ctx.moveTo(445,350);
    ctx.lineTo(455,350);
    ctx.stroke();


    //下座標軸
    ctx.beginPath();
    ctx.moveTo(425,550);
    ctx.lineTo(925,550);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(450,425);
    ctx.lineTo(450,675);
    ctx.stroke();

    //軸ラベル
    ctx.fillText('0', 438, oY + 315, maxWidth);
    ctx.fillText('-1', 434, 667, maxWidth);
    ctx.fillText('1', 438, 465, maxWidth);
    ctx.fillText('0.5', 666, 575, maxWidth);
    ctx.fillText('1', 896, 575, maxWidth);
    ctx.fillText('時間 t [s]', 930, 555, maxWidth);

    //0.5目盛
    ctx.beginPath();
    ctx.moveTo(675,540);
    ctx.lineTo(675,560);
    ctx.stroke();
    //1目盛
    ctx.beginPath();
    ctx.moveTo(900,540);
    ctx.lineTo(900,560);
    ctx.stroke();
    
    //縦1目盛
    ctx.beginPath();
    ctx.moveTo(445,450);
    ctx.lineTo(455,450);
    ctx.stroke();
    //縦-1目盛
    ctx.beginPath();
    ctx.moveTo(445,650);
    ctx.lineTo(455,650);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(250,425);
    ctx.lineTo(250,975);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(125,450);
    ctx.lineTo(375,450);
    ctx.stroke();

    //角周波数目盛
    ctx.beginPath();
    ctx.moveTo(553,765);
    ctx.lineTo(849,765);
    ctx.stroke();

    for(var i = 0; i <= 20; i += 1){
      ctx.beginPath();
      ctx.moveTo(558.5 + i*14.2, 753);
      ctx.lineTo(558.5+ i*14.2, 765);
      ctx.stroke();
    }
    ctx.fillText('0', 554, 783, maxWidth);
    ctx.fillText('2', 583, 783, maxWidth);
    ctx.fillText('4', 612, 783, maxWidth);
    ctx.fillText('6', 641, 783, maxWidth);
    ctx.fillText('8', 668, 783, maxWidth);
    ctx.fillText('10', 692, 783, maxWidth);
    ctx.fillText('12', 721, 783, maxWidth);
    ctx.fillText('14', 749, 783, maxWidth);
    ctx.fillText('16', 777, 783, maxWidth);
    ctx.fillText('18', 805, 783, maxWidth);
    ctx.fillText('20 π', 835, 783, maxWidth);

    //画像配置
    ctx.drawImage(img_sin, 800,100, 139.5, 25.5);
    ctx.drawImage(img_cos, 800,400, 139.5, 25.5);

    //右下パラメータ描画
    ctx.lineWidth = 3;
    ctx.font = '15pt Arial';
    ctx.setLineDash([0.5,0.5]);
    ctx.strokeStyle = "gray";
    ctx.strokeRect(420, 710, 555, 180);
    ctx.setLineDash([]);
    ctx.fillText('角周波数 ω', 435, 745);
    ctx.fillText('振幅', 500, 825);
    ctx.fillText('位相', 500, 870);
  }
}