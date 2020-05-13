<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  props:{
  },
  data () {
    return {

    };
  },
  created(){

  },
  mounted (){
  },
  components: {

  },
  computed: {

  },
  methods: {
  },
  watch: {}
}
</script>

<style>
	@import "./common/reset.css";
	@import "./common/common.css";
  #app {
    font-family: '微软雅黑','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
