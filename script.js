// ########## НАСТРОЙКИ ##########
const SETTINGS = {
    zikrList: [ // Список зикров
        "СубhаналЛоh",
        "АлhамдулилЛah",
        "Аллоhу Акбар",
        "Ла илАhа иллалЛоh", 
        "АстагфирулЛoh", 
        "СубhаналЛоhи ва баhамдиhиhи", 
        "Ла илаha илла-лЛоhу ваhдаhу ла шарика лаh. Лаhул мулку ва лаhу-л haмда ва hува ъала кулли шайин Qадир" 

    ],
    levels: [ // Уровни
        {required: 3500, level: 1},
        {required: 7000, level: 2},
        {required: 14000, level: 3},
        {required: 30000, level: 4},
        {required: 50000, level: 5}
    ]
};

// ########## СОХРАНЕНИЕ ДАННЫХ ##########
let appData = JSON.parse(localStorage.getItem('tasbihData')) || {
    count: 0,
    totalCount: 0,
    currentZikrIndex: 0
};

// ########## ОСНОВНАЯ ЛОГИКА ##########
const tg = window.Telegram.WebApp;

function saveData() {
    localStorage.setItem('tasbihData', JSON.stringify(appData));
    if(tg?.sendData) {
        tg.sendData(JSON.stringify(appData));
    }
}

function updateDisplays() {
    // Обновление счетчиков
    document.getElementById('count').textContent = appData.count;
    document.getElementById('total-count').textContent = appData.totalCount;
    
    // Обновление зикра
    document.getElementById('zikr-text').textContent = 
        SETTINGS.zikrList[appData.currentZikrIndex];
    
    // Обновление прогресс-баров
    document.querySelector('.main-progress').style.width = 
        `${(appData.count/33)*100}%`;
    document.querySelector('.level-progress').style.width = 
        `${calculateLevelProgress()}%`;
}

function calculateLevelProgress() {
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
tg.ready();
tg.expand();
updateDisplays();