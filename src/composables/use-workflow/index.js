import { ref, watchEffect } from "vue";
import { useUserListStore } from "../../views/apps/user/useUserListStore";

export function useWorkflow() {
  const userListStore = useUserListStore();
  const selectedDate = ref();
  const selectedSite = ref("All");
  const selectedType = ref("All");
  const selectedTechnican = ref("All");
  const selectedStatus = ref("All");
  const selectedMb = ref("All");
  const selectedTeam = ref("All");
  const totalPage = ref(1);
  const totalUsers = ref(0);
  const users = ref([]);
  const selectedWorkOrder = ref();

  const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    groupBy: [],
    search: undefined,
  });
  const paginationMeta = () => {
    return (options, total) => {
      const start = (options.page - 1) * options.itemsPerPage + 1;
      const end = Math.min(options.page * options.itemsPerPage, total);

      return `Showing ${start} to ${end} of ${total} entries`;
    };
  };

  // 👉 Fetching users
  const fetchUsers = () => {
    users.value = [
      {
        date: "2023-08-24",
        workOrder: "123",
        site: "123",
        type: "CM",
        description: "1 Month Indoor CM",
        technicans: "test",
        teams: "Team A",
        l2_support: "Yes",
        status: "Open",
        mb: "MB5",
      },
      {
        date: "2023-09-01",
        workOrder: "01",
        site: "upwork.com",
        type: "PM",
        description: "1 Month Outdoor PM",
        technicans: "Adam",
        teams: "Team B",
        l2_support: "No",
        status: "Spare Part",
        mb: "MB9",
      },
      {
        date: "2023-08-24",
        workOrder: "123",
        site: "123",
        type: "CM",
        description: "1 Month Indoor CM",
        technicans: "test",
        teams: "Team A",
        l2_support: "Yes",
        status: "Under Observation",
        mb: "MB5",
      },
      {
        date: "2023-08-24",
        workOrder: "123",
        site: "123",
        type: "CM",
        description: "1 Month Indoor CM",
        technicans: "test",
        teams: "Team A",
        l2_support: "Yes",
        status: "Close",
        mb: "MB5",
      },
    ];
    totalPage.value = 1;
    totalUsers.value = 4;
    options.value.page = 1;
    console.log("users", users);
  };

  watchEffect(fetchUsers);

  const resolveUserRoleVariant = (role) => {
    const roleLowerCase = role.toLowerCase();
    if (roleLowerCase === "subscriber")
      return {
        color: "warning",
        icon: "tabler-circle-check",
      };
    if (roleLowerCase === "author")
      return {
        color: "success",
        icon: "tabler-user",
      };
    if (roleLowerCase === "maintainer")
      return {
        color: "primary",
        icon: "tabler-chart-pie-2",
      };
    if (roleLowerCase === "editor")
      return {
        color: "info",
        icon: "tabler-edit",
      };
    if (roleLowerCase === "admin")
      return {
        color: "secondary",
        icon: "tabler-device-laptop",
      };

    return {
      color: "primary",
      icon: "tabler-user",
    };
  };

  const resolveUserStatusVariant = (stat) => {
    const statLowerCase = stat.toLowerCase();
    if (statLowerCase === "open") return "error";
    if (statLowerCase === "spare part") return "primary";
    if (statLowerCase === "under observation") return "warning";

    return "grey";
  };

  const resolveUserTypeVariant = (stat) => {
    const statLowerCase = stat.toLowerCase();
    if (statLowerCase === "cm") return "error";
    if (statLowerCase === "pm") return "success";
    if (statLowerCase === "others") return "warning";
  };

  const resolveUserSupportVariant = (stat) => {
    const statLowerCase = stat.toLowerCase();
    if (statLowerCase === "yes") return "success";
    if (statLowerCase === "no") return "grey";
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
    selectedDate,
    selectedSite,
    selectedType,
    selectedTechnican,
    selectedStatus,
    selectedMb,
    selectedTeam,
    totalPage,
    totalUsers,
    users,
    selectedWorkOrder,
    options,
    isAddNewUserDrawerVisible,
    paginationMeta,
    fetchUsers,
    resolveUserRoleVariant,
    resolveUserStatusVariant,
    resolveUserTypeVariant,
    resolveUserSupportVariant,
    addNewUser,
    deleteUser,
  };
}
