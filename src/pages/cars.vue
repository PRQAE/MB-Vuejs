<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import AddNewCar from '../views/apps/user/AddNewCar.vue'
import { useUserListStore } from '../views/apps/user/useUserListStore'

const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedSite = ref('All')
const selectedType = ref('All')
const selectedManufacturer = ref('All')
const selectedStatus = ref('All')
const selectedMb = ref('All')
const selectedTeam = ref('All')
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])
const selectedWorkOrder = ref()

const paginationMeta = () => {
  return (options, total) => {
    const start = (options.page - 1) * options.itemsPerPage + 1
    const end = Math.min(options.page * options.itemsPerPage, total)
    
    return `Showing ${start} to ${end} of ${total} entries`
  }
}

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
    title: 'Manufacturer',
    key: 'manufacturer',
  },
  {
    title: 'MODEL',
    key: 'model',
  },
  {
    title: 'YEAR',
    key: 'year',
  },
  {
    title: 'PLATE LETTERS',
    key: 'plate_letter',
  },
  {
    title: 'PLATE NUMBERS',
    key: 'plate_numbers',
  },
  {
    title: 'MB',
    key: 'mb',
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
  //   status: selectedStatus.value,
  //   mb: selectedMb.value,
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
  console.log('users', users)
}

watchEffect(fetchUsers)

// 👉 search filters

const manufactures = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Toyota',
    value: 'toyota',
  },
  {
    title: 'Isuzu',
    value: 'isuzu',
  },
  {
    title: 'Nissan',
    value: 'nissan',
  },
]

const status = [
  {
    title: 'All',
    value: 'All',
  },
  {
    title: 'Clear',
    value: 'clear',
  },
  {
    title: 'Spare Tire',
    value: 'spare_tire',
  },
  {
    title: 'Need Maintenance',
    value: 'need_maintenance',
  },
  {
    title: 'Fuel',
    value: 'fuel',
  },
  {
    title: 'Outdated',
    value: 'outdated',
  },
]

const mbs = [
  {
    title: 'All',
    value: 'All',
  },
  {
    title: 'MB5',
    value: 'mb5',
  },
  {
    title: 'MB6',
    value: 'mb6',
  },
  {
    title: 'MB9',
    value: 'mb9',
  },
]

const teams = [
  {
    title: 'All',
    value: 'All',
  },
  {
    title: 'Team A',
    value: 'Team A',
  },
  {
    title: 'Team B',
    value: 'Team B',
  },
  {
    title: 'Team C',
    value: 'Team C',
  },
  {
    title: 'Team D',
    value: 'Team D',
  },
]

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

const userListMeta = [
  {
    icon: 'tabler-car',
    color: 'primary',
    title: 'Cars',
    stats: '5',
    subtitle: 'Total Cars',
  },
  {
    icon: 'tabler-car-off',
    color: 'success',
    title: 'Fuel',
    stats: '1',
    subtitle: 'Without Fuel',
  },
  {
    icon: 'tabler-steering-wheel',
    color: 'error',
    title: 'Spare Tire',
    stats: '2',
    subtitle: 'Without Spare Tire',
  },
  {
    icon: 'tabler-car-crash',
    color: 'warning',
    title: 'Maintenance',
    stats: '0',
    subtitle: 'Need Maintenance',
  },
]

const deleteUser = id => {
  userListStore.deleteUser(id)

  // refetch User
  fetchUsers()
}
</script>

<template>
  <section>
    <VRow>
      <VCol
        v-for="meta in userListMeta"
        :key="meta.title"
        cols="12"
        sm="6"
        lg="3"
      >
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <span>{{ meta.title }}</span>
              <div class="d-flex align-center gap-2 my-1">
                <h6 class="text-h4">
                  {{ meta.stats }}
                </h6>
                <span :class="meta.percentage > 0 ? 'text-success' : 'text-error'"> {{ meta.percentage > 0 ? '+' : '' }} {{ meta.percentage }}</span>
              </div>
              <span>{{ meta.subtitle }}</span>
            </div>

            <VAvatar
              rounded
              variant="tonal"
              :color="meta.color"
              :icon="meta.icon"
            />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VCard title="Cars Table">
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
              <VCol
                cols="12"
                sm="3"
              >
                <AppSelect
                  v-model="selectedMb"
                  label="MB:"
                  :items="mbs"
                />
              </VCol>
              <VCol
                cols="12"
                sm="3"
              >
                <AppSelect
                  v-model="selectedManufacturer"
                  label="Manufacturer:"
                  :items="manufactures"
                />
              </VCol>
              <VCol
                cols="12"
                sm="3"
              >
                <AppTextField
                  id="workorder"
                  v-model="selectedWorkOrder"
                  label="Plate Number:"
                  type="number"
                  placeholder="0001"
                />
              </VCol>
              <VCol
                cols="12"
                sm="3"
              >
                <AppSelect
                  v-model="selectedStatus"
                  label="Status:"
                  :items="status"
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
              <IconBtn style="color:#00718a">
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
        <AddNewCar v-model:isDialogVisible="isAddNewUserDrawerVisible" />
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
