<template>
  <div class="change">
		<div class="modify" v-show="isModify">
			<form class="home-form" id="homeModifyFrom">
				<div class="confom-main">
					<div class="confomml-name upload-demo ">
            <label for="serviceTitle">案例标题</label>
            <input id="serviceTitle" name="serviceTitle" v-model="serviceTitle" type="text" placeholder="请输入案例标题">
          </div>
          <div class="confomml-name upload-demo ">
            <label for="caseGroupName">案例分组名</label>
            <select name="caseGroupName" id="caseGroupName" v-model="caseGroupName">
              <option v-for="(item,index) in selectList" :key="index" :value="item.name">{{item.name}}</option>
            </select>
          </div>
          <div class="confomml-name upload-demo ">
            <label for="detail">案例详情文本</label>
            <input id="detail" name="detail" v-model="detail" type="text" placeholder="请输入案例详情文本">
          </div>
<!--          <el-upload-->
<!--            class="upload-demo"-->
<!--            :action="upLoadUrl"-->
<!--            :limit="1"-->
<!--            list-type="picture"-->
<!--            accept="image/*"-->
<!--            :on-exceed="beyondNum"-->
<!--            :on-change="onchange"-->
<!--            :on-remove="onRemove"-->
<!--            :on-success="onSuccess"-->

<!--            ref="upload"-->
<!--            :data="getfileData"-->
<!--            :file-list="fileList"-->
<!--            :auto-upload="false"-->
<!--            >-->
<!--            <label>添加图片</label>-->
<!--            <el-button size="small" type="primary">点击上传</el-button>-->
<!--            <div slot="tip" class="el-upload__tip action-text" v-if="imgListLength==1">-->
<!--              <template>-->
<!--                <el-radio v-model="radio" label="1"  @click.native="useInfoFun(1)">案例图片</el-radio>-->
<!--                <el-radio v-model="radio" label="2" @click.native="useInfoFun(2)">详情图片</el-radio>-->
<!--              </template>-->
<!--            </div>-->
<!--            &lt;!&ndash; <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> &ndash;&gt;-->
<!--          </el-upload>-->



          <el-upload
            :auto-upload="false"
            class="my-upload upload-demo "
            :limit="1"
            accept="image/*"
            :action="upLoadUrl"
            :on-remove="myHandleRemove1"
            :file-list="fileList"
            :on-change="myOnchange1"
            list-type="picture">
            <label>缩略图</label>
            <el-button size="small" type="primary">点击上传</el-button>
<!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
          <el-upload
            style="margin-top: 10px"
            :auto-upload="false"
            class="my-upload upload-demo "
            :limit="1"
            accept="image/*"
            :action="upLoadUrl"
            :on-remove="myHandleRemove2"
            :file-list="fileList2"
            :on-change="myOnchange2"
            list-type="picture">
            <label>详情图</label>
            <el-button size="small" type="primary">点击上传</el-button>
            <!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>


				</div>
				<div class="confom-btn"><button class="change-btn" type="submit" @click="change">确认添加</button></div>
        <div class="confom-btn"><el-button @click="quiteFun" type="info">取消添加</el-button></div>
			</form>
		</div>
   </div>
</template>
<style scoped>
  .home-form{
    padding:30px 100px 10px 100px;
  }
  .confomml-name{
    padding-bottom: 10px;
  }
  .old-img{
    height: 100px;
  }
  .confom-btn{
    margin: 10px 0;
  }
  .upload-demo >>>.el-radio__inner{
    width: 16px;
    height: 16px;
  }
  .upload-demo >>>.el-radio__input{
    width: 20px;
  }
</style>

<script >
	export default {
    props:{
    },
    data () {
      return {
        upLoadUrl:'http://39.98.80.223:8080/official-website/background-caseDetail/add',
        isModify:true,//是否添加
        selectList:[],
        oldImg:'',
        serviceTitle:'',
				caseGroupName:'',
        detail:'',
        isSelect:0,  //选照片为1，不选照片为0
        isHidden:true,
        fileList:[],
        fileList2:[],
        radio:"1",
        useInfo:1,
        imgListLength:0,

        myfile:{
          detailFile:'',
          indexFile:'',
          caseGroupName:'',
          detail:'',
          caseName:'',
        }
      }
    },
    created(){

    },
    mounted (){

      this.$get('/official-website/background-caseGroup/queryByPage',{}).then(data=>{
        var seller=JSON.stringify(data);
      	//console.log('select结果:'+seller);
        this.selectList=data.list;
      }).catch(function (error) {
      		//console.log(error);
      });
    },
    components: {

    },
    computed: {
      getfileData(){
        var data={
          caseName:"",
					caseGroupName:'',
          detail:''
        }
        return data;
      }
    },
    methods: {
      myHandleRemove1(file){
        console.log('手动删除')
        this.myfile.indexFile=''
      },
      myHandleRemove2(file){
        console.log('手动删除')
        this.myfile.detailFile=''
      },
      myOnchange1(file,fileList){
        console.log(file,'file')
        this.myfile.indexFile=file
      },
      myOnchange2(file,fileList){
        console.log(file,'file')
        this.myfile.detailFile=file
      },


      addData(data){
        this.isHidden=data;
      },
      beyondNum(){
        this.$message.error('只能上传一个图片');
      },
      useInfoFun(num){
        //debugger
        //console.log(this.imgListLength);
        //if (e.target.tagName === 'input') return // 因为原生click事件会执行两次，第一次在label标签上，第二次在input标签上，故此处理
        if(this.imgListLength==1){
          this.useInfo=Number(num);
        }
      },
      onchange(file,fileList){
        //console.log(file);
        var _this=this;
        _this.isSelect=1;
        _this.imgListLength=fileList.length;
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
				$("#homeModifyFrom").validate({
					rules: {
						serviceTitle: "required",
						caseGroupName:"required",
            detail:"required"
					},
					messages: {
						serviceTitle: "不能为空！",
						caseGroupName:"不能为空！",
            detail:"不能为空！"
					},
					submitHandler:function(form) {
            _this.myfile.caseName=_this.serviceTitle;
						_this.myfile.caseGroupName=_this.caseGroupName;
            _this.myfile.detail=_this.detail;
            //console.log(_this.getfileData);
            if(!this.myfile.indexFile){
              _this.$message.error("请上传缩略图！");
            }else if(!this.myfile.detailFile){
              _this.$message.error("请上传详情图！");
            }else{
              //console.log("确认添加");
              //debugger
              // _this.$refs.upload.submit();
              console.log(this.myfile)
            }
					}
				});


			}
    },
    watch: {}
	}
</script>
