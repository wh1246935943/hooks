<script setup lang="ts">

  import type { VueElement } from 'vue';
  import { ref } from 'vue';

  const msg = ref('点我试试');
  
  const onClickOutside = (type: string, e: Event, el: VueElement, arg: string) => {

    console.log(type, e, el, arg)

    if (type === 'self') {
      el.style.color = 'red'
    } else {
      el.style.color = ''
    }
  }
  
  </script>

<template>
  <div>
    <h1 v-click-outside:[msg].delay="onClickOutside" class="green">{{ msg }}</h1>

    <h1 v-click-outside="onClickOutside" class="default">再试试我</h1>
  </div>
</template>

<style scoped>
  h1{
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
    display: inline-block;
    cursor: pointer;
    user-select: none;
    margin-right: 20px;
    border: 1px solid #0600ff;
  }
  .green{
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
  }

</style>
