import { reactive } from "vue";
import { JSONPlaceholderUser } from "../types";

export async function useUserStore() {
  const store = reactive({
    users: [] as JSONPlaceholderUser[],
    errorGettingUsers: false,
  });

  if (!store.errorGettingUsers) {
    try {
      // Artificial slowdown to see loading states
      console.log("Waiting 500ms to show loading state...");
      await new Promise((res) => setTimeout(res, 500));
      console.log("Finished waiting 500ms");

      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response?.ok) {
        throw Error("Error fetching users");
      }

      store.users = await response.json();
    } catch {
      store.errorGettingUsers = true;
    }
  }

  return store;
}
