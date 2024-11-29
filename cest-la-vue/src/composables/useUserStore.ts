import { ref } from "vue";
import { JSONPlaceholderUser } from "../types";

export function useUserStore() {
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

  return { users, loadingUsers, errorGettingUsers };
}
