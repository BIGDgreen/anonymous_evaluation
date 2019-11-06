<template>
  <div class="detail">
    <div class="loading" v-if="loading">
      <div class="loading_circle">
        <mt-spinner type="fading-circle"></mt-spinner>
      </div>
    </div>
    <div class="nav">
        <div onclick="history.go(-1)" class="iconfont iconzuojiantou"></div>
        <div class="title">&nbsp;评价详情</div>
        <div onclick="location.reload()" class="iconfont iconshuaxin"></div>
    </div>
    <introduce></introduce>
    <estimate></estimate>
    <!---------------评论输入框---------------->
    <div class="comment_in">
      <div class="anonymous_wrapper">
        <input type="checkbox" id="anonymous" v-model="is_anonymous" @click="select_anonymous">
        <label for="anonymous" id="label" class="anonymous_label">匿名</label>
      </div>
      <input value="请输入内容" v-model="input_com" @keyup.enter="submit" class="comment_input" />
      <mt-button class="submit_com" type="primary" @click.native="submit">提交</mt-button>
    </div>
  </div>
</template>

<script>
  import introduce from '../components/detail/detail_introduce'
  import estimate from '../components/detail/detail_estimate'
  //用于引用字体图标（输入框左边）
  import "../assets/fonts/iconfont.css"
  import {Toast} from "mint-ui"
  export default {
    name: "detail",
    data () {
      return {
        toastInstance: null,
        loading: false,
        input_comment:'',
        input_com:'',
        is_anonymous: false  //是否匿名
      }
    },
    components: {
      introduce,
      estimate,
    },
    methods: {
      show(toastMessage) {
        this.toastInstance = Toast({
          message: toastMessage,
          position: 'middle',
          duration: 1000
        })
      },
      select_anonymous(){
        this.is_anonymous = !this.is_anonymous;
      },
      submit() {
        this.loading = true;
        // console.log(this.is_anonymous);
        let params = new URLSearchParams(); //axios post传参
        params.append('commentContent',this.input_com);
        params.append('isAnonymous',this.is_anonymous);
        params.append('teacherId',localStorage.getItem("teacherId")); //传入vuex中的teacherId
        params.append('userId',JSON.parse(sessionStorage.getItem("userInfoStore")).userId); //传入vuex中的teacherId
        this.$axios.post(this.mainUrl+'/api/v1.0/comment/send',params,{
          headers: {
            "Authorization": sessionStorage.login_token
          }
        })
            .then((res) => {
              this.loading = false;
              // console.log(res);
              if (res.data.status === "success") {
                this.show(res.data.data);
                // 刷新页面
                this.$router.push("/22");
                this.$router.go(-1);
              } else {
                this.show(res.data.data.errorMsg);
              }
            })
            .catch((err) => {
              this.loading = false;
              if (err.response.status === 403) {
                // location.href = err.response.data.data.url;
                location.href = 'http://yiban.sust.edu.cn/yibanapi/?backurl=http://192.168.0.110:8888/blank';
              } else {
                Toast({
                  message: "网络连接错误！",
                  position: 'middle',
                  duration: 5000
                });
              }
            });
        this.input_comment = this.input_com;
        this.input_comment = this.input_comment.replace(/\s/g, '')
        if (this.input_comment) {
          this.input_com = '';
        } else {
          Toast({
            message: "请输入有效的评价!",
            position: 'middle',
            duration: 5000
          });
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @mainColor:#1989fa;
  @dottedColor:gainsboro;
  .detail{
    width: 100%;
    .loading{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      background: lighten(black,70%);
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
    .nav {
      width: 100%;
      background-color: @mainColor;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-top: 2%;
      padding-bottom: 2%;
      .title{
        text-align: center;
        color: white;
        font-size: 1rem;
      }
      .iconzuojiantou {
        font-size: 1.2rem;
        vertical-align: middle;
        text-decoration: none;
        color: white;
        margin-left: .6rem;
        &:active{
          color: lighten(@mainColor,50%);
        }
      }
      .iconshuaxin {
        font-size: 1.2rem;
        vertical-align: middle;
        text-decoration: none;
        color: white;
        margin-right: .6rem;
        &:active{
          color: lighten(@mainColor,50%);
        }
      }
    }

    .comment_in{
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      position: fixed;
      bottom: 0;
      left: 5%;
      right: 5%;
      background-color: white;
      padding-bottom: .6rem;
      .anonymous_wrapper{
        width: 16%;
        display: flex;
        flex-direction: row;
        align-items: center;
        #anonymous{
          width: 1rem;
        }
        .anonymous_label{
          font-size: .92rem;
          color: @mainColor;
          margin-left: .2rem;
        }
      }
      input{
        width: 64%;
        height: 2rem;
        border-radius:6px;
        border:1px solid @dottedColor;
        outline: @mainColor;
        padding-left: .4rem;
      }
      .submit_com{
        width: 20%;
        background-color: @mainColor;
        border-color: @dottedColor;
        position: relative;
        margin-left:1rem;
        height: 2rem;
      }
    }
  }
</style>
