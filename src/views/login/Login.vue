<script setup lang="ts">
import { reactive } from "vue";
import loginApi from "../../api/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Header from "@/components/header/Header.vue";

const router = useRouter();

const form = reactive({
    account: "",
    password: "",
});

const login = async () => {
    console.log(form);
    let data = {
        account: form.account,
        password: form.password,
    };
    console.log(data);

    const response = await loginApi.loginApi(null, data);
    console.log("response", response);
    if (response.code == 200) {
        ElMessage({
            message: "登录成功",
        });
        localStorage.setItem("token", response.data.token);

        router.push("/");
    }
};
</script>

<template>
    <div class="login">
        <Header
            case="one"
            leftIcon="chevron-back-outline"
            centerText="登录"
            rightIcon="ellipsis-horizontal-outline"
        ></Header>

        <div class="content">
            <div class="account">
                账号：<input type="text" v-model="form.account" />
            </div>
            <div class="password">
                密码：<input type="text" v-model="form.password" />
                <ion-icon name="eye-outline"></ion-icon>
            </div>
        </div>

        <div class="operate">
            <button class="btn" @click="login">登录</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.login {
    width: 100%;
    height: 100%;

    .login-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .content {
        padding: 20px 15px;

        .account {
            display: flex;
            align-items: center;
        }

        .password {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }

    .operate {
        width: 60%;

        .btn {
            width: 100%;
        }
    }
}
</style>
