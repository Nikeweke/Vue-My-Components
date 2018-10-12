<template>
  <transition name="step" mode="out-in">
    <slot />
  </transition>
</template>



<style lang="scss" scoped>
  /* step change animation*/
  .step-enter-active,
  .step-leave-active{
    transition: .23s;
  }
  .step-enter,
  .step-leave-to{
    opacity: 0;
    transform: translateX(10%);
  }
  .step-leave-to{
    transform: translateX(-10%);
  }
</style>
