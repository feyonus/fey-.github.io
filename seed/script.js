let generatedNumbers1 = [];
let generatedNumbers2 = [];

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

    outputDiv.innerHTML = `
        <div class="result ${highlightClass1}">
            <p>Seed 1: ${seedInput1}</p>
            <p>Random Numbers 1: ${generatedNumbers1.join(', ')} (Sum: ${sum1})</p>
        </div>
        <div class="result ${highlightClass2}">
            <p>Seed 2: ${seedInput2}</p>
            <p>Random Numbers 2: ${generatedNumbers2.join(', ')} (Sum: ${sum2})</p>
        </div>
        <p>Likelihood that the highlighted set has the highest sum: ${likelihood}%</p>
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
