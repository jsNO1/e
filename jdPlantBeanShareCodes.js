/*
京东种豆得豆互助码
此文件为Node.js专用。其他用户请忽略
支持京东N个账号
 */
//云服务器腾讯云函数等NOde.js用户在此处填写东东萌宠的好友码。
// 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间用&符号或者换行隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
let PlantBeanShareCodes = [
  'rgorqgqg4gtluaxd7447mv56ea@hdpluo3fw52b7v3bt2jnjzcfza3h7wlwy7o5jii@e7lhibzb3zek3e4ipnxqoe53rp3ihqwww23hw6y@olmijoxgmjutzckvjhiisyidi6xvlmdadqh5xbi@4vvbjlml6tdfdgkob4cghf6svdbovn5nkzx3afq@nkvdrkoit5o65tasishkhlhgzmpfzfz4abfclli@xaq3fso6ha2krfakuembf5o2ru@plburxacdo26nss7lgmlez34ti@mlrdw3aw26j3wcovxizans6xwvf5wrgfm5odnaa@su6bfszxhcblrn45uz5w3qbcz4@mwx2fbrx5rt2ylw4zktinhz4mu@rb6w5zmt2uc5am4dgawzwccaqa@olmijoxgmjutza2iwozsxgztbqmjvquo2zue5ki@mlrdw3aw26j3xqgoaciuigwgmf7qxfjejssoa3i@emhxfc7hmmayfc7awwgndqnmu43h7wlwy7o5jii@olmijoxgmjutz3mcu23gz2xazp6wr5rwogy4zfq@olmijoxgmjutziedkkcdvmea3xbineb3l7i4umq@e7lhibzb3zek3zucaibbdaucwgddpxwctw5ut3i@7t7fuzpihctpkodk6sbizqr5iinpnrsacrrd3hq@e7lhibzb3zek34jm424cuwiuuj5uu4mb7qaupri@o7eiltak46s2xgzkxoxpohdfmut3ivdn7oknezy@d7v7b5psqtvegbxa6p6laof5me@mlrdw3aw26j3x4qcrrsa5uteedfutjfihj4v2ey@mlrdw3aw26j3xx2fqbkvt5ug27kaq4ckbik4qiq@rj7s6mzlk7uog6n2fmxgwkh5nn5rumkjmcn552q@z42ysow4akzc3pqczgxayiueeu@mlrdw3aw26j3wmackpdsme2cawy22l6d4g3xvjq@yw6hilvomdzrngona34lxybpwy@mlrdw3aw26j3xf6xdcux3gsqq366h3yyq3kcwfi@cvhfevzh2r7hfryftmxp6pdtea5ac3f4ijdgqji@lxslbmbe3tkxfalufgkg2ypzja3h7wlwy7o5jii@olmijoxgmjutywh5hfs743dlhde543cl6eqwfma@hexohqmn2e3mdcmfj3r6dmy7o35mbo7c4ypxafa@olmijoxgmjutz7bidvtflback2snrprn4m65fsa@rtsljotwy2w35an32iywbnavvhzzkkj6oxynfci@l4ex6vx6yynouw7fnpkv4axzglurmcspxkhd5pq',//账号一的好友shareCode,不同好友中间用@符号隔开
  'rgorqgqg4gtluaxd7447mv56ea@hdpluo3fw52b7v3bt2jnjzcfza3h7wlwy7o5jii@e7lhibzb3zek3e4ipnxqoe53rp3ihqwww23hw6y@olmijoxgmjutzckvjhiisyidi6xvlmdadqh5xbi@4vvbjlml6tdfdgkob4cghf6svdbovn5nkzx3afq@nkvdrkoit5o65tasishkhlhgzmpfzfz4abfclli@xaq3fso6ha2krfakuembf5o2ru@plburxacdo26nss7lgmlez34ti@mlrdw3aw26j3wcovxizans6xwvf5wrgfm5odnaa@su6bfszxhcblrn45uz5w3qbcz4@mwx2fbrx5rt2ylw4zktinhz4mu@rb6w5zmt2uc5am4dgawzwccaqa@olmijoxgmjutza2iwozsxgztbqmjvquo2zue5ki@mlrdw3aw26j3xqgoaciuigwgmf7qxfjejssoa3i@emhxfc7hmmayfc7awwgndqnmu43h7wlwy7o5jii@olmijoxgmjutz3mcu23gz2xazp6wr5rwogy4zfq@olmijoxgmjutziedkkcdvmea3xbineb3l7i4umq@e7lhibzb3zek3zucaibbdaucwgddpxwctw5ut3i@7t7fuzpihctpkodk6sbizqr5iinpnrsacrrd3hq@e7lhibzb3zek34jm424cuwiuuj5uu4mb7qaupri@o7eiltak46s2xgzkxoxpohdfmut3ivdn7oknezy@d7v7b5psqtvegbxa6p6laof5me@mlrdw3aw26j3x4qcrrsa5uteedfutjfihj4v2ey@mlrdw3aw26j3xx2fqbkvt5ug27kaq4ckbik4qiq@rj7s6mzlk7uog6n2fmxgwkh5nn5rumkjmcn552q@z42ysow4akzc3pqczgxayiueeu@mlrdw3aw26j3wmackpdsme2cawy22l6d4g3xvjq@yw6hilvomdzrngona34lxybpwy@mlrdw3aw26j3xf6xdcux3gsqq366h3yyq3kcwfi@cvhfevzh2r7hfryftmxp6pdtea5ac3f4ijdgqji@lxslbmbe3tkxfalufgkg2ypzja3h7wlwy7o5jii@olmijoxgmjutywh5hfs743dlhde543cl6eqwfma@hexohqmn2e3mdcmfj3r6dmy7o35mbo7c4ypxafa@olmijoxgmjutz7bidvtflback2snrprn4m65fsa@rtsljotwy2w35an32iywbnavvhzzkkj6oxynfci@l4ex6vx6yynouw7fnpkv4axzglurmcspxkhd5pq',//账号二的好友shareCode，不同好友中间用@符号隔开
]

// 从日志获取互助码
// const logShareCodes = require('./utils/jdShareCodes');
// if (logShareCodes.PLANT_BEAN_SHARECODES.length > 0 && !process.env.PLANT_BEAN_SHARECODES) {
//   process.env.PLANT_BEAN_SHARECODES = logShareCodes.PLANT_BEAN_SHARECODES.join('&');
// }

// 判断github action里面是否有种豆得豆互助码
if (process.env.PLANT_BEAN_SHARECODES) {
  if (process.env.PLANT_BEAN_SHARECODES.indexOf('&') > -1) {
    console.log(`您的种豆互助码选择的是用&隔开\n`)
    PlantBeanShareCodes = process.env.PLANT_BEAN_SHARECODES.split('&');
  } else if (process.env.PLANT_BEAN_SHARECODES.indexOf('\n') > -1) {
    console.log(`您的种豆互助码选择的是用换行隔开\n`)
    PlantBeanShareCodes = process.env.PLANT_BEAN_SHARECODES.split('\n');
  } else {
    PlantBeanShareCodes = process.env.PLANT_BEAN_SHARECODES.split();
  }
} else {
  console.log(`由于您环境变量(PLANT_BEAN_SHARECODES)里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < PlantBeanShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['PlantBeanShareCodes' + index] = PlantBeanShareCodes[i];
}
