<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
  import Editor from 'wangeditor'
  import 'wangeditor/release/wangEditor.min.css'
  import { oneOf,getNewStr } from '@/assets/js/public'
  export default {
    name: 'Editor',
    props: {
      value: {
        type: String,
        default: ''
      },
      /**
       * 绑定的值的类型, enum: ['html', 'text']
       */
      valueType: {
        type: String,
        default: 'html',
        validator: (val) => {
          return oneOf(val, ['html', 'text'])
        }
      },
      /**
       * @description 设置change事件触发时间间隔
       */
      changeInterval: {
        type: Number,
        default: 200
      },
      /**
       * @description 是否开启本地存储
       */
      cache: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      editorId () {
        return `editor${this._uid}`
      }
    },
    methods:{
      setHtml (val) {
        this.editor.txt.html(val)
      },
      beforeUpload(file,insert){
        var fd = new FormData();
        fd.append("fileToUpload", file);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", getNewStr + '/OSSFile/PostToOSS');
        xhr.send(fd);
        xhr.onreadystatechange = ()=>{
          if (xhr.readyState == 4 && xhr.status == 200) {
            let obj = JSON.parse(xhr.responseText);
            insert(obj.data)
          }
        }
      },
    },
    mounted () {
      this.editor = new Editor(`#${this.editorId}`)
      this.editor.customConfig.onchange = (html) => {
        this.$emit('input',escape(html))
      }
      this.editor.customConfig.onchangeTimeout = this.changeInterval


      //上传图片
      this.editor.customConfig.uploadImgServer = getNewStr + '/OSSFile/PostToOSS'
      this.editor.customConfig.uploadFileName = 'fileToUpload';

//      this.editor.customConfig.menus = [          //菜单配置
//        'head',
//        'list',  // 列表
//        'justify',  // 对齐方式
//        'bold',
//        'fontSize',  // 字号
//        'italic',
//        'underline',
//        'image',  // 插入图片
//        'foreColor',  // 文字颜色
//        'undo',  // 撤销
//        'redo',  // 重复
//      ]
      var _this = this;
      this.editor.customConfig.customUploadImg = function (files, insert) {
        // files 是 input 中选中的文件列表
        // insert 是获取图片 url 后，插入到编辑器的方法

        // 上传代码返回结果之后，将图片插入到编辑器中
        for(var i=0;i<files.length;i++){
          _this.beforeUpload(files[i],insert)
        }
      }



      // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
      this.editor.customConfig.emotions = [
        {
          // tab 的标题
          title: '默认',
          // type -> 'emoji' / 'image'
          type: 'image',
          // content -> 数组
          content: [
            {
              alt: '[住宿]',
              src: 'http://hly.1000da.com.cn/icon/Accommodation.png'
            },
            {
              alt: '[用餐]',
              src: 'http://hly.1000da.com.cn/icon/Meal.png'
            },
            {
              alt: '[温馨提示]',
              src: 'http://hly.1000da.com.cn/icon/WarmTips.png'
            },
            {
              alt: '[景点]',
              src: 'http://hly.1000da.com.cn/icon/Attractions.png'
            },
            {
              alt: '[交通]',
              src: 'http://hly.1000da.com.cn/icon/Traffic.png'
            },
            {
              alt: '[行程概览]',
              src: 'http://hly.1000da.com.cn/icon/ItineraryOverview.png'
            },
            {
              alt: '[飞机]',
              src: 'http://hly.1000da.com.cn/icon/Plane.png'
            },
            {
              alt: '[免费活动]',
              src: 'http://hly.1000da.com.cn/icon/FreeActivities.png'
            }
          ]
        },
//        {
//          // tab 的标题
//          title: 'Logo',
//          // type -> 'emoji' / 'image'
//          type: 'emoji',
//          // content -> 数组
//          content: ['😀', '😃', '😄', '😁', '😆']
//        }
      ]


      // create这个方法一定要在所有配置项之后调用
      this.editor.create()
      // 如果本地有存储加载本地存储内容
      this.editor.txt.html(this.value)
    }
  }
</script>

<style>

</style>
