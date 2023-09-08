<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import AddNewHouse from '../views/apps/user/AddNewHouse.vue'
import { useUserListStore } from '../views/apps/user/useUserListStore'

const userListStore = useUserListStore()
const selectedDate = ref()
const selectedStatus = ref('All')
const name = ref('')
const serial_no = ref('')
const part_no = ref('')
const from = ref('')

const totalUsers = ref(0)
const users = ref([])

const paginationMeta = () => {
  return (options, total) => {
    const start = (options.page - 1) * options.itemsPerPage + 1
    const end = Math.min(options.page * options.itemsPerPage, total)
    
    return `Showing ${start} to ${end} of ${total} entries`
  }
}

const status=[
  {
    title: 'In Warehouse',
    value: 'in_warehouse',
  },
  {
    title: 'Installed',
    value: 'installed',
  },
  {
    title: 'Sent',
    value: 'sent',
  },
  {
    title: 'Returned',
    value: 'returned',
  },
]

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Headers
const headers = [
  {
    title: 'DATE',
    key: 'date',
  },
  {
    title: 'NAME',
    key: 'name',
  },
  {
    title: 'SERIAL NO.',
    key: 'serial_no',
  },
  {
    title: 'PART NO.',
    key: 'part_no',
  },
  {
    title: 'FROM',
    key: 'from',
  },
  {
    title: 'RECEIVED BY',
    key: 'received_by',
  },
  {
    title: 'BACK',
    key: 'back',
  },
  {
    title: 'STATUS',
    key: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    sortable: false,
  },
]

// 👉 Fetching users
const fetchUsers = () => {
  // userListStore.fetchUsers({
  //   q: searchQuery.value,
  //   date: selectedDate.value,
  //   workorder: selectedWorkOrder.value,
  //   status: selectedStatus.value,
  //   options: options.value,
  // }).then(response => {
  //   users.value = response.users
  //   totalPage.value = 1
  //   totalUsers.value = 4
  //   options.value.page = 1
  // }).catch(error => {
  //   console.error(error)
  // })
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
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard title="Warehouse Table">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow class="mt-3 justify-end">
              <VBtn
                prepend-icon="tabler-plus"
                @click="isAddNewUserDrawerVisible = true"
              >
                Add New Record
              </VBtn>
            </VRow>
            <VRow>
              <!-- 👉 Select Role -->
              <VCol
                cols="12"
                sm="2"
              >
                <AppDateTimePicker
                  v-model="selectedDate"
                  label="Date:"
                />
              </VCol>
              <!-- 👉 Select Plan -->
              <VCol
                cols="12"
                sm="2"
              >
                <AppTextField
                  v-model="name"
                  label="Name:"
                />
              </VCol>
              <!-- 👉 Select Status -->
              <VCol
                cols="12"
                sm="2"
              >
                <AppTextField
                  v-model="serial_no"
                  label="Serial Number:"
                />
              </VCol>
              <VCol
                cols="12"
                sm="2"
              >
                <AppTextField
                  v-model="part_no"
                  label="Part Number:"
                />
              </VCol>
              <VCol
                cols="12"
                sm="1"
              >
                <AppTextField
                  v-model="from"
                  label="From:"
                />
              </VCol>
              <VCol
                cols="12"
                sm="2"
              >
                <AppSelect
                  v-model="selectedStatus"
                  label="Status:"
                  :items="status"
                />
              </VCol>
              <VCol
                cols="12"
                sm="1"
              >
                <AppSelect
                  :model-value="options.itemsPerPage"
                  label="Show"
                  :items="[
                    { value: 10, title: '10' },
                    { value: 25, title: '25' },
                    { value: 50, title: '50' },
                    { value: 100, title: '100' },
                    { value: -1, title: 'All' },
                  ]"
                  style="width: 6.25rem;"
                  @update:model-value="options.itemsPerPage = parseInt($event, 10)"
                />
              </VCol>
            </VRow>
          </VCardText>
          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div class="me-3 d-flex gap-3" />
          </VCardText>
          <!-- SECTION datatable -->
          <VDataTableServer
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            :items="users"
            :items-length="totalUsers"
            :headers="headers"
            class="text-no-wrap"
            @update:options="options = $event"
          >
            <!-- Status -->
            <template #item.status="{ item }">
              <VChip
                :color="resolveUserStatusVariant(item.raw.status)"
                size="small"
                label
                class="text-capitalize"
              >
                {{ item.raw.status }}
              </VChip>
            </template>

            <!-- Actions -->
            <template #item.action="{ item }">
              <IconBtn style="color: #00718a">
                <VIcon icon="tabler-pencil" />
              </IconBtn>

              <IconBtn
                style="color:rgb(234, 84, 85)"
                @click="deleteUser(item.raw.id)"
              >
                <VIcon icon="tabler-trash" />
              </IconBtn>
            </template>

            <!-- pagination -->
            <template #bottom>
              <VDivider />
              <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
                <p class="text-sm text-disabled mb-0">
                  {{ paginationMeta(options, totalUsers) }}
                </p>

                <VPagination
                  v-model="options.page"
                  :length="Math.ceil(totalUsers / options.itemsPerPage)"
                  :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalUsers / options.itemsPerPage)"
                >
                  <template #prev="slotProps">
                    <VBtn
                      variant="tonal"
                      color="default"
                      v-bind="slotProps"
                      :icon="false"
                    >
                      Previous
                    </VBtn>
                  </template>

                  <template #next="slotProps">
                    <VBtn
                      variant="tonal"
                      color="default"
                      v-bind="slotProps"
                      :icon="false"
                    >
                      Next
                    </VBtn>
                  </template>
                </VPagination>
              </div>
            </template>
          </VDataTableServer>
          <!-- SECTION -->
        </VCard>

        <!-- 👉 Add New User -->
        <AddNewHouse v-model:isDialogVisible="isAddNewUserDrawerVisible" />
        <!-- @user-data="addNewUser" -->
      </vcol>
    </vrow>
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>
