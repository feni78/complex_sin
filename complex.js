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

  window.onload = function(){
    canvas.width = canvasW;//canvasサイズ設定
    canvas.height = canvasH;
    oX = Math.ceil(canvasW/4);//原点を求めて代入
    oY = Math.ceil(canvasH/4);
    drawInit();//座標軸初期化

    //クリック時に行う描画の処理
    canvas.addEventListener("click", (e) => {
      //座標軸初期化
      drawInit();

      //クリック座標取得と計算, border分-2
      var rect = e.target.getBoundingClientRect();
      clickX = e.clientX - Math.floor(rect.left)-2;
      clickY = e.clientY - Math.floor(rect.top)-2 ;
      
      //クリック位置の点を描画
      ctx.beginPath(); // パスの初期化
      ctx.arc(clickX, clickY, 5, 0, Math.PI*2);
      ctx.closePath(); // パスを閉じる
      ctx.fill(); // 軌跡の範囲を塗りつぶす

      //表示する座標値の計算
      var x = (clickX - oX)/100;//原点からの距離を変換してxに代入
      var y = -(clickY - oY)/100;//原点からの距離を変換してyに代入
      if(x >= -1 && x <=1 && y >= -1 && y <=1){
        ctx.fillText(`取得座標 x=${x}, y=${y}`, 300, 50);
      }

      //原点からクリック座標に伸びる線
      ctx.beginPath();
      ctx.moveTo(clickX,clickY);
      ctx.lineTo(oX, oY);
      ctx.stroke();


      //********************************************************
      //sin波
      ctx.beginPath();
      ctx.moveTo(450,250);//始点いじり

      var kaku = 2;//角周波数調整
      var isou = y;//位相調整
      //後々スライダーで変更できるようにする
     
      // ctx.lineTo(250, Math.sin(0.01));
      for (var i = 450; i <= 900; i += 1) {
        ctx.lineTo(i,250-100* (Math.sin(kaku * (Math.PI / 180)*i*0.4 + isou)));
      }
      // ctx.lineTo(1000, canvasH/4);
      ctx.stroke();

      //sin波
      ctx.beginPath();
      ctx.moveTo(450,450);//始点いじり
     
      // ctx.lineTo(250, Math.sin(0.01));
      for (var i = 450; i <= 900; i += 1) {
        ctx.lineTo(i,550-100* (Math.cos(kaku * (Math.PI / 180)*i*0.4+isou)));
      }
      // ctx.lineTo(1000, canvasH/4);
      ctx.stroke();
      //********************************************************



      //青線に変更
      ctx.strokeStyle = "blue";
      ctx.fillStyle = "blue";
      ctx.setLineDash([1, 1]);

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

      //青線をもとに戻す
      ctx.setLineDash([]);
    });

    canvas.addEventListener("mousemove", (e) => {
      ctx.clearRect(0, 0, 150, 150);
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

    //座標軸のスタイル指定
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
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
    ctx.fillText('Ｏ', oX - 13, oY + 13, maxWidth);
    ctx.fillText('-1', oX - 115, oY + 13, maxWidth);
    ctx.fillText('1', oX + 105, oY + 13, maxWidth);
    ctx.fillText('+j', oX - 17, oY - 105, maxWidth);
    ctx.fillText('-j', oX - 13, oY + 112, maxWidth);
    ctx.fillText('虚部', oX - 10, oY - axisLength - 10, maxWidth);
    ctx.fillText('実部', oX + axisLength + 10, oY + 4, maxWidth);
    ctx.arc(oX, oY, 100, 0, 2 * Math.PI, true);
    ctx.stroke();//表示

    //右座標軸
    ctx.beginPath();
    ctx.moveTo(425, 250);
    ctx.lineTo(925,250);
    ctx.stroke();
    // // y座標軸の矢印を描画
    // ctx.beginPath();
    // ctx.moveTo(925, 250);
    // ctx.lineTo(925 - 7, 250 - 10);
    // ctx.lineTo(925 + 7, 250 + 10);
    // ctx.fill();
    ctx.beginPath();
    ctx.moveTo(450, 125);
    ctx.lineTo(450,375);
    ctx.stroke();

    //0.5
    ctx.beginPath();
    ctx.moveTo(675, 240);
    ctx.lineTo(675,260);
    ctx.stroke();
    //1
    ctx.beginPath();
    ctx.moveTo(900, 240);
    ctx.lineTo(900,260);
    ctx.stroke();
    //tate1
    ctx.beginPath();
    ctx.moveTo(445, 150);
    ctx.lineTo(455,150);
    ctx.stroke();
    //tate-1
    ctx.beginPath();
    ctx.moveTo(445, 350);
    ctx.lineTo(455,350);
    ctx.stroke();


    //下座標軸
    ctx.beginPath();
    ctx.moveTo(425, 550);
    ctx.lineTo(925,550);
    ctx.stroke();
    // // y座標軸の矢印を描画
    // ctx.beginPath();
    // ctx.moveTo(925, 250);
    // ctx.lineTo(925 - 7, 250 - 10);
    // ctx.lineTo(925 + 7, 250 + 10);
    // ctx.fill();
    ctx.beginPath();
    ctx.moveTo(450, 425);
    ctx.lineTo(450,675);
    ctx.stroke();

    //0.5
    ctx.beginPath();
    ctx.moveTo(675, 540);
    ctx.lineTo(675,560);
    ctx.stroke();
    //1
    ctx.beginPath();
    ctx.moveTo(900, 540);
    ctx.lineTo(900,560);
    ctx.stroke();
    
    //tate1
    ctx.beginPath();
    ctx.moveTo(445, 450);
    ctx.lineTo(455,450);
    ctx.stroke();
    //tate-1
    ctx.beginPath();
    ctx.moveTo(445, 650);
    ctx.lineTo(455,650);
    ctx.stroke();
  }
}