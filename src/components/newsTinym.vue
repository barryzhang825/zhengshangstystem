<template>
  <!-- <tinymce-editor v-model="msg"
    :disabled="disabled"
    @onClick="onClick"
    ref="editor"></tinymce-editor> -->
  <div class="news-tinymce">
    <div class="newtiny-main">
      <div class="ntm-box">
        <tinymce-editor v-model="tinymceData"
          :disabled="disabled"
          ref="editor"></tinymce-editor>
<!--        <div class="get-html">编译完成后返回即可，数据自动更新！</div>-->
<!--        <div class="get-html">html：</div>-->
<!--        <div class="tiny-text">{{ tinymceData }}</div>-->
        <el-button class="tinymce-btn" @click="clear" type="primary">清空内容</el-button>
        <el-button class="tinymce-btn" @click="closeTinymce" type="primary">确定</el-button>
     </div>
    </div>
  </div>
</template>

<style scoped>
  .news-tinymce{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 101;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .newtiny-main{
    background-color: #fff;
    width: 70%;
    max-height: 70%;
    overflow-y: scroll;
  }
  .ntm-box{
    padding: 30px;
  }
  .tiny-text{
    margin:30px;
    text-overflow: ellipsis;
    word-wrap: break-word;
    text-align: left;
    height: 200px;
    overflow-y: scroll;
    border:1px solid #ccc;
    padding:20px;
  }
  .get-html{
    text-align: left;
    color: #008000;
    line-height: 24px;
  }
</style>
<script >
  import TinymceEditor from './tinym.vue'
	export default {
    props:{
      msg:{
        type:String
      }
    },
    data () {
      return {
        disabled: false,
        tinymceData:null
      };
    },
    created(){

    },
    mounted (){
      this.tinymceData=this.msg;
    },
    components: {
      TinymceEditor
    },
    computed: {

    },
    methods: {
      //鼠标单击的事件
      onClick(e, editor) {
        //console.log('Element clicked')
        //console.log(e)
        //console.log(editor)
      },
      //清空内容
      clear() {
        this.$refs.editor.clear()
      },
      closeTinymce(){
        var tinymceDataStr={
          status:false,
          data:this.tinymceData
        };
        this.$emit("watchTinymce",tinymceDataStr);
      }
    },
    watch: {}
	}
</script>
