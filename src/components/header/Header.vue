<script setup lang="ts">
const Props = defineProps({
    isFixed: {
        type: Boolean,
        default: true,
    },
    leftIcon: {
        type: String,
        default: "chevron-back-outline",
    },
    leftText: {
        type: String,
        default: "",
    },
    centerIcon: {
        type: String,
        default: "chevron-back-outline",
    },
    centerText: {
        type: String,
        default: "",
    },
    rightIcon: {
        type: String,
        default: "chevron-back-outline",
    },
    rightText: {
        type: String,
        default: "",
    },
});
</script>

<template>
    <div class="header" :class="[Props.isFixed ? 'fixedlayout' : '']">
        <!-- 左侧icon/文字 -->
        <div class="left">
            {{ Props.leftText }}
        </div>

        <!-- 中间 -->
        <div class="center">
            {{ Props.centerText }}
        </div>

        <!-- 右侧 -->
        <div class="right">
            {{ Props.rightText }}
        </div>
    </div>
</template>

<style scoped>
.fixedlayout {
    position: fixed;
    top: 0;
    width: 100%;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 1.6rem;
    border-bottom: var(--border-gray);
}
</style>
