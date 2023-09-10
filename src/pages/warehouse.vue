<script setup>
import { VDataTableServer } from "vuetify/labs/VDataTable";
import AddNewHouse from "../views/apps/user/AddNewHouse.vue";
import { headers, status } from "@services/warehouse";
import { useWarehouse } from "@composables";
import { PaginationComponent } from "@components/shared";


const {
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
  resolveUserStatusVariant,
  deleteUser,
} = useWarehouse();
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
            <VRow class="overflow-x-auto">
              <!-- 👉 Select Role -->
              <VCol cols="12" sm="2">
                <AppDateTimePicker v-model="selectedDate" label="Date:" />
              </VCol>
              <!-- 👉 Select Plan -->
              <VCol cols="12" sm="2">
                <AppTextField v-model="name" label="Name:" />
              </VCol>
              <!-- 👉 Select Status -->
              <VCol cols="12" sm="2">
                <AppTextField v-model="serial_no" label="Serial Number:" />
              </VCol>
              <VCol cols="12" sm="2">
                <AppTextField v-model="part_no" label="Part Number:" />
              </VCol>
              <VCol cols="12" sm="1">
                <AppTextField v-model="from" label="From:" />
              </VCol>
              <VCol cols="12" sm="2">
                <AppSelect
                  v-model="selectedStatus"
                  label="Status:"
                  :items="status"
                />
              </VCol>
              <VCol cols="12" sm="1">
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
                style="color: rgb(234, 84, 85)"
                @click="deleteUser(item.raw.id)"
              >
                <VIcon icon="tabler-trash" />
              </IconBtn>
            </template>

            <!-- pagination -->
            <template #bottom>
              <VDivider />
              <div
                class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3"
              >
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
        <AddNewHouse v-model:isDialogVisible="isAddNewUserDrawerVisible" />
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
