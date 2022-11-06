
import { defineComponent, ref, reactive, onMounted, defineProps, render } from 'vue';
import { scaleContainer } from '@/utils/utils.js'
import TopBar from '../TopBar';

import './style.less'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '测试'
    },
    mapType: {
      type: String,
      default: '3D'
    }
  },
  slots: {
    default: () => '',
  },
  setup(props, {slots}) {

    onMounted(() => {
      scaleContainer();
      window.onresize = () => {
        scaleContainer();
      };
    });

    const getImgUrl = () => {
      const urls = {
        '3D': `url(${new URL('@/assets/district-level/bj-1-1.jpg', import.meta.url).href})`,
        'GIS': `url(${new URL('@/assets/district-level/bj-1-2.jpg', import.meta.url).href})`,
        'VIG': `url(${new URL('@/assets/village-level/pic-4.png', import.meta.url).href})`
      };
      return urls[props.mapType]
    };
   
    return () => {
      const { title } = props;
      return (
        <div class="screen-out-box">
          <div
            class="basic-container"
            style={{
              background: getImgUrl()
            }}
          >
            <div class="global-bg-shadow"></div>
            <TopBar title={title} locate="淮南市 孔店乡" />
            <div class="content">
              {slots?.default?.()}
            </div>
            <div className="bottom-under-img"></div>
          </div>
        </div>
      )
    }
  },
})
