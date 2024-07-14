let generatedNumbers1 = [];
let generatedNumbers2 = [];
const labels = ["Strength", "Agility", "Intelligence", "Wisdom", "Charisma", "Luck", "Speed"];
const firstNames = [
    "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas",
    "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua",
    "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen",
    "Nancy", "Lisa", "Margaret", "Betty", "Sandra", "Ashley", "Dorothy", "Kimberly", "Emily", "Donna",
    "Michelle", "Carol", "Amanda", "Melissa", "Deborah", "Stephanie", "Rebecca", "Laura", "Sharon", "Cynthia",
    "Kathleen", "Amy", "Shirley", "Angela", "Helen", "Anna", "Brenda", "Pamela", "Nicole", "Emma",
    "Samantha", "Katherine", "Christine", "Debra", "Rachel", "Catherine", "Carolyn", "Janet", "Ruth", "Maria",
    "Heather", "Diane", "Virginia", "Julie", "Joyce", "Victoria", "Olivia", "Kelly", "Christina", "Lauren",
    "Joan", "Evelyn", "Judith", "Megan", "Cheryl", "Andrea", "Hannah", "Martha", "Jacqueline", "Frances",
    "Gloria", "Ann", "Teresa", "Kathryn", "Sara", "Janice", "Jean", "Alice", "Madison", "Doris"
];

const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
    "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
    "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
    "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
    "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
    "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez"
];

function generateUniqueSeed(length = 48) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateNumbers() {
    document.getElementById('message').style.display = 'none';

    const seedInput1 = document.getElementById('seed1').value || generateUniqueSeed();
    const seedInput2 = document.getElementById('seed2').value || generateUniqueSeed();
    const outputDiv = document.getElementById('output');
    
    generatedNumbers1 = generateRandomIntegers(seedInput1, 7, 1, 20);
    generatedNumbers2 = generateRandomIntegers(seedInput2, 7, 1, 20);
    
    const sum1 = generatedNumbers1.reduce((a, b) => a + b, 0);
    const sum2 = generatedNumbers2.reduce((a, b) => a + b, 0);

    const highlightClass1 = sum1 >= sum2 ? 'highlight' : '';
    const highlightClass2 = sum2 > sum1 ? 'highlight' : '';

    const likelihood = calculateLikelihood(sum1, sum2, 7, 1, 20, 10000);
    
    const name1 = generateName(seedInput1);
    const name2 = generateName(seedInput2);

    outputDiv.innerHTML = `
        <div class="result ${highlightClass1}">
            <p>Name: ${name1}<br>
            ID: ${seedInput1}</p>
            <hr>
            <p>Stats:<br>
            ${generateLabeledNumbers(generatedNumbers1).join('<br>')}
            </p>
            <!---<p>Sum: ${sum1}</p>--->
        </div>
        <div class="versus">VS</div>
        <div class="result ${highlightClass2}">
            <p>Name: ${name2}<br>
            ID: ${seedInput2}</p>
            <hr>
            <p>Stats:<br>
            ${generateLabeledNumbers(generatedNumbers2).join('<br>')}
            </p>
            <!---<p>Sum: ${sum2}</p>--->
        </div>
        <div class="outcome">Likelihood that the highlighted orphan will get adopted: ${likelihood}%</div>
    `;
}

function generateRandomIntegers(seed, count, min, max) {
    const random = seedrandom(seed);
    const numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(random() * (max - min + 1)) + min);
    }
    return numbers;
}

function generateLabeledNumbers(numbers) {
    return numbers.map((num, index) => `${labels[index]}: ${num}`);
}

function calculateLikelihood(sum1, sum2, count, min, max, iterations) {
    let higherSumCount = 0;
    for (let i = 0; i < iterations; i++) {
        const randomNumbers = Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
        const randomSum = randomNumbers.reduce((a, b) => a + b, 0);
        if (randomSum <= Math.max(sum1, sum2)) {
            higherSumCount++;
        }
    }
    return ((higherSumCount / iterations) * 100).toFixed(2);
}

function generateName(seed) {
    const random = seedrandom(seed);
    const firstName = firstNames[Math.floor(random() * firstNames.length)];
    const lastName = lastNames[Math.floor(random() * lastNames.length)];
    return `${firstName} ${lastName}`;
}

// Simple seed-based random number generator
// Using the Alea algorithm for demonstration purposes
function seedrandom(seed) {
    let s = 0, s1 = 0, s2 = 0, c = 1;
    let mash = Mash();
    s = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');
    s = mash(seed);
    s1 = mash(seed);
    s2 = mash(seed);
    return function() {
        let t = 2091639 * s + c * 2.3283064365386963e-10; // 2^-32
        s = s1;
        s1 = s2;
        return s2 = t - (c = t | 0);
    };
}

function Mash() {
    let n = 0xefc8249d;
    return function(data) {
        data = data.toString();
        for (let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            let h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000; // 2^32
        }
        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };
}
