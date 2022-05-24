<template>
  <div class="flex justify-between">
    <h1 class="text-black font-bold">To do list</h1>
    <button @click="addCard()" class="rounded-full bg-green-50 text-white w-6 h-6 font-thin">+</button>
  </div>
  <GeneralCard v-for="(card, index) in cards" :key="index" :card="card" />
</template>

<script setup>
import { ref } from 'vue';
import GeneralCard from './GeneralCard.vue';

const cards = ref([]);
function addCard() {
  cards.value.push({
    title: '',
    text: '',
    priority: '',
    isChecked: true,
  });
}
</script>

<style></style>
