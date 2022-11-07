
import { defineComponent, reactive, onMounted } from 'vue';
import Skeleton from '@/components/Skeleton';
import Card from '@/components/Card';
import Map from './Map';
import { statisticsData, videoData } from './../data';
import { initResourceStatisticsChart } from '../chart';

import './style.less';
 
export default defineComponent(() => {

  const state = reactive({
    title: '农业监控数据展示平台',
    mapType: '3D',
    isInfoBox: true
  });

  const setState = (param) => {
    Object.assign(state, param);
  }

  onMounted(() => {
    initResourceStatisticsChart()
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
              <div className="statistics-data">
                {
                  statisticsData.map((item) => {
                    return (
                      <div key={item.name} class="sd-item">
                        <div class="sdi-icon">
                          <img
                            src={new URL(`@/assets/district-level/bottom-1.png`, import.meta.url).href}
                          />
                          <img
                            src={new URL(`@/assets/district-level/area.png`, import.meta.url).href}
                          />
                        </div>
                        <div class="sdi-data">
                          {item.name}
                          <span style={{
                            color: item.color
                          }}>{item.number}</span>
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
              <div className="video-data">
                {
                  videoData.map((item, index) => {
                    return (
                      <div key={index} class="sd-item">
                        <video
                          class={`map-3d-video map-3d-video_${index}`}
                          style="width: 100%; height: 100%"
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
