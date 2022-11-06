
import { defineComponent, onMounted } from 'vue';
import { pointData } from './../../data';
import Card from '@/components/Card';
import { initChartByInfo } from '../../chart';

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
      default: () => {}
    }
  },
  setup(props) {

    onMounted(() => {
      initChartByInfo('zhangshifenxi', ['2021', '2022'] )
      initChartByInfo('touruliang', ['肥料', '农药'], ['#37FFC9', '#FFE777'])
      initChartByInfo('suyuanshuju', ['溯源标签投放量', '溯源码扫码数'], ['#C2ADFF', '#00FEFF']  )
    })

    return () => {
      const { mapType, isInfoBox, setState } = props;
      return (
        <div class="vl-center">
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
