<script setup>
import userAvatar from '@images/illustrations/congo-illustration.png'
import TeamBySpeciality from './dashboard/TeamBySpeciality.vue'
import WorkOrderPerSystem from './dashboard/WorkOrderPerSystem.vue'

const statistics = [
  {
    title: 'Open',
    stats: '-',
    icon: 'tabler-alert-octagon',
    color: 'error',
  },
  {
    title: 'Spare Part',
    stats: '-',
    icon: 'tabler-box',
    color: 'info',
  },
  {
    title: 'Under Observation',
    stats: '-',
    icon: 'tabler-eye-check',
    color: 'warning',
  },
  {
    title: 'Closed',
    stats: '-',
    icon: 'tabler-checks',
    color: 'success',
  },
]
</script>

<template>
  <div>
    <VRow class="mb-5">
      <VCol
        cols="12"
        sm="12"
        md="4"
      >
        <VCard>
          <div class="d-flex justify-space-between">
            <div style="padding-top: 70px;">
              <VCardItem style="padding-bottom: 0px">
                <VCardTitle style="font-weight: bold;">
                  Welcome Back
                </VCardTitle>
              </VCardItem>
              <VCardText class="user-name">
                Adam
              </VCardText>
            </div>
            <div style="padding: 24px 24px 0px 0px;">
              <VImg
                width="128"
                height="140"
                :src="userAvatar"
              />
            </div>
          </div>
        </VCard>
      </VCol>
      
      <VCol
        cols="12"
        sm="12"
        md="8"
      >
        <VCard title="Statistics">
          <VCardText>
            <VRow style="margin-top: 10px;">
              <VCol
                v-for="item in statistics"
                :key="item.title"
                cols="6"
                md="3"
              >
                <div class="d-flex">
                  <VAvatar
                    :color="item.color"
                    variant="tonal"
                    size="42"
                    class="me-3"
                  >
                    <VIcon :icon="item.icon" />
                  </VAvatar>

                  <div class="d-flex flex-column">
                    <span class="text-h5 font-weight-medium">{{ item.stats }}</span>
                    <span class="text-sm">
                      {{ item.title }}
                    </span>
                  </div>
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow class="mb-5">
      <VCol
        cols="12"
        md="8"
        sm="12"
      >
        <TeamBySpeciality />
      </VCol>
      <VCol>
        <WorkOrderPerSystem />
      </VCol>
    </VRow>

    <!--
      <VCard
      class="mb-6"
      title="Kick start your project 🚀"
      >
      <VCardText>All the best for your new project.</VCardText>
      <VCardText>
      Please make sure to read our <a
      href="https://demos.pixinvent.com/vuexy-vuejs-admin-template/documentation/"
      target="_blank"
      rel="noopener noreferrer"
      class="text-decoration-none"
      >
      Template Documentation
      </a> to understand where to go from here and how to use our template.
      </VCardText>
      </VCard>

      <VCard title="Want to integrate JWT? 🔒">
      <VCardText>We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.</VCardText>
      <VCardText>Please read our  JWT Documentation to get more out of JWT authentication.</VCardText>
      </VCard> 
    -->
  </div>
</template>


<style lang="scss" scoped>
.user-name {
  font-size: 20px;
  font-weight: bold;
  color: #00718a;
  padding-bottom: 0px;
}

.rounded-pill {
    border-radius: 50rem !important;
}

.bg-label-danger {
    background-color: #fce5e6 !important;
    color: #ea5455 !important;
}
</style>