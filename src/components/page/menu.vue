<template>
  <el-col>
    <el-col>
      <el-col :offset="22"
              :span="2">
        <el-button @click="btnAddMenu()"
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
                <el-button @click="btnAddSubMenu(menu)"
                           type="primary">添加项目</el-button>
              </el-col>
              <el-col :span="2">
                <el-button @click="btnUpdateSubMenu(menu)"
                           type="primary">修改项目</el-button>
              </el-col>
              <el-col :span="2">
                <el-button v-if="menu.status == 1"
                           @click="btnUpdateStatusMenuSubmit(menu)"
                           type="primary">禁用</el-button>
                <el-button v-else
                           @click="btnUpdateStatusMenuSubmit(menu)"
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
                                 @click="btnUpdateSubStatusMenuSubmit(sub)"
                                 type="text">禁用</el-button>
                      <el-button v-else
                                 class="btnDelSubClass"
                                 @click="btnUpdateSubStatusMenuSubmit(sub)"
                                 type="text">启动</el-button>
                      <el-button class="btnAddSubClass"
                                 @click="btnAddActionMenu(sub)"
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
                            <span>{{sub.title}}</span>
                            <el-button v-if="action.status == 1"
                                       class="btnDelSubClass"
                                       @click="btnUpdateActionStatusMenuSubmit(action)"
                                       type="text">禁用</el-button>
                            <el-button v-else
                                       class="btnDelSubClass"
                                       @click="btnUpdateActionStatusMenuSubmit(action)"
                                       type="text">启动</el-button>

                            <el-button class="btnAddSubClass"
                                       @click="btnUpdateActionMenu(action)"
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
        <el-dialog :title="dialogActionubMenuTile"
                   :visible.sync="dialogActionSubMenuTableVisible">
          <el-form :model="formAddSubMenu">
            <el-form-item label="名称">
              <el-input v-model="formActionSubMenu.name"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由地址">
              <el-input v-model="formActionSubMenu.router"
                        autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogActionSubMenuTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="btnAddActionMenuSubmit">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 更新子菜单 -->
        <el-dialog :title="dialogUpdateSubMenuTile"
                   :visible.sync="dialogUpdateSubMenuTableVisible">
          <el-form :model="formUpdateSubMenu">
            <el-form-item label="名称">
              <el-input v-model="formUpdateSubMenu.name"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由地址">
              <el-input v-model="formUpdateSubMenu.router"
                        autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogUpdateSubMenuTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="btnUpdateActionMenuSubmin">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 更新大菜单 -->
        <el-dialog :title="dialogUpdateMenuTile"
                   :visible.sync="dialogUpdateMenuTableVisible">
          <el-form :model="formUpdateSubMenu">
            <el-form-item label="名称">
              <el-input v-model="formUpdateMenu.name"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由地址">
              <el-input v-model="formUpdateMenu.router"
                        autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogUpdateMenuTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="btnUpdateMenuSubmin">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 添加项目 -->
        <el-dialog :title="dialogAddSubMenuTile"
                   :visible.sync="dialogAddSubMenuTableVisible">
          <el-form :model="formAddSubMenu">
            <el-form-item label="名称">
              <el-input v-model="formAddSubMenu.name"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由地址">
              <el-input v-model="formAddSubMenu.router"
                        autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogAddSubMenuTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="btnAddSubMenuSubmit()">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 添加大类 -->
        <el-dialog :title="dialogAddMenuTile"
                   :visible.sync="dialogAddMenuTableVisible">
          <el-form :model="formAddSubMenu">
            <el-form-item label="名称">
              <el-input v-model="formAddMenu.name"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由地址">
              <el-input v-model="formAddMenu.router"
                        autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogAddMenuTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="btnAddMenuSubmit()">确 定</el-button>
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
      formActionSubMenu: {
        // 名称
        name: '',
        // 路由地址
        router: '',
        // 数据格式
        data_json: [],
        // 父类id
        pid: 0,
        // 类型
        type: 0
      },
      dialogActionubMenuTile: '',
      dialogActionSubMenuTableVisible: false,

      formUpdateSubMenu: {
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
      dialogUpdateSubMenuTile: '',
      dialogUpdateSubMenuTableVisible: false,

      formUpdateMenu: {
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
      dialogUpdateMenuTile: '',
      dialogUpdateMenuTableVisible: false,

      formAddSubMenu: {
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
      dialogAddSubMenuTile: '',
      dialogAddSubMenuTableVisible: false,

      formAddMenu: {
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
      dialogAddMenuTile: '',
      dialogAddMenuTableVisible: false
    }
  },
  created () {
    // this.menuList = userData.getUserMenu()
    this.getUserMenu()
    console.log(this.menuList)
  },
  methods: {
    // 添加子菜单
    btnAddActionMenu (subMenu) {
      this.formActionSubMenu.pid = subMenu.id
      this.formActionSubMenu.type = 2
      this.dialogActionubMenuTile = '添加菜单到:' + subMenu.title
      this.dialogActionSubMenuTableVisible = true
    },
    // 添加子菜单确定按钮
    btnAddActionMenuSubmit () {
      this.$axios({
        method: 'post',
        url: '/menu/add-menu',
        data: this.formActionSubMenu
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
        this.formActionSubMenu.pid = 0
        this.formActionSubMenu.name = ''
        this.formActionSubMenu.router = ''
        this.formActionSubMenu.type = 2
        this.dialogActionSubMenuTableVisible = false
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
    },
    // 更新子菜单
    btnUpdateActionMenu (subMenu) {
      this.dialogUpdateSubMenuTile = '更新菜单' + subMenu.title
      this.formUpdateSubMenu.type = 2
      this.formUpdateSubMenu.name = subMenu.title
      this.formUpdateSubMenu.router = subMenu.index
      this.formUpdateSubMenu.id = subMenu.id
      this.dialogUpdateSubMenuTableVisible = true
    },
    // 更新子菜单确定按钮
    btnUpdateActionMenuSubmin () {
      this.$axios({
        method: 'post',
        url: '/menu/update-menu',
        data: this.formUpdateSubMenu
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
        this.dialogUpdateSubMenuTableVisible = false
      })
    },
    // 更新菜单状态
    btnUpdateActionStatusMenuSubmit (action) {
      this.$confirm('确定要修改' + action.title + '菜单吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formUpdateSubMenu.type = 2
        this.formUpdateSubMenu.name = action.title
        this.formUpdateSubMenu.router = action.index
        this.formUpdateSubMenu.id = action.id
        this.formUpdateSubMenu.status = action.status === 1 ? 0 : 1
        console.log(this.formUpdateSubMenu.status, action.status)
        this.btnUpdateActionMenuSubmin()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 更新菜单信息
    btnUpdateSubStatusMenuSubmit (sub) {
      this.$confirm('确定要修改' + sub.title + '菜单吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formUpdateSubMenu.type = 1
        this.formUpdateSubMenu.name = sub.title
        this.formUpdateSubMenu.router = sub.index
        this.formUpdateSubMenu.id = sub.id
        this.formUpdateSubMenu.status = sub.status === 1 ? 0 : 1
        console.log(this.formUpdateSubMenu.status, sub.status)
        this.btnUpdateActionMenuSubmin()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加菜单项目 btnAddSubMenu
    btnAddSubMenu (subMenu) {
      this.formAddSubMenu.pid = subMenu.id
      this.formAddSubMenu.type = 1
      this.dialogAddSubMenuTile = '添加菜单'
      this.dialogAddSubMenuTableVisible = true
    },
    // 更新action菜单信息
    btnAddSubMenuSubmit () {
      this.$axios({
        method: 'post',
        url: '/menu/add-menu',
        data: this.formAddSubMenu
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
        this.formAddSubMenu.pid = 0
        this.formAddSubMenu.name = ''
        this.formAddSubMenu.router = ''
        this.formAddSubMenu.type = 1
        this.dialogAddSubMenuTableVisible = false
      })
    },
    // 添加菜单项目 btnAddSubMenu
    btnAddMenu (subMenu) {
      this.formAddSubMenu.pid = 0
      this.formAddSubMenu.type = 1
      this.dialogAddSubMenuTile = '添加菜单'
      this.dialogAddSubMenuTableVisible = true
    },
    // 更新action菜单信息
    btnAddMenuSubmit () {
      this.$axios({
        method: 'post',
        url: '/menu/add-menu',
        data: this.formAddMenu
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
        this.formAddSubMenu.pid = 0
        this.formAddSubMenu.name = ''
        this.formAddSubMenu.router = ''
        this.formAddSubMenu.type = 1
        this.dialogAddSubMenuTableVisible = false
      })
    },
    // 启用和禁用大类
    btnUpdateStatusMenuSubmit (menu) {
      this.$confirm('确定要修改' + menu.title + '菜单吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formUpdateSubMenu.type = 2
        this.formUpdateSubMenu.name = menu.title
        this.formUpdateSubMenu.router = menu.index
        this.formUpdateSubMenu.id = menu.id
        this.formUpdateSubMenu.status = menu.status === 1 ? 0 : 1
        this.btnUpdateActionMenuSubmin()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改项目
    btnUpdateSubMenu (subMenu) {
      this.formUpdateMenu.pid = 0
      this.formUpdateMenu.type = 1
      this.formUpdateMenu.id = subMenu.id
      this.formUpdateMenu.name = subMenu.title
      this.formUpdateMenu.router = subMenu.index
      this.dialogActionubMenuTile = '添加菜单到:' + subMenu.title
      this.dialogUpdateMenuTableVisible = true
    },
    btnUpdateMenuSubmin () {
      this.$axios({
        method: 'post',
        url: '/menu/update-menu',
        data: this.formUpdateMenu
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
        this.dialogUpdateMenuTableVisible = false
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
