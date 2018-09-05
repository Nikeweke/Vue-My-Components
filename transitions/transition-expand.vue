<!--

Use like so:
<transition-expand>
  <SomeComponent />
</transition-expand>

-->
<template>
  <transition
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot/>
  </transition>
</template>

<script>
export default {

  // NAME
  name: 'TransitionExpand',

  // PROPS
  props: {
    headToHeight: {
      type: String,
      default: () => ('250px')
    }
  },


  methods: {
    enter(element) {
      const width = getComputedStyle(element).width;

      element.style.width = width;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.style.height = 'auto';

      const height = getComputedStyle(element).height;

      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;

      // Trigger the animation.
      // We use `setTimeout` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      setTimeout(() => {
        element.style.height = this.headToHeight;
      });
    },
    
    afterEnter(element) {
      element.style.height = this.headToHeight;
    },

    leave(element) {
      const height = getComputedStyle(element).height;
      
      element.style.height = height;

      setTimeout(() => {
        element.style.height = 0;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
 .expand-enter-active,
  .expand-leave-active {
    transition: height .4s ease-in-out;
    overflow: hidden;
  }

  .expand-enter,
  .expand-leave-to {
    height: 0;
  }

  * {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>

