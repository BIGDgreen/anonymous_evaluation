 <template>
    <div class="detail_estimate">
      <span style="color: #1989fa"><b>全部评价</b></span>
        <div v-for="(comment,index) in teacher_comments">
            <div class="comment_window1">
              <div style="position: relative;padding: 0 10px 0 10px;margin-top: .4rem;">
                <!--头像-->
                <div class="user-common">
                  <div><img v-if="!comment.anonymous" :src="comment.userAvatar"></div>
                  <div><img v-if="comment.anonymous" src='../../../public/defaultAvatar.png'></div>
                  <!--姓名-->
                  <div class="name"  v-if="comment.anonymous">匿名用户</div>
                  <div class="name"  v-if="!comment.anonymous">{{comment.username}}</div>
                </div>
                <!--评价内容-->
                <div style="margin: 5px"><p class="feed">{{comment.commentContent}}</p></div>
                <!--评价时间-->
                <div style="color: darkgray;font-size: .8rem;margin-top: .2rem;margin-bottom: .4rem;">{{comment.commentDate}}</div>
                <hr/>
              </div>
            </div>
        </div>
    <!--      //为输入框占据空间，使最后一行可见-->
      <div style="height: 60px"></div>
        </div>
  </template>
<script>
  import {Toast} from "mint-ui";
  export default {
    name: "detail_estimate",
    props: {
      comment_time:Array
    },
    data(){
      return{
          toastInstance:null,
          teacher_comments:[]
      }
    },
    mounted(){
      let id = localStorage.getItem("teacherId"); //vuex中的teacherId
      this.$axios.get(this.mainUrl+`/api/v1.0/comment/lists/${id}`,{
        headers: {
          "Authorization": sessionStorage.login_token
        }
      })
        .then((res) => {
            console.log("comments",res);
            if (res.data.status === "success") {
                res.data.data.map((item) => {
                    item.commentDate = this.resolvingDate(item.commentDate);
                });
                this.teacher_comments = res.data.data;
                // 将匿名情况转化为布尔值
                res.data.data.map((res,index) => {
                  if (res.isAnonymous === 1) {
                    this.teacher_comments[index].anonymous = true;
                  } else if (res.isAnonymous === 0) {
                    this.teacher_comments[index].anonymous = false;
                  }
                })
            } else {
                this.show(res.data.errorMsg);
            }
        })
        .catch((err) => {
            console.log(err);
            this.show("网络连接错误！");
        })
    },
    methods: {
        show(toastMessage){
          this.toastInstance = Toast({
              message: toastMessage,
              position: 'middle',
              duration: 500
          })
        },
        resolvingDate(date){                   //将后台传入的数据转成正确的时间格式
        //date是传入的时间
          let d = new Date(date);
          let month = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
          let day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
          let hours = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
          let min = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
          let sec = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();

          let times=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;

          return times
      }
  }
}
</script>

<style scoped lang="less">
@mainColor:#1989fa;
@dottedColor:gainsboro;
.detail_estimate{
    width: 90%;
    margin: 0 auto;
    .comment_window{
        margin: 10px 0 10px 0;
    }
    img{
        border: .1rem solid #e9e9e9;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
    }
  .user-common{
    display: flex;
    flex-direction: row;
  }
    .name{
        color: #a9a598;
        margin-top: .2rem;
        margin-left: .6rem;
    }
    .like_count{
        position: absolute;
        right: 20px;
        top: 4px;
    }

    .feed{
        text-align: justify;
        text-justify: newspaper;
        //内容自动换行
        word-break: break-all;
    }
    .butt_like_count{
        border: none;
        background-color: white;
    }
    .cutline{
        border-bottom:1px dashed @dottedColor;
    }
}
</style>
