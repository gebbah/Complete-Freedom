// ======== Аудио-логика ========
const audio = document.getElementById('player');
audio.volume = 0.7;

// Элемент для сообщения
const audioMessage = document.createElement('div');
audioMessage.id = 'audioMessage';
audioMessage.textContent = "Коснитесь экрана, чтобы запустить музыку";
document.body.appendChild(audioMessage);

// Флаг для отслеживания первого запуска аудио
let audioStarted = false;

// Функция запуска аудио
function tryStartAudio() {
    if (audioStarted) return;
    
    audio.play().then(() => {
        audioStarted = true;
        audioMessage.style.display = 'none';
    }).catch(e => {
        audioMessage.style.display = 'block';
    });
}

// Запускаем после полной загрузки страницы
window.addEventListener('load', () => {
    audio.volume = 0.6;
    setTimeout(tryStartAudio, 500);
});

// Запуск при любом взаимодействии
document.addEventListener('click', tryStartAudio);
document.addEventListener('touchstart', tryStartAudio);
document.addEventListener('keydown', tryStartAudio);

// Повтор музыки
audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play();
});

// ======== Игровая логика ========
var mainChar = document.getElementById("mainChar");
var block = document.getElementById("block");
var counter = 0;

// Элементы модального окна
const gameOverModal = document.getElementById("gameOverModal");
const finalScoreElement = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

// Конфигурация управления прыжком
const jumpControls = {
    keys: ['Space', ' ', 'ArrowUp', 'KeyW'],
    keyCodes: [32, 38, 87],
    mouse: true
};

// Состояние прыжка
let canJump = true;
const JUMP_COOLDOWN = 400;

// ======== СЛУЧАЙНЫЕ ИЗОБРАЖЕНИЯ ДЛЯ БЛОКОВ ========
const blockImages = [
    'pictures/1.png',
    'pictures/2.png',
    'pictures/3.png',
    'pictures/4.png',
    'pictures/5.png',
    'pictures/6.png',
    'pictures/7.png',
    'pictures/8.png'
];

// Функция для получения случайного изображения
function getRandomBlockImage() {
    const randomIndex = Math.floor(Math.random() * blockImages.length);
    return blockImages[randomIndex];
}

// Установка случайного изображения для блока
function setRandomBlockImage() {
    const randomImage = getRandomBlockImage();
    block.style.backgroundImage = `url('${randomImage}')`;
}

// Функция прыжка
function jump() {
    if (!canJump || mainChar.classList.contains("animate")) return;
    
    canJump = false;
    mainChar.classList.add("animate");
    
    setTimeout(() => {
        mainChar.classList.remove("animate");
        canJump = true;
    }, JUMP_COOLDOWN);
}

// Обработчики управления
function setupControls() {
    // Клик/касание по игровой области
    document.querySelector('.game').addEventListener('click', jump);
    document.querySelector('.game').addEventListener('touchstart', jump);
    
    // Обработка клавиатуры
    document.addEventListener('keydown', (e) => {
        const isJumpKey = 
            jumpControls.keys.includes(e.code) || 
            jumpControls.keys.includes(e.key) ||
            jumpControls.keyCodes.includes(e.keyCode);
        
        if (isJumpKey) {
            e.preventDefault();
            jump();
        }
    });
}

// Инициализация управления
setupControls();

// Функция перезапуска игры
function restartGame() {
    // Сбрасываем положение блока
    block.style.animation = "none";
    block.style.right = "-15%";
    
    // Сбрасываем счёт
    counter = 0;
    document.getElementById("scoreSpan").innerHTML = "0";
    
    // Устанавливаем новое случайное изображение
    setRandomBlockImage();
    
    // Перезапускаем анимацию
    setTimeout(() => {
        block.style.animation = "block 2s infinite linear";
    }, 10);
    
    // Скрываем модальное окно
    gameOverModal.style.display = "none";
}

// Обработчик кнопки рестарта
restartButton.addEventListener('click', restartGame);

// Проверка столкновений
var checkDead = setInterval(function() {
    const charRect = mainChar.getBoundingClientRect();
    const blockRect = block.getBoundingClientRect();
    
    // Проверка пересечения
    const collision = !(
        charRect.right < blockRect.left || 
        charRect.left > blockRect.right || 
        charRect.bottom < blockRect.top || 
        charRect.top > blockRect.bottom
    );
    
    if(collision) {
        // Сохраняем текущий счёт
        const finalScore = Math.floor(counter/100);
        
        // Сбрасываем анимацию
        block.style.animation = "none";
        
        // Устанавливаем новое случайное изображение
        setRandomBlockImage();
        
        // Показываем модальное окно
        finalScoreElement.textContent = finalScore;
        gameOverModal.style.display = "block";
        
        // Сбрасываем счётчик
        counter = 0;
    } else {
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);

// Устанавливаем первое случайное изображение при загрузке
setRandomBlockImage();

// Адаптация скорости для мобильных
if (window.innerWidth <= 768) {
    block.style.animation = "block 3s infinite linear";
}
