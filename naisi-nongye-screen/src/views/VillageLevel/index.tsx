
import { defineComponent, reactive, onMounted, watchEffect, VueElement } from 'vue';
import Skeleton from '@/components/Skeleton';
import Card from '@/components/Card';
import Map from './Map';
import { abnormalData, videoData, greenFangkongData, weatherData, realtimeMonitor } from './../data';
import { initPlantingScale } from '../chart';
import { setRollEffect } from '@/utils/utils'

import './style.less';

interface AbnormalItem {
  [key: string]: string
}

interface State {
  title?: string,
  mapType?: MapType,
  isInfoBox?: boolean,
  abnormalItem: AbnormalItem | null
}

export default defineComponent(() => {

  const state = reactive<State>({
    title: '农业监控数据展示平台',
    mapType: 'VIG',
    isInfoBox: true,
    abnormalItem: null
  });


  const setState = (param: State) => {
    if (param.hasOwnProperty('abnormalItem') && !param.abnormalItem) {
      showBoxAnimation('hide')
      setTimeout(() => {
        Object.assign(state, param);
      }, 300);
      return
    }
    Object.assign(state, param);
  }

  const getImageUrl = (name: string) => {
    return new URL(`../../assets/village-level/${name}.png`, import.meta.url).href
  }
  /**
   * 这里通过事件委托的方式添加点击事件
   * 因为vue在事件绑定是是正对单个元素绑定的，
   * 在列表的滚动效果实现时会对元素拷贝，
   * 此时点击新拷贝的元素点击事件将会消失
   */
  const openAbnormalBox = (e: Event) => {
    e.stopPropagation();
    const { children } = e.currentTarget as VueElement ;
    const item = Array.from(children).find((item) => item.contains(e.target as Node)) as HTMLElement;

    if (!(item instanceof HTMLElement)) return;

    setState({ abnormalItem: abnormalData[item.dataset.index as unknown as number] })
  };
  /**
   * 告警信息弹出关闭动画
   */
  const showBoxAnimation = (type: 'show' | 'hide') => {
    const box = document.querySelector('.message-info-modal') as VueElement;
    if (!box) return;
    box.style.top = '500px';
    box.style.left = '377px';
    box.style.transform = 'scale(0.1)';
    box.style.opacity = '0.1';

    function loop<T extends number>(top: T): void {
      window.requestAnimationFrame(() => {
        box.style.top = `${top}px`;
        if (top > 300) loop(top - 10)
      })
    };
    loop(500);

    if (type === 'show') {
      box.clientHeight;
      box.style.top = '319px';
      box.style.left = '586px';
      box.style.transform = 'scale(1) ';
      box.style.opacity = '1';
    }
  };
  /**
   * 监听某个状态的改变
   */
  watchEffect((onInvalidate)=>{
    state.abnormalItem
    showBoxAnimation('show')
    /**
     * 当组件失效，watchEffect被主动停止或者副作用即将重新执行时，这个函数会执行
     */
    onInvalidate(()=>{})
  },{
    /**
     * post: 在组件更新后触发，这样你就可以访问更新的 DOM。
     * pre: 默认值，在组件更新前触发
     * sync: 同步触发，低效
     */
    flush: 'post'
  });

  onMounted(() => {
    initPlantingScale();
    setTimeout(() => {
      setRollEffect({
        key: '.abnormal-data-key',
        content: '.abnormal-data > div',
        paused: true
      })
    }, 1000);
  })

  return () => {
    const { title, mapType, isInfoBox, abnormalItem } = state;

    return (
      <Skeleton title={title} mapType={mapType} locate="淮南市 孔店乡 安塘村">
        <div class="district-level">
          <div class="dl-left">
            <Card title="安塘村简介">
              <div class="naisi-row">
                <img
                  class="naisi-col-5"
                  style="height: 195px"
                  src={new URL(`@/assets/district-level/pic-1.jpg`, import.meta.url).href}
                />
                <span class="text-indent naisi-col-6">
                  孔店乡悠久的历史，深厚的文化积淀，留下了砂江坝商代遗址、钱鑫提督府遗址、刘备打草鞋、老虎洞等诸多人文景观，资源优势没有得到充分利用，发展潜力很大。
                </span>
              </div>
            </Card>
            <Card title="异常监测" style="margin-top: 30px;" class="abnormal-data-key">
              <div class="abnormal-data">
                <div onClick={openAbnormalBox}>
                  {
                    abnormalData.map((item, index) => {
                      return (
                        <div
                          key={item.id}
                          class="naisi-row"
                          data-index={index}
                        >
                          <div class="naisi-col-1">
                            <img
                              style="width: 21px;height: 21px"
                              src={getImageUrl(item.type)}
                            />
                          </div>
                          <div class="naisi-col-8">
                            {item.content}
                          </div>
                          <div class="naisi-col-4">
                            {item.time}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Card>
            <Card title="绿色防控" style="margin-top: 30px;">
              <div class="green-fangkong naisi-row">
                <div class="naisi-col-6 gf-icon">
                  <img
                    src={getImageUrl('insect-bj1')}
                  />
                  <img
                    src={getImageUrl('insect-bj')}
                  />
                  <img
                    src={getImageUrl('insect')}
                  />
                </div>
                <div class="naisi-col-6">
                  {
                    greenFangkongData.map((item) => {
                      return (
                        <div key={item.title} class="naisi-row">
                          <div class="naisi-col-1">
                            <span
                              style={{
                                background: item.color,
                                borderRadius: '50%',
                                width: '10px',
                                height: '10px',
                                display: 'block',
                                transform: 'translateY(12px)'
                              }}
                            />
                          </div>
                          <div class="naisi-col-5" style="font-size: 17px">
                            {item.title}
                          </div>
                          <div class="naisi-col-4" style={{ color: item.color }}>
                            {item.value}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Card>
            <Card title="种植规模" style="margin-top: 30px;">
              <div class="planting-scale">
                <div class="naisi-row-sa">
                  <div class="naisi-col-5">
                    园区总面积<span>2456</span>㎡
                  </div>
                  <div class="naisi-col-5">
                    农作物类型<span>2456</span>种
                  </div>
                </div>
                <div class="ps-chart">

                </div>
              </div>
            </Card>
          </div>
          <Map />
          <div class="dl-right">
            <Card title="天气预报">
              <div class="weather-forecast naisi-row">
                {
                  weatherData.map((item) => {
                    return (
                      <div class="weather-data-item">
                        <span>{item.desc}</span>
                        <span>{item.date}</span>
                        <img src={getImageUrl(item.icon)} />
                        <span>{item.state}</span>
                        <span>{item.temp}{item.unit}</span>
                      </div>
                    )
                  })
                }
              </div>
            </Card>
            <Card title="环境实时监测" style="margin-top: 20px">
              <div class="realtime-monitor">
                {
                  realtimeMonitor.map((item) => {
                    return (
                      <div class="weather-data-item">
                        <div class="wdi-icon">
                          <img src={getImageUrl('bottom')} />
                          <img
                            class="position-center"
                            src={getImageUrl(item.icon)}
                          />
                        </div>
                        <div class="wdi-value">
                          {item.name}
                          <span
                            style={{ color: item.color }}
                          >
                            {item.value}
                          </span>
                          {item.unit}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </Card>
            <Card title="监控视频" style="margin-top: 30px">
              <div class="video-data">
                {
                  videoData.slice(0, 4).map((item, index) => {
                    return (
                      <div key={index} class="sd-item">
                        <video
                          class={`map-3d-video map-3d-video_${index}`}
                          style="width: 100%; height: 100%;transform: scale(1.58, 1)"
                          src={item.src}
                          onPause={() => {
                            const icon = document.querySelector(`.play-icon_${index}`) as VueElement;
                            icon.style.display = ''
                          }}
                          onPlay={() => {
                            const icon = document.querySelector(`.play-icon_${index}`) as VueElement;
                            const preview = document.querySelector(`.preview-img_${index}`) as VueElement;
                            icon.style.display = 'none';
                            preview.style.display = 'none'
                          }}
                          onClick={(e) => {
                            const video = document.querySelector(`.map-3d-video_${index}`) as HTMLAudioElement;
                            if (video.paused) return;
                            video.pause();
                          }}
                        />
                        <img
                          class={`position-center play-icon_${index}`}
                          src={new URL(`@/assets/district-level/broadcast.png`, import.meta.url).href}
                          onClick={(e) => {
                            const video = document.querySelector(`.map-3d-video_${index}`) as HTMLAudioElement;
                            if (!video?.paused) return;
                            video.play();
                          }}
                        />
                        <img
                          class={`preview-img preview-img_${index}`}
                          src={new URL(`@/assets/village-level/pic-3.png`, import.meta.url).href}
                        />
                        <div class="info-bar">
                          <img
                            src={new URL(`@/assets/district-level/monitor.png`, import.meta.url).href}
                          />
                          <span>{item.value}</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </Card>
          </div>
        </div>
        {
          !!abnormalItem && (
            <div
              v-click-outside={setState.bind(null, { abnormalItem: null })}
              class="message-info-modal"
            >
              <i
                class="mim-close"
                onClick={setState.bind(null, { abnormalItem: null })}
              />
              <div class="mim-title">异常报警</div>
              <div class="mim-content">
                <div class="mimc-item" data-label="设备编号:"><div>{abnormalItem.number}</div></div>
                <div class="mimc-item" data-label="报警事件:"><div>{abnormalItem.time}</div></div>
                <div class="mimc-item" data-label="报警位置:"><div>淮南市孔店乡安塘村</div></div>
                <div class="mimc-item" data-label="设备状态:"><div>温度过高</div></div>
                <div class="mimc-item" data-label="详情信息:"><div>温度过高温度过高温度过高温度过高温度过高温度过高温度过高温度过高温度</div></div>
              </div>
            </div>
          )
        }
      </Skeleton>
    )
  }
})
