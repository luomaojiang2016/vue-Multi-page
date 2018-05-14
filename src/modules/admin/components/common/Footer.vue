<template>
    <div class="footer">
        <span>©2018 北京爱会聚科技有限公司 京ICP备18003434号</span>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions,
        mapMutations,
        mapState
    } from 'vuex';
    import api from '../../api/api.js'
    export default {
        data() {
            return {
                version: '1.0.1',
            }
        },
        methods: {
            
        }
    }
</script>

<style scoped>
.footer{
    position:absolute;
    width:100%;
    background-color: rgb(151, 199, 247);
    color:#eee;
    text-align: center;
    font-size: 16px;
    height: 40px; 
    bottom: 0%;
}

.footer span{
    line-height: 40px;
}
</style>
