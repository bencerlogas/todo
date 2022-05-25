<template>
  <div class="flex flex-col gap-y-12 px-[16px] pt-[16px] max-w-[610px] m-auto desktop:mt-36 desktop:mb-36">
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
  components: {
    TodoList,
  },
  setup() {},
};
</script>
