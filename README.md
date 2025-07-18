<!DOCTYPE html>
<html>
<head>
    <title>Дайтона - Complete Freedom</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="css/pageCss.css">
    <link rel="icon" type="image" href="pictures/3.png">
    <meta charset="utf-8">
</head>
<body>
    <div class="content-wrapper">
        <div class="game-container">
            <div class="game">
                <div id="mainChar"></div>
                <div id="block"></div>
            </div>
            
            <p class="score">Score: <span id="scoreSpan">0</span></p>
        </div>

        <audio id="player">
            <source src="music/Start Menu Dreams.wav" type="audio/wav">
        </audio>

        <div id="tutorial-container">
            <div id="tutorial-box">
                <p>Нажимайте на экран, чтоб увернуться!<br> 
                <a href="https://band.link/completefreedom" target="_blank">
                    Кликай сюда, чтобы прослушать альбом!<br>
                    Frutiger Aero & Webcore
                </a></p>
            </div>
        </div>
    </div>
    
    <div id="gameOverModal" class="modal">
        <div class="modal-content">
            <h2>Game Over</h2>
            <p>Your score: <span id="finalScore">0</span></p>
            <p>
                <a href="https://band.link/completefreedom" target="_blank">
                    Кликай сюда, чтобы прослушать альбом!<br>
                    Frutiger Aero & Webcore
                </a>
            </p>
            <button id="restartButton">Restart</button>
        </div>
    </div>
    
    <script type="text/javascript" src="JS/myJs.js"></script>
</body>
</html>
