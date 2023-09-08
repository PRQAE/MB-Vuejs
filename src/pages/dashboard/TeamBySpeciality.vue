<script setup>
const navigationTab = ref('Item One')
const navigationTab2 = ref('Item One')

const signals = [
  {
    avatarColor: 'primary',
    avatarIcon: 'tabler-user-circle',
    title: '-',
    stats: '100%',
    statsColor: 'primary',
  },
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-user-circle',
    title: '-',
    stats: '80%',
    statsColor: 'success',
  },
  {
    avatarColor: 'warning',
    avatarIcon: 'tabler-user-circle',
    title: '-',
    stats: '60%',
    statsColor: 'warning',
  },
  {
    avatarColor: 'error',
    avatarIcon: 'tabler-user-circle',
    title: '-',
    stats: '40%',
    statsColor: 'error',
  },
]

const tabItems = [
  'Signaling',
  'Telecom',
  'Electro',
  'GSM_R',
]

const titleContent = '2 Team Members in Your Team'
</script>

<template>
  <VCard>
    <VCardText class="TeamTitle">
      Team By Speciality
    </VCardText>
    <VCardText class="sub-title">
      {{ titleContent }}
    </VCardText>
    <VTabs v-model="navigationTab">
      <VTab
        v-for="item in tabItems"
        :key="item"
        :value="item"
      >
        {{ item }}
      </VTab>
    </VTabs>

    <!-- tabs content -->
    <VWindow
      v-model="navigationTab"
      style="padding: 0px 30px"
    >
      <VWindowItem
        v-for="item in tabItems"
        :key="item"
        :value="item"
      >
        <VCardText style="padding: 0px 30px 20px 30px">
          <VList class="card-list">
            <VListItem
              v-for="state in signals"
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
      </VWindowItem>
    </VWindow>
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
}

.signaling-list { 
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    border-bottom: 1px dashed lightgrey;
}
</style>