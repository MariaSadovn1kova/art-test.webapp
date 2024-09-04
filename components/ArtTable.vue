<script setup lang="ts">
import type { IPost } from '@/shared/types/Post';
import { usePostStore } from '@/stores/PostStores';

const postStore = usePostStore();

interface IProps {
  posts: IPost[]
}

const props = defineProps<IProps>();

const isLoading = ref(false);

const activePage = computed(() => postStore.getActivePage);

watch(activePage, async  (val: number) => {
  isLoading.value = true; 
  await new Promise(resolve => setTimeout(resolve, 1000));
  isLoading.value = false; 
});
</script>

<template>

  <div v-if="isLoading" class="flex justify-center items-center h-64">
    <ArtLoader />
  </div>

  <table 
    v-else 
    class="table-auto w-5/6 rounded-t-xl overflow-hidden"
  >

    <thead>
      <tr class="text-indigo-400">
        <th 
          class="bg-indigo-50 p-4 text-center w-1/12 cursor-pointer"
          @click="postStore.sortPosts()"
        >
          ID
        </th>
        <th class="bg-indigo-50 p-4 text-center w-1/12">UserID</th>
        <th class="bg-indigo-50 p-4 text-center w-4/12">Title</th>
        <th class="bg-indigo-50 p-4 text-center w-6/12">Body</th>
      </tr>
    </thead>
    
    <tbody>
      <tr 
        v-for="post in posts"
        :key="post.id"
        class="border-b-2 border-indigo-50"
      > 
        <td class="p-4 text-indigo-400 text-center">{{ post.id }}</td>
        <td class="p-4 text-center">{{ post.userId }}</td>
        <td class="p-4 text-center">{{ post.title }}</td>
        <td class="p-4 text-center">{{ post.body }}</td>
      </tr>
    </tbody>

  </table>

</template>