<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

interface HeaderProps {
    case: string;
    leftIcon?: string;
    leftText?: string;
    centerText?: string;
    rightText?: string;
    rightIcon?: string;
    rightClick?: () => void;
}

const Props = defineProps<HeaderProps>();

const goBack = () => {
    router.back();
};
</script>

<template>
    <div v-if="Props.case == 'one'" class="case-one">
        <!-- 左侧icon/文字 -->
        <div class="left">
            <div class="left-text" v-if="Props.leftText" @click="goBack">
                {{ Props.leftText }}
            </div>
            <div class="left-icon" @click="goBack" v-else>
                <ion-icon :name="Props.leftIcon"></ion-icon>
            </div>
        </div>

        <!-- 中间 -->
        <div class="center">
            {{ Props.centerText }}
        </div>

        <!-- 右侧 -->
        <div class="right" @click="Props.rightClick()">
            <div class="right-text" v-if="Props.rightText">
                {{ Props.rightText }}
            </div>
            <div class="right-icon" v-else>
                <ion-icon :name="Props.rightIcon"></ion-icon>
            </div>
        </div>
    </div>

    <div v-if="Props.case === 'two'" class="case-two">
        <!-- 左侧icon/文字 -->
        <div class="left">
            <div class="left-text" v-if="Props.leftText" @click="goBack">
                {{ Props.leftText }}
            </div>
            <div class="left-icon" @click="goBack" v-else>
                <ion-icon :name="Props.leftIcon"></ion-icon>
            </div>
        </div>

        <!-- 中间 -->
        <div class="center">
            {{ Props.centerText }}
        </div>
    </div>

    <div v-if="Props.case === 'three'" class="case-three">
        <div class="left">
            <div class="left-text" @click="goBack" v-if="Props.leftText">
                {{ Props.leftText }}
            </div>
            <div class="left-icon" @click="goBack" v-else>
                <ion-icon :name="Props.leftIcon"></ion-icon>
            </div>
        </div>

        <div class="right">
            <div class="right-text" v-if="Props.rightText">
                {{ Props.rightText }}
            </div>
            <div class="right-icon" v-else>
                <ion-icon :name="Props.rightIcon"></ion-icon>
            </div>
        </div>
    </div>
</template>

<style scoped>
.case-one {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 1.2rem;
    height: 48px;
    line-height: 48px;
    background-color: #ffffff;

    .left {
        .left-text {
            font-size: 16px;
        }

        .left-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 26px;
        }
    }

    .center {
        font-weight: 600;
        font-size: 16px;
    }

    .right-text {
        font-size: 14px;
    }

    .right-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
    }
}

.case-two {
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 36px;
    line-height: 36px;
    padding: 0 1.2rem;

    .left {
        position: absolute;
    }

    .left-text {
        font-size: 16px;
    }

    .left-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
    }

    .center {
        position: absolute;
        top: 50%;
        bottom: 0;
        left: 50%;
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        transform: translate(-50%, -50%);
    }

    .right-text {
        font-size: 16px;
    }

    .right-icon {
        font-size: 26px;
    }
}

.case-three {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 1.6rem 1.2rem; */
    padding: 1.2rem;

    .left {
        .left-icon {
            font-size: 26px;
        }
        .left-text {
            font-size: 16px;
        }
    }

    .right {
        .right-icon {
            font-size: 26px;
        }

        .right-text {
            font-size: 16px;
        }
    }
}
</style>
