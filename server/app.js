const express = require('express');
const app = express();
const port = 3333;
const path = require('path');
const USERS = require('./usersData');
const fs = require('fs');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../')))

//静的ファイル表示
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.listen(port, () => {
    console.log(`Application is listening on http://localhost:${port}`)
})

//usersパスへのハンドラー登録
app.route('/users')
    .get((req, res) => {
        res.json(USERS)
    })
    
    .post((req, res, next) => {
        const {date, timeBegin, timeEnd, restTime, workTime} = req.body;
        const timeStamp = {
                date,
                timeBegin,
                timeEnd,
                restTime,
                workTime
        }
    
        if (!date || !timeBegin || !timeEnd) {
            const err = new Error('Bad request')
            err.statusCode = 400;
            return next(err)
        }
    
        res.json(timeStamp)
        USERS.users[0].timeStamp.push(timeStamp)
        next()
    },(req, res) => {
        
    })

//エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
    res.json({statusCode: err.statusCode, error: err.message})
})



