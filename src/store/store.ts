import { defineStore } from 'pinia'

export const usePiniaStore = defineStore('pinia',{
    state:()=>({
        showComment: false
    }),
    actions:{
        change(){
            this.showComment = !this.showComment
            console.log('this.showComment',this.showComment);
        }
    }
})

