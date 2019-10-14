/**
 * Created by leibo on 17/11/11.
 */
//POST请求
import clsIDCard from './clsIDCard'
export const POST = (url, data, fn, err) => {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (xhr == null) {
    alert('您的浏览器不支持AJAX！');
    return;
  }
  let oStr = '';
  for (var key in data) {
    oStr += key + "=" + data[key] + "&";
  };
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(oStr);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 1 || xhr.readyState == 2 || xhr.readyState == 3) {
      // 本地提示：加载中/处理中
    }
    if (xhr.readyState == 4 && xhr.status == 200) {
      fn && fn(xhr.responseText)
    } else {
      err && err(xhr.status);
    }
  }
}

function toZear(num) {
  return num < 10 ? '0' + num : '' + num;
}
//获取 年-月-日
export const getDateName = (obj, format) => {
  return obj.getFullYear() +
    format + toZear((obj.getMonth() + 1)) +
    format + toZear(obj.getDate())
}


//按enter查询
export const anEnter = (fn) => {
  document.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
      fn && fn()
    }
  });
}

//日期格式化
export const dateFormat = (fmt, date) => {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
export const IsBackCode = (data, _this) => {
  if (data.backCode === '005' || data.backCode === '001' || data.backCode === '002' || data.backCode === '003' || data.backCode === '004' || data.backCode === '000') {
    _this.$message({
      showClose: true,
      message: data.backResult,
      type: 'error'
    });
  }
};
//POST,Promise请求
export const postPromise = (url, data) => {
  return new Promise(function(relove, reject) {
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else { // code for IE6, IE5
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xhr == null) {
      alert('您的浏览器不支持AJAX！');
      return;
    }
    // let oStr = '';
    // for (var key in data) {
    //   oStr += key + "=" + data[key] + "&";
    // }
    // ;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 1 || xhr.readyState == 2 || xhr.readyState == 3) {
        // 本地提示：加载中/处理中
      }
      if (xhr.readyState == 4 && xhr.status == 200) {
        relove(xhr.responseText)
      }
    }
  })
}
// //筛选是否为空
// export const IsGetNull = (obj,_this,keyword)=>{
//   var arrValue = Object.entries(obj);
//   for(var i=0;i<arrValue.length;i++){
//     if(!arrValue[i][1]&&arrValue[i][0].trim()!=keyword){
//       _this.$message({
//         showClose: true,
//         message: '输入内容不能为空！',
//         type: 'error'
//       });
//       return;
//     }
//   }
// }
//去掉字符串头尾空格
function valueTrim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

function checkTime(i) { //将0-9的数字前面加上0，例1变为01
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
//倒计时
export const leftTimer = (el, year, month, day, hour, minute, second) => {
  return new Promise((relove, reject) => {
    var leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
    var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
    days = checkTime(days);
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    if (Number(days) == 0 && Number(hours) == 0 && Number(minutes) == 0 && Number(seconds) == 0) {
      relove()
    }
    // setInterval(leftTimer(el,2018,2,11,11,11,11),1000);
    el.text = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
  })
};
//验证手机号码
export const isPhone = id => {
  return /^1[0-9]{10}$/.test(id);
};
//验证身份证
export const isCardNo = CardNoID => {
  var checkFlag = new clsIDCard(CardNoID);
  return checkFlag.IsValid();
};
//邮箱验证
export const isEmail = v => {
  return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(v)
};
//验证中文
export const isChinese = v => {
  return /^[\u0391-\uFFE5]+$/.test(v)
};
//验证座机号
export const valiDateTel = v => {
  var reg = /^(\d3,4|\d{3,4}-)?\d{7,8}$/;
  v = valueTrim(v);
  if (!reg.test(v)) {
    return false;
  }
  return true;
};
export const isNewPhone = v => {
  var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
  var isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
  if (isMob.test(v) || isPhone.test(v)) {
    return true;
  } else {
    return false;
  }
}
/**
 * 获取指定日期之前或之后的第几天
 *
 *            正数为以后时间，负数为以前时间 如：1表示为明天，-1为昨天
 *
 */
export const getDateStr = (dates, dayCount) => {
  var dateTime = dayCount * 24 * 60 * 60 * 1000;
  var dd = new Date();
  if (dates == "") {
    dd = new Date();
  } else {
    dd = new Date(dates);
  }
  var dateNumber = dd.getTime() + dateTime;
  var newDate = new Date(dateNumber);
  var y = newDate.getFullYear();
  var m = newDate.getMonth() + 1; // 获取当前月份的日期
  var d = newDate.getDate();
  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  return y + "-" + m + "-" + d;
};
/**
 * 获取指定月份的之前或之后的第几个月
 *
 *            正数为以后月份，负数为以前月份 如：1表示为下月，-1为上月
 *
 */
export const getMonthStr = (dates, monthCount) => {
  var dd = new Date();
  if (dates == "") {
    dd = new Date();
  } else {
    dd = new Date(dates);
  }
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; // 获取当前月份的日期
  m = m + monthCount;
  if (m == 0) {
    m = "12";
    y = y - 1;
  } else if (m < 10) {
    m = "0" + m;
  } else if (m > 12) {
    m = m - 12;
    m = "0" + m;
    y = y + 1;
  }
  return y + "-" + m;
};
/**
 * 判断是否是数字
 * @param numberValue 要验证的数据
 * @returns 匹配返回true 不匹配返回false
 */
export const isNumber = (numberValue) => {
  //定义正则表达式部分
  var reg1 = /^[0-9]{0,}$/;
  var reg2 = /^[1-9]{1}[0-9]{0,}$/;
  if (numberValue == null || numberValue.length == 0) {
    return false;
  }
  numberValue = valueTrim(numberValue);
  //判断当数字只有1位时
  if (numberValue.length < 2) {
    return reg1.test(numberValue);
  }
  return reg2.test(numberValue);;
};
//密码强度正则
export const pPattern = val => {
  return /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(val);
};
//URL正则
export const urlPath = val => {
  return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(val);
};
//微信号正则
export const wxPath = val => {
  return /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(val);

};
/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export const oneOf = (value, validList) => {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}
//返回传递给他的任意对象的类
function isClass(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8, -1);
}
//深度克隆
export const deepClone = (obj) => {
  var result = {},
    oClass = isClass(obj);
  if (oClass === "Object") {
    result = {};
  } else if (oClass === "Array") {
    result = [];
  } else {
    return obj;
  }
  for (var key in obj) {
    var copy = obj[key];
    if (isClass(copy) == "Object") {
      result[key] = deepClone(copy);
    } else if (isClass(copy) == "Array") {
      result[key] = deepClone(copy);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

export const getEscapeVal = str => {
  return escape(str)
}

export const goEscapeVal = str => {
  return unescape(str)
}

//验证房间门牌号
export const VerificationRoomNum = v => {
  let arr = v.split('-')
  // 1-1-1-1
  if (arr.length > 2) {
    //两个
    return /\d-\d-\d/g.test(v)
  } else {
    //单个
    return /\d-\d/g.test(v)
  }
  if (arr.length > 3) {
    return false
  }
}

//http://hly.1000da.com.cn
export const getNewStr = 'http://hly.1000da.com.cn' //'http://192.168.3.4' //'http://192.168.3.50'///api