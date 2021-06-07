import router from 'umi/router';

const sessionStore = sessionStorage.getItem('APP_STORE_CACHE');

// const token = sessionStorage.getItem('token');
// if (token == null) {
//   router.push('/login');
// }

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    // 拿到组件state中的值对值进行初始化
    onStateChange(state) {
      // 直接取state参数
      sessionStorage.setItem(
        'APP_STORE_CACHE',
        JSON.stringify({ ...state, global: { ...state.global, panes: [] } }),
      );
    },
    // 初始化值，优于state赋值
    innitinitialState: sessionStore ? JSON.parse(sessionStore) : null,
  },
};
