
import { defineComponent, reactive, onMounted } from 'vue';
import Skeleton from '@/components/Skeleton';
import Card from '@/components/Card';
import Map from './Map';
import { abnormalData, videoData, greenFangkongData, weatherData, realtimeMonitor } from './../data';
import { initPlantingScale } from '../chart';

import './style.less';
 
export default defineComponent(() => {

  const state = reactive({
    title: '农业监控数据展示平台',
    mapType: 'VIG',
    isInfoBox: true
  });

  const setState = (param) => {
    Object.assign(state, param);
  }

  const getImageUrl = (name) => {
    return new URL(`../../assets/village-level/${name}.png`, import.meta.url).href
  }

  onMounted(() => {
    initPlantingScale()
  })
 
  return () => {
    const { title, mapType, isInfoBox } = state;

    return (
      <Skeleton title={title} mapType={mapType}>
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
            <Card title="异常监测" style="margin-top: 30px;">
              <div className="abnormal-data">
                {
                  abnormalData.map((item) => {
                    return (
                      <div key={item.id} class="naisi-row">
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
            </Card>
            <Card title="绿色防控" style="margin-top: 30px;">
              <div className="green-fangkong naisi-row">
                <div class="naisi-col-5 gf-icon">
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
                <div class="naisi-col-7">
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
                          <div class="naisi-col-6">
                            {item.title}
                          </div>
                          <div class="naisi-col-4" style={{color: item.color}}>
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
              <div className="planting-scale">
                <div className="naisi-row-sa">
                  <div className="naisi-col-5">
                    园区总面积<span>2456</span>㎡
                  </div>
                  <div className="naisi-col-5">
                    农作物类型<span>2456</span>种
                  </div>
                </div>
                <div className="ps-chart">

                </div>
              </div>
            </Card>
          </div>
          <Map
            mapType={mapType}
            isInfoBox={isInfoBox}
            setState={setState}
          />
          <div class="dl-right">
            <Card title="天气预报">
              <div class="weather-forecast naisi-row">
                {
                  weatherData.map((item) => {
                    return (
                      <div className="weather-data-item">
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
                      <div className="weather-data-item">
                        <div class="wdi-icon">
                          <img src={getImageUrl('bottom')} />
                          <img className="position-center" src={getImageUrl(item.icon)} />
                        </div>
                        <div className="wdi-value">
                          {item.name}<span style={{color: item.color}}>{item.value}</span>{item.unit}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </Card>
            <Card title="监控视频" style="margin-top: 30px">
              <div className="video-data">
                {
                  videoData.slice(0, 4).map((item, index) => {
                    return (
                      <div key={index} class="sd-item">
                        <video
                          class={`map-3d-video map-3d-video_${index}`}
                          style="width: 100%; height: 100%;transform: scale(1.58, 0.99);"
                          src={item.src}
                          onPause={() => {
                            const icon = document.querySelector(`.play-icon_${index}`);
                            icon.style.display = ''
                          }}
                          onPlay={() => {
                            const icon = document.querySelector(`.play-icon_${index}`);
                            const preview = document.querySelector(`.preview-img_${index}`);
                            icon.style.display = 'none';
                            preview.style.display = 'none'
                          }}
                          onClick={(e) => {
                            const video = document.querySelector(`.map-3d-video_${index}`);
                            if (video.paused) return;
                            video.pause();
                          }}
                        />
                        <img
                          class={`position-center play-icon_${index}`}
                          src={new URL(`@/assets/district-level/broadcast.png`, import.meta.url).href}
                          onClick={(e) => {
                            const video = document.querySelector(`.map-3d-video_${index}`);
                            if (!video?.paused) return;
                            video.play();
                          }}
                        />
                        <img
                          class={`preview-img preview-img_${index}`}
                          src={new URL(`@/assets/village-level/pic-3.png`, import.meta.url).href}
                        />
                        <div className="info-bar">
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
      </Skeleton>
    )
  }
})
