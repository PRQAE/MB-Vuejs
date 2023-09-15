<script setup></script>

<template>
  <VMenu>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </VMenu>
</template>
