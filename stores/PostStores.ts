import { defineStore } from "pinia";
import type { IPost } from '@/shared/types/Post';

interface PostState {
  posts: IPost[]
  currentPage: number
  postsPerPage: number
  isSorted: boolean
}

export const usePostStore = defineStore('post', {

  state: (): PostState => ({
    posts: [],
    currentPage: 1,
    postsPerPage: 10,
    isSorted: false
  }),

  actions: {
    async fetchPosts() {
      const { data } = await useFetch('/api/post');
      if (data.value) {
        this.posts = data.value;
      }
    },

    async createPost(title: string, body: string) {
      await $fetch('/api/createPost', {
        method: 'POST',
        body: {
          title: title,
          body: body,
          userId: 1, 
        }
      });

      this.posts.push({
        userId: 1,
        title: title,
        body: body,
        id: this.posts.length + 1
      });
    },

    setPosts(posts: IPost[]) {
      this.posts = posts;
    },

    setCurrentPage(page: number) {
      this.currentPage = page;
    },

    sortPosts() {
      this.posts.sort((a, b) => this.isSorted ? a.id - b.id : b.id - a.id);
      this.isSorted = !this.isSorted;
    },
    
  },

  getters: {
    getPosts: (state): IPost[] => state.posts,
    getActivePage: (state): number => state.currentPage,
    getPaginatedPosts: (state): IPost[] => {
      const startIndex = (state.currentPage - 1) * state.postsPerPage;
      const endIndex = startIndex + state.postsPerPage;
      return state.posts.slice(startIndex, endIndex);
    }, 
    getTotalPages: (state): number => Math.ceil(state.posts.length / state.postsPerPage),
  },
  
});
