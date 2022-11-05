
import { defineComponent, ref, reactive, VueElement } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

import './style.less'
 
export default defineComponent({
  props: {
    title: {
      type: [String, VueElement],
      default: '' 
    },
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, {slots}) {
   
    return () => {
      const { class: className, title } = props;
      return (
        <div class={`naisi-card ${ className }`}>
          <div class="nc-card-title">
            {
              typeof title === 'string' ? (
                <span class="nc-ct-span">{title}</span>
              ) : (
                title
              )
            }
          </div>
          <div class="nc-content">
            {slots?.default?.()}
          </div>
        </div>
      )
    }
  }
})
