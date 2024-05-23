<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        leftIcon?: string;
        leftText?: string;
        label?: string;
        content?: string;
        rightIcon?: string;
    }>(),
    {
        rightIcon: "chevron-forward-outline",
    }
);
</script>

<template>
    <div class="edit-list">
        <div class="edit-item">
            <!-- 左侧 -->
            <div class="left">
                <div class="icon-box" v-if="props.leftIcon">
                    <ion-icon :name="props.leftIcon"></ion-icon>
                </div>
                <div class="left-text" v-if="props.leftText">
                    {{ props.leftText }}
                </div>
                <div class="label" v-if="props.label">
                    {{ props.label }}
                </div>
            </div>

            <div class="content-box">
                <div class="content">
                    <span>{{ props.content }}</span>
                </div>
                <div class="icon-box">
                    <ion-icon :name="props.rightIcon" class="icon"></ion-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.edit-list {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    width: 100%;
    height: 100%;
    padding: 1.2rem 1.6rem;
    font-size: 1.4rem;
}

.edit-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;

        .icon-box {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
        }

        .left-text {
            width: 80px;
            font-size: 16px;
        }

        .label {
            font-size: 16px;
        }
    }

    .content-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.8rem;
        color: #ccc;

        .content {
            max-width: 100%;
        }

        .icon-box {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.6rem;
        }
    }
}
</style>
