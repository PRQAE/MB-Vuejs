<script setup>
import userAvatar from '@images/illustrations/congo-illustration.png'
import TeamBySpeciality from './dashboard/TeamBySpeciality.vue'
import WorkOrderPerSystem from './dashboard/WorkOrderPerSystem.vue'
import { statistics } from '@services/dashboard'

</script>

<template>
  <div>
    <VRow class="mb-5">
      <VCol
        cols="12"
        sm="12"
        md="4"
      >
        <VCard height="100%">
          <div class="d-flex justify-space-between">
            <div style="padding-top: 70px;">
              <VCardItem class="pb-0">
                <VCardTitle class="font-weight-bold">
                  Welcome Back
                </VCardTitle>
              </VCardItem>
              <VCardText class="user-name">
                Adam
              </VCardText>
            </div>
            <div class="pt-6 pr-6">
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
                v-for="(item,index) in statistics"
                :key="index"
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
  </div>
</template>

<style lang="scss" scoped>
.user-name {
  font-size: 20px;
  font-weight: bold;
  color: #00718a;
  padding-bottom: 0px;
}

</style>