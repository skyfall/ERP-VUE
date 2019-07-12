<template>
  <el-col>
    <el-col>
      <el-col :offset="22"
              :span="2">
        <el-button @click="btnAddMenu(1,0)"
                   type="primary">添加大类</el-button>
      </el-col>
      <el-col style="">
        <el-tabs type="border-card">
          <el-tab-pane v-for="(menu,menuIndex) in menuList"
                       :label="menu.title"
                       v-bind:key="menuIndex">
            <el-row>
              <el-col :offset="18"
                      :span="2">
                <el-button @click="btnAddMenu(1,menu.id)"
                           type="primary">添加项目</el-button>
              </el-col>
              <el-col :span="2">
                <el-button @click="btnUpdateMenu(menu)"
                           type="primary">修改项目</el-button>
              </el-col>
              <el-col :span="2">
                <el-button v-if="menu.status == 1"
                           @click="btnUpdateStatusMenu(menu)"
                           type="primary">禁用</el-button>
                <el-button v-else
                           @click="btnUpdateStatusMenu(menu)"
                           type="primary">启动</el-button>
              </el-col>
            </el-row>
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

                      <el-button v-if="sub.status == 1"
                                 class="btnDelSubClass"
                                 @click="btnUpdateStatusMenu(sub)"
                                 type="text">禁用</el-button>
                      <el-button v-else
                                 class="btnDelSubClass"
                                 @click="btnUpdateStatusMenu(sub)"
                                 type="text">启动</el-button>
                      <el-button class="btnAddSubClass"
                                 @click="btnUpdateMenu(sub)"
                                 type="text">修改</el-button>

                      <el-button class="btnAddSubClass"
                                 @click="btnAddMenu(1,sub.id)"
                                 type="text">添加action</el-button>

                    </div>
                    <el-row :gutter="24">
                      <el-col :span="12"
                              class="cardclass"
                              v-for="(action,actionIndex) in sub.actionSub"
                              v-bind:key="actionIndex">
                        <el-card class="box-card">
                          <div slot="header"
                               class="clearfix">

                            <el-button v-if="action.status == 1"
                                       class="btnDelSubClass"
                                       @click="btnUpdateStatusMenu(action)"
                                       type="text">禁用</el-button>
                            <el-button v-else
                                       class="btnDelSubClass"
                                       @click="btnUpdateStatusMenu(action)"
                                       type="text">启动</el-button>

                            <el-button class="btnAddSubClass"
                                       @click="btnUpdateMenu(action)"
                                       type="text">修改</el-button>

                          </div>
                          <el-form :inline="true">
                            <el-row>
                              <el-col :span="12">
                                <el-form-item label="名称">
                                  <span>{{action.title}}</span>
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="地址">
                                  <span>{{action.index}}</span>
                                </el-form-item>
                              </el-col>
                            </el-row>
                          </el-form>
                        </el-card>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>
          </el-tab-pane>
        </el-tabs>
        <!-- 添加子菜单 -->
        <el-dialog :title="formMenuTitle"
                   :visible.sync="dialogMenuTableVisible">
          <el-form :model="formMenu">
            <el-form-item label="名称">
              <el-input v-model="formMenu.name"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由地址">
              <el-input v-model="formMenu.router"
                        autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogMenuTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="btnMenu">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-col>
  </el-col>
</template>
<script>

export default {
  data () {
    return {
      activeName: 'first',
      menuList: [],

      // 整理代码
      formMenu: {
        // 名称
        name: '',
        // 路由地址
        router: '',
        // 数据格式
        data_json: [],
        // 父类id
        pid: 0,
        // 类型
        type: 0,
        // 更新的id
        id: 0
      },
      formMenuTitle: '',
      dialogMenuTableVisible: false
    }
  },
  created () {
    // this.menuList = userData.getUserMenu()
    this.getUserMenu()
    console.log(this.menuList)
  },
  methods: {
    // 更新菜单项目 btnAddSubMenu
    btnUpdateMenu (subMenu) {
      this.formMenu.pid = subMenu.pid
      // this.formMenu.type = subMenu.type
      this.formMenu.id = subMenu.id
      this.formMenu.name = subMenu.title
      this.formMenu.router = subMenu.index
      this.formMenuTitle = '添加菜单'
      this.dialogMenuTableVisible = true
    },
    // 添加菜单
    btnAddMenu (type, pid) {
      this.formMenu.pid = pid
      this.formMenu.type = type
      this.formMenu.id = 0
      this.formMenu.name = ''
      this.formMenu.router = ''
      this.formMenu.data_json = []
      this.formMenuTitle = '添加菜单'
      this.dialogMenuTableVisible = true
    },

    // 修改菜单状态
    btnUpdateStatusMenu (subMenu) {
      this.$confirm('确定要修改' + subMenu.title + '菜单吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formMenu.name = subMenu.title
        this.formMenu.router = subMenu.index
        this.formMenu.pid = 0
        this.formMenu.type = 1
        this.formMenu.id = subMenu.id
        this.formMenu.status = subMenu.status === 1 ? 0 : 1
        this.axiosUpdateMenu()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 菜单操作
    btnMenu () {
      if (this.formMenu.id >= 1) {
        // 添加菜单
        this.axiosUpdateMenu()
      } else {
        // 更新菜单
        this.axiosAddMenu()
      }
    },

    // 更新菜单
    axiosUpdateMenu () {
      this.$axios({
        method: 'post',
        url: '/menu/update-menu',
        data: this.formMenu
      }).then((res) => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.getUserMenu()
        this.dialogMenuTableVisible = false
      })
    },

    // 添加菜单
    axiosAddMenu () {
      this.$axios({
        method: 'post',
        url: '/menu/add-menu',
        data: this.formMenu
      }).then((res) => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.getUserMenu()
        this.formMenu.pid = 0
        this.formMenu.name = ''
        this.formMenu.router = ''
        this.formMenu.type = 2
        this.dialogMenuTableVisible = false
      })
    },
    // 获取菜单信息
    getUserMenu () {
      this.$axios({
        method: 'get',
        url: '/menu/manger-get-menu-list'
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
    }
  }
}
</script>
<style scoped>
.cardclass {
  margin-top: 20px;
}
.btnDelSubClass {
  color: #ff0000;
  float: right;
  padding: 3px 0;
}
.btnAddSubClass {
  color: #3f9eff;
  float: right;
  padding: 3px 0;
  margin-right: 20px;
}
</style>
