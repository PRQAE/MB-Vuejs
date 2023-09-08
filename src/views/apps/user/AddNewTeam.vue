<script setup>
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue'

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

const nationalities=[
  {
    title: 'Saudi',
    value: 'saudi',
  },
  {
    title: 'Pakistani',
    value: 'pakistani',
  },
  {
    title: 'Indian',
    value: 'indian',
  },
  {
    title: 'Filipino',
    value: 'Filipino',
  },
]

const roles = [
  {
    title: 'Team Member',
    value: 'team_member',
  },
  {
    title: 'Shift Leader',
    value: 'shift leader',
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
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Expired',
    value: 'expired',
  },
  {
    title: 'Not PO',
    value: 'not_po',
  },
]

const teams=[
  {
    title: 'Leaders',
    value: 'leaders',
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

const mbs = [
  {
    title: 'MB1',
    value: 'mb1',
  },
  {
    title: 'MB2',
    value: 'mb2',
  },
  {
    title: 'MB3',
    value: 'mb3',
  },
]

const specializations = [
  {
    title: 'Signaling',
    value: 'signaling',
  },
  {
    title: 'Telecoms',
    value: 'telecoms',
  },
  {
    title: 'Signaling & telecoms',
    value: 'both',
  },
  {
    title: 'None',
    value: 'none',
  },
]

const jacketSizes = [
  {
    title: 'S',
    value: 's',
  },
  {
    title: 'M',
    value: 'm',
  },
  {
    title: 'L',
    value: 'l',
  },
  {
    title: 'XL',
    value: 'xl',
  },
  {
    title: 'XXL',
    value: 'xxl',
  },
  {
    title: '3XL',
    value: '3xl',
  },
  {
    title: '4XL',
    value: '4xl',
  },
  {
    title: '5XL',
    value: '5xl',
  },
]

const trouserSizes = [
  {
    title: 'S',
    value: 's',
  },
  {
    title: 'M',
    value: 'm',
  },
  {
    title: 'L',
    value: 'l',
  },
  {
    title: 'XL',
    value: 'xl',
  },
  {
    title: 'XXL',
    value: 'xxl',
  },
  {
    title: '3XL',
    value: '3xl',
  },
  {
    title: '4XL',
    value: '4xl',
  },
  {
    title: '5XL',
    value: '5xl',
  },
]

const shoesSizes = [
  {
    title: '38',
    value: '38',
  },
  {
    title: '39',
    value: '39',
  },
  {
    title: '40',
    value: '40',
  },
  {
    title: '41',
    value: '41',
  },
  {
    title: '42',
    value: '42',
  },
  {
    title: '43',
    value: '43',
  },
  {
    title: '44',
    value: '44',
  },
  {
    title: '45',
    value: '45',
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
            Add new team member.
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
                v-model="billingAddress.manufacturer"
                label="SAR ID"
                placeholder="0001"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
                placeholder="mm-dd-yyyy"
                label="Hiring Date:"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                id="workorder"
                v-model="billingAddress.national_id"
                label="National ID"
                type="number"
                placeholder="National ID"
                persistent-placeholder
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
                v-model="billingAddress.drivingLicenseExpiring"
              
                placeholder="mm-dd-yyyy"
                label="Driving License Expiring"
              />
            </VCol>

            <!-- 👉 Billing Address -->
            <VCol
              cols="12"
              sm="6"
            >
              <AppTextField
                v-model="billingAddress.fullName"
                label="Full Name"
                placeholder="Full Name"
                persistent-placeholder
              />
            </VCol>

            <!-- 👉 Contact -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.email"
                label="Email"
                placeholder="xxxx@xxxx.com"
                persistent-placeholder
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.phone_number"
                label="Phone Number"
                placeholder="+9665xxxxxxxx"
                persistent-placeholder
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.emergency_phone_number"
                label="Emergency Phone Number"
                placeholder="+9665xxxxxxxx"
                persistent-placeholder
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.nationality"
                label="Nationality"
                :items="nationalities"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.role"
                label="Role"
                :items="roles"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.pts"
                label="PTS"
                :items="pts"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
                placeholder="mm-dd-yyyy"
                label="PTS Expiring Date:"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.po"
                label="PO"
                :items="pos"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
                placeholder="mm-dd-yyyy"
                label="POS Expiring Date:"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.team"
                label="Team"
                :items="teams"
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
                v-model="billingAddress.specialization"
                label="Specialization"
                :items="specializations"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.jacketSize"
                label="Jacket Size"
                :items="jacketSizes"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.trouserSize"
                label="Trouser Size"
                :items="trouserSizes"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="billingAddress.shoesSize"
                label="Shoes Size"
                :items="shoesSizes"
              />
            </VCol>
            <VCol>
              <AppTextarea label="Remarks" />
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
