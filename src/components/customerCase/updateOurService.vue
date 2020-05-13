<template>
  <div class="change">
		<div class="modify" v-show="isModify">
      <div class="form-box">
        <div class="confom-main">
          <div class="confomml-name upload-demo ">
            <label for="serviceTitle">案例标题</label>
            <input id="serviceTitle" name="serviceTitle" v-model="myfile.caseName" type="text" placeholder="请输入案例标题">
          </div>
          <div class="confomml-name upload-demo ">
            <label for="caseGroupName">案例分组名</label>
            <select name="caseGroupName" id="caseGroupName" v-model="myfile.caseGroupName">
              <option v-for="(item,index) in selectList" :key="index" :value="item.name">{{item.name}}</option>
            </select>
          </div>
          <div class="confomml-name upload-demo ">
            <label for="detail">案例详情文本</label>
            <input id="detail" name="detail" v-model="myfile.detail" type="text" placeholder="请输入案例详情文本">
          </div>


          <el-upload
            :auto-upload="false"
            class="my-upload upload-demo "
            :limit="1"
            accept="image/*"
            ref="uploader1"
            :action="upLoadUrl"
            :on-change="uploadChange1"
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
            ref="uploader2"
            :action="upLoadUrl"
            :on-change="uploadChange2"
            list-type="picture">
            <label>详情图</label>
            <el-button size="small" type="primary">点击上传</el-button>
            <!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>


          <div class="confom-btn"><button class="change-btn" type="submit" @click="submitForm">确认添加</button></div>
          <div class="confom-btn"><el-button @click="cancelSubmit" type="info">取消添加</el-button></div>
        </div>
      </div>
		</div>
   </div>
</template>
<style scoped>
.form-box{
  background-color:#fff;
  min-width: 350px;
  padding:60px 100px 30px 100px;
  box-sizing: border-box;
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
        isHidden:true,
        myfile:{
          id:'',
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

    },
    methods: {
      setData(data){  //初始化数据
        //console.log(data);
        if(data.id){
          this.myfile.id=data.id;
          this.myfile.caseName=data.caseName;
          this.myfile.caseGroupName=data.caseGroupName;
          this.myfile.detail=data.detail;
          this.myfile.indexFile=data.indexFile;
          this.myfile.detailFile=data.detailFile;
          this.isModify=data.isModify;
        }
        // console.log(this.myfile)
      },
      uploadChange1(file,fileList){
        // console.log('change1')
        // console.log(file)
        let _this=this
        _this.myfile.indexFile=file.raw
        // this.getBase64(file.raw).then(res=>{
        //   _this.myfile.indexFile=res
        // })

      },
      uploadChange2(file,fileList){
        // console.log('change2')
        // console.log(file)
        let _this=this
        _this.myfile.detailFile=file.raw
        // this.getBase64(file.raw).then(res=>{
        //   _this.myfile.detailFile=res
        // })
      },
      addData(data){
        this.isModify=true
      },
      submitForm(){
        let _this=this
        if(this.myfile.caseName===''){
          _this.$message.error("请填写标题！");
        }else if(this.myfile.caseGroupName===''){
          _this.$message.error("请选择分组！");
        }else if(this.myfile.detail===''){
          _this.$message.error("请填写详情！");
        }else if(this.myfile.indexFile===''){
          _this.$message.error("请上传缩略图！");
        }else if(this.myfile.detailFile===''){
          _this.$message.error("请上传详情图！");
        }else {
          let formData = new FormData()
          formData.append('id', this.myfile.id)
          formData.append('caseGroupName', this.myfile.caseGroupName)
          formData.append('detail', this.myfile.detail)
          formData.append('caseName', this.myfile.caseName)
          formData.append('indexFile', this.myfile.indexFile)
          formData.append('detailFile', this.myfile.detailFile)
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
            }
          }
          // console.log(this.myfile,'myfile')

          this.$post('/official-website/background-caseDetail/update',formData).then(data=>{
            // console.log(data.data);
            if(data.data==='案例名称已存在'){
              _this.$message.error("案例名称已存在！");
            }else if(data.data==='修改成功'){
              _this.$message({
                message: '修改成功!',
                type: 'success'
              });
              setTimeout(function(){
                location.reload();
              }, 500);
            }else{
              _this.$message.error("错误："+data.data);
            }
          }).catch(function (error) {
            // console.log(error,123);
          });
        }


      },
      cancelSubmit(){
        // console.log('取消啦')
        this.myfile={
          detailFile:'',
          indexFile:'',
          caseGroupName:'',
          detail:'',
          caseName:'',
        }
        $("body").css("overflow","auto");
        this.isModify=false;
        this.$refs.uploader1.clearFiles()
        this.$refs.uploader2.clearFiles()
      }
    },
    watch: {

    }
	}
</script>
