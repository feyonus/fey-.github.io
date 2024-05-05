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
    var charisma = parseInt(document.getElementById("character" + characterNum + "-charisma").textContent);
    return strength + agility + intelligence + charisma;
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
    var strength = Math.floor(Math.random() * 10) + 1;
    var agility = Math.floor(Math.random() * 10) + 1;
    var intelligence = Math.floor(Math.random() * 10) + 1;
    var charisma = Math.floor(Math.random() * 10) + 1;

    // Generate a random name
    var name = generateRandomName();

    // Display the generated values on the webpage
    document.getElementById("character" + characterNum + "-name").textContent = name;
    document.getElementById("character" + characterNum + "-strength").textContent = strength;
    document.getElementById("character" + characterNum + "-agility").textContent = agility;
    document.getElementById("character" + characterNum + "-intelligence").textContent = intelligence;
    document.getElementById("character" + characterNum + "-charisma").textContent = charisma;
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


// Function to render the title banner
function titleBanner(version) {
    var title = `
      ____      _ _                             _     
     / ___|_ __(_) |__  ___ _ __ ___   __ _ ___| |__  
    | |   | '__| | '_ \\/ __| '_ \` _ \\ / _\` / __| '_ \\ 
    | |___| |  | | |_) \\__ \\ | | | | | (_| \\__ \\ | | |
     \\____|_|  |_|_.__/|___/_| |_| |_|\\__,_|___/_| |_|
                                                 ver.${version}                            
    \n\tThe Foster Home Autobattler.\n\tThey all want to be part of a family but only one will be adopted.\n`;

    // Update the title container with the title content
    document.getElementById("title-container").textContent = title;
}

// Call the titleBanner function with the desired version
var version = "1.0";
titleBanner(version);