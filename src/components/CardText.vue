<template>
  <input type="cardtext" placeholder="Text" />
  <h1></h1>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({ isEdited: Boolean });
console.log(props);
//import defineEmits from 'vue';
</script>

<style></style>
