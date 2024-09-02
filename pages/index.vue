<script setup>
import { usePostStore } from '@/stores/PostStores';
import ArtTable from '@/widget/ArtTable.vue';
import ArtLoader from '@/widget/ArtLoader.vue';

const postStore = usePostStore();
postStore.fetchPosts();

const posts = computed(() => postStore.getPaginatedPosts);
const pageNumber = computed(() => postStore.getTotalPages);
const activePage = computed(() => postStore.getActivePage);
const isLoading = computed(() => postStore.getIsLoading);
</script>

<template>
  <div class="w-full min-h-screen flex justify-top items-center p-16 flex-col gap-12">

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

    <!-- <div 
      v-if="isLoading"
      class="w-full h-36 flex justify-center items-center"
    >
      <ArtLoader />
    </div> -->
    
    <table class="table-auto w-5/6 rounded-t-xl overflow-hidden">
      <thead>
        <tr class="text-indigo-400">
          <th class="bg-indigo-50 p-4">ID</th>
          <th class="bg-indigo-50 p-4">Title</th>
          <th class="bg-indigo-50 p-4">Body</th>
        </tr>
      </thead>

      <tbody>
        <tr 
          v-for="post in posts"
          :key="post.id"
          class="border-b-2 border-indigo-50"
        > 
          <td class="p-4 text-indigo-400">{{ post.id }}</td>
          <td class="p-4">{{ post.title }}</td>
          <td class="p-4">{{ post.body }}</td>
        </tr>
      </tbody>
    </table>

    <!-- <ArtTable 
      :posts="posts"
    /> -->
  </div>
</template>
