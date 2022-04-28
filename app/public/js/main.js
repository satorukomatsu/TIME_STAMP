//実労働時間計算用の変数
let beginHour;
let beginMinute;
let endHour;
let endMinute;
//日付と時間の監視、POSTメソッドで使う
let today;
let beginTm;
let endTm;
let workTm;

//日付と現在時刻表示
const currentTimeStamp = () => {
  const currentDate = document.getElementById('current_date');
  const currentTime = document.getElementById('current_time');
  const date = new Date();

  today = date.toLocaleDateString()
  currentDate.innerHTML = today;
  currentTime.innerHTML = date.toLocaleTimeString();
}

setInterval(currentTimeStamp, 1000)

//出勤時の日付の記録
const date = () => {
  const date = new Date();
  const dt = document.getElementById('date');
  const el = document.createElement('p');
  el.id = 'today';

  const dtChild = dt.appendChild(el);
  dtChild.innerHTML = `${date.getDate()}日`;
}

//出勤時の時間の記録
const beginTime = () => {
  const date = new Date();
  const begin = document.getElementById('begin');
  const el = document.createElement('p');
  el.id = 'time_begin';

  const beginChild = begin.appendChild(el);

  beginTm = date.toLocaleTimeString();
  beginChild.innerHTML = beginTm
  beginHour = date.getHours();
  beginMinute = date.getMinutes();
  alert('出勤報告完了！')
}

//退勤時の時間の記録
const endTime = () => {
  const date = new Date();
  const end = document.getElementById('end');
  const el = document.createElement('p');
  el.id = 'time_end';
  const timeBegin = document.getElementById('time_begin');

  if (timeBegin) {
    endTm = date.toLocaleTimeString();
    const endChild = end.appendChild(el);
    endChild.innerText = endTm
    endHour = date.getHours();
    endMinute = date.getMinutes();
    alert('退勤報告完了！お疲れ様でした！')
  } else {
    alert('出勤報告がありません。')
  }
}

//実労働時間の計算と登録
const workTime = () => {
  const totalMinutes = endHour * 60 + endMinute - beginHour * 60 - beginMinute
  const minutes = (totalMinutes % 60).toString().padStart(2, '0')
  const hours = Math.floor(totalMinutes / 60)
  const work = document.getElementById('work')
  const el = document.createElement('p');
  el.id = 'time_work'
  const timeEnd = document.getElementById('time_end')
  if(timeEnd) {
    const workChild = work.appendChild(el)
    workTm = `${hours}:${minutes}`
    workChild.innerText = workTm
  }
}

//サーバーへのPOSTメソッド
const fetchTime = async (date, begin, end, work) => {
  const path = '/users'
  const data = {
    date: date,
    timeBegin: begin,
    timeEnd: end,
    workTime: work
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }
  try {await fetch(path, options)} catch (err) {
    throw (err);
  }
} 


const beginBt = document.getElementById('beginBt')
const endBt   = document.getElementById('endBt')

beginBt.addEventListener('click', e => {
  date();
  beginTime();
})

endBt.addEventListener('click', e => {
  endTime();
  workTime();
  fetchTime(today, beginTm, endTm, workTm)
})