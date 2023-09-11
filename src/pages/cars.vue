<script setup>
import { VDataTableServer } from "vuetify/labs/VDataTable";
import AddNewCar from "../views/apps/user/AddNewCar.vue";
import { useCars } from "@composables";
import { headers, status, manufactures, mbs, userListMeta,  } from "@services/cars";
import { PaginationComponent } from "@components/shared";

const {
  selectedManufacturer,
  selectedStatus,
  selectedMb,
  totalUsers,
  users,
  selectedWorkOrder,
  options,
  isAddNewUserDrawerVisible,
  paginationMeta,
  resolveUserStatusVariant,
  deleteUser,
} = useCars();

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
                <span
                  :class="meta.percentage > 0 ? 'text-success' : 'text-error'"
                >
                  {{ meta.percentage > 0 ? "+" : "" }}
                  {{ meta.percentage }}</span
                >
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
              <VCol cols="12" sm="3">
                <AppSelect v-model="selectedMb" label="MB:" :items="mbs" />
              </VCol>
              <VCol cols="12" sm="3">
                <AppSelect
                  v-model="selectedManufacturer"
                  label="Manufacturer:"
                  :items="manufactures"
                />
              </VCol>
              <VCol cols="12" sm="3">
                <AppTextField
                  id="workorder"
                  v-model="selectedWorkOrder"
                  label="Plate Number:"
                  type="number"
                  placeholder="0001"
                />
              </VCol>
              <VCol cols="12" sm="3">
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
        <AddNewCar v-model:isDialogVisible="isAddNewUserDrawerVisible" />
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
