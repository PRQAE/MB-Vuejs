<script setup></script>

<template>
  <VBtn>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </VBtn>
</template>
