import { ref } from "vue";

export function useDashboard() {
  const navigationTab = ref("Item One");
  const navigationTab2 = ref("Item One");

  const titleContent = "2 Team Members in Your Team";

  return {
    navigationTab,
    navigationTab2,
    titleContent
  }
}
