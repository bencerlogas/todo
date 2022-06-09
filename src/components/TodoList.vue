<template>
  <div class="flex justify-between">
    <h1 class="text-black text-2xl font-bold">To do list</h1>
    <button @click="addCard()" class="rounded-full bg-green-50 text-white w-10 h-10 font-thin text-2xl">+</button>
  </div>
  <div class="relative gap-y-12 flex flex-col">
    <TransitionGroup name="deletecard" appear>
      <GeneralCard
        v-for="(card, index) in cards"
        :key="card"
        :card="card"
        :index="index"
        @deleteThis="delCard"
        @priorityvalues="pushPriority"
      />
    </TransitionGroup>
    <Transition name="emptyimg">
      <img v-if="!cards.length" src="../assets/arrayempty.png" />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GeneralCard from './GeneralCard.vue';

const cards = ref([]);
function addCard() {
  cards.value.unshift({
    title: '',
    text: '',
    priority: '',
    isChecked: true,
  });
}
function delCard(index) {
  cards.value.splice(index, 1);
}
function pushPriority(priority, index) {
  cards.value[index].priority = priority;
  console.log(cards.value);
}
</script>
<style>
.deletecard-enter-active {
  transition: all 0.3s ease-out;
}

.deletecard-leave-active {
  position: absolute;
  width: 100%;
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.deletecard-enter-from,
.deletecard-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
.deletecard-move {
  transition: all 0.3s ease;
}

.emptyimg-enter-from {
  opacity: 0;
}
.emptyimg-enter-active {
  transition: all 0.3s ease-out;
}
.emptyimg-enter-to {
  opacity: 1;
}
.emptyimg-leave-from {
  opacity: 1;
}
.emptyimg-leave-active {
  transition: all 0.3s ease-out;
}
.emptyimg-leave-to {
  opacity: 0;
}
</style>
