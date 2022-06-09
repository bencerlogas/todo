<template>
  <div v-if="isEdited" :class="{ 'bg-disabled': !isPriorityCheckClicked }">
    <div
      class="relative rounded-2xl w-[125px] h-[33px] text-center bg-blue-200"
      :tabindex="tabindex"
      @click="openDropdown()"
    >
      <div
        class="flex items-center justify-between rounded-2xl w-full h-full text-white border-2 border-black"
        @click="blurCard()"
        :class="({ 'bg-enable': isPriorityCheckClicked }, selected.color)"
      >
        <p class="mx-auto">{{ selected.priority }}</p>
        <div class="pr-[13px]">
          <ChevronDownIcon class="flex h-5 w-5 text-black" />
        </div>
      </div>
      <div
        v-if="!isPriorityCheckClicked"
        v-click-outside="clickOutside"
        class="border-2 bg-white border-black rounded-2xl mt-4"
      >
        <div
          class="text-center"
          v-for="(dropdownList, i) in dropdownLists"
          :key="i"
          @click="
            selected = dropdownList;
            blurCard();
          "
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
</template>

<script setup>
import { ref } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/solid';
import { directive as vClickOutside } from 'click-outside-vue3';
defineProps({ isEdited: Boolean, isPriorityCheckClicked: Boolean });
const emit = defineEmits(['blurComp', 'isPriorityCheckClicked', 'sendPrio']);

const selected = ref({ priority: 'Low', color: 'bg-[#38CBCB]' });
const isPriorityCheckClicked = ref(true);
const tabindex = ref(0);
const dropdownLists = ref([
  { priority: 'Low', color: 'bg-[#38CBCB]' },
  { priority: 'Medium', color: 'bg-[#FFAB00]' },
  { priority: 'High', color: 'bg-[#FF481F]' },
]);

function openDropdown() {
  isPriorityCheckClicked.value = !isPriorityCheckClicked.value;
  emit('isPriorityCheckClicked', isPriorityCheckClicked.value, selected.value.priority);
}

function blurCard() {
  emit('blurComp');
}

function clickOutside() {
  blurCard();
  openDropdown();
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
