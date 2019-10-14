/**
 * Created by leibo on 2018/9/6.
 */
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
  let articles = [];
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }

  return {
    articles: articles
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);








// let data  = [
//   {
//     fromName:'香格里拉市',
//     type:'汽车',
//     toName:'普达措国家森林公园-属都湖'
//   },
//   {
//     fromName:'普达措国家森林公园-属都湖',
//     type:'汽车',
//     toName:'松赞林寺景区 '
//   },
//   {
//     fromName:'松赞林寺景区 ',
//     type:'汽车',
//     toName:' 纳西喜宴'
//   },
//   {
//     fromName:'纳西喜宴',
//     type:'汽车',
//     toName:'丽江'
//   },
// ];
// for(var i=0;i<data.length;i++){
//   if(data[i],toName){
//     delete data[i],toName
//   }
// }
// console.log(data)

