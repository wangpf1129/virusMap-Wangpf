;
// 国家新增确诊排行 
export function setOption1(countryAddConfirmRankList) {
  let xAxisData = []
  let seriesData = []
  for (let item of countryAddConfirmRankList) {
    xAxisData.push(item.nation)
    seriesData.push(item.addConfirm)
  }
  let option = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    // 修改图表的大小
    grid: {
      left: "0%",
      top: "10px",
      right: "3%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: [{
      type: "category",
      data: xAxisData,
      axisTick: {
        alignWithLabel: true
      },
      // 修改刻度标签 相关样式
      axisLabel: {
        color: "rgba(255,255,255,.6) ",
        fontSize: "10"
      },
      // 不显示x坐标轴的样式
      axisLine: {
        show: false
      }
    }],
    yAxis: [{
      type: "value",
      // 修改刻度标签 相关样式
      axisLabel: {
        color: "rgba(255,255,255,.6) ",
        fontSize: 10
      },
      // y轴的线条改为了2像素
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)",
          width: 2
        }
      },
      // y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      }
    }],
    series: [{
      name: "新增确诊",
      type: "bar",
      data: seriesData,
      barWidth: "35%",
      itemStyle: {
        barBorderRadius: 5
      }
    }]
  }
  return option
}


// 主要疫情国家治愈率
export function setOption2(foreignList) {
  let yAxis1 = []
  let yAxis2 = []
  let rate = []
  let countryList = [0, 1, 9, 41, 4]
  for (let i of countryList) {
    yAxis1.push(foreignList[i].name)
    let cureRate = ((foreignList[i].heal / foreignList[i].confirm) * 100).toFixed(0)
    yAxis2.push(foreignList[i].heal)
    rate.push(cureRate)

  }
  // 声明颜色数组
  let myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
  let option = {
    grid: {
      top: "10%",
      left: "22%",
      bottom: "10%",
      // containLabel: true
    },
    xAxis: {
      show: false
    },
    yAxis: [{
        type: 'category',
        inverse: true,
        data: yAxis1,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#fff"
        },
      },
      {
        data: yAxis2,
        inverse: true,
        // 不显示y轴的线
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        },
        // 把刻度标签里面的文字颜色设置为白色
        show: false,
        axisLabel: {
          color: "#fff"
        }
      }
    ],
    series: [{
        name: '条',
        type: 'bar',
        data: rate,
        yAxisIndex: 0,
        // 柱子之间的距离
        barCategoryGap: 50,
        //柱子的宽度
        barWidth: 10,

        itemStyle: {
          normal: {
            // 柱子设为圆角
            barBorderRadius: 20,
            color: function (params) {
              // params 传进来的是柱子对象
              // console.log(params);
              // dataIndex 是当前柱子的索引号
              return myColor[params.dataIndex];
            }
          },

        },
        // 图形上的文本标签
        label: {
          normal: {
            show: true,
            // 图形内显示
            position: "inside",
            // 文字的显示格式
            formatter: "{c}%"
          }
        },
      },
      {
        name: '框',
        type: 'bar',

        data: [100, 100, 100, 100, 100],
        yAxisIndex: 1,
        // 柱子之间的距离
        barCategoryGap: 50,
        //柱子的宽度
        barWidth: 15,
        itemStyle: {
          normal: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 3,
            barBorderRadius: 15
          },

        },
      }
    ]
  };
  return option
}


// 主要大洲感染总人数趋势图
export function setOption3(continentStatis) {
  let xAxisData = []
  let seriesData = {
    '北美洲': [],
    '亚洲': [],
    '欧洲': []
  }
  for (let item of continentStatis) {
    xAxisData.push(item.date)
    // 如果 有 亚洲  那么就把 数据 push 到里面  否则就将 最近一次的数据push里面  要和 xAxisData 中的数据数量一致
    if (item.statis['亚洲']) {
      seriesData['亚洲'].push(item.statis['亚洲'])
    } else {
      seriesData['亚洲'].push(seriesData['亚洲'][seriesData['亚洲'].length - 1])
    }
    if (item.statis['北美洲']) {
      seriesData['北美洲'].push(item.statis['北美洲'])
    } else {
      seriesData['北美洲'].push(seriesData['北美洲'][seriesData['北美洲'].length - 1])
    }
    if (item.statis['欧洲']) {
      seriesData['欧洲'].push(item.statis['欧洲'])
    } else {
      seriesData['欧洲'].push(seriesData['欧洲'][seriesData['欧洲'].length - 1])
    }
  }
  let option = {
    color: ['#00f2f1', '#ed3f35', '#6408af'],
    legend: {
      textStyle: {
        color: '#4c9bfd' // 图例文字颜色
      },
      right: '10%' // 距离右边10%
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true, // 包含刻度文字在内
      show: true, // 显示边框
      borderColor: '#012f4a', // 边框颜色
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLine: {
        show: false // 去除刻度线
      },
      axisTick: {
        show: false // 去除刻度线
      },
      axisLabel: {
        color: '#4c9bfd' // 文本颜色
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false, // 去除刻度线
      },
      splitLine: {
        lineStyle: {
          color: '#012f4a' // 分割线颜色
        }
      },
      axisLabel: {
        color: '#4c9bfd' // 文本颜色
      },
    },
    series: [{
        name: '北美洲',
        data: seriesData['北美洲'],
        type: 'line',
        // 折线修饰为圆滑
        smooth: true,
      },
      {
        name: '亚洲',
        data: seriesData['亚洲'],
        type: 'line',
        // 折线修饰为圆滑
        smooth: true,
      },
      {
        name: '欧洲',
        data: seriesData['欧洲'],
        type: 'line',
        // 折线修饰为圆滑
        smooth: true,
      }
    ]
  };
  return option
}


// 世界每周新增治愈和死亡人数
export function setOption4(globalDailyHistory) {
  let xAxisData = []
  let seriesHeal = []
  let seriesDead = []
  // for (let item of globalDailyHistory) {
  //   console.log(item);
  //   xAxisData.push(item.date)
  //   seriesHeal.push(item.all.heal)
  //   seriesDead.push(item.all.dead)
  // }
  globalDailyHistory = globalDailyHistory.reverse()
  for (let i = 0; i < globalDailyHistory.length - 1; i += 18) {
    xAxisData.push(globalDailyHistory[i].date)
    seriesHeal.push(globalDailyHistory[i].all.heal)
    seriesDead.push(globalDailyHistory[i].all.dead)
  }
  xAxisData = xAxisData.reverse()
  seriesHeal = seriesHeal.reverse()
  seriesDead = seriesDead.reverse()
  let option = {
    legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    grid: {
      left: "10",
      top: "30",
      right: "15",
      bottom: "10",
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: "12"
        }
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.2)"
        }
      },
      axisTick: {
        show: false
      }
    }],
    yAxis: [{
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      },
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize: 12
        }
      },
      // 修改分割线的颜色
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      }
    }],
    series: [{
        name: '治愈人数',
        type: 'line',
        smooth: true,
        lineStyle: {
          color: "#00d887",
          width: 2
        },
        // 填充区域
        areaStyle: {
          // 渐变色，只需要复制即可
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [{
                offset: 0,
                color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
              },
              {
                offset: 0.8,
                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        // 设置拐点 小圆点
        symbol: "circle",
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#00d887",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        data: seriesHeal
      },
      {
        name: '死亡人数',
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            color: "#bb3e48",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [{
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        // 设置拐点 小圆点
        symbol: "circle",
        // 拐点大小
        symbolSize: 5,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#bb3e48",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        data: seriesDead
      }
    ]
  };
  return option
}


// 大洲感染总人数饼状图
export function setOption5(continentStatisNow) {
  let data = []
  for (let item in continentStatisNow.statis) {
    // console.log(item);
    data.push({
      name: item,
      value: continentStatisNow.statis[item]
    })
  }
  let option = {
    color: [
      "#0696ab",
      "#065aab",
      "#066eab",
      "#0682ab",
      "#06a0ab",
      "#046270",
      "#07424b"
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      // 距离底部为0%
      bottom: "0%",
      // 小图标的宽度和高度
      itemWidth: 10,
      itemHeight: 10,
      // 因为 series 里面 的data有name了 所以这个就不用写了
      // data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
      // 修改图例组件的文字为 12px
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      //  修改内圆半径和外圆半径为  百分比是相对于容器宽度来说的
      radius: ['40%', '60%'],
      // 设置饼形图在容器中的位置
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      // 不显示连接线
      labelLine: {
        show: false
      },
      // 不显示标签文字
      label: {
        show: false,
      },

      labelLine: {
        show: false
      },
      data: data
    }]
  };
  return option
}

// 境外输入病情top10省份
export function setOption6(importStatis) {
  let data = []
  for (let item of importStatis) {
    // console.log(item);
    data.push({
      name: item.province,
      value: item.importedCase
    })
  }
  let option = {
    color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [{
      name: '境外输入并且人数',
      type: 'pie',
      radius: ['10%', '70%'],
      center: ['50%', '50%'],
      roseType: 'radius',
      data: data
    }],
    // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
    label: {
      fontSize: 10
    },
    labelLine: {
      // 连接扇形图线长
      length: 6,
      // 连接文字线长
      length2: 8
    }

  };
  return option
}

//世界疫情图
export function worldMapOption() {
  let option = {
    // 设置提示信息
    tooltip: {
      // 设置提示信息触发源
      trigger: 'item',
      // 设置提示信息格式
      formatter: function (params) {
        return params.name + " : " + (params.value ? params.value : 0);
      }
    },
    // 视觉映射组件
    visualMap: {
      // 设置映射类型：piecewise分段型、continuous连续性
      type: 'piecewise',
      pieces: [{
          max: 0,
          label: '0',
          color: '#eee'
        },
        {
          min: 1,
          max: 499,
          label: '1-499',
          color: '#fff7ba'
        },
        {
          min: 500,
          max: 4999,
          label: '500-4999',
          color: '#ffc24b'
        },
        {
          min: 5000,
          max: 9999,
          label: '5000-9999',
          color: '#ff7c20'
        },
        {
          min: 10000,
          max: 100000,
          label: '1万-10万',
          color: '#fe5e3b'
        },
        {
          min: 100000,
          max: 500000,
          label: '10万-50万',
          color: '#e2482b'
        },
        {
          min: 500000,
          label: '50万以上',
          color: '#b93e26'
        },
      ],
      itemHeight: 10,
      itemWidth: 10,
      inverse: true,
      bottom: "10%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    // 系列列表
    series: [{
      // 数据名称
      name: '',
      // 设置数据
      data: '',
      // 绘制的图表类型
      type: 'map',
      // 指定地图名称
      mapType: 'world',
      // 地区名称映射
      nameMap: '',
      // 图表所绘制区域样式
      itemStyle: {
        emphasis: {
          areaColor: '#c9ffff',
          label: {
            show: false
          }
        }
      },
      // 设置位置：保持地图高宽比的情况下把地图放在容器的正中间
      layoutCenter: ['46%', '55%'],
      // 地图缩放
      layoutSize: "90%",
    }]
  };
  return option
}

// 设置国外疫情数据
export function setForeignData(foreignList) {
  let confirmData = []
  let nowConfirmData = []
  for (let item of foreignList) {
    confirmData.push({
      name: item.name,
      value: item.confirm
    })
    nowConfirmData.push({
      name: item.name,
      value: item.nowConfirm
    })
  }
  let foreignData = {
    confirmData,
    nowConfirmData
  }
  return foreignData
}