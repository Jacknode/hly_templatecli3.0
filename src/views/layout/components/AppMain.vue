<template>
  <!--<section class="app-main">-->
  <!--<transition name="fade" mode="out-in">-->
  <!--&lt;!&ndash; <router-view :key="key"></router-view> &ndash;&gt;-->
  <!--<router-view></router-view>-->
  <!--</transition>-->
  <!--</section>-->
  <section class="app-main" @click.stop="appMain">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.fullPath
      }
    },
    mounted(){

    },
    methods: {
      appMain(){
//       this.$nextTick(()=>{
//         let appMain = document.querySelector('.el-menu')
//         let elSubmenu = appMain.querySelectorAll('.el-submenu')
//         for(var i=0;i<elSubmenu.length;i++){
//           let newArr = elSubmenu[i].classList
//           for(var j=0;j<newArr.length;j++){
//             console.log(newArr[j])
//             if(newArr[j].includes('is-active')){
//               console.log(1)
//               elSubmenu[i].classList.remove('is-active')
//               elSubmenu[i].classList.add('is-opened')
//               let elMenu = elSubmenu[i].querySelector('.el-menu')
//               console.log(elMenu)
//               elMenu.style = 'background-color: rgb(48, 65, 86);'
//             }
//           }
//
//         }
//       })
      }
    }
  }
</script>
