// "str": _str,
// "dex": _dex,
// "con": _con,
// "int": _int,
// "wis": _wis,
// "cha": _cha,
// "lck": _luck,
// "spd": _speed,



var names = [
    "Aldric", "Branwen", "Cassius", "Dahlia", "Eleanor", "Finnian", "Gwendolyn", "Harrison", "Isolde", "Jasper",
    "Kaida", "Liliana", "Marius", "Niamh", "Orin", "Phaedra", "Quintus", "Rhiannon", "Soren", "Tamsin",
    "Ulric", "Vivienne", "Wolfgang", "Xanthe", "Ysabel", "Zephyr", "Aurora", "Benedict", "Calista", "Darius",
    "Evangeline", "Felix", "Genevieve", "Hadrian", "Ivory", "Juniper", "Kieran", "Lorelei", "Maximilian",
    "Natalia", "Oberon", "Persephone", "Quentin", "Rosalind", "Sebastian", "Thalia", "Ulysses", "Vesper",
    "Wynter", "Xavier", "Yvette", "Zane", "Astrid", "Blaise", "Clementine", "Dante", "Elowen", "Fiona",
    "Gareth", "Helena", "Ignatius", "Jacinda", "Kai", "Lyra", "Matthias", "Nora", "Ophelia", "Percival",
    "Quinn", "Rowan", "Seraphina", "Tristan", "Ursula", "Violet", "Wren", "Xiomara", "Yara", "Zara",
    "Atticus", "Beatrix", "Caspian", "Delphine", "Ezra", "Freya", "Gideon", "Hazel", "Isla", "Jude"
    // You can add more names if needed
];

function generateRandomName() {
    var randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

// Function to calculate the sum of a character's stats
function calculateTotal(characterNum) {
    var strength = parseInt(document.getElementById("character" + characterNum + "-strength").textContent);
    var agility = parseInt(document.getElementById("character" + characterNum + "-agility").textContent);
    var intelligence = parseInt(document.getElementById("character" + characterNum + "-intelligence").textContent);
    var wisdom = parseInt(document.getElementById("character" + characterNum + "-wisdom").textContent);
    var charisma = parseInt(document.getElementById("character" + characterNum + "-charisma").textContent);
    var luck = parseInt(document.getElementById("character" + characterNum + "-luck").textContent);
    var speed = parseInt(document.getElementById("character" + characterNum + "-speed").textContent);
    return strength + agility + intelligence + wisdom + charisma + luck + speed;
}

// Function to determine the winner and display the result
function determineWinner() {
    var total1 = calculateTotal(1);
    var total2 = calculateTotal(2);

    var winnerName;

    if (total1 > total2) {
        winnerName = document.getElementById("character1-name").textContent;
    } else if (total2 > total1) {
        winnerName = document.getElementById("character2-name").textContent;
    } else {
        winnerName = "It's a tie!";
    }

    // Display the winner's name inline
    document.getElementById("winner-name").textContent = winnerName;
}



// Function to generate character stats
function generateCharacter(characterNum) {
    // Generate random values for each attribute (between 1 and 10)
    var strength = Math.floor(Math.random() * 20) + 1;
    var agility = Math.floor(Math.random() * 20) + 1;
    var intelligence = Math.floor(Math.random() * 20) + 1;
    var wisdom = Math.floor(Math.random() * 20) + 1;
    var charisma = Math.floor(Math.random() * 20) + 1;
    var luck = Math.floor(Math.random() * 6) + 1;
    var speed = Math.floor(Math.random() * 20) + 1;

    // Generate a random name
    var name = generateRandomName();

    // Display the generated values on the webpage
    document.getElementById("character" + characterNum + "-name").textContent = name;
    document.getElementById("character" + characterNum + "-strength").textContent = strength;
    document.getElementById("character" + characterNum + "-agility").textContent = agility;
    document.getElementById("character" + characterNum + "-intelligence").textContent = intelligence;
    document.getElementById("character" + characterNum + "-wisdom").textContent = wisdom;
    document.getElementById("character" + characterNum + "-charisma").textContent = charisma;
    document.getElementById("character" + characterNum + "-luck").textContent = luck;
    document.getElementById("character" + characterNum + "-speed").textContent = speed;
}

// Function to generate characters for both blocks
function generateCharacters() {
    generateCharacter(1);
    generateCharacter(2);
    determineWinner();
}

// Add event listener for page load
window.addEventListener('load', function() {
    generateCharacters();
});

// Add event listener for button click
document.getElementById('generateButton').addEventListener('click', function() {
    generateCharacters();
});
