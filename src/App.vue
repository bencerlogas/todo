<template>
  <div class="flex flex-col gap-y-12 px-[16px] pt-[16px] max-w-[610px] m-auto desktop:mt-36">
    <div class="flex justify-between">
      <h1 class="text-black font-bold">To do list</h1>
      <button class="rounded-full bg-green-50 text-white w-6 h-6 font-thin">+</button>
    </div>
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
};
</script>

<style></style>
