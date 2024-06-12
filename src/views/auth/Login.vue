<script setup lang="ts">
import { reactive, ref } from "vue";
import loginApi from "../../api/user";
import { useRouter } from "vue-router";
import Header from "@/components/header/Header.vue";

const router = useRouter();

const form = reactive({
    account: "旺仔小乔",
    password: "password",
});

/**
 * 提示处理
 * @param message 提示信息
 */
const interactionRightCol = (message: string) => {
    isShowTipContent.value = true;
    tipContent.value = message;
    setTimeout(() => {
        isShowTipContent.value = false;
    }, 2000);
};

const isShowTipContent = ref<boolean>(false);
const tipContent = ref<string>();

const login = async () => {
    if (!hasProtocol.value) {
        interactionRightCol("请同意用户协议和隐私政策");
        return;
    }

    // console.log(form);
    let data = {
        account: form.account,
        password: form.password,
    };
    // console.log(data);

    const response = await loginApi.loginApi(null, data);
    // console.log("response", response);
    if (response.code == 200) {
        interactionRightCol("登录成功");
        localStorage.setItem("token", response.data.token);

        setTimeout(() => {
            router.push("/");
        }, 1000);
    } else {
        interactionRightCol(response.message);
    }
};

const goRegister = () => {
    router.push("register");
};

const hasProtocol = ref<boolean>(false);

const removePassword = () => {
    form.password = "";
};

/**
 * 用户协议and隐私政策
 */
const protocel = () => {
    interactionRightCol("用户协议");
};
const privacy = () => {
    interactionRightCol("隐私政策");
};
</script>

<template>
    <div class="login">
        <Header
            case="three"
            leftIcon="chevron-back-outline"
            rightText="帮助与设置"
        ></Header>

        <div class="content">
            <div class="title">账号密码登录</div>
            <div class="account box">
                <input
                    type="text"
                    v-model="form.account"
                    class="input"
                    placeholder="请输入账号"
                />
            </div>
            <div class="password box">
                <input
                    type="password"
                    v-model="form.password"
                    class="input"
                    placeholder="请输入密码"
                />
                <div class="icon-box">
                    <ion-icon
                        @click="removePassword"
                        name="close-circle-outline"
                        class="icon"
                    ></ion-icon>
                </div>
            </div>

            <div class="protocol">
                <input type="checkbox" v-model="hasProtocol" id="protocol" />
                <div class="content">
                    <label for="protocol">已阅读并同意</label
                    ><span @click="protocel">用户协议</span>和<span
                        @click="privacy"
                        >隐私政策</span
                    >
                </div>
            </div>

            <div class="operate">
                <button class="btn" @click="login">登录</button>
            </div>

            <div class="other">
                <div class="register" @click="goRegister">注册</div>
                <div class="phone-login">手机密码登录</div>
            </div>
        </div>

        <!-- tip -->
        <div class="tip-content" v-if="isShowTipContent">
            {{ tipContent }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.login {
    width: 100%;
    height: 100%;
    position: relative;

    .content {
        // padding: 10px 15px;
        padding: 10px 25px;

        .title {
            padding-bottom: 15px;
            font-size: 18px;
            color: rgb(45, 45, 45);
        }

        .box {
            width: 100%;

            .input {
                width: 100%;
                padding: 12px 8px;
                border: none;
                outline: none;
                caret-color: var(--primary-color);
                background-color: #f9f9f9;
                border-radius: var(--rounded);
            }
        }

        .account {
            display: flex;
            align-items: center;
            padding-bottom: 12px;
        }

        .password {
            width: 100%;
            height: auto;
            position: relative;
            margin-bottom: 55px;
            .input {
                position: absolute;
                width: 100%;
            }

            .icon-box {
                position: absolute;
                top: 23px;
                right: 10px;
                transform: translateY(-50%);
            }
        }

        .protocol {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-bottom: 10px;

            .content {
                padding: 5px;
                font-size: 12px;

                span {
                    padding: 0 3px;
                    color: var(--link-color);
                }
            }
        }

        .operate {
            // width: 100%;
            // margin: 0 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-bottom: 15px;

            .btn {
                width: 100%;
                padding: 10px 15px;
                font-size: 16px;
                background-color: var(--secondly-color);
                color: white;
                border-radius: var(--rounded);
                border: none;
            }
        }

        .other {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--link-color);
            font-size: 12px;
        }
    }

    .tip-content {
        z-index: 999;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--tip-bg);
        color: white;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: var(--rounded);
    }
}
</style>
