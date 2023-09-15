<script setup></script>

<template>
  <VChip>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </VChip>
</template>
