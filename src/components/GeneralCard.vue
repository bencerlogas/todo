<template>
  <div
    @click="setEditModeState(true)"
    class="flex flex-col justify-between p-4 border border-black min-h-[163px] rounded-2xl opacity"
    :class="cardBlurred"
  >
    <div class="flex justify-between">
      <CardTitle :isCardEdited="isCardEdited" :isPriorityDropDownOpened="isPriorityDropDownOpened" />
      <div :class="{ 'bg-enable': isPriorityDropDownOpened }">
        <PriorityCheck :isCardEdited="isCardEdited" @onPriorityDropDownOpen="blurBackground" />
      </div>
    </div>
    <div class="flex justify-between">
      <CardText :isCardEdited="isCardEdited" :isPriorityDropDownOpened="isPriorityDropDownOpened" />
      <CheckBox :isCardEdited="isCardEdited" />
      <div class="inline-block" v-if="isCardEdited">
        <button
          @click.prevent.stop="saveTodo"
          class="bg-green-50 rounded-2xl text-white w-[120px] h-[52px] mr-2"
          :class="{ 'save-button': isPriorityDropDownOpened }"
        >
          Save
        </button>
        <button
          @click="deleteTodo()"
          class="bg-[#E5E5E5] rounded-2xl w-[120px] h-[52px]"
          :class="{ 'delete-button': isPriorityDropDownOpened }"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CardTitle from './CardTitle.vue';
import CardText from './CardText.vue';
import PriorityCheck from './PriorityCheck.vue';
import CheckBox from './CheckBox.vue';

const props = defineProps({ card: { type: Object }, index: { type: Number } });
const emit = defineEmits(['deleteCard', 'sendPriorityvalues']);

const isCardEdited = ref(false);
let isPriorityDropDownOpened = ref();
let priority = ref();

function setEditModeState(state) {
  isCardEdited.value = state;
}

function saveTodo() {
  setEditModeState(!isCardEdited.value);
  isPriorityDropDownOpened.value = false;
  emit('sendPriorityvalues', priority.value, props.index);
}

function deleteTodo() {
  setEditModeState(false);
  emit('deleteCard', props.index);
}

function blurBackground(isPriorityDropDownOpen, dropdownPriority) {
  isPriorityDropDownOpened.value = !isPriorityDropDownOpen;
  priority.value = dropdownPriority;
}

const cardBlurred = computed(() => {
  return isPriorityDropDownOpened.value ? 'bg-disabled' : '';
});
</script>

<style scoped>
.save-button {
  background-color: #b5ebb7;
}
.delete-button {
  color: #5c5858;
}
</style>
