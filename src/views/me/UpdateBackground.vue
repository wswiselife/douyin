<script setup lang="ts">
import { ref } from "vue";

interface Props {
    showDialog: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(["update:showDialog", "new-background"]);

const cancel = () => {
    emit("update:showDialog", false);
    clearInput();
};

const newBackgroundUrl = ref<string>("");
const confirm = () => {
    // emit url给父组件
    emit("new-background", newBackgroundUrl.value);
    cancel();
};

const clearInput = () => {
    newBackgroundUrl.value = "";
};
</script>

<template>
    <div>
        <el-dialog
            v-model="props.showDialog"
            @close="cancel"
            title="更改背景"
            width="65%"
        >
            <el-form>
                <el-form-item label="url">
                    <el-input v-model="newBackgroundUrl" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="confirm">
                        上传
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped></style>
