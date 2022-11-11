
import { defineComponent, onMounted } from 'vue';
import { scaleContainer } from '@/utils/utils.js'
import TopBar from '../TopBar';
import { drawDian } from './dian';

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
    },
    locate: {
      type: String,
      default: ''
    }
  },
  slots: {
    default: () => '',
  },
  setup(props, { slots }) {

    onMounted(() => {
      scaleContainer();
      window.onresize = () => {
        scaleContainer();
      };

      drawDian('#canvasDian', '.basic-container')
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
      const { title, mapType, locate } = props;
      return (
        <div class="screen-out-box">
          <div
            class="basic-container"
            style={{
              background: getImgUrl()
            }}
          >
            <div
              class="global-bg-shadow"
              style={{
                background: {
                  'GIS': 'radial-gradient(23% 45%, rgba(255, 255, 255, 0) 51%, rgb(5, 21, 37) 146%)',
                  'VIG': 'radial-gradient(closest-side, rgba(255, 255, 255, 0) 25%, rgb(5, 21, 37))',
                  '3D': 'radial-gradient(ellipse, #ffffff00 54%, #051525)',
                }[mapType]
              }}
            ></div>
            <canvas id="canvasDian" />
            <TopBar title={title} locate={locate} isBack={mapType === 'VIG'} />
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
