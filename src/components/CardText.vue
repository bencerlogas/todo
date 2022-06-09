<template>
  <div v-if="isEdited">
    <input
      maxlength="100"
      v-model="text"
      type="cardtext"
      placeholder="Text"
      :class="{ 'bg-disabled': priorityCheckClicked }"
    />
  </div>
  <div v-else>
    <div v-if="!text">
      <h3 class="text-slate-500 break-all">Cras placerat proin</h3>
    </div>
    <div v-else>{{ text }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({ isEdited: Boolean, priorityCheckClicked: Boolean });
const text = ref('');
</script>

<style scoped>
.bg-disabled {
  background-color: #e3e3e3;
}
</style>
