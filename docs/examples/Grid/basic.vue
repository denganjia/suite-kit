<template>
  <Grid>
    <GridItem>
      <div class="box"></div>
    </GridItem>
  </Grid>
</template>

<script setup lang="ts">
import { Grid, GridItem } from "@suite-kit/grid";
</script>

<style scoped lang="scss">
.box {
  background-color: var(--text-color-light);
  width: 100%;
  height: 32px;
}
</style>
