<script setup></script>

<template>
  <VBadge>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </VBadge>>
</template>
