// Staðsetningar
const locations = [
    { name: "Reykjavík", x: 0.2794, y: 0.6824 },
    { name: "Borgarnes", x: 0.2631, y: 0.5916 },
    { name: "Snæfellsjökull", x: 0.1444, y: 0.5096 },
    { name: "Stykkishólmur", x: 0.2224, y: 0.4590 },
    { name: "Rauðisandur", x: 0.1362, y: 0.3647 },
    { name: "Látrabjarg", x: 0.1013, y: 0.3403 },
    { name: "Dynjandi", x: 0.1886, y: 0.2845 },
    { name: "Ísafjörður", x: 0.1898, y: 0.1972 },
    { name: "Hólmavík", x: 0.2969, y: 0.2862 },
    { name: "Hvammstangi", x: 0.3481, y: 0.3752 },
    { name: "Blönduós", x: 0.4005, y: 0.3089 },
    { name: "Siglufjörður", x: 0.4831, y: 0.1850 },
    { name: "Akureyri", x: 0.5437, y: 0.2723 },
    { name: "Goðafoss", x: 0.5925, y: 0.2583 },
    { name: "Mývatn", x: 0.6193, y: 0.2757 },
    { name: "Húsavík", x: 0.6112, y: 0.2077 },
    { name: "Ásbyrgi", x: 0.6612, y: 0.2007 },
    { name: "Dettifoss", x: 0.6705, y: 0.2443 },
    { name: "Vopnafjörður", x: 0.7753, y: 0.2757 },
    { name: "Egilsstaðir", x: 0.8102, y: 0.3892 },
    { name: "Seyðisfjörður", x: 0.8452, y: 0.3874 },
    { name: "Djúpivogur", x: 0.8114, y: 0.4991 },
    { name: "Höfn", x: 0.7695, y: 0.6300 },
    { name: "Jökulsárlón", x: 0.7090, y: 0.6545 },
    { name: "Skaftafell", x: 0.6286, y: 0.7103 },
    { name: "Vík í Mýrdal", x: 0.5041, y: 0.8360 },
    { name: "Skógafoss", x: 0.4668, y: 0.8010 },
    { name: "Seljalandsfoss", x: 0.4307, y: 0.7836 },
    { name: "Vestmannaeyjar", x: 0.3993, y: 0.8517 },
    { name: "Bláa lónið", x: 0.2549, y: 0.7330 }
];

// Prófunargögn - sama spurning alls staðar
const questionData = {
    story: "Jökulsárlón er stærsta jökullón Íslands. Það myndaðist þegar Breiðamerkurjökull fór að hopa. Í lóninu sjást margir jökulsárar og selir synda oft í vatninu.",
    question: "Hvað heitir jökullinn sem myndaði Jökulsárlón?",
    answers: ["Vatnajökull", "Breiðamerkurjökull", "Langjökull", "Hofsjökull"],
    correctAnswer: 1,
    icon: "🏔️"
};

const landvaettir = ["🐉", "🦅", "🐂", "🗿"];

let gameState = {
    players: [],
    currentPlayerIndex: 0,
    playerCount: 3,
    consecutiveRolls: 0,
    waitingForAnswer: false,
    currentAudio: null
};

// Setja fjölda leikmanna
function setPlayerCount(count) {
    gameState.playerCount = count;
    document.querySelectorAll('.player-count button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const inputs = document.querySelectorAll('.player-input');
    inputs.forEach((input, i) => {
        input.style.display = i < count ? 'flex' : 'none';
    });
}

// Byrja leik
function startGame() {
    const playerInputs = document.getElementById('player-inputs');
    const inputs = playerInputs.querySelectorAll('input');
    
    gameState.players = [];
    for (let i = 0; i < gameState.playerCount; i++) {
        const name = inputs[i].value.trim() || `Leikmaður ${i + 1}`;
        gameState.players.push({
            name: name,
            icon: landvaettir[i],
            position: 0,
            element: null
        });
    }
    
    // Skipta um skjá
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    
    // Setja upp spilaborð
    setupGameBoard();
}

// Setja upp spilaborð
function setupGameBoard() {
    const mapImg = document.getElementById('map-image');
    
    mapImg.onload = () => {
        createLocationMarkers();
        createPlayerPieces();
    };
    
    // Ef myndin er þegar hlaðin
    if (mapImg.complete) {
        createLocationMarkers();
        createPlayerPieces();
    }
    
    updatePlayersStatus();
    updateCurrentPlayer();
}

function createLocationMarkers() {
    const container = document.getElementById('map-container');
    
    locations.forEach((loc, i) => {
        const marker = document.createElement('div');
        marker.className = 'location-marker';
        marker.style.left = (loc.x * 100) + '%';
        marker.style.top = (loc.y * 100) + '%';
        container.appendChild(marker);
    });
}

function createPlayerPieces() {
    const container = document.getElementById('map-container');
    
    gameState.players.forEach((player, i) => {
        const piece = document.createElement('div');
        piece.className = 'player-piece';
        piece.textContent = player.icon;
        piece.id = `player-piece-${i}`;
        
        const loc = locations[0];
        const offsetX = (i - gameState.players.length / 2) * 20;
        piece.style.left = `calc(${loc.x * 100}% + ${offsetX}px)`;
        piece.style.top = (loc.y * 100) + '%';
        
        container.appendChild(piece);
        player.element = piece;
    });
}

function updatePlayersStatus() {
    const statusDiv = document.getElementById('players-status');
    statusDiv.innerHTML = gameState.players.map((player, i) => `
        <div class="player-status ${i === gameState.currentPlayerIndex ? 'active' : ''}">
            <span class="icon">${player.icon}</span>
            <span>${player.name}</span>
            <span class="position">${player.position}/30</span>
        </div>
    `).join('');
}

function updateCurrentPlayer() {
    const player = gameState.players[gameState.currentPlayerIndex];
    document.getElementById('current-player-icon').textContent = player.icon;
    document.getElementById('current-player-text').textContent = player.name;
}

// Kasta teningi
function rollDice() {
    if (gameState.waitingForAnswer) return;
    
    const btn = document.getElementById('roll-btn');
    btn.disabled = true;
    
    // Animate dice
    const diceDisplay = document.getElementById('dice-display');
    let rolls = 0;
    const interval = setInterval(() => {
        diceDisplay.textContent = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][Math.floor(Math.random() * 6)];
        rolls++;
        if (rolls > 10) {
            clearInterval(interval);
            const result = Math.floor(Math.random() * 6) + 1;
            diceDisplay.textContent = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][result - 1];
            
            setTimeout(() => {
                movePlayer(result);
            }, 500);
        }
    }, 100);
}

function movePlayer(steps) {
    const player = gameState.players[gameState.currentPlayerIndex];
    const newPosition = Math.min(player.position + steps, locations.length);
    
    // Animate movement
    animateMovement(player, newPosition, () => {
        player.position = newPosition;
        updatePlayersStatus();
        
        // Athuga hvort leikmaður kláraði
        if (player.position >= locations.length) {
            showWinner(player);
        } else {
            // Sýna spurningu
            showQuestion();
        }
    });
}

function animateMovement(player, targetPosition, callback) {
    let currentPos = player.position;
    const interval = setInterval(() => {
        currentPos++;
        updatePlayerPiecePosition(player, currentPos);
        
        if (currentPos >= targetPosition) {
            clearInterval(interval);
            callback();
        }
    }, 300);
}

function updatePlayerPiecePosition(player, position) {
    const loc = locations[Math.min(position, locations.length - 1)];
    const piece = player.element;
    
    // Offset fyrir marga leikmenn á sama stað
    const playersAtSameSpot = gameState.players.filter(p => p.position === position).indexOf(player);
    const offsetX = (playersAtSameSpot - 1) * 20;
    
    piece.style.left = `calc(${loc.x * 100}% + ${offsetX}px)`;
    piece.style.top = (loc.y * 100) + '%';
}

// Sýna spurningu
function showQuestion() {
    gameState.waitingForAnswer = true;
    
    const player = gameState.players[gameState.currentPlayerIndex];
    const location = locations[player.position];
    
    document.getElementById('question-location').textContent = location.name;
    document.getElementById('story-text').textContent = questionData.story;
    document.getElementById('question-text').textContent = questionData.question;
    document.getElementById('location-image').textContent = questionData.icon;
    
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = questionData.answers.map((answer, i) => 
        `<button class="answer-btn" onclick="checkAnswer(${i})">${String.fromCharCode(65 + i)}) ${answer}</button>`
    ).join('');
    
    document.getElementById('result-message').classList.remove('show', 'correct', 'wrong');
    document.getElementById('continue-btn').style.display = 'none';
    
    // Reset listen button
    const listenBtn = document.getElementById('listen-btn');
    listenBtn.disabled = false;
    listenBtn.innerHTML = '🔊 Hlusta';
    
    document.getElementById('question-modal').classList.add('active');
    
    // Spila hljóð sjálfvirkt
    playAudio();
}

async function playAudio() {
    const storyText = document.getElementById('story-text').textContent;
    const listenBtn = document.getElementById('listen-btn');
    
    listenBtn.disabled = true;
    listenBtn.innerHTML = '<span class="loading">⏳</span> Hleð...';
    
    try {
        const response = await fetch('/.netlify/functions/speak', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                text_to_speak: storyText,
                voice: 'is-IS-GudrunNeural'
            })
        });
        
        const data = await response.json();
        
        if (data.audio_base64) {
            const audioBlob = base64ToBlob(data.audio_base64);
            const audioUrl = URL.createObjectURL(audioBlob);
            
            if (gameState.currentAudio) {
                gameState.currentAudio.pause();
            }
            
            gameState.currentAudio = new Audio(audioUrl);
            gameState.currentAudio.play();
            
            listenBtn.innerHTML = '🔊 Hlusta aftur';
            listenBtn.disabled = false;
        } else {
            throw new Error('Engin hljóðskrá kom til baka');
        }
    } catch (error) {
        console.error('Villa við að spila hljóð:', error);
        listenBtn.innerHTML = '🔊 Hlusta (villa)';
        listenBtn.disabled = false;
    }
}

function base64ToBlob(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: 'audio/mp3' });
}

function checkAnswer(answerIndex) {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    const resultMsg = document.getElementById('result-message');
    const isCorrect = answerIndex === questionData.correctAnswer;
    
    buttons[answerIndex].classList.add(isCorrect ? 'correct' : 'wrong');
    buttons[questionData.correctAnswer].classList.add('correct');
    
    resultMsg.textContent = isCorrect ? '✅ Rétt svar! Þú færð að kasta aftur.' : '❌ Rangt svar. Næsti leikmaður.';
    resultMsg.className = 'result-message show ' + (isCorrect ? 'correct' : 'wrong');
    
    document.getElementById('continue-btn').style.display = 'block';
    
    if (isCorrect) {
        gameState.consecutiveRolls++;
    } else {
        gameState.consecutiveRolls = 0;
    }
}

function continueGame() {
    document.getElementById('question-modal').classList.remove('active');
    gameState.waitingForAnswer = false;
    
    // Stop audio
    if (gameState.currentAudio) {
        gameState.currentAudio.pause();
        gameState.currentAudio = null;
    }
    
    // Ef svarið var rétt og < 2 í röð, leyfa að kasta aftur
    if (gameState.consecutiveRolls > 0 && gameState.consecutiveRolls < 2) {
        document.getElementById('roll-btn').disabled = false;
    } else {
        // Næsti leikmaður
        gameState.consecutiveRolls = 0;
        gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
        updateCurrentPlayer();
        updatePlayersStatus();
        document.getElementById('roll-btn').disabled = false;
        document.getElementById('dice-display').textContent = '🎲';
    }
}

function showWinner(player) {
    document.getElementById('winner-icon').textContent = player.icon;
    document.getElementById('winner-name').textContent = player.name;
    
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('winner-screen').classList.add('active');
}

// Initialization
setPlayerCount(3);
