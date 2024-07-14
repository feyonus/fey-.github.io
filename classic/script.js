var names = [
    "Abigail", "Addison", "Adeline", "Adrian", "Aiden", "Ainsley", "Alexa", "Alexander", "Alexis", "Alice", 
    "Allison", "Amelia", "Anna", "Aria", "Ariel", "Ariana", "Ashley", "Athena", "Aubrey", "Audrey", 
    "Aurora", "Austin", "Ava", "Avery", "Barbara", "Bella", "Brandon", "Brian", "Brianna", "Brittany", 
    "Brooklyn", "Bruce", "Bryce", "Cameron", "Camila", "Caroline", "Carter", "Charles", "Charlotte", "Chase", 
    "Chloe", "Christopher", "Claire", "Clara", "Colin", "Cooper", "Cora", "Dakota", "Daniel", "David", 
    "Delilah", "Declan", "Dominic", "Dylan", "Edgar", "Edward", "Eleanor", "Elena", "Eli", "Elias", 
    "Elijah", "Elise", "Elizabeth", "Ella", "Ellie", "Elsa", "Emmanuel", "Emma", "Emily", "Ethan", 
    "Eva", "Evelyn", "Ezekiel", "Faith", "Fernando", "Gabriel", "Gabriela", "Gabriella", "Gavin", "Genesis", 
    "George", "Gianna", "Giovanni", "Giselle", "Grace", "Grant", "Hailey", "Haley", "Hannah", "Harper", 
    "Hazel", "Hector", "Hope", "Hudson", "Hunter", "Ian", "Ivy", "Isaac", "Isabel", "Isabella", 
    "Isabelle", "Isla", "Jackson", "Jade", "Javier", "Jaxon", "Jayden", "Jesse", "Jessica", "Jesus", 
    "John", "Jonathan", "Jordan", "Joseph", "Josephine", "Joshua", "Josiah", "Jocelyn", "Juan", "Julia", 
    "Julian", "Juliana", "Julie", "Justin", "Kaden", "Kylie", "Kayla", "Kennedy", "Kevin", "Kyle", 
    "Landon", "Layla", "Leah", "Levi", "Liam", "Lillian", "Lily", "Logan", "Luna", "Lucas", 
    "Lucy", "Lydia", "Madelyn", "Madison", "Mason", "Maya", "Matthew", "Megan", "Melissa", "Mia", 
    "Michael", "Michelle", "Miguel", "Mila", "Miles", "Nadia", "Naomi", "Natalie", "Nathan", "Nevaeh", 
    "Nicholas", "Nicole", "Nora", "Nova", "Oliver", "Olivia", "Oscar", "Owen", "Parker", "Patrick", 
    "Payton", "Penelope", "Peter", "Peyton", "Rachel", "Rafael", "Raymond", "Reagan", "Ricardo", "Riley", 
    "Robert", "Rose", "Ruby", "Ryan", "Samuel", "Santiago", "Savannah", "Scarlett", "Sean", "Serena", 
    "Seth", "Simon", "Skylar", "Sofia", "Sophia", "Sophie", "Stella", "Stephanie", "Steven", "Taylor", 
    "Theodore", "Thomas", "Timothy", "Travis", "Tristan", "Troy", "Tyler", "Valentina", "Vanessa", "Victor", 
    "Victoria", "Violet", "William", "Wyatt", "Xander", "Xavier", "Zachary", "Zoe", "Zoey"
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
        winnerName = "everyone";
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
