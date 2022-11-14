import { defineComponent, onMounted } from 'vue';
import { poller } from '@/utils/utils';
import moment from 'moment/moment';
import { useRouter } from 'vue-router'

import topbar_bj from '@/assets/district-level/top.png';
import locate from '@/assets/district-level/locate.png';
import weather_fine from '@/assets/village-level/weather_fine.png';

import './style.less';

interface Props {
  title: string,
  locate: string,
  temperature: string,
  isBack: boolean
}

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
  setup(props: Props) {

    const router = useRouter()

    onMounted(() => {
      const d = {
        callback: () => {
          const ymd = moment().format('HH:mm:ss');
          (document.querySelector('.time-y-m-d') as HTMLElement).innerHTML = ymd;
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
              <span class="go-back" onClick={router.push.bind(null, { name: 'DistrictLevel' })}></span>
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
