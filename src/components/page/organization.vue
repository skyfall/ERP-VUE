<template>
  <el-col>
    <el-row>
      <el-col :offset="22">
        <el-button type="primary"
                   @click="btnAdd">添加机构</el-button>
      </el-col>
      <el-col :span="24"
              class="block">
        <el-table :data="organizationList.list"
                  stripe>
          <el-table-column prop="id"
                           label="机构id"
                           width="100">
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
              <el-button type="primary"
                         @click="btnRouteUser(scope.row)"> 查看用户</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :offset="8"
              :span="3"
              class="block">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="current.page"
                       :page-sizes="[20, 100, 200]"
                       :page-size="current.page_size"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="organizationList.page_total">
        </el-pagination>
      </el-col>
      <!-- 添加子菜单 -->
      <el-dialog :title="organizationTitle"
                 :visible.sync="dialogOrganizationVisible">
        <el-form :model="organization">
          <el-form-item label="机构名称">
            <el-input v-model="organization.organization_name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="organization.description"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogOrganizationVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="btnOrganization">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
      current: {
        page: 1,
        page_size: 20
      },
      organizationList: {
        list: [],
        page_total: 0
      },
      organization: {
        organization_name: '',
        description: '',
        status: 1,
        id: 0
      },
      organizationTitle: '机构',
      dialogOrganizationVisible: false
    }
  },
  created () {
    this.getOrganizationList()
  },
  methods: {
    // 获取机构列表
    getOrganizationList () {
      this.$axios({
        method: 'get',
        url: '/organization/get-list',
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
        console.log(res.data.list, 'res.data.list')
        this.organizationList.list = res.data.list
        this.organizationList.page_total = res.data.total
      })
    },

    btnOrganization () {
      if (this.organization.id > 0) {
        this.axiosUpdateOrganization()
      } else {
        this.axiosAddOrganization()
      }
    },
    btnAdd () {
      this.organization.id = 0
      this.organization.organization_name = ''
      this.organization.description = ''
      this.dialogOrganizationVisible = true
    },
    btnUpdate (index, row) {
      this.organization.organization_name = row.organization_name
      this.organization.id = row.id
      this.organization.status = row.status
      this.organization.description = row.description
      this.dialogOrganizationVisible = true
    },
    btnUpdateStatus (index, row) {
      let title = row.status === 1 ? '确定要停用' : '确定要启用'
      this.$confirm(title + row.organization_name + '菜单吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.organization.organization_name = row.organization_name
        this.organization.id = row.id
        this.organization.status = row.status === 1 ? 0 : 1
        this.organization.description = row.description
        this.axiosUpdateOrganization()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加机构
    axiosAddOrganization () {
      this.$axios({
        method: 'post',
        url: '/organization/add-organization',
        data: this.organization
      }).then((res) => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.dialogOrganizationVisible = false
        this.getOrganizationList()
      })
    },
    // 修改机构
    axiosUpdateOrganization () {
      this.$axios({
        method: 'post',
        url: '/organization/update-organization',
        data: this.organization
      }).then((res) => {
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
          return false
        }
        this.dialogOrganizationVisible = false
        this.getOrganizationList()
      })
    },
    // 点击页数切换
    handleSizeChange (val) {
      this.current.page_size = val
      this.getOrganizationList()
    },
    // 点击翻页
    handleCurrentChange (val) {
      this.current.page = val
      this.getOrganizationList()
    },
    btnRouteUser (organization) {
      this.$router.push({ path: '/user-list', query: { organization_id: organization.id } })
    }
  }
}
</script>

<style scoped>
.block {
  margin-top: 20px;
}
</style>
