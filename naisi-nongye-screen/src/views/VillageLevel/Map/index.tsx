
import { defineComponent, onMounted, onBeforeMount, reactive, VueElement, type StyleValue } from 'vue';
import axios from 'axios';
import Card from '@/components/Card';
import { initChartByInfo } from '../../chart';
import { counter } from '../../count';

import './style.less';

interface DynamicDataItem {
  value: number;
  [key: string]: any;
};

interface State {
  dynamicData: DynamicDataItem[]
};

export default defineComponent({
  setup() {
    const state = reactive<State>({
      dynamicData: []
    });

    onBeforeMount(async () => {
      const resp = await axios.get('src/views/data.json');
      state.dynamicData = resp.data.list
    })

    onMounted(() => {
      initChartByInfo('zhangshifenxi', ['2021', '2022'])
      initChartByInfo('touruliang', ['肥料', '农药'], ['#37FFC9', '#FFE777'])
      initChartByInfo('suyuanshuju', ['溯源标签投放量', '溯源码扫码数'], ['#C2ADFF', '#00FEFF'])
    });

    return () => {
      const { dynamicData } = state;
      return (
        <div class="vl-center">
          <div class="vlc-top-realtime-data naisi-row">
            {
              dynamicData.map((item, index) => {
                return (
                  <div class="dynamic-data-item">
                    <span
                      class={`dynamic-data-item_${index}`}
                      style={{ color: item.color }}
                    >
                    {
                      counter({
                        maxValue: item.value,
                        callBack: (current) => {
                          const itemElement = document.querySelector(`.dynamic-data-item_${index}`)
                          if (itemElement instanceof Element) itemElement.innerHTML = `${current}`;
                        }
                      })
                    }</span>
                    <span>{item.name}</span>
                  </div>
                )
              })
            }
          </div>
          <div class="vlc-bottom naisi-row">
            <Card title="涨势分析">
              <div id="zhangshifenxi" />
            </Card>
            <Card title="投入品用量">
              <div id="touruliang" />
            </Card>
            <Card title="溯源数据">
              <div id="suyuanshuju" />
            </Card>
          </div>
        </div>
      )
    }
  }
})
