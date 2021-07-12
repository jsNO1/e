/*
东东工厂互助码
此文件为Node.js专用。其他用户请忽略
支持京东N个账号
 */
//云服务器腾讯云函数等NOde.js用户在此处填写东东萌宠的好友码。
// 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间用&符号或者换行隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
let shareCodes = [
  'T0225KkcRBoQ8FOGJ0vynKQPcwCjVWnYaS5kRrbA@T0154qI1FXFFrAqDcXUCjVWnYaS5kRrbA@T0105rogQRwb8ACjVWnYaS5kRrbA@T0114rczSRga9FwCjVWnYaS5kRrbA@T0116ap0QB4e9VQCjVWnYaS5kRrbA@T0225KkcRUhKoFyFJxyiwKJbJQCjVWnYaS5kRrbA@T015u_5xRhYY9lTQT0cCjVWnYaS5kRrbA@T0225KkcRhhK8QLUcxv0kvJccACjVWnYaS5kRrbA@T0225KkcRRlL_F3SIhP9xvIMdgCjVWnYaS5kRrbA@T018v_51SRce9FHeIBib1ACjVWnYaS5kRrbA@T0225KkcRk1N81TSIBr9lfdfIACjVWnYaS5kRrbA@T0225KkcRBsa_VDUJhL0nKEMcwCjVWnYaS5kRrbA@T022v_xzQRsa9VTXPRP2lfUCcACjVWnYaS5kRrbA@T012uP1yQR8a9lbTCjVWnYaS5kRrbA@T0225KkcRU8e9VLWIRmhxv4PIACjVWnYaS5kRrbA@T0225KkcRhtL8QbQKBqhkPQDcgCjVWnYaS5kRrbA@T0225KkcRkgd_VKEchvzkKQKJwCjVWnYaS5kRrbA@T012_qgkHFtGqRGICjVWnYaS5kRrbA@T0225KkcRRYe_VGGJB-ilKYPdwCjVWnYaS5kRrbA@T016-qwtE09AowGJdxPwCjVWnYaS5kRrbA@T018v_h6Qh4d9lXUIhub1ACjVWnYaS5kRrbA@T0225KkcRhlN8FaBIk_0kaQIJgCjVWnYaS5kRrbA@T0225KkcRk0d91LVKBPxwf4PfQCjVWnYaS5kRrbA@T0205KkcIVlRkguAXluu_YBgCjVWnYaS5kRrbA',//账号一的好友shareCode,不同好友中间用@符号隔开
  'T0225KkcRBoQ8FOGJ0vynKQPcwCjVWnYaS5kRrbA@T0154qI1FXFFrAqDcXUCjVWnYaS5kRrbA@T0105rogQRwb8ACjVWnYaS5kRrbA@T0114rczSRga9FwCjVWnYaS5kRrbA@T0116ap0QB4e9VQCjVWnYaS5kRrbA@T0225KkcRUhKoFyFJxyiwKJbJQCjVWnYaS5kRrbA@T015u_5xRhYY9lTQT0cCjVWnYaS5kRrbA@T0225KkcRhhK8QLUcxv0kvJccACjVWnYaS5kRrbA@T0225KkcRRlL_F3SIhP9xvIMdgCjVWnYaS5kRrbA@T018v_51SRce9FHeIBib1ACjVWnYaS5kRrbA@T0225KkcRk1N81TSIBr9lfdfIACjVWnYaS5kRrbA@T0225KkcRBsa_VDUJhL0nKEMcwCjVWnYaS5kRrbA@T022v_xzQRsa9VTXPRP2lfUCcACjVWnYaS5kRrbA@T012uP1yQR8a9lbTCjVWnYaS5kRrbA@T0225KkcRU8e9VLWIRmhxv4PIACjVWnYaS5kRrbA@T0225KkcRhtL8QbQKBqhkPQDcgCjVWnYaS5kRrbA@T0225KkcRkgd_VKEchvzkKQKJwCjVWnYaS5kRrbA@T012_qgkHFtGqRGICjVWnYaS5kRrbA@T0225KkcRRYe_VGGJB-ilKYPdwCjVWnYaS5kRrbA@T016-qwtE09AowGJdxPwCjVWnYaS5kRrbA@T018v_h6Qh4d9lXUIhub1ACjVWnYaS5kRrbA@T0225KkcRhlN8FaBIk_0kaQIJgCjVWnYaS5kRrbA@T0225KkcRk0d91LVKBPxwf4PfQCjVWnYaS5kRrbA@T0205KkcIVlRkguAXluu_YBgCjVWnYaS5kRrbA',//账号二的好友shareCode，不同好友中间用@符号隔开
]

// 从日志获取互助码
// const logShareCodes = require('./utils/jdShareCodes');
// if (logShareCodes.DDFACTORY_SHARECODES.length > 0 && !process.env.DDFACTORY_SHARECODES) {
//   process.env.DDFACTORY_SHARECODES = logShareCodes.DDFACTORY_SHARECODES.join('&');
// }

// 判断环境变量里面是否有东东工厂互助码
if (process.env.DDFACTORY_SHARECODES) {
  if (process.env.DDFACTORY_SHARECODES.indexOf('&') > -1) {
    console.log(`您的互助码选择的是用&隔开\n`)
    shareCodes = process.env.DDFACTORY_SHARECODES.split('&');
  } else if (process.env.DDFACTORY_SHARECODES.indexOf('\n') > -1) {
    console.log(`您的互助码选择的是用换行隔开\n`)
    shareCodes = process.env.DDFACTORY_SHARECODES.split('\n');
  } else {
    shareCodes = process.env.DDFACTORY_SHARECODES.split();
  }
} else {
  console.log(`由于您环境变量(DDFACTORY_SHARECODES)里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < shareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['shareCodes' + index] = shareCodes[i];
}