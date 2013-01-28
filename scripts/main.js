/**
 * Main类
 * @author lufy(lufy_legend)
 * @blog http://blog.csdn.net/lufy_Legend
 * @email lufy.legend@gmail.com
 **/
//设定游戏速度，屏幕大小，回调函数
init(40,"mylegend",800,600,main);
/**层变量*/
//显示进度条所用层
var loadingLayer;
//游戏底层
var backLayer;

//地图层
var mapLayer;
//人物层
var charaLayer;
//效果层
var effectLayer;
//对话层
var talkLayer;
//控制层
var ctrlLayer;
//方向变量
var DOWN = 0;
var LEFT = 1;
var RIGHT = 2;
var UP = 3;
var STEP = 32;
//点击状态
var isKeyDown = false;
//地图滚动
var mapmove = false;
/**int变量*/
//读取图片位置
var loadIndex = 0;
/**对象变量*/
//玩家
var player;

/**数组变量*/
//图片path数组
var imgData = new Array();
//读取完的图片数组
var imglist = {};
var imageArray,stage;

//怪物数组
var monster = new Array();

function main(){
    //准备读取图片
    //map
    imgData.push({name:"lib",path:"./image/lib.jpg"});
    imgData.push({name:"studio",path:"./image/studio.jpg"});
    imgData.push({name:"sb",path:"./image/sb.jpg"});
    imgData.push({name:"start",path:"./image/start.jpg"});
    imgData.push({name:"road",path:"./image/road.jpg"});

    //people
    imgData.push({name:"qd",path:"./image/fl.png"});
    imgData.push({name:"ht",path:"./image/cc.png"});
    imgData.push({name:"fl",path:"./image/fll.png"});
    imgData.push({name:"pm",path:"./image/ps.png"});
    imgData.push({name:"bones",path:"./image/bones2.png"});

    imgData.push({name:"man",path:"./image/monster/man.png"})
    imgData.push({name:"bird",path:"./image/monster/bird.png"});
    imgData.push({name:"dog",path:"./image/monster/dog.png"});
    imgData.push({name:"fatter",path:"./image/monster/fatter.png"});
    imgData.push({name:"girl",path:"./image/monster/girl.png"});
    imgData.push({name:"mush",path:"./image/monster/mush.png"});
    imgData.push({name:"nurse",path:"./image/monster/nurse.png"});

    //heads
    imgData.push({name:"manh",path:"./image/heads/man.png"});
    imgData.push({name:"flh",path:"./image/heads/fl.png"});
    imgData.push({name:"hth",path:"./image/heads/ht.png"});
    imgData.push({name:"pmh",path:"./image/heads/pm.png"});
    imgData.push({name:"qdh",path:"./image/heads/qd.png"});

    imgData.push({name:"talk",path:"./image/back.png"});
    //实例化进度条层
    loadingLayer = new LSprite();
    loadingLayer.graphics.drawRect(1,"black",[50, 200, 200, 20],true,"#ffffff");
    addChild(loadingLayer);
    //开始读取图片
    loadImage();
}
function loadImage(){
    //图片全部读取完成，开始初始化游戏
    if(loadIndex >= imgData.length){
        removeChild(loadingLayer);
        legendLoadOver();
        gameInit();
        return;
    }
    //开始读取图片
    loader = new LLoader();
    loader.addEventListener(LEvent.COMPLETE,loadComplete);
    loader.load(imgData[loadIndex].path,"bitmapData");
}
function loadComplete(event){
    //进度条显示
    loadingLayer.graphics.clear();
    loadingLayer.graphics.drawRect(1,"black",[50, 200, 200, 20],true,"#ffffff");
    loadingLayer.graphics.drawRect(1,"black",[50, 203, 200*(loadIndex/imgData.length), 14],true,"#000000");
    //储存图片数据
    imglist[imgData[loadIndex].name] = loader.content;
    //读取下一张图片
    loadIndex++;
    loadImage();
}
function gameInit(event){
    //游戏层显示初始化
    layerInit();
    stage = script.stage01;
    initScript(stage);
    //添加贞事件，开始游戏循环
    backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
    //添加控制按钮
    bitmapdata = new LBitmapData(imglist["e1"]);
    bitmap = new LBitmap(bitmapdata);
    bitmap.x = 0;
    bitmap.y = 0;
    ctrlLayer.addChild(bitmap);
    bitmapdata = new LBitmapData(imglist["e2"]);
    bitmap = new LBitmap(bitmapdata);
    bitmap.x = 280;
    bitmap.y = 30;
    ctrlLayer.addChild(bitmap);
    ctrlLayer.x = 40;
    ctrlLayer.y = 160;
    //添加点击控制事件
    backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
    backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
    
    if(!LGlobal.canTouch){
        //电脑的时候，添加键盘事件 【上 下 左 右 空格】
        LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
        LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);
    }
}
//游戏层显示初始化
function layerInit(){
    //游戏底层添加
    backLayer = new LSprite();
    addChild(backLayer);
    //地图层添加
    mapLayer = new LSprite();
    backLayer.addChild(mapLayer);
    //人物层添加
    charaLayer = new LSprite();
    backLayer.addChild(charaLayer);
    //效果层添加
    effectLayer = new LSprite();
    backLayer.addChild(effectLayer);
    //对话层添加
    talkLayer = new LSprite();
    backLayer.addChild(talkLayer);
    //控制层添加
    ctrlLayer = new LSprite();
    backLayer.addChild(ctrlLayer);
}
//添加地图
function addMap(cx,cy){
    bitmapdata = new LBitmapData(imglist[map]);
    var bitmap = new LBitmap(bitmapdata);  
    mapLayer.addChild(bitmap); 
}

//添加人物
function addChara(){
    var charaList = stage.add;
    var chara,charaObj;
    for(var i=0;i<charaList.length;i++){
        charaObj = charaList[i];
        if(charaObj.chara == "player"){
            //加入英雄
            bitmapdata = new LBitmapData(imglist[charaObj.img]);
            chara = new Character(true,i,bitmapdata,4,4);
            chara.propety(charaObj.name,charaObj.attack,charaObj.ats,charaObj.defense,charaObj.hp);
            fight_site("player_box",chara);
            player = chara;
        }else if(charaObj.chara == "npc"){
            //加入npc
            bitmapdata = new LBitmapData(imglist[charaObj.img]);
            chara = new Character(false,i,bitmapdata,4,4);
            stage.mapdata[charaObj.y][charaObj.x] = 1;
        }else if(charaObj.chara == "monster"){
            //加入怪物
            bitmapdata = new LBitmapData(imglist[charaObj.img]);
            chara = new Character(false,i,bitmapdata,4,4);
            chara.propety(charaObj.name,charaObj.attack,charaObj.ats,charaObj.defense,charaObj.hp);
            monster.push(chara);
            stage.mapdata[charaObj.y][charaObj.x] = 2;
        }
        if(charaObj.direction != null)
            chara.changeDir(charaObj.direction);
        chara.x = charaObj.x * 32;
        chara.y = charaObj.y * 32;
        charaLayer.addChild(chara);
    }
}
function ondown(event){
    //根据点击位置，判断移动方向
    if(event.offsetX >= ctrlLayer.x + 40 && event.offsetX <= ctrlLayer.x+80){
        if(event.offsetY >= ctrlLayer.y && event.offsetY <= ctrlLayer.y+40){
            player.changeDir(UP);
        }else if(event.offsetY >= ctrlLayer.y+80 && event.offsetY <= ctrlLayer.y+120){
            player.changeDir(DOWN);
        }
    }else if(event.offsetX >= ctrlLayer.x && event.offsetX <= ctrlLayer.x+40){
        if(event.offsetY >= ctrlLayer.y +40 && event.offsetY <= ctrlLayer.y+80){
            player.changeDir(LEFT);
        }
    }else if(event.offsetX >= ctrlLayer.x+80 && event.offsetX <= ctrlLayer.x+120){
        if(event.offsetY >= ctrlLayer.y +40 && event.offsetY <= ctrlLayer.y+80){
            player.changeDir(RIGHT);
        }
    }
    isKeyDown = true;
}
function onup(event){
    isKeyDown = false;
    if(event.offsetX >= ctrlLayer.x + 280 && event.offsetX <= ctrlLayer.x+330){
        if(event.offsetY >= ctrlLayer.y+40 && event.offsetY <= ctrlLayer.y+100){
            //对话
            addTalk();
        }
    }
}
function onkeydown(event){
    if(event.keyCode == 37){//left
        player.changeDir(LEFT);
    }else if(event.keyCode == 38){//up
        player.changeDir(UP);
    }else if(event.keyCode == 39){//right
        player.changeDir(RIGHT);
    }else if(event.keyCode == 40){//down
        player.changeDir(DOWN);
    }else if(event.keyCode == 32){//talk
        addTalk();
    }
    isKeyDown = true;
}
function onkeyup(event){
    isKeyDown = false;
    return;
    if(event.keyCode == 37 && player.move[0] < 0){//left
        player.move[0] = 0;
    }else if(event.keyCode == 38 && player.move[1] < 0){//up
        player.move[1] = 0;
    }else if(event.keyCode == 39 && player.move[0] > 0){//right
        player.move[0] = 0;
    }else if(event.keyCode == 40 && player.move[1] > 0){//down
        player.move[1] = 0;
    }else{//shoot
        player.canshoot = false;
        player.shootctrl = player.shootspeed;
    }
}
/**
 * 循环
 * */
function onframe(){
    var key;
    for(key in charaLayer.childList)charaLayer.childList[key].onframe();
}