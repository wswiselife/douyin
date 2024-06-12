<script setup lang="ts">
import HeaderSlot from "@/components/header/HeaderSlot.vue";
import BottomSheet from "@/components/BottomSheet.vue";
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

/**
 * 入学时间
 */
const showTimePopup = ref<boolean>(false);
const time = () => {
    showTimePopup.value = true;
};

/**
 * 可见范围
 */
const showScopePopup = ref<boolean>(false);
const scope = () => {
    showScopePopup.value = true;
};
</script>

<template>
    <div class="change-school">
        <HeaderSlot>
            <template #center> 添加学校 </template>

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

        <div class="list">
            <div class="item">
                <div class="name">学校</div>
                <div class="setting">
                    <div class="content">点击设置</div>
                    <div class="icon-box">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                </div>
            </div>
            <div class="item" @click="">
                <div class="name">院系</div>
                <div class="setting">
                    <div class="content">点击设置</div>
                    <div class="icon-box">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                </div>
            </div>
            <div class="item" @click="time">
                <div class="name">入学时间</div>
                <div class="setting">
                    <div class="content">点击设置</div>
                    <div class="icon-box">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="name">学历</div>
                <div class="setting">
                    <div class="content">点击设置</div>
                    <div class="icon-box">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                </div>
            </div>
            <div class="item" @click="scope">
                <div class="name">展示范围</div>
                <div class="setting">
                    <div class="content">点击设置</div>
                    <div class="icon-box">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </div>

        <BottomSheet
            :showPopup="showTimePopup"
            @update:showPopup="val => (showTimePopup = val)"
        >
            <template #content> 提供的内容 </template>
        </BottomSheet>
        <BottomSheet
            :showPopup="showScopePopup"
            @update:showPopup="val => (showScopePopup = val)"
        >
            <template #content> 提供的dddddddddddd内容 </template>
        </BottomSheet>
    </div>
</template>

<style scoped lang="scss">
.change-school {
    width: 100%;
    height: 100%;

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

    .list {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .item {
            padding: 10px 20px;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .setting {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 3px;

                .icon-box {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    ion-icon {
                        font-size: 18px;
                    }
                }
            }
        }
    }
}
</style>
