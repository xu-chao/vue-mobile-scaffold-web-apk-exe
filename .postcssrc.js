module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-pxtorem': {
      'rootValue': 100,
      // 'propWhiteList': [],
      'propList': ["*"],
      "selectorBlackList": [
        "van-"
      ]
    }
  }
}
// module.exports = ({ file }) => {
//   // let isVant = file && file.dirname && file.dirname.indexOf("vant") > -1;
//   let isVant = false
//   let rootValue = isVant ? 37.5 : 100; // 判断条件 请自行调整
//   return {
//       plugins: {
//           autoprefixer: {},
//           "postcss-pxtorem": {
//               rootValue: rootValue,
//               propList: ["*"],
//               "selectorBlackList": [
//                 "van-"
//               ] 
//           }
//       }
//   }
// }