<template>
  <div class="detail_introduce">
      <div class="base_message">
       <div ><img :src="teacher.teacherPhoto"></div>
       <div class="message" >
        <div>姓名：{{teacher.teacherName}}</div>
        <div>学位：{{teacher.teacherDegree}}</div>
        <div>学院：{{teacher.teacherCollege}}</div>
       </div>
      </div>
      <div style="margin: .4rem 5px 10px 5px">
          <b>个人简介：</b>
          <div style="margin-top: .6rem;margin-bottom: 1rem;">{{teacher.teacherIntroduction}}</div>
      </div>
  </div>
</template>

<script>
    export default {
    name: "detail_introduce",
    data(){
      return{
        teacher:{},
      }
    },
    mounted(){
      let id = localStorage.getItem("teacherId");
      this.$axios.get(this.mainUrl+`/api/v1.0/teacher/lists/${id}`,{
          headers: {
              "Authorization": sessionStorage.login_token
          }
      })
        .then((res) => {
          // console.log("detail",res);
          this.teacher = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

</script>

<style scoped lang="less">
  @mainColor:#1989fa;
  @dottedColor:gainsboro;
  .detail_introduce{
      width: 90%;
      margin: 0 auto;
      img {
          width: 90px;
          height: 140px;
          /*margin: 5px;*/
      }
      .base_message{
          display: flex;
          flex-direction: row;
          border-bottom: @dottedColor 1px solid;
          margin-top: 1rem;
          margin-bottom: 1rem;
          padding-bottom: .6rem;
      }
      .message{
          margin: 20px 10px 30px 10px;
          display: flex;
          flex-direction: column;
          justify-content:space-between;
          flex: 0 1 auto;
      }
      p{
          text-align: justify;
          text-justify: newspaper;
          word-break: break-all
      }
  }
</style>
