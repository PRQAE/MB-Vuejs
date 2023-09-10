<script setup>
import { signals, tabItems } from "@services/dashboard";
import { useDashboard } from "@composables";
import { BaseCard } from '@components'

const { navigationTab, navigationTab2, titleContent } = useDashboard();
</script>

<template>
  <BaseCard>
    <VCardText class="TeamTitle"> Team By Speciality </VCardText>
    <VCardText class="sub-title">
      {{ titleContent }}
    </VCardText>
    <VTabs v-model="navigationTab">
      <VTab v-for="(item,index) in tabItems" :key="index" :value="item">
        {{ item }}
      </VTab>
    </VTabs>

    <!-- tabs content -->
    <VWindow v-model="navigationTab" style="padding: 0px 30px">
      <VWindowItem v-for="item in tabItems" :key="item" :value="item">
        <VCardText style="padding: 0px 30px 20px 30px">
          <VList class="card-list">
            <VListItem
              v-for="(state,index) in signals"
              :key="index"
              class="signaling-list"
            >
              <template #prepend>
                <VAvatar
                  :color="state.avatarColor"
                  variant="tonal"
                  size="40"
                  rounded
                >
                  <VIcon :icon="state.avatarIcon" />
                </VAvatar>
              </template>

              <VListItemTitle class="font-weight-medium">
                {{ state.title }}
              </VListItemTitle>

              <template #append>
                <span :class="`text-${state.statsColor}`">{{
                  state.stats
                }}</span>
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VWindowItem>
    </VWindow>
  </BaseCard>
</template>

<style lang="scss" scoped>
@import '_dashboard.scss';
.sub-title {
  font-size: 0.8125rem;
  padding-bottom: 10px;
}

</style>
