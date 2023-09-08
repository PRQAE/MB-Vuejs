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

const types=[
  {
    title: 'CM',
    value: 'CM',
  },
  {
    title: 'PM',
    value: 'pm',
  },
  {
    title: 'Others',
    value: 'others',
  },
]

const activities=[
  {
    title: 'Indoor',
    value: 'indoor',
  },
  {
    title: 'Outdoor',
    value: 'outdoor',
  },
  {
    title: 'Indoor/Outdoor',
    value: 'both',
  },
]

const status=[
  {
    title: 'Open',
    value: 'open',
  },
  {
    title: 'Under Observation',
    value: 'under_observation',
  },
  {
    title: 'Spare Part',
    value: 'spare_part',
  },
  {
    title: 'Closed',
    value: 'closed',
  },
  {
    title: 'Unknown',
    value: 'unknown',
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

const responsibleTeams = [
  {
    title: 'TeamA',
    value: 'teamA',
  },
  {
    title: 'TeamB',
    value: 'teamB',
  },
  {
    title: 'TeamC',
    value: 'teamc',
  },
  {
    title: 'TeamD',
    value: 'teamd',
  },
]

const cars = [
  {
    title: 'Parado 25|0202',
    value: 'parado_25_0202',
  },
  {
    title: 'Parado 20|1001',
    value: 'parado_20_1001',
  },
  {
    title: 'Fortuner 23|100',
    value: 'fortuner_23_100',
  },
  {
    title: 'Parado 23|111',
    value: 'parado_23_111',
  },
  {
    title: 'Hilux 24|31421',
    value: 'hilux_24_31421',
  },
  {
    title: 'None',
    value: 'none',
  },
]


const l2supports = [
  {
    title: 'Yes',
    value: 'yes',
  },
  {
    title: 'No',
    value: 'no',
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

const sitesList = [
  '41',
  '41A',
  '41B',
  '41C',
  '42',
  '42A',
  '41',
  '41A',
  '41B',
  '41C',
  '42',
  '42A',
  '41',
  '41A',
  '41B',
  '41C',
  '42',
  '42A',
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

            Add new activity to the workflow.
          </span>
        </VCardSubtitle>
        <VForm
          class="mt-4"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <!-- 👉 Company Name -->
            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
                placeholder="mm-dd-yyyy"
                label="Date:"
              />
            </VCol>

            <!-- 👉 Email -->
            <VCol
              cols="12"
              md="6"
            >
              <AppAutocomplete
                label="Site:"
                :items="sitesList"
              />
            </VCol>

            <!-- 👉 Tax ID -->
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.type"
                label="Type:"
                :items="types"
              />
            </VCol>

            <!-- 👉 VAT Number -->
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.activity"
                label="Activity"
                :items="activities"
              />
            </VCol>

            <!-- 👉 Billing Address -->
            <VCol
              cols="12"
              sm="6"
            >
              <AppSelect
                v-model="billingAddress.status"
                label="Status"
                :items="status"
              />
            </VCol>

            <!-- 👉 Contact -->
            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
                v-model="billingAddress.contact"
                label="Time in"
                :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
              />
            </VCol>

            <!-- 👉 Country -->
            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
                v-model="billingAddress.timeout"
                label="Time Out"
                :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
              />
            </VCol>

            <!-- 👉 State -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.description"
                placeholder="P01 Defect"
                label="Description"
              />
            </VCol>

            <!-- 👉 Zip Code -->
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
                v-model="billingAddress.responsibleTeam"
                label="Responsible Team"
                :items="responsibleTeams"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.car"
                label="Car"
                :items="cars"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.l2support"
                label="L2 Support"
                :items="l2supports"
              />
            </VCol>
            <!-- 👉 Submit and Cancel button -->
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
