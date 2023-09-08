<script setup>
const navigationTab = ref('Item One')
const navigationTab2 = ref('Item One')

const systems = [
  {
    avatarColor: 'primary',
    avatarIcon: 'tabler-traffic-lights',
    title: '-',
    stats: '64%',
    statsColor: 'primary',
  },
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-battery-automotive',
    title: '-',
    stats: '21%',
    statsColor: 'success',
  },
  {
    avatarColor: 'warning',
    avatarIcon: 'tabler-network',
    title: '-',
    stats: '10%',
    statsColor: 'warning',
  },
  {
    avatarColor: 'error',
    avatarIcon: 'tabler-building-broadcast-tower',
    title: '-',
    stats: '5%',
    statsColor: 'error',
  },
]

const titleContent = 'Based on Database'
</script>

<template>
  <VCard>
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
          v-for="state in systems"
          :key="state.title"
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
  </VCard>
</template>

<style lang="scss" scoped>
.TeamTitle {
    font-size: 1.125rem;
    font-weight: bold;
    padding-bottom: 0px;
}

.sub-title {
    font-size: 0.8125rem;
    padding-bottom: 10px;
    border-bottom: 1px dashed lightgrey;
    padding-bottom: 48px;
}

.signaling-list { 
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    border-bottom: 1px dashed lightgrey;
}
</style>
