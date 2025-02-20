// Настройки
const SETTINGS = {
    zikrList: [
        "СубhаналЛоh",
        "АлhамдулилЛah",
        "Аллоhу Акбар",
        "Ла илАhа иллалЛоh", 
        "АстагфирулЛoh", 
        "СубhаналЛоhи ва баhамдиhиhи", 
        "Ла илаha илла-лЛоhу ваhдаhу ла шарика лаh. Лаhул мулку ва лаhу-л haмда ва hува ъала кулли шайин Qадир" 
    ],
    levels: [
        {required: 3500, level: 1},
        {required: 7000, level: 2},
        {required: 14000, level: 3},
        {required: 30000, level: 4},
        {required: 50000, level: 5}
    ]
};

// Данные приложения
let appData = JSON.parse(localStorage.getItem('tasbihData')) || {
    count: 0,
    totalCount: 0,
    currentZikrIndex: 0,
    firstVisitDate: new Date().toISOString(),
    dailyCount: 0,
    yesterdayCount: 0,
    lastVisitDate: new Date().toLocaleDateString(),
    lastActive: null,
    isZikrTextVisible: true
};

const tg = window.Telegram.WebApp;

// Переменные для обработки свайпов
let touchStartX = 0;
let touchStartY = 0;
const SWIPE_THRESHOLD = 10; // Минимальное расстояние для свайпа

// Добавлено: Интервал между действиями (в миллисекундах)
const ACTION_INTERVAL = 300;
let lastActionTime = 0; // Время последнего действия

// Инициализация
tg.ready();
tg.expand();
updateStats();
updateDisplays();

// Функции меню
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
    if(sidebar.classList.contains('active')) updateStats();
}

// Функция переключения текста
function toggleZikrText() {
    appData.isZikrTextVisible = !appData.isZikrTextVisible;
    document.getElementById('zikr-text').classList.toggle('hidden', !appData.isZikrTextVisible);
    toggleMenu();
    saveData();
}

// Сброс общего счета
function resetTotalCount() {
    if (appData.totalCount > 100000) {
        appData.totalCount = 0;
        updateDisplays();
        saveData();
        alert('Общий счет сброшен!');
    } else {
        alert('Для сброса нужно более 100000 зикров!');
    }
    toggleMenu();
}

// Обновление статистики
function updateStats() {
    // Ежедневный прогресс (макс 900)
    const dailyProgress = (appData.dailyCount / 900) * 100;
    document.getElementById('daily-progress').style.width = `${Math.min(dailyProgress, 100)}%`;
    document.getElementById('stat-daily').textContent = appData.dailyCount;

    // Вчерашний счет
    document.getElementById('stat-yesterday').textContent = appData.yesterdayCount;
    document.getElementById('yesterday-progress').style.width = `${Math.min((appData.yesterdayCount / 900) * 100, 100)}%`;

    // Общий счет
    document.getElementById('stat-total').textContent = appData.totalCount;
    document.getElementById('total-progress').style.width = `${Math.min((appData.totalCount / 50000) * 100, 100)}%`;

    // Даты
    document.getElementById('stat-first-date').textContent = 
        new Date(appData.firstVisitDate).toLocaleDateString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

    document.getElementById('stat-last-active').textContent = 
        new Date().toLocaleDateString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
}

// Сохранение данных
function saveData() {
    appData.lastActive = new Date().toISOString();
    localStorage.setItem('tasbihData', JSON.stringify(appData));
    updateStats();
    
    if(tg?.sendData) {
        tg.sendData(JSON.stringify(appData));
    }
}

// Обновление интерфейса
function updateDisplays() {
    // Проверка сброса ежедневного счетчика
    const today = new Date().toLocaleDateString();
    if(appData.lastVisitDate !== today) {
        appData.yesterdayCount = appData.dailyCount;
        appData.dailyCount = 0;
        appData.lastVisitDate = today;
    }

    // Обновление значений
    document.getElementById('count').textContent = appData.count;
    document.getElementById('today-count').textContent = appData.dailyCount;
    document.getElementById('zikr-text').textContent = 
        SETTINGS.zikrList[appData.currentZikrIndex];
    document.getElementById('zikr-text').classList.toggle('hidden', !appData.isZikrTextVisible);
    
    document.querySelector('.main-progress').style.width = 
        `${(appData.count/33)*100}%`;
    
    const levelProgress = calculateLevelProgress();
    document.querySelector('.level-progress').style.width = `${levelProgress}%`;
}

// Расчет прогресса уровня
function calculateLevelProgress() {
    const currentLevel = SETTINGS.levels.find(l => appData.totalCount < l.required) || {level: 5};
    document.getElementById('level').textContent = currentLevel.level;
    const prevLevel = SETTINGS.levels[currentLevel.level-2] || {required: 0};
    return ((appData.totalCount - prevLevel.required)/(currentLevel.required - prevLevel.required))*100 || 100;
}

// Обработчик кликов
function handleClick() {
    const now = Date.now();
    
    // Добавлено: Проверка интервала между действиями
    if (now - lastActionTime < ACTION_INTERVAL) {
        return;
    }
    lastActionTime = now;

    if(document.getElementById('sidebar').classList.contains('active')) {
        toggleMenu();
    }
    
    appData.count++;
    appData.totalCount++;
    appData.dailyCount++;
    
    if(appData.count === 33) {
        appData.count = 0;
        appData.currentZikrIndex = (appData.currentZikrIndex + 1) % SETTINGS.zikrList.length;
    }
    
    updateDisplays();
    updateStats();
    saveData();
}

// Обработчик свайпов
function handleSwipe(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Проверка на минимальное расстояние свайпа
    if (Math.abs(deltaX) > SWIPE_THRESHOLD || Math.abs(deltaY) > SWIPE_THRESHOLD) {
        handleClick();
    }
}

// Обработчик начала касания
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

// Обработчик кнопки сброса
document.getElementById('reset').addEventListener('click', () => {
    if (appData.totalCount > 100) {
        appData.totalCount--;
    }
    appData.count = 0;
    appData.currentZikrIndex = 0;
    updateDisplays();
    saveData();
});

// Добавляем обработчики событий
document.addEventListener('click', (e) => {
    if(!e.target.closest('#reset') && !e.target.closest('.menu-btn')) {
        handleClick();
    }
});

document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleSwipe);

// Инициализация при первом запуске
function init() {
    const today = new Date().toLocaleDateString();
    if(appData.lastVisitDate !== today) {
        appData.yesterdayCount = appData.dailyCount;
        appData.dailyCount = 0;
        appData.lastVisitDate = today;
        saveData();
    }
}

init();