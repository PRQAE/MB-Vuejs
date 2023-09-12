<script setup>
import { VDataTableServer } from "vuetify/labs/VDataTable"
import AddNewUserDrawer from "../views/apps/user/AddNewUserDrawer.vue"
import { headers, sites, types, technicans, status } from "@services/workflow"
import { useWorkflow } from "@composables"
import { PaginationComponent } from "@components/shared"
import { teams } from "@/services/workflow"
import { mbs } from "@/services/cars"

const {
  selectedDate,
  selectedSite,
  selectedType,
  selectedTechnican,
  selectedStatus,
  selectedMb,
  selectedTeam,
  totalUsers,
  users,
  selectedWorkOrder,
  options,
  isAddNewUserDrawerVisible,
  paginationMeta,
  resolveUserStatusVariant,
  resolveUserTypeVariant,
  resolveUserSupportVariant,
  deleteUser,
} = useWorkflow()
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard title="Workflow Table">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow class="mt-3 justify-end">
              <AppBtn
                prepend-icon="tabler-plus"
                @click="isAddNewUserDrawerVisible = true"
              >
                Add New Record
              </AppBtn>
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
                  :config="{ mode: 'range' }"
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
                  :items="mbs"
                />
              </VCol>
              <VCol
                cols="12"
                sm="1"
              >
                <AppSelect
                  v-model="selectedTeam"
                  label="Team:"
                  :items="teams"
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
                  style="width: 6.25rem"
                  @update:model-value="
                    options.itemsPerPage = parseInt($event, 10)
                  "
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
              <span class="text-capitalize font-weight-medium">{{
                item.raw.currentPlan
              }}</span>
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
                style="color: rgb(234, 84, 85)"
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
                <PaginationComponent
                  v-model="options.page"
                  :items-per-page="options.itemsPerPage"
                  :total-records="totalUsers"
                />
              </div>
            </template>
          </VDataTableServer>
          <!-- SECTION -->
        </VCard>

        <!-- 👉 Add New User -->
        <AddNewUserDrawer v-model:isDialogVisible="isAddNewUserDrawerVisible" />
        <!-- @user-data="addNewUser" -->
      </VCol>
    </VRow>
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
