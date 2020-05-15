<template>
  <div class="change">
		<div class="modify" v-show="isModify">
			<form class="home-form" id="homeModifyFrom">
				<div class="confom-main">
          <div v-show="isHidden" class="confomml-name upload-demo"><label for="serviceId">id</label>{{serviceId}}</div>
          <div class="confomml-name upload-demo ">
            <label for="imageGroup">图片分组</label>
            <select name="imageGroup" id="imageGroup" v-model="imageGroup" @change="selectFn($event)">
              <option value="small">small</option>
              <option value="big">big</option>
            </select>
          </div>
          <div class="confomml-name upload-demo old-img-box">
            <label for="serviceImg">图片</label>
            <img class="old-img" :src="oldImg" alt="">
          </div>
          <el-upload
            class="upload-demo"
            :action="upLoadUrl"
            :limit="1"
            list-type="picture"
            accept="image/*"
            :on-exceed="beyondNum"
            :on-change="onchange"
            :on-remove="onRemove"
            :on-success="onSuccess"
            ref="upload"
            :data="getfileData"
            :auto-upload="false"
            >
            <label>修改图片</label>
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
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
        upLoadUrl:'https://www.zhengshangwl.com/background-companyImage/update',
        //upLoadUrl:'https://www.zhengshangwl.com/background-companyImage/update',
				isModify:true,//是否修改
        oldImg:'',
        serviceId:0,
        isSelect:0,  //选照片为1，不选照片为0
        isHidden:true,
        imageGroup:''
      }
    },
    created(){

    },
    mounted (){

    },
    components: {

    },
    computed: {
      getfileData(){
        var data={
          id:0,
          imageGroup:''
        }
        return data;
      }
    },
    methods: {
      setData(data){  //初始化数据
        //console.log(data);
        if(data.id){
          this.serviceId=data.id;
          this.oldImg=data.file;
          this.imageGroup=data.imageGroup;
          this.isModify=data.isModify;
        }
      },
      beyondNum(){
        this.$message.error('只能上传一个图片');
      },
      onchange(file){
        //console.log(file);
        var _this=this;
        _this.isSelect=1;
        if(file.response){
          if(file.response==='修改成功'){
          	_this.$message({
          		message: '修改成功',
          		type: 'success'
          	});
            setTimeout(function(){
              location.reload();
            }, 500);
          }else{
          	_this.$message.error(file.response);
          }
        }

      },
      onRemove(file){
        //console.log(file);
        this.isSelect=0;
      },
      onSuccess(response, file){
        //console.log(response, file);
      },
      quiteFun(){
        this.isModify=false;
        $("body").css("overflow","auto");
      },
      change(){
				var _this=this;
        //console.log("确认修改")
				$("#homeModifyFrom").validate({
					submitHandler:function(form) {
            _this.getfileData.id=_this.serviceId;
            _this.getfileData.imageGroup=_this.imageGroup;
            //console.log(_this.getfileData);
            //console.log(_this.oldImg,_this.isSelect);
            //debugger
            if(_this.isSelect==1){
              _this.$refs.upload.submit();
            }else{
              var dataStr={
                 //file:_this.oldImg,
                 id:_this.serviceId,
                 imageGroup:_this.imageGroup
               }
               //console.log(dataStr);
              _this.$form(_this.upLoadUrl,dataStr).then(res=>{
                var seller=JSON.stringify(res);
                //console.log('结果:'+seller);
                 //console.log(res);
                 //debugger
                 if(res.data=="修改成功"){
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
               });
              //_this.$message.error("请修改图片上传！");
            }

					}
				});
			},
			selectFn(e){
			  //console.log(e)
			  //console.log(e.target.selectedIndex) // 选择项的index索引
			  //console.log(e.target.value) // 选择项的value
			  if(e.target.value=="small"){
			    this.imageGroup="small";
			  }else{
			    this.imageGroup="big";
			  }
			}
    },
    watch: {}
	}
</script>
