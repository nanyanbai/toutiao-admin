<template>
    <el-select :value="value"  clearable placeholder="请选择" size="small"  @change="changeChannel">
        <el-option v-for="item in channelOptions" :key="item.id"  :label="item.name" :value="item.id" />
    </el-select>
</template>

<script>
import { getArticleChannels } from '@/api/article'
export default {
    name: 'my-channel',
    props: ['value'],
    data () {
        return {
            // 频道选项
            channelOptions: []
        }
    },
    created() {
        this.loadChannelOptions()
    },
    methods: {
        async loadChannelOptions () {
            const { data:{data} } = await getArticleChannels()
            this.channelOptions = data.channels
        },

        changeChannel (channelId) {
            if (channelId ==='') channelId = null
            // 把选择的频道传递给父组件  父组件去修改数据
            this.$emit('input', channelId)
        }
    }
}
</script>

<style scoped>

</style>
