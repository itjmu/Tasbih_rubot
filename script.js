const zikrList = [
    "Субханаллах",
    "Альхамдулиллях",
    "Аллаху Акбар",
    "Ля иляха илляллах"
];

// Загрузка данных из localStorage
let savedData = JSON.parse(localStorage.getItem('tasbihData')) || {
    currentZikrIndex: 0,
    count: 0,
    totalCount: 0
};

let currentZikrIndex = savedData.currentZikrIndex;
let count = savedData.count;
let totalCount = savedData.totalCount;

const zikrTextElement = document.getElementById('zikr-text');
const countElement = document.getElementById('count');
const totalCountElement = document.getElementById('total-count');
const resetButton = document.getElementById('reset');

// Функция для сохранения данных
function saveData() {
    localStorage.setItem('tasbihData', JSON.stringify({
        currentZikrIndex: currentZikrIndex,
        count: count,
        totalCount: totalCount
    }));
}

function updateZikr() {
    zikrTextElement.textContent = zikrList[currentZikrIndex];
}

function incrementCounter() {
    count++;
    totalCount++;
    
    countElement.textContent = count;
    totalCountElement.textContent = totalCount;
    saveData(); // Сохраняем после изменения

    if (count === 33) {
        currentZikrIndex = (currentZikrIndex + 1) % zikrList.length;
        count = 0;
        updateZikr();
        saveData(); // Дополнительное сохранение
    }
}

function resetCounter() {
    count = 0;
    currentZikrIndex = 0;
    countElement.textContent = count;
    updateZikr();
    saveData();
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    countElement.textContent = count;
    totalCountElement.textContent = totalCount;
    updateZikr();
});

zikrTextElement.addEventListener('click', incrementCounter);
resetButton.addEventListener('click', resetCounter);
