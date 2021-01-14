<template>
  <div class="container" style="position: absolute;left: 0;top: 0">
    <div class="left-part">
      <img src="../assets/img/img-1.svg" alt="" class="moodle">
    </div>
    <div class="right-part">
      <div class="logo">
        <img src="../assets/img/img-2.svg" alt="" class="img-2">
      </div>
      <div class="login-box">
        <el-form>
          <img src="../assets/img/avatar.svg" alt="" class="avatar">
          <h2>Welcome</h2>
          <div class="input-group">
            <div class="icon">
              <i class="el-icon-user"></i>
            </div>
            <div>
              <input v-model="user.name" placeholder="Username" type="text" class="input">
            </div>
          </div>
          <div class="input-group">
            <div class="icon">
              <i class="el-icon-lock"></i>
            </div>
            <div>
              <input v-model="user.password" placeholder="Password" type="password" class="input">
            </div>
          </div>
          <a href="">Forgot Password?</a>
          <e-button @click="handleLogin()" class="btn">Login</e-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 登陆逻辑写在组件/components/Login.vue里
 */
export default {
  name: "login-page",

  data() {
    return {
      user: {
        password: "",
        name: "",
      }
    }
  },
  methods: {
    handleLogin() {
      if (this.user.name == "") {
        this.info(3, "姓名不能为空")
        return
      }
      if (this.user.name.length != 10){
        this.info(3, "学号格式不正确")
        return
      }

      //判断学号中是不是全都是数字，不是的话就显示错误
      if(!/^\d+$/.test(this.user.name)){
        this.info(3, "学号格式不正确")
        return
      }

      if (this.user.name.slice(4,7) != "022"){
        this.info(3, "学号格式不正确")
        return
      }
      if (this.user.password == "") {
        this.info(3, "密码不能为空")
        return
      }
      if (this.user.password != "666666") {
        this.info(3, "密码不正确")
        return
      }

      /*
       * =============================================================
       * 登陆交互
       * path：填入后端登陆处理方法的路径
       * 参数：一个json，包含name与password属性
       * 返回值：一个json
       * {
       *    code:(int)20000,  20000表示成功登陆，其他值表示登陆失败
       *    token:(string)  后端的token字符串，可用于免登陆和验证
       * }
       * =============================================================
       */
      //let path = 'localhost:8080/login'

      let path = '39.97.234.82:8080/login'
      /*this.$http.post(path,this.user).then(response =>{
        const {data} = response
        const {code} = data
        if (code === 20000){
          // const {token} = response
          this.info(1,'登陆成功')
          let id = 'beidawlf_03_01'
          let videoName = '软件需求与开发'
          this.$router.push("/play/" + id + '/' + videoName)
        }else{
          this.info(3,'登陆失败')
        }
      })*/
      this.info(1,'登陆成功')
          let id = 'beidawlf_03_01'
          let videoName = '软件需求与开发'
          this.$router.push("/play/" + id + '/' + videoName)
    },

    info(type, content) {
      if (type === 0) {   //normal info
        this.$message(content)
      } else if (type === 1) {
        this.$message({
          message: content,
          type: 'success'
        })
      } else if (type === 2) {
        this.$message({
          message: content,
          type: 'warning'
        });
      } else if (type === 3) {
        this.$message.error(content);
      }
    }
  }

}
</script>
<style src="../assets/css/style.css"></style>
<style ref="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css"></style>
<style ref="https://fonts.googleapis.com/css2?family=Roboto&display=swap"></style>
<style scoped>
.container{
  -webkit-user-select: none;

  -moz-user-select: none;

  -ms-user-select: none;

  user-select: none;
}
</style>
