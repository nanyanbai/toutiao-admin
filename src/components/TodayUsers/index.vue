<template>
    <common-card
      title="今日交易用户率"
      value="81,014"
    >
        <template>
           <div id="today-users-chart" :style="{ width: '100%', height: '100%' }"></div>
        </template>
        <template v-slot:footer>
            <span>退货率</span>
            <span class="emphasis">5.14%</span>
        </template>
    </common-card>
</template>

<script>
import commonCardMixin  from '@/mixins/commonCardMixin'

export default {
    name: 'TodayUsers',
    mixins: [commonCardMixin],
    mounted() {
      const chaetDemo = document.getElementById('today-users-chart')
      const chart = this.$echarts.init(chaetDemo)
      chart.setOption({
        color: ['#3398DB'],
        xAxis: {
          type: 'category',
          show: false,
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
          barWidth: '60%'
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        yAxis: {
          show: false
        },
        series: [{
          name: '用户率',
          type: 'bar',
          data: [410, 82, 200, 334, 390, 330, 220, 150, 82, 200, 134, 290, 330, 150]
        }],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      })
    }
}
</script>

<style scoped>

</style>
