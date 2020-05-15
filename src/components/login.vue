<template>
  <div class="login-container">
    <div class="main">
      <div class="logo-left">
        <img src="../../static/images/logo_left.png" alt="登陆">
      </div>
      <div class="login-box">
        <div class="login-logo"><img src="../../static/images/logo.png" alt="公司logo"></div>
        <!-- <div class="login-title">登陆</div> -->
        <!-- <div class="login-from" v-loads='true'> -->
        <div class="login-from">
          <form class="cmxform" id="loginFrom">
            <div class="confom-main">
              <div class="confomml-name"><img src="../../static/images/person.png" alt=""><input id="username" name="username" v-model="username" type="text" placeholder="请输入登录名"></div>
              <div class="confomml-name"><img src="../../static/images/lock.png" alt=""><input id="password" name="password" type="password" v-model="password" placeholder="请输入密码"></div>
            </div>
            <div class="confom-btn"><button type="submit" @click="contactGet">登录</button></div>
            <div class="login-bottom">
              <div class="auto-login"><el-checkbox v-model="autoLogin" @change="handleCheckedCitiesChange">自动登录</el-checkbox></div>
              <div class="">忘记密码</div>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Login',
    components: {

    },
    data() {
      return {
        username: '',
        password: '',
        autoLogin:true
      }
    },
    watch: {

    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    computed: {
      getStutas(){
        return this.autoLogin;
      }
    },
    mounted() {
      //console.log(this.getStutas);
      var useName=localStorage.getItem("userInfo");
      var password=localStorage.getItem("password");
      //console.log(useName,password);
      if(this.getStutas&&useName&&password){
        this.username=useName;
        this.password=password;
      }
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      handleCheckedCitiesChange(val){
        //console.log(val);
        var useName=localStorage.getItem("userInfo");
        var password=localStorage.getItem("password");
        if(val&&useName&&password){
          this.username=useName;
          this.password=password;
        }else{
          this.username='';
          this.password='';
        }
      },
      contactGet() {
        var _this=this;
        $("#loginFrom").validate({
          rules: {
            username: "required",
            password:{
              required: true,
            }
          },
          messages: {
            username: "不能为空！",
            password:{
              required: "不能为空！"
            }
          },
          submitHandler:function(form) {
            var dataStr={
              userName:_this.username,
              password:_this.password
            }
            //console.log(dataStr);
            axios({
              method:'post',
              url:'https://www.zhengshangwl.com/background-login/toLogin',
              data:dataStr,
              headers:{'Content-Type': 'application/x-www-form-urlencoded'},
              transformRequest: function(obj) {
                var str = [];
                for(var p in obj){
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
              }
            }).then((res)=>{
              //console.log(res);
              if(res.data=="登陆成功"){
                _this.$message({
                  message: '登录成功！',
                  type: 'success'
                });
                setTimeout(function(){
                  _this.$router.push('/ourService');
                  /* _this.$router.push({
                    path:'/home',
                    query:{
                      userName:_this.username
                    }
                  }); */
                  //console.log(_this.username);
                  localStorage.setItem("userInfo",_this.username);
                  localStorage.setItem("password",_this.password);
                }, 1500);
              }else{
                _this.$message.error(res.data);
                setTimeout(function(){
                  location.reload();
                }, 1500);
              }

            }).catch(function (error) {
              ////console.log(error);
              _this.$message.error(error);
              setTimeout(function(){
                location.reload();
              }, 1500);
            });
          }
        });
        //this.$refs.upload.submit();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-container{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../static/images/logo_bg0.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .main{
    width: 1400px;
    border-radius: 50px;
    box-shadow: 0 0 30px #ccc;
  }
  .logo-left{
    width: 700px;
    height: 720px;
  }
  .logo-left img{
    width: 700px;
    height: 720px;
  }
  .login-box{
    width: 700px;
    height: 720px;
    background-color: #fff;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }
  .login-logo{
    margin: 100px 0 60px 0;
    display: flex;
    justify-content: center;
  }
  .login-container,.login-from,.main{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #loginFrom{
    width: 460px;
  }
  .confomml-name img{
    width: 20px;
    height: auto;
    vertical-align: middle;
    margin-right: 20px;
  }
  input{
    width: calc(100% - 50px);
    height: 60px;
    font-size: 18px;
    line-height: 60px;
    padding: 0;
    border: none;

  }
  input:focus{
    border: none;
    outline: none;
  }
  .confomml-name{
    margin-bottom: 10px;
    position: relative;
    background-color: #fff;
    padding:0 0 0 0;
    border-bottom: 1px solid #eee;
  }
  .confomml-name >>>label.error{
    position: absolute;
    right: 0px;
    bottom: -22px;
    color: #f00;
    z-index: 10;
  }
  .login-title{
    text-align: center;
    line-height: 48px;
    font-size: 32px;
    font-weight: bold;
    margin:0 0 30px 0;
    color: #fff;
  }
  .confom-btn{
    margin: 40px 0;
  }
  .confom-btn button{
    width: 100%;
    color: #fff;
    font-size: 24px;
    line-height: 56px;
    border-radius: 8px;
    background-color: #EC7933;
    outline: none;
    border: none;
  }
  .login-bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
