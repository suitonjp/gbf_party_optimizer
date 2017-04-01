// 攻撃力, HPの計算
function calcAtkHP(info, chara, main_summon, supt_summon, weapon, calc_opt){
  // ----- 表示 HP / 攻撃力 の計算 ----
  var disp_hp = chara.hp
  var disp_atk = chara.atk
  var cosmos = {}
  var zenith_ele_bonus;

  // コスモス武器チェック（スキル１）
  for(var i=0; i<10; i++){
    if(weapon[i].skill1.indexOf("オブ・コスモス") != -1){
      var wptype = weapon[i].skill1
      wptype = wptype.slice(0, wptype.indexOf("・オブ・コスモス"))
      switch(wptype){
        case "ソード":
          cosmos["剣"] = 0.3;
          break;
        case "ダガー":
          cosmos["短剣"] = 0.3;
          break;
        case "ランス":
          cosmos["槍"] = 0.3;
          break;
        case "サイス":
          cosmos["斧"] = 0.3;
          break;
        case "ロッド":
          cosmos["杖"] = 0.3;
          break;
        case "ガン":
          cosmos["銃"] = 0.3;
          break;
        case "ガントレット":
          cosmos["格闘"] = 0.3;
          break;
        case "アロー":
          cosmos["弓"] = 0.3;
          break;
        case "ハープ":
          cosmos["楽器"] = 0.3;
          break;
        case "ブレイド":
          cosmos["刀"] = 0.3;
          break;
      }
    }
  }
  
  // 武器攻撃力
  for(var i=0; i<10; i++){
    var rate_hp = 0
    var rate_atk = 0;
    if(chara.tokui[weapon[i].type]){
      if(chara.name == "Player") rate_hp  += 0.2;
      rate_atk += chara.tokui[weapon[i].type];
    }
    if(cosmos[weapon[i].type]){
      rate_hp += 0.3;
      rate_atk += 0.3;
    }
    disp_hp  += Math.round(weapon[i].hp  * (1 + rate_hp))
    disp_atk += Math.round(weapon[i].atk * (1 + rate_atk))
  }
  // 召喚石攻撃力
  disp_hp  += main_summon.hp
  disp_atk += main_summon.atk
  for(var i=0; i<info.sub_sum.length; i++){
    disp_hp  += info.sub_sum[i].hp
    disp_atk += info.sub_sum[i].atk
  }

  // マスターボーナス
  if(chara.hp_ratio)  disp_hp  *= (1 + chara.hp_ratio);
  if(chara.atk_ratio) disp_atk *= (1 + chara.atk_ratio);
  
  
  // ----- 召喚石加護の計算 ----
  var bless = {hp:0, ele:0, chara:0, magna:0, zeus:0}
  
  for(var i=0; i<2; i++){
    if(i==0) var summon = main_summon;
    else     var summon = supt_summon;
    
    var ef = summon.bless.split("\n")
    for(var j=0; j<ef.length; j++){
      var d = ef[j].split(" ")
      if(!d[2]) continue;
      d[2] = Number(d[2].substr(0, (d[2].length-1))) * 0.01
      if(d[0] == "全" || d[0].indexOf(chara.ele) != -1){
        if(d[1] == "属性攻撃")        bless.ele   += d[2];
        else if(d[1] == "キャラ攻撃") bless.chara += d[2];
        else if(d[1] == "マグナ")     bless.magna += d[2];
        else if(d[1] == "ゼウス系")   bless.zeus  += d[2];
        else if(d[1] == "キャラHP")   bless.hp    += d[2];
      }
    }
  }
  
  
  // ----- 武器スキルの計算 ----
  var skill = {gen_atk:0, gen_hp:0, gen_bob:0,
               magna_atk:0, magna_hp:0, magna_bob:0,
               unknown_atk:0, unknown_hp:0, unknown_bob:0,
               bahamut_atk:0, bahamut_hp:0,
               gen_kns:0, magna_kns:0, unknown_kns:0,
               gen_cri:0, magna_cri:0, unknown_cri:0,
               gen_da:0, magna_da:0, unknown_da:0,
               gen_ta:0, magna_ta:0, unknown_ta:0,
               cosmos_atk:0, cosmos_hp:0, cosmos_da:0,
               hp_down:1}
  var baha_wp = []
  
  for(var i=0; i<10; i++){
    // バハ武器は後でまとめて処理
    if(weapon[i].bahamut_atk || weapon[i].bahamut_hp){
      baha_wp.push(weapon[i])
    }
    else{
      if(weapon[i].unknown_atk && weapon[i].ele == chara.ele) skill.unknown_atk += weapon[i].unknown_atk;
      if(weapon[i].unknown_hp  && weapon[i].ele == chara.ele) skill.unknown_hp  += weapon[i].unknown_hp;
      if(weapon[i].unknown_bob && weapon[i].ele == chara.ele) skill.unknown_bob += weapon[i].unknown_bob;
      if(weapon[i].unknown_da  && weapon[i].ele == chara.ele) skill.unknown_da  += weapon[i].unknown_da;
      
      switch(chara.ele){
        case "火":
          zenith_ele_bonus = chara.ele_fire;
          if(weapon[i].gen_fire_atk)   skill.gen_atk   += weapon[i].gen_fire_atk;
          if(weapon[i].gen_fire_hp)    skill.gen_hp    += weapon[i].gen_fire_hp;
          if(weapon[i].gen_fire_bob)   skill.gen_bob   += weapon[i].gen_fire_bob;
          if(weapon[i].gen_fire_kns)   skill.gen_kns   += weapon[i].gen_fire_kns;
          if(weapon[i].gen_fire_cri)   skill.gen_cri   += weapon[i].gen_fire_cri;
          if(weapon[i].magna_fire_atk) skill.magna_atk += weapon[i].magna_fire_atk;
          if(weapon[i].magna_fire_hp)  skill.magna_hp  += weapon[i].magna_fire_hp;
          if(weapon[i].magna_fire_bob) skill.magna_bob += weapon[i].magna_fire_bob;
          if(weapon[i].magna_fire_cri) skill.magna_cri += weapon[i].magna_fire_cri;
          if(weapon[i].gen_fire_da)    skill.gen_da    += weapon[i].gen_fire_da;
          if(weapon[i].magna_fire_da)  skill.magna_da  += weapon[i].magna_fire_da;
          if(weapon[i].gen_fire_ta)    skill.gen_ta    += weapon[i].gen_fire_ta;
          if(weapon[i].magna_fire_ta)  skill.magna_ta  += weapon[i].magna_fire_ta;
          if(weapon[i].gen_fire_bkn)   skill.hp_down   -= weapon[i].gen_fire_bkn;
          if(weapon[i].magna_fire_bkn) skill.hp_down   -= weapon[i].magna_fire_bkn;
          if(weapon[i].guren && chara.num == 2) skill.gen_atk += weapon[i].gen_fire_atk;
          break;
        case "水":
          zenith_ele_bonus = chara.ele_water;
          if(weapon[i].gen_water_atk)   skill.gen_atk   += weapon[i].gen_water_atk;
          if(weapon[i].gen_water_hp)    skill.gen_hp    += weapon[i].gen_water_hp;
          if(weapon[i].gen_water_bob)   skill.gen_bob   += weapon[i].gen_water_bob;
          if(weapon[i].gen_water_kns)   skill.gen_kns   += weapon[i].gen_water_kns;
          if(weapon[i].gen_water_cri)   skill.gen_cri   += weapon[i].gen_water_cri;
          if(weapon[i].magna_water_atk) skill.magna_atk += weapon[i].magna_water_atk;
          if(weapon[i].magna_water_hp)  skill.magna_hp  += weapon[i].magna_water_hp;
          if(weapon[i].magna_water_bob) skill.magna_bob += weapon[i].magna_water_bob;
          if(weapon[i].magna_water_cri) skill.magna_cri += weapon[i].magna_water_cri;
          if(weapon[i].gen_water_da)    skill.gen_da    += weapon[i].gen_water_da;
          if(weapon[i].magna_water_da)  skill.magna_da  += weapon[i].magna_water_da;
          if(weapon[i].gen_water_ta)    skill.gen_ta    += weapon[i].gen_water_ta;
          if(weapon[i].magna_water_ta)  skill.magna_ta  += weapon[i].magna_water_ta;
          if(weapon[i].gen_water_bkn)   skill.hp_down   -= weapon[i].gen_water_bkn;
          if(weapon[i].magna_water_bkn) skill.hp_down   -= weapon[i].magna_water_bkn;
          break;
        case "土":
          zenith_ele_bonus = chara.ele_earth;
          if(weapon[i].gen_earth_atk)   skill.gen_atk   += weapon[i].gen_earth_atk;
          if(weapon[i].gen_earth_hp)    skill.gen_hp    += weapon[i].gen_earth_hp;
          if(weapon[i].gen_earth_bob)   skill.gen_bob   += weapon[i].gen_earth_bob;
          if(weapon[i].gen_earth_kns)   skill.gen_kns   += weapon[i].gen_earth_kns;
          if(weapon[i].gen_earth_cri)   skill.gen_cri   += weapon[i].gen_earth_cri;
          if(weapon[i].magna_earth_atk) skill.magna_atk += weapon[i].magna_earth_atk;
          if(weapon[i].magna_earth_hp)  skill.magna_hp  += weapon[i].magna_earth_hp;
          if(weapon[i].magna_earth_bob) skill.magna_bob += weapon[i].magna_earth_bob;
          if(weapon[i].magna_earth_cri) skill.magna_cri += weapon[i].magna_earth_cri;
          if(weapon[i].gen_earth_da)    skill.gen_da    += weapon[i].gen_earth_da;
          if(weapon[i].magna_earth_da)  skill.magna_da  += weapon[i].magna_earth_da;
          if(weapon[i].gen_earth_ta)    skill.gen_ta    += weapon[i].gen_earth_ta;
          if(weapon[i].magna_earth_ta)  skill.magna_ta  += weapon[i].magna_earth_ta;
          if(weapon[i].gen_earth_bkn)   skill.hp_down   -= weapon[i].gen_earth_bkn;
          if(weapon[i].magna_earth_bkn) skill.hp_down   -= weapon[i].magna_earth_bkn;
          break;
        case "風":
          zenith_ele_bonus = chara.ele_wind;
          if(weapon[i].gen_wind_atk)   skill.gen_atk   += weapon[i].gen_wind_atk;
          if(weapon[i].gen_wind_hp)    skill.gen_hp    += weapon[i].gen_wind_hp;
          if(weapon[i].gen_wind_bob)   skill.gen_bob   += weapon[i].gen_wind_bob;
          if(weapon[i].gen_wind_kns)   skill.gen_kns   += weapon[i].gen_wind_kns;
          if(weapon[i].gen_wind_cri)   skill.gen_cri   += weapon[i].gen_wind_cri;
          if(weapon[i].magna_wind_atk) skill.magna_atk += weapon[i].magna_wind_atk;
          if(weapon[i].magna_wind_hp)  skill.magna_hp  += weapon[i].magna_wind_hp;
          if(weapon[i].magna_wind_bob) skill.magna_bob += weapon[i].magna_wind_bob;
          if(weapon[i].magna_wind_cri) skill.magna_cri += weapon[i].magna_wind_cri;
          if(weapon[i].gen_wind_da)    skill.gen_da    += weapon[i].gen_wind_da;
          if(weapon[i].magna_wind_da)  skill.magna_da  += weapon[i].magna_wind_da;
          if(weapon[i].gen_wind_ta)    skill.gen_ta    += weapon[i].gen_wind_ta;
          if(weapon[i].magna_wind_ta)  skill.magna_ta  += weapon[i].magna_wind_ta;
          if(weapon[i].gen_wind_bkn)   skill.hp_down   -= weapon[i].gen_wind_bkn;
          if(weapon[i].magna_wind_bkn) skill.hp_down   -= weapon[i].magna_wind_bkn;
          break;
        case "光":
          zenith_ele_bonus = chara.ele_light;
          if(weapon[i].gen_light_atk)   skill.gen_atk   += weapon[i].gen_light_atk;
          if(weapon[i].gen_light_hp)    skill.gen_hp    += weapon[i].gen_light_hp;
          if(weapon[i].gen_light_bob)   skill.gen_bob   += weapon[i].gen_light_bob;
          if(weapon[i].gen_light_kns)   skill.gen_kns   += weapon[i].gen_light_kns;
          if(weapon[i].gen_light_cri)   skill.gen_cri   += weapon[i].gen_light_cri;
          if(weapon[i].magna_light_atk) skill.magna_atk += weapon[i].magna_light_atk;
          if(weapon[i].magna_light_hp)  skill.magna_hp  += weapon[i].magna_light_hp;
          if(weapon[i].magna_light_bob) skill.magna_bob += weapon[i].magna_light_bob;
          if(weapon[i].magna_light_cri) skill.magna_cri += weapon[i].magna_light_cri;
          if(weapon[i].gen_light_da)    skill.gen_da    += weapon[i].gen_light_da;
          if(weapon[i].magna_light_da)  skill.magna_da  += weapon[i].magna_light_da;
          if(weapon[i].gen_light_ta)    skill.gen_ta    += weapon[i].gen_light_ta;
          if(weapon[i].magna_light_ta)  skill.magna_ta  += weapon[i].magna_light_ta;
          if(weapon[i].gen_light_bkn)   skill.hp_down   -= weapon[i].gen_light_bkn;
          if(weapon[i].magna_light_bkn) skill.hp_down   -= weapon[i].magna_light_bkn;
          break;
        case "闇":
          zenith_ele_bonus = chara.ele_dark;
          if(weapon[i].gen_dark_atk)   skill.gen_atk   += weapon[i].gen_dark_atk;
          if(weapon[i].gen_dark_hp)    skill.gen_hp    += weapon[i].gen_dark_hp;
          if(weapon[i].gen_dark_bob)   skill.gen_bob   += weapon[i].gen_dark_bob;
          if(weapon[i].gen_dark_kns)   skill.gen_kns   += weapon[i].gen_dark_kns;
          if(weapon[i].gen_dark_cri)   skill.gen_cri   += weapon[i].gen_dark_cri;
          if(weapon[i].magna_dark_atk) skill.magna_atk += weapon[i].magna_dark_atk;
          if(weapon[i].magna_dark_hp)  skill.magna_hp  += weapon[i].magna_dark_hp;
          if(weapon[i].magna_dark_bob) skill.magna_bob += weapon[i].magna_dark_bob;
          if(weapon[i].magna_dark_cri) skill.magna_cri += weapon[i].magna_dark_cri;
          if(weapon[i].gen_dark_da)    skill.gen_da    += weapon[i].gen_dark_da;
          if(weapon[i].magna_dark_da)  skill.magna_da  += weapon[i].magna_dark_da;
          if(weapon[i].gen_dark_ta)    skill.gen_ta    += weapon[i].gen_dark_ta;
          if(weapon[i].magna_dark_ta)  skill.magna_ta  += weapon[i].magna_dark_ta;
          if(weapon[i].gen_dark_bkn)   skill.hp_down   -= weapon[i].gen_dark_bkn;
          if(weapon[i].magna_dark_bkn) skill.hp_down   -= weapon[i].magna_dark_bkn;
          break;
      }
    }
  }
  
  if(!zenith_ele_bonus) zenith_ele_bonus = 0;
  
  // バハ武器処理　同名スキルを除外したのち、種族毎のスキル値を計算　？？？種族は一番高い値とする
  var baha_skill = {hum:{hp:0, atk:0},
                    drf:{hp:0, atk:0},
                    ern:{hp:0, atk:0},
                    hav:{hp:0, atk:0}}
  var skip_idx = []
                    
  for(var i=0;i<baha_wp.length;i++){
    for(var j=i+1;j<baha_wp.length;j++){
      if(baha_wp[i].skill1 == baha_wp[j].skill1){
        if(baha_wp[i].slv > baha_wp[j].slv){
          skip_idx.push(j)
        }else{
          skip_idx.push(i)
        }
      }
    }
  }
  
  for(var i=0;i<baha_wp.length;i++){
    var skipflg = false;
    for(var j=0; j<skip_idx.length; j++){
      if(i==skip_idx[j]) skipflg = true;
    }
    if(skipflg) continue;
    
    switch(baha_wp[i].skill1){
      case "ヒュムアニムス・ウィス":
        baha_skill.hum.atk  += baha_wp[i].bahamut_atk
        break
      case "ドーラアニムス・ウィス":
        baha_skill.drf.atk  += baha_wp[i].bahamut_atk
        break;
      case "エルンアニムス・ウィス":
        baha_skill.ern.atk  += baha_wp[i].bahamut_atk
        break;
      case "ハヴンアニムス・ウィス":
        baha_skill.hav.atk  += baha_wp[i].bahamut_atk
        break;
      case "ヒュムアニムス・メンス":
        baha_skill.hum.hp += baha_wp[i].bahamut_hp
        break;
      case "ドーラアニムス・メンス":
        baha_skill.drf.hp += baha_wp[i].bahamut_hp
        break;
      case "エルンアニムス・メンス":
        baha_skill.ern.hp += baha_wp[i].bahamut_hp
        break;
      case "ハヴンアニムス・メンス":
        baha_skill.hav.hp += baha_wp[i].bahamut_hp
        break;
      case "コンキリオ・ルーベル":
      case "コンキリオ・イグニス":
        baha_skill.hum.hp  += baha_wp[i].bahamut_hp
        baha_skill.hum.atk += baha_wp[i].bahamut_atk
        baha_skill.drf.hp  += baha_wp[i].bahamut_hp
        baha_skill.drf.atk += baha_wp[i].bahamut_atk
        break;
      case "コンキリオ・ケルレウス":
      case "コンキリオ・インベル":
        baha_skill.ern.hp  += baha_wp[i].bahamut_hp
        baha_skill.ern.atk += baha_wp[i].bahamut_atk
        baha_skill.hav.hp  += baha_wp[i].bahamut_hp
        baha_skill.hav.atk += baha_wp[i].bahamut_atk
        break;
      case "コンキリオ・ウェントス":
        baha_skill.hum.hp  += baha_wp[i].bahamut_hp
        baha_skill.hum.atk += baha_wp[i].bahamut_atk
        baha_skill.ern.hp  += baha_wp[i].bahamut_hp
        baha_skill.ern.atk += baha_wp[i].bahamut_atk
        break;
      case "コンキリオ・コルヌ":
        baha_skill.drf.hp  += baha_wp[i].bahamut_hp
        baha_skill.drf.atk += baha_wp[i].bahamut_atk
        baha_skill.ern.hp  += baha_wp[i].bahamut_hp
        baha_skill.ern.atk += baha_wp[i].bahamut_atk
        break;
      case "コンキリオ・テラ":
        baha_skill.drf.hp  += baha_wp[i].bahamut_hp
        baha_skill.drf.atk += baha_wp[i].bahamut_atk
        baha_skill.hav.hp  += baha_wp[i].bahamut_hp
        baha_skill.hav.atk += baha_wp[i].bahamut_atk
        break;
      case "コンキリオ・アルボス":
        baha_skill.hum.hp  += baha_wp[i].bahamut_hp
        baha_skill.hum.atk += baha_wp[i].bahamut_atk
        baha_skill.hav.hp  += baha_wp[i].bahamut_hp
        baha_skill.hav.atk += baha_wp[i].bahamut_atk
        break;
    }
  }
  
  switch(chara.tribe){
    case "ヒューマン":
      skill.bahamut_hp  = baha_skill.hum.hp
      skill.bahamut_atk = baha_skill.hum.atk
      break;
    case "ドラフ":
      skill.bahamut_hp  = baha_skill.drf.hp
      skill.bahamut_atk = baha_skill.drf.atk
      break;
    case "エルーン":
      skill.bahamut_hp  = baha_skill.ern.hp
      skill.bahamut_atk = baha_skill.ern.atk
      break;
    case "ハーヴィン":
      skill.bahamut_hp  = baha_skill.hav.hp
      skill.bahamut_atk = baha_skill.hav.atk
      break;
    case "不明":
      var max_hp = (baha_skill.hum.hp > baha_skill.drf.hp)? baha_skill.hum.hp : baha_skill.drf.hp;
      max_hp = (max_hp > baha_skill.ern.hp)? max_hp : baha_skill.ern.hp;
      max_hp = (max_hp > baha_skill.hav.hp)? max_hp : baha_skill.hav.hp;
      var max_atk = (baha_skill.hum.atk > baha_skill.drf.atk)? baha_skill.hum.atk : baha_skill.drf.atk;
      max_atk = (max_atk > baha_skill.ern.atk)? max_atk : baha_skill.ern.atk;
      max_atk = (max_atk > baha_skill.hav.atk)? max_atk : baha_skill.hav.atk;
      skill.bahamut_hp  = max_hp
      skill.bahamut_atk = max_atk
  }
  
  if(skill.bahamut_hp  > 0.5) skill.bahamut_hp  = 0.5;
  if(skill.bahamut_atk > 0.5) skill.bahamut_atk = 0.5;
  
  
  
  // コスモス武器チェック（スキル２）
  for(var i=0; i<10; i++){
    if(weapon[i].skill2.indexOf("・スタンス") != -1){
      var ctype = weapon[i].skill2
      ctype = ctype.slice(0, ctype.indexOf("・スタンス"))
      if(ctype == "アタック" && chara.type == "攻撃"){
        skill.cosmos_atk = 0.2;
        skill.hp_down -= 0.4;
      } else if(ctype == "ディフェンド" && chara.type == "防御"){
        skill.cosmos_hp = 0.1
      } else if(ctype == "ヒール" && chara.type == "回復"){
      } else if(ctype == "バランス" && chara.type == "バランス"){
        skill.cosmos_da = 0.2
      } else if(ctype == "ぺキューリア" && chara.type == "特殊"){
      }
    }
  }
  
  // DA補正値の合計（各枠毎に上限0.5）
  var da_rate  = (skill.gen_da*(1+bless.zeus) > 0.5)? 0.5 : skill.gen_da*(1+bless.zeus);
  da_rate += (skill.magna_da*(1+bless.magna) > 0.5)? 0.5 : skill.magna_da*(1+bless.magna);
  da_rate += (skill.unknown_da > 0.5)? 0.5: skill.unknown_da;
  da_rate += skill.cosmos_da
  if(da_rate > 1) da_rate = 1;
  var ta_rate = (skill.gen_ta*(1+bless.zeus)+skill.magna_ta*(1+bless.magna)+skill.unknown_ta)
  if(ta_rate > 0.5) ta_rate = 0.5;

  

  var aisyou = (info.base.aisyou == "有利")? 1.5 : (info.base.aisyou == "普通")? 1.0 : 0.75;
  var cri_rate = (skill.gen_cri*(1+bless.zeus)+skill.magna_cri*(1+bless.magna)+skill.unknown_cri)
  cri_rate = (info.base.aisyou == "有利")? cri_rate : 0;
  cri_rate = (calc_opt.cri_enb)? cri_rate : 0;
  var gen_kns_val = (info.base.hp_ratio < 0.25)? 0 : skill.gen_kns*(64/3*(info.base.hp_ratio-0.25)*(info.base.hp_ratio-0.25) + 3)/15;
  
  // total_atk: 総合攻撃力
  // nbuf_atk:  バフ/DATAを計算式に入れない攻撃力
  // base_atk:  バフ/背水を計算式に入れない攻撃力
  // total_hp:  総合 HP
  var total_atk = disp_atk * (1 + info.base.ship_bonus)
                           * (1 + skill.gen_atk*(1+bless.zeus) + skill.bahamut_atk + skill.cosmos_atk + bless.chara + info.buf.atk_one + info.buf.atk_both + info.buf.atk_summon)
                           * (1 + skill.magna_atk*(1+bless.magna))
                           * (1 + skill.unknown_atk)
                           * (aisyou + bless.ele + zenith_ele_bonus + info.buf.ele_chara + info.buf.ele_summon)
                           * (1 + skill.gen_bob*(2*info.base.hp_ratio*info.base.hp_ratio - 5*info.base.hp_ratio + 3)*(1+bless.zeus))
                           * (1 + skill.magna_bob*(2*info.base.hp_ratio*info.base.hp_ratio - 5*info.base.hp_ratio + 3)*(1+bless.magna))
                           * (1 + skill.unknown_bob*(2*info.base.hp_ratio*info.base.hp_ratio - 5*info.base.hp_ratio + 3))
                           * (1 + gen_kns_val*(1+bless.zeus))
                           * (1 + info.buf.atk_other)
                           * (1 + info.buf.atk_join)
                           * (1 + calc_opt.da_corr *(da_rate + 2*ta_rate - da_rate*ta_rate))
                           * (1 + cri_rate*0.5);
  
  var nbuf_atk = disp_atk * (1 + info.base.ship_bonus)
                          * (1 + skill.gen_atk*(1+bless.zeus) + skill.bahamut_atk + skill.cosmos_atk + bless.chara)
                          * (1 + skill.magna_atk*(1+bless.magna))
                          * (1 + skill.unknown_atk)
                          * (aisyou + bless.ele + zenith_ele_bonus)
                          * (1 + skill.gen_bob*(2*info.base.hp_ratio*info.base.hp_ratio - 5*info.base.hp_ratio + 3)*(1+bless.zeus))
                          * (1 + skill.magna_bob*(2*info.base.hp_ratio*info.base.hp_ratio - 5*info.base.hp_ratio + 3)*(1+bless.magna))
                          * (1 + skill.unknown_bob*(2*info.base.hp_ratio*info.base.hp_ratio - 5*info.base.hp_ratio + 3))
                          * (1 + gen_kns_val*(1+bless.zeus));
 
  var base_atk = disp_atk * (1 + info.base.ship_bonus)
                          * (1 + skill.gen_atk*(1+bless.zeus) + skill.bahamut_atk + bless.chara)
                          * (1 + skill.magna_atk*(1+bless.magna))
                          * (1 + skill.unknown_atk)
                          * (aisyou + bless.ele + zenith_ele_bonus);
  
  var total_hp = disp_hp * (1 + skill.gen_hp*(1+bless.zeus)
                              + skill.bahamut_hp
                              + skill.magna_hp*(1+bless.magna)
                              + skill.unknown_hp
                              + skill.cosmos_hp
                              + bless.hp
                              + info.buf.hp_join)
                         * skill.hp_down;
  
  return {disp_atk:disp_atk, disp_hp:disp_hp, total_atk:total_atk,
          nbuf_atk:nbuf_atk, base_atk:base_atk, total_hp:total_hp, skill:skill, bless:bless};
}


// ジョブボーナスの計算
function calcJobBonus(jobData, jobname){
  var bonus = {hp_ratio:0, atk_ratio:0, atk:0, hp:0, pt_hp:0,
               ele_fire:0, ele_water:0, ele_earth:0,
               ele_wind:0, ele_light:0, ele_dark:0}
  var tokui = {};
  var type = "なし";

  // ボーナスの計算
  for(i=2;i<jobData.length;i++){
    /* ---- マスターボーナス ---- */
    if(jobData[i][1] == 20){
      switch (jobData[i][0]){
        case "ファイター":
          bonus.atk_ratio += 0.01;
          break;
        case "グラップラー":
        case "ランサー":
          bonus.hp_ratio += 0.01;
          break;
        case "ウォーリア":
          bonus.atk_ratio += 0.02;
          break;
        case "クンフー":
        case "ドラグーン":
          bonus.hp_ratio += 0.02;
          break;
        case "ウェポンマスター":
          bonus.atk_ratio += 0.03;
          break;
        case "オーガ":
        case "ヴァルキュリア":
          bonus.hp_ratio += 0.03;
          break;
        case "侍":
          bonus.atk_ratio += 0.05;
          break;
        case "剣聖":
          bonus.atk_ratio += 0.02;
          break;
        case "ベルセルク":
          bonus.atk_ratio += 0.02;
          bonus.hp_ratio += 0.01;
          break;
        case "スパルタ":
          bonus.hp_ratio += 0.01;
          break;
        case "ウォーロック":
          bonus.atk_ratio += 0.01;
          break;
        case "義賊":
          bonus.atk_ratio += 0.01;
          break;
        case "レスラー":
          bonus.hp_ratio += 0.01;
          bonus.atk_ratio += 0.01;
          break;
      }
    }
    
    /* ---- ジョブボーナス ---- */
    if(jobData[i][0] == jobname){
      bonus.atk = Number(jobData[i][2])
      bonus.hp = Number(jobData[i][4])
      bonus.ele_fire  = Number(jobData[i][5])
      bonus.ele_water = Number(jobData[i][6])
      bonus.ele_earth = Number(jobData[i][7])
      bonus.ele_wind  = Number(jobData[i][8])
      bonus.ele_light = Number(jobData[i][9])
      bonus.ele_dark  = Number(jobData[i][10])
      bonus.pt_hp = jobData[i][13]
      
      // 得意武器 II への対応
      jobData[i][11] = Number(jobData[i][11]) + Number(jobData[i][14])
      jobData[i][12] = Number(jobData[i][12]) + Number(jobData[i][15])
      
      switch (jobname){
        // ウェポンマスター系統
        case "ウェポンマスター":
          bonus.atk += 300 * (Math.floor(jobData[i][1]/5) + 1);
        case "ウォーリア":
          bonus.atk += 300 * (Math.floor(jobData[i][1]/5) + 1);
        case "ファイター":
          bonus.atk += 300 * (Math.floor(jobData[i][1]/5) + 1);
          tokui = {剣:0.2+jobData[i][11], 斧:0.2+jobData[i][12]}
          type = '攻撃';
          break;
        // ホーリーセイバー系統
        case "ホーリーセイバー":
        case "フォートレス":
        case "ナイト":
          tokui = {剣:0.2+jobData[i][11], 槍:0.2+jobData[i][12]}
          type = '防御';
          break;
        // ビショップ系統
        case "ビショップ":
        case "プリースト":
        case "クレリック":
          tokui = {杖:0.2+jobData[i][11], 槍:0.2+jobData[i][12]}
          type = '回復';
          break;
        // ハーミット系統
        case "ハーミット":
        case "ソーサラー":
        case "ウィザード":
          tokui = {杖:0.2+jobData[i][11], 短剣:0.2+jobData[i][12]}
          type = '攻撃';
          break;
        // ホークアイ系統
        case "ホークアイ":
        case "レイダー":
        case "シーフ":
          tokui = {短剣:0.2+jobData[i][11], 銃:0.2+jobData[i][12]}
          type = 'バランス';
          break;
        // ダークフェンサー系統
        case "ダークフェンサー":
        case "アルカナソード":
        case "エンハンサー":
          tokui = {剣:0.2+jobData[i][11], 短剣:0.2+jobData[i][12]}
          type = '特殊';
          break;
        // オーガ系統
        case "オーガ":
        case "クンフー":
          bonus.atk += 200 * (Math.floor(jobData[i][1]/5) + 1);
          bonus.hp += 20 * (Math.floor(jobData[i][1]/5) + 1);
        case "グラップラー":
          bonus.atk += 200 * (Math.floor(jobData[i][1]/5) + 1);
          bonus.hp += 20 * (Math.floor(jobData[i][1]/5) + 1);
          tokui = {格闘:0.2+jobData[i][11]+jobData[i][12]}
          type = '攻撃';
          break;
        // サイドワインダー系統
        case "サイドワインダー":
          bonus.atk += 50 * (Math.floor(jobData[i][1]/5) + 1);
        case "マークスマン":
          bonus.atk += 50 * (Math.floor(jobData[i][1]/5) + 1);
        case "レンジャー":
          bonus.atk += 100 * (Math.floor(jobData[i][1]/5) + 1);
          tokui = {弓:0.2+jobData[i][11], 銃:0.2+jobData[i][12]}
          type = 'バランス';
          break;
        // スーパースター系統
        case "スーパースター":
        case "ミンストレル":
        case "ハーピスト":
          tokui = {楽器:0.2+jobData[i][11], 短剣:0.2+jobData[i][12]}
          type = '特殊';
          break;
        // ヴァルキュリア系統
        case "ドラグーン":
          bonus.atk += 100 * (Math.floor(jobData[i][1]/5) + 1);
        case "ヴァルキュリア":
          bonus.atk += 100 * (Math.floor(jobData[i][1]/5) + 1);
          tokui = {槍:0.2+jobData[i][11], 斧:0.2+jobData[i][12]}
          type = '攻撃';
          break;
        case "ランサー":
          bonus.atk_ratio += 0.01 * (Math.floor(jobData[i][1]/5) + 1);
          tokui = {槍:0.2+jobData[i][11], 斧:0.2+jobData[i][12]}
          type = '攻撃';
          break;
        // エクストラジョブ
        case "アルケミスト":
          bonus.hp += 20 * (Math.floor(jobData[i][1]/5) + 1);
          tokui = {短剣:0.2+jobData[i][11], 銃:0.2+jobData[i][12]}
          type = '回復';
          break;
        case "忍者":
          tokui = {刀:0.2+jobData[i][11], 格闘:0.2+jobData[i][12]}
          type = '特殊';
          break;
        case "侍":
          bonus.atk += 600 * (Math.floor(jobData[i][1]/5) + 1);
          tokui = {刀:0.2+jobData[i][11], 弓:0.2+jobData[i][12]}
          type = '攻撃';
          break;
        case "剣聖":
          bonus.atk += 300 * (Math.floor(jobData[i][1]/5) + 1);
          bonus.hp += 60 * (Math.floor(jobData[i][1]/5) + 1);
          tokui = {剣:0.2+jobData[i][11], 刀:0.2+jobData[i][12]}
          type = '特殊';
          break;
        case "ガンスリンガー":
          bonus.atk += 200 * (Math.floor(jobData[i][1]/5) + 1);
          tokui = {銃:0.2+jobData[i][11]+jobData[i][12]}
          type = '特殊';
          break;
        case "賢者":
          bonus.hp += 200 * (Math.floor(jobData[i][1]/5) + 1);
          tokui = {杖:0.2+jobData[i][11]+jobData[i][12]}
          type = '特殊';
          break;
        case "アサシン":
          bonus.hp += 200 * (Math.floor(jobData[i][1]/5) + 1);
          tokui = {短剣:0.2+jobData[i][11]+jobData[i][12]}
          type = '特殊';
          break;
        // Class 4
        case "ベルセルク":
          bonus.atk += 2000 * (Math.floor(jobData[i][1]/10) + 1);
          bonus.hp += 500 * (Math.floor((jobData[i][1]+5)/10));
          tokui = {剣:0.2+jobData[i][11], 斧:0.2+jobData[i][12]}
          type = '攻撃';
          break;
        case "セージ":
          tokui = {杖:0.2+jobData[i][11], 槍:0.2+jobData[i][12]}
          type = '回復';
          break;
        case "スパルタ":
          bonus.hp += 750 * (Math.floor((jobData[i][1]+5)/10));
          tokui = {剣:0.2+jobData[i][11], 槍:0.2+jobData[i][12]}
          type = '防御';
          break
        case "ウォーロック":
          bonus.atk += 1000 * (Math.floor((jobData[i][1]+5)/10));
          tokui = {杖:0.2+jobData[i][11], 短剣:0.2+jobData[i][12]}
          type = '攻撃';
          break
        case "カオスルーダー":
          tokui = {剣:0.2+jobData[i][11], 短剣:0.2+jobData[i][12]}
          type = '特殊';
          break
        case "義賊":
          tokui = {短剣:0.2+jobData[i][11], 銃:0.2+jobData[i][12]}
          type = 'バランス';
          break
        case "レスラー":
          bonus.atk += 1000 * (Math.floor((jobData[i][1]+9)/10));
          bonus.hp += 150 * (Math.floor((jobData[i][1]+5)/10));
          tokui = {格闘:0.2+jobData[i][11]+jobData[i][12]}
          type = '攻撃';
          break;
        case "ハウンドドッグ":
          bonus.atk += 600 * (Math.floor(jobData[i][1]/10) + 1);
          tokui = {弓:0.2+jobData[i][11], 銃:0.2+jobData[i][12]}
          type = 'バランス';
          break;
        case "アプサラス":
          bonus.atk += (jobData[i][1] < 10)? 1000 : 2000;
          tokui = {槍:0.2+jobData[i][11], 斧:0.2+jobData[i][12]}
          type = '攻撃';
          break;
      }
    }
    
  }

  // Number への変換
  for (var prop in bonus) {
    bonus[prop] = Number(bonus[prop])
  }
  for (var prop in tokui) {
    tokui[prop] = Number(tokui[prop])
  }
  bonus.tokui = tokui
  bonus.type = type

  return bonus
}
