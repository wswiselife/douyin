<script setup lang="ts">
interface SearchProps {
    rightIcon?: String;
    rightText?: String;
    placeholder: string;
}

const Props = defineProps<SearchProps>();
</script>

<template>
    <div class="search-box">
        <div class="icon-box">
            <ion-icon name="search-outline"></ion-icon>
        </div>
        <div class="search">
            <input type="text" :placeholder="Props.placeholder" />
        </div>
        <div class="right-box" v-if="Props.rightIcon || Props.rightText">
            <div class="right-text" v-if="Props.rightText">搜索</div>
            <ion-icon name="search" class="right-icon" v-else></ion-icon>
        </div>
    </div>
</template>

<style scoped lang="scss">
.search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: rgba($color: #807f7f, $alpha: 0.3);
    border-radius: var(--rounded);
    // padding: 12px;

    .icon-box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-inline: 6px;
        font-size: 16px;
    }

    .search {
        flex: 1;
        position: relative;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: none;

        input {
            width: 100%;
            // height: 100%;
            height: 24px;
            padding-right: 10px;
            margin-right: 10px;
            background-color: transparent;
            border: none;
            // 清除得到焦点样式
            outline: none;
            // 光标颜色
            caret-color: var(--primary-color);
        }

        input[type="text"] {
            background-color: none;
        }
    }

    .right-box {
        .right-text {
            padding: 0 10px;
            font-size: 16px;
            border-left: var(--border-gray);
        }

        .right-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            padding-right: 10px;
        }
    }
}
</style>
