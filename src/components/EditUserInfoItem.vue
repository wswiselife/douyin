<script setup lang="ts">
interface Props {
    title: string;
    content?: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="edit-list">
        <div class="edit-item">
            <div class="title">
                {{ props.title }}
            </div>
            <div class="content-box">
                <div class="content">
                    <span>{{ props.content }}</span>
                </div>
                <div class="icon-box">
                    <ion-icon
                        name="chevron-forward-outline"
                        class="icon"
                    ></ion-icon>
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

    .title {
        min-width: 80px;
    }

    .content-box {
        display: flex;
        justify-content: center;
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
