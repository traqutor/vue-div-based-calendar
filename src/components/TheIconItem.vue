<template>
  <div class="icon--item">
    <slot></slot>
  </div>
</template>

<style scoped>
.icon--item {
  display: flex;
  place-items: center;
  place-content: center;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: 50px;
  height: 50px;
}
</style>
