// Orphan data
const orphans = [
    { name: "Timmy", hp: 30, maxHp: 30, skill: "Troublemaker", courage: 15, resilience: 10, ascii: `
   .-"""-.
 .'     '.
:  o o  : 
: ,    ,' :
\`._  _.' 
   \`"'"" 
` },
    { name: "Lila", hp: 25, maxHp: 25, skill: "Quiet One", courage: 20, resilience: 5, ascii: `
   .-"""-.
 .' o o '.
:  ***  : 
: ,    ,' :
\`._  _.' 
   \`"'"" 
` },
    { name: "Jasper", hp: 40, maxHp: 40, skill: "Street Punk", courage: 10, resilience: 20, ascii: `
   .-"""-.
 .' *** '.
:  o o  : 
: ,*** ,' :
\`._ **_.' 
   \`"'"" 
` },
    { name: "Milo", hp: 20, maxHp: 20, skill: "Sneaky Brat", courage: 18, resilience: 8, ascii: `
   .-"""-.
 .' o o '.
:  ***  : 
: ,   ,' :
\`._  _.' 
   \`"'| 
` },
    { name: "Ella", hp: 25, maxHp: 25, skill: "Spoiled Kid", courage: 12, resilience: 15, ascii: `
   .-"""-.
 .' o o '.
:  ***  : 
: ,*** ,' :
\`._ **_.' 
   \`"'"" 
` },
    { name: "Finn", hp: 35, maxHp: 35, skill: "Scrappy", courage: 20, resilience: 10, ascii: `
   .-"""-.
 .' *** '.
:  o o  : 
: ,*** ,' :
\`._ **_.' 
   \`"'"" 
` },
    { name: "Sophie", hp: 30, maxHp: 30, skill: "Fast Feet", courage: 15, resilience: 12, ascii: `
   .-"""-.
 .' o o '.
:  ***  : 
: ,/| ,' :
\`._||_.' 
` },
    { name: "Rex", hp: 45, maxHp: 45, skill: "Muscle", courage: 25, resilience: 15, ascii: `
   .-"""-.
 .' *** '.
:  o o  : 
: ,*** ,' :
\`._ **_.' 
   \`"'"" 
    /| |\\
` },
    { name: "Tara", hp: 50, maxHp: 50, skill: "Tough Nut", courage: 10, resilience: 25, ascii: `
   .-"""-.
 .' *** '.
:  ***  : 
: ,    ,' :
\`._***_.' 
   \`"'"" 
` },
    { name: "Ned", hp: 15, maxHp: 15, skill: "Risk Taker", courage: 20, resilience: 5, ascii: `
    ___
   /   \\
  /____ \\
 |  o o | 
  \\   /
   | |
` },
    { name: "Bryn", hp: 40, maxHp: 40, skill: "Creepy Kid", courage: 22, resilience: 18, ascii: `
   .-"""-.
 .' *** '.
:  o o  : 
: ,*** ,' :
\`._ **_.' 
   \`"'"" 
    ||||
` },
    { name: "Zoe", hp: 35, maxHp: 35, skill: "Pickpocket", courage: 15, resilience: 20, ascii: `
   .-"""-.
 .' *** '.
:  o o  : 
: ,/| ,' :
\`._||_.' 
` },
    { name: "Kai", hp: 28, maxHp: 28, skill: "Acrobat", courage: 23, resilience: 10, ascii: `
    ___
   /   \\
  /____ \\
 |  o o | 
  \\  ^ /
   | - |
` }
];

// Game state
let currentOrphan = null;
let nabbedOrphans = JSON.parse(localStorage.getItem("nabbedOrphans")) || [];
let currentPage = 1;
const orphansPerPage = 5;

function explore() {
    document.getElementById("overworld").classList.add("hidden");
    document.getElementById("battle").classList.remove("hidden");

    currentOrphan = { ...orphans[Math.floor(Math.random() * orphans.length)] };
    document.getElementById("creature-name").textContent = currentOrphan.name;
    document.getElementById("creature-hp").textContent = currentOrphan.hp;
    document.getElementById("creature-image").textContent = currentOrphan.ascii;
    document.getElementById("message").textContent = "";
}

function attack() {
    if (!currentOrphan) return;

    const damage = Math.floor(Math.random() * 6) + 5;
    currentOrphan.hp -= damage;
    if (currentOrphan.hp < 0) currentOrphan.hp = 0;

    document.getElementById("creature-hp").textContent = currentOrphan.hp;
    document.getElementById("message").textContent = `You clocked a staff member for ${damage}!`;

    if (currentOrphan.hp <= 0) {
        document.getElementById("message").textContent = `${currentOrphan.name} got nabbed by the fuzz!`;
        setTimeout(resetToOverworld, 1000);
    }
}

function catchCreature() {
    if (!currentOrphan) return;

    const snagChance = Math.min(90, (1 - currentOrphan.hp / currentOrphan.maxHp) * 100);
    const roll = Math.random() * 100;

    if (roll < snagChance) {
        document.getElementById("message").textContent = `You snagged ${currentOrphan.name}!`;
        nabbedOrphans.push({
            name: currentOrphan.name,
            skill: currentOrphan.skill,
            maxHp: currentOrphan.maxHp,
            courage: currentOrphan.courage,
            resilience: currentOrphan.resilience,
            ascii: currentOrphan.ascii
        });
        saveNabbedOrphans();
        updateNabbedTable();
        setTimeout(resetToOverworld, 1000);
    } else {
        document.getElementById("message").textContent = `${currentOrphan.name} squealed and ran!`;
    }
}

function run() {
    document.getElementById("message").textContent = "You bolted before the cops showed!";
    setTimeout(resetToOverworld, 1000);
}

function resetToOverworld() {
    currentOrphan = null;
    document.getElementById("battle").classList.add("hidden");
    document.getElementById("overworld").classList.remove("hidden");
}

function updateNabbedTable() {
    const tableBody = document.getElementById("captured-list");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * orphansPerPage;
    const end = start + orphansPerPage;
    const paginatedOrphans = nabbedOrphans.slice(start, end);

    paginatedOrphans.forEach((orphan, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><pre class="ascii-mini">${orphan.ascii}</pre></td>
            <td>${orphan.name}</td>
            <td>${orphan.skill}</td>
            <td>${orphan.maxHp}</td>
            <td><button class="release-btn" onclick="dumpOrphan(${start + index})">Dump</button></td>
        `;
        tableBody.appendChild(row);
    });

    updatePagination();
}

function dumpOrphan(index) {
    nabbedOrphans.splice(index, 1);
    saveNabbedOrphans();
    updateNabbedTable();
}

function saveNabbedOrphans() {
    localStorage.setItem("nabbedOrphans", JSON.stringify(nabbedOrphans));
}

function updatePagination() {
    const totalPages = Math.ceil(nabbedOrphans.length / orphansPerPage);
    document.getElementById("page-info").textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prev-btn").disabled = currentPage === 1;
    document.getElementById("next-btn").disabled = currentPage === totalPages || totalPages === 0;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateNabbedTable();
    }
}

function nextPage() {
    const totalPages = Math.ceil(nabbedOrphans.length / orphansPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updateNabbedTable();
    }
}

// Initialize table on page load
updateNabbedTable();