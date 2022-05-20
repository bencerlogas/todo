<template>
<div class="flex content-center align-top">
<div class="flex flex-row-space-between">
  <button class="rounded-full bg-green-50 text-white w-6 h-6 font-thin">+</button>
  <h1 class="text-black">To do list</h1>
</div>
<div>
<TodoList/>
</div>
</div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>

</style>
