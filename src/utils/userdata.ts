/**
 * 清空所有用户数据
 */
let clear = ():boolean => {
    // 清空用户信息
    clearUserInf()
    return true
}

///////////////////////////////////////////////用户信息处理///////////////////////////////////////////////

/**
 * 保存用户信息
 * @param userInf 
 */
let setUserInf = (userInf: Object):boolean => {
    localStorage.setItem('userInf',userInf.toJSONString())
    return true;
}

/**
 * 清空用户信息
 */
let clearUserInf = ():boolean => {
    localStorage.removeItem('userInf')
    return true
}

/**
 * 获取用户信息
 * @param keyName  键的名称
 */
let getUserInfoByKey = (keyName: string):string => {
    let userInfoObj = JSON.parse(localStorage.getItem('userInf'));
    return userInfoObj.keyName === undefined ? userInfoObj.keyName : ""
}

/**
 * 获取用户信息
 * @returns Object
 */
let getUserInfo = ():Object => {
    return JSON.parse(localStorage.getItem('userInf'));
}


///////////////////////////////////////////////用户菜单///////////////////////////////////////////////


export { clear, setUserInf, getUserInfoByKey, getUserInfo, clearUserInf }
