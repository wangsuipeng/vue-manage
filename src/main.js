import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';// 默认主题
// import '../static/css/theme-green/index.css';// 浅绿色主题
import '../static/css/icon.css';
import "babel-polyfill";

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

//设置cookie
Vue.prototype.setCookie = function(c_name,value,expiredays) {
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
      ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};


  //获取cookie

  Vue.prototype.getCookie=function(c_name) {
    if (document.cookie.length>0)
    {
      var  c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
      {
        c_start=c_start + c_name.length+1
       var c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
      }
    }
    return ""
  };

// 给config配置baseURL
axios.defaults.baseURL = 'http://192.168.1.13:9902/'
// 给axios设置请求拦截器
axios.interceptors.request.use(
    config => {
        // 给config设置headers
        config.headers.Authorization = localStorage.getItem('token');
        config.headers.currentProjectId = localStorage.getItem('currentProjectId');
        config.headers.currentProject = localStorage.getItem('currentProject');
    return config
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('token');
    if(!role && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next(): next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})


  Vue.prototype.cutString=function(str, len) {
        if(str==''||str=='null'){

        }else if(str.length*2 <= len) {
            return str;
        }
        var strlen = 0;
        var s = "";
        for(var i = 0;i < str.length; i++) {
            s = s + str.charAt(i);
            if (str.charCodeAt(i) > 128) {
                strlen = strlen + 2;
                if(strlen >= len){
                return s.substring(0,s.length-1) + "...";
                }
            } else {
                strlen = strlen + 1;
                if(strlen >= len){
                return s.substring(0,s.length-2) + "...";
                }
            }
        }
        return s;
    }
    Vue.prototype.isEmpty=function(obj){
        if(typeof obj == "undefined" || obj == null || obj == ""){
            return '无';
        }else{
            return obj;
        }
    }
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
