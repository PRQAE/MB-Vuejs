<script setup>
import { systems } from "@services/dashboard";
import { useDashboard } from "@composables";
import { BaseCard } from '@components'

const { navigationTab, navigationTab2 } = useDashboard();
const titleContent = 'Based on Database'

</script>

<template>
  <BaseCard>
    <VCardText class="TeamTitle">
      Work Order per System
    </VCardText>
    <VCardText class="sub-title">
      {{ titleContent }}
    </VCardText>

    <!-- tabs content -->
    <VCardText style="padding: 10px 30px 20px 30px">
      <VList class="card-list">
        <VListItem
          v-for="(state, index) in systems"
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
            <span :class="`text-${state.statsColor}`">{{ state.stats }}</span>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </BaseCard>
</template>

<style lang="scss" scoped>
@import '_dashboard.scss';
.sub-title {
    font-size: 0.8125rem;
    padding-bottom: 10px;
    border-bottom: 1px dashed lightgrey;
    padding-bottom: 48px;
}

</style>
