// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Список зикров (можно менять)
const zikrList = [
    "Субханаллах",      // 1
    "Альхамдулиллях",   // 2 
    "Аллаху Акбар",     // 3
    "Ля иляха илляллах" // 4
];

// Текущие значения
let currentZikrIndex = 0;  // Индекс текущего зикра
let count = 0;             // Текущий счетчик
let totalCount = 0;        // Общий счетчик

// Получение элементов
const elements = {
    count: document.getElementById('count'),          // Элемент счетчика
    totalCount: document.getElementById('total-count'), // Общий счет
    zikrText: document.getElementById('zikr-text'),   // Текст зикра
    level: document.getElementById('level'),          // Уровень
    levelProgress: document.querySelector('.level-progress'), // Прогресс уровня
    mainProgress: document.querySelector('.main-progress')    // Основной прогресс
};

// Настройки уровней (можно менять)
const levels = [
    {required: 500, level: 1},   // Уровень 1
    {required: 1500, level: 2},  // Уровень 2
    {required: 3500, level: 3},  // Уровень 3
    {required: 10000, level: 4}, // Уровень 4
    {required: 20000, level: 5}  // Уровень 5
];

// Обновление отображения
function updateDisplays() {
    // Основной счетчик
    elements.count.textContent = count;
    elements.mainProgress.style.width = `${(count/33)*100}%`;
    
    // Общий счет
    elements.totalCount.textContent = totalCount;
    
    // Расчет уровня
    const currentLevel = levels.find(l => totalCount < l.required) || {level: 5};
    elements.level.textContent = currentLevel.level;
    
    // Прогресс уровня
    const prevLevel = levels[currentLevel.level-2] || {required: 0};
    const levelProgress = ((totalCount - prevLevel.required)/(currentLevel.required - prevLevel.required))*100 || 100;
    elements.levelProgress.style.width = `${levelProgress}%`;
}

// Увеличение счетчика
function incrementCounter() {
    count++;
    totalCount++;
    
    // Сброс при достижении 33
    if(count === 33) {
        count = 0;
        currentZikrIndex = (currentZikrIndex + 1) % zikrList.length;
        elements.zikrText.textContent = zikrList[currentZikrIndex];
    }
    
    updateDisplays();
}

// Сброс счетчиков
function resetCounter() {
    count = 0;
    curre