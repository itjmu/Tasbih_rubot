body {
    font-family: 'Arial', sans-serif;
    background-image: url('background.jpg');
    background-size: cover;
    background-position: center;
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}

.telegram-link {
    position: fixed;
    top: 15%;
    right: 20px;
    color: #fff;
    text-decoration: none;
    background: rgba(0,0,0,0.5);
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 14px;
}

.click-area {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    width: 95%; /* Увеличена ширина до краёв */
    max-width: 700px; /* Увеличена длина на 30% */
    padding: 30px;
    background: rgba(0,0,0,0.56);
    border-radius: 25px;
    margin: 20px;
}

/* Индикатор уровня */
.level-container {
    width: 50%; /* Увеличена длина для полного текста */
    margin-bottom: 30px;
    
}

.level-bar {
    height: 40px;
    background: rgba(255,255,255,0.1);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
}

.level-progress {
    height: 100%;
    background: #66ffCC;
    width: 0%;
    transition: width 0.3s ease;
}

.level-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: #aaa;
    font-size: 13px;
    white-space: nowrap; /* Текст не переносится */
}

/* Основной индикатор */
.main-progress-container {
    margin-bottom: 130px;
}

.main-progress-bar {
    height: 50px;
    background: rgba(255,255,255,0.1);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
}

.main-progress {
    height: 100%;
    background: #4CAF50;
    width: 0%;
    transition: width 0.3s ease;
}

.main-counter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: bold;
    color: #fff;
}

/* Кнопка зикра */
.zikr-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.zikr-button {
    font-size: 250px;
    cursor: pointer;
    transition: transform 0.2s;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.zikr-text {
    position: absolute;
    font-size: 20px;
    color: #4CAF50;
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(76,175,80,0.5);
    transition: font-size 0.2s;
    bottom: 180px; /* Расположение текста */
}

.zikr-button:active {
    transform: scale(1.1);
}

.zikr-button:active .zikr-text {
    font-size: 25px; /* Увеличение текста при нажатие */
}

/* Кнопка сброса */
.reset-container {
    position: fixed;
    left: 20px;
    bottom: 5%;
}

#reset {
    background: #dc3545;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 24px;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
}

#reset:hover {
    background: #fff;
}

.total-counter {
    position: fixed;
    bottom: 6%;
    right: 20px;
    background: rgba(0,0,0,0.4);
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 10px;
}