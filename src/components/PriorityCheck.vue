<template>
  <div class="select-none">
    <div v-if="isCardEdited" :class="{ 'bg-disabled': isOpen }">
      <div class="relative rounded-2xl w-[125px] h-[33px] text-center" :tabIndex="0" @click="togglePriorityDropDown">
        <div
          class="flex items-center justify-between rounded-2xl w-full h-full text-white border-2 border-black"
          :class="({ 'bg-enable': isOpen }, selected.color)"
        >
          <p class="mx-auto">{{ selected.priorityText }}</p>
          <div class="pr-[13px]">
            <ChevronDownIcon class="flex h-5 w-5 text-black" />
          </div>
        </div>
        <div
          v-if="isOpen"
          v-click-outside="togglePriorityDropDown"
          class="border-2 bg-white border-black rounded-2xl mt-4"
        >
          <div
            class="text-center"
            v-for="(dropdownList, i) in dropdownLists"
            :key="i"
            @click="selectItem(dropdownList)"
          >
            {{ dropdownList.priorityText }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      :class="selected.color"
      class="flex items-center justify-between w-[125px] h-[33px] rounded-2xl text-white"
    >
      <p class="mx-auto">{{ selected.priorityText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/solid';
import { directive as vClickOutside } from 'click-outside-vue3';

const props = defineProps({
  modelValue: { type: String, default: '' },
  isOpen: { type: Boolean, default: false },
  isCardEdited: { type: Boolean, default: false },
});
const emit = defineEmits(['update:isOpen', 'update:modelValue', 'onSelectedValue']);

const dropdownLists = ref([
  { priority: 'c', priorityText: 'Low', color: 'bg-[#38CBCB]' },
  { priority: 'b', priorityText: 'Medium', color: 'bg-[#FFAB00]' },
  { priority: 'a', priorityText: 'High', color: 'bg-[#FF481F]' },
]);
const selected = computed(
  () =>
    dropdownLists.value.find((item) => item.priority.toLowerCase() === props.modelValue.toLocaleLowerCase()) ||
    dropdownLists.value[0]
);

function selectItem(selectedElement) {
  emit('update:modelValue', selectedElement.priority);
}

function togglePriorityDropDown() {
  emit('update:isOpen', !props.isOpen);
}
</script>

<style scoped>
.bg-disabled {
  background-color: #e3e3e3;
}
.bg-enable {
  background-color: white;
  filter: brightness(1);
}
</style>
