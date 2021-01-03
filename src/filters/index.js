import Vue from 'vue'
import moment from 'moment'


// 自定义过滤器
Vue.filter('date-format',function(value){
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
})