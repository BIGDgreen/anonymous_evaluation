<template>
    <div class="blank">
        加载中，请稍候...
    </div>
</template>

<script>
    export default {
        name:"blank",
        mounted() {
            // 获取href中的access_token
            let href = window.location.href;
            if (href) {
                let accessToken = href.match(/\?SUST_TK=(.*)/)[1];
                sessionStorage.setItem("token", accessToken);
                this.$axios
                    .get(this.mainUrl + '/api/v1.0/login/login', {
                        params: {
                            'access_token': accessToken
                        }
                    })
                    .then((res) => {
                        console.log("login_info", res);
                        if (res.data.status === 'success') {
                            // 将用户信息存入vuex
                            let userInfos = {
                                username: res.data.data.yibanAccount,
                                password: res.data.data.userAvatar,
                            };
                            let userInfoStore = Object.assign(res.data.data, userInfos);
                            this.$store.commit('SET_USERINFO', userInfoStore);
                            sessionStorage.setItem("userInfoStore", JSON.stringify(userInfoStore));
                            // 发送请求，传入用户名和密码
                            let params = new URLSearchParams();
                            params.append("username", res.data.data.yibanAccount);
                            params.append("password", res.data.data.userAvatar);
                            this.$axios
                                .post(this.mainUrl + '/api/v1.0/login/form', params)
                                .then((res) => {
                                    console.log("form", res);
                                    sessionStorage.setItem("login_token", res.headers.authorization);
                                    if (res.data.authenticated) {
                                        // 返回首页
                                        this.$router.push({path: '/'});
                                    }
                                })
                                .catch((error) => {
                                    console.error("form_err", error);
                                })
                        } else {
                            console.error("form_err2",res.data.data.errorMsg);
                        }
                    })
                    .catch((err) => {
                        console.error("login_err",err);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
