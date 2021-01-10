<template>
  <div>
    <div style="width: 100%; position: absolute; left: 0; top: 0; height: 50px;">
      <img style="width: 180px;position: absolute;left: 20px;top: 10px" src="../assets/img/logo.svg">
      <el-dropdown style="position: absolute; right:40px; margin-top: 20px" @command="handleCommand">
        <el-button type="primary" size="small" style="background-color: #F7B500;border: 0"><i
          class="el-icon-arrow-down el-icon--center"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="log_out">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  props: {
    backgroundColor: {
      type: "",
      default: "background-color:#1E89E0"
    }
  },
  data() {
    return {
      name: "admin"
    }
  },
  mounted() {
  },
  methods: {
    handleCommand(command) {
      if (command === 'log_out')
        this.$router.push("/login")
    }
  }
}
</script>

<style scoped>

</style>
