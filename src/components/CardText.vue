<template>
  <div v-if="isCardEdited">
    <input
      maxlength="100"
      v-model="text"
      type="cardtext"
      :placeholder="placeholderText"
      :class="{ 'bg-disabled': isPriorityDropDownOpened }"
    />
  </div>
  <div v-else>
    <div v-if="!text">
      <h3 class="text-slate-500 break-all">{{ placeholderText }}</h3>
    </div>
    <p v-else>{{ text }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({ isCardEdited: Boolean, isPriorityDropDownOpened: Boolean });
const text = ref('');
const placeholderText = ref('Description here');
</script>

<style scoped>
.bg-disabled {
  background-color: #e3e3e3;
}
</style>
