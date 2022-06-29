<template>
  <textarea
    spellcheck="false"
    oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
    v-if="isCardEdited"
    class="w-[60%] h-max text-black overflow-hidden text-opacity-1 placeholder:text-black mb-4 mt-1 resize-none"
    v-model="text"
    type="cardtext"
    placeholder="Cras placerat proin.  consectetur adipiscing elit. Felis nunc ullamcorper risus sed et velit pulvi"
    :class="{ 'bg-disabled': isPriorityDropDownOpened }"
  />
  <h3 v-else class="text-slate-500 select-none line-clamp-1 w-60 h-6">
    {{ text || 'Cras placerat proin.  onsectetur adipiscing elit. Felis nunc ullamcorper risus sed et velit pulvi' }}
  </h3>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  modelValue: { type: String, default: '' },
  isCardEdited: { type: Boolean, default: false },
  isPriorityDropDownOpened: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);

const text = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    emit('update:modelValue', value);
  },
});
</script>
