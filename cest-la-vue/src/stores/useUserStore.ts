import { ref } from "vue";
import type { JSONPlaceholderUser } from "../types";
import { defineStore } from "pinia";

// We can pass a setup function into defineStore to use the composition API
export const useUserStore = defineStore("UserStore", function () {
  // Seems like we have to use separate refs here (not reactive) so we can update states separately
  // https://router.vuejs.org/guide/advanced/data-fetching.html
  const users = ref<JSONPlaceholderUser[]>([]);
  const loadingUsers = ref(false);
  const errorGettingUsers = ref(false);

  // We can call an async IIFE here so the composable itself is not async,
  // then we update the refs from within the async logic
  (async function () {
    if (!errorGettingUsers.value) {
      loadingUsers.value = true;
      try {
        // Artificial slowdown to see loading states
        console.log("Waiting 500ms to show loading state...");
        await new Promise((res) => setTimeout(res, 500));
        console.log("Finished waiting 500ms");

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response?.ok) {
          throw Error("Error fetching users");
        }

        users.value = await response.json();
      } catch {
        errorGettingUsers.value = true;
      } finally {
        loadingUsers.value = false;
      }
    }
  })();

  function userByIdParam(idParam: string | string[]) {
    const currentId = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);
    return users.value.find((user) => user.id === currentId);
  }

  return { users, loadingUsers, errorGettingUsers, userByIdParam };
});
