/*
东东农场互助码
此文件为Node.js专用。其他用户请忽略
支持京东N个账号
 */
//云服务器腾讯云函数等NOde.js用户在此处填写京东东农场的好友码。
// 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间用&符号或者换行隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
let FruitShareCodes = [
  'f8f819f3f3dd4f5b8f1d35337da2c893@ef9b51fb77d644d3aaa0f15fcf1dc72f@a6c7291809d344b5871171a45ca0d9b9@fef036bcd72b45d59750234231ada2fc@07ddff575eab48ef9f20ad0a124dc03c@9398433e865e4f05b55c17a5df520506@2f8be95b3d2243b7965fb74f4295274b@c946b311966145bfa1fee58429655841@ff21c8f1b356464b9f68fe2110c4d1d4@af1f02e9c13f46828c9dae444ae81759@63a6a4e282ad4e9cbc6bc69760226f0d@e8a2a584b1424db4bd25a9e97cfaa40c@d17a30aa95d44f479d60b88394f7c974@f1c389a6e5ac4a5b811ce591df499979@3df0143c96ad4ff2bfdcdcd0b1030c1a@bd81b1227ebf460b8d11586d206edd32@4b06f4c126ad4fd7ad86d90e5d844770@5fd4a21e670744f1a6c2d63062855e66@cd66ca5cbcfe4e85b3081c56933ce71a@0dcde45f82774f1d806d3cb79dbc88aa@3d0136d28a354c438fa1adea53a5b31d@48a060283b6043aebc73f4f5338945f1@79b17ff74a8041e2a4b6ef93afa79177@d952142db6a441b09174f57a2a9d1e85@ad035d5923164b85924bcef33454a87a@7aee3b6106694762a06e020302374e7e@57e84d0f03484dbe8c37a61ac7562a2d@4fe5abec14524fd59a8ef6fbbd2b3ca7@e50d5bbc5d7642d685e9519c38c4a2ec@f63df0fcdde845a4a3102ccec4e83ce3@2a7f317cfdee4d4a844e830075f7d4b2',//账号一的好友shareCode,不同好友中间用@符号隔开
  'f8f819f3f3dd4f5b8f1d35337da2c893@ef9b51fb77d644d3aaa0f15fcf1dc72f@a6c7291809d344b5871171a45ca0d9b9@fef036bcd72b45d59750234231ada2fc@07ddff575eab48ef9f20ad0a124dc03c@9398433e865e4f05b55c17a5df520506@2f8be95b3d2243b7965fb74f4295274b@c946b311966145bfa1fee58429655841@ff21c8f1b356464b9f68fe2110c4d1d4@af1f02e9c13f46828c9dae444ae81759@63a6a4e282ad4e9cbc6bc69760226f0d@e8a2a584b1424db4bd25a9e97cfaa40c@d17a30aa95d44f479d60b88394f7c974@f1c389a6e5ac4a5b811ce591df499979@3df0143c96ad4ff2bfdcdcd0b1030c1a@bd81b1227ebf460b8d11586d206edd32@4b06f4c126ad4fd7ad86d90e5d844770@5fd4a21e670744f1a6c2d63062855e66@cd66ca5cbcfe4e85b3081c56933ce71a@0dcde45f82774f1d806d3cb79dbc88aa@3d0136d28a354c438fa1adea53a5b31d@48a060283b6043aebc73f4f5338945f1@79b17ff74a8041e2a4b6ef93afa79177@d952142db6a441b09174f57a2a9d1e85@ad035d5923164b85924bcef33454a87a@7aee3b6106694762a06e020302374e7e@57e84d0f03484dbe8c37a61ac7562a2d@4fe5abec14524fd59a8ef6fbbd2b3ca7@e50d5bbc5d7642d685e9519c38c4a2ec@f63df0fcdde845a4a3102ccec4e83ce3@2a7f317cfdee4d4a844e830075f7d4b2',//账号二的好友shareCode，不同好友中间用@符号隔开
]

// 从日志获取互助码
// const logShareCodes = require('./utils/jdShareCodes');
// if (logShareCodes.FRUITSHARECODES.length > 0 && !process.env.FRUITSHARECODES) {
//   process.env.FRUITSHARECODES = logShareCodes.FRUITSHARECODES.join('&');
// }

// 判断github action里面是否有东东农场互助码
if (process.env.FRUITSHARECODES) {
  if (process.env.FRUITSHARECODES.indexOf('&') > -1) {
    console.log(`您的东东农场互助码选择的是用&隔开\n`)
    FruitShareCodes = process.env.FRUITSHARECODES.split('&');
  } else if (process.env.FRUITSHARECODES.indexOf('\n') > -1) {
    console.log(`您的东东农场互助码选择的是用换行隔开\n`)
    FruitShareCodes = process.env.FRUITSHARECODES.split('\n');
  } else {
    FruitShareCodes = process.env.FRUITSHARECODES.split();
  }
} else {
  console.log(`由于您环境变量(FRUITSHARECODES)里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < FruitShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['FruitShareCode' + index] = FruitShareCodes[i];
}
