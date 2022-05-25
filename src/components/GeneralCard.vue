<template>
  <div @click="toggleEditmode" class="flex flex-col justify-between p-4 border border-black min-h-[163px] rounded-2xl">
    <div class="flex justify-between">
      <CardTitle :isEdited="isEdited" />
      <PriorityCheck :isEdited="isEdited" />
    </div>
    <div class="flex justify-between">
      <div>{{ isEdited }}</div>
      <CardText :isEdited="isEdited" />
      <CheckBox :isEdited="isEdited" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import CardTitle from './CardTitle.vue';
import CardText from './CardText.vue';
import PriorityCheck from './PriorityCheck.vue';
import CheckBox from './CheckBox.vue';

const props = defineProps({ card: Object });
console.log(props);
const isEdited = ref(false);

function toggleEditmode() {
  isEdited.value = !isEdited.value;
}
</script>

