import React,{ useState } from "react";
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'

const Line = () => {
    const [emailTraffic, setEmailTraffic] = useState([120, 132, 101, 134, 90, 230, 210])
    const [dirTraffic, setDirTraffic] = useState([320, 332, 301, 334, 390, 330, 320])

    const update = () => {
        const email = emailTraffic.map( value => value+5 )
        const dir = dirTraffic.map( value => value+5 )
        setEmailTraffic(email)
        setDirTraffic(dir)
    }
    const getOption = () => {
        return {
            title: {
                text: 'Website traffic statistic'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: emailTraffic
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: dirTraffic
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {},
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
    }
    return (
        <div>
            <Card>
                <Button type='primary' onClick={update}>Update</Button>
            </Card>
            <Card>
                <ReactEcharts option={getOption()} style={{ height: 300 }} />
            </Card>
        </div>
    )
}

export default Line;