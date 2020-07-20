import echarts from 'echarts'
export default {
    downloadImg(url){
        var cent = 'center',
            urld = 'https://c.zookingsoft.com/api';
        if(window.location.host=='ts-centerweb.idatachain.cn'){
            cent = 'center_dev';
            urld ='http://ts-i.idatachain.cn/api';

        }
        if(window.location.host=='c2.zookingsoft.com'){
            cent = 'center_dev2';
            urld ='https://c2.zookingsoft.com/api';

        }
        if(window.location.host=='localhost:8080'){
            cent = 'center_local';
            urld ='http://ts-i.idatachain.cn/api';

        }
        var url = urld+url;
        var xmlResquest = new XMLHttpRequest();
        xmlResquest.open("get",url,true);
        xmlResquest.setRequestHeader("Accept","application/json, text/plain, */*");
        xmlResquest.setRequestHeader("Content-type","application/json");
        xmlResquest.setRequestHeader("Authorization",'Bearer '+localStorage.getItem('token'));
        xmlResquest.responseType = "blob";
        xmlResquest.onload = function (oEvent) {
            var content = xmlResquest.response;
            var eLink = document.createElement("a");
            eLink.download = (new Date()).toLocaleDateString().split('/').join('-')+'_'+"导出数据.xlsx";
            eLink.style.display = 'none';
            var blob = new Blob([content]);
            eLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eLink);
            eLink.click();
            document.body.removeChild(eLink);
        };
        xmlResquest.send();
    },//导出EXEL
    cavansLine(xData,yData){
        let  histogram =echarts.init(document.getElementById('histogram'));
         var option = {
            color: ['#3377ff'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : xData,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:yData,
                }
            ]
        };
        histogram.setOption(option)
    }, //柱状图
    transverseLine(xData,yData){
        let across =echarts.init(document.getElementById('across'))
       var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLine:{
                    lineStyle:{
                        color:"transparent",
                    }
                }
            },
            yAxis: {
                type: 'category',
                 data: xData,
                axisLabel: {
                    fontSize:'15',
                    fontFamily:'微软雅黑',
                    // marginTop:'5px',
                    // marginRight:'20px',
                    show:true,
                },
            },
            series: [
                {
                    name: '2019年',
                    type: 'bar',
                    data: yData,
                    itemStyle:{ normal:{ color:'#3377FF'} },
                    label:{ normal:{ show: true, position: 'right'},},
                },

            ]
        };
        across.setOption(option)
    },//横向柱状图
    pie(xData,yData){
        let pie =echarts.init(document.getElementById('pie'))
       var option = {
           color: ['#1890FF','#13C2C2','#FACC14','#8543E0','#F04864','#2FC25B'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data:xData,
                // formatter:    //后缀说明
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:yData
                }
            ]
        };
        pie.setOption(option)
    },//饼状图
    chart(xData,yData,tData){
        let flowChart =echarts.init(document.getElementById('flowChart'))
       var option = {
            color:["#1890FF","#2FC25B"],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:tData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: yData
            },
            yAxis: {
                type: 'value'
            },
            series: xData
        };
        flowChart.setOption(option)
    },//多折现图
}