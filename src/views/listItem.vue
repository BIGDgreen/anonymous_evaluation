<template>
  <div class="lists">
      <div class="loading" v-if="loading">
          <div class="loading_circle">
            <mt-spinner type="fading-circle"></mt-spinner>
          </div>
      </div>
<!--    导航头的搜索功能-->
    <div class="container">
        <input type="text" placeholder="请输入您要搜索的内容...">
        <div class="iconfont iconsearch"></div>
    </div>
<!--    -->
<!--    <mt-loadmore 为mintUI下拉刷新组件-->
<!--    <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" >-->
    <mt-loadmore :top-method="loadTop" ref="loadmore" >
      <div v-for="(i,index) in teacherLists" class="list" style="position: relative;" @click="goIn(index)">
          <div><img :src="i.teacherPhoto"></div>
          <!--          教师信息-->
          <div class="box" >
            <!--      显示教师名字 -->
            <div class="teacher_name" >{{i.teacherName}}</div>
            <!--      显示学院 -->
            <div class="college" >学院：{{i.teacherCollege}}</div>
              <!--      右下角的链接指示-->
              <div @click="goIn(index)" class="goComment">进行评价</div>
          </div>
        <!--      <div style="position: absolute;bottom: 5px;right: 5px;"><button style="border: 0;background-color: transparent;outline: none;height: 50px;color: #3a80dc" v-on:click="goIn"> >>>点击进行评价</button> </div>-->
      </div>
    </mt-loadmore>

  </div>
</template>

<script>
  //用于引用字体图标（输入框左边）
  import "../assets/fonts/iconfont.css"
  import {Toast} from "mint-ui";
  export default {
    name: "test",
    data(){
      return {
        toastInstance: null,
        loading:false,  //加载中
        teacherLists: []
      }
    },
    mounted(){
        // 获取全部教师信息
       // console.log(this.$store.state.teacherLists);
      this.$axios.get(this.mainUrl+'/api/v1.0/teacher/lists', {
          headers: {
              "Authorization": sessionStorage.login_token
          }
      })
        .then((res) => {
            this.loading = false;
          console.log("teacherLists res",res);
          if (res.data.status === 'success') {
              this.$store.commit('SET_TEACHERLISTS',res.data.data);
              console.log(this.$store.state.teacherLists);
              this.teacherLists = this.$store.state.teacherLists;
          } else {
             this.show(res.data.errMsg);
          }
        })
        .catch((err) => {
            console.log(err);
            this.loading = false;
            console.log(err.response);
            if (err.response.status === 403) {
                location.href = err.response.data.data.url;
            } else {
                this.show("网络连接错误！");
            }
        })
    },
    methods:{
        show(toastMessage) {
            this.toastInstance = Toast({
                message: toastMessage,
                position: 'middle',
                duration: 1000
            })
        },
      loadTop() {
          //刷新页面
          this.$router.push({path:'/sfs'});
          this.$router.go(-1);
      },
      goIn(index){                             //跳转到详情页
        let tid = this.teacherLists[index].teacherId;
        localStorage.setItem("teacherId",tid);
        this.$router.push({name:'detail',params:{id:tid}})
      }
    }
  }
</script>

<style scoped lang="less">
  @mainColor:#1989fa;
  @dottedColor:gainsboro;
  .lists{
      .loading{
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100vh;
          background: fade(black,70%);
          .loading_circle{
              position: absolute;
              top: 50%;
              bottom: 50%;
              left: 50%;
              right: 50%;
              width: 33%;
              height: 8%;
              border-radius: 1.4rem;
          }
      }
      .container{
          width: 100%;
          background-color: @mainColor;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding-top: 2%;
          padding-bottom: 2%;
          input{
              width: 80%;
              height: 1.8rem;
              border: none;
              border-radius: .4rem;
              outline: @mainColor;
              font-size: 1rem;
              margin-left: .6rem;
              padding-left: .6rem;
              &:focus{
                  border: 1px solid @mainColor;
              }
          }
          .iconsearch{
              color: white;
              margin-left:.6rem;
          }
      }
      .list{
          width: 90%;
          margin: 1rem auto;
          display: flex;
          flex-direction: row;
          img {
              width: 6rem;
              height: 9rem;
          }
          .box{
              width: 80%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start ;
              margin-left: 1rem;
              .teacher_name{
                  font-size: 1.2rem;
                  margin-top: 1rem;
              }
              .college{
                  margin-top: 1.4rem;
              }
              .goComment{
                  align-self: flex-end;
                  color: fade(@mainColor,80%);
                  margin-top: 1.6rem;
                  font-size: .88rem;
                  &:active{
                      color: @mainColor;
                  }
              }
          }
      }
  }

</style>
