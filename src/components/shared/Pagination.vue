<script setup>
const props = defineProps({
  totalRecords: {
    type: Number,
    default: 0,
  },
  itemsPerPage: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <VPagination
    :length="Math.ceil(totalRecords / itemsPerPage)"
    :total-visible="
      $vuetify.display.xs ? 1 : Math.ceil(totalRecords / itemsPerPage)
    "
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
    <template #prev="slotProps">
      <AppBtn variant="tonal" color="default" v-bind="slotProps" :icon="false">
        Previous
      </AppBtn>
    </template>

    <template #next="slotProps">
      <AppBtn variant="tonal" color="default" v-bind="slotProps" :icon="false">
        Next
      </AppBtn>
    </template>
  </VPagination>
</template>
