<template>
    <div>
        <!--
        <div class="schart">
            <div class="content-title">柱状图</div>
            <schart canvasId="bar" width="500" height="400" :data="data1" type="bar" :options="options1"></schart>
        </div>
        <div class="schart">
            <div class="content-title">折线图</div>
            <schart canvasId="line" width="500" height="400" :data="data1" type="line" :options="options1"></schart>
        </div>
        <div class="schart">
            <div class="content-title">饼状图</div>
            <schart canvasId="pie" width="500" height="400" :data="data2" type="pie" :options="options2"></schart>
        </div>
        -->
        <div class="schart">
            <div class="content-title">App当月使用环形图</div>
            <schart canvasId="ring" width="500" height="400" :data="data2" type="ring" :options="options2"></schart>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        components: {
            Schart
        },
        data: () => ({
            data1: [{
                    name: '2012',
                    value: 1141
                },
                {
                    name: '2013',
                    value: 1499
                },
                {
                    name: '2014',
                    value: 2260
                },
                {
                    name: '2015',
                    value: 1170
                },
                {
                    name: '2016',
                    value: 970
                },
                {
                    name: '2017',
                    value: 1450
                }
            ],
            data2: [{
                    name: 'APP1',
                    value: 1200
                },
                {
                    name: 'APP2',
                    value: 1222
                },
                {
                    name: 'APP3',
                    value: 1283
                },
                {
                    name: 'APP4',
                    value: 1314
                },
                {
                    name: 'APP5',
                    value: 2314
                }
            ],
            options1: {
                title: '某商店近年营业总额',
                bgColor: '#009688',
                titleColor: '#ffffff',
                fillColor: '#e0f2f1',
                axisColor: '#ffffff',
                contentColor: '#999'
            },
            options2: {
                title: 'XXXAPP当月访问次数',
                bgColor: '#607d8b',
                titleColor: '#ffffff',
                legendColor: '#ffffff'
            }
        })
    }
</script>

<style scoped>
    .schart {
        width: 600px;
        display: inline-block;
    }
    .content-title {
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
</style>