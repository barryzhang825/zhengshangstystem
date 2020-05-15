<template>
  <div class="change">
		<div class="modify" v-show="isModify">
			<form class="home-form" id="homeModifyFrom">
				<div class="confom-main">
          <div class="confomml-name upload-demo ">
            <label for="imageGroup">图片分组</label>
            <select name="imageGroup" id="imageGroup" v-model="imageGroup" @change="selectFn($event)">
              <option value="small">small</option>
              <option value="big">big</option>
            </select>
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
            :data="getfileData"
            ref="upload"
            :auto-upload="false"
            >
            <label>添加图片</label>
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
				</div>
				<div class="confom-btn"><button class="change-btn" type="submit" @click="change">确认添加</button></div>
        <div class="confom-btn"><el-button @click="quiteFun" type="info">取消添加</el-button></div>
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
        upLoadUrl:"https://www.zhengshangwl.com/background-companyImage/add",
				isModify:true,//是否添加
        oldImg:'',
        isSelect:0,  //选照片为1，不选照片为0
        isHidden:true,
        imageGroup:'small'
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
          imageGroup:'small'
        }
        return data;
      }
    },
    methods: {
      addData(data){
        this.isHidden=data;
      },
      beyondNum(){
        this.$message.error('只能上传一个图片');
      },
      onchange(file){
        var _this=this;
        _this.isSelect=1;
        if(file.response){
          if(file.response==='添加成功'){
          	_this.$message({
          		message: '添加成功!',
          		type: 'success'
          	});
            setTimeout(function(){
              location.reload();
            }, 500);
          }else{
          	_this.$message.error(file.response);
            setTimeout(function(){
              location.reload();
            }, 500);
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
        setTimeout(function(){
        	location.reload();
        },0);
      },
      change(){
				var _this=this;
				if(_this.isSelect==0){
					_this.$message.error("请上传图片！");
				}else{
					//debugger
          _this.getfileData.imageGroup=_this.imageGroup;
          console.log(_this.getfileData.imageGroup);
					_this.$refs.upload.submit();
				}
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
