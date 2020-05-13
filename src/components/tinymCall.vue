<template>
  <div>
    <!-- <tinymce-editor v-model="msg"
      :disabled="disabled"
      @onClick="onClick"
      ref="editor"></tinymce-editor> -->
    <tinymce-editor v-model="msg"
      :disabled="disabled"
      ref="editor"></tinymce-editor>
    <div>编辑的内容：</div>
    <div class="tiny-text">{{ msg }}</div>
    <button @click="clear">清空内容</button>
    <button @click="disabled = true">禁用</button>
  </div>
</template>

<style scoped>
  .tiny-text{
    margin:30px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    text-align: left;
  }
</style>
<script type='ecmascript-6'>
  import TinymceEditor from './tinym.vue'
	export default {
    props:{
    },
    data () {
      return {
        msg: 'Welcome to Use Tinymce Editor',
        disabled: false
      };
    },
    created(){

    },
    mounted (){

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
      copyFun(){
        /* var copyText = $(".tiny-text");//获取对象
        copyText.select();//选择
        document.execCommand("Copy");//执行复制
 　　　　alert("复制成功！"); */
        /* var copyCon = $(".tiny-text");
        copyCon.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        alert("已复制好，可贴粘。"); */
        this.$nextTick(() => {
          var Url2=$(".tiny-text");
          Url2.select(); // 选择对象
          document.execCommand("Copy"); // 执行浏览器复制命令
          alert("已复制好，可贴粘。");
        });
      }
    },
    watch: {}
	}
</script>
