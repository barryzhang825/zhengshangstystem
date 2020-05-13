<template>
  <div class="user-box">
    <div class="user">
      <div class="user-name">用户名：{{username}}</div>
      <div class="user-logo"><img src="../../static/images/user_boy.jpg" alt="头像"></div>
      <div class="user-btn"><el-button @click="quiteuser" type="primary">切换用户</el-button></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  watch: {

  },
  created() {

  },
  computed: {
    username(){
      return localStorage.getItem("userInfo");
    }
  },
  mounted() {

  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    quiteuser(){
      this.$confirm('是否要退出当前账户', '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem("userInfo");
      	this.$router.push('/login');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消！'
        });
      });

    }
  },
}
</script>

<style scoped>
  .user{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding:20px 0;
  }
  .user-logo{
    width:64px;
    height: 64px;
    margin-right: 20px;
  }
  .user img{
    width:100%;
    height: 100%;
    border-radius: 32px;
  }
</style>
