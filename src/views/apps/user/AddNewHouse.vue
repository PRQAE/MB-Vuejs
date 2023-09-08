<script setup>
const props = defineProps({
  houseInfo: {
    type: Object,
    required: false,
    default: () => ({
      serialNumber: '',
      partNumber: '',
      name: '',
      from: '',
      method: '',
      date: null,
      rackNumber: '',
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'submit',
])

const delivery_methods = [
  {
    title: 'Internal Driver',
    value: 'itnernal_driver',
  },
  {
    title: 'DHL',
    value: 'dhl',
  },
  {
    title: 'SPL',
    value: 'spl',
  },
  {
    title: 'Other',
    value: 'other',
  },
]

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

const mbs = [
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

const houseInfo = ref(structuredClone(toRaw(props.houseInfo)))

const resetForm = () => {
  emit('update:isDialogVisible', false)
  houseInfo.value = structuredClone(toRaw(props.houseInfo))
}

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('submit', houseInfo.value)
}

const selectedAddress = ref('Home')

const addressTypes = [
  {
    icon: {
      icon: 'custom-home',
      size: '40',
    },
    title: 'Home',
    desc: 'Delivery Time (7am - 9pm)',
    value: 'Home',
  },
  {
    icon: {
      icon: 'custom-office',
      size: '40',
    },
    title: 'Office',
    desc: 'Delivery Time (10am - 6pm)',
    value: 'Office',
  },
]
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 800 "
    :model-value="props.isDialogVisible"
    @update:model-value="val => $emit('update:isDialogVisible', val)"
  >
    <!-- 👉 Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <VCard
      v-if="props.houseInfo"
      class="pa-sm-8 pa-5"
    >
      <!-- 👉 Title -->
      <VCardItem>
        <VCardTitle class="text-h4 text-center">
          {{ props.houseInfo.address ? 'Edit' : 'Add New' }} Record
        </VCardTitle>
      </VCardItem>

      <VCardText>
        <!-- 👉 Subtitle -->
        <VCardSubtitle class="text-center mb-6">
          <span class="text-base">
            Add new car.
          </span>
        </VCardSubtitle>
        <VForm
          class="mt-4"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="houseInfo.serialNumber"
                label="Serial Number"
                placeholder="Serial Number"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="houseInfo.partNumber"
                label="Part Number"
                placeholder="Part Number"
              />
            </VCol>

            <VCol
              cols="12"
              md="12    "
            >
              <AppTextField
                id="workorder"
                v-model="houseInfo.name"
                label="Name"
                placeholder="Analog Board"
                persistent-placeholder
              />
            </VCol>

            <!-- 👉 Billing Address -->
            <VCol
              cols="12"
              sm="6"
            >
              <AppTextField
                v-model="houseInfo.plateLetter"
                label="Received By"
                placeholder="Received By"
                persistent-placeholder
              />
            </VCol>

            <!-- 👉 Contact -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="houseInfo.from"
                label="From"
                placeholder="HQ"
                persistent-placeholder
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="houseInfo.method"
                label="Delivery Method"
                :items="delivery_methods"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="houseInfo.status"
                label="Status"
                :items="status"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
                v-model="houseInfo.date"
                placeholder="mm-dd-yyyy"
                label="Date:"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="houseInfo.rackNumber"
                placeholder="Rack Number"
                label="Rack:"
              />
            </VCol>
            <VCol>
              <AppTextarea label="Comments" />
            </VCol>
            <VCol
              cols="12"
              class="text-center"
            >
              <VBtn
                type="submit"
                class="me-3"
              >
                Add
              </VBtn>

              <VBtn
                variant="tonal"
                color="secondary"
                @click="resetForm"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
