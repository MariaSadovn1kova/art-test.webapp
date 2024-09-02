import { defineStore } from "pinia";
import type { IPost } from '@/shared/types/Post';

interface PostState {
  posts: IPost[]
  isLoading: boolean
  currentPage: number
  postsPerPage: number
}

const baseURL = 'https://jsonplaceholder.typicode.com';

export const usePostStore = defineStore('post', {

  state: (): PostState => ({
    posts: [],
    isLoading: false,
    currentPage: 1,
    postsPerPage: 10
  }),

  actions: {
    async fetchPosts() {
      this.isLoading = true;
      const { data } = await useFetch<IPost[]>(`${baseURL}/posts`);
      if (data.value) {
        this.posts = data.value;
      }
      this.isLoading = false;
    },
    setPosts(posts: IPost[]) {
      this.posts = posts;
    },
    setCurrentPage(page: number) {
      this.currentPage = page;
    }
  },

  getters: {
    getPosts: (state): IPost[] => state.posts,
    getActivePage: (state): number => state.currentPage,
    getPaginatedPosts: (state): IPost[] => {
      state.isLoading = true;
      const startIndex = (state.currentPage - 1) * state.postsPerPage;
      const endIndex = startIndex + state.postsPerPage;
      state.isLoading = false;
      return state.posts.slice(startIndex, endIndex);
    }, 
    getTotalPages: (state): number => Math.ceil(state.posts.length / state.postsPerPage),
    getIsLoading: (state): boolean => state.isLoading,
  },
  
});
