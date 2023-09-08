<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import AddNewUserDrawer from '../views/apps/user/AddNewUserDrawer.vue'
import { useUserListStore } from '../views/apps/user/useUserListStore'

const userListStore = useUserListStore()
const selectedDate = ref()
const selectedSite = ref('All')
const selectedType = ref('All')
const selectedTechnican = ref('All')
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
    title: 'DATE',
    key: 'date',
  },
  {
    title: 'WORK ORDER',
    key: 'workOrder',
  },
  {
    title: 'SITE',
    key: 'site',
  },
  {
    title: 'TYPE',
    key: 'type',
  },
  {
    title: 'DESCRIPTION',
    key: 'description',
  },
  {
    title: 'TECHNICANS',
    key: 'technicans',
  },
  {
    title: 'TEAM',
    key: 'teams',
  },
  {
    title: 'L2 SUPPORT',
    key: 'l2_support',
  },
  {
    title: 'STATUS',
    key: 'status',
  },
  {
    title: 'MB',
    key: 'mb',
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
  //   site: selectedSite.value,
  //   type: selectedType.value,
  //   technicans: selectedTechnican.value,
  //   status: selectedStatus.value,
  //   mb: selectedMb.value,
  //   team: selectedTeam.value,
  //   options: options.value,
  // }).then(response => {
  //   users.valuee = [
  //     {
  //       date: '2023-08-24',
  //       workorder: '123',
  //       site: '123',
  //       type: 'CM',
  //       description: '1 Month Indoor CM',
  //       technicans: 'test',
  //       teams: 'Team A',
  //       l2_support: 'Yes',
  //       status: 'Open',
  //       mb: 'MB5',
  //     },
  //   ]

  //   // users.value = response.users
  //   totalPage.value = 1
  //   totalUsers.value = 4
  //   options.value.page = 1
  // }).catch(error => {
  //   console.error(error)
  // })
  users.value = [
    {
      date: '2023-08-24',
      workOrder: '123',
      site: '123',
      type: 'CM',
      description: '1 Month Indoor CM',
      technicans: 'test',
      teams: 'Team A',
      l2_support: 'Yes',
      status: 'Open',
      mb: 'MB5',
    },
    {
      date: '2023-09-01',
      workOrder: '01',
      site: 'upwork.com',
      type: 'PM',
      description: '1 Month Outdoor PM',
      technicans: 'Adam',
      teams: 'Team B',
      l2_support: 'No',
      status: 'Spare Part',
      mb: 'MB9',
    },
    {
      date: '2023-08-24',
      workOrder: '123',
      site: '123',
      type: 'CM',
      description: '1 Month Indoor CM',
      technicans: 'test',
      teams: 'Team A',
      l2_support: 'Yes',
      status: 'Under Observation',
      mb: 'MB5',
    },
    {
      date: '2023-08-24',
      workOrder: '123',
      site: '123',
      type: 'CM',
      description: '1 Month Indoor CM',
      technicans: 'test',
      teams: 'Team A',
      l2_support: 'Yes',
      status: 'Close',
      mb: 'MB5',
    },
  ]
  totalPage.value = 1
  totalUsers.value = 4
  options.value.page = 1
  console.log('users', users)
}

watchEffect(fetchUsers)

// 👉 search filters
const roles = [
  {
    title: 'Admin',
    value: 'admin',
  },
  {
    title: 'Author',
    value: 'author',
  },
  {
    title: 'Editor',
    value: 'editor',
  },
  {
    title: 'Maintainer',
    value: 'maintainer',
  },
  {
    title: 'Subscriber',
    value: 'subscriber',
  },
]

const plans = [
  {
    title: 'All',
    value: 'basic',
  },
  {
    title: '41',
    value: 'company',
  },
  {
    title: '41A',
    value: 'enterprise',
  },
  {
    title: '41B',
    value: 'team',
  },
]

const sites = [
  {
    title: 'All',
    value: 'basic',
  },
  {
    title: '41',
    value: 'company',
  },
  {
    title: '41A',
    value: 'enterprise',
  },
  {
    title: '41B',
    value: 'team',
  },
]

const types = [
  {
    title: 'All',
    value: 'All',
  },
  {
    title: 'PM',
    value: 'PM',
  },
  {
    title: 'CM',
    value: 'CM',
  },
  {
    title: 'Others',
    value: 'Others',
  },
]

const technicans = [
  {
    title: 'All',
    value: 'All',
  },
  {
    title: 'Adam',
    value: 'Adam',
  },
  {
    title: 'Joe',
    value: 'Joe',
  },
]

const status = [
  {
    title: 'All',
    value: 'All',
  },
  {
    title: 'Open',
    value: 'Open',
  },
  {
    title: 'Under Observation',
    value: 'Under Observation',
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

const resolveUserRoleVariant = role => {
  const roleLowerCase = role.toLowerCase()
  if (roleLowerCase === 'subscriber')
    return {
      color: 'warning',
      icon: 'tabler-circle-check',
    }
  if (roleLowerCase === 'author')
    return {
      color: 'success',
      icon: 'tabler-user',
    }
  if (roleLowerCase === 'maintainer')
    return {
      color: 'primary',
      icon: 'tabler-chart-pie-2',
    }
  if (roleLowerCase === 'editor')
    return {
      color: 'info',
      icon: 'tabler-edit',
    }
  if (roleLowerCase === 'admin')
    return {
      color: 'secondary',
      icon: 'tabler-device-laptop',
    }
  
  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const resolveUserStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'open')
    return 'error'
  if (statLowerCase === 'spare part')
    return 'primary'
  if (statLowerCase === 'under observation')
    return 'warning'
  
  return 'grey'
}

const resolveUserTypeVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'cm')
    return 'error'
  if (statLowerCase === 'pm')
    return 'success'
  if (statLowerCase === 'others')
    return 'warning'
}

const resolveUserSupportVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'yes')
    return 'success'
  if (statLowerCase === 'no')
    return 'grey'
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
        <VCard title="Workflow Table">
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
                md="2"
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
                md="2"
                sm="2"
              >
                <AppTextField
                  v-model="selectedWorkOrder"
                  label="Work Order:"
                  type="number"
                  placeholder="0001"
                  persistent-placeholder
                />
              </VCol>
              <!-- 👉 Select Status -->
              <VCol
                cols="12"
                sm="1"
              >
                <AppSelect
                  v-model="selectedSite"
                  label="Site:"
                  :items="sites"
                />
              </VCol>
              <VCol
                cols="12"
                sm="1"
              >
                <AppSelect
                  v-model="selectedType"
                  label="Types:"
                  :items="types"
                />
              </VCol>
              <VCol
                cols="12"
                sm="2"
              >
                <AppSelect
                  v-model="selectedTechnican"
                  label="Technican:"
                  :items="technicans"
                />
              </VCol>
              <VCol
                cols="12"
                sm="1"
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
                  v-model="selectedMb"
                  label="MB:"
                  :items="types"
                />
              </VCol>
              <VCol
                cols="12"
                sm="1"
              >
                <AppSelect
                  v-model="selectedTeam"
                  label="Team:"
                  :items="types"
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
            <!-- Plan -->
            <template #item.plan="{ item }">
              <span class="text-capitalize font-weight-medium">{{ item.raw.currentPlan }}</span>
            </template>

            <!-- Status -->
            <template #item.type="{ item }">
              <VChip
                :color="resolveUserTypeVariant(item.raw.type)"
                size="small"
                label
                class="text-capitalize"
              >
                {{ item.raw.type }}
              </VChip>
            </template>

            <template #item.l2_support="{ item }">
              <VChip
                :color="resolveUserSupportVariant(item.raw.l2_support)"
                size="small"
                label
                class="text-capitalize"
              >
                {{ item.raw.l2_support }}
              </VChip>
            </template>
            
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
        <AddNewUserDrawer v-model:isDialogVisible="isAddNewUserDrawerVisible" />
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
