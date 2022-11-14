
import { defineComponent, reactive, onMounted, nextTick } from 'vue';
import Skeleton from '@/components/Skeleton';
import Card from '@/components/Card';
import Map from './Map';
import { counter } from '../count';
import { statisticsData, videoData } from './../data';
import { initResourceStatisticsChart } from '../chart';

import './style.less';

export default defineComponent({
  props: {},
  setup() {

    interface State{
      mapType: MapType,
      title: string,
      isInfoBox: boolean
    };

    const state = reactive<State>({
      title: '农业监控数据展示平台',
      mapType: '3D',
      isInfoBox: false
    });
  
    const setState = (param: State) => {
      Object.assign(state, param);
    }
  
    onMounted(() => {
      initResourceStatisticsChart();
      statisticsData.forEach((item, index) => {
        counter({
          maxValue: item.number,
          countSize: parseInt((Math.random() * (1000 - 400 + 1) + 100).toString()),
          startValue: 0,
          callBack: (current) => {
            // nextTick(() => {
              (document.querySelector(`.sdid-value_${index}`) as HTMLElement).innerHTML = current as unknown as string;
            // })
          }
        })
      })
    })
  
    return () => {
      const { title, mapType, isInfoBox } = state;
  
      return (
        <Skeleton title={title} mapType={mapType} locate="淮南市 孔店乡">
          <div class="district-level">
            <div class="dl-left">
              <Card title="孔店乡简介">
                <img
                  style="width: 100%;height: 245px"
                  src={new URL(`@/assets/district-level/pic-1.jpg`, import.meta.url).href}
                />
                <span class="text-indent">
                  孔店乡悠久的历史，深厚的文化积淀，留下了砂江坝商代遗址、钱鑫提督府遗址、刘备打草鞋、老虎洞等诸多人文景观，资源优势没有得到充分利用，发展潜力很大。
                </span>
              </Card>
              <Card title="数据统计" style="margin-top: 40px;height: 57%;">
                <div class="statistics-data">
                  {
                    statisticsData.map((item, index) => {
                      return (
                        <div key={item.name} class="sd-item">
                          <div class="sdi-icon">
                            <img
                              src={new URL(`@/assets/district-level/bottom-1.png`, import.meta.url).href}
                            />
                            <img
                              src={new URL(`../../assets/district-level/${item.icon}.png`, import.meta.url).href}
                            />
                          </div>
                          <div class="sdi-data">
                            <span>{item.name}</span>
                            <span
                              style={{color: item.color}}
                              class={`sdid-value_${index}`}
                            >
                              0
                            </span>
                            {item.unit}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </Card>
            </div>
            <Map
              mapType={mapType}
              isInfoBox={isInfoBox}
              setState={setState}
            />
            <div class="dl-right">
              <Card title="土地资源统计" style="width: 100%;height: 416px">
                <div
                  id="military-statistics"
                  style="width: 100%;height: 100%"
                />
              </Card>
              <Card title="监控视频" style="margin-top: 40px;height: 57%;">
                <div class="video-data">
                  {
                    videoData.map((item, index) => {
                      return (
                        <div key={index} class="sd-item">
                          <video
                            class={`map-3d-video map-3d-video_${index}`}
                            style="width: 100%; height: 100%"
                            src={item.src}
                            onPause={() => {
                              const icon = document.querySelector(`.play-icon_${index}`) as HTMLElement;
                              icon.style.display = ''
                            }}
                            onPlay={() => {
                              const icon = document.querySelector(`.play-icon_${index}`) as HTMLElement;
                              const preview = document.querySelector(`.preview-img_${index}`) as HTMLImageElement;
                              icon.style.display = 'none';
                              preview.style.display = 'none'
                            }}
                            onClick={(e) => {
                              const video = document.querySelector(`.map-3d-video_${index}`) as HTMLVideoElement;
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
        </Skeleton>
      )
    }
  }
})
