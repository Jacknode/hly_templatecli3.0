/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-08 11:12:27
 * @LastEditTime: 2019-10-14 14:36:37
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n);
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
};

const i18n = new VueI18n({
  locale: 'zh',
  messages
});

export default i18n
