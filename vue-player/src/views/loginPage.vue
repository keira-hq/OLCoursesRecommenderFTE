<template>
  <div>
    <div style="position:fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: #54a7fc;"></div>
    <div>
      <div style="position: absolute; left: 50%; margin-left: -175px; top: 100px">
        <login v-show="!isRegister && !forgetPasswd" style="position: absolute; left: 0px; top: 0px;"></login>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 登陆逻辑写在组件/components/Login.vue里
 */
import Login from "../components/Login"
export default {
  components: {Login},
  name: "login-page",

  data(){
    return{
      isRegister:false,
      forgetPasswd:false
    }
  },
  methods:{
  }

}
</script>

<style scoped>

</style>
