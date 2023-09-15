<script setup></script>

<template>
  <VAvatar>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </VAvatar>
</template>
