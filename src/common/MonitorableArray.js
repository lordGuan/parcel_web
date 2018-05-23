function MonitorableArray() {
  Array.call(this);
}

(function () {
  // 创建一个没有实例方法的类
  let Super = function () {
  };
  Super.prototype = Array.prototype;
  //将实例作为子类的原型
  MonitorableArray.prototype = new Super();
})();

// MonitorableArray.prototype = [];
// 修复子类的构造方法
MonitorableArray.prototype.constructor = MonitorableArray;

MonitorableArray.prototype.push = function (element) {
  console.log(element);
  Array.prototype.push.call(this, element);
};

MonitorableArray.prototype.slice = function (start, end) {
  console.log("new slice:", start, end);
  return Array.prototype.slice.call(this, start, end);
};

export default MonitorableArray;