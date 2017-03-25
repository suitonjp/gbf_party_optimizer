// 編成対象の武器の取得
function loadWeapons(data, target_ele, fix, slvmax){
  var wpArr = new Array();
  
  // スキルの取得
  for(var i=1;i<data.length;i++){
    var newwp = {name:data[i][0], wp_name:data[i][3],
                 lv:data[i][4], plus:data[i][5], slv:data[i][6],
                 ele:data[i][8], type:data[i][9],
                 hp:data[i][10], atk:data[i][11],
                 skill1: data[i][12], skill2:data[i][13], desel:data[i][2]}
    if(slvmax){
      if(data[i][7] == "SSR+"){
        newwp.slv = 15;
      }else{
        newwp.slv = 10;
      }
    }
    
    if(data[i][12]){
      var skdata = getSkillEffect(newwp.wp_name, newwp.skill1, newwp.slv);
      if(skdata){
        newwp[skdata[0]] = skdata[1]
        if(skdata[2]) newwp[skdata[2]] = skdata[3]
      }
    }
    if(data[i][13]){
      var skdata = getSkillEffect(newwp.wp_name, newwp.skill2, newwp.slv);
      if(skdata){
        if(!newwp[skdata[0]]) newwp[skdata[0]] = 0
        newwp[skdata[0]] += skdata[1]
        if(skdata[2]){
          if(!newwp[skdata[2]]) newwp[skdata[2]] = 0
          newwp[skdata[2]] += skdata[3]
        }
      }
    }
    wpArr.push(newwp)
  }
  
  // 武器を分類分け
  //   fix: 固定編成の武器　必ず編成される
  //   skill: 該当属性の攻刃/背水持ちの武器, コスモス武器
  //   noskill: スキルが発揮されない武器
  var weaponList = {fix: new Array(),
                    skill: new Array(),
                    noskill: new Array(),
                    cosmos: new Array()}

  // 固定編成武器のチェック
  for(var prop in fix) {
    if(fix.hasOwnProperty(prop)){
      for(var i=0; i<wpArr.length; i++){
        if(fix[prop].name == wpArr[i].name){
          weaponList.fix.push(wpArr[i]);
          wpArr.splice(i, 1);
          break;
        }
      }
    }
  }
  
  for(var i=0; i<wpArr.length; i++){
    if(wpArr[i].desel == "除外") continue;
    
    if(wpArr[i].bahamut_atk || wpArr[i].bahamut_atkhp){
      weaponList.skill.push(wpArr[i])
    }else if(wpArr[i].skill1.indexOf("オブ・コスモス") != -1){
      weaponList.cosmos.push(wpArr[i])
    }else{
      if(target_ele == "火"){
        if(wpArr[i].gen_fire_atk || wpArr[i].magna_fire_atk ||
           wpArr[i].gen_fire_bob || wpArr[i].magna_fire_bob ||
           wpArr[i].gen_fire_kns || wpArr[i].magna_fire_kns ||
           wpArr[i].gen_fire_da  || wpArr[i].magna_fire_da ||
           wpArr[i].gen_fire_ta  || wpArr[i].magna_fire_ta ||
           (wpArr[i].unknown_atk && target_ele == wpArr[i].ele)){
          weaponList.skill.push(wpArr[i])
        }else{
          weaponList.noskill.push(wpArr[i])
        }
      }else if(target_ele == "水"){
        if(wpArr[i].gen_water_atk || wpArr[i].magna_water_atk ||
           wpArr[i].gen_water_bob || wpArr[i].magna_water_bob ||
           wpArr[i].gen_water_kns || wpArr[i].magna_water_kns ||
           wpArr[i].gen_water_da  || wpArr[i].magna_water_da ||
           wpArr[i].gen_water_ta  || wpArr[i].magna_water_ta ||
           (wpArr[i].unknown_atk && target_ele == wpArr[i].ele)){
          weaponList.skill.push(wpArr[i])
        }else{
          weaponList.noskill.push(wpArr[i])
        }
      }else if(target_ele == "土"){
        if(wpArr[i].gen_earth_atk || wpArr[i].magna_earth_atk ||
           wpArr[i].gen_earth_bob || wpArr[i].magna_earth_bob ||
           wpArr[i].gen_earth_kns || wpArr[i].magna_earth_kns ||
           wpArr[i].gen_earth_da  || wpArr[i].magna_earth_da ||
           wpArr[i].gen_earth_ta  || wpArr[i].magna_earth_ta ||
           (wpArr[i].unknown_atk && target_ele == wpArr[i].ele)){
          weaponList.skill.push(wpArr[i])
        }else{
          weaponList.noskill.push(wpArr[i])
        }
      }else if(target_ele == "風"){
        if(wpArr[i].gen_wind_atk || wpArr[i].magna_wind_atk ||
           wpArr[i].gen_wind_bob || wpArr[i].magna_wind_bob ||
           wpArr[i].gen_wind_kns || wpArr[i].magna_wind_kns ||
           wpArr[i].gen_wind_da  || wpArr[i].magna_wind_da ||
           wpArr[i].gen_wind_ta  || wpArr[i].magna_wind_ta ||
           (wpArr[i].unknown_atk && target_ele == wpArr[i].ele)){
          weaponList.skill.push(wpArr[i])
        }else{
          weaponList.noskill.push(wpArr[i])
        }
      }else if(target_ele == "光"){
        if(wpArr[i].gen_light_atk || wpArr[i].magna_light_atk ||
           wpArr[i].gen_light_bob || wpArr[i].magna_light_bob ||
           wpArr[i].gen_light_kns || wpArr[i].magna_light_kns ||
           wpArr[i].gen_light_da  || wpArr[i].magna_light_da ||
           wpArr[i].gen_light_ta  || wpArr[i].magna_light_ta ||
           (wpArr[i].unknown_atk && target_ele == wpArr[i].ele)){
          weaponList.skill.push(wpArr[i])
        }else{
          weaponList.noskill.push(wpArr[i])
        }
      }else if(target_ele == "闇"){
        if(wpArr[i].gen_dark_atk || wpArr[i].magna_dark_atk ||
           wpArr[i].gen_dark_bob || wpArr[i].magna_dark_bob ||
           wpArr[i].gen_dark_kns || wpArr[i].magna_dark_kns ||
           wpArr[i].gen_dark_da  || wpArr[i].magna_dark_da ||
           wpArr[i].gen_dark_ta  || wpArr[i].magna_dark_ta ||
           (wpArr[i].unknown_atk && target_ele == wpArr[i].ele)){
          weaponList.skill.push(wpArr[i])
        }else{
          weaponList.noskill.push(wpArr[i])
        }
      }
    }
  }

}