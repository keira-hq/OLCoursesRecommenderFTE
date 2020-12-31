<template>
  <div>
    <nav-bar></nav-bar>
    <h1 style="font-size: 25px; text-align: left;padding-left: 150px">{{ video.topic }}</h1>
    <div class="recommend_line">
      <h2 style="font-size: 20px;text-align: left">相关推荐</h2>
      <div v-for="item in recommends" :key="item">
        <div @click="jumpToPlayVideo(item.id)" style="width: 100%;height: 90px; margin-bottom: 5px;position: relative; cursor: pointer">
          <img style="width: 140px;height: 80px;position: absolute;left: 0px;top: 5px" :src="item.img">
          <p style="position: absolute;left: 150px;top: -10px;font-size: 15px;width: 150px;text-align: left">{{item.name}}</p>
          <span style="position: absolute;left: 150px;top: 50px;font-size: 12px">{{item.author}}</span>
          <span style="position: absolute;left: 150px;top: 70px;font-size: 12px">{{item.time}}</span>
        </div>
      </div>
    </div>
    <div class="player" style="margin-left: 150px; width: 600px;">
      <video-player class="vjs-custom-skin"
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="true"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
                    @ready="playerReadied"
                    @statechanged="playerStateChanged($event)">
      </video-player>
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
      video: {
        topic: '2001太空漫游',
        src: "http://vjs.zencdn.net/v/oceans.mp4"
      },
      recommends: [
        {
          id:1,
          img: 'https://pic2.zhimg.com/b09f79652401519b9f22f523e4d3f410_r.jpg',
          name: '2001太空漫游',
          time: '136:52',
          author: '库布里克',
        },
        {
          id:2,
          img: 'https://pic2.zhimg.com/b09f79652401519b9f22f523e4d3f410_r.jpg',
          name: '2001太空漫游',
          time: '136:52',
          author: '库布里克',
        },

      ],
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
          src: "http://vjs.zencdn.net/v/oceans.mp4",
          // webm
          // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
      }
    }
  },
  created() {
    let id = this.$route.params.id;
    this.initVideo(id)
  },
  methods:{
    jumpToPlayVideo(id){
      this.$router.push("/play/"+id)
    },

    /*
     * ====================================================================
     * 从后端加载视频，使用get方法，向后端传递id
     * 参数 id: 后端用于获取视频的唯一标识
     * 返回值：json
     * code：20000表示加载视频成功
     * src：视频的字节流，或者后端存储视频的路径（必须是可以在浏览器直接访问的）
     * 视频格式为mp4
     * ====================================================================
     */
    initVideo(id){
      let path = 'localhost:8080/video/get/'+id
      this.$http.get(path).then(response =>{
        const {code} = response
        if (code == 20000){
          const {src} = response
          this.playerOptions.sources[0].src = src
          this.loadRecommendVideos(id)
        }
      })
    },
    /*
     *=======================================================
     * 加载后端的推荐视频列表
     * @param id 当前观看的视频id
     * videos: 视频信息列表
     * 视频具体信息：id，封面图片，视频标题（名），作者，时间
     * ======================================================
     */
    loadRecommendVideos(id){
      let path = 'localhost:8080/video/recommend/list/'+id
      this.$http.get(path).then(response =>{
        const {code} = response
        if (code == 20000){
          const {videos} = response
          this.recommends = videos
        }
      })
    }
  }
}
</script>

<style scoped>
.recommend_line {
  width: 320px;
  position: absolute;
  right: 100px;
  top: 60px;
}
</style>
