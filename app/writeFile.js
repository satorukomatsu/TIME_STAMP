const fs = require('fs');

const obj = fs.readFileSync('usersData.json', 'utf-8')

// fs.writeFileSync('user.json', obj)
console.log(obj)