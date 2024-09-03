<script setup lang="ts">
import { usePostStore } from '@/stores/PostStores';

const postStore = usePostStore();
postStore.fetchPosts();

const pageNumber = computed(() => postStore.getTotalPages);
const activePage = computed(() => postStore.getActivePage);
</script>

<template>

  <div class="flex gap-2 w-5/6 flex-wrap">
    <div 
      v-for="pageNum in pageNumber"
      :key="`pagination_${pageNum}`"
      class="w-8 h-8 flex justify-center items-center rounded-md cursor-pointer transition ease-in-out"
      :class="{ 
        'text-white bg-indigo-300' : pageNum === activePage, 
        'bg-indigo-50' : pageNum !== activePage 
      }"
      @click="postStore.setCurrentPage(pageNum)"
    >
      {{ pageNum }}
    </div>
  </div>

</template>
