// Global variables
let randomNumber;
let probalkozas = 0;
let currentMessage = null;
let lives = 10; 

const heart = 'images/heart.jpg';
const heartUres = 'images/ures_sziv.jpg';
const div = document.getElementById("container");
const body = document.getElementById('body');
const generalGomb = document.getElementById('ertekGeneralo');

// Function to handle guesses
function tipp() {
    let guess = parseInt(document.getElementById("tipp_ertek").value, 10);
    const allas1 = document.createElement('p');
    const allas2 = document.createElement('p');
    const error = document.createElement('p');
    const undefinedError = document.createElement('p');
    const tippButton = document.getElementById('tipp_button');

    showAllParagraphs();
    console.log('Tippelt szám:', guess);  // Logging the guessed number for debugging
    console.log('Generált szám összehasonlításhoz:', randomNumber);  // Logging the generated number for comparison

    if (lives === 0) {
        return; // Stop further execution if no lives left
    }

    if (isNaN(guess)) {
        error.textContent = "A mező nem lehet üres";
        replaceMessage(error);
    } else if (randomNumber === undefined) {
        undefinedError.textContent = "Generálnod kell egy számot a játék indításához!";
        replaceMessage(undefinedError);
    } else if (guess > randomNumber) {
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
        tippButton.disabled = true;
        jatekosNyert();
        szorzas(5);
    }
}


function szorzas(a = 5, b){
    return console.log("A szorzás eredménye: ", a * b);
}


// Function to generate a random number between 1 and 100
function szamKitalalo() {
    return Math.floor(Math.random() * 100) + 1;
}

// Function to generate a number and start the game
function generateNumber() {
    lives = 10;
    probalkozas = 0;
    randomNumber = szamKitalalo();
    addImageToPage();
    hideAllParagraphs();
    feladatszovegEltunteto();
    console.log('Generált szám:', randomNumber);  // Logging the generated number for debugging
    document.getElementById('tipp_button').disabled = false;
}


// Function to display a success message
function jatekosNyert() {
    probalkozas++;
    const p = document.createElement('p');
    p.textContent = `Gratulálok helyes tipp, a próbálkozások száma: ${probalkozas}`;
    replaceMessage(p);
}

// Function to handle lives lost
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
        document.getElementById('tipp_button').disabled = true;
    }
    console.log("Életek száma:", lives);
}

// Function to replace the current message with a new message
function replaceMessage(newMessage) {
    if (currentMessage) {
        div.replaceChild(newMessage, currentMessage);
    } else {
        div.appendChild(newMessage);
    }
    currentMessage = newMessage;
}

// Function to add hearts (lives) to the page
function addImageToPage() {
    const container = document.getElementById('imageContainer');
    removeAllImages();  // Remove previous images
    for (let i = 1; i < lives + 1; i++) {
        const img = document.createElement('img');
        img.src = heart;
        img.alt = 'Heart Image';
        img.classList.add('sziv_kepek');
        container.appendChild(img);
    }
}

// Function to add a replacement (empty) heart
function addReplacementImage() {
    const container = document.getElementById('imageContainer');
    const img = document.createElement('img');
    img.src = heartUres;
    img.alt = 'üres szív';
    img.classList.add('ures_sziv');
    container.appendChild(img);
}

// Function to remove all images from the container
function removeAllImages() {
    const container = document.getElementById('imageContainer');
    container.innerHTML = '';  // Remove all images from the container
}

// Function to reset the number of attempts and lives
function resetProbalkozas() {
    probalkozas = 0;
    lives = 10;  // Reset the number of lives
}

// Cheat code function
function cheatKod() {
    const cheat = document.getElementById('cheat');
    if (cheat.value === "zegsz") {
        lives = 100;
        addImageToPage();
        console.log("Életek:", lives);
    } else {
        alert("Helytelen kód");
        cheat.value = "";
    }
    return lives;
}

// Hide all paragraph elements
function hideAllParagraphs() {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.style.display = 'none';
    });
}

// Show all paragraph elements
function showAllParagraphs() {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.style.display = 'block';
    });
}

// Add a new button to generate a number
function addNewButton() {
    const existingButton = document.getElementById('ertekGeneralo');
    if (existingButton) {
        existingButton.remove();
    }

    const button = document.createElement('button');
    button.textContent = "Generálj egy számot!";
    button.onclick = generateNumber;
    button.id = "ertekGeneralo";
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.insertAdjacentElement('afterend', button);
    document.getElementById('tipp_button').disabled = false;
}

function feladatszovegEltunteto(){
    const felSzoveg = document.getElementById('feladatszoveg');
    felSzoveg.style.display = 'none';
}