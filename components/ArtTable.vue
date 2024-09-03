<script setup lang="ts">
import type { IPost } from '@/shared/types/Post';

interface IProps {
  posts: IPost[]
}

const props = defineProps<IProps>();
</script>

<template>
  <table class="table-auto w-5/6 rounded-t-xl overflow-hidden">
    <thead>
      <tr class="text-indigo-400">
        <th class="bg-indigo-50 p-4 text-center">ID</th>
        <th class="bg-indigo-50 p-4 text-center">UserID</th>
        <th class="bg-indigo-50 p-4 text-center">Title</th>
        <th class="bg-indigo-50 p-4 text-center">Body</th>
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