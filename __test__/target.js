class MonitorableArray extends Array {
  constructor(...args) {
    // 首先还是一个数组
    super(args);
  }

  // 需要监听的方法进行复写，比如push
  push(...args) {
    console.log("Catch push:",args);
    return super.push(...args);
  }
}