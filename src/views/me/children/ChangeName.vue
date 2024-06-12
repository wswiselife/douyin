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

// 获取今天的日期
const today = new Date();

// 计算今天的日期推迟30天后的日期
const calculateFutureDate = (days: number): string => {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + days);
    return futureDate.toISOString().split("T")[0];
};
const futureDate = ref<string>(calculateFutureDate(30));
</script>

<template>
    <div class="change-name">
        <HeaderSlot>
            <template #center> 修改名字 </template>

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

        <div class="title">我的名字</div>

        <div class="nickname">
            <input type="text" v-model="nickname" maxlength="20" />
            <div class="icon-box" @click="removeNickname">
                <ion-icon name="close-circle" class="icon"></ion-icon>
            </div>
        </div>

        <div class="desc">
            <div class="left">
                名字30天内可修改4次，<span>{{ futureDate }}</span
                >前还可修改<span>4</span>次
            </div>
            <div class="right">
                <span>{{ nicknameLength }}</span
                >/20
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

    input {
        border: none;
        outline: none;
        caret-color: var(--primary-color);
        margin-inline: 20px;
        border-bottom: 1px solid #ccc;
        width: 100%;
        font-size: 14px;
        padding-block: 5px;
    }

    .icon-box {
        position: absolute;
        right: 20px;
        top: 15px;
        width: auto;
        display: flex;
        color: black;
        // background: red;
        justify-content: center;
        align-items: center;

        .icon {
            font-size: 18px;
            color: #ccc;
        }
    }
}

.desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    font-size: 12px;
}
</style>
