<script setup></script>

<template>
  <VBreadcrumbs>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </VBreadcrumbs>
</template>
