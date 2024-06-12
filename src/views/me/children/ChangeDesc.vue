<script setup lang="ts">
import HeaderSlot from "@/components/header/HeaderSlot.vue";
import { ref, watch } from "vue";

const nickname = ref<string>("");
const allowSave = ref<boolean>(false);

// const save = () => {
//     console.log("save");
//     if (nickname.length == 0) {
//     }
// };
const nicknameLength = ref<number>(0);
watch(nickname, newval => {
    nicknameLength.value = nickname.value.length;

    if (newval.length == 0) {
        allowSave.value = false;
    } else {
        allowSave.value = true;
    }
});

const removeNickname = () => {
    nickname.value = "";
};
</script>

<template>
    <div class="change-name">
        <HeaderSlot>
            <template #center> 修改简介 </template>

            <template #right>
                <button
                    class="save"
                    :class="allowSave ? 'allow-save' : 'no-save'"
                    :disabled="!allowSave"
                >
                    保存
                </button>
            </template>
        </HeaderSlot>

        <div class="title">我的简介</div>

        <div class="nickname">
            <textarea
                v-model="nickname"
                maxlength="200"
                class="input"
                style="min-height: 150px"
            ></textarea>
            <div class="icon-box" @click="removeNickname">
                <ion-icon name="close-circle" class="icon"></ion-icon>
            </div>
        </div>

        <div class="desc">
            <div class="right">
                <span>{{ nicknameLength }}</span
                >/200
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.save {
    border: none;
    background-color: white;
    font-size: 16px;
}

.allow-save {
    color: var(--primary-color);
    font-weight: 600;
}

.no-save {
    color: rgba($color: #ff758f, $alpha: 0.8);
}

.title {
    padding: 10px 20px;
    font-size: 14px;
}

.nickname {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding-block: 10px;
    position: relative;
    height: auto;

    .input {
        border: none;
        outline: none;
        caret-color: var(--primary-color);
        margin-inline: 20px;
        border-bottom: 1px solid #ccc;
        width: 90%;
        height: auto;
        font-size: 14px;
        padding-block: 5px;
        font-family: inherit; /* 使用父元素的字体 */
        max-height: 200px;
    }

    .icon-box {
        position: absolute;
        right: 20px;
        bottom: 15px;
        width: auto;
        display: flex;
        color: black;
        // background: red;
        justify-content: center;
        align-items: center;
        font-family: "Roboto", sans-serif;

        .icon {
            font-size: 18px;
            color: #ccc;
        }
    }
}

.desc {
    display: flex;
    justify-content: flex-end;

    padding: 0 20px;
    font-size: 12px;
}
</style>
