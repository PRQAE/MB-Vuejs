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

const mbs = [
  {
    title: 'MB5',
    value: 'MB5',
  },
  {
    title: 'MB6',
    value: 'MB6',
  },
  {
    title: 'MB9',
    value: 'MB9',
  },
]

const responsibleTeams = [
  {
    title: "Team A",
    value: "Team A",
  },
  {
    title: "Team B",
    value: "Team B",
  },
  {
    title: "Team C",
    value: "Team C",
  },
  {
    title: "Team D",
    value: "Team D",
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
    value: 'true',
  },
  {
    title: 'No',
    value: 'false',
  },
]

const sites = [
  {
    title: "41",
    value: "41",
  },
  {
    title: "41A",
    value: "41A",
  },
  {
    title: "41B",
    value: "41B",
  },
  {
    title: "41C",
    value: "41C",
  },
  {
    title: "42",
    value: "42",
  },
  {
    title: "42A",
    value: "42A",
  },
  {
    title: "42B",
    value: "42B",
  },
  {
    title: "42C",
    value: "42C",
  },
  {
    title: "42D",
    value: "42D",
  },
  {
    title: "42E",
    value: "42E",
  },
  {
    title: "43",
    value: "43",
  },
  {
    title: "44",
    value: "44",
  },
  {
    title: "44S",
    value: "44S",
  },
  {
    title: "45",
    value: "45",
  },
  {
    title: "45A",
    value: "45A",
  },
  {
    title: "45B",
    value: "45B",
  },
  {
    title: "45C",
    value: "45C",
  },
  {
    title: "45D",
    value: "45D",
  },
  {
    title: "45E",
    value: "45E",
  },
  {
    title: "45F",
    value: "45F",
  },
  {
    title: "45G",
    value: "45G",
  },
  {
    title: "45H",
    value: "45H",
  },
  {
    title: "45I",
    value: "45I",
  },
  {
    title: "45J",
    value: "45J",
  },
  {
    title: "47",
    value: "47",
  },
  {
    title: "47A",
    value: "47A",
  },
  {
    title: "47B",
    value: "47B",
  },
  {
    title: "47C",
    value: "47C",
  },
  {
    title: "47D",
    value: "47D",
  },
  {
    title: "47E",
    value: "47E",
  },
  {
    title: "47F",
    value: "47F",
  },
  {
    title: "47G",
    value: "47G",
  },
  {
    title: "49",
    value: "49",
  },
  {
    title: "70",
    value: "70",
  },
  {
    title: "70A",
    value: "70A",
  },
  {
    title: "70B",
    value: "70B",
  },
  {
    title: "70C",
    value: "70C",
  },
  {
    title: "70D",
    value: "70D",
  },
  {
    title: "70E",
    value: "70E",
  },
  {
    title: "70F",
    value: "70F",
  },
  {
    title: "70G",
    value: "70G",
  },
  {
    title: "70H",
    value: "70H",
  },
  {
    title: "72",
    value: "72",
  },
  {
    title: "74",
    value: "74",
  },
  {
    title: "74A",
    value: "74A",
  },
  {
    title: "74B",
    value: "74B",
  },
  {
    title: "74C",
    value: "74C",
  },
  {
    title: "74D",
    value: "74D",
  },
  {
    title: "74E",
    value: "74E",
  },
  {
    title: "74F",
    value: "74F",
  },
  {
    title: "74G",
    value: "74G",
  },
  {
    title: "74H",
    value: "74H",
  },
  {
    title: "74I",
    value: "74I",
  },
  {
    title: "74J",
    value: "74J",
  },
  {
    title: "77",
    value: "77",
  },

]
  
const types = [
  {
    title: "PM",
    value: "PM",
  },
  {
    title: "CM",
    value: "CM",
  },
  {
    title: "Others",
    value: "Others",
  },
]
  
  
const status = [
  {
    title: "Done",
    value: "Done",
  },
  {
    title: "Not Done",
    value: "Not Done",
  },
  {
    title: "Open",
    value: "Open",
  },
  {
    title: "Spare Part",
    value: "Spare Part",
  },
  {
    title: "Under Observation",
    value: "Under Observation",
  },
  {
    title: "Closed",
    value: "Closed",
  },
  {
    title: "Unknown",
    value: "Unknown",
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
                :items="sites"
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
