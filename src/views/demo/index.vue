<template>
  <div>
    <tinymce @getContent="getContetn"></tinymce>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  import tinymce from '@/components/Tinymce';
  export default{
    name: '',
    data(){
      return {}
    },
    components:{
      tinymce
    },
    computed: mapGetters([]),
    created(){
    },
    methods: {
      getContetn(str){
        console.log(str)
      }
    },
  }
</script>
<style scoped>

</style>
