<template>
    <div class="sales-container">
        <el-card  shadow="hover">
            <template v-slot:header>
                <div class="menu-wrapper">
                   <el-menu mode="horizontal" :default-active="activeIndex" @select="onMenuSelect">
                       <el-menu-item index="1">销售额</el-menu-item>
                       <el-menu-item index="2">访问量</el-menu-item>
                   </el-menu>

                    <div class="menu-right">
                        <el-radio-group v-model="radioSelect" size="small">
                            <el-radio-button label="今日"/>
                            <el-radio-button label="本周"/>
                            <el-radio-button label="本月"/>
                            <el-radio-button label="今年"/>
                        </el-radio-group>

                        <el-date-picker
                         size="small"
                         type="daterange"
                         v-model="date"
                         range-separator="至"
                         start-placeholder="开始日期"
                         end-placeholder="结束日期"
                         :picker-options="pickerOptions"
                        />
                    </div>
                </div>
            </template>
            <template>
                <div class="sales-chart" ref="salesRef"></div>
            </template>
        </el-card>
    </div>
</template>

<script>
// import { getSalesData } from '@/api/home'
export default {
  name: 'SalesView',
  data () {
    return {
      activeIndex: '1',
      radioSelect: '今日',
      date: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      chartInstance: null
    }
  },
  mounted() {
    this.initChart()
    this.getData()
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.salesRef)
    },
    async getData () {
      // const { data } = getSalesData()
      // console.log(data)
    },
    onMenuSelect (index) {
      console.log(index)
    }
  }
}
</script>

<style scoped lang="scss">
.sales-container {
    margin-top: 20px;
    .menu-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;

        .menu-right {
            .el-radio-group{
                margin-right: 20px;
            }
        }
    }
}
</style>
