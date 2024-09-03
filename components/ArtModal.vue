<script setup lang="ts">
const emit = defineEmits(['onClose']);

const closeModal = ():void => {
  emit('onClose');
}
</script>

<template>
  <div class="fixed inset-0 w-full h-screen flex justify-center items-center">

    <div 
      class="fixed inset-0 w-full h-screen z-10 bg-slate-500 opacity-10"
      @click="closeModal"
    ></div>

    <div class="bg-white p-8 z-50 rounded-xl">
      <slot />
    </div>

  </div>
</template>
