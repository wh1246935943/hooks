
import { defineComponent, ref, reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
 
export default defineComponent(() => {
  const state = ref(300);
  let { count } = reactive({ count: 0 })

  const onClick = () => {
    state.value++;
    count++
    console.log(state.value)
  };

  console.log('console.123')
 
  return () => {
    return <>
      <p
        v-click-outside={onClick}
      >
        {state.value}
      </p>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      {count}
    </>
  }
})
