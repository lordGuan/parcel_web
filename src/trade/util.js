// @flow
/**
 * Create by guoli guan
 * 2018/5/23
 * 尝试重构原有kline.js
 */


const GLOBAL_VAR = {
  KLineAllData: {},
  KLineData: {},
  time_type: "1",
  mark_from: "11",
  limit: "1000",
  requestParam: "",
  chartMgr: null,
  G_HTTP_REQUEST: null,
  TimeOutId: null,
  button_down: false,
  coinshortName: "win_btc",
  periodMap: {
    "01w": "604800", "03d": "259200", "01d": "86400", "12h": "43200",
    "06h": "21600", "04h": "14400", "02h": "7200", "01h": "3600",
    "30m": "1800", "15m": "900", "05m": "300", "03m": "180",
    "01m": "60"
  },
  tagMapPeriod: {
    "1w": "01w", "3d": "03d", "1d": "01d", "12h": "12h",
    "6h": "06h", "4h": "04h", "2h": "02h", "1h": "01h",
    "30m": "30m", "15m": "15m", "5m": "05m", "3m": "03m",
    "1m": "01m"
  }
};

let classId = 0;

function create_class(superClass: ?Function, ...features) {
  let argsLength = arguments.length;
  let proxyClass = function () {
  };
  // if (argsLength) {
  //   superClass = arguments[0];
  //   for (let k in superClass.prototype)
  //     proxyClass.prototype[k] = superClass.prototype[k];
  // }
  if(typeof superClass === 'function'){
    proxyClass.prototype = superClass.prototype;
  }
  for(let feature of features){
    let featureConstructor = feature.prototype.__construct;
    if(featureConstructor && !proxyClass.prototype.__featureConstructors){

    }
  }
  for (let i = 1; i < argsLength; i++) {
    var feature = arguments[i];
    var f = feature.prototype.__construct;
    if (f) {
      if (!proxyClass.prototype.__featureConstructors)
        proxyClass.prototype.__featureConstructors = [];
      proxyClass.prototype.__featureConstructors.push(f);
      delete feature.prototype.__construct;
    }
    for (var k in feature.prototype)
      proxyClass.prototype[k] = feature.prototype[k];
    if (f)
      feature.prototype.__construct = f;
  }
  var newClass = function () {
    if (this.__construct)
      this.__construct.apply(this, arguments);
    if (this.__featureConstructors) {
      var a = this.__featureConstructors;
      var i, c = a.length;
      for (i = 0; i < c; i++)
        a[i].apply(this, arguments);
    }
  };
  proxyClass.prototype.__classId = classId++;
  if (superClass != undefined) {
    newClass.__super = superClass.prototype;
    proxyClass.prototype.__super = superClass;
  }
  newClass.prototype = new proxyClass();
  return newClass;
}