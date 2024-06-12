import { usePiniaStore } from "@/store/store";

const isLoged = () => {
    const piniaStore = usePiniaStore(); // 这段为什么需要写在里面，如果写在外面，pinia还没激活
    const token = localStorage.getItem("token");

    if (!token) {
        piniaStore.setLogStatus(false);
        return;
    }

    // 判断token是否有效

    // 已登录
    piniaStore.setLogStatus(true);
};

export default {
    isLoged,
};
