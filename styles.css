const zikrList = [
    "СубhаналЛоh",
    "Алhaмдулиллаh", 
    "АллОhу Акбар",
    "Ла илаha иллаллаh"
];

let currentZikrIndex = 0;
let count = 0;
let totalCount = 0;

// Элементы
const elements = {
    count: document.getElementById('count'),
    totalCount: document.getElementById('total-count'),
    zikrText: document.getElementById('zikr-text'),
    level: document.getElementById('level'),
    levelProgress: document.querySelector('.level-progress'),
    mainProgress: document.querySelector('.main-progress')
};

// Уровни
const levels = [
    {required: 500, level: 1},
    {required: 1500, level: 2},
    {required: 3500, level: 3},
    {required: 10000, level: 4},
    {required: 20000, level: 5}
];

function updateDisplays() {
    // Основной счётчик
    elements.count.textContent = count;
    elements.mainProgress.style.width = `${(count/33)*100}%`;
    
    // Общий счётчик
    elements.totalCount.textContent = totalCount;
    
    // Уровень
    const currentLevel = levels.find(l => totalCount < l.required) || {level: 5};
    elements.level.textContent = currentLevel.level;
    
    // Прогресс уровня
    const prevLevel = levels[currentLevel.level-2] || {required: 0};
    const levelProgress = ((totalCount - prevLevel.required)/(currentLevel.required - prevLevel.required))*100 || 100;
    elements.levelProgress.style.width = `${levelProgress}%`;
}

function incrementCounter() {
    count++;
    totalCount++;
    
    if(count === 33) {
        count = 0;
        currentZikrIndex = (currentZikrIndex + 1) % zikrList.length;
        elements.zikrText.textContent = zikrList[currentZikrIndex];
    }
    
    updateDisplays();
}

function resetCounter() {
    count = 0;
    currentZikrIndex = 0;
    elements.zikrText.textContent = zikrList[0];
    updateDisplays();
}

// Обработчики событий
document.addEventListener('click', (e) => {
    if(!e.target.closest('#reset')) {
        incrementCounter();
        // Анимация увеличения текста
        elements.zikrText.classList.add('active');
        setTimeout(() => elements.zikrText.classList.remove('active'), 200);
    }
});

document.getElementById('reset').addEventListener('click', resetCounter);

// Инициализация
updateDisplays();