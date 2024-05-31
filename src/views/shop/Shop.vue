<template>
    <div>
        <h1>上传视频和描述信息</h1>
        <input type="file" @change="handleFileUpload" />
        <input type="text" v-model="description" placeholder="描述" />
        <input type="text" v-model="cover" placeholder="封面" />
        <button @click="upload">上传</button>
    </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
    setup() {
        const file = ref(null);
        const description = ref("");
        const cover = ref("");

        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJhY2NvdW50IjoidHVuaWFuZyIsImlhdCI6MTcxNzEzMDE1NSwiZXhwIjoxNzE3NzM0OTU1fQ.hb8WvF7NqZbwEB81hiLgjBYAqPpi1GBGYeUFfU2Mg98";

        const handleFileUpload = event => {
            file.value = event.target.files[0];
        };

        const upload = async () => {
            if (!file.value) {
                alert("请先选择一个文件");
                return;
            }

            // 创建FormData对象
            const formData = new FormData();
            formData.append("file", file.value);
            formData.append("description", description.value);
            formData.append("cover", cover.value);

            try {
                const response = await axios.post(
                    "http://localhost:3000/v1/upload/uploadDescription",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("上传成功:", response.data);
            } catch (error) {
                console.error("上传失败:", error);
            }
        };

        return {
            file,
            description,
            cover,
            handleFileUpload,
            upload,
        };
    },
};
</script>

<style scoped>
/* 样式可以根据需要自定义 */
</style>
