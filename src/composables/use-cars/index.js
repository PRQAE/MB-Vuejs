import { ref, watchEffect } from "vue";
import { useUserListStore } from "../../views/apps/user/useUserListStore";
export function useCars() {
  const userListStore = useUserListStore();
  const searchQuery = ref("");
  const selectedSite = ref("All");
  const selectedType = ref("All");
  const selectedManufacturer = ref("All");
  const selectedStatus = ref("All");
  const selectedMb = ref("All");
  const selectedTeam = ref("All");
  const totalPage = ref(1);
  const totalUsers = ref(0);
  const users = ref([]);
  const selectedWorkOrder = ref();

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
        manufacturer: 'Toyota',
        model: 'Parado',
        year: '2025',
        plate_letter: 'acc',
        plate_numbers: '0202',
        mb: 'MB4',
        status: 'Clear',
      },
      {
        manufacturer: 'Isuzu',
        model: 'Hilux',
        year: '2024',
        plate_letter: 'AAA',
        plate_numbers: '31421',
        mb: 'MB4',
        status: 'Spare Tire',
      },
      {
        manufacturer: 'Isuzu',
        model: 'Hilux',
        year: '2024',
        plate_letter: 'AAA',
        plate_numbers: '31421',
        mb: 'MB4',
        status: 'Clear',
      },
      {
        manufacturer: 'Isuzu',
        model: 'Hilux',
        year: '2024',
        plate_letter: 'AAA',
        plate_numbers: '31421',
        mb: 'MB4',
        status: 'Fuel',
      },
    ]
    totalPage.value = 1
    totalUsers.value = 4
    options.value.page = 1
  }
  
  watchEffect(fetchUsers)

  const resolveUserStatusVariant = stat => {
    const statLowerCase = stat.toLowerCase()
    if (statLowerCase === 'clear')
      return 'success'
    if (statLowerCase === 'spare tire')
      return 'warning'
    if (statLowerCase === 'fuel')
      return 'primary'
  }
  
  const isAddNewUserDrawerVisible = ref(false)
  
  const addNewUser = userData => {
    userListStore.addUser(userData)
    // refetch User
    fetchUsers()
  }

  const deleteUser = id => {
    userListStore.deleteUser(id)
  
    // refetch User
    fetchUsers()
  }

  return{
    userListStore,
    selectedSite,
    selectedType,
    selectedManufacturer,
    searchQuery,
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
    resolveUserStatusVariant,
    addNewUser,
    deleteUser
  }
  

}
