<template>
  <el-col>
    <el-col>
      <el-button @click="saveRoleList">保存</el-button>
    </el-col>
    <el-col style="">
      <el-tabs type="border-card">
        <el-tab-pane v-for="(menu,menuIndex) in menuList"
                     :label="menu.title"
                     v-bind:key="menuIndex">
          <el-col>
            <el-row :gutter="24">
              <el-col :span="12"
                      class="cardclass"
                      v-for="(sub ,subIndex) in menu.subs"
                      v-bind:key="subIndex">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>{{sub.title}}</span>
                  </div>
                  <el-col v-for="(action,index) in sub.actionSub"
                          v-bind:key="index"
                          class="actionClass">
                    <el-checkbox v-model="action.status"
                                 :true-label="1"
                                 :false-label="0">{{action.title}}</el-checkbox>
                  </el-col>

                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbName: '',
      role_id: 0,
      menuList: []
    }
  },
  created () {
    // this.menuList = userData.getUserMenu()
    this.breadcrumbName = this.$route.params.role_name === undefined ? '-' : this.$route.params.role_name
    this.role_id = this.$route.query.role_id
    if (this.role_id <= 0) {
      this.$router.push({ path: '/role-list' })
    }
    this.getUserMenu()
  },
  methods: {
    // 获取菜单信息
    getUserMenu () {
      this.$axios({
        method: 'get',
        url: '/role/get-role-node-list',
        params: { id: this.role_id }
      }).then(res => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        // userData.setUserMenu(res.data.items)
        this.menuList = res.data.items
        // this.items = res.data.items
      })
    },
    // 保存按钮
    saveRoleList () {
      let menu = []
      this.menuList.forEach((menulist) => {
        menulist.subs.forEach((subMenu) => {
          subMenu.actionSub.forEach(actionSub => {
            menu.push({ title: actionSub.title, status: actionSub.status, role_id: actionSub.id })
          })
        })
      })
      this.$axios({
        method: 'post',
        url: '/role/update-role-node-list',
        data: { role_list: menu, id: this.role_id }
      }).then(res => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.getUserMenu()
      })
    }
  }
}
</script>

<style scoped>
.actionClass {
  margin-bottom: 20px;
}
</style>
