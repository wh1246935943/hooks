
import { defineComponent, onMounted, onBeforeMount, reactive } from 'vue';
import axios from 'axios';
import Card from '@/components/Card';
import { initChartByInfo } from '../../chart';
import { counter } from '../../count';

import './style.less';

export default defineComponent({
  props: {
    mapType: {
      type: String,
      default: '3D'
    },
    isInfoBox: {
      type: Boolean,
      default: true
    },
    setState: {
      type: Function,
      default: () => { }
    }
  },
  setup(props) {

    const state = reactive({
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
          <div className="vlc-top-realtime-data naisi-row">
            {
              dynamicData.map((item, index) => {
                return (
                  <div className="dynamic-data-item">
                    <span
                      className={`dynamic-data-item_${index}`}
                      style={{ color: item.color }}
                    >
                    {
                      counter({
                        maxValue: item.value,
                        callBack: (current) => {
                          document.querySelector(`.dynamic-data-item_${index}`).innerHTML = current;
                        }
                      })
                    }</span>
                    <span>{item.name}</span>
                  </div>
                )
              })
            }
          </div>
          <div className="vlc-bottom naisi-row">
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
