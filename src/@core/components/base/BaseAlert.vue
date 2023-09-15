<script setup></script>

<template>
  <VAlert>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </VAlert>>
</template>
