/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-18 11:26:10
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-18 14:51:53
 * @Description: lcl
 */
const getters = {
  role: state => state.user.role,
  token: state => state.user.token,
  userName: state => state.user.userName,
  asideMenu: state => {
    const routes = state.getRouter.routes;
    return routes.children;
  },
};

export default getters;
