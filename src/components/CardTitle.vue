<template>
  <div v-if="isCardEdited">
    <input v-model="title" type="title" placeholder="Title" :class="{ 'bg-disabled': isPriorityDropDownOpened }" />
  </div>
  <div v-else>
    <div v-if="!title">
      <h2>Title</h2>
    </div>
    <div v-else>{{ title }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({ isCardEdited: Boolean, isPriorityDropDownOpened: Boolean });
const title = ref('');
</script>

<style scoped>
.bg-disabled {
  background-color: #e3e3e3;
}
</style>
