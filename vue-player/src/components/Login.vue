<template>
  <div class="label">
    <h1 style="margin-top: 35px">Welcome!</h1>
    <div>
      <el-input placeholder="username" class="input" v-model="user.name"></el-input>
      <el-input type="password" placeholder="Password" v-model="user.password" class="input" ></el-input>
      <el-button class="input" type="primary" @click="login">Login</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user:{
        password:"",
        name:"",
      }
    }
  },
  methods:{
    login(){
      if(this.user.name == ""){
        this.info(2,"姓名不能为空")
        return
      }
      if(this.user.password == ""){
        this.info(2, "密码不能为空")
        return
      }
      this.$router.push("/play/1")

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
      let path = ''
      this.$http.post(path,this.user).then(response =>{
        const {code} = response
        if (code === 20000){
          const {token} = response
          this.info(1,'登陆成功')
          this.$router.push("/play/1")
        }else{
          this.info(3,'登陆失败')
        }
      })
    },

    info(type, content){
      if(type === 0){   //normal info
        this.$message(content)
      }else if(type === 1){
        this.$message({
          message: content,
          type : 'success'
        })
      }else if(type === 2){
        this.$message({
          message: content,
          type: 'warning'
        });
      }else if(type === 3){
        this.$message.error(content);
      }
    }
  }
}
</script>

<style scoped>
.label{
  background-color: #ffffff;
  width: 350px;
  height: 350px;
  border-radius: 5px;
}
.input{
  width: 270px;
  height: 40px;
  margin-top: 20px;
}
</style>
