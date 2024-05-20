<script setup lang="ts">
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
}>();

// 传递颜色的值，怎么处理-2024-05-20
// color:String;

// 动态样式问题
// props大小写问题--20240520
</script>

<template>
    <div
        @click="Props.click()"
        :class="[Props.outline ? 'button-outline' : 'button']"
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
    padding: 10px 12px;
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
    padding: 10px 12px;
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
