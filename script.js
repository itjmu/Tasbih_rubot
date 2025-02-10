const zikrList = [
    "Субханаллах", // 33 раза
    "Альхамдулиллях", // 33 раза
    "Аллаху Акбар", // 33 раза
    "Ля иляха илляллах" // 34 раза (в конце)
];

let currentZikrIndex = 0;
let count = 0;
let totalCount = 0;

const zikrTextElement = document.getElementById('zikr-text');
const countElement = document.getElementById('count');
const totalCountElement = document.getElementById('total-count');
const resetButton = document.getElementById('reset');

// Функция для обновления текста зикра
function updateZikr() {
    zikrTextElement.textContent = zikrList[currentZikrIndex];
}

// Функция для увеличения счётчика
function incrementCounter() {
    count++;
    totalCount++;
    countElement.textContent = count;
    totalCountElement.textContent = totalCount;

    // Если счётчик достиг 33, переключаем на следующий зикр
    if (count === 33) {
        currentZikrIndex++;
        if (currentZikrIndex >= zikrList.length) {
            currentZikrIndex = 0; // Возвращаемся к первому зикру
        }
        updateZikr();
        count = 0; // Сбрасываем счётчик для нового зикра
    }
}

// Функция для сброса основного счётчика
function resetCounter() {
    count = 0;
    countElement.textContent = count;
    updateZikr();
}

// Обработчик клика по кнопке зикра
zikrTextElement.addEventListener('click', incrementCounter);

// Обработчик клика по кнопке "Сбросить"
resetButton.addEventListener('click', resetCounter);

// Инициализация при загрузке страницы
updateZikr();