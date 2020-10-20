# virusmap-wangpf
## 世界疫情数据可视化
## Echarts 的引入方式 （我使用的cdn）
```html
在public 中的HTML 引入 <script src="https://cdn.bootcss.com/echarts/3.7.0/echarts.min.js"></script>
```
```JavaScript
//vue.config.js 配置   
chainWebpack: config => {
        // 用cdn方式引入
        config.externals({
		  "echarts": "echarts",
        })
      },
```

## 静态页面的编写  （略）

##  组件分布

###  2.1 VmHeader

- 封装头部布局
- 独立组件 ： ZpTime （封装实时时间）  （在别的项目仍可以用）

### 2.2 VmLeft 和 VmRight

- 左右俩边布局
- 子组件: VmPanel  ( 封装存储容器 )
- 

#### 2.3 VmCenter 

- 封装 中间布局
- 子组件 ： VmCenterContent  和  VmCenterTop



## 数据接口分析 

- 除中国外的世界各个国家疫情数据 
  - https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign
- 中国疫情数据
  - https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5

###  获取新增确诊TOP10 的数据

- 通过 countryAddConfirmRankList 
  - nation （国家）
  - addConfirm （确诊数）

### 主要疫情国家治愈率的数据

- foreignList  （ 找主要国家的几个）
  - name (国家名)
  - heal （治愈人数）
  - confirm （确诊人数）

### 主要大洲感染总人数趋势图数据

- continentStatis 
  - date （日期）
  - statis  (是个数组 里面有五大洲 以及 其他   （这里我只选择了亚洲、北美洲和欧洲的）)

### 世界每周新增治愈和死亡人数数据

- globalDailyHistory
  - date （日期）
  - all.heal （每周的治愈人数）
  - all.dead  (每周死亡人数）

### 大洲感染人数饼状图数据

- continentStatis[foreignData.continentStatis.length - 1]  (最新日期的  各个大洲的感染人数)
  - date （日期）
  - statis 

### 境外输入病情top10省份数据

- importStatis
  - Toplist
    - province  （省份）
    - importedCase  （输入病情人数）

### 因为需要跨域 所以 封装了一个JSONP

``` JavaScript
export  function jsonp({url,params={},success}){
                // 根据时间戳生成一个callback名
                let callbackName = `jsonp_${new Date().getTime()}`;

                // 创建script
                let script = document.createElement('script');

                // 字符串拼接生成基本url
                let baseUrl = `${url}?callback=${callbackName}`;

                // 取出params对象属性并得到完整url
                for(let item in params){
                    baseUrl += `&${item}=${params[item]}`;
                }
                // jsonp核心，通过script的跨域特性发出请求
                script.src = baseUrl;
                // 把创建的script挂载到DOM
                document.body.appendChild(script);

                // 给window添加属性，用于获取jsonp结果
                window[callbackName] = (res)=>{
                    // 执行success回调
                    success(res);
                    // 删除window下属性
                    delete window[callbackName];
                    // 得到结果后删除创建的script
                    document.body.removeChild(script);
                }

            }
```

###  由于是异步请求数据 ， 所以 使用 Promise 可以将数据通过 reslove 返回出去

``` javascript
import {
  jsonp
} from './jsonp'

// 引入 echarts 配置的 柱状图、折线图等option内容
import {
  setOption1,
  setOption2,
  setOption3,
  setOption4,
  setOption5,
  setOption6,
  setForeignData
} from '@/common/option'
// 国外
export function getForeignData() {
  return new Promise((resolve, reject) => {
    jsonp({
      url: 'https://view.inews.qq.com/g2/getOnsInfo',
      params: {
        name: 'disease_foreign',
      },
      success(res) {
        let foreignData = JSON.parse(res.data)
        // console.log(foreignData);
        // 国家感染人数前10
        let option1 = setOption1(foreignData.countryAddConfirmRankList)
        // 各个国家的疫情详情数据
        let option2 = setOption2(foreignData.foreignList)
        // 各个大洲的感染人数
        let option3 = setOption3(foreignData.continentStatis)
        // 世界疫情数据
        let option4 = setOption4(foreignData.globalDailyHistory)
        // 最近一次更新数据 的 各个大洲的感染人数
        let option5 = setOption5(foreignData.continentStatis[foreignData.continentStatis.length - 1])

        let option6 = setOption6(foreignData.importStatis.TopList)
        // 获取 中央头部 累计疫情数据
        let centerTop = foreignData.globalStatis

	  // 导出去、 在Vue中通过 调用函数.then来 获取 指定数据
        resolve({
          option1,
          option2,
          option3,
          option4,
          option5,
          option6,
          centerTop,
        })
      }
    })
  })
}

//  同时获取 国外 和 中国的 数据 使用 Promis.all方法
export function getWorldData() {
  return Promise.all(
    [
      new Promise((resolve, reject) => {
        jsonp({
          url: 'https://view.inews.qq.com/g2/getOnsInfo',
          params: {
            name: 'disease_foreign',
          },
          success(res) {
            let foreignData = JSON.parse(res.data)
            let centerForeignData = setForeignData(foreignData.foreignList)
            resolve(centerForeignData)
          }
        })
      }),
      new Promise((resolve, reject) => {
        jsonp({
          url: "https://view.inews.qq.com/g2/getOnsInfo",
          params: {
            name: 'disease_h5',
          },
          success(res1) {
            let chinaData = JSON.parse(res1.data)
            // console.log(chinaData);
            let chinaMapData = {
              name: '中国',
              confirm: chinaData.chinaTotal.confirm,
              nowConfirm: chinaData.chinaTotal.nowConfirm
            }
            resolve(chinaMapData)
          }
        })
      })
    ])
}

//  封装一个 将 echarts 渲染页面中的方法 
export function addChart(dom, option) {
  let myChart = echarts.init(dom);
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
  return myChart;
}
```

## 传递数据的方式

chart.js中，先异步请求到数据，通过调用options.js里面的函数，将请求到的数据进行加工，形成echarts图表要用到的option。chart.js export返回值为promise的函数，该promise在成功后，会把上面形成的option都存到res中，在App.vue中调用chart.js 的函数，获取到所有的图标配置信息，通过props发送给所需要的组件。由于上面获取数据的方式是异步的。在App.vue组件给子组件传递option信息时，值还是空的，所以子组件里面通过watch监听option，当option有值的时候，就可以渲染echart图表了。

通过上述方式，减少了对数据的请求次数。






## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
