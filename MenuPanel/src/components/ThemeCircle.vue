<template>
  <button class="theme-btn"></button>
</template>

<script>
export default {
  props: {
    selected,
  },
};
</script>

<style scoped>
.theme-btn {
  height: 2rem;
  width: 2rem;
  border: none;
  border-radius: 50%;
  margin: 3px;
}

.theme-btn:focus {
  border: none;
  outline: none;
}
.selected {
  border: 3px solid rgb(0, 0, 0);
}
</style>
