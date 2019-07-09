<template>
  <el-col>
    <el-tabs type="border-card">
      <el-tab-pane v-for="(menu,menuIndex) in menuList"
                   :label="menu.title"
                   v-bind:key="menuIndex">
        <el-row :gutter="24">
          <el-col :span="12"
                  class="cardclass"
                  v-for="(sub ,subIndex) in menu.subs"
                  v-bind:key="subIndex">
            <el-card class="box-card">
              <div slot="header"
                   class="clearfix">
                <span>{{sub.title}}</span>
                <el-button class="btnDelSubClass"
                           type="text">删除</el-button>
                <el-button class="btnAddSubClass"
                           @click="btnAddActionMenu(sub)"
                           type="text">添加</el-button>

              </div>
              <div v-for="(action,actionIndex) in sub.actionItem"
                   :key="actionIndex"
                   class="text item">
                {{'列表内容 ' + action.title }}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

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
                   @click="btnAddActionMenuSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>

</template>
<script>
import userData from '@/utils/userdata'
export default {
  data () {
    return {
      activeName: 'first',
      menuList: [],
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
        type: 0
      },
      dialogAddSubMenuTile: '',
      dialogAddSubMenuTableVisible: false
    }
  },
  created () {
    this.menuList = userData.getUserMenu()
    console.log(this.menuList)
  },
  methods: {
    // 添加子菜单
    btnAddActionMenu (subMenu) {
      this.formAddSubMenu.pid = subMenu.id
      this.formAddSubMenu.type = 2
      this.dialogAddSubMenuTile = '添加菜单到:' + subMenu.title
      this.dialogAddSubMenuTableVisible = true
    },
    // 添加子菜单确定按钮
    btnAddActionMenuSubmit () {
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
        this.dialogAddSubMenuTableVisible = false
      })
    },
    // 获取菜单信息
    getUserMenu () {
      this.$axios({
        method: 'get',
        url: '/menu/get-menu-list'
      }).then(res => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        userData.setUserMenu(res.data.items)
        console.log(userData.checkUserRole('menu'), userData.checkUserRole('menu2323'))
        this.items = res.data.items
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
