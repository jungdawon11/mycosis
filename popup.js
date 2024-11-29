// 인풋 내용 불러오기
   const showDataElements = document.getElementsByClassName('showData');
   for (let i = 0; i < showDataElements.length; i++) {
       const savedData = localStorage.getItem('savedData');
       if (savedData) {
           showDataElements[i].textContent = savedData;
       }
   }

// 크롬 알림창
function hideBackground() {
  const fullscreenBg = document.querySelector('.fullscreen-bg');
  const notification = document.getElementById('chromeNotification');
  fullscreenBg.style.display = 'none';
  notification.style.display = 'none';
}


// 클릭이벤트
const siriElement = document.querySelector('.siri');

siriElement.addEventListener('click', () => {
  siriElement.classList.add('clicked');

  setTimeout(() => {
    siriElement.classList.remove('clicked');
  }, 1000); //

});

const alamElements = document.querySelectorAll('.alam');
alamElements.forEach((alamElement) => {
  alamElement.addEventListener('click', () => {
    alamElement.classList.add('clicked');

    setTimeout(() => {
      alamElement.classList.remove('clicked');
    }, 1000); //

  });
});

const alambottomElements = document.querySelectorAll('.alambottom');
alambottomElements.forEach((alambottomElement) => {
  alambottomElement.addEventListener('click', () => {
    alambottomElement.classList.add('clicked');

    setTimeout(() => {
      alambottomElement.classList.remove('clicked');
    }, 1000); //

  });
});


const closeButtons = document.querySelectorAll('.close-button');
const empty = document.getElementById('empty');
let clickCount = 0;

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const parentButtons = button.closest('.buttons');
    const grandParent = parentButtons.parentElement.parentElement.parentElement;

    if (grandParent) {
      grandParent.classList.add('hidden');
      clickCount = 0;
    }
  });
});

// pointer 더블클릭 이벤트
$(document).ready(function(){
  $("#pointer").on('dblclick', function(){
    if (clickCount === 0) {
      $("#empty").removeClass("hidden");
    }
    clickCount++;
  });
});


window.onload = function () {
  function formatDate() {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

    const now = new Date();
    const year = now.getFullYear();
    const month = months[now.getMonth()];
    const day = now.getDate();
    const dayOfWeek = daysOfWeek[now.getDay()];

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const isPM = hours >= 12;
    hours = hours % 12 || 12; // 12시간제
    const ampm = isPM ? "오후" : "오전";

    // 날짜 및 시간 형식: 8월 19일 (월) 오후 1:17
    const formattedDate = `${month} ${day}일 (${dayOfWeek}) ${ampm} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return formattedDate;
  }

  function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    dateTimeElement.innerHTML = formatDate();
  }

  // 최초 시간 표시
  updateDateTime();
};

let timeout;

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        window.history.back(); // 이전 페이지로 이동
    }, 500000); //
}

// 클릭 이벤트를 문서에 추가
document.addEventListener('click', resetTimer);
document.addEventListener('mousemove', resetTimer); // 마우스 이동 시에도 타이머 초기화
document.addEventListener('keypress', resetTimer); // 키보드 입력 시에도 타이머 초기화

// 페이지 로드 시 타이머 시작
window.onload = resetTimer;


const canvas = document.getElementById('moldCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const moldSpots = [];
const maxSpots = 6500; // 최대 곰팡이 점 수

class Mold {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1+ 1; // 초기 크기
        this.growthRate = Math.random() * 0.3 + 0.05; // 성장 속도
        this.maxSize = Math.random() * 30 + 10; // 무작위로 최대 크기 설정
        this.opacity = 0.1; // 초기 투명도
    }

    grow() {
        if (this.size < this.maxSize) {
            this.size += this.growthRate; // 크기 증가
        }
        this.opacity += 0.0002; // 투명도 증가
        if (this.opacity > 1) this.opacity = 1; // 최대 투명도 제한
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, this.size * 0.3, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(0, 0, 0, ${this.opacity})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();

        // 외곽선 그리기
        ctx.lineWidth = 1; // 외곽선 두께
        ctx.strokeStyle = `rgba(0, 0, 0, ${this.opacity * 0.8})`; // 외곽선 색상
        ctx.stroke(); // 외곽선 그리기
    }
}

function spawnMold() {
    if (moldSpots.length < maxSpots) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        moldSpots.push(new Mold(x, y)); // 새로운 곰팡이 점 생성
    }
}

function animateMold() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전 프레임 지우기

    moldSpots.forEach(spot => {
        spot.grow(); // 성장
        spot.draw(); // 그리기
    });

    spawnMold(); // 매 프레임마다 곰팡이 점 하나씩 생성

    requestAnimationFrame(animateMold); // 애니메이션 프레임 요청
}

// 초기 곰팡이 점 몇 개 생성
for (let i = 0; i < 2; i++) { // 초기 곰팡이 점 5개 생성
    spawnMold();
}

animateMold();  

function calculateDday(finalDate) {
  const today = new Date();
  const final = new Date(finalDate);
  const diffInTime = final - today;
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
  return diffInDays;
}

function updateDday() {
  const finalDate = '2024-11-18';  // 목표 날짜를 YYYY-MM-DD 형식으로 지정
  const daysLeft = calculateDday(finalDate);

  const counter = document.getElementById('counter');
  if (daysLeft > 0) {
      counter.textContent = `D-${daysLeft}`;
  } else if (daysLeft === 0) {
      counter.textContent = "Final Day";
  } else {
      counter.textContent = `D+${Math.abs(daysLeft)}`;
  }
}

showCurrentDate();
updateDday();

function showCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');  // 월은 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}년 ${month}월 ${day}일`;
  document.getElementById('current-date').textContent = formattedDate;
}
