/**
 * 清空所有用户数据
 */
let clear = () => {
  // 清空用户信息
  clearUserInf()
  // 情况用户菜单信息
  clearUserMenu()
  return true
}

/// /////////////////////////////////////////////用户信息处理///////////////////////////////////////////////
let UserInfKey = 'userInf'
/**
 * 保存用户信息
 * @param userInf
 */
let setUserInf = (userInf) => {
  localStorage.setItem(UserInfKey, JSON.stringify(userInf))
  return true
}

/**
 * 清空用户信息
 */
let clearUserInf = () => {
  localStorage.removeItem(UserInfKey)
  return true
}

/**
 * 获取用户信息
 * @param keyName  键的名称
 */
let getUserInfoByKey = (keyName) => {
  let userInfoObj = JSON.parse(localStorage.getItem(UserInfKey))
  if (!userInfoObj) {
    return ''
  }
  return userInfoObj[keyName] !== undefined ? userInfoObj[keyName] : ''
}

/**
 * 获取用户信息
 * @returns Object
 */
let getUserInfo = () => {
  return JSON.parse(localStorage.getItem(UserInfKey))
}

/// ////////////////////////////////////////////用户菜单///////////////////////////////////////////////
let UserMenuKey = 'userMenu'
/**
 * 设置用户菜单
 * @param  userMenu
 */
let setUserMenu = (userMenu) => {
  localStorage.setItem(UserMenuKey, JSON.stringify(userMenu))
  return true
}

/**
 * 获取用户菜单信息
 */
let getUserMenu = () => {
  return JSON.parse(localStorage.getItem(UserMenuKey))
}
/**
 * 清空用户菜单信息
 */
let clearUserMenu = () => {
  localStorage.removeItem(UserMenuKey)
  return true
}

/**
 * 检查用户是否有权限
 * @param role
 */
let checkUserRole = (role) => {
  let UserMenu = getUserMenu()
  let hasRole = false
  if (UserMenu === undefined) {
    return hasRole
  }
  UserMenu.forEach((item) => {
    if (item.subs !== undefined) {
      item.subs.forEach((subItem) => {
        if (subItem.index === role) hasRole = true
        subItem.actionSub.forEach((actionSub) => {
          if (actionSub.index === role) hasRole = true
        })
      })
    }
  })
  return hasRole
}

export default { clear, setUserInf, getUserInfoByKey, getUserInfo, clearUserInf, setUserMenu, clearUserMenu, getUserMenu, checkUserRole }
