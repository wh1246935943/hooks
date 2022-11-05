
import { defineComponent, reactive, onMounted } from 'vue';
import Skeleton from '@/components/Skeleton';
import Card from '@/components/Card';
import Map from './Map';
import { statisticsData } from './../data';

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
    //...
  })
 
  return () => {
    const { title, mapType, isInfoBox } = state;

    return (
      <Skeleton title={title} mapType={mapType}>
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
          <div class="dl-right"></div>
        </div>
      </Skeleton>
    )
  }
})
