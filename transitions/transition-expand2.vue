<template>
  <transition name="collapse">
     <slot />
  </transition>
</template>


<style lang="scss" scoped>
  .collapse-enter-active,
  .collapse-leave-active{
    transition: .23s;
  }
  .collapse-enter,
  .collapse-leave-to{
    opacity: 0;
    transform: translateY(-10px);
  }
</style>