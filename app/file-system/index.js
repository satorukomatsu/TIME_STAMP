const path = require('path')
const fs = require('fs').promises

//全てのタイムスタンプの情報の取得
exports.fetchAll = async() => {
    const files = (await fs.readdir(__dirname))
        .filter(file => path.extname(file) === '.json')
    return Promise.all(
        files.map(file => fs.readFile(`${__dirname}/${file}`, 'utf8').then(JSON.parse))
    )
}

//タイムスタンプの登録
exports.create = timeStamp => 
    fs.writeFile(`${__dirname}/${timeStamp.date}.json`, JSON.stringify(timeStamp))
