import { ref } from "vue";
import { useUserListStore } from "../../views/apps/user/useUserListStore";

export function useWarehouse() {
  const userListStore = useUserListStore();
  const selectedDate = ref();
  const selectedStatus = ref("All");
  const name = ref("");
  const serial_no = ref("");
  const part_no = ref("");
  const from = ref("");

  const totalUsers = ref(0);
  const users = ref([]);

  const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    groupBy: [],
    search: undefined,
  })

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
        date: '2023-08-24',
        serial_no: 'test',
        part_no: '1000',
        from: 'asd',
        received_by: 'Test',
        back: 'R01-1A',
        status: 'Installed',
      },
      {
        date: '2023-08-24',
        serial_no: '4616A2W12',
        part_no: '3CR SDAW 6846',
        from: 'HQ',
        received_by: 'Test',
        back: 'R01-A1',
        status: 'Installed',
      },
    ]
  }
  
  watchEffect(fetchUsers)
  
  const resolveUserStatusVariant = stat => {
    const statLowerCase = stat.toLowerCase()
    if (statLowerCase === 'installed')
      return 'success'
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

  return {
    useUserListStore,
    selectedDate,
    selectedStatus,
    name,
    serial_no,
    part_no,
    from,
    totalUsers,
    users,
    options,
    isAddNewUserDrawerVisible,
    paginationMeta,
    fetchUsers,
    resolveUserStatusVariant,
    addNewUser,
    deleteUser
  }
}
