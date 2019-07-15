<template>
  <el-col>
    <el-row>
      <el-col :offset="22">
        <el-button type="primary"
                   @click="btnAddRole">添加角色</el-button>
      </el-col>
      <el-col :span="24"
              class="block">
        <el-table :data="roleList.list"
                  stripe>
          <el-table-column prop="id"
                           label="角色id"
                           width="100">
          </el-table-column>
          <el-table-column prop="role_name"
                           label="角色名称"
                           width="200">
          </el-table-column>
          <el-table-column prop="organization_name"
                           label="机构名称"
                           width="200">
          </el-table-column>
          <el-table-column label="状态"
                           width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px"
                    v-if="scope.row.status === 1">正常</span>
              <span style="margin-left: 10px"
                    v-else>异常</span>
            </template>
          </el-table-column>
          <el-table-column prop="description"
                           label="描述">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="btnUpdate(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini"
                         type="danger"
                         v-if="scope.row.status === 1"
                         @click="btnUpdateStatus(scope.$index, scope.row)">停用</el-button>
              <el-button size="mini"
                         type="success"
                         v-else
                         @click="btnUpdateStatus(scope.$index, scope.row)">启用</el-button>
              <el-button size="mini"
                         @click="btnUpdateRole(scope.$index, scope.row)">编辑权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-dialog :title="formRoleTitle"
                 :visible.sync="dialogRoleTableVisible">
        <el-form :model="roleFrom">
          <el-form-item label="角色名称">
            <el-input v-model="roleFrom.role_name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="roleFrom.description"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogRoleTableVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="btnMenu">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="formRoleTitle"
                 :visible.sync="dialogAddRoleTableVisible">
        <el-form :model="roleFrom">
          <el-form-item label="角色名称">
            <el-input v-model="roleFrom.role_name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="roleFrom.description"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请选项公司">

            <el-select v-model="roleFrom.organization_list_id "
                       class="selectDialog"
                       filterable
                       remote
                       placeholder="请输入关键词"
                       :focus="remoteMethod"
                       :remote-method="remoteMethod"
                       :loading="loading">
              <el-option v-for="item in organization_list"
                         :key="item.id"
                         :label="item.organization_name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogAddRoleTableVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="btnMenu">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
      roleList: {
        list: [],
        total: 0
      },
      current: {
        page: 1,
        page_size: 20
        // organization_list_id: this.$route.query.organization_id
      },
      currentSearch: {
        page: 1,
        page_size: 20,
        search_organization_name: ''
      },
      roleFrom: {
        role_name: '',
        description: '',
        organization_list_id: '',
        id: ''
      },
      loading: false,
      dialogRoleTableVisible: false,
      formRoleTitle: '',
      organization_list: [],
      dialogAddRoleTableVisible: false
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    btnAddRole () {
      this.roleFrom.role_name = ''
      this.roleFrom.id = 0
      this.roleFrom.description = ''
      this.roleFrom.organization_list_id = ''
      this.dialogAddRoleTableVisible = true
      this.dialogRoleTableVisible = false
    },
    // 获取角色列表
    getRoleList () {
      this.$axios({
        method: 'get',
        url: '/role/get-list',
        params: this.current
      }).then((res) => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.roleList.list = res.data.list
        this.roleList.page_total = res.data.total
      })
    },
    // 更新信息
    btnUpdate (index, row) {
      this.roleFrom.role_name = row.role_name
      this.roleFrom.id = row.id
      this.roleFrom.description = row.description
      this.roleFrom.organization_list_id = row.organization_list_id
      this.dialogRoleTableVisible = true
    },
    btnMenu () {
      if (this.roleFrom.id >= 1) {
        this.axiosUpdateRole()
      } else {
        this.axiosAddRole()
      }
    },
    // 更新菜单
    axiosUpdateRole () {
      this.$axios({
        method: 'post',
        url: '/role/update-role',
        data: this.roleFrom
      }).then((res) => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.getRoleList()
        this.dialogRoleTableVisible = false
      })
    },
    // 添加菜单
    axiosAddRole () {
      this.$axios({
        method: 'post',
        url: '/role/add-role',
        data: this.roleFrom
      }).then((res) => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.getRoleList()
        this.dialogAddRoleTableVisible = false
        this.dialogRoleTableVisible = false
      })
    },
    // 搜索机构信息
    remoteMethod (query) {
      console.log('dadsfs')
      this.loading = true
      this.currentSearch.search_organization_name = query
      console.log(this.currentSearch, 'this.currentSearch')
      this.$axios({
        method: 'get',
        url: '/organization/get-list',
        params: this.currentSearch
      }).then((res) => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.loading = false
        this.organization_list = res.data.list
      })
    },
    btnUpdateStatus (index, row) {
      this.$confirm('确定要修改菜单吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.roleFrom.role_name = row.role_name
        this.roleFrom.id = row.id
        this.roleFrom.description = row.description
        this.roleFrom.organization_list_id = row.organization_list_id
        this.roleFrom.status = row.status === 1 ? 0 : 1
        this.axiosUpdateRole()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑权限
    btnUpdateRole (index, row) {
      console.log(row.role_name, 'role_name')
      this.$router.push({ path: '/role-node', query: { role_id: row.id } })
    }
  }
}
</script>

<style scoped>
.selectDialog {
  width: 100%;
}
</style>
