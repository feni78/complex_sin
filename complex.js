'use strict'
{

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  function draw(){
    if(typeof canvas.getContext==='undefined'){
    return;
    }
    ctx.beginPath();
    ctx.arc(250, 250, 100, 0, 2 * Math.PI, true);
    ctx.moveTo(100, 250);//始点を100, 250に移動
    ctx.lineTo(400,250);//400,250まで線で結ぶ
    ctx.moveTo(250, 100);//始点を250, 100に移動
    ctx.lineTo(250, 400);//250, 400まで線で結ぶ
    ctx.stroke();//表示
  }
  draw();

 
  canvas.addEventListener("mousemove", (e) => {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    x = Math.floor(((x - 250)/100)*10)/10; //xが-1から1になるよう座標の値を調整, 小数点第1位で切り捨て
    var y = e.clientY - rect.top;
    y = Math.floor(((y - 250)/-100)*10)/10;
    console.log(`${x}:${y}`);
    ctx.clearRect(0, 0, 150,150 );
    if(x >= -1 && x<=1 && y >= -1 && y<=1){
    ctx.fillText(`x=${x}, y=${y}`, 50, 50);
    }
});

canvas.addEventListener("click", (e) => {
  draw();
  ctx.clearRect(100, 100, 500,500 );
  var rect_Click = e.target.getBoundingClientRect()
  var clickX = e.clientX - rect_Click.left
  var clickY = e.clientY - rect_Click.top
  
  ctx.moveTo(clickX-2,clickY);
  ctx.lineTo(1000, clickY);
  ctx.moveTo(clickX-3, clickY);
  ctx.lineTo(clickX, 1000);
  ctx.stroke();
  ctx.beginPath(); // パスの初期化
  ctx.arc(clickX-3, clickY, 4, 0, 2 * Math.PI); // (100, 50)の位置に半径30pxの円
  ctx.closePath(); // パスを閉じる
  ctx.fill(); // 軌跡の範囲を塗りつぶす
 
  clickX = Math.floor(((clickX - 250)/100)*10)/10;
  
  clickY = Math.floor(((clickY - 250)/-100)*10)/10;
  ctx.clearRect(250, 0, 200,60 );
  if(clickX >= -1 && clickX <=1 && clickY  >= -1 && clickY <=1){
    ctx.fillText(`取得座標 x=${clickX}, y=${clickY}`, 300, 50);
    
    }

});

}
