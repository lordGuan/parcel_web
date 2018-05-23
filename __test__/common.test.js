class MonitorableArray extends Array {
  constructor(args) {
    // 首先还是一个数组
    super(...args);
  }

  // 需要监听的方法进行复写，比如push
  push(args) {
    console.log("Catch push:",args);
    return super.push(args);
  }
}

test("String.format:", () => {
  let myArray = new MonitorableArray([1,2,3]);
  myArray.push([4,5]);
  expect(myArray.length).toBe(3);
});