<template>
  <div>
    <nav-bar></nav-bar>
    <div style="position: relative;margin-top: 70px">
      <div style="margin-left: 80px;float:left;">
        <h1 v-if="video.name.length > 20" style="font-size: 25px; text-align: left;">{{ video.name.slice(0,20) }}...</h1>
        <h1 v-else style="font-size: 25px; text-align: left;">{{ video.name.slice(0,20) }}</h1>
        <div class="player" style=" width: 600px;margin-top: 10px">
          <video-player class="vjs-custom-skin"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true">
          </video-player>
        </div>
      </div>

      <div style="margin-left: 780px; padding-top: 20px">
        <div style="position:relative;">
          <h2 style="font-size: 22px;text-align: left;width: auto;width: 100px">相关推荐</h2>
          <el-button @click="refresh()" type="text" style="position: absolute;left: 100px;top: -11px">
            <img style="width: 26px" src="../assets/img/refresh.svg">
          </el-button>
        </div>

          <div v-for="item in recommendsShow" >
            <div @click="jumpToPlayVideo(item.secID,item.secName)"
                 style="width: 100%;height: 82px;position: relative; cursor: pointer">
              <img v-if="item.secID.indexOf('b') == 0" style="width: 140px;height: 80px;position: absolute;left: 0px;top: 5px"
                   src="../assets/img/beida.jpg">
              <img v-if="item.secID.indexOf('z') == 0" style="width: 140px;height: 80px;position: absolute;left: 0px;top: 5px"
                 src="../assets/img/zheda.jpg">
              <img v-if="item.secID.indexOf('g') == 0" style="width: 140px;height: 80px;position: absolute;left: 0px;top: 5px"
                 src="../assets/img/guofang.jpg">
              <p v-if="item.secName.length > 20" style="position: absolute;left: 150px;top: 0px;font-size: 15px;width: 150px;text-align: left">
                {{ item.secName.slice(0,20)}}...
              <p v-else style="position: absolute;left: 150px;top: 0px;font-size: 15px;width: 150px;text-align: left">
                {{ item.secName.slice(0,30)}}
              </p>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/Navbar";

export default {
  name: "player",
  components: {NavBar},
  data() {
    return {
      video: {},
      refreshFlag: 0,
      recommendsShow: [],
      recommends: [],
      // 视频播放
      playerOptions: {
        aspectRatio: '4:3',
        autoplay: false,
        muted: false,
        language: 'Zh-cn',
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          // mp4
          src: "",
        }],
        poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
      }
    }
  },
  created() {
    let urlPrefix = 'http://software-moodle.oss-cn-qingdao.aliyuncs.com/moodle_vedio/'
    let id = this.$route.params.id;
    let videoName = this.$route.params.name
    let url = urlPrefix + id + '.mp4'
    this.video.src = url
    this.video.name = videoName
    this.playerOptions.sources[0].src = url
    this.loadRecommendVideos(id)
  },
  methods: {
    refresh() {
      let lens = this.recommends.length
      this.recommendsShow = []
      for(var i = 0; i < Math.min(lens, 5); i++){
      this.recommendsShow.push(this.recommends[Math.floor(Math.random() * (lens - 0) ) + 0])
      }

      console.log("next is show")
      console.log(this.recommendsShow)
    },
    jumpToPlayVideo(id, name) {
      this.$router.push('/play/' + id + '/' + name)
    },
    /*
     *=======================================================
     * 加载后端的推荐视频列表
     * @param id 当前观看的视频id
     * videos: 视频信息列表
     * 视频具体信息：id, name
     * ======================================================
     */
    loadRecommendVideos(id) {
      //let path = 'localhost:8080/video/recommend/list?id=' + id
      //let path = 'http://localhost:8080/name/getName?secId='+ id
      let path = 'http://39.97.234.82:8080/name/getName?secId='+ id
      this.$http.get(path).then(response => {

          console.log(response)
          console.log(JSON.stringify(response.data, null, 2))
          const {videos} = response
          //this.recommends = videos
          this.recommends = response.data
          this.refresh()

      })

    }
  }
}
</script>

<style scoped>
</style>
