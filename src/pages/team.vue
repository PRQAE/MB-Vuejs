<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import AddNewTeam from '../views/apps/user/AddNewTeam.vue'
import { useUserListStore } from '../views/apps/user/useUserListStore'

const userListStore = useUserListStore()
const searchQuery = ref('')
const name = ref('')
const selectedMb = ref('All')
const selectedTeam = ref('All')

const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])

const paginationMeta = () => {
  return (options, total) => {
    const start = (options.page - 1) * options.itemsPerPage + 1
    const end = Math.min(options.page * options.itemsPerPage, total)
    
    return `Showing ${start} to ${end} of ${total} entries`
  }
}

const mbs=[
  {
    title: 'All',
    value: 'all',
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
    title: 'MB7',
    value: 'mb7',
  },
]

const teams=[
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Team A',
    value: 'team_a',
  },
  {
    title: 'Team B',
    value: 'team_b',
  },
  {
    title: 'Team C',
    value: 'team_c',
  },
  {
    title: 'Team D',
    value: 'team_d',
  },
]

const roles = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Team Member',
    value: 'team_member',
  },
  {
    title: 'Team Leader',
    value: 'team_leader',
  },
  {
    title: 'Team Leader Assistant',
    value: 'team_leader_assistant',
  },
  {
    title: 'Team Leader',
    value: 'team_leader',
  },
]

const pts = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Expired',
    value: 'expired',
  },
]

const pos = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Not PO',
    value: 'not_po',
  },
  {
    title: 'Expired',
    value: 'expired',
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
    title: 'SAR ID',
    key: 'sar_id',
  },
  {
    title: 'NAME',
    key: 'name',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'PHONE NO.',
    key: 'phone_no',
  },
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'PTS',
    key: 'pts',
  },
  {
    title: 'PO',
    key: 'po',
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
      sar_id: '1111',
      name: 'Adam',
      email: 'a@a.com',
      phone_no: '+1112121231',
      id: '1111111',
      pts: 'Active',
      po: 'Active',
    },
    {
      sar_id: '2222',
      name: 'Joe',
      email: 'b@b.com',
      phone_no: '+192398182',
      id: '22222222',
      pts: 'Expired',
      po: 'Expired',
    },
    {
      sar_id: '3333',
      name: 'Grem',
      email: 'rok@gmail.com',
      phone_no: '+12397428',
      id: '333333',
      pts: 'Expired',
      po: 'Active',
    },
  ]
}

watchEffect(fetchUsers)

const resolveTeamVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'expired')
    return 'error'
}

const userListMeta = [
  {
    icon: 'tabler-user',
    color: 'primary',
    title: 'Employees',
    stats: '2',
    subtitle: 'Total Employees',
  },
  {
    icon: 'tabler-user-plus',
    color: 'success',
    title: 'Protection Officer',
    stats: '1',
    subtitle: 'Total PO',
  },
  {
    icon: 'tabler-user-check',
    color: 'error',
    title: 'PTS',
    stats: '1',
    subtitle: 'Expired PTS',
  },
  {
    icon: 'tabler-user-exclamation',
    color: 'warning',
    title: 'No Idea',
    stats: '0',
    subtitle: 'Still no idea',
  },
]

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
                sm="1"
              >
                <AppSelect
                  v-model="selectedMb"
                  label="MB:"
                  :items="mbs"
                />
              </VCol>
              <VCol
                cols="12"
                sm="2"
              >
                <AppSelect
                  v-model="selectedTeam"
                  label="Team:"
                  :items="teams"
                />
              </VCol>
              <VCol
                cols="12"
                sm="2"
              >
                <AppSelect
                  v-model="selectedRole"
                  label="Role:"
                  :items="roles"
                />
              </VCol>
              <VCol
                cols="12"
                sm="2"
              >
                <AppSelect
                  v-model="selectedPTS"
                  label="PTS:"
                  :items="pts"
                />
              </VCol>
              <VCol
                cols="12"
                sm="2"
              >
                <AppSelect
                  v-model="selectedPO"
                  label="PO:"
                  :items="pos"
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
            class="bold-headers text-no-wrap"
            @update:options="options = $event"
          >
            <template #item.pts="{ item }">
              <VChip
                :color="resolveTeamVariant(item.raw.pts)"
                size="small"
                label
                class="text-capitalize"
              >
                {{ item.raw.pts }}
              </VChip>
            </template>
            <template #item.po="{ item }">
              <VChip
                :color="resolveTeamVariant(item.raw.po)"
                size="small"
                label
                class="text-capitalize"
              >
                {{ item.raw.po }}
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
        <AddNewTeam v-model:isDialogVisible="isAddNewUserDrawerVisible" />
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
