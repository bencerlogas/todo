<template>
  <div
    @click="setEditModeState(true)"
    class="flex flex-col justify-between p-4 border border-black min-h-[163px] rounded-2xl opacity"
    :class="cardBlurred"
    v-click-outside="() => setEditModeState(false)"
  >
    <div class="flex justify-between">
      <CardTitle
        v-model="cardCopy.title"
        :isCardEdited="isCardEdited"
        :isPriorityDropDownOpened="isPriorityDropDownOpened"
      />
      <div :class="{ 'bg-enable': isPriorityDropDownOpened }">
        <PriorityCheck
          v-model="cardCopy.priority"
          v-model:isOpen="isPriorityDropDownOpened"
          :isCardEdited="isCardEdited"
        />
      </div>
    </div>
    <div :class="isCardinEditMode">
      <CardText
        v-model="cardCopy.text"
        :isCardEdited="isCardEdited"
        :isPriorityDropDownOpened="isPriorityDropDownOpened"
      />
      <CheckBox v-model="cardCopy.isChecked" :isCardEdited="isCardEdited" @update:modelValue="checkBoxChecked" />
      <div class="inline-block" v-if="isCardEdited">
        <button
          @click.prevent.stop="saveTodo()"
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import CardTitle from './CardTitle.vue';
import CardText from './CardText.vue';
import PriorityCheck from './PriorityCheck.vue';
import CheckBox from './CheckBox.vue';
import { directive as vClickOutside } from 'click-outside-vue3';

const props = defineProps({
  modelValue: { title: String, text: String },
});
const emit = defineEmits(['deleteCard', 'update:modelValue', 'checked']);

const isCardEdited = ref(false);
const isPriorityDropDownOpened = ref(false);

const cardCopy = ref({ ...props.modelValue });
function setEditModeState(state) {
  if (isPriorityDropDownOpened.value) return;
  if (!state) {
    cardCopy.value = { ...props.modelValue };
  }
  isCardEdited.value = state;
}

function checkBoxChecked(value) {
  emit('update:modelValue', cardCopy.value);
  if (value) {
    emit('checked');
  }
}

function saveTodo() {
  isCardEdited.value = false;
  isPriorityDropDownOpened.value = false;
  emit('update:modelValue', cardCopy.value);
}

function deleteTodo() {
  isCardEdited.value = false;
  emit('deleteCard');
}

const cardBlurred = computed(() => {
  return isPriorityDropDownOpened.value ? 'bg-disabled' : '';
});

const isCardinEditMode = computed(() => {
  return isCardEdited.value ? 'flex justify-between flex-col' : 'flex justify-between overflow-hidden;';
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (isCardEdited.value) return;
    cardCopy.value = { ...newValue };
  }
);

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveTodo();
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveTodo();
    }
  });
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
