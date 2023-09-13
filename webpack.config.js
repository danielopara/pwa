const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        sellerGenerate : './src/sellerGenerate.js',
        receiverInfo : './src/receiverInfo.js',
        senderQRcode : './src/senderQRcode.js',
        receiverCamera : './src/receiverCamera.js',
        senderCamera : "./src/senderCamera.js",
        successPage : './src/successPage.js',
        senderConfirmation : './src/senderConfirmation.js',
        homePage : './src/homePage.js'
    },
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : '[name].bundle.js'
    },
    watch : true
}