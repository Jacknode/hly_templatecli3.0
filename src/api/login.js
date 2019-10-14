/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-07-26 16:57:15
 * @LastEditTime: 2018-07-26 16:57:15
 * @LastEditors: your name
 */
import axios from 'axios'
import request from '@/utils/request'
import {
  getNewStr
} from '../assets/js/public'

export function login(userInfo) {
  return request({
    url: getNewStr + '/UserInfo/Login',
    method: 'post',
    data: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}