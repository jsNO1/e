/*
https://lzkj-isv.isvjcloud.com/lzclient/12345/cjwx/common/entry.html?activityId=xxxx
*/
const $ = new Env('超级无线店铺抽奖');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', message = '';
let activityIdList = [
    "553415b1fafd4ee4858c337412bdd9f1",
    "437b45c3ab6641719917e6072fa445a8",
    "1cf74f9ed02349aeb57a9f6886002c51",
    "f1956c3484974846a1a831cab4f1de66",
    "849cf7f6704b495092015bd1a8a61804",
    "f4a015ef71304918ad3d6b741268c58e",
    "fb46f4042533440c9014115106d934c8",
    "fecdb983fbfd4e01b1b79e5d3c7487b9",
    "7464f97ac7fd4abaa7446e26585b4165",
    "8c8762998db247ff96ae562b6286d37c",
    "6221f87ad80c4e14b32a4c2006c4d64e",
    "d51b48c39ed34877b1378b46da705044",
    "2f04f17499fe46dfa8a1bc20168a88d0",
    "9743f595ee574d70a27534df079f52e3",
    "d566275ac22141099a8c7162e8f555da",
    "05f0614e0ce549d287ab872b12398eda",
    "fc44d05f5972483ebfc12a6dfc4578b8",
    "cf8ec643535e47ff89144dc9d1b28529",
    "a2bc41900d92494b885843485a4d7e51",
    "c7c2ee0a907c43258c42822b0d4aac76",
    "9fe4d506015c47c5b50fc66355bcc03a",
    "6bd9a01b9d7b4d9abda78feb4b41a68d",
    "bf97de7b5ef14444a1db4a52d90a689f",
    "c216460fe083441aacacc01a7fc77ecd",
    "31a20922150944419223261bd5cb3c30",
    "2601be94c16746f5b80a912b1b1ff9d8",
    "4cd114efa52a4dafa28816cfb9b5e60b",
    "0648bd5353fb4455b62be6f3f267bc87",
    "80aedf4b8326429b994f5020fcdd66f8",
    "34b8a44cd0a841f0b2e30e5e94df9175",
    "db1fc7ca7399412a9721e0ce68c70332",
    "0c9072ddc8a04f9fab7befbadd6d73b9",
    "59a6ce9cb2184e8d91f4bdfc954078ef",
    "2fb3b9394a014725be83ebf9a7489ae9",
    "f0ae36d309714c42b9a1e39232d23fc1",
    "09b605ea023c420b8025c541156ef0d0",
    "5d4ab0a9745f46fab92cee872344742d",
    "e82d3b7fdff646a0b946d796e50cb06d",
    "81136576937d440e975325202b37cd61",
    "83af5cf1642d43a2829bcd5b5bf24d98",
    "d36442d55594451c93e481aaae53719f",
    "c4ab0b5d1c2947158c61d6abdf89a659",
    "b3fdb66157a74f6da7be37da8b0517ea",
    "dac58fe7b89c43d9890eb9f8c4540a3b",
    "2331f9b4fdc44a3ebe4ae69806f133e7",
    "daf723cfc8cf4287aa0c87982626073d",
    "6d7dba86b49f455da5253fa99b37d850",
    "bc70c165c82b4c10b3e8af5ce09ac118",
    "7ab3292911a64b4d8ac772f5fcbb6250",
    "e937ec3400fd45bba132b443aed33b9c",
    "cd77f097eece46f5be4fc727f8937d8b",
    "a95e04ade4a14c90a1a90013eb996047",
    "3c1ac84ac99e4ba0bd33298d4900878f",
    "831a0a5597654904bb89e443a2ee636c",
    "ec91ff9007bb47da9687a712633ae3e9",
    "95db374a0b82430081173af249c48105",
    "aeca0c5578e54e52989da3e522073db2",
    "cda7ef1a3a5241ca91f125af17022e72",
    "a2e33ba6b3f34d09b26a32c1b765c0c7",
    "c8db13e41926473ebf011fb92fc02bf3",
    "1feeba5d92b74e2dadf2f5eba3459d2d",
    "a4970aca93be4a5a9a1babc3af0e2a1f",
    "58b32d544d7249a78fc1325cae4aab80",
    "d88a986c156b44afb9b03f42728bf56a",
    "d8d34d5a59b44d898bacc66317f81f12",
    "eca4fb4f002c492286a0e3b3b40344db",
    "c0a6cb13dcaa4a4dbba2d54a1fc6fd5d",
    "89b47fb88a3c4b07a98622c79a9bedd4",
    "6bbe47efa3f749a4b977fb3e83fb2148",
    "ea94905698be4efaaf067c46247761c1",
    "bb4a1fb4cc5947128708b15ba46736b2",
    "3817e56b55544cfd8b463a97ba98d730",
    "c10252d4bfdb443fb68b91c73b7b1aed",
    "5f9191711b8b430d8d3be4889da6de89",
    "03f4b6704f554858b932a90c86ae939d",
    "fa9f5cf3db4240279d7a39f6546531a9",
    "132df00029e64a349556b3561064c607",
    "9710b98282f04d93a2b17bb353c55bf7",
    "7a3dba5044e24069952cd03f4310a9da",
    "b9e0d5f49d844ca49078a4b1cded84cd",
    "99d99ef13bd845e0a2735b4207c56627",
    "6b538421b786443d925a79f85214dae2",
    "5ab94723790f40fbbe2a8c44615cf4b6",
    "53457362f0be45828543a95c053ce7ee",
    "457afc34ab77428da8289068b6c2ee2c",
    "8375da257d4a4ca78dd0b3dc11341e87",
    "23ef8e38a9834e55a6d62a619e03da26",
    "41678bbb1024419c9e8d03efc907753f",
    "941394db1a204fe0a3fe815734c7d7f1",
    "50c393cb4a204394be4587de0acb1cc4",
    "608568a4ea894467ad9577d124709496",
    "5a001ccff98348b0a4a51bdb531d8ce0",
    "cb0550f6eca641d1a65aee07045dcdb1",
    "eb41118521d64c36961d2664eedc53fc",
    "d81e5893b95f4882ad60fbcdebcfd97a",
    "10f67c0e4ff14d3397deb8025bdb3b98",
    "7464544c3d1e48aead4e36f158d1d332",
    "f6bf2d49f6714442969f80e6791c9641",
    "7eb74fbb8e744e9485f8be83538f6ef2",
    "823dc814011946f285ef0bab10dcae87",
    "8c52cd25515f40fe9c1c74c4f77e90ff",
    "87546325c42c4c45a3fa45953c487a5d",
    "bd7ff2f2df4e423890ac489ce04c0419",
    "9ec33d3851fd44379ca0df55a4e37397",
    "80f3b4d2d1f14e7b91bed42cbc7c3a88",
    "adb4b277bcce4ff895fd8a4b4fb0046f",
    "c824078c20914334acb5fba7b0491e19",
    "518fe87e667c4699a57f8b59b122e369",
    "756db53520d343d5b87a1feb4c173825",
    "739e7e1c14a449c0aebf7f96a92a3915",
    "127adffd610248b088f71e6d421b9619",
    "e03548e9007d4e4fbe86da42607e3e12",
    "e73baf0ff8434d66b0d320f866c84d92",
    "7e693c865945457caa4b7f27782b719b",
    "e25c778bb53b456f8b3a8d810b8e525b",
    "46121bf3972546f1a15616a43a8fd95f",
    "c9232db164fc458a82b33acce4a5099f",
    "5ac00dbf3d644937bc02e9e9b6fc963d",
    "1ab65b2adc4a4d5496b27bac4a70b08c",
    "17695078d75a432482e3ab85c7f3eb42",
    "e22b03bbdd0b4d85b2eb49d967c66a32",
    "5e65abb788264ccca156e7bb6b17f9d9",
    "562369873290413eb2efff7eba517fda",
    "54c2272c4de54c558b54dd5fb35a4ca8",
    "ef597aa4b7424214b62532cf4fc2e2b5",
    "5915ce2b353b450390a37296c6513949",
    "e9df5535283147fea669d70ffa12f8d6",
    "a9d6ec7380124aa88e7e0382bd3b7890",
    "555c20f2976d4f7cb24b626424a838d5",
    "488e66164b8948aeaa98982f25bc5c8e",
    "1af768015c2a4aae93ba9456ff08558e",
    "a4f522384ba441e1bfc50cf21ea8b84e",
    "bed1979ec5dc4de49011f1cac80d1c60",
    "2781147d1aea4b0ca5583e44ee125a5f",
    "8efecb2ffd0e4fe1882467f4c9abb5e8",
    "8e6a58ffc1d74288ac8ca8df3ff86e11",
    "7f7fa380d4dd40b9b4e1f455a74cc442",
    "474002ab48694a8f84d2976dac25c184",
    "c17fac7f45df40f9ae29f1d11276ed85",
    "02f10f8ccf6b4d229332a1d638e56625",
    "9a5632992113413bba0a348ec69a0d95",
    "e281a750d95141feb44ec08233ca30bf",
    "219dc0848c444e5790948c4ed6f4b78f",
    "fa4e04f170f54f7294611287366d91ba",
    "a0a164849fe54dac83b8724ce0cb862e",
    "f8d3d104aeae40bdb78182ba72133f68",
    "abd274b5c22a4f548be1089f09f1f940",
    "d0e777d768a9427c80128c11142f1626",
    "759b06f549fc436c8b92236674ed32b6",
    "033549e8d604498b8824b469f74ed2c5",
    "b75d8608ae5146bf9091b429bfa31342",
    "03d469e8b7344a96a8f8dc6cf9a57eb7",
    "913e90bce814421ca71950b7d4ff3727",
    "35e9398c9b1c49fcb8f7ca7b92f70c00",
    "04cf92fef8af450891c990692668dde5",
    "979b50989c0643a5a05ca5592264cb64",
    "694ad86fa6e04e0397330b654b5cc919",
    "3d41c6d1cfbc4edeb8363b9a372d8415",
    "c3c2e1da3bee4c959d3fe50a2381842b",
    "e27e59fde4d744c6913415599bb700c1",
    "f3d9ecc433894e6daffb7e00910e6a8a",
    "952f7c57ffa442248dce9ab67051032e",
    "0dd9972e508f4d2a8cdcc84bf1f7f59a",
    "d88fd513d84a4fe3bf844b899bbbb4ab",
    "82f7647a02a143059c948339ad2e90d6",
    "dd3510b8ee7f4e9abc1a6fe0a6c676a2",
    "6130b3293e264c9fa2ea9d83321967f3",
    "bd1dd88c17db469197e82d55a9b6019e",
    "36740de8b4f34098a9feffb78c414651",
    "09b2bc33dbea4368ad5375a77ab39de6",
    "f6ccac2201b445fda0b6791da44d83f8",
    "1f505282cd944c12b06c711cd399edff",
    "d4d1162b87e243c98b438701afc0c890",
    "3404874c928a4f01bcd5a0061a24c523",
    "a0849da30a9d427b9b3818208bd4d7b3",
    "057aa3b6a5b546e2a20ef8486a558022",
    "00895706947a4d6496a3e839c6d03830",
    "7b2b461328b1489d90e47701224d4292",
    "c41f36be61654fcfb36c224e80ff3ec5",
    "3960691d96554bf4a9f1eb660c49e8f2",
    "6551120709d148ce9ac7b42e1dab233d",
    "974e15db61884b7c8e2db76e5928c53e",
    "b7c2294a4d724b53b96791b61d5ae7b2",
    "885ff53911c640dcb87b9315e7373b61",
    "545519c61d0a437c8b205321e592c16e",
    "44c61aab748444bf9e1f32c51bc63712",
    "2fa453d5d30f456b90b6db9c099bca9e",
    "5b6e1cec6f154c8e98c51aa3d0ae1e38",
    "7403f80bd5bb4d5e9df10269584a6cb6",
    "e0210a2990754b05aa9c1fdd461d3f43",
    "840002261bb3430999d08c3eeacde018",
    "43627d62437f4f70b5b6ec4a09090b31",
    "86a831fc6e2f4d948359eb27440219e6",
    "e122ff411739425e9b9a96aa638f98ba",
    "6d9f5145180342399ed81c8cb8fc936b",
    "f1820b4b3ec24d21850fe58754954f45",
    "bfe1f7a9d58a465396accf6222fc12ab",
    "fa3a130436734d63bb5b1209246858e3",
    "cc4ab1db22474fa6a581401e19b022bd",
    "160e9a648e4e4539b96a9d1a64f20683",
    "fcaa198847f94a258d7c4884375a6f3f",
    "11b6f3566bf14ca6b63f6785a9bb63c8",
    "a73be20d088e467bbdadacb95bca778d",
    "f274aa079e1a4ee49752e8e02853b676",
    "308bf88be260436ba912a8a6c2b8426d",
    "2f4ac43bdff74b718ba84816bbc95fd4",
    "0439b84e375e4f29a2911455f00b83b7",
    "753025626a0542c493ac2ce37f874ca4",
    "0bb57570fe4049c5986a4354da221fc6",
    "a27a11eb521d46ceaf590744f53a1b5b",
    "c8f3558910d64861b5551988010ce7cb",
    "516ef1c8c1ab4273ac773587cba1a2b8",
    "999d38fdcf8a48d6978746676eb09627",
    "64615c41b5eb4edcba69569eb93469ed",
    "8f2f878c096a42afa0cbc07787738e0d",
    "888237fdced849fda155cf2450a12e4f",
    "0d5365f177534b079935f1d643705e89",
    "94fdedeb41774b8584b8dd452622a5f4",
    "77575bd53f7d419a9e86a42d235c499b",
    "b588fde24eea4d32898e5f2308c9eb1e",
    "f4d8dc3b77fb40cba4b7b07bbd98eb0b",
    "2f93fcaa9a08444f88cbb36fc58b1df7",
    "a84e9ce1d9c44e26a0224264fe5a7851",
    "8ca81af73329487cbbc41ba91de99583",
    "97f70285f9b44bb2963eca66296f0629",
    "8ac1700b0f724c77a01d8084bd2dd7c1",
    "9f897360b33548c7bfe4330f201b1f33",
    "4aa8f30a0b054215b2b74e858127eaf7",
    "ddc9690e700141ad9d16298e418890a9",
    "71d5bd9464b7483892e493971050080c",
    "dd30a716fb954ea2b3e7f3c96c6e9cc7",
    "d5310299ca2d4b8d971c66f745695d19",
    "fe4d03639d3c49b0bf9eb749647f2f3a",
    "668109d933954187a4dc9f57e932a7ad",
    "d9e569a0fb4a43e698c3c396556bfe22",
    "28a9d609e8c4414682afea439d8621d3",
    "0959aac812724d4e8c1c3f134f8de166",
    "4244ee0b9b204813ba885fda058860a6",
    "018fc6012d5f4180a33d8a6c6665eea3",
    "0cc2f12f43c84aefb711bbd01db7245c",
    "6c142c55d9774aa28d9b946ce5995b57",
    "469c096599fc40529e6d0a4596d656dd",
    "3fd272067caf4f66bbb39c3ae2fb5fa7",
    "db88f899cb7b49fea1e0b1ea5cb9edca",
    "4323698a1ad64589a0a0d8e12e78b737",
    "a51d2c820cc94352a1b1ced3213bba94",
    "76aab1b775dd408897d4cabe94fb76bc",
    "d31643a59877456ba5e106b5646996a3",
    "2595942adc2c448eaa4086256e6212aa",
    "3ba32080a8214a10a9c4df7a51879983",
    "42d5a030bcfd40ff842a8d9cc06e409f",
    "312df4b5c95b4067afabd55b67984789",
    "398ce9fb9a7c4a08b5c9b556c619910e",
    "6fff858b0bc04e50a9f08d7654873b06",
    "5c094ad2d42a4d609cb9bdb4fe6c1e89",
    "437961dd16724ecfb990e50599a6430b",
    "f9a392a0644d46db97824ca36c386a6a",
    "8d06026ff2fe4afeaa1b52ef9e477866",
    "baf9e4d85e684b6987f3b73a654f5f02",
    "91dab330031746788462a4d8f01bce44",
    "b2aa3f5aa5cf4249b296d97e2b59521a",
    "d1b57f8232d4407492221ce5cbcdebaf",
    "42434c654e634161bb9d7e73136cb072",
    "ea1367deef4b479fb0d4eaf1d7b73616",
    "f4bdd7063042412b8516eb4f8796a441",
    "b41d48722e7f4355bf7dfe41c5e077f7",
    "eec39052cd214742830213ea2b65c213",
    "28e2192738df4040bbc78eb77ad2dc20",
    "f4d1c9de45d14c65bcd0d8fdadab7754",
    "f2f1329d2f774047a4d186514202f8b0",
    "70d3570ad33b4caea79d1e3c7155996b",
    "c9f752ca2b7d4c73a0269227543d5f86",
    "0f3ec0daac6d4d898b2e7a2367eedecf",
    "3741b4c08797463e80930b1867f2dd61",
    "662d19bee3f64e39b180444b1ceb7325",
    "19c5888d59634a5fb4e12d1ed8833d1a",
    "b2f1542513704664a2753ba82efdaf98",
    "98ff8cc86bb4481e9e4929216c07ec34",
    "8f2e19a80ea6430dbaa25a5506c6b2a7",
    "44fb0ba99cf24b52aab692d00e79609c",
    "bf14b0ff53684c238f5c46789f36b23b",
    "34d0a38fac6945f896283b0964f8b84e",
    "94169c1906034381ae1de2b48a97ddba",
    "7cf2a750de004fbab083fc215df6f641",
    "5a720dc66d4b40a999f2755ee29cc13a",
    "eef1ca37dc414df1b7ab4de8e1b18ef7",
    "406218a0058a4473a477768577c1d8a0",
    "7d9d675dbae14fd681e770f7ecefec45",
    "9a2378bd71084e63a9cc0f5f645d75b6",
    "7714fead09374cb5bb4d9a0a58c8c58a",
    "6ecba43b7729462782c8cd57b97b5390",
    "5a81ec02631747f4acdd6e5e8ab8cfe5",
    "738aa02bc85649cc816fc94e2f430ddc",
    "a1da9ee8b71147169847ace0fbce2ec1",
    "ae199438d69c48cb8fa641171a27f1d1",
    "dedce5154cdd49438ec82f50c8abce94",
    "0f2201aa5c334496b13a88326c54f451",
    "32d1fa8a41154de8bc11c030c2baf4f5",
    "cce4526c75634c9a9bc75f79fd056b63",
    "3d326219c19840fc9bfb8b740f3ae1d2",
    "d97d0a8d9ae749d88b23538126fa0a5f",
    "2a73e6b007974430886917ff23b53020",
    "e16ae36d1f514ea0b0a3b4474d5c3e7d",
    "624214516dc24065a0c66e654045f9af",
    "239c4d1aab1d4b80a9c0b30600c17e2b",
    "291a450e867c4ab5bfa668f0fd497a76",
    "8567007282fb432e8c816523c26d8f2c",
    "d64483666d6a4911a1c51dffcd987b5f",
    "8ea995c0ef1d40ba8fe69d00901f1277",
    "d87a502dde904285b95eabc89d7e65b6",
    "433000e2b088467cbc9ff4d0752f15a2",
    "2d12764547be4f7caed03197247c7711",
    "9c25f8f317f74c258dc560533534dfc7",
    "fc44e5ddc29746b1b5400bf6aea5d98f",
    "3accf0b42b654db995f844a3ec8580c9",
    "a7578d97258f4c589093fdb9871d5367",
    "bbd12ccd8597484c949b8b773f01fa9f",
    "81980ff11cfe4077a57e6b8b18e54fb7",
    "641a9aad57b3448f836da1fa0402dfb2",
    "1ddb125b9e2e48f1ba773ecda780fbba",
    "7207297b750f47aa82a2795cbfe6e047",
    "375b629876d44719abbe9b6f09440935",
    "b6e19a1791e44504bbb6b58b4fdf1b0e",
    "df7e00f3fc3c445ebbe7d15be717c1d4",
    "0f58e6da4e4c4c1885a60b3fe21e2a17",
    "f730ea494a1d483880a089a44a658bb0",
    "964cf76892634e95bb3166cf3620d5d1",
    "e293a6ce1297428a8bfeebb64f53ff6b",
    "0b3d7cc7021b45d7b485d5f002697b2c",
    "96cf76b341354de49ccfe165cf7e5b08",
    "f16230f64b4743d0904963a4e7366c7c",
    "22f9d42b3fc148a8962872861e703a59",
    "4c622aea68ac4ccbbf11f2648a3ca5a9",
    "e1e97e7d5a8c4164be41181fcd38265c",
    "8f172ccf0a4344a48ebdf03c8d038242",
    "e411e2e280b74146a2d1bdf325ac83e1",
    "653fba1b61f54f438d008508ad8d3694",
    "d57f89a417f64291b9c7044efc336b91",
    "10dbfbdfe87341e4ae97e63e35f7d27f",
    "7d55a823107b48b09296eefa3fbc64bb",
    "04183342396e40359294b9e7c97472dd",
    "914c5d06632a46aa9ba44f989e1b7ae3",
    "d01668019a0a44c29738605d419f8add",
    "290477d8fd464abfb852d89880aa0f9b",
    "48c8bd39170144239716f28162fe1f85",
    "c4a737aa303d4d33b5a97b35d022a9fc",
    "58d31be3e81f4714a02a946fbf0ddc8f",
    "e7629e911a4a48008a87b9febec2333c",
    "b2d869d6c4c746378ebfb60518a14a05",
    "3c7b8f386f7148b0b68042d2ea49d464",
    "65572370bb5241eab0b55953042ca9c4",
    "0b2c62813b544e268ec8aa8582cd44e6",
    "66febe21468a472aab7b794094004fc6",
    "0faa35e74f7d462f837918e02c8a120c",
    "d3b40fde26cf4f938c0a2b626277ddb0",
    "259e83a6499a4f4392b1a511fc3ef5b7",
    "dc3ec231fef6434d908eb20922fa05d0",
    "d60b8b00fb0e4458afdf0a5d6e7ef7e0",
    "d67e56ccc0994b2a8a25039b4de67b0c",
    "99d5a201aebc4a21919217eb49460b46",
    "373d2e398c584bf4b931807503b15aa9",
    "9ca18bfdaf874524aa25036f370f136e",
    "2a9625c1af8a43afbb0fc56eeeb94c63",
    "9df4f803fa1d4a31871892b603f54367",
    "a1133fc1f42648b597703636df256f5b",
    "da82af392a1645f4bdd5d407f1edd3b2",
    "314e759a0ed245f1bb8fbcb8a1d6856a",
    "335584609330450c894a3504ecee42b4",
    "f5e7e687925e4643822f60fe4e7b4598",
    "d15c43858f734648bfc4aacc660c379d",
    "30fe7a9401e6484bb970cd0664a66cc1",
    "0188d1cad5d0453e9cd5bf375120bd68",
    "e9969e16777b457093285cdaa8458167",
    "6e3d2b3fbf9749da8e668738896db82a",
    "96f0444bcdaa4444b15d5438fa684986",
    "df270ddb55cb4e75bccc76be4954a9b3",
    "c0e0564b0db648d1bd390142c242712d",
    "65c866e6456f4386807797d661603056",
    "b5789b2d1f274fab8de4d5c5557984a2",
    "5363507712fc4eb7a1a9c3d69f2d8eba",
    "d9c1559ba75f484b97617add2bc31449",
    "8fdf8ea3cf4849f48228cb49dd98e539",
    "e27f035ccf9d48a39edaaccdd02a81c4",
    "47d431fcb92a4fcd881a3f7b3509d86f",
    "f25a028e95af42d18b8ff2bad1dd5014",
    "2e3cf6c621564eebb65e08241a898b6e",
    "93db6324f82c4b8bbdb4b9d15f45009c",
    "dd79bb8d0295414a961940083d5c9b66",
    "ee48f44e021e40549ef8245ede6961d0",
    "204437ee32984460ac3ce993340b84e8",
    "f159851913f84a4fa4f81fd6d761bce4",
    "19a4c4eef83141aca67d65cd9e7a2343",
    "d5ac98c4504c4b3d9428c9c03ed21b65",
    "fe3f6306e21a4b999118ad81d7f653ca",
    "9e180404b2534cdea2a6e02937718355",
    "8c7d6c2194dd475ca220cc21e85f99e6",
    "2cba0b6291bd4d37b052aeddb306f103",
    "7e9404c783954e87819db6123653eb9e",
    "9af3e6ed1d024522bd25237b1730f1e7",
    "dacee8d1755241cabb53b96b2b538a20",
    "f188a4542231476b87224a88aecb40b8",
    "a727640768d64d46859469ca7698e901",
    "7e0acf2da0094e95902a479f833c27eb",
    "26249be5dcdb4886a34cd82e83c57ff0",
    "607463a5db1b44a28fea50a90abc5675",
    "51193c7e0c7d4ab19925fedd6808e3f4",
    "e885b4e059ff463186420585c2fcc44f",
    "6b2b906b5227428a9f60b9eb0e34040f",
    "b2332bd9abf14c6c89c186ac861f1e0a",
    "4a368bfcda1040e682d51739392210eb",
    "419751b6805144bf96df7fb98196a88b",
    "bd7243ee76a94d0cae3f2c5af7c32440",
    "4144cbf9458e4d508f02ee1028715a59",
    "0a7d96828215491e9b3399844a0679df",
    "db3b8f08aa6a44df9a99c6886fd81a9e",
    "848f30973da3476b961ec842a37491ab",
    "efb3f047a6b041fab7d390cd2304d31f",
    "9b791b6167bf46889e106d5f857ab1ef",
    "f7c0bb3b37094922bc30d12e2bd9ed45",
    "d0820f175ab44dd6b18f96a442788641",
    "b40d05d2bfaf44c0a9c03a128c1f7fb1",
    "614e5821335542d4839319bb43b41ffc",
    "c4078d655c4f4d758b450b5dd601c819",
    "2a800b3ea87648c6ba51c5f3d6818a2f",
    "6e368595fb4b49b7a5bc3bc82e87c3bd",
    "0488db8df74942d099ad15eebdb49fde",
    "4bfff22c1cd445c0b6f3e025d0dae787",
    "dbbadd675bd845699decaa121b198e5e",
    "a7260ba800064ccfb0f39632db4c8bc0",
    "7bf053cd143d4d99b5c4cf79441f8366",
    "f5409279ab184a06918505606661f473",
    "acebf238b5f848d28f2f64ef920512d3",
    "dd3141ebd61d49f488ab975dc0c6a007",
    "639f2bdc1d8a4cadab093d184bc1b3f1",
    "83e983d47f3f43e38d978eb863f5af60",
    "300f9badabd14957a094e8d4462a50d3",
    "781042262fe145ea8f375cc60658f858",
    "57a12b2db3e6423ca85ebc5dbdc69c11",
    "6ed34d8db9d349eb8eb82c74806f742a",
    "1cee616be041455e860757a527d51a67",
    "0a36520cba324b40b70efb29c7dbc4d8",
    "ff2e4edccf7c44bdbf91d72f2d19cbb8",
    "d2d1c85a059843d9b6fc1ecc4f4ba91e",
    "dc849c2d324b4927a2664d23d52bb858",
    "dbbefde2b3a440aabe3d049a77d5f4a2",
    "c421dcf40da64af2a5717cf724d54e39",
    "cb9d72d5bafd4e84a71ddf4e274bb372",
    "5a25732e5aff4a7d9f9a8d965405ef11",
    "c8d82a4e57b24897913055a94dfd0218",
    "8d14d1b580f045cf908cc4849f99db52",
    "88ac59b49cce410ab951f5a9d489b29d",
    "6e8d5de295f74f4cb61589e54724e166",
    "3b7df622fbc6413597777b22496b280c",
    "37d5dbbda33f4ab89a7b2085db823c0c",
    "ed03175601984400a25c1e48f1d7f667",
    "bb43119ba04e4ad4837dcf9a477ca5c8",
    "197f760c31a04f1091c4a8b52d633367",
    "4bff367348a542d5aec867ae3e0517af",
    "73326d76d38440c6b078cda8fc2cb096",
    "dc5fb844880b484588ca016a27008619",
    "de9b68d6a4ee432a9a30dd0e996186b1",
    "f5c5ff5c9560449ca8c01d93513b9879",
    "69d06a11d9b14470b0035bab869ccebc",
    "ab0f219b4fe2491aacff42d3e7c6b8f7",
    "5c8c8d2c6b1541fc890e649624244f0d",
    "d0ec1b7d514f475b851c0164c8b9ed52",
    "ee7166ced99740b8af1b9b6be9cbbdb4",
    "ee776f8954084d37a64479620b684629",
    "e37b2833cfdd4556a012c302b92e8a5e",
    "ee23f8cc7b0443449883a4dad888f7b3",
    "4f5dcc84d65e4f22baca91115a8c5c63",
    "28a0e17ba82549c3a87b8200eadb403b",
    "9deb8081847f425e86a00ef5280d5dc9",
    "8ea458cbd814403cbeb45ad50c25a18a",
    "12761d7813be43379a8c64f6f565674a",
    "015681b3e48e4a4ab13203ff9dc4d157",
    "611d599242e949cc82416709a5fb786f",
    "fbfaac071dc443d5bcbed4857b0150c2",
    "3c6b0b734c504dafac9327d2b9a59b4a",
    "c9487a4c504b45c9af38542856b23f9d",
    "06dec02518e340b38697b285399e7809",
    "5976e481e9944ccf9f730ea8e07ad41d",
    "e39cb82c1a204cbeb06c38fe333f6597",
    "3d39555ec8244217a8b0fb2f14194154",
    "888c3618b939485b9c8b9653153cbaf1",
    "9040d7fb6a0b4e13979caca08ccb0947",
    "2b4ba226965f49dca17369b0c1121bf7",
    "9ce51b7d4e4f4c6e9ca80f6fd6b2538d",
    "a60584be68b743a99e7bc6a4655978f5",
    "c434e7d6761940d98bf44dca3562b0f1",
    "c64fad41fca449d9aca82d0973e5fc02",
    "3596a2131e2d48e0992d08efb060737b",
    "afe6ddfa3c8542f7a237ece9573b52cd",
    "5317a015c2fa4a008c5603d72aa37c5f",
    "255314c00ad74fec8ce8b7a95bf0891d",
    "5075a9d66e5f422b9b661aa91c44b04e",
    "338a4d6c6f744295a3fca9bdc712316c",
    "0be311068977476d8fc996993e8907e5",
    "81174900b32e445a914b9704b86e4b87",
    "e8dbbb7c620349169cda1cf297204dfd",
    "ced5ec564ce7464c860df78cfa963ccf",
    "698f99c6409b43a39694423cf70a1787",
    "053a48f1bd1944c6971981c2a2c291e3",
    "8b87c9e1907e4ce8a7b77886f597c88d",
    "f7a8398c50844b509502c35536be474a",
    "e1f5d9c5091c4b19b314b1b40717c5a5",
    "0ddd8d0fff294905a0b8694955aad966",
    "a75414ceeedc4fe08e74cf6695efa32c",
    "5e592e30130246eab8fc21b7acde075b",
    "7839fd6070934f33b25a1acb65dca342",
    "2d2ef2e83eba43d2aad1b8a1be127fda",
    "6a49e69d1d544b3f9f8f0f453492ac22",
    "b12fab2d5d9b4c0ebedf9d8b57e78d78",
    "ff63af0b671546cbbc85ba66d9718a0f",
    "4f2a82c61bf7480aae123e6988b3feb5",
    "3855b4b715504b0faf05f58abf742fd6",
    "75217d98c8044a4f802410f96097c717",
    "1cc4927f0a5244a4a3b211ceb7bf3d9c",
    "62a7171445ab44ad8443bf5baef3677f",
    "d3f7b7ccf79a4e548fed886a3530d44b",
    "6c4ad59f1fdb415890b403b95ec8db69",
    "8d7683b3c2f14a5ba9a1df56f42df976",
    "7e9d1863e985470d91516752b809ab5f",
    "1f62008c598244b5b675a6cb46c507b1",
    "4128060ae41c42bda4d617a83063bb5a",
    "15093541f6834fb0b8223d6a85508bd1",
    "5bbfe42eac934d3d8bc37f29c5cecedc",
    "a0671bb4b9ea4174ae3320ee5155dd84",
    "68f50c753e894ab293025ec5147dc579",
    "a0237f891568468e942eb5d149383a28",
    "dac5b38071324ec18a0492c1a7e9ff64",
    "a7c57fda5afc444fa3ae5afef44c6358",
    "be1cc6dfeb2346979d65e9a25d29b7f2",
    "ff62479b8f464895b4ef4e697da8b400",
    "ccba21e871f44ea896a9b7546339f56b",
    "e4cff78f330d44558fb4ddd15e89778b",
    "b6b1ab1065c54911978356fe88f45280",
    "84baf5cadee74a6fb0eeb7ae6145eea8",
    "b8ec9166b593473287197c199ed5fbfa",
    "46cb76981bb64fd4944e9cfcc0fb74f9",
    "6c6488b377e94041a75d472bd79ec5ec",
    "6d99b3aab67540f193164a0cb8d8041d",
    "02fccb2789714318924eb9e95c3307d3",
    "b9d78202f1024b73b439bd61db7e3cac",
    "8ded4c1f89fb4ba9ba971657ee645990",
    "4826b2eb2c384aa0a6c3de515c97e730",
    "e415efff408f4ebfb428b98d0c3a3540",
    "28f5a0ebef6a4ec6ba707f6e69e79dd4",
    "e5d0ae8cd1f349a8a931566d0d958a9c",
    "c589d3e8748d431c8ab38cf7a449386c",
    "c5d905b6bf204e96922e5f7b54aead61",
    "dd398f8f9cf44a3c98da3bde04eb0861",
    "1fe62296c53f41cd93db1d85b504bdf6",
    "1001390dfecf45e1a52ea159d22ed8db",
    "3c0393b08b9545559a7cb5d7a332d634",
    "7d3b02b984124ae99b7950f55b98eddf",
    "6acb0f53d2c9411a8142ec8d6196b1aa",
    "80e59d0c95ed49209d39b5940e8b951c",
    "8647be89d2814a7988e925c51a8abe7c",
    "26a58b8c605444c194c94c72fdf8dc7c",
    "c639ec5c760748c9aa21777a667ed000",
    "b9e272a7420244238fbb11ff464443bd",
    "3b6fd7ac88c94288affcf0c55f764dab",
    "fb2e35e4eea84ae4bd7298215a93d90b",
    "30821c5b2aad40e3872f6594ecbe8131",
    "a711ddba9c104229961dbb4268bbc70d",
    "6e3592173d3a4402b75f292cb663e049",
    "8f6d3877f563430e93d6e877c235dfff",
    "5d34d215d5934e7fbc7e20d584120c55",
    "5edccb384a084d6f938be6858d1055f7",
    "c2e3df18de0847e3b3ca1ae1dd35d265",
    "09829b09882f470bbf3d8cd1dd282f1e",
    "63776f600117410ca3e6fc5262602593",
    "3e78f6d91fbb4a83bb009c578b779d8f",
    "0c07d194aef040edb049451a871cfb45",
    "8dfca56927a64ab5840ed7bbb26c7765",
    "97023f5139e5446faccb205a8448f52f",
    "15ac3bcd9c3e4988a0e501af8f4df80b",
    "3375523711e249baa30e8e8ffa3f4de7",
    "e2bf59bc55a4497699031de248abc94b",
    "0b83448fad18471890fad8e2380663ba",
    "db10217513534a5cbde3b69c77fb79fa",
    "ddc04a90972e40e7add75eaa4a0f7ea8",
    "f693ca943bce4b53ac2ff1e0c82b6fdf",
    "76679dd63ba240dc859972ef743920ba",
    
    
]
let lz_cookie = {}

if (process.env.RUSH_LZCLIENT && process.env.RUSH_LZCLIENT != "") {
    activityIdList = process.env.RUSH_LZCLIENT.split(',');
}

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => !!item);
}
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    // activityIdList = await getActivityIdList('game.json')
    for(let a in activityIdList){
        activityId = activityIdList[a];
        console.log("开起第 "+ a +" 个活动，活动id："+activityId)
        for (let i = 0; i < cookiesArr.length; i++) {
            if (cookiesArr[i]) {
                cookie = cookiesArr[i]
                originCookie = cookiesArr[i]
                newCookie = ''
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                await checkCookie();
                console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
                if (!$.isLogin) {
                    $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                    if ($.isNode()) {
                        await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                    }
                    continue
                }
                $.bean = 0;
                $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
                $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                $.activityId = activityId
                $.activityUrl = `https://lzkj-isv.isvjcloud.com/lzclient/${$.activityId}/cjwx/common/entry.html?activityId=${$.activityId}&sid=&un_area=`
                await pandaDraw();
                await $.wait(2000)
                if ($.bean > 0) {
                    message += `\n【京东账号${$.index}】${$.nickName || $.UserName} \n       └ 获得 ${$.bean} 京豆。`
                }
            }
        }
    }
    if (message !== '') {
        if ($.isNode()) {
            await notify.sendNotify($.name, message, '', `\n`);
        } else {
            $.msg($.name, '有点儿收获', message);
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })


async function pandaDraw() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK()
    await getToken();
    await task('wxCommonInfo/token', `activityId=${$.activityId}`, 1)
    await $.wait(500)
    await task('wxCommonInfo/initActInfo', `activityId=${$.activityId}`, 1)
    await $.wait(500)
    await task('customer/getSimpleActInfoVo', `activityId=${$.activityId}`, 1)
    await $.wait(500)
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            await task('common/accessLogWithAD', `venderId=${$.venderId}&code=${$.activityType}&pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}&pageUrl=${$.activityUrl}&subType=app&adSource=`, 1);
            await $.wait(500)
            await task('wxDrawActivity/activityContent', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`, 1);
            await $.wait(500)
            await task('wxDrawActivity/getGiveContent', `pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}`, 1);
            await $.wait(500)
            await task('wxActionCommon/followShop',`userId=${$.venderId}&buyerNick=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}&activityType=${$.activityType}`,1);
            console.log(`抽奖`)
            await $.wait(500)
            await task('wxDrawActivity/start',`activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`,1);
            await $.wait(500)
        } else {
            $.log("没有成功获取到用户信息")
        }
    } else {
        $.log("没有成功获取到用户鉴权信息")
    }
}

function task(function_id, body, isCommon = 0) {
    return new Promise(resolve => {
        $.post(taskUrl(function_id, body, isCommon), async (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {

                    if (data) {
                        data = JSON.parse(data);
                        if (resp['headers']['set-cookie']) {
                            cookie = `${originCookie};`
                            for (let sk of resp['headers']['set-cookie']) {
                                lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                            }
                            for (const vo of Object.keys(lz_cookie)) {
                                cookie += vo + '=' + lz_cookie[vo] + ';'
                            }
                        }
                        if (data) {
                            switch (function_id) {
                                case 'customer/getSimpleActInfoVo':
                                    $.activityId = data.data.activityId;
                                    $.jdActivityId = data.data.jdActivityId;
                                    $.venderId = data.data.venderId;
                                    $.shopId = data.data.shopId;
                                    $.activityType = data.data.activityType;
                                    break;
                                case 'wxDrawActivity/activityContent':
                                    $.activityContent = data.data;
                                    // console.log($.activityContent)
                                    break;
                                case 'wxDrawActivity/getGiveContent':
                                    console.log("抽奖次数: "+data.data.day.giveTimes);
                                    break;
                                case 'wxActionCommon/followShop':
                                    console.log(data.data);
                                    break
                                case 'wxCommonInfo/token':
                                    // $.venderId = data.data.userId;
                                    // console.log(data);
                                    break
                                case 'wxCommonInfo/initActInfo':
                                    $.venderId = data.data.venderId;
                                    break
                                case 'wxDrawActivity/start':
                                    console.log(data.data);
                                    break
                                default:
                                    // $.log(JSON.stringify(data))
                                    break;
                            }
                        }
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function taskUrl(function_id, body, isCommon) {
    return {
        url: isCommon ? `https://lzkj-isv.isvjcloud.com/${function_id}` : `https://lzkj-isv.isvjcloud.com/wxDrawActivity/${function_id}`,
        headers: {
            Host: 'lzkj-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzkj-isv.isvjcloud.comm',
            'User-Agent': `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: 'keep-alive',
            Referer: $.activityUrl,
            Cookie: cookie
        },
        body: body

    }
}

function getMyPing() {
    let opt = {
        url: `https://lzkj-isv.isvjcloud.com/customer/getMyPing`,
        headers: {
            Host: 'lzkj-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzkj-isv.isvjcloud.com',
            'User-Agent': `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: 'keep-alive',
            Referer: $.activityUrl,
            Cookie: cookie,
        },
        body: `userId=${$.venderId}&token=${$.token}&fromType=APP`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    if (resp['headers']['set-cookie']) {
                        cookie = `${originCookie};`
                        for (let sk of resp['headers']['set-cookie']) {
                            lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                        }
                        for (const vo of Object.keys(lz_cookie)) {
                            cookie += vo + '=' + lz_cookie[vo] + ';'
                        }
                    }
                    if (data) {
                        data = JSON.parse(data)
                        if (data.result) {
                            $.log(`你好：${data.data.nickname}`)
                            $.pin = data.data.nickname;
                            $.secretPin = data.data.secretPin;
                        } else {
                            $.log(data.errorMessage)
                        }
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }

        })
    })
}
function getFirstLZCK() {
    return new Promise(resolve => {
        $.get({ url: $.activityUrl }, (err, resp, data) => {
            try {
                if (err) {
                    console.log(err)
                } else {
                    if (resp['headers']['set-cookie']) {
                        cookie = `${originCookie};`
                        for (let sk of resp['headers']['set-cookie']) {
                            lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                        }
                        for (const vo of Object.keys(lz_cookie)) {
                            cookie += vo + '=' + lz_cookie[vo] + ';'
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function getToken() {
    let opt = {
        url: `https://api.m.jd.com/client.action?functionId=isvObfuscator`,
        headers: {
            Host: 'api.m.jd.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: '*/*',
            Connection: 'keep-alive',
            Cookie: cookie,
            'User-Agent': 'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)',
            'Accept-Language': 'zh-Hans-CN;q=1',
            'Accept-Encoding': 'gzip, deflate, br',
        },
        body: `body=%7B%22url%22%3A%20%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=72124265217d48b7955781024d65bbc4&client=apple&clientVersion=9.4.0&st=1621796702000&sv=120&sign=14f7faa31356c74e9f4289972db4b988`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.code === "0") {
                            $.token = data.token
                        }
                    } else {
                        $.log("京东返回了空数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }
        })
    })
}

function getActivityIdList(url) {
    return new Promise(resolve => {
        const options = {
            url: `${url}?${new Date()}`, "timeout": 10000, headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                if (data) data = JSON.parse(data)
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function random(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}
function getUUID(format = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', UpperCase = 0) {
    return format.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        if (UpperCase) {
            uuid = v.toString(36).toUpperCase();
        } else {
            uuid = v.toString(36)
        }
        return uuid;
    });
}
function checkCookie() {
    const options = {
        url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
        headers: {
            "Host": "me-api.jd.com",
            "Accept": "*/*",
            "Connection": "keep-alive",
            "Cookie": cookie,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
            "Accept-Language": "zh-cn",
            "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
            "Accept-Encoding": "gzip, deflate, br",
        }
    };
    return new Promise(resolve => {
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.retcode === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data.retcode === "0" && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
