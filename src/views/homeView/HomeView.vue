<script setup lang="ts">
import BasicVideo from "@/components/BasicVideo.vue";
import Footer from "@/components/footer/Footer.vue";
import { storeToRefs } from "pinia";
import Comment from "../../components/Comment.vue";

import { usePiniaStore } from "@/store/store";
const piniaStore = usePiniaStore();

const pinia = storeToRefs(piniaStore);

const commentHandle = () => {
    console.log("click comment");
    piniaStore.change();
    // console.log("piniaStore", pinia.showComment);
    // pinia.showComment = !pinia.showComment;
    // console.log("piniaStore222", pinia.showComment);
};
</script>

<template>
    <div class="home">
        <BasicVideo class="video"></BasicVideo>
        <div class="box">
            <div class="right">
                <div class="love icon">
                    <ion-icon name="heart-outline"></ion-icon>
                </div>
                <div class="comment icon" @click="commentHandle">
                    <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                </div>
                <div class="collection icon">
                    <ion-icon name="star-outline"></ion-icon>
                </div>
                <div class="share icon">
                    <ion-icon name="arrow-redo-outline"></ion-icon>
                </div>
                <div class="music icon">
                    <ion-icon name="musical-notes-outline"></ion-icon>
                </div>
            </div>

            <div class="comment">
                <Comment></Comment>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<style scoped lang="scss">
.home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    // justify-content: center;
    /* padding: 10px; */
    // position: relative;
    background-color: #465540;
}

.box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.right {
    position: absolute;
    // bottom: 58px;
    bottom: 98px;
    right: 0;
    width: auto;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    .icon {
        font-size: 26px;
    }
}

.comment {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
}

// .footer {
//     position: absolute;
//     bottom: 0;
//     width: 100%;
// }
</style>
