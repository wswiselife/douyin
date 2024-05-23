<script setup lang="ts">
import { computed } from "vue";

// 提示差？
// interface ButtonProps {
//     label: String;
//     click: Function;
//     icon?: String;
// }

const Props = defineProps<{
    label: string;
    outline?: boolean;
    click: () => void;
    icon?: string;
    small?: boolean;
}>();

// 传递颜色的值，怎么处理-2024-05-20
// color:String;

// 动态样式问题
// props大小写问题--20240520

// const smallStyle = computed(() => {
//     if (Props.small) {
//         return `padding: 5px;`;
//     }
//     return `padding: 10px;`;
// });

const smallStyle = computed(() => ({
    padding: Props.small ? "5px" : "10px",
}));
</script>

<template>
    <div
        @click="Props.click"
        :class="[Props.outline ? 'button-outline' : 'button']"
        :style="smallStyle"
    >
        <div class="icon-box" v-if="Props.icon">
            <ion-icon :name="Props.icon"></ion-icon>
        </div>
        <div class="label">{{ Props.label }}</div>
    </div>
</template>

<style scoped lang="scss">
.button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    width: 100%;

    color: var(--white);
    background-color: var(--primary-color);
    border-radius: var(--rounded);
    cursor: pointer;
}

.button-outline {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    width: 100%;
    color: var(--balck);
    background-color: var(--white);
    border: var(--border-gray);
    border-radius: var(--rounded);
    cursor: pointer;
}

.icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.label {
    font-weight: 600;
}
</style>
