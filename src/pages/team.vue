<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import AddNewTeam from '../views/apps/user/AddNewTeam.vue'
import { headers, mbs, teams, roles, pts, pos, userListMeta } from "@services/teams";
import { useTeams } from "@composables";
import { PaginationComponent } from "@components/shared";

const {
    name,
    selectedMb,
    selectedTeam,
    totalUsers,
    users,
    options,
    isAddNewUserDrawerVisible,
    paginationMeta,
    resolveTeamVariant,
    deleteUser,
} = useTeams()

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
                <PaginationComponent v-model="options.page" :items-per-page="options.itemsPerPage" :total-records="totalUsers" />
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
.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>
