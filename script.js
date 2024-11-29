// 엔터 누르면 다른 파일로 이동
document.getElementById('inputField').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const inputValue = document.getElementById('inputField').value;
        if (inputValue.trim() !== '') {
            window.location.href = 'popup.html';
        }
    }
});

inputField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const inputValue = inputField.value;
        localStorage.setItem('savedData', inputValue);
        window.location.href = 'popup.html';
    }
});

const canvas = document.getElementById('moldCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const moldSpots = [];
const maxSpots = 65000; // 최대 곰팡이 점 수

class Mold {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1+ 1; // 초기 크기
        this.growthRate = Math.random() * 0.3 + 0.01; // 성장 속도
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
        gradient.addColorStop(0, `rgba(225, 230, 234, ${this.opacity})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();

        // 외곽선 그리기
        ctx.lineWidth = 1; // 외곽선 두께
        ctx.strokeStyle = `rgba(225, 230, 234, ${this.opacity * 0.8})`; // 외곽선 색상
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
for (let i = 0; i < 1; i++) { // 초기 곰팡이 점 5개 생성
    spawnMold();
}

animateMold();

// 일정 시간이 지나면 페이지 새로고침 (예: 5분 = 300000ms)
setTimeout(function() {
    location.reload(); // 페이지 새로고침
}, 400000); // 5분 후 새로고침

document.addEventListener('DOMContentLoaded', function() {
    function getDayKor(dayIndex) {
        const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        return days[dayIndex];
    }

    function updateTime() {
        const now = new Date();
        const month = now.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
        const date = now.getDate();
        const day = getDayKor(now.getDay());
        const hours = now.getHours(); // 1자리 시간
        const minutes = String(now.getMinutes()).padStart(2, '0'); // 분은 2자리로 유지

        const timeString = `<span class="date">${month}월 ${date}일 ${day}</span><br><span class="time"> ${hours}:${minutes}</span>`;
        document.getElementById('time-display').innerHTML = timeString; // innerHTML로 변경
    }

    // 페이지 로드 후 즉시 시간 업데이트
    updateTime();

    // 1분마다 시간 업데이트
    setInterval(updateTime, 60000);

    // CAPTCHA 입력 이벤트 처리
    const answerInput = document.getElementById('answer');
    if (answerInput) {
        answerInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                const inputValue = event.target.value.trim();
                if (inputValue === '마이코시스에 가입합니다.') {
                    changeCaptcha();
                } else {
                    alert("잘못된 입력입니다.");
                }
            }
        });
    }

    function changeCaptcha() {
        const captchaTextElement = document.querySelector('.captcha-text');
        const captchaImageElement = document.querySelector('.captcha-image');

        // 요소 선택 확인
        console.log(captchaTextElement); // 확인
        console.log(captchaImageElement); // 확인

        if (captchaTextElement && captchaImageElement) {
            // CAPTCHA 텍스트 변경
            captchaTextElement.innerHTML = '<span class="rotate" style="font-weight: 500";>welcome.。</span> <br><br><span class="captcha-text">환영°합<span class="rotate">니¸다.</span>°̥이름˛을<span class="rotate">입。력하고</span>입<span class="skew">장해·주</span>세요.。</span><br><br><span class="skew eng" style="-webkit-text-stroke: 3px black;">Mycosis.。</span>'; // 원하는 텍스트로 변경
            
            // CAPTCHA 이미지 크기 변경
            captchaImageElement.style.height = '300px'; // 새로운 높이 설정
        } else {
            console.log("CAPTCHA 요소를 찾을 수 없습니다.");
        }

                // 이미지 추가
const existingImage = document.querySelector('.captcha-added-image');
if (!existingImage) { // 이미지가 이미 추가되지 않은 경우에만 추가
    const newImage = document.createElement('img');
    newImage.src = 'mycosis_symbol_1.svg'; // 추가한 이미지 경로로 수정
    newImage.alt = 'mycosis_symbol_1';
    newImage.className = 'captcha-added-image mycosis_symbol_1'; // 클래스 추가로 스타일 적용 가능
    newImage.style.width = '100px'; // 이미지 크기 설정
    newImage.style.marginLeft = '10px'; // 텍스트와 이미지 간격 조정

    // `captcha-image` 요소 뒤에 이미지 추가
    captchaImageElement.appendChild(newImage);
}}

});