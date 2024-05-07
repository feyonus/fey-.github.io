// "str": _str,
// "dex": _dex,
// "con": _con,
// "int": _int,
// "wis": _wis,
// "cha": _cha,
// "lck": _luck,
// "spd": _speed,



var names = [
    "Aiden", "Liam", "Jackson", "Lucas", "Noah", "Mason", "Ethan", "Caden", "Logan", "Jacob",
    "Oliver", "Elijah", "Alexander", "Daniel", "Matthew", "James", "David", "Benjamin", "William", "Michael",
    "Emma", "Olivia", "Sophia", "Ava", "Isabella", "Mia", "Abigail", "Emily", "Charlotte", "Harper",
    "Evelyn", "Amelia", "Elizabeth", "Sofia", "Madison", "Avery", "Ella", "Scarlett", "Grace", "Chloe",
    "Eleanor", "Samantha", "Natalie", "Lily", "Hannah", "Lillian", "Addison", "Aubrey", "Zoey", "Penelope",
    "Mila", "Leah", "Stella", "Hazel", "Violet", "Aria", "Claire", "Bella", "Aurora", "Lucy",
    "Anna", "Savannah", "Caroline", "Genesis", "Kennedy", "Kinsley", "Allison", "Maya", "Sarah", "Madelyn",
    "Adeline", "Alexa", "Ariana", "Elena", "Gabriella", "Naomi", "Alice", "Sadie", "Hailey", "Eva",
    "Emilia", "Autumn", "Quinn", "Nevaeh", "Piper", "Ruby", "Serenity", "Willow", "Everly", "Cora",
    "Kaylee", "Lydia", "Aubree", "Arianna", "Eliana", "Peyton", "Melanie", "Gianna", "Isabelle", "Julia",
    "Valentina", "Nova", "Clara", "Vivian", "Reagan", "Mackenzie", "Madeline", "Brielle", "Delilah", "Isla",
    "Rylee", "Katherine", "Sophie", "Josephine", "Ivy", "Liliana", "Jade", "Maria", "Taylor", "Hadley",
    "Kylie", "Emery", "Adalynn", "Nina", "Faith", "Alexandra", "Ximena", "Ashley", "Brianna", "Raelynn",
    "Bailey", "Mary", "Athena", "Andrea", "Leilani", "Jasmine", "Lyla", "Margaret", "Alyssa", "Adalyn",
    "Arya", "Norah", "Khloe", "Kayla", "Eden", "Eliza", "Rose", "Ariel", "Melody", "Alexis",
    "Isabel", "Sydney", "Juliana", "Lauren", "Iris", "Emerson", "London", "Morgan", "Londyn", "Trinity",
    "Valeria", "Lilly", "Molly", "Mckenzie", "Catherine", "Adeline", "Jocelyn", "Maeve", "Adriana", "Kendall",
    "Mariah", "Juliette", "Eloise", "Jade", "Kinsley", "Ellie", "Elise", "Angelina", "Makayla", "Laila",
    "Brooklyn", "Summer", "Daisy", "Callie", "Willow", "Hope", "Isabel", "Reese", "Daniela", "Nyla",
    "Rosalie", "Amanda", "Rachel", "Danielle", "Kenzie", "Julianna", "Sara", "Fatima", "Esther", "Alina",
    "Leila", "Adelyn", "Anastasia", "Ana", "Vanessa", "Ayla", "Nadia", "Gabrielle", "Jordan", "Payton",
    "Harmony", "Alexandria", "Miranda", "Malia", "Angel", "Jayla", "Elaina", "Evangeline", "Genevieve", "Faith",
    "Kiara", "Heaven", "Isabela", "Emmy", "Cheyenne", "Fiona", "Georgia", "Giselle", "Bianca", "Cecilia",
    "Lila", "Alana", "June", "Maggie", "Tessa", "Amaya", "Aniyah", "Willa", "Talia", "Jessica",
    "Izabella", "Leia", "Angela", "Hope", "Mckenna", "Karen", "Jacqueline", "Gracie", "Amy", "Adrianna",
    "Alivia", "Paris", "Kira", "Ainsley", "Phoenix", "Camille", "Kinley", "Alayna", "Marley", "Selena",
    "Dakota", "Josie", "Miriam", "Erika", "Camilla", "Chelsea", "Lexi", "Alessandra", "Kamryn", "Makenna",
    "Gracelyn", "Alison", "Skyler", "Magnolia", "Diana", "Nova", "Olive", "Jamie", "Teagan", "Delaney",
    "Lola", "Mariana", "Margot", "Annie", "Amina", "Luna", "Joy", "Amara", "Natasha", "Julie",
    "Rebecca", "Alondra", "Brynn", "Harley", "Lucille", "Briella", "Anya", "Brinley", "Lia", "River",
    "Charlee", "Phoebe", "Joanna", "Willow", "Calliope", "Sage", "Hope", "Nicole", "Mina", "Selah",
    "Noelle", "Ember", "Anya", "Savanna", "Dahlia", "Georgia", "Serena", "Stephanie", "Elliot", "Elle",
    "Nia", "Ruth", "Cali", "Blair", "April", "Arabella", "Amanda", "Ariella", "Tatum", "Hayden",
    "Emersyn", "Aspen", "Lilith", "Kyra", "Annalise", "Elisa", "Adelaide", "Haven", "Jenna", "Anahi",
    "Elsie", "Averie", "Anya", "Jayleen", "Kailani", "Leslie", "Macy", "Nalani", "Kennedi", "Skye",
    "Camryn", "Kali", "Dallas", "Charleigh", "Rosie", "Esmeralda", "Virginia", "Nathalie", "Nola", "Ariadne",
    "Luciana", "Madalyn", "Madelynn", "Saylor", "Madilynn", "Claudia", "Carmen", "Juniper", "Tiffany", "Ariah",
    "Evie", "Bristol", "Cameron", "Shelby", "Rosa", "Bria", "Angelica", "Lennon", "Mara", "Joelle",
    "Lindsey", "Holly", "Mae", "Elaine", "Cassandra", "Zuri", "Jazmin", "Adelynn", "Priscilla", "Lilian",
    "Raelyn", "Vienna", "Lisa", "Paislee", "Kallie", "Mikayla", "Emmalyn", "Anne", "Kristen", "Reyna",
    "Meredith", "Mira", "Ciara", "Lillianna", "Alanna", "Leighton", "Gemma", "Gia", "Elisabeth", "Viviana",
    "Oakley", "Ellen", "Remy", "Lizbeth", "Kara", "Danica", "Astrid", "Evelynn", "Cierra", "Joselyn",
    "Lea", "Joyce", "Kenley", "Myra", "Allyson", "Shiloh", "Braelynn", "Monroe", "Ariyah", "Wren",
    "Addilyn", "Analia", "Janelle", "Noemi", "Christine", "Kensley", "Reign", "Dayana", "Elora", "Emilee",
    "Princess", "Charley", "Elyse", "Gloria", "Lauryn", "Paige", "Zariah", "Laylah", "Madalynn", "Siena",
    "Ellison", "Malaysia", "Karina", "Blake", "Frances", "Amelie", "Dulce", "Kimber", "Amirah", "Daleyza",
    "Michaela", "Skyla", "Annabel", "Johanna", "Azalea", "Jayda", "Kailyn", "Miah", "Saniyah", "Yareli",
    "Zendaya", "Jaylah", "Rylan", "Kaiya", "Milani", "Anne", "Aimee", "Elsa", "Hattie", "Emmeline",
    "Milana", "Courtney", "Kassandra", "Ansley", "Remi", "Annika", "Mikaela", "Naya", "Mercy", "Hana",
    "Janiyah", "Kayden", "Amirah", "Novalee", "Whitney", "Veda", "Paloma", "Ramona", "Samara", "Tabitha",
    "Montserrat", "Millie", "Cecelia", "Galilea", "Marlowe", "Kiana", "Jemma", "Rory", "Lina", "Wendy",
    "Esme", "Amalia", "Anabelle", "Madisyn", "Laylani", "Kaylie", "Tiana", "Ailani", "Raven", "Sariah",
    "Paula", "Kora", "Aryanna", "Averie", "Sunny", "Roselyn", "Marlee", "Karter", "Nyomi", "Luz",
    "Holland", "Bonnie", "Emmalynn", "Kallie", "Charlize", "Taliyah", "Ryann", "Whitley", "Alisha", "Emmaline",
    "Avalynn", "Marina", "Kenna", "Tinsley", "Lilli", "Emerie", "Mavis", "Salem", "Louisa", "Elora",
    "Aislinn", "Cadence", "Marisol", "Karlee", "Lailah", "Brittany", "Harleigh", "Nathalia", "Aya", "Christina",
    "Jazlyn", "Kairi", "Teresa", "Emmalie", "Nancy", "Sylvie", "Alisson", "Thalia", "Leanna", "Nathaly",
    "Coraline", "Anabella", "Imani", "Mina", "Antonella", "Sylvia", "Alma", "Raina", "Waverly", "Aleah",
    "Bellamy", "Jaelyn", "Elin", "Vada", "Martha", "Evalyn", "Penny", "Regina", "Zoie", "Aspen",
    "Brylee", "Louise", "Briar", "Kamiyah", "Kristina", "Reina", "Livia", "Maren", "Opal", "Rayna",
    "Avalyn", "Callie", "Zola", "Magdalena", "Maida", "Kailey", "Kimberly", "Nahla", "Zora", "Ariya",
    "Liberty", "Alina", "Kenia", "Novah", "Aadhya", "Ida", "Danna", "Janiya", "Yamileth", "Lindsey",
    "Laynie", "Kai", "Aurelia", "Jessie", "Judith", "Halle", "Amora", "Annalee", "Malaya", "Nellie",
    "Emmarie", "Saige", "Jesslyn", "Rayne", "Soraya", "Laney", "Belen", "Elianna", "Kimora", "Anya",
    "Marin", "Yara", "Harmoni", "Yasmin", "Jaycee", "Irene", "Lyanna", "Ari", "Lillianna", "Teresa",
    "Kaelyn", "Kallie", "Aadhya", "Nia", "Kamilah", "Adele", "Natalee", "Amaris", "Lesly", "Jayleen",
    "Jaylene", "Adley", "Jasmin", "Karlee", "Aranza", "Milani", "Jaelynn", "Paityn", "Dayana", "Lizbeth",
    "Charity", "Rebekah", "Sutton", "Marleigh", "Raelyn", "Theresa", "Ingrid", "Caitlyn", "Azariah", "Kassandra",
    "Miya", "Halle", "Jolie", "Oaklee", "Karter", "Mallory", "Mollie", "Dalary", "Jurnee", "Ellianna",
    "Esperanza", "Joyce", "Demi", "Harriet", "Renee", "Abrielle", "Corinne", "Raylee", "Analia", "Riya",
    "Alayah", "Luz", "Lilyanna", "Maleah", "Millie", "Zaylee", "Maribel", "Austyn", "Aubrielle", "Belle",
    "Judith", "Kaiya", "Kinslee", "Sariah", "Susan", "Taya", "Zendaya", "Ariadna", "Lina", "Rubi",
    "Ailani", "Clarissa", "Lilyana", "Reina", "Thalia", "Anahi", "Jaylin", "Jolene", "Kenya", "Lizeth",
    "Miah", "Aliza", "Aminah", "Araceli", "Eileen", "Marcella", "Rylan", "Iliana", "Milania", "Anabel",
    "Barbara", "Dallas", "Estelle", "Karissa", "Kimber", "Nahomi", "Yaritza", "Alannah", "Elliot", "Evalynn",
    "Judy", "Karlie", "Shayla", "Arely", "Elisabeth", "Kiana", "Lillyana", "Yamilet", "Amirah", "Deborah",
    "Elora", "Emerald", "Jessa", "Malani", "Nola", "Taliyah", "Aadhya", "Ailyn", "Kensley", "Leena",
    "Lilia", "Mayra", "Mina", "Nala", "Pearl", "Yasmina", "Althea", "Deanna", "Janice", "Kynlee",
    "Lluvia", "Rosie", "Bexley", "Christiana", "Ellery", "Elyse", "Jazlynn", "Joselyn", "Nathalia", "Queen",
    "Sahara", "Aisley", "Aniston", "Emmy", "Jaiden", "Sarai", "Audrina", "Ireland", "Jamiyah", "Kailani",
    "Kyndall", "Marianna", "Mazie", "Tia", "Violeta", "Winnie", "Yuliana", "Zainab", "Adaline", "Charlize",
    "Clementine", "Damaris", "Evelin", "Harlee", "Jenesis", "Jessie", "Kamora", "Kristen", "Makayla", "Neveah",
    "Paisleigh", "Primrose", "Renee", "Saniya", "Saniyah", "Shirley", "Zaniyah", "Amariah", "Aubriella", "Baylor",
    "Carmen", "Darcy", "Jovie", "Kaylen", "Khalani", "Kynslee", "Layne", "Melani", "Natalya", "Saniyah",
    "Yasmeen", "Ailee", "Allie", "Ayana", "Betsy", "Billie", "Cambria", "Celia", "Charley", "Dalia",
    "Iliana", "Jalynn", "Jocelynn", "Kenzley", "Lilith", "Monica", "Persephone", "Rosalynn", "Shannon", "Zora",
    "Adalynn", "Anayah", "Annelise", "Braylee", "Cara", "Desiree", "Emerie", "Honesty", "Ingrid", "Johana",
    "Kadence", "Kaelynn", "Kamari", "Kaylie", "Kimberly", "Kloe", "Kya", "Liah", "Lilian", "Maisie",
    "Nyah", "Pippa", "Raquel", "Reagan", "Roslyn", "Royalty", "Vianey", "Zora", "Adelynn", "Anabella",
    "Aniya", "Annistyn", "Briley", "Celia", "Dalilah", "Devyn", "Emmaline", "Greer", "Izabelle", "Josslyn",
    "Kamilah", "Kenleigh", "Kyndal", "Leyla", "Magdalene", "Marlowe", "Mckayla", "Mireya", "Pippa", "Rosalie",
    "Sanaa", "Sariah", "Sky", "Tess", "Zainab", "Adaline", "Alaiya", "Arabelle", "Belen", "Bexley",
    "Carla", "Colbie", "Delilah", "Everleigh", "Haidyn", "Izabela", "Jiselle", "Kacey", "Kaleigh", "Karly",
    "Kenzi", "Kiersten", "Kloe", "Leylah", "Lourdes", "Lyanna", "Mahogany", "Mariella", "Margo", "Maritza",
    "Navy", "Nicolle", "Nikita", "Raylynn", "Skylah", "Zayla", "Aaralyn", "Adelyn", "Ailee", "Aleksandra",
    "Aleyda", "Alonna", "Alyson", "Anisa", "Avalynn", "Azalea", "Brea", "Camdyn", "Cate", "Celine",
    "Dariyah", "Denise", "Destinee", "Elara", "Ellie", "Emmalynn", "Hartley", "Hayleigh", "Jazlene", "Jessenia",
    "Jesslyn", "Joie", "Kady", "Kalina", "Karsyn", "Katerina", "Kathleen", "Katalina", "Kaylani", "Keilani",
    "Kourtney", "Krystal", "Lakyn", "Lili", "Loren", "Mahogany", "Majesty", "Maryam", "Mylee", "Noor",
    "Payton", "Perla", "Raelynn", "Rhyan", "Rian", "Rylin", "Samiyah", "Sarina", "Sidney", "Soraya",
    "Zella", "Adalia", "Aimee", "Alizabeth", "Annalee", "Ashtyn", "Azaria", "Braelyn", "Bryn", "Carmella",
    "Channing", "Charleigh", "Colleen", "Deborah", "Denise", "Destiny", "Elodie", "Ellison", "Emberly", "Emilyn",
    "Ericka", "Ezra", "Fallyn", "Georgina", "Gitty", "Graciela", "Harlyn", "Indigo", "Jael", "Janiya",
    "Jayde", "Jesse", "Kamilla", "Kamiya", "Karis", "Karrington", "Kaylene", "Kelis", "Keturah", "Kynleigh",
    "Lakelyn", "Landry", "Laylani", "Lourdes", "Makaylah", "Maleah", "Marigold", "Marlie", "Maryn", "Mavis",
    "Naima", "Nailah", "Niyah", "Nylah", "Pepper", "Ravenna", "Rowen", "Saniya", "Santana", "Simone",
    "Star", "Stormi", "Taniyah", "Taryn", "Tiana", "Tova", "Valery", "Winnie", "Yuna", "Zaira",
    "Zuri", "Adaliah", "Ahuva", "Alecia", "Ameera", "Amia", "Amity", "Annalisa", "Anvi", "Ashleigh",
    "Aubri", "Ayah", "Ayva", "Bettie", "Breelyn", "Brylie", "Cally", "Charis", "Christy", "Clarabelle",
    "Dafne", "Daliah", "Deja", "Dior", "Drea", "Effie", "Elani", "Eleni", "Eliora", "Elva",
    "Emarie", "Emeri", "Eryn", "Estefania", "Fay", "Fiorella", "Gisselle", "Gloriana", "Griselda", "Hafsa",
    "Haya", "Hindy", "Ishani", "Jaci", "Jaeda", "Jamila", "Jazelle", "Jenni", "Jennie", "Josselyn",
    "Kamora", "Karleigh", "Kavya", "Keiry", "Kodi", "Kylin", "Lavender", "Leyna", "Liani", "Lilibeth",
    "Lita", "Lyrik", "Maiya", "Makaylah", "Marlen", "Mckaylah", "Mirella", "Mykah", "Nalani", "Neela",
    "Nikole", "Nita", "Noelani", "Nour", "Nyasia", "Oakleigh", "Orly", "Orly", "Paisleigh", "Paulina",
    "Perl", "Posie", "Rashel", "Rayleen", "Reena", "Romi", "Rosabelle", "Roxie", "Roya", "Ryland",
    "Safia", "Sahar", "Saphira", "Saray", "Sevyn", "Sheena", "Shoshana", "Sirena", "Suzette", "Tayla",
    "Vivi", "Yasmina", "Yazmine", "Ysabel", "Zalika", "Zaniah", "Zanya", "Zulay", "Adrielle", "Alaiyah",
    "Alara", "Aleana", "Aleeah", "Alizah", "Alley", "Anasofia", "Annalynn", "Anyah", "Ariyana", "Aryan",
    "Aubrianna", "Aubrielle", "Audra", "Avalee", "Avalina", "Avarose", "Aveya", "Azul", "Berlyn", "Blessing",
    "Brenlee", "Briauna", "Brinlee", "Britton", "Cambrie", "Camden", "Camry", "Caprice", "Cassia", "Cecily",
    "Chana", "Chesney", "Chrissy", "Chyna", "Danae", "Danity", "Daylin", "Delylah", "Deysi", "Eloisa",
    "Elsy", "Emarie", "Emorie", "Emunah", "Esmee", "Esra", "Esthela", "Evalie", "Evianna", "Evony",
    "Fallyn", "Frieda", "Gracielle", "Greidy", "Gwenyth", "Harleen", "Havilah", "Hinda", "Ilene", "Illyana",
    "Indi", "Isadora", "Ivelisse", "Ivie", "Jalaya", "Jaleesa", "Jamia", "Janee", "Jannat", "Jannah",
    "Jaslynn", "Jazlyne", "Jeannette", "Jenae", "Jerusalem", "Jezabel", "Joann", "Jozlynn", "Kahlan", "Kailie",
    "Kaliyah", "Kameryn", "Kamilyn", "Kamorah", "Kassia", "Kayle", "Kayliegh", "Keiana", "Keirra", "Kemani",
    "Kendalyn", "Kensleigh", "Kenslie", "Keria", "Kimi", "Kimorah", "Kinzie", "Klara", "Koral", "Kynzie",
    "Kyrielle", "Laiyah", "Landri", "Latoya", "Layton", "Lelah", "Lenore", "Lillith", "Lilou", "Lively",
    "Livy", "Loralei", "Lynnea", "Lyza", "Mackenzi", "Mahima", "Malayna", "Malya", "Manal", "Mariangel",
    "Marijose", "Marylou", "Mayeli", "Mckenleigh", "Mckinnley", "Meliza", "Miel", "Mikenzie", "Miliani", "Minahil",
    "Miori",

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
