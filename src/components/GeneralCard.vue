<template>
  <div
    @click="toggleEditmodeOn"
    class="flex flex-col justify-between p-4 border border-black min-h-[163px] rounded-2xl opacity"
    :class="priorityCheckClicked ? 'bg-disabled' : ''"
  >
    <div class="flex justify-between">
      <CardTitle :isEdited="isEdited" :priorityCheckClicked="priorityCheckClicked" />
      <div :class="{ 'bg-enable': priorityCheckClicked }">
        <PriorityCheck :isEdited="isEdited" @isPriorityCheckClicked="blurBackground" />
      </div>
    </div>
    <div class="flex justify-between">
      <CardText :isEdited="isEdited" :priorityCheckClicked="priorityCheckClicked" />
      <CheckBox :isEdited="isEdited" />
      <div class="inline-block" v-if="isEdited">
        <button
          @click.prevent.stop="saveTodo"
          class="bg-green-50 rounded-2xl text-white w-[120px] h-[52px] mr-2"
          :class="{ 'save-button': priorityCheckClicked }"
        >
          Save
        </button>
        <button
          @click="deleteTodo()"
          class="bg-[#E5E5E5] rounded-2xl w-[120px] h-[52px]"
          :class="{ 'delete-button': priorityCheckClicked }"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CardTitle from './CardTitle.vue';
import CardText from './CardText.vue';
import PriorityCheck from './PriorityCheck.vue';
import CheckBox from './CheckBox.vue';

const props = defineProps({ card: { type: Object }, index: { type: Number } });
const emit = defineEmits(['deleteThis', 'priorityvalues']);

const isEdited = ref(false);
let priorityCheckClicked = ref();
let priority = ref();

function toggleEditmodeOn() {
  isEdited.value = true;
}
function saveTodo() {
  isEdited.value = !isEdited.value;
  emit('priorityvalues', priority.value, props.index);
}

function deleteTodo() {
  emit('deleteThis', props.index);
  isEdited.value = false;
}

function blurBackground(isPriorityCheckClicked, dropdownPriority) {
  priorityCheckClicked.value = !isPriorityCheckClicked;
  priority.value = dropdownPriority;
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
.save-button {
  background-color: #b5ebb7;
}
.delete-button {
  color: #5c5858;
}
</style>
