<template>
  <div id="heroPage">
    <Landing/>
    <RecentProjects/>
    <!-- <RecentBlogPosts/> -->
    <div class="socials">
      Check more about me, or get it touch with me on:
      <a href="x.com">x.com / twitter</a>
    </div>
  </div>
</template>

<script>
import Landing from '@/components/HeroPage/Landing.vue';
import RecentProjects from '@/components/HeroPage/RecentProjects.vue';

export default {
  name: 'HeroPage',
  components: {
    Landing,
    RecentProjects,
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>


</style>