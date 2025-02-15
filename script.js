// ########## НАСТРОЙКИ ##########
const SETTINGS = {
    zikrList: [ // Список зикров
        "Субханаллах",
        "Альхамдулиллях",
        "Аллаху Акбар",
        "Ля иляха илляллах"
    ],
    levels: [ // Уровни
        {required: 500, level: 1},
        {required: 1500, level: 2},
        {required: 3500, level: 3},
        {required: 10000, level: 4},
        {required: 20000, level: 5}
    ],
    colors: { // Цветовая схема
        primary: '#4CAF50',    // Основной цвет
        secondary: '#ff9800',  // Вторичный цвет
        danger: '#dc3545'      // Цвет опасных элементов
    }
};

// ########## СОХРАНЕНИЕ ДАННЫХ ##########
let appData = JSON.parse(localStorage.getItem('tasbihData')) || {
    count: 0,
    totalCount: 0,
    currentZikrIndex: 0
};

// ########## ОСНОВНАЯ ЛОГИКА ##########
function saveData() {
    localStorage.setItem('tasbihData', JSON.stringify(appData));
}

function updateDisplays() {
    // Обновление всех элементов интерфейса
    document.getElementById('count').textContent = appData.count;
    document.getElementById('total-count').textContent = appData.totalCount;
    document.getElementById('zikr-text').textContent = SETTINGS.zikrList[appData.currentZikrIndex];
    
    // Обновление прогресс-баров
    document.querySelector('.main-progress').style.width = `${(appData.count/33)*100}%`;
    const levelProgress = calculateLevelProgress();
    document.querySelector('.level-progress').style.width = `${levelProgress}%`;
}

function calculateLevelProgress() {
    // Логика расчета уровня
    const currentLevel = SETTINGS.levels.find(l => appData.totalCount < l.required) || {level: 5};
    document.getElementById('level').textContent = currentLevel.level;
    const prevLevel = SETTINGS.levels[currentLevel.level-2] || {required: 0};
    return ((appData.totalCount - prevLevel.required)/(currentLevel.required - prevLevel.required))*100 || 100;
}

// ########## ОБРАБОТЧИКИ СОБЫТИЙ ##########
document.addEventListener('click', (e) => {
    if(!e.target.closest('#reset')) {
        appData.count++;
        appData.totalCount++;
        
        if(appData.count === 33) {
            appData.count = 0;
            appData.currentZikrIndex = (appData.currentZikrIndex + 1) % SETTINGS.zikrList.length;
        }
        
        updateDisplays();
        saveData();
    }
});

document.getElementById('reset').addEventListener('click', () => {
    appData.count = 0;
    appData.currentZikrIndex = 0;
    updateDisplays();
    saveData();
});

// ########## ИНИЦИАЛИЗАЦИЯ ##########
updateDisplays();
tg.ready();