<script setup lang="ts"></script>

<template>
    <div class="header">
        <div class="left-box slot">
            <slot name="left">
                <ion-icon name="chevron-back-outline"></ion-icon>
            </slot>
        </div>

        <div class="center-box slot">
            <slot name="center"> center</slot>
        </div>

        <div class="right-box slot">
            <slot name="right" icon>right</slot>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1.2rem;
}

.center-box {
    flex: 1;
    text-align: center;
}

.slot {
    font-size: 2.4rem;
}
</style>
