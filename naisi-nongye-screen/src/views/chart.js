import * as echarts from 'echarts';
/**
 * 3D和GIS页面的右上角的图表
 */
export function initResourceStatisticsChart() {
  const military_statistics = echarts.init(document.getElementById('military-statistics'));
  // 绘制图表
  const military_statistics_data1 = [155, 340, 250, 345, 240, 135, 325, 155, 340, 250, 345, 240,];
  const military_statistics_data2 = [135, 325, 155, 340, 250, 345, 240, 135, 325, 155, 340, 250,];
  const military_statistics_data3 = [345, 240, 135, 325, 155, 340, 250, 345, 240, 135, 325, 155];
  var fontColor = "#91CCFF";
  var option = {
    grid: {
      left: "0",
      right: "20",
      top: 40,
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
      y: 0,
      icon: "stack",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 50,
      textStyle: {
        color: "#91CCFF",
        fontSize: 17
      },
      data: ["耕地面积", "林地面积", "水域面积"],
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          color: fontColor,
          fontSize: 17
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
          // "刘庄村",
          "沿村"
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 400,
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: fontColor,
            fontSize: 14
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
  const military_statistics_data1 = [155, 370, 250, 345, 240, 135, 325, 155, 370, 250, 345, 240,];
  const military_statistics_data2 = [135, 325, 155, 370, 250, 345, 240, 135, 325, 155, 370, 250,];
  const military_statistics_data3 = [345, 240, 135, 325, 155, 370, 250, 345, 240, 135, 325, 155];
  var fontColor = "#91CCFF";
  var option = {
    color,
    grid: {
      left: "0",
      right: "20",
      top: 40,
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
        fontSize: 17
      },
      data: legendData,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          color: fontColor,
          fontSize: 17
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
        max: 400,
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: fontColor,
            fontSize: 14
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

export function initPlantingScale() {
  const chart1 = echarts.init(document.querySelector('.ps-chart'));
  chart1.setOption({
    title: {
      show: true,
      text: '农作物' + '\n' + '类型',
      textStyle: {
        color: 'rgba(145, 204, 255, 1)',
        fontSize: 17,
        lineHeight: 24
      },
      textAlign: 'center',
      textVerticalAlign: 'center',
      left: '28.5%',
      top: '47%',
    },
    grid: {
      left: "0",
      right: "0",
      top: "0",
      bottom: "0",
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      selectedMode: false,
      orient: 'vertical',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 25,
      type: 'scroll',
      right: '15%',
      top: 'center',
      // padding: [10, 0],
      textStyle: {
        fontSize: 17,
        color: 'rgba(145, 204, 255, 1)',
      },
      data: ['农作物类型1', '农作物类型2', '农作物类型3', '农作物类型4'],
    },
    series: [
      {
        name: '',
        type: 'pie',
        hoverAnimation: false,
        legendHoverLink: false,
        cursor: 'default',
        radius: ['52%', '70%'],
        center: ['30%', '50%'],
        color: [
          'rgba(255, 231, 119, 0.2)',
          'rgba(90, 175, 255, 0.2)',
          'rgba(55, 255, 201, 0.2)',
          'rgba(0, 132, 255, 0.2)',
          'rgba(25, 214, 255, 0.2)',
        ],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },

        tooltip: {
          show: false,
        },

        zlevel: 1,
        itemStyle: {
          normal: {
            show: false,
          },
          ellipsis: {
            show: false,
          },
        },

        data: [
          {
            value: 20,
            name: '',
          },
          {
            value: 20,
            name: '',
          },
          {
            value: 20,
            name: '',
          },
          {
            value: 20,
            name: '',
          },
          {
            value: 20,
            name: '',
          },
        ],
      },
      {
        name: '',
        type: 'pie',
        zlevel: 2,
        cursor: 'default',
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ['57%', '70%'],
        center: ['30%', '50%'],
        color: [
          'rgba(255, 231, 119, 0.5)',
          'rgba(90, 175, 255, 0.5)',
          'rgba(55, 255, 201, 0.5)',
          'rgba(0, 132, 255, 0.5)',
          'rgba(25, 214, 255, 0.5)',
        ],
        labelLine: {
          show: false,
        },
        itemStyle: {
          normal: {
            borderColor: '#0a1a2a',
          },
          ellipsis: {
            borderColor: '#0a1a2a',
          },
        },
        tooltip: {
          show: false,
        },
        data: [
          {
            value: 20,
            name: '',
          },
          {
            value: 20,
            name: '',
          },
          {
            value: 20,
            name: '',
          },
          {
            value: 20,
            name: '',
          }
        ],
      },
      {
        name: '农作物类型',
        type: 'pie',
        zlevel: 3,
        radius: ['70%', '80%'],
        center: ['30%', '50%'],
        color: ['rgba(255, 231, 119, 1)',
          'rgba(90, 175, 255, 1)',
          'rgba(55, 255, 201, 1)',
          'rgba(0, 132, 255, 1)',
          'rgba(25, 214, 255, 1)',],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          shadowBlur: 17,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          borderColor: '#0a1a2a',
        },
        data: [
          {
            value: 20,
            name: '农作物类型1',
          },
          {
            value: 20,
            name: '农作物类型2',
          },
          {
            value: 20,
            name: '农作物类型3',
          },
          {
            value: 20,
            name: '农作物类型4',
          }
        ],
      },
    ],
  });
}