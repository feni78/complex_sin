'use strict'
{

  var canvas = document.querySelector('canvas');//canvas取得
  var ctx = canvas.getContext('2d');//context取得
  var canvasW = 500;//canvasの横幅
  var canvasH = 500;//canvasの縦幅
  var oX;//原点x
  var oY;//原点y
  var clickX;//クリック座標x
  var clickY;//クリック座標y

  window.onload = function(){
    canvas.width = canvasW;//canvasサイズ設定
    canvas.height = canvasH;
    oX = Math.ceil(canvasW/2);//原点を求めて代入
    oY = Math.ceil(canvasH/2);
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

      //クリック座標から伸びる線（途中）
      ctx.strokeStyle = "blue";
      ctx.fillStyle = "blue";
      ctx.setLineDash([1, 1]);

      ctx.beginPath();
      ctx.moveTo(clickX,clickY);
      ctx.lineTo(1000, clickY);
      ctx.stroke();

      

      ctx.beginPath();
      ctx.moveTo(clickX, clickY);
      ctx.lineTo(clickX, 1000);
      ctx.stroke();

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
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";

    //x軸描画
    // x座標軸を描画
    ctx.beginPath();
    ctx.moveTo(0, oY);
    ctx.lineTo(canvasW, oY);
    ctx.stroke();
    // x座標軸の矢印を描画
    ctx.beginPath();
    ctx.moveTo(canvasW, oY);
    ctx.lineTo(canvasW - 10, oY - 7);
    ctx.lineTo(canvasW - 10, oY + 7);
    ctx.fill();

    //y軸描画
    // y座標軸を描画
    ctx.beginPath();
    ctx.moveTo(oX, 0);
    ctx.lineTo(oX, canvasH);
    ctx.stroke();
    // y座標軸の矢印を描画
    ctx.beginPath();
    ctx.moveTo(oX, 0);
    ctx.lineTo(oX - 7, 10);
    ctx.lineTo(oX + 7, 10);
    ctx.fill();

    ctx.beginPath();
    var maxWidth = 100;
    ctx.fillText('Ｏ', oX - 13, oY + 13, maxWidth);
    ctx.fillText('-j', oX - 115, oY + 13, maxWidth);
    ctx.arc(oX, oY, 100, 0, 2 * Math.PI, true);
    ctx.stroke();//表示


    // 原点を表す文字「Ｏ」を描画
    
  
  }
}
