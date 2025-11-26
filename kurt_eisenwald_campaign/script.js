document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            window.scrollTo(0, 0);
        });
    });

    if (navLinks.length > 0) {
        navLinks[0].click();
    }

    // --- Spellbook Logic ---

    // Initial Spells Data
    let spells = [
        {
            name: "Bless",
            level: "Nivå 1 Enchantment",
            time: "1 Handling",
            range: "9 meter",
            desc: "Du välsignar upp till tre varelser. De får lägga till 1d4 på attackslag och räddningskast. Koncentration, upp till 1 minut."
        },
        {
            name: "Shield of Faith",
            level: "Nivå 1 Abjuration",
            time: "1 Bonusåtgärd",
            range: "18 meter",
            desc: "Ett skimrande fält omger en varelse och ger +2 i AC. Koncentration, upp till 10 minuter."
        },
        {
            name: "Cure Wounds",
            level: "Nivå 1 Evocation",
            time: "1 Handling",
            range: "Beröring",
            desc: "En varelse du rör vid återfår 1d8 + din spellcasting modifier i kroppspoäng."
        },
        {
            name: "Command",
            level: "Nivå 1 Enchantment",
            time: "1 Handling",
            range: "18 meter",
            desc: "Du ger ett enordskommando till en varelse. Den måste lyckas med ett Visdom-räddningskast eller lyda på sin nästa tur."
        },
        {
            name: "Divine Smite",
            level: "Klassförmåga",
            time: "Ingen (Vid träff)",
            range: "Själv",
            desc: "När du träffar med en närstridsattack kan du offra en besvärjelseplats för att göra 2d8 extra strålningsskada (+1d8 om odöd/fiend)."
        }
    ];

    const spellList = document.getElementById('spell-list');
    const searchInput = document.getElementById('spell-search');
    const addSpellBtn = document.getElementById('add-spell-btn');
    const modal = document.getElementById('spell-modal');
    const closeModal = document.querySelector('.close-modal');
    const newSpellForm = document.getElementById('new-spell-form');

    // Render Spells Function
    function renderSpells(filter = "") {
        spellList.innerHTML = "";
        const filteredSpells = spells.filter(spell =>
            spell.name.toLowerCase().includes(filter.toLowerCase()) ||
            spell.desc.toLowerCase().includes(filter.toLowerCase())
        );

        filteredSpells.forEach(spell => {
            const card = document.createElement('div');
            card.className = 'spell-card';
            card.innerHTML = `
                <div class="spell-header">
                    <span class="spell-name">${spell.name}</span>
                    <span class="spell-level">${spell.level}</span>
                </div>
                <div class="spell-meta">
                    <strong>Tid:</strong> ${spell.time} | <strong>Räckvidd:</strong> ${spell.range}
                </div>
                <div class="spell-desc">${spell.desc}</div>
            `;
            spellList.appendChild(card);
        });
    }

    // Initial Render
    renderSpells();

    // Search Listener
    searchInput.addEventListener('input', (e) => {
        renderSpells(e.target.value);
    });

    // Modal Logic
    addSpellBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Add New Spell
    newSpellForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newSpell = {
            name: document.getElementById('new-spell-name').value,
            level: document.getElementById('new-spell-level').value,
            time: document.getElementById('new-spell-time').value,
            range: document.getElementById('new-spell-range').value,
            desc: document.getElementById('new-spell-desc').value
        };

        spells.push(newSpell);
        renderSpells(searchInput.value);

        newSpellForm.reset();
        modal.classList.add('hidden');
    });
});
