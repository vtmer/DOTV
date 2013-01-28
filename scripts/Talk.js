//对话内容
var talkScript;
var talkScriptList;
//对话序号
var talkIndex = 0;
//对话中
var talking = false;

/**
 * 添加对话
 * */
function addTalk(){
	//如果对话内容为空，则开始判断是否可以对话
	if(talkScript == null){
		var key,tx = player.x,ty = player.y;
		switch (player.direction){
		case UP:
			ty -= STEP;
			break;
		case LEFT:
			tx -= STEP;
			break;
		case RIGHT:
			tx += STEP;
			break;
		case DOWN:
			ty += STEP;
			break;
		}
		for(key in charaLayer.childList){
			//判断前面又没有npc，有则开始对话
			if(charaLayer.childList[key].x == tx && charaLayer.childList[key].y == ty){
				if(talkScriptList["talk"+charaLayer.childList[key].index]){
					talkScript = talkScriptList["talk"+charaLayer.childList[key].index];
					talkIndex = 0;
				}
			}
		}
		//如果前方没有npc，则返回
		if(talkScript == null)return;
	}
	//将对话层清空
	talkLayer.removeAllChild();
	//当对话开始，且按照顺序进行对话
	if(talkIndex < talkScript.length){
		//得到对话内容
		var talkObject = talkScript[talkIndex];
		//对话背景
		bitmapdata = new LBitmapData(imglist["talk"]);
		bitmap = new LBitmap(bitmapdata);
		bitmap.width = 330;
		bitmap.height = 70;
		bitmap.x = 100;
		bitmap.y = 20;
		bitmap.alpha = 0.7;
		talkLayer.addChild(bitmap);
		//对话头像
		bitmapdata = new LBitmapData(imglist[talkObject.img]);
		bitmap = new LBitmap(bitmapdata);
		bitmap.x = 0;
		bitmap.y = 0;
		talkLayer.addChild(bitmap);
		//对话人物名称
		var name = new LTextField();
		name.x = 110;
		name.y = 30;
		name.size = "14";
		name.color = "#FFFFFF";
		if(talkObject.name != "player")
			name.text = "[" + talkObject.name + "]";
		else
			name.text = player.name;
		talkLayer.addChild(name);
		//对话内容
		var msg = new LTextField();
		msg.width = 300;
		msg.x = 110;
		msg.y = 55;
		msg.color = "#FFFFFF";
		msg.text = talkObject.msg;
		talkLayer.addChild(msg);
		//对话内容逐字显示
		msg.wind();
		talkLayer.x = 20;
		talkLayer.y = 50;
		if(talkObject.func!=null)talkObject.func();
		talkIndex++;
	}else{
		//对话结束
		talkScript = null;
	}
}

/*
*add fight_action
*/
function fight_site (fight_box,chara){
	fight_box = document.getElementById(fight_box);
	fight_box.getElementsByTagName('div')[0].style.display = "block";
	fight_box = fight_box.getElementsByTagName("p")[0];
	content = chara.name + " ";
	content += "攻击：" + chara.attack + "  " + "防守：" + chara.defense + "  " + "攻速：" + chara.ats;
	fight_box.innerText = content;
}
function clear_site(fight_box) {
	fight_box = document.getElementById(fight_box);
	fight_box.getElementsByTagName('div')[0].style.display = "none";
	fight_box = fight_box.getElementsByTagName("p")[0];
	fight_box.innerText = " ";
}
function see_hp (box_name,hp,index_hp) {
	hp_box = document.getElementById(box_name).getElementsByTagName('span')[0];
	hp_box.style.width = hp/index_hp*100 + "%";
	hp_box.innerText = hp;
}

function addFight(chara,devil,key){
	var j,k;
	fight_site("monster_box",devil);
	chara.fight("player_box",devil);
	devil.fight("monster_box",chara,key);
	
}