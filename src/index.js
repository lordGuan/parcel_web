/**
 * 首页功能
 * 0.初始化滚动信息
 * 1.初始化所有交易对的交易图表（交易区-交易对-【kline+走势】）
 * 2.定时刷新
 */
(async () => {
  const {Vue} = await import("./index/vendors");
  let fakeData = [
    {
      trade_pair: "btc_usdt",
      newest_price: null,
      rate: null,
      high: null,
      low: null,
      amount: null
    },
    {
      trade_pair: "eth_btc",
      newest_price: null,
      rate: null,
      high: null,
      low: null,
      amount: null
    },
    {
      trade_pair: "ada_eth",
      newest_price: null,
      rate: null,
      high: null,
      low: null,
      amount: null
    }
  ];
  // 标记自选
  let selected = localStorage.getItem("selected") || "[]";
  selected = JSON.parse(selected);
  fakeData.forEach(item => {
    let index = selected.indexOf(item.trade_pair);
    item.isSelected = index >= 0;
  });
  // 默认按照数据的排序
  const vm = new Vue({
    data() {
      return {
        fakeData,
        sortByName: false, // 键值对排序标记，false->降序Z-A true->升序A-Z
        sortByRate: false, // 涨幅排序标记，false->降序 true->升序
        sortByPrice: false, // 最新价排序标记，false->降序 true->升序
        currentSort: '', // 初始化进来是没有进行排序的
        zone: '', // 交易区 ''-表示全部，'selected'-表示自选，其他分别以币代号的小写字母
        isPending: true // 是否仍在加载数据
      }
    },
    methods: {
      /**
       * 进行搜索
       * @param tag 搜索字段
       */
      toggleSort(tag) {
        if (this.isPending) {
          return;
        }
        let oldFlag = this[tag];
        (this.currentSort === tag) ? (this[tag] = !oldFlag) : (this[tag] = true);
        this.currentSort = tag;
        let sortFunc;
        switch (tag) {
          case 'sortByName':
            sortFunc = (prev, next) => {
              return this[tag] ? prev.trade_pair >= next.trade_pair : prev.trade_pair < next.trade_pair;
            };
            break;
          case 'sortByRate':
            sortFunc = (prev, next) => {
              let prevValue = Number(prev.rate),
                nextValue = Number(next.rate);
              return this[tag] ? prevValue <= nextValue : prevValue > nextValue;
            };
            break;
          case 'sortByPrice':
            sortFunc = (prev, next) => {
              return this[tag] ? prev.newest_price <= next.newest_price : prev.newest_price > next.newest_price;
            };
            break;
        }
        this.fakeData.sort(sortFunc);
      },
      select(tradePair, self) {
        let oldSelected = localStorage.getItem("selected") || "[]";
        if (oldSelected && oldSelected !== '') {
          oldSelected = JSON.parse(oldSelected);
          let index = oldSelected.indexOf(tradePair);
          if (index >= 0) { // 如果已经包含应当删除
            oldSelected.splice(index, 1);
            self.isSelected = false;
          } else {
            oldSelected.push(tradePair);
            self.isSelected = true;
          }
          localStorage.setItem("selected", JSON.stringify(oldSelected));
        }
      }
    },
    watch: {
      zone() {

      }
    },
    computed: {
      filterFakeData() {
        return this.fakeData.filter(item => {
          if (this.zone === '') {
            return true;
          }
          if (this.zone === 'selected') { // 特殊处理自选
            return !!item.isSelected;
          }
          return item.trade_pair.split("_")[1] === this.zone;
        })
      }
    }
  }).$mount(".main_app");

  mockData().then((newData) => {
    // vm.fakeData = newData.forEach(item => item.isSelected = item.isSelected || true);
    let selected = localStorage.getItem("selected") || "[]";
    selected = JSON.parse(selected);
    newData.forEach(item => {
      let index = selected.indexOf(item.trade_pair);
      item.isSelected = index >= 0;
      item.rate = item.rate >= 0 ? "+" + String(item.rate) : String(item.rate);
    });
    vm.fakeData = newData;
    vm.isPending = false;
  })
})();

function mockData() {
  let newData = [
    {
      trade_pair: "btc_usdt",
      newest_price: 10.11,
      rate: -0.5,
      high: 1200,
      low: 300,
      amount: 1599
    },
    {
      trade_pair: "eth_btc",
      newest_price: 1.23,
      rate: +0.2,
      high: 1000,
      low: 500,
      amount: 3000
    },
    {
      trade_pair: "ada_eth",
      newest_price: 9.1,
      rate: -0.1,
      high: 1200,
      low: 300,
      amount: 1390
    }
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(newData)
    }, 2000)
  })
}
