import {  constantRouterMap } from '@/router'
import {deepClone} from '@/assets/js/public'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    asyncRouterMap:[],
    isGenerateRoutes:false,
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    setRoute(state){
      state.isGenerateRoutes = true;
      switch (1) {
        case 1:
          //美食
          for (var i = 0; i < constantRouterMap.length; i++) {
            console.log(constantRouterMap[i].name)
            if (constantRouterMap[i].name == 'Food') {
              console.log(2)
              constantRouterMap[i].hidden = true;
            }
          }
          state.asyncRouterMap = deepClone(constantRouterMap)
          break;
      }
    },
    GenerateRoutes(state,id){
      state.isGenerateRoutes = true;
      switch (id){
        case 1:
          //美食
          for(var i=0;i<constantRouterMap.length;i++){
            if(constantRouterMap[i].name=='Food'){

              constantRouterMap[i].hidden = false;
            }
          }
          break;
        case 2:
          //酒店
          for(var i=0;i<constantRouterMap.length;i++){
            if(constantRouterMap[i].name=='Hotel'){
              constantRouterMap[i].hidden = false;
            }
          }
          break;
        case 3:
          //旅行社
          for(var i=0;i<constantRouterMap.length;i++){
            if(constantRouterMap[i].name=='Travel'){
              constantRouterMap[i].hidden = false;
            }
          }
          break;
        case 4:
          //门票
          for(var i=0;i<constantRouterMap.length;i++){
            if(constantRouterMap[i].name=='Ticket'){
              constantRouterMap[i].hidden = false;
            }
          }
          break;
        case 5:
          //汽车租赁
          for(var i=0;i<constantRouterMap.length;i++){
            if(constantRouterMap[i].name=='Car'){
              constantRouterMap[i].hidden = false;
            }
          }
          break;
        // case 6:
        //   //广告
        //   for(var i=0;i<constantRouterMap.length;i++){
        //     if(constantRouterMap[i].name=='Car'){
        //       constantRouterMap[i].hidden = false;
        //     }
        //   }
        //   break;
        case 7:
          //微电影
          for(var i=0;i<constantRouterMap.length;i++){
            if(constantRouterMap[i].name=='Movie'){
              constantRouterMap[i].hidden = false;
            }
          }
          break;
        default:
          for(var i=0;i<constantRouterMap.length;i++){
            constantRouterMap[i].hidden = false;
          }
      }
      state.asyncRouterMap = deepClone(constantRouterMap)
      // state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        // console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
