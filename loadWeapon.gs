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
      var skdata = getSkillEffect_(newwp.wp_name, newwp.skill1, newwp.slv);
      if(skdata){
        newwp[skdata[0]] = skdata[1]
        if(skdata[2]) newwp[skdata[2]] = skdata[3]
      }
    }
    if(data[i][13]){
      var skdata = getSkillEffect_(newwp.wp_name, newwp.skill2, newwp.slv);
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

  // 攻撃力順にソート  
  for(var i=0;i<weaponList.skill.length;i++){
    for(var j=i+1;j<weaponList.skill.length;j++){
      if(weaponList.skill[i].atk < weaponList.skill[j].atk){
        var tmp = weaponList.skill[i]
        weaponList.skill[i] = weaponList.skill[j]
        weaponList.skill[j] = tmp
      }
    }
  }
  for(var i=0;i<weaponList.noskill.length;i++){
    for(var j=i+1;j<weaponList.noskill.length;j++){
      if(weaponList.noskill[i].atk < weaponList.noskill[j].atk){
        var tmp = weaponList.noskill[i]
        weaponList.noskill[i] = weaponList.noskill[j]
        weaponList.noskill[j] = tmp
      }
    }
  }
  
  return weaponList
}




function getSkillEffect_(weapon_name, skill_name, skill_level){
  // 同名スキルが存在するが、効果量が違う場合などの対応
  if(weapon_name == "世界樹の雫枝・マグナ" || weapon_name == "世界樹の雫枝・マグナ (最終)"){
    if(skill_name == "創樹方陣・守護") return ["magna_earth_hp", hp_s_mu(skill_level)];
  }
  else if(weapon_name == "アンノウンスタンプ"){
    if(skill_name == "アンノウン・VIT") return ["unknown_hp", hp_s_mu(skill_level)];
  }
  
  // スキル名判定
  switch(skill_name){
    case "スカルパレード": return ["gen_dark_da", da_m_(skill_level)];
    case "紅蓮の呪印・弐": return ["guren", atk_b_(skill_level)];

    // コラボ系武器（アンノウン枠として統一）
    case "アンノウン・ATK": 
    case "エクストラ・ATK": return ["unknown_atk", atk_m_(skill_level)];
    case "アンノウン・VIT": return ["unknown_hp",  hp_m_mu(skill_level)];
    case "アンノウン・VIT II": return ["unknown_hp",  hp_b_mu(skill_level)];
    case "アンノウン・ATK II":
    case "エクストラ・ATK II":
    case "ストレングス":
    case "セービングアタック":
    case "烈光の至恩":
    case "自動辻斬装置":
    case "Vスキル":
    case "その魂よ、安らかに":　
    case "炎の背骨": return ["unknown_atk", atk_b_(skill_level)];
    case "エクストラ・ATK III": return ["unknown_atk", atk_b2_(skill_level)];
    case "エクストラ・ATK IIII": return ["unknown_atk", atk_b3_(skill_level)];
    case "ミフネ流剣法・極意": return ["unknown_atk", atk_b_(skill_level), "gen_fire_bkn", 0.07];
    case "インテリジェンス":   return ["unknown_atk", atk_b_(skill_level), "gen_dark_bkn", 0.07];
    case "スピードスペル": return ["unknown_atk", atk_s_(skill_level)];
    case "マジックチャージ": return ["unknown_bob", bob_m_(skill_level)];
    case "ミフネ流剣法・双星": 
    case "デクステリティ": return ["unknown_da", da_s_(skill_level)];
    // バハ武器
    case "ヒュムアニムス・ウィス":
    case "ドーラアニムス・ウィス":
    case "エルンアニムス・ウィス":
    case "ハヴンアニムス・ウィス": return ["bahamut_atk", (skill_level==10)? 0.3 : 0.19+0.01*skill_level];
    case "コンキリオ・ルーベル":
    case "コンキリオ・ケルレウス": return ["bahamut_atk", (skill_level==10)? 0.15 : 0.095+0.005*skill_level, 
                                        "bahamut_hp",  (skill_level==10)? 0.15 : 0.095+0.005*skill_level];
    case "ヒュムアニムス・メンス":
    case "ドーラアニムス・メンス":
    case "エルンアニムス・メンス":
    case "ハヴンアニムス・メンス": return ["bahamut_hp",  (skill_level>10)? 0.3+0.02*(skill_level-10) : 0.19+0.01*skill_level];
    case "ヒュムアニムス・メンス":
    case "ドーラアニムス・メンス":
    case "エルンアニムス・メンス":
    case "ハヴンアニムス・メンス": return ["bahamut_da", 0.1, "bahamut_ta", 0.08];
    case "コンキリオ・イグニス":
    case "コンキリオ・ウェントス":
    case "コンキリオ・コルヌ":
    case "コンキリオ・テラ":
    case "コンキリオ・インベル":
    case "コンキリオ・アルボス": return ["bahamut_atk", 0.3 +  ((skill_level>=10)? (0.02/5)*(skill_level-10) : 0),
                                         "bahamut_hp",  0.15 + ((skill_level>=10)? (0.03/5)*(skill_level-10) : 0)];
  }
  
  // スキル名 prefix 判定
  var pre = skill_name.slice(0,2)
  switch(pre){
    case "紅蓮" : var stype="gb"; var spref="gen_fire"; break;
    case "業火" : var stype="gm"; var spref="gen_fire"; break;
    case "火の" : var stype="gs"; var spref="gen_fire"; break;
    case "霧氷" : var stype="gb"; var spref="gen_water"; break;
    case "渦潮" : var stype="gm"; var spref="gen_water"; break;
    case "水の" : var stype="gs"; var spref="gen_water"; break;
    case "地裂" : var stype="gb"; var spref="gen_earth"; break;
    case "大地" : var stype="gm"; var spref="gen_earth"; break;
    case "土の" : var stype="gs"; var spref="gen_earth"; break;
    case "乱気" : var stype="gb"; var spref="gen_wind"; break;
    case "竜巻" : var stype="gm"; var spref="gen_wind"; break;
    case "風の" : var stype="gs"; var spref="gen_wind"; break;
    case "天光" : var stype="gb"; var spref="gen_light"; break;
    case "雷電" : var stype="gm"; var spref="gen_light"; break;
    case "光の" : var stype="gs"; var spref="gen_light"; break;
    case "奈落" : var stype="gb"; var spref="gen_dark"; break;
    case "憎悪" : var stype="gm"; var spref="gen_dark"; break;
    case "闇の" : var stype="gs"; var spref="gen_dark"; break;
    case "赤星" : var stype="st"; var spref="gen_fire"; break;
    case "青星" : var stype="st"; var spref="gen_water"; break;
    case "黄星" : var stype="st"; var spref="gen_earth"; break;
    case "緑星" : var stype="st"; var spref="gen_wind"; break;
    case "白星" : var stype="st"; var spref="gen_light"; break;
    case "黒星" : var stype="st"; var spref="gen_dark"; break;
    case "機炎" : var stype="m"; var spref="magna_fire"; break;
    case "海神" : var stype="m"; var spref="magna_water"; break;
    case "創樹" : var stype="m"; var spref="magna_earth"; break; 
    case "嵐竜" : var stype="m"; var spref="magna_wind"; break;
    case "騎解" : var stype="m"; var spref="magna_light"; break;
    case "黒霧" : var stype="m"; var spref="magna_dark"; break;
  }
  
  // スキル名 suffix 判定
  var suf = skill_name.slice(-2)
  if(stype == "gb"){
    if(suf == "II"){
      if(skill_name.slice(-4) == "攻刃II") return [spref+"_atk", atk_b2_(skill_level)];
      if(skill_name.slice(-4) == "守護II") return [spref+"_hp",  hp_b2_(skill_level)];
    }
    if(suf == "暴君") return [spref+"_atk", atk_b_(skill_level), spref+"_bkn", 0.1];
    if(suf == "攻刃") return [spref+"_atk", atk_b_(skill_level)];
    if(suf == "守護") return [spref+"_hp",  hp_b_(skill_level)];
    if(suf == "背水") return [spref+"_bob", bob_b_(skill_level)];
    if(suf == "技巧") return [spref+"_cri", cri_b_(skill_level)];
    if(suf == "二手") return [spref+"_da",  da_b_(skill_level)];
    if(suf == "三手") return [spref+"_da",  da_b_(skill_level), spref+"_ta", ta_b_(skill_level)];
  }
  else if(stype == "gm"){
    if(suf == "攻刃") return [spref+"_atk", atk_m_(skill_level)];
    if(suf == "守護") return [spref+"_hp",  hp_m_(skill_level)];
    if(suf == "背水") return [spref+"_bob", bob_m_(skill_level)];
    if(suf == "技巧") return [spref+"_cri", cri_m_(skill_level)];
    if(suf == "二手") return [spref+"_da",  da_m_(skill_level)];
    if(suf == "刹那") return [spref+"_atk", atk_m_(skill_level), spref+"_cri", cri_m_(skill_level)];
    if(suf == "羅刹") return [spref+"_atk", atk_m_(skill_level)];
    if(suf == "克己") return [spref+"_da",  da_m_(skill_level), spref+"_cri", cri_m_(skill_level)];
  }
  else if(stype == "gs"){
    if(suf == "攻刃") return [spref+"_atk", atk_s_(skill_level)];
    if(suf == "守護") return [spref+"_hp",  hp_s_(skill_level)];
    if(suf == "背水") return [spref+"_bob", bob_s_(skill_level)];
    if(suf == "技巧") return [spref+"_cri", cri_s_(skill_level)];
    if(suf == "二手") return [spref+"_da",  da_s_(skill_level)];
    if(suf == "神威") return [spref+"_atk", atk_s_(skill_level), spref+"_hp", hp_s_(skill_level)];
  }
  else if(stype == "st"){
    if(suf == "渾身") return [spref+"_kns", kns_b_(skill_level)];
  }
  else if(stype == "m"){
    suf = skill_name.slice(5)
    if(suf == "攻刃II") return [spref+"_atk", atk_b_(skill_level)];
    if(suf == "守護II") return [spref+"_hp",  hp_b_mu(skill_level)];
    if(suf == "背水II") return [spref+"_bob", bob_b_(skill_level)];
    if(suf == "攻刃") return [spref+"_atk", atk_m_(skill_level)];
    if(suf == "守護") return [spref+"_hp",  hp_m_mu(skill_level)];
    if(suf == "背水") return [spref+"_bob", bob_s_(skill_level)];
    if(suf == "暴君") return [spref+"_atk", atk_b_(skill_level), spref+"_bkn", 0.1];
    if(suf == "刹那") return [spref+"_atk", atk_m_(skill_level), spref+"_cri", cri_m_(skill_level)];
    if(suf == "羅刹") return [spref+"_atk", atk_m_(skill_level)];
    if(suf == "克己") return [spref+"_da",  da_m_(skill_level), spref+"_cri", cri_m_(skill_level)];
    if(suf == "神威") return [spref+"_atk", atk_s_(skill_level), spref+"_hp", hp_s_mu(skill_level)];
    if(suf == "三手") return [spref+"_da",  da_b_(skill_level), spref+"_ta", ta_b_(skill_level)];
  }  
}

function atk_b3_(skill_level){
  return 0.08+ 0.01*skill_level;
}

function atk_b2_(skill_level){
  return 0.06+((skill_level<=10)? 0.01*skill_level : 0.1+(0.04/5)*(skill_level-10));
}

function atk_b_(skill_level){
  return 0.05+((skill_level<=10)? 0.01*skill_level : 0.1+(0.03/5)*(skill_level-10));
}

function atk_m_(skill_level){
  return 0.02+((skill_level<=10)? 0.01*skill_level : 0.1+(0.025/5)*(skill_level-10));
}

function atk_s_(skill_level){
  return (skill_level<=10)? 0.01*skill_level : 0.1+(0.02/5)*(skill_level-10);
}

function hp_b2_(skill_level){
  return 0.09+((skill_level<=10)? 0.01*skill_level : 0.1+(0.04/5)*(skill_level-10))
}

function hp_b_(skill_level){
  return 0.08+((skill_level<=10)? 0.01*skill_level : 0.1+(0.03/5)*(skill_level-10));
}

function hp_m_(skill_level){
  return 0.05+((skill_level<=10)? 0.01*skill_level : 0.1+(0.025/5)*(skill_level-10));
}

function hp_s_(skill_level){
  return 0.02+((skill_level<=10)? 0.01*skill_level : 0.1+(0.02/5)*(skill_level-10));
}

function hp_b_mu(skill_level){
  return 0.05+((skill_level<=10)? 0.01*skill_level : 0.1+(0.03/5)*(skill_level-10));
}

function hp_m_mu(skill_level){
  return 0.02+((skill_level<=10)? 0.01*skill_level : 0.1+(0.025/5)*(skill_level-10));
}

function hp_s_mu(skill_level){
  return ((skill_level<=10)? 0.01*skill_level : 0.1+(0.02/5)*(skill_level-10));
}

function bob_b_(skill_level){
  return (skill_level<10)? 0.010*skill_level-0.0017 : 0.10+(0.025/5)*(skill_level-10);
}

function bob_m_(skill_level){
  return (skill_level<10)? 0.008*skill_level-0.0014 : 0.08+(0.020/5)*(skill_level-10);
}

function bob_s_(skill_level){
  return (skill_level<10)? 0.006*skill_level-0.0010 : 0.06+(0.010/5)*(skill_level-10);
}

function da_b_(skill_level){
  return (skill_level==15)? 0.07 : 0.006+0.004*skill_level;
}

function da_m_(skill_level){
  return (skill_level==15)? 0.05 : 0.004+0.003*skill_level;
}

function da_s_(skill_level){
  return 0.002 + 0.002*skill_level;
}


// 仮実装
function ta_b_(skill_level){
  return 0.006+0.004*skill_level;
}

function kns_b_(skill_level){
  return 0.04107 + 0.007262 * skill_level;
}

function cri_b_(skill_level){
  return 0.05 + 0.005 * (skill_level-1);
}

function cri_m_(skill_level){
  return 0.03 + 0.003 * (skill_level-1);
}

function cri_s_(skill_level){
  return 0.01 + 0.001 * (skill_level-1);
}
