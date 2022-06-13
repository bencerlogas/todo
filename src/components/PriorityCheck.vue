<template>
  <div class="select-none">
    <div v-if="isCardEdited" :class="{ 'bg-disabled': !isPriorityDropDownOpen }">
      <div
        class="relative rounded-2xl w-[125px] h-[33px] text-center bg-blue-200"
        :tabIndex="tabIndex"
        @click="openPriorityDropDown()"
      >
        <div
          class="flex items-center justify-between rounded-2xl w-full h-full text-white border-2 border-black"
          @click="blurCard()"
          :class="({ 'bg-enable': isPriorityDropDownOpen }, selected.color)"
        >
          <p class="mx-auto">{{ selected.priority }}</p>
          <div class="pr-[13px]">
            <ChevronDownIcon class="flex h-5 w-5 text-black" />
          </div>
        </div>
        <div
          v-if="!isPriorityDropDownOpen"
          v-click-outside="clickOutside"
          class="border-2 bg-white border-black rounded-2xl mt-4"
        >
          <div
            class="text-center"
            v-for="(dropdownList, i) in dropdownLists"
            :key="i"
            @click="showSelected(dropdownList)"
          >
            {{ dropdownList.priority }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      :class="selected.color"
      class="flex items-center justify-between w-[125px] h-[33px] rounded-2xl text-white"
    >
      <p class="mx-auto">{{ selected.priority }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/solid';
import { directive as vClickOutside } from 'click-outside-vue3';

defineProps({ isCardEdited: Boolean, onPriorityDropDownOpen: Boolean });
const emit = defineEmits(['blurComp', 'onPriorityDropDownOpen', 'sendPrio']);

const selected = ref({ priority: 'Low', color: 'bg-[#38CBCB]' });
const isPriorityDropDownOpen = ref(true);
const tabIndex = ref(0);
const dropdownLists = ref([
  { priority: 'Low', color: 'bg-[#38CBCB]' },
  { priority: 'Medium', color: 'bg-[#FFAB00]' },
  { priority: 'High', color: 'bg-[#FF481F]' },
]);

function showSelected(selectedElement) {
  blurCard();
  selected.value = selectedElement;
}

function openPriorityDropDown() {
  isPriorityDropDownOpen.value = !isPriorityDropDownOpen.value;
  emit('onPriorityDropDownOpen', isPriorityDropDownOpen.value, selected.value.priority);
}

function blurCard() {
  emit('blurComp');
}

function clickOutside() {
  blurCard();
  openPriorityDropDown();
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
