function EMA(fNow,fPre,N){
    return Number((fNow * 2 / (N + 1) + fPre * (N - 1) / (N + 1)).toFixed(2));
}

  /**
   * 计算EMA12和EMA26
   */
  function EMASL(points,N){
    if (points == null || points.length <= 0 || N == 0)
      return new Array();
    let result = new Array();
    for(let i=0;i<points.length;i++){
      let candle = points[i];
      if(i == 0){//第一天的EMA为收盘价
        result.push(points[i].c);
      }else{
        result.push(EMA(points[i].c,result[i-1],N));
      }
    }
    return result;
  }

  function DIF(points){
    if (points == null || points.length <= 0)
      return new Array();
    let EMAS = EMASL(points,12);
    let EMAL = EMASL(points,26);
    let DIFs = new Array();
    for(let i =0;i<EMAL.length;i++){
      DIFs.push(formartNumber(EMAS[i]-EMAL[i]));
    }
    return DIFs;
  }

  function DEA(points,N){
    if (points == null || points.length <= 0)
      return new Array();
    let dif = DIF(points);
    let result = new Array();
    for(let i=0;i<points.length;i++){
      if(i == 0){
        result.push(0);
      }else{
        result.push(EMA(dif[i],result[i-1],N));
      }
    }
    return result;
  }

  function BAR(points){
    if (points == null || points.length <= 0)
      return new Array();
    let dif = DIF(points);
    let dea = DEA(points,9);
    let bar = new Array();
    for(let i=0;i<points.length;i++){
      bar.push(2*(formartNumber(dif[i]-dea[i])));
    }
    return bar;
  }

  function formartNumber(n){
      return Number(n.toFixed(2));
  }