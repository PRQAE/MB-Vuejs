<script setup>
import { useSlots } from "vue";

const slots = useSlots();
</script>

<template>
  <VCard>
    <template
      v-for="(slot, index) in Object.keys(slots)"
      :key="index"
      v-slot:[slot]="slotProps"
    >
      <slot :name="slot" :key="index" v-bind="slotProps"></slot>
    </template>
  </VCard>
</template>
