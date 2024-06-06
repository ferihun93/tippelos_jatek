let randomNumber;
let probalkozas = 0;
let div = document.getElementById("container");
const body = document.getElementById('body');
const generalGomb = document.getElementById('ertekGeneralo');
let currentMessage = null;
let lives = 10; 
const heart = 'images/heart.jpg';
const heartUres = 'images/ures_sziv.png'


function addImageToPage() {
    const container = document.getElementById('imageContainer');
    removeAllImages();  // Előző képek eltávolítása
    for (let i = 1; i < lives+1; i++) {
        const img = document.createElement('img');
        img.src = heart;
        img.alt = 'Heart Image';
        img.classList.add('sziv_kepek');
        container.appendChild(img);
    }
}

function addReplacementImage() {
    const container = document.getElementById('imageContainer');
    const img = document.createElement('img');
    img.src = heartUres;
    img.alt = 'üres szív';
    img.classList.add('ures_sziv');
    container.appendChild(img);
}

// A random szám generáló funkció
function szamKitalalo() {
    return Math.floor(Math.random() * 100) + 1;
}

// Szám generálása és megjelenítése az input mezőben
function generateNumber() {
    lives = 10;
    probalkozas = 0;
    randomNumber = szamKitalalo();
    addImageToPage();  // Új képek hozzáadása
    hideAllParagraphs();
    // document.getElementById('kitalalt').value = randomNumber;
    console.log('Generált szám:', randomNumber);  // Ellenőrzés a konzolon
}


function hirdeto(){
    probalkozas++;
    const p = document.createElement('p');
    p.textContent = `Gratulálok helyes tipp, a próbálkozások száma: ${probalkozas}`;
    replaceMessage(p);
}

function tipp() {
    let guess = parseInt(document.getElementById("tipp_ertek").value, 10);
    const allas1 = document.createElement('p');
    const allas2 = document.createElement('p');
    const error = document.createElement('p');
    const gameOver = document.createElement('p');
    const generalGomb = document.getElementById('ertekGeneralo');
    const undefinedError = document.createElement('p');
    showAllParagraphs();
    console.log('Tippelt szám:', guess);  // Ellenőrzés a konzolon
    console.log('Generált szám összehasonlításhoz:', randomNumber);  // Ellenőrzés a konzolon

    if (lives === 0) {
        newGameButton();  // "New game" gomb megjelenítése
        return; // Stop further execution
    }

    if (isNaN(guess)) {
        error.textContent = "A mező nem lehet üres";
        replaceMessage(error);
    }else if(randomNumber===undefined){
        undefinedError.textContent="Generálnod kell egy számot a játék indításához!"
        replaceMessage(undefinedError);
    } 
    else if (guess > randomNumber) {
        allas2.textContent = "A kitalált szám kisebb";
        replaceMessage(allas2);
        probalkozas++;
        eletVeszites();
    } else if (guess < randomNumber) {
        allas1.textContent = "A kitalált szám nagyobb";
        replaceMessage(allas1);
        probalkozas++;
        eletVeszites();
    } else {
        eletVeszites();
        hirdeto();
        newGameButton();  // "New game" gomb megjelenítése, ha helyes a tipp
    }
}

function replaceMessage(newMessage) {
    if (currentMessage) {
        div.replaceChild(newMessage, currentMessage);
    } else {
        div.appendChild(newMessage);
    }
    currentMessage = newMessage;
}

function newGameButton() {
    // Hozz létre egy új gomb elemet
    const button = document.createElement('button');
    const newGameMessage = document.createElement('p');
    const generalGomb = document.getElementById('ertekGeneralo');
    const newGameButton = document.getElementById('newgamebutton');

    if (newGameButton) {
        newGameButton.remove();
    }

    // Állítsd be a gomb szövegét
    button.textContent = "New game";
    button.id = "newgamebutton";

    // Állítsd be az onclick esemény kezelőt
    button.onclick = function() {
        resetProbalkozas();  // Visszaállítjuk a próbálkozások számát
        button.remove();  // A gomb eltávolítása
        newGameMessage.textContent = "Új játék elindítva";
        replaceMessage(newGameMessage);
        generateNumber();  // Új szám generálása
        addNewButton();
    };

    div.appendChild(button);
}

// function resetInput() {
//     document.getElementById("kitalalt").value = "";  // Az input mező tartalmának ürítése
// }

function resetProbalkozas() {
    probalkozas = 0;
    lives = 10;  // Visszaállítjuk az életek számát
}

function eletVeszites() {
    const img = document.querySelector('.sziv_kepek');
    lives--;
    if (img) {
        img.remove();
        addReplacementImage();
    }
    if (lives === 0) {
        const gameOver = document.createElement('p');
        gameOver.textContent = `A játéknak vége, veszítettél a kitalált szám a(z) ${randomNumber} volt.`;
        replaceMessage(gameOver);
        // resetInput();
        newGameButton();  // Megjeleníti a "New game" gombot, ha az életek száma 0
    }
    console.log("Életek száma:", lives);
}


function addNewButton() {
    const existingButton = document.getElementById('ertekGeneralo');
    if (existingButton) {
        existingButton.remove();
    }

    const button = document.createElement('button');
    const container = document.getElementById('imageContainer');
    button.textContent = "Generálj egy számot!";
    button.onclick = generateNumber;
    button.id = "ertekGeneralo";
    imageContainer.insertAdjacentElement('afterend', button);
}

function removeAllImages() {
    const container = document.getElementById('imageContainer');
    container.innerHTML = '';  // Eltávolít minden képet a konténerből
}

function cheatKod() {
    const cheat = document.getElementById('cheat');
    const okButton = document.getElementById('okButton');

    if(cheat.value==="zegsz"){
        lives = 100;
        addImageToPage();
        console.log("Életek:", lives)
    }else{
        alert("Helytelen kód");
        cheat.value="";
    }
    return lives;
}

// Minden p elem eltávolítása a DOM-ból
function hideAllParagraphs() {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.style.display = 'none';
    });
}

// Minden p elem újra megjelenítése a DOM-ban
function showAllParagraphs() {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.style.display = 'block';
    });
}