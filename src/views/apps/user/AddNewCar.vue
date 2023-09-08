<script setup>
const props = defineProps({
  billingAddress: {
    type: Object,
    required: false,
    default: () => ({
      companyName: '',
      billingEmail: '',
      vatNumber: '',
      address: '',
      contact: '',
      country: null,
      state: '',
      zipCode: null,
      type: '',
      date: '',
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

const manufacturers=[
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

const models = [
  {
    title: 'Parado',
    value: 'parado',
  },
  {
    title: 'Fortuner',
    value: 'fortuner',
  },
  {
    title: 'Hilux',
    value: 'hilux',
  },
  {
    title: 'Shas',
    value: 'shas',
  },
  {
    title: 'DMax',
    value: 'dmax',
  },
]

const status=[
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

const billingAddress = ref(structuredClone(toRaw(props.billingAddress)))

const resetForm = () => {
  emit('update:isDialogVisible', false)
  billingAddress.value = structuredClone(toRaw(props.billingAddress))
}

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('submit', billingAddress.value)
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
      v-if="props.billingAddress"
      class="pa-sm-8 pa-5"
    >
      <!-- 👉 Title -->
      <VCardItem>
        <VCardTitle class="text-h4 text-center">
          {{ props.billingAddress.address ? 'Edit' : 'Add New' }} Record
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
              <AppSelect
                v-model="billingAddress.manufacturer"
                label="Manufacturer"
                :items="manufacturers"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.model"
                label="Model"
                :items="models"
              />
            </VCol>

            <VCol
              cols="12"
              md="12    "
            >
              <AppTextField
                id="workorder"
                v-model="billingAddress.year"
                label="Year"
                type="number"
                placeholder="2023"
                persistent-placeholder
              />
            </VCol>

            <!-- 👉 Billing Address -->
            <VCol
              cols="12"
              sm="6"
            >
              <AppTextField
                id="workorder"
                v-model="billingAddress.plateLetter"
                label="Plate Letters"
                placeholder="ABC"
                persistent-placeholder
              />
            </VCol>

            <!-- 👉 Contact -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                id="workorder"
                v-model="billingAddress.plateNumber"
                label="Plate Numbers"
                type="number"
                placeholder="0001"
                persistent-placeholder
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.mb"
                label="MB"
                :items="mbs"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.status"
                label="Status"
                :items="status"
              />
            </VCol>
            <VCol>
              <AppTextarea label="Remark" />
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
