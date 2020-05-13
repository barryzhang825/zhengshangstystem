<template>
  <div class="change">
		<div class="modify" v-show="isModify">
			<form class="home-form" id="homeModifyFrom">
				<div class="confom-main">
          <div v-show="isHidden" class="confomml-name upload-demo"><label for="serviceId">id</label>{{serviceId}}</div>
					<div class="confomml-name upload-demo"><label for="serviceTitle">案例分组名称</label><input id="name" name="name" v-model="name" type="text" placeholder="请输入分组名称"></div>
				</div>
				<div class="confom-btn"><button class="change-btn" type="submit" @click="change">确认修改</button></div>
        <div class="confom-btn"><el-button @click="quiteFun" type="info">取消修改</el-button></div>
			</form>
		</div>
   </div>
</template>
<style scoped>

</style>
<script type='ecmascript-6'>
	export default {
    props:{
    },
    data () {
      return {
        upLoadUrl:"http://39.98.80.223:8080/official-website/background-caseGroup/update",
				isModify:true,//是否修改
        serviceId:0,
        name:'',
        isHidden:true,
        selectList:[]
      }
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
      setData(data){  //初始化数据
        //console.log(data.caseGroupName);
        if(data.id){
          this.serviceId=data.id;
          this.name=data.name;
          this.isModify=data.isModify;
        }
      },
      quiteFun(){
        this.isModify=false;
        $("body").css("overflow","auto");
      },
      change(){
				var _this=this;
        //console.log("确认修改");
				$("#homeModifyFrom").validate({
					rules: {
						serviceTitle: "required",
            name:"required"
					},
					messages: {
						serviceTitle: "不能为空！",
            name: "不能为空！"
					},
					submitHandler:function(form) {
            var dataStr={
              //file:_this.oldImg,
              id:_this.serviceId,
              name:_this.name
            }
            //console.log(dataStr);
            _this.$form(_this.upLoadUrl,dataStr).then(res=>{
              var seller=JSON.stringify(res);
              //console.log('结果:'+seller);
              //console.log(res);
              //debugger
              if(res.status==200){
                _this.$message({
                  message: '修改成功!',
                  type: 'success'
                });
                setTimeout(function(){
                  location.reload();
                }, 500);
              }else{
                _this.$message.error(res.data);
                setTimeout(function(){
                  location.reload();
                }, 500);
              }
            }).catch(function (error) {
              //console.log(error);
              _this.$message.error(error);
              setTimeout(function(){
                location.reload();
              }, 500);
              //Message.error('出错！');
            });

					}
				});
			},
      selectFn(e){
        //console.log(e)
        //console.log(e.target.selectedIndex) // 选择项的index索引
        //console.log(e.target.value) // 选择项的value
        this.selectNum=e.target.selectedIndex;
        this.serviceDetail=this.selectList[this.selectNum].detail;
        //console.log(this.selectList[this.selectNum].detail);
      }
    },
    watch: {}
	}
</script>
