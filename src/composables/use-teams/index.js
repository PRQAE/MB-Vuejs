import { ref, watchEffect } from "vue";
import { useUserListStore } from "../../views/apps/user/useUserListStore";
export function useTeams() {
  const userListStore = useUserListStore();
  const name = ref("");
  const selectedMb = ref("All");
  const selectedTeam = ref("All");

  const totalUsers = ref(0);
  const users = ref([]);

  const paginationMeta = () => {
    return (options, total) => {
      const start = (options.page - 1) * options.itemsPerPage + 1;
      const end = Math.min(options.page * options.itemsPerPage, total);

      return `Showing ${start} to ${end} of ${total} entries`;
    };
  };

  const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    groupBy: [],
    search: undefined,
  });

  // 👉 Fetching users
  const fetchUsers = () => {
    users.value = [
      {
        sar_id: "1111",
        name: "Adam",
        email: "a@a.com",
        phone_no: "+1112121231",
        id: "1111111",
        pts: "Active",
        po: "Active",
      },
      {
        sar_id: "2222",
        name: "Joe",
        email: "b@b.com",
        phone_no: "+192398182",
        id: "22222222",
        pts: "Expired",
        po: "Expired",
      },
      {
        sar_id: "3333",
        name: "Grem",
        email: "rok@gmail.com",
        phone_no: "+12397428",
        id: "333333",
        pts: "Expired",
        po: "Active",
      },
    ];
  };

  watchEffect(fetchUsers);

  const resolveTeamVariant = (stat) => {
    const statLowerCase = stat.toLowerCase();
    if (statLowerCase === "active") return "success";
    if (statLowerCase === "expired") return "error";
  };

  const isAddNewUserDrawerVisible = ref(false);

  const addNewUser = (userData) => {
    userListStore.addUser(userData);

    // refetch User
    fetchUsers();
  };

  const deleteUser = (id) => {
    userListStore.deleteUser(id);

    // refetch User
    fetchUsers();
  };

  return {
    userListStore,
    name,
    selectedMb,
    selectedTeam,
    totalUsers,
    users,
    options,
    isAddNewUserDrawerVisible,
    paginationMeta,
    fetchUsers,
    resolveTeamVariant,
    addNewUser,
    deleteUser,
  };
}
