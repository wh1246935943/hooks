import { defineComponent, onMounted } from 'vue';
import { poller } from '@/utils/utils';
import moment from 'moment/moment';

import topbar_bj from '@/assets/district-level/top.png';
import locate from '@/assets/district-level/locate.png';
import weather_fine from '@/assets/village-level/weather_fine.png';

import './style.less';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    locate: {
      type: String,
      default: ''
    },
    temperature: {
      type: String,
      default: '10℃'
    },
    isBack: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {

    onMounted(() => {
      const d = {
        callback: () => {
          const ymd = moment().format('HH:mm:ss');
          document.querySelector('.time-y-m-d').innerHTML = ymd;
          poller(d)
        },
        time: 1000
      }
      poller(d)
    });

    return () => (
      <div class="top-bar">
        <img class="topbar_bj" src={topbar_bj} />
        <div class="left">
          <img src={locate} />
          <span>{props.locate}</span>
        </div>
        <div class="center">{props.title}</div>
        <div class="right">
          <span class="time-y-m-d">15:37:36</span>
          <span class="time-line"></span>
          {
            props.isBack ? (
              <span class="go-back"></span>
            ) : (
              <>
                <img class="time-w-icon" src={weather_fine} />
                <span class="time-w">{props.temperature}</span>
              </>
            )
          }
        </div>
      </div>
    )
  }
});
