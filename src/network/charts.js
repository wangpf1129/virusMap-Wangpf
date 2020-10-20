import {
    jsonp
} from './jsonp'

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
                console.log(foreignData);
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

//  同时获取   国外 和 中国的 数据
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


export function addChart(dom, option) {
    let myChart = echarts.init(dom);
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    return myChart;
}