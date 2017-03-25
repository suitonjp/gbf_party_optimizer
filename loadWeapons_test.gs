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
}