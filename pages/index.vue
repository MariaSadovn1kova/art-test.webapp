<script setup lang="ts">
const postStore = usePostStore();
postStore.fetchPosts();

const postTitle = ref('');
const postBody = ref('');

const posts = computed(() => postStore.getPaginatedPosts);

const showModal = ref(false);

const openModal = ():void => {
  showModal.value = true;
}
const closeModal = ():void => {
  showModal.value = false;
  postTitle.value = '';
  postBody.value = '';
}

const createPost = ():void => {
  postStore.createPost(postTitle.value, postBody.value);
  closeModal();
}
</script>

<template>
  <div class="w-full min-h-screen flex justify-top items-center p-16 flex-col gap-12">

    <ArtModal 
      v-if="showModal"
      @onClose="closeModal"
    > 

      <div class="flex flex-col gap-6">

        <input 
          v-model="postTitle"
          type="text" 
          class="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-300 sm:text-sm sm:leading-6" 
          placeholder="Заголовок" 
        />

        <input 
          v-model="postBody"
          type="text" 
          class="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-300 sm:text-sm sm:leading-6" 
          placeholder="Описание" 
        />

        <button 
          class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded transition ease-in-out"
          @click="createPost()"
        >
          Создать
        </button>

      </div>
    
    </ArtModal>

    <ArtPagination />
    
    <ArtTable 
      :posts="posts"
    />

    <button 
      class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded transition ease-in-out"
      @click="openModal"
    >
      Добавить пост
    </button>

  </div>
</template>
