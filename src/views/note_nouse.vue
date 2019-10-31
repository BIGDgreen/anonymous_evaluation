<template>

</template>

<script>
  export default {
    name: "note_nouse"

    let params = new URLSearchParams();
  params.append('comment_content', comment_content);
  params.append('user_id', sessionStorage.getItem("userId"));
  console.log(sessionStorage.getItem("userId"));
  params.append('like_num', 0);

  that.axios.post(this.mainUrl + `/api/v1/data/info/${id}/comment`, params)
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        $("#commentInput").val("");
        //刷新当前页面
        let NewPage = '_empty' + '?time=' + new Date().getTime()/500;
        that.$router.push(NewPage);
        that.$router.go(-1);
      } else if (response.data.status === "fail") {
        that.$layer.alert(response.data.data.errorMsg);
      }
    }).catch((err) => {
    console.log(err);
  })

  }
</script>

<style scoped>

</style>