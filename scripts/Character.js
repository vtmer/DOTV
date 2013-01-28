/**
 * 循环事件 
 * @param isHero 是否英雄
 * @param index 人物编号
 * @param data 图片数据
 * @param row 图片分割行数
 * @param col 图片分割列数
 * @param speed 人物速度
 **/
function Character(isHero,index,data,row,col,speed,name,hp,attack,defense,attackSpeed){
    base(this,LSprite,[]);
    var self = this;
    self.isHero = isHero;
    self.index = index;
    //设定人物动作速度
    self.speed = speed==null?2:speed;
    self.speedIndex = 0;
    //设定人物大小
    data.setProperties(0,0,data.image.width/col,data.image.height/row);
    //得到人物图片拆分数组
    var list = LGlobal.divideCoordinate(data.image.width,data.image.height,row,col);
    //设定人物动画
    self.anime = new LAnimation(this,data,list);
    /*
    //调整人物位置
    //self.anime.y -= 16;
    */
    //设定不移动
    self.move = false;
    //在一个移动步长中的移动次数设定
    self.moveIndex = 0;

    self.attack = null;
    self.hp = null;
    self.defense = null;
    self.ats = null;
    self.index_hp = null;
};
/**
 * 循环事件 
 **/
Character.prototype.onframe = function (){
    var self = this;
    //人物动作速度控制
    if(self.speedIndex++ < self.speed)return;
    self.speedIndex = 0;
    //当人物可移动，则开始移动
    if(self.move)self.onmove();
    //人物动画播放
    self.anime.onframe();
};
/**
 * 开始移动 
 **/
Character.prototype.onmove = function (){
    var self = this;
    //设定一个移动步长中的移动次数
    var ml_cnt = 4;
    //计算一次移动的长度
    var ml = STEP/ml_cnt;
    //根据移动方向，开始移动
    switch (self.direction){
        case UP:
            if(mapmove){
                mapLayer.y += ml;
                charaLayer.y += ml;
            }
            self.y -= ml;
            break;
        case LEFT:
            if(mapmove){
                mapLayer.x += ml;
                charaLayer.x += ml;
            }
            self.x -= ml;
            break;
        case RIGHT:
            if(mapmove){
                mapLayer.x -= ml;
                charaLayer.x -= ml;
            }
            self.x += ml;
            break;
        case DOWN:
            if(mapmove){
                mapLayer.y -= ml;
                charaLayer.y -= ml;
            }
            self.y += ml;
            break;
    }
    self.moveIndex++;
    //当移动次数等于设定的次数，开始判断是否继续移动
    if(self.moveIndex >= ml_cnt){
        //一个地图步长移动完成后，判断地图是否跳转
        if(self.isHero && self.moveIndex > 0)checkJump();
        self.moveIndex = 0;
        //一个地图步长移动完成后，如果地图处于滚动状态，则移除多余地图块
        if(mapmove)delMap();
        //判断方向是否改变
        if(self.direction != self.direction_next){
            self.direction = self.direction_next;
            self.anime.setAction(self.direction);
        }
        //如果已经松开移动键，或者前方为障碍物，则停止移动，否则继续移动
        if(!isKeyDown || !self.checkRoad()){
            self.move = false;
            return;
        }
        //地图是否滚动
        self.checkMap(self.direction);
    }
};
/**
 * 障碍物判断
 * @param 判断方向 
 **/
Character.prototype.checkRoad = function (dir){
    var self = this;
    var tox,toy,myCoordinate;
    //当判断方向为空的时候，默认当前方向
    if(dir==null)dir=self.direction;
    //获取人物坐标
    myCoordinate = self.getCoordinate();
    //开始计算移动目的地的坐标
    switch (dir){
        case UP:
            tox = myCoordinate.x;
            toy = myCoordinate.y - 1;
            break;
        case LEFT:
            tox = myCoordinate.x - 1;
            toy = myCoordinate.y ;
            break;
        case RIGHT:
            tox = myCoordinate.x + 1;
            toy = myCoordinate.y;
            break;
        case DOWN:
            tox = myCoordinate.x;
            toy = myCoordinate.y + 1;
            break;
    }
    
    //如果移动的范围超过地图的范围，则不可移动
    if(toy < 0 || tox < 0)return false;
    if(toy >= mapdata.length || tox >= mapdata[0].length)return false;
    //如果目的地为障碍，则不可移动
    if(mapdata[toy][tox] == 1) return false;
    if(mapdata[toy][tox] == 2) {
        for( key in monster) {
            if(monster[key].x ==tox && monster[key].y == toy)
                break;
        }
        addFight(player,monster[key],key);
        return false;
    }
    return true;
};
/**
 * 设定人物坐标
 * @param x方向坐标，y方向坐标 
 **/
Character.prototype.setCoordinate = function (sx,sy){
    var self = this;
    //根据人物坐标，计算人物显示位置
    self.x = sx*STEP;
    self.y = sy*STEP;
};
/**
 * 获取人物坐标
 **/
Character.prototype.getCoordinate = function (){
    var self = this;
    return {x:(self.x/STEP),y:(self.y/STEP)};
};

/**
*增加人物基本属性
*name， 攻击：attack,防御：defense，攻击速度：ats，血量：hp
**/
Character.prototype.propety = function (name,attack,ats,defense,hp) {
    var self = this;
    self.name = name;
    self.attack = !attack?20:attack;
    self.ats = !ats?5:(ats+5);
    self.defense = !defense?0:(defense+10);
    self.hp = !hp?100:(hp+100);
    self.index_hp = self.hp;
}
/**
 * 改变人物方向，并判断是否可移动
 **/
Character.prototype.changeDir = function (dir){
    var self = this;
    //如果正在移动，则无效
    if(!self.move){
        //设定人物方向
        self.direction = dir;
        self.direction_next = dir;
        //设定图片动画
        self.anime.setAction(dir);
        //判断是否可移动
        if(!self.checkRoad(dir))return;
        //如果可以移动，则开始移动
        self.move = true;
        self.moveIndex = 0;
    }else if(dir != self.direction){
        self.direction_next = dir;
    }
};

/**
*战斗函数
**/
Character.prototype.fight = function (hp_box,chara,key) {
    var self = this;
    if(self.hp > 0){
        chara.hp -= (self.attack-chara.defense);
        see_hp(hp_box,self.hp,self.index_hp);
        var re = setTimeout(function(){ set_fight(hp_box,self,chara,key);},self.ats*10);
    }else if(self.hp <= 0){
        stage.mapdata[self.y/32][self.x/32] = 0;
        charaLayer.removeChild(self);
        if(key != null){
            monster = monster.splice(key + 1,1);
            clear_site(hp_box);
        }
    }

}
function set_fight (hp_box,self,chara,key) {
    self.fight(hp_box,chara,key);
}