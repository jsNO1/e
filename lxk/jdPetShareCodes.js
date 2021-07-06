/*
东东萌宠互助码
此文件为Node.js专用。其他用户请忽略
支持京东N个账号
 */
//云服务器腾讯云函数等NOde.js用户在此处填写东东萌宠的好友码。
// 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间用&符号或者换行隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
let PetShareCodes = [
  'MTAxODc2NTEzNDAwMDAwMDAwOTM3MjM4NQ==@MTAxODc2NTEzMjAwMDAwMDAyMTc2MzIxNQ==@MTE1NDQ5MzYwMDAwMDAwNDM3NzI4MTU=@MTE1NDQ5OTUwMDAwMDAwNDExMDMxNDc=@MTE1NDQ5OTUwMDAwMDAwNDA5Njk0MDc=@MTE1NDQ5OTIwMDAwMDAwNDQ2NDY4NzM=@MTE1NDAxNzgwMDAwMDAwNDE4NDcxNjU=@MTE1NDAxNzgwMDAwMDAwNDE4NzExNTc=@MTEzMzI0OTE0NTAwMDAwMDA0MTk4OTA5Nw==@MTE1NDY3NTIwMDAwMDAwNTEzOTA5NDU=@MTEyOTEzNzMzMDAwMDAwMDUxNDE3MDIx@MTE1NDAxNzgwMDAwMDAwNDQzOTQ1ODU=@MTE1NDUyMjEwMDAwMDAwNDQzOTQ3MzM=@MTE1NDQ5OTUwMDAwMDAwNDQ0MTk2MjU=@MTEzMzI0OTE0NTAwMDAwMDA0NDE3MDkwMw==@MTE1NDQ5MzYwMDAwMDAwNDUzMzQ4Mjk=@MTE0MDkyMjIwMDAwMDAwNDc3MzYxOTk=@MTEyNDExNjE0OTAwMDAwMDA0OTQ3ODI5MQ==@MTE5MzE2OTAwMDAwMDA1MTMxNDQ1MQ==@MTAxODc2NTEzNTAwMDAwMDAwMDQwMjgyMw==@MTAxODc2NTEzNDAwMDAwMDAwMDM3MDgyMw==@MTAxODc2NTEzNDAwMDAwMDAwMDUwMjM4Nw==@MTAxODc2NTE0NzAwMDAwMDAwMDA4NzYxNQ==@MTAxODc2NTEzMDAwMDAwMDAwMDQwNjM3NQ==@MTAxODc2NTEzMDAwMDAwMDAwMDUyMTAzNQ==@MTEyNjkzMjAwMDAwMDAwMDQ5MjYyNTg3',//账号一的好友shareCode,不同好友中间用@符号隔开
  'MTAxODc2NTEzNDAwMDAwMDAwOTM3MjM4NQ==@MTAxODc2NTEzMjAwMDAwMDAyMTc2MzIxNQ==@MTE1NDQ5MzYwMDAwMDAwNDM3NzI4MTU=@MTE1NDQ5OTUwMDAwMDAwNDExMDMxNDc=@MTE1NDQ5OTUwMDAwMDAwNDA5Njk0MDc=@MTE1NDQ5OTIwMDAwMDAwNDQ2NDY4NzM=@MTE1NDAxNzgwMDAwMDAwNDE4NDcxNjU=@MTE1NDAxNzgwMDAwMDAwNDE4NzExNTc=@MTEzMzI0OTE0NTAwMDAwMDA0MTk4OTA5Nw==@MTE1NDY3NTIwMDAwMDAwNTEzOTA5NDU=@MTEyOTEzNzMzMDAwMDAwMDUxNDE3MDIx@MTE1NDAxNzgwMDAwMDAwNDQzOTQ1ODU=@MTE1NDUyMjEwMDAwMDAwNDQzOTQ3MzM=@MTE1NDQ5OTUwMDAwMDAwNDQ0MTk2MjU=@MTEzMzI0OTE0NTAwMDAwMDA0NDE3MDkwMw==@MTE1NDQ5MzYwMDAwMDAwNDUzMzQ4Mjk=@MTE0MDkyMjIwMDAwMDAwNDc3MzYxOTk=@MTEyNDExNjE0OTAwMDAwMDA0OTQ3ODI5MQ==@MTE5MzE2OTAwMDAwMDA1MTMxNDQ1MQ==@MTAxODc2NTEzNTAwMDAwMDAwMDQwMjgyMw==@MTAxODc2NTEzNDAwMDAwMDAwMDM3MDgyMw==@MTAxODc2NTEzNDAwMDAwMDAwMDUwMjM4Nw==@MTAxODc2NTE0NzAwMDAwMDAwMDA4NzYxNQ==@MTAxODc2NTEzMDAwMDAwMDAwMDQwNjM3NQ==@MTAxODc2NTEzMDAwMDAwMDAwMDUyMTAzNQ==@MTEyNjkzMjAwMDAwMDAwMDQ5MjYyNTg3',//账号二的好友shareCode，不同好友中间用@符号隔开
]

// 从日志获取互助码
// const logShareCodes = require('./utils/jdShareCodes');
// if (logShareCodes.PETSHARECODES.length > 0 && !process.env.PETSHARECODES) {
//   process.env.PETSHARECODES = logShareCodes.PETSHARECODES.join('&');
// }

// 判断github action里面是否有东东萌宠互助码
if (process.env.PETSHARECODES) {
  if (process.env.PETSHARECODES.indexOf('&') > -1) {
    console.log(`您的东东萌宠互助码选择的是用&隔开\n`)
    PetShareCodes = process.env.PETSHARECODES.split('&');
  } else if (process.env.PETSHARECODES.indexOf('\n') > -1) {
    console.log(`您的东东萌宠互助码选择的是用换行隔开\n`)
    PetShareCodes = process.env.PETSHARECODES.split('\n');
  } else {
    PetShareCodes = process.env.PETSHARECODES.split();
  }
} else {
  console.log(`由于您环境变量(PETSHARECODES)里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < PetShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['PetShareCode' + index] = PetShareCodes[i];
}