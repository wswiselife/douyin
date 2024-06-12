<script setup lang="ts">
import Header from "@/components/header/Header.vue";
</script>

<template>
    <div class="change-name container">
        <Header
            case="two"
            leftIcon="chevron-back-outline"
            centerText="选择地区"
        >
        </Header>

        <!-- 暂不设置 -->
        <div class="noLocation">暂不设置</div>
        <!-- 定位 -->
        <div class="location">
            <div class="icon-box">
                <ion-icon name="location"></ion-icon>
            </div>
            <div class="loca">点击开启定位</div>
        </div>
        <!-- 其他地区 -->
        <div class="other">
            <div class="title">其他地区</div>
            <div class="city">
                <div class="mycountry">中国</div>
                <div class="icon-box">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
            </div>
        </div>
        <!-- 国家组件 -->
        <div class="country">待更新哦！</div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
    font-size: 14px;

    .title {
        padding: 10px 20px;
    }

    .noLocation {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 20px;
    }
    .location {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        gap: 5px;
        padding: 20px;
    }

    .other {
        font-size: 12px;

        .city {
            font-size: 14px;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .country {
        padding: 20px;
    }
}
</style>
