<template>
  <div v-if="isCardEdited">
    <input
      v-model="title"
      type="title"
      placeholder="Title"
      :class="{ 'bg-disabled': isPriorityDropDownOpened }"
      class="placeholder:text-black text-2xl w-[60%]"
    />
  </div>
  <h1 v-else class="text-2xl">{{ title || 'Title' }}</h1>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  modelValue: { type: String },
  isCardEdited: { type: Boolean, default: false },
  isPriorityDropDownOpened: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);

const title = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    emit('update:modelValue', value);
  },
});
</script>

<style scoped>
.bg-disabled {
  background-color: #e3e3e3;
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
