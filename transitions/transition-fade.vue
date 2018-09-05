<!--

Use like so:
<transition-fade>
  <SomeComponent />
</transition-fade>

-->
<template>
  <transition name="fade" mode="out-in">
    <slot />
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>

