<script setup></script>

<template>
  <VTooltip>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </VTooltip>
</template>
