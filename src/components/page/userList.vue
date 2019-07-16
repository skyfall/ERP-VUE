<template>
  <el-col>
    <el-col>
      <el-button @click="dialogAddUserTableVisible = true">添加角色</el-button>
    </el-col>
    <el-col>
      <el-table :data="user_list.list">
        <el-table-column prop="id"
                         label="角色id"
                         width="100">
        </el-table-column>
        <el-table-column prop="user_name"
                         label="用户名"
                         width="200">
        </el-table-column>
        <el-table-column prop="role_name"
                         label="角色名称"
                         width="200">
        </el-table-column>
        <el-table-column prop="organization_name"
                         label="机构名称">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="updatePass(scope.$index, scope.row)">重置密码</el-button>
            <el-button size="mini"
                       type="danger"
                       v-if="scope.row.status === 1"
                       @click="updateStatus(scope.$index, scope.row)"> 停用</el-button>
            <el-button size="mini"
                       type="success"
                       v-else
                       @click="updateStatus(scope.$index, scope.row)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="formUserTile"
                 :visible.sync="dialogUserTableVisible">
        <el-form :model="updateUser">
          <el-form-item label="密码">
            <el-input v-model="updateUser.pass"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="updateUser.confim_pass"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogUserTableVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="btnUpass">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="formAddUserTile"
                 :visible.sync="dialogAddUserTableVisible">
        <el-form :model="addUser">
          <el-form-item label="登入名">
            <el-input v-model="addUser.user_name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="addUser.role_list_id"
                       filterable
                       remote
                       reserve-keyword
                       placeholder="请输入关键词"
                       :remote-method="remoteMethod"
                       :loading="loading">
              <el-option v-for="item in role_list"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="addUser.pass"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="addUser.confim_pass"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogAddUserTableVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="btnAddUser">确 定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
      user_list: [],
      current: {
        page: 1,
        page_size: 20,
        organization_id: 0
      },
      updateUser: {
        pass: '',
        confim_pass: '',
        status: 0,
        user_id: 0
      },
      formUserTile: '',
      dialogUserTableVisible: false,

      addUser: {
        pass: '',
        confim_pass: '',
        user_name: '',
        organization_id: '',
        role_list_id: 0
      },
      formAddUserTile: '',
      dialogAddUserTableVisible: false,

      loading: false,
      role_list: [],
      fromSreachRole: {
        organization_id: 0
      }
    }
  },
  created () {
    this.current.organization_id = this.$route.query.organization_id
    this.addUser.organization_id = this.$route.query.organization_id
    this.fromSreachRole.organization_id = this.$route.query.organization_id
    if (this.current.organization_id <= 0) {
      this.$router.push({ path: '/organization' })
    }
    this.getUserList()
  },
  methods: {
    // 获取用户立碑
    getUserList () {
      this.$axios({
        method: 'get',
        url: '/organization-user/get-list',
        params: this.current
      }).then(res => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.user_list = res.data
      })
    },
    remoteMethod (query) {
      this.loading = true
      this.$axios({
        method: 'get',
        url: '/organization-user/get-role-list',
        params: this.fromSreachRole
      }).then(res => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.role_list = res.data
      })
      this.loading = false
    },
    axiosUpdateUser () {
      this.$axios({
        method: 'post',
        url: '/organization-user/update-user',
        data: this.updateUser
      }).then(res => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.dialogUserTableVisible = false
      })
    },
    updatePass (index, row) {
      this.updateUser.status = row.status
      this.updateUser.user_id = row.id
      this.dialogUserTableVisible = true
    },
    btnUpass () {
      this.axiosUpdateUser()
    },
    updateStatus (index, row) {
      this.updateUser.status = row.status === 1 ? 0 : 1
      this.updateUser.user_id = row.id
      this.axiosUpdateUser()
    },
    btnAddUser () {
      this.$axios({
        method: 'post',
        url: '/organization-user/add-user',
        data: this.addUser
      }).then(res => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.addUser.confim_pass = ''
        this.addUser.pass = ''
        this.addUser.role_list_id = ''
        this.addUser.user_name = ''
        this.dialogAddUserTableVisible = false
        this.getUserList()
      })
    }
  }
}
</script>
