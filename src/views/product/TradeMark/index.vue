<template>
  <div>
    <el-button class="el-TradeMark-button" type="primary" icon="el-icon-plus" @click="shoudialogTable()">添加
    </el-button>
    <el-table
      :data="list"
      style="width: 100%"
      border
    >
      <el-table-column
        label="序列号"
        width="80px"
        align="center"
        type="index"
      >
      </el-table-column>
      <el-table-column
        label="品牌名称"
        prop="tmName"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="品牌Logo"
        align="center"
      >
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" style="width: 50px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="shoudialogTable(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="getpageList"
      @size-change="handleSizeChange"
      class="pagination-trademark"
      :current-page="page"
      :page-sizes="[3,6,9,12,15]"
      :page-size="limit"
      layout=" prev, pager, next, jumper ,->,sizes, total"
      :total="total">
    </el-pagination>
    <!--添加模态框-->
    <el-dialog :title="this.tmForm.id ? '修改品牌':'添加品牌'" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="tmName" label="品牌名称" label-width="100px">
          <el-input v-model="tmForm.tmName" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item prop="logoUrl" label="品牌Logo" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="logoUrl || tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus el-upload avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "TradeMark",
    data() {
      var validatetmName = (rule, value, callback) => {
        if (value === undefined) {
          callback(new Error('请输入品牌名称！'));
        } else if (value.length < 2 || value.length > 10) {
          callback(new Error('请控制在2字符与10字符之内！'));
        } else {
          callback();
        }
      }
      return {
        //当前页数
        page: 1,
        //当前条数
        limit: 3,
        //总数
        total: 0,
        //展示列表
        list: [],
        //模态框是否展出
        dialogFormVisible: false,
        //解决上传图片不显示问题
        logoUrl: '',
        //上传图片信息
        tmForm: {
          tmName: '',
          logoUrl: ''
        },
        //自定义校验规则
        rules: {
          tmName: [
            {validator: validatetmName, trigger: 'change'}
          ],
          logoUrl: [
            {required: true, message: '请选择Logo图片'}
          ]
        }
      }
    },
    mounted() {
      this.getpageList()
    },
    methods: {
      //列表获取函数
      async getpageList(pages = 1) {
        this.page = pages
        //结构出参数
        const {page, limit} = this;
        //获取品牌列表的接口
        let result = await this.$API.trademark.reqTradeMark(page, limit)
        if (result.code === 200) {
          this.total = result.data.total
          this.list = result.data.records
        }
      },
      // 分页获取函数
      handleSizeChange(limit) {
        this.limit = limit
        this.getpageList()
      },
      //图片上传之前判断函数
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 0.5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 500kb!');
        }
        return isJPG && isLt2M;
      },
      //图片上传成功函数
      handleAvatarSuccess(res) {
        const {data} = res;
        this.tmForm.logoUrl = data
        this.logoUrl = data
      },
      //修改按钮
      shoudialogTable(row) {
        this.tmForm = {tmName: '', logoUrl: ''}
        this.dialogFormVisible = true
        this.tmForm = {...row}
      },
      //确认按钮（添加 | 修改）
      addOrUpdateTradeMark() {
        this.logoUrl = ''
        this.$refs.ruleForm.validate(async (valid) => {
          //全部通过验证
          if (valid) {
            this.dialogFormVisible = false;
            let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm);
            if (result.code === 200) {
              this.$message({
                message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
                type: 'success'
              });
              this.getpageList(this.tmForm.id ? this.page : 1);
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      //删除按钮
      deleTradeMark(row) {
        this.$confirm(`你确定删除${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await this.$API.trademark.delTrademark(row.id)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //判断当前页 如果被删完，返回上一页！
            this.getpageList(this.list.length > 1 ? this.page : this.page - 1)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped="less">
  .el-TradeMark-button {
    margin: 10px 0;

  }

  .pagination-trademark {
    margin-top: 20px;
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
