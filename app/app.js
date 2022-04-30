const express = require('express');
const app = express();
const port = 3333;
const path = require('path');
const USERS = require('./usersData');
const dataStorage = require(`./${process.env.npm_lifecycle_event}`)

// const {Pool} = require('pg');

// const pool = new Pool({
//     user: 'admin',
//     host: '127.0.0.1',
//     database: 'postgres_db',
//     password: 'admin',
//     port: 5432
// })

// app.get('/api/v1/user', async(req, res) => {
//     const {rows} = await pool.query('select * from timestamp')
//     res.send(rows);
// })

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')))

app.listen(port, () => {
    console.log(`Application is listening on http://localhost:${port}`)
})

//usersパスへのハンドラー登録
app.get('/api/v1/user/timestamp',(req, res, next) => {
    // res.json(USERS)
    dataStorage.fetchAll().then(res => res.json(timestamp), next)
})
        
app.post('/api/v1/user/timestamp', (req, res, next) => {
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
        dataStorage.create(timeStamp).then(() => res.status(201).json(timeStamp), next)
        // res.json(timeStamp)
        // USERS.users[0].timeStamp.push(timeStamp)
        // next()
    })

//エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
    res.json({statusCode: err.statusCode, error: err.message})
})



