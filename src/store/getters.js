const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  isGenerateRoutes: state => state.permission.isGenerateRoutes,
  asyncRouterMap: state => state.permission.asyncRouterMap,
  device: state => state.app.device,
  permission_routers: state => state.permission.routers,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
}
export default getters