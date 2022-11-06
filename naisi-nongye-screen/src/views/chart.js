import * as echarts from 'echarts';
/**
 * 3D和GIS页面的右上角的图表
 */
export function initResourceStatisticsChart() {
  const military_statistics = echarts.init(document.getElementById('military-statistics'));
  // 绘制图表
  const military_statistics_data1 = [155, 425, 250, 345, 240, 135, 325, 155, 425, 250, 345, 240,];
  const military_statistics_data2 = [135, 325, 155, 425, 250, 345, 240, 135, 325, 155, 425, 250,];
  const military_statistics_data3 = [345, 240, 135, 325, 155, 425, 250, 345, 240, 135, 325, 155];
  var fontColor = "#91CCFF";
  var option = {
    grid: {
      left: "0",
      right: "20",
      top: "5%",
      bottom: "5%",
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: "item",
    },
    legend: {
      show: true,
      x: "center",
      y: "0",
      icon: "stack",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 50,
      textStyle: {
        color: "#91CCFF",
      },
      data: ["耕地面积", "林地面积", "水域面积"],
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          color: fontColor,
          fontSize: "14px"
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#397cbc",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "#195384",
          },
        },
        data: [
          "安塘村",
          "松林村",
          "马场村",
          "欢灯村",
          "孔店村",
          "刘庄村",
          "沿村"
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 500,
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: fontColor,
          },
        },
        axisLine: {
          lineStyle: {
            color: "#27b4c2",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#11366e",
            opacity: 0.5,
            type: 'dashed',
          },
        },
      },
    ],
    series: [
      {
        name: "耕地面积",
        type: "line",
        symbol: "circle",
        symbolSize: 8,
        smooth: true,
  
        itemStyle: {
          normal: {
            color: "#0092f6",
            lineStyle: {
              color: "#0092f6",
              width: 1,
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(7,44,90,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(0,146,246,0.9)",
                },
              ]),
            },
          },
        },
        markPoint: {
          itemStyle: {
            normal: {
              color: "red",
            },
          },
        },
        data: military_statistics_data1,
      },
      {
        name: "林地面积",
        smooth: true,
        type: "line",
  
        symbol: "circle",
        symbolSize: 8,
  
        itemStyle: {
          normal: {
            color: "#00d4c7",
            lineStyle: {
              color: "#00d4c7",
              width: 1,
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(7,44,90,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(0,212,199,0.9)",
                },
              ]),
            },
          },
        },
        data: military_statistics_data2,
      },
      {
        name: "水域面积",
        type: "line",
  
        symbol: "circle",
        symbolSize: 8,
        smooth: true,
        itemStyle: {
          normal: {
            color: "#aecb56",
            lineStyle: {
              color: "#aecb56",
              width: 1,
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(7,44,90,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(114,144,89,0.9)",
                },
              ]),
            },
          },
        },
        data: military_statistics_data3,
      },
    ],
  };
  
  military_statistics.setOption(option);
}
/**
 * 孔店村页面底部中间三个
 */
 export function initChartByInfo(selector, legendData, color = []) {
  const military_statistics = echarts.init(document.getElementById(selector));
  // 绘制图表
  const military_statistics_data1 = [155, 425, 250, 345, 240, 135, 325, 155, 425, 250, 345, 240,];
  const military_statistics_data2 = [135, 325, 155, 425, 250, 345, 240, 135, 325, 155, 425, 250,];
  const military_statistics_data3 = [345, 240, 135, 325, 155, 425, 250, 345, 240, 135, 325, 155];
  var fontColor = "#91CCFF";
  var option = {
    color,
    grid: {
      left: "0",
      right: "20",
      top: "5%",
      bottom: "5%",
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: "item",
    },
    legend: {
      show: true,
      x: "center",
      y: "0",
      icon: "stack",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 60,
      textStyle: {
        color: "#91CCFF",
      },
      data: legendData,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          color: fontColor,
          fontSize: "14px"
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#397cbc",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "#195384",
          },
        },
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 500,
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: fontColor,
          },
        },
        axisLine: {
          lineStyle: {
            color: "#27b4c2",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#11366e",
            opacity: 0.5,
            type: 'dashed',
          },
        },
      },
    ],
    series: [
      {
        name: legendData[0],
        type: "line",
        symbol: "circle",
        symbolSize: 8,
        smooth: true,
  
        itemStyle: {
          normal: {
            color: "#0092f6",
            lineStyle: {
              color: "#0092f6",
              width: 1,
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(7,44,90,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(0,146,246,0.9)",
                },
              ]),
            },
          },
        },
        markPoint: {
          itemStyle: {
            normal: {
              color: "red",
            },
          },
        },
        data: military_statistics_data1,
      },
      {
        name: legendData[1],
        type: "line",
  
        symbol: "circle",
        symbolSize: 8,
        smooth: true,
        itemStyle: {
          normal: {
            color: "#aecb56",
            lineStyle: {
              color: "#aecb56",
              width: 1,
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(7,44,90,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(114,144,89,0.9)",
                },
              ]),
            },
          },
        },
        data: military_statistics_data3,
      },
    ],
  };
  
  military_statistics.setOption(option);
}