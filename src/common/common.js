"use strict";

!function () {
  String.prototype.format = function () {
    let result = this;
    if (arguments.length > 0) {
      let arg0 = arguments[0];
      if (Array.isArray(arg0)) { // 第一种情况，传入key-value进行替换，剩下的参数全部忽略
        for (let i = 0; i < arg0.length; i++) {
          if (arg0[i]) {
            result = result.replace(RegExp("({)" + i + "(})", "g"), arg0[i]);
          }
        }
      }
      else if (typeof arg0 === "object") { // 第二种情况，传入数组
        for (let key in arg0) {
          if (arg0.hasOwnProperty(key) && (typeof arg0[key] === "number" || typeof arg0[key] === "string")) {
            result = result.replace(RegExp("({" + key + "})", "g"), arg0[key]);
          }
        }

      } else if (typeof arg0 === "string") {
        for (let j = 0; j < arguments.length; j++) {
          result = result.replace(RegExp("({)" + j + "(})", "g"), arguments[j])
        }
      }
    }
    return result;
  }
}();

let result = "第一个参数：{0}，第二个参数：{1}，第三个参数：{2}，第四个参数：{3}，第五个参数：{4}".format([1, "2", {}, [], null]);

console.log(result);

// export default {}