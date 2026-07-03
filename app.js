/* ==========================================================================
   Public Grievance Portal - Core Application Logic
   ========================================================================== */

// 1. Core Data Structures & Mock Database Initialization
const CONFIG = {
    stations: [
        { id: "st-kotwali", nameEn: "Thana Kotwali", nameHi: "थाना कोतवाली" },
        { id: "st-cantt", nameEn: "Thana Cantt", nameHi: "थाना कैंट" },
        { id: "st-civillines", nameEn: "Thana Civil Lines", nameHi: "थाना सिविल लाइंस" }
    ],
    ios: [
        { id: "io-amit", stationId: "st-kotwali", nameEn: "Inspector Amit Kumar", nameHi: "इंस्पेक्टर अमित कुमार" },
        { id: "io-rajesh", stationId: "st-kotwali", nameEn: "Sub-Inspector Rajesh Singh", nameHi: "सब-इंस्पेक्टर राजेश सिंह" },
        { id: "io-sanjay", stationId: "st-cantt", nameEn: "Sub-Inspector Sanjay Sharma", nameHi: "सब-इंस्पेक्टर संजय शर्मा" },
        { id: "io-sunita", stationId: "st-cantt", nameEn: "Sub-Inspector Sunita Yadav", nameHi: "सब-इंस्पेक्टर सुनीता यादव" },
        { id: "io-vikram", stationId: "st-civillines", nameEn: "Inspector Vikram Adhana", nameHi: "इंस्पेक्टर विक्रम अधाना" },
        { id: "io-preeti", stationId: "st-civillines", nameEn: "Sub-Inspector Preeti Mishra", nameHi: "सब-इंस्पेक्टर प्रीति मिश्रा" }
    ]
};

// Initial Mock Grievances to seed localStorage
const SEED_GRIEVANCES = [
    {
        id: "GP-2026-0001",
        citizenName: "Rohan Varma",
        citizenPhone: "9876543210",
        citizenEmail: "rohan@gmail.com",
        title: "Mobile snatching near market",
        description: "Two boys on a black motorcycle snatched my phone while I was walking home near the main market road.",
        category: "Theft / चोरी",
        stationId: "st-kotwali",
        dateFiled: "2026-06-15T10:30",
        incidentDate: "2026-06-15T09:15",
        status: "Pending",
        timeline: [
            { titleEn: "Grievance Filed", titleHi: "शिकायत दर्ज की गई", descEn: "Complaint registered successfully on portal.", descHi: "शिकायत पोर्टल पर सफलतापूर्वक दर्ज की गई।", date: "2026-06-15 10:30" }
        ],
        assignedIO: null,
        assignmentInstructions: "",
        investigationReport: "",
        citizenFeedback: null
    },
    {
        id: "GP-2026-0002",
        citizenName: "Preeti Sharma",
        citizenPhone: "9123456789",
        citizenEmail: "preeti@yahoo.com",
        title: "Online bank fraud of ₹50,000",
        description: "Received a fake call claiming to be bank manager. Shared OTP and lost fifty thousand rupees from credit card.",
        category: "Cyber Crime / साइबर अपराध",
        stationId: "st-cantt",
        dateFiled: "2026-06-18T14:20",
        incidentDate: "2026-06-17T18:00",
        status: "Assigned",
        timeline: [
            { titleEn: "Grievance Filed", titleHi: "शिकायत दर्ज की गई", descEn: "Complaint registered successfully.", descHi: "शिकायत सफलतापूर्वक दर्ज की गई।", date: "2026-06-18 14:20" },
            { titleEn: "Assigned to IO", titleHi: "जाँच अधिकारी आवंटित", descEn: "Assigned to Sub-Inspector Sanjay Sharma for investigation.", descHi: "जाँच हेतु सब-इंस्पेक्टर संजय शर्मा को आवंटित किया गया।", date: "2026-06-19 11:00" }
        ],
        assignedIO: "io-sanjay",
        assignmentInstructions: "Trace the bank transaction details and IP address coordinates immediately.",
        investigationReport: "",
        citizenFeedback: null
    },
    {
        id: "GP-2026-0003",
        citizenName: "Mahesh Yadav",
        citizenPhone: "8888877777",
        citizenEmail: "",
        title: "Land boundary dispute and physical clash",
        description: "Neighbor crossed the boundary fence and attacked our workers. Minor injuries reported.",
        category: "Physical Assault / मारपीट",
        stationId: "st-civillines",
        dateFiled: "2026-06-20T11:00",
        incidentDate: "2026-06-20T08:30",
        status: "Investigating",
        timeline: [
            { titleEn: "Grievance Filed", titleHi: "शिकायत दर्ज की गई", descEn: "Complaint registered successfully.", descHi: "शिकायत सफलतापूर्वक दर्ज की गई।", date: "2026-06-20 11:00" },
            { titleEn: "Assigned to IO", titleHi: "जाँच अधिकारी आवंटित", descEn: "Assigned to Sub-Inspector Preeti Mishra.", descHi: "जाँच हेतु सब-इंस्पेक्टर प्रीति मिश्रा को आवंटित।", date: "2026-06-20 15:30" },
            { titleEn: "Investigation Started", titleHi: "जाँच प्रारम्भ की गई", descEn: "IO visited the physical spot and took statements.", descHi: "जाँच अधिकारी ने घटना स्थल का दौरा किया और बयान दर्ज किए।", date: "2026-06-21 10:00" }
        ],
        assignedIO: "io-preeti",
        assignmentInstructions: "Visit physical location and check boundary maps.",
        investigationReport: "",
        citizenFeedback: null
    },
    {
        id: "GP-2026-0004",
        citizenName: "Gopal Prasad",
        citizenPhone: "9999911111",
        citizenEmail: "gopal@outlook.com",
        title: "14-year old son missing since yesterday",
        description: "My son went to coaching class yesterday at 4 PM and hasn't returned since. Checked with friends and relatives.",
        category: "Missing Person / गुमशुदगी",
        stationId: "st-kotwali",
        dateFiled: "2026-06-22T08:15",
        incidentDate: "2026-06-21T16:00",
        status: "Report Submitted",
        timeline: [
            { titleEn: "Grievance Filed", titleHi: "शिकायत दर्ज की गई", descEn: "Complaint registered successfully.", descHi: "शिकायत सफलतापूर्वक दर्ज की गई।", date: "2026-06-22 08:15" },
            { titleEn: "Assigned to IO", titleHi: "जाँच अधिकारी आवंटित", descEn: "Assigned to Sub-Inspector Rajesh Singh.", descHi: "जाँच हेतु सब-इंस्पेक्टर राजेश सिंह को आवंटित।", date: "2026-06-22 09:30" },
            { titleEn: "Investigation Started", titleHi: "जाँच प्रारम्भ की गई", descEn: "Alert broadcasted to nearby railway station and checkposts.", descHi: "रेलवे स्टेशनों और चौकियों पर अलर्ट प्रसारित किया गया।", date: "2026-06-22 10:30" },
            { titleEn: "Report Submitted", titleHi: "जाँच रिपोर्ट प्रेषित", descEn: "Boy found at relative's house in Lucknow and brought back to parents.", descHi: "लड़का लखनऊ में रिश्तेदार के यहाँ सुरक्षित पाया गया और माता-पिता को सौंपा गया। जाँच रिपोर्ट सबमिट की गई।", date: "2026-06-24 16:30" }
        ],
        assignedIO: "io-rajesh",
        assignmentInstructions: "Review CCTV camera footage around coaching center.",
        investigationReport: "Child traced at relative's place in Lucknow. Safely retrieved and reunited with parents. Statements taken from child and parents. Recommended for closing.",
        citizenFeedback: null
    },
    {
        id: "GP-2026-0005",
        citizenName: "Sunita Devi",
        citizenPhone: "7777722222",
        citizenEmail: "",
        title: "Eve-teasing near college bus stop",
        description: "Group of local boys passing abusive remarks daily at girls standing near canteen bus stop around 2 PM.",
        category: "Harassment / उत्पीड़न",
        stationId: "st-cantt",
        dateFiled: "2026-06-24T16:00",
        incidentDate: "2026-06-24T14:00",
        status: "Resolved",
        timeline: [
            { titleEn: "Grievance Filed", titleHi: "शिकायत दर्ज की गई", descEn: "Complaint registered.", descHi: "शिकायत दर्ज की गई।", date: "2026-06-24 16:00" },
            { titleEn: "Assigned to IO", titleHi: "जाँच अधिकारी आवंटित", descEn: "Assigned to Sub-Inspector Sunita Yadav.", descHi: "जाँच हेतु सब-इंस्पेक्टर सुनीता यादव को आवंटित।", date: "2026-06-24 17:00" },
            { titleEn: "Investigation Started", titleHi: "जाँच प्रारम्भ की गई", descEn: "IO deployed in plain clothes at spot.", descHi: "सादे कपड़ों में बल तैनात कर निगरानी की गई।", date: "2026-06-25 13:45" },
            { titleEn: "Report Submitted", titleHi: "जाँच रिपोर्ट प्रेषित", descEn: "Warned the boys in presence of their parents. Security increased.", descHi: "लड़कों के माता-पिता की उपस्थिति में उन्हें चेतावनी दी गई। क्षेत्र में गश्त बढ़ाई गई।", date: "2026-06-26 12:00" },
            { titleEn: "Resolved & Closed", titleHi: "शिकायत निस्तारित एवं बंद", descEn: "Police Station closed grievance based on citizen satisfaction.", descHi: "थाने द्वारा शिकायतकर्ता की संतुष्टि पर प्रकरण बंद किया गया।", date: "2026-06-26 15:30" }
        ],
        assignedIO: "io-sunita",
        assignmentInstructions: "Deploy police patrol van during college dispersal hours.",
        investigationReport: "Patrol car deployed. Addressed group of local boys, warning letters signed in presence of parents. The situation is resolved and college girls confirm zero harassment now.",
        citizenFeedback: { rating: 5, comments: "Excellent quick action! Thank you to the Cantt Police team." }
    }
];

// Global variables for active sessions
let grievances = [];
let currentSession = { role: 'guest', id: null, details: null };
let currentLanguage = 'en';
let chartInstanceStation = null;
let chartInstanceCategory = null;

// Initialize app on page load
window.onload = function() {
    initDatabase();
    loadLanguageSelection();
    setupDropdownSelections();
    // Default show login screen
    handleLogout();
};

// Seeding localStorage
function initDatabase() {
    if (!localStorage.getItem('grievance_db')) {
        localStorage.setItem('grievance_db', JSON.stringify(SEED_GRIEVANCES));
        grievances = SEED_GRIEVANCES;
    } else {
        grievances = JSON.parse(localStorage.getItem('grievance_db'));
    }
}

function saveDatabase() {
    localStorage.setItem('grievance_db', JSON.stringify(grievances));
}

// 2. Language & Bilingual Interface Management
function loadLanguageSelection() {
    const storedLang = localStorage.getItem('portal_lang');
    if (storedLang) {
        currentLanguage = storedLang;
    }
    applyLanguage(currentLanguage);
}

function toggleLanguage() {
    currentLanguage = (currentLanguage === 'en') ? 'hi' : 'en';
    localStorage.setItem('portal_lang', currentLanguage);
    applyLanguage(currentLanguage);
}

function applyLanguage(lang) {
    // Dynamic text toggles across all elements with data-en/data-hi
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });

    // Update form placeholders
    const placeHolders = {
        en: {
            citizenPhone: "Enter 10-digit mobile",
            shoPassword: "••••••••",
            ioPassword: "••••••••",
            spPassword: "••••••••",
            compName: "E.g., Ramesh Kumar",
            compEmail: "E.g., name@example.com",
            compTitle: "Short description of incident",
            compDesc: "Provide complete facts about the case...",
            assignInstructions: "Enter directions or focus area for this investigation...",
            ioReportDetail: "Provide summary of findings, statement copies verified, actions taken...",
            feedbackComments: "Share your experience regarding time taken, behaviors or outcome...",
            spSearchInput: "Search by Complaint ID or Name..."
        },
        hi: {
            citizenPhone: "10 अंकों का मोबाइल नंबर डालें",
            shoPassword: "••••••••",
            ioPassword: "••••••••",
            spPassword: "••••••••",
            compName: "जैसे: रमेश कुमार",
            compEmail: "जैसे: name@example.com",
            compTitle: "घटना का संक्षिप्त विवरण",
            compDesc: "घटना के संबंध में सभी आवश्यक तथ्य लिखें...",
            assignInstructions: "जाँच हेतु आवश्यक निर्देश यहाँ लिखें...",
            ioReportDetail: "जाँच के मुख्य बिंदु, दर्ज किए गए बयान एवं कार्यवाही का विवरण...",
            feedbackComments: "जाँच में लगा समय, पुलिस के व्यवहार और परिणाम पर अपनी प्रतिक्रिया दें...",
            spSearchInput: "शिकायत सं० या शिकायतकर्ता का नाम खोजें..."
        }
    };

    Object.keys(placeHolders[lang]).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.setAttribute('placeholder', placeHolders[lang][id]);
    });

    // Update select option tags (especially category tags)
    document.querySelectorAll('#compCategory option').forEach(opt => {
        opt.innerText = opt.getAttribute(`data-${lang}`);
    });

    // Dynamic Title Header Updates
    const titleHeader = document.getElementById('header-title');
    const subtitleHeader = document.getElementById('header-subtitle');
    if (lang === 'en') {
        titleHeader.innerText = "UP POLICE PUBLIC GRIEVANCE PORTAL";
        subtitleHeader.innerText = "Grievance Redressal and Monitoring System";
    } else {
        titleHeader.innerText = "उत्तर प्रदेश पुलिस जनशिकायत पोर्टल";
        subtitleHeader.innerText = "जनशिकायत निवारण एवं अनुश्रवण प्रणाली";
    }

    // Refresh UI dashboards if user is logged in to match current lang
    if (currentSession.role === 'citizen') renderCitizenDashboard();
    if (currentSession.role === 'sho') renderSHODashboard();
    if (currentSession.role === 'io') renderIODashboard();
    if (currentSession.role === 'sp') renderSPDashboard();
}

function getTxt(enVal, hiVal) {
    return currentLanguage === 'en' ? enVal : hiVal;
}

// 3. UI Routing & Dropdown Setup
function setupDropdownSelections() {
    // Populate Police Stations
    const compStationSelect = document.getElementById('compStation');
    const shoStationSelect = document.getElementById('shoStationSelect');
    
    compStationSelect.innerHTML = '';
    shoStationSelect.innerHTML = '';

    CONFIG.stations.forEach(station => {
        const text = `${station.nameEn} / ${station.nameHi}`;
        
        const opt1 = document.createElement('option');
        opt1.value = station.id;
        opt1.innerText = text;
        compStationSelect.appendChild(opt1);

        const opt2 = document.createElement('option');
        opt2.value = station.id;
        opt2.innerText = text;
        shoStationSelect.appendChild(opt2);
    });

    // Populate IO Dropdown
    const ioSelect = document.getElementById('ioSelect');
    ioSelect.innerHTML = '';
    CONFIG.ios.forEach(io => {
        const station = CONFIG.stations.find(s => s.id === io.stationId);
        const opt = document.createElement('option');
        opt.value = io.id;
        opt.innerText = `${io.nameEn} (${station.nameEn})`;
        ioSelect.appendChild(opt);
    });
}

function showLoginForm(role) {
    document.getElementById('loginFormsWrapper').classList.remove('d-none');
    
    // Hide all forms first
    document.getElementById('citizenLoginForm').classList.add('d-none');
    document.getElementById('shoLoginForm').classList.add('d-none');
    document.getElementById('ioLoginForm').classList.add('d-none');
    document.getElementById('spLoginForm').classList.add('d-none');

    // Show correct form
    document.getElementById(`${role}LoginForm`).classList.remove('d-none');

    // Scroll to form smoothly
    document.getElementById('loginFormsWrapper').scrollIntoView({ behavior: 'smooth' });
}

function hideLoginForm() {
    document.getElementById('loginFormsWrapper').classList.add('d-none');
}

// 4. Session Controls (Login & Logout)
function loginAsCitizen() {
    const phone = document.getElementById('citizenPhone').value.trim();
    if (phone.length < 10) {
        alert(getTxt("Please enter a valid 10-digit mobile number.", "कृपया वैध 10-अंकीय मोबाइल नंबर डालें।"));
        return;
    }
    
    currentSession = { role: 'citizen', id: phone, details: { phone: phone } };
    afterLoginSuccess();
}

function loginAsSHO() {
    const stationId = document.getElementById('shoStationSelect').value;
    const password = document.getElementById('shoPassword').value;
    
    if (password !== 'admin123') {
        alert(getTxt("Incorrect password. Use 'admin123' for testing.", "गलत पासवर्ड। परीक्षण हेतु 'admin123' का उपयोग करें।"));
        return;
    }

    const station = CONFIG.stations.find(s => s.id === stationId);
    currentSession = { role: 'sho', id: stationId, details: station };
    afterLoginSuccess();
}

function loginAsIO() {
    const ioId = document.getElementById('ioSelect').value;
    const password = document.getElementById('ioPassword').value;

    if (password !== 'io123') {
        alert(getTxt("Incorrect password. Use 'io123' for testing.", "गलत पासवर्ड। परीक्षण हेतु 'io123' का उपयोग करें।"));
        return;
    }

    const io = CONFIG.ios.find(i => i.id === ioId);
    currentSession = { role: 'io', id: ioId, details: io };
    afterLoginSuccess();
}

function loginAsSP() {
    const username = document.getElementById('spUsername').value.trim();
    const password = document.getElementById('spPassword').value;

    if (username !== 'sp_district' || password !== 'sp123') {
        alert(getTxt("Incorrect credentials. Use username 'sp_district' and password 'sp123'.", "गलत क्रेडेंशियल्स। यूज़रनेम 'sp_district' और पासवर्ड 'sp123' का उपयोग करें।"));
        return;
    }

    currentSession = { role: 'sp', id: 'sp', details: { name: 'Superintendent of Police' } };
    afterLoginSuccess();
}

function quickLogin(role) {
    if (role === 'citizen') {
        currentSession = { role: 'citizen', id: '9876543210', details: { phone: '9876543210' } };
    } else if (role === 'sho') {
        currentSession = { role: 'sho', id: 'st-kotwali', details: CONFIG.stations.find(s => s.id === 'st-kotwali') };
    } else if (role === 'io') {
        currentSession = { role: 'io', id: 'io-amit', details: CONFIG.ios.find(i => i.id === 'io-amit') };
    } else if (role === 'sp') {
        currentSession = { role: 'sp', id: 'sp', details: { name: 'Superintendent of Police' } };
    }
    afterLoginSuccess();
}

function afterLoginSuccess() {
    // Hide login panel
    document.getElementById('loginSection').classList.add('d-none');
    hideLoginForm();

    // Show navbar elements
    document.getElementById('userProfileTag').classList.remove('d-none');
    document.getElementById('logoutBtn').classList.remove('d-none');

    // Update Profile Tag Text
    const profileText = document.getElementById('profileRoleText');
    if (currentSession.role === 'citizen') {
        profileText.innerText = getTxt(`Citizen: ${currentSession.id}`, `नागरिक: ${currentSession.id}`);
        showCitizenSection('lodge');
        document.getElementById('citizenDashboard').classList.remove('d-none');
        renderCitizenDashboard();
    } else if (currentSession.role === 'sho') {
        profileText.innerText = getTxt(`SHO: ${currentSession.details.nameEn}`, `थाना प्रभारी: ${currentSession.details.nameHi}`);
        document.getElementById('shoDashboard').classList.remove('d-none');
        renderSHODashboard();
    } else if (currentSession.role === 'io') {
        profileText.innerText = getTxt(`IO: ${currentSession.details.nameEn}`, `जाँच अधिकारी: ${currentSession.details.nameHi}`);
        document.getElementById('ioDashboard').classList.remove('d-none');
        renderIODashboard();
    } else if (currentSession.role === 'sp') {
        profileText.innerText = getTxt("Superintendent of Police", "पुलिस अधीक्षक");
        document.getElementById('spDashboard').classList.remove('d-none');
        renderSPDashboard();
    }
}

function handleLogout() {
    currentSession = { role: 'guest', id: null, details: null };
    
    // Hide all dashboards
    document.getElementById('citizenDashboard').classList.add('d-none');
    document.getElementById('shoDashboard').classList.add('d-none');
    document.getElementById('ioDashboard').classList.add('d-none');
    document.getElementById('spDashboard').classList.add('d-none');

    // Hide navbar elements
    document.getElementById('userProfileTag').classList.add('d-none');
    document.getElementById('logoutBtn').classList.add('d-none');

    // Show login section
    document.getElementById('loginSection').classList.remove('d-none');
    
    // Clear login inputs
    document.getElementById('citizenPhone').value = '';
    document.getElementById('shoPassword').value = 'admin123';
    document.getElementById('ioPassword').value = 'io123';
    document.getElementById('spPassword').value = 'sp123';
}

// 5. Citizen Dashboard Logics
function showCitizenSection(section) {
    if (section === 'lodge') {
        document.getElementById('citizenLodgePanel').classList.remove('d-none');
        document.getElementById('citizenListPanel').classList.add('d-none');
    } else {
        document.getElementById('citizenLodgePanel').classList.add('d-none');
        document.getElementById('citizenListPanel').classList.remove('d-none');
        renderCitizenDashboard();
    }
}

function submitGrievance() {
    const name = document.getElementById('compName').value.trim();
    const email = document.getElementById('compEmail').value.trim();
    const stationId = document.getElementById('compStation').value;
    const category = document.getElementById('compCategory').value;
    const title = document.getElementById('compTitle').value.trim();
    const date = document.getElementById('compDate').value;
    const desc = document.getElementById('compDesc').value.trim();

    if (!name || !title || !date || !desc) {
        alert(getTxt("Please fill in all required fields.", "कृपया सभी आवश्यक क्षेत्रों को भरें।"));
        return;
    }

    // Generate unique complaint ID
    const count = grievances.length + 1;
    const complaintId = `GP-2026-${String(count).padStart(4, '0')}`;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newComplaint = {
        id: complaintId,
        citizenName: name,
        citizenPhone: currentSession.id,
        citizenEmail: email,
        title: title,
        description: desc,
        category: category,
        stationId: stationId,
        dateFiled: timestamp,
        incidentDate: date,
        status: "Pending",
        timeline: [
            { 
                titleEn: "Grievance Filed", 
                titleHi: "शिकायत दर्ज की गई", 
                descEn: "Complaint registered successfully on portal.", 
                descHi: "शिकायत पोर्टल पर सफलतापूर्वक दर्ज की गई।", 
                date: timestamp 
            }
        ],
        assignedIO: null,
        assignmentInstructions: "",
        investigationReport: "",
        citizenFeedback: null
    };

    grievances.push(newComplaint);
    saveDatabase();
    
    alert(getTxt(`Grievance submitted successfully! Complaint ID: ${complaintId}`, `शिकायत सफलतापूर्वक दर्ज की गई! शिकायत संख्या: ${complaintId}`));
    
    // Clear inputs
    document.getElementById('compName').value = '';
    document.getElementById('compEmail').value = '';
    document.getElementById('compTitle').value = '';
    document.getElementById('compDate').value = '';
    document.getElementById('compDesc').value = '';
    document.getElementById('compFile').value = '';

    // Switch to tracker tab
    showCitizenSection('list');
}

function renderCitizenDashboard() {
    const listContainer = document.getElementById('citizenGrievanceList');
    listContainer.innerHTML = '';
    
    // Filter complaints registered by current citizen
    const myGrievances = grievances.filter(g => g.citizenPhone === currentSession.id);

    if (myGrievances.length === 0) {
        listContainer.innerHTML = `<div class="text-center text-muted py-4">${getTxt("No complaints registered yet.", "अभी तक कोई शिकायत दर्ज नहीं की गई है।")}</div>`;
        return;
    }

    myGrievances.forEach(g => {
        const item = document.createElement('div');
        item.style.padding = '1rem';
        item.style.border = '1px solid var(--border-color)';
        item.style.borderRadius = 'var(--radius-sm)';
        item.style.marginBottom = '1rem';
        item.style.backgroundColor = '#ffffff';
        item.style.cursor = 'pointer';
        item.style.transition = 'var(--transition)';
        
        const statusBadge = getStatusBadgeHtml(g.status);
        const station = CONFIG.stations.find(s => s.id === g.stationId);
        const stationName = getTxt(station.nameEn, station.nameHi);

        item.innerHTML = `
            <div class="d-flex justify-between align-center mb-4">
                <strong>${g.id}</strong>
                ${statusBadge}
            </div>
            <div style="font-size: 0.9rem; font-weight: 600; margin-bottom: 0.25rem;">${g.title}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">
                <i class="fa-solid fa-building"></i> ${stationName} | <i class="fa-solid fa-clock"></i> ${g.dateFiled}
            </div>
        `;

        item.onclick = () => showGrievanceTimeline(g.id);
        listContainer.appendChild(item);
    });
}

function showGrievanceTimeline(grievanceId) {
    document.getElementById('timelineFallbackText').classList.add('d-none');
    const stepper = document.getElementById('timelineStepper');
    stepper.innerHTML = '';
    stepper.classList.remove('d-none');

    const g = grievances.find(x => x.id === grievanceId);
    if (!g) return;

    // Head details
    const headerDiv = document.createElement('div');
    headerDiv.className = 'mb-4';
    headerDiv.style.borderBottom = '1px dashed var(--border-color)';
    headerDiv.style.paddingBottom = '1rem';
    
    const station = CONFIG.stations.find(s => s.id === g.stationId);
    const stationName = getTxt(station.nameEn, station.nameHi);

    headerDiv.innerHTML = `
        <h4 style="font-size: 1.1rem; color: var(--primary-color); margin-bottom: 0.25rem;">${g.id}: ${g.title}</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
            <strong>${getTxt("Category", "श्रेणी")}:</strong> ${g.category} <br>
            <strong>${getTxt("Concerned Police Station", "सम्बन्धित थाना")}:</strong> ${stationName}
        </p>
        <p class="mt-4" style="font-size: 0.88rem;">${g.description}</p>
    `;
    stepper.appendChild(headerDiv);

    // Build timeline items
    g.timeline.forEach((step, idx) => {
        const item = document.createElement('div');
        item.className = `timeline-item ${idx === g.timeline.length - 1 ? 'active' : 'completed'}`;
        
        const titleText = getTxt(step.titleEn, step.titleHi);
        const descText = getTxt(step.descEn, step.descHi);

        item.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-title">
                    <span>${titleText}</span>
                    <span class="timeline-date">${step.date}</span>
                </div>
                <div class="timeline-desc">${descText}</div>
            </div>
        `;
        stepper.appendChild(item);
    });

    // If case is resolved, render feedback options
    if (g.status === 'Resolved') {
        const fbDiv = document.createElement('div');
        fbDiv.className = 'mt-4 text-center';
        
        if (g.citizenFeedback) {
            // Feedback already submitted
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += `<i class="fa-solid fa-star" style="color: var(--accent-color);"></i>`;
            }
            fbDiv.innerHTML = `
                <div style="background: rgba(5, 150, 105, 0.05); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--status-resolved-text);">
                    <h5 style="color: var(--status-resolved-text); margin-bottom: 0.5rem;"><i class="fa-solid fa-circle-check"></i> ${getTxt("Feedback Registered", "फीडबैक दर्ज है")}</h5>
                    <div class="mb-4">${stars}</div>
                    <p style="font-size: 0.85rem; font-style: italic; color: var(--text-muted);">"${g.citizenFeedback.comments}"</p>
                </div>
            `;
        } else {
            // Action button to provide feedback
            fbDiv.innerHTML = `
                <button class="btn btn-accent btn-inline" onclick="openFeedbackModal('${g.id}')">
                    <i class="fa-solid fa-star-half-stroke"></i> <span data-en="Provide Resolution Feedback" data-hi="निवारण गुणवत्ता फीडबैक दें">Provide Resolution Feedback</span>
                </button>
            `;
        }
        stepper.appendChild(fbDiv);
    }
}

// Star rating triggers in Feedback Modal
function openFeedbackModal(gid) {
    document.getElementById('feedbackModalGrievanceId').value = gid;
    rateStar(5); // default
    document.getElementById('feedbackComments').value = '';
    openModal('feedbackModal');
}

function rateStar(num) {
    document.getElementById('feedbackRatingValue').value = num;
    const stars = document.querySelectorAll('.star-btn');
    stars.forEach((star, index) => {
        if (index < num) {
            star.className = 'fa-solid fa-star star-btn';
        } else {
            star.className = 'fa-regular fa-star star-btn';
        }
    });
}

function submitCitizenFeedback() {
    const gid = document.getElementById('feedbackModalGrievanceId').value;
    const rating = parseInt(document.getElementById('feedbackRatingValue').value);
    const comments = document.getElementById('feedbackComments').value.trim();

    const g = grievances.find(x => x.id === gid);
    if (g) {
        g.citizenFeedback = { rating: rating, comments: comments };
        saveDatabase();
        closeModal('feedbackModal');
        alert(getTxt("Thank you for your valuable feedback!", "फीडबैक देने के लिए आपका धन्यवाद!"));
        showGrievanceTimeline(gid);
    }
}


// 6. SHO Dashboard Logic
function renderSHODashboard() {
    const stationId = currentSession.id;
    const stationGrievances = grievances.filter(g => g.stationId === stationId);

    // Calculate SHO specific stats
    const stats = {
        total: stationGrievances.length,
        pending: stationGrievances.filter(g => g.status === 'Pending').length,
        assigned: stationGrievances.filter(g => g.status === 'Assigned' || g.status === 'Investigating').length,
        resolved: stationGrievances.filter(g => g.status === 'Resolved').length
    };

    // Render Stats
    const statsContainer = document.getElementById('shoStatsContainer');
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-details">
                <h4 data-en="Total Received" data-hi="कुल प्राप्त शिकायतें">Total Received</h4>
                <div class="value">${stats.total}</div>
            </div>
            <i class="fa-solid fa-folder-open stat-icon"></i>
        </div>
        <div class="stat-card stat-pending">
            <div class="stat-details">
                <h4 data-en="Awaiting Assignment" data-hi="आवंटन हेतु लंबित">Awaiting Assignment</h4>
                <div class="value">${stats.pending}</div>
            </div>
            <i class="fa-solid fa-user-clock stat-icon"></i>
        </div>
        <div class="stat-card stat-investigating">
            <div class="stat-details">
                <h4 data-en="Active Investigation" data-hi="जांच के अधीन">Active Investigation</h4>
                <div class="value">${stats.assigned}</div>
            </div>
            <i class="fa-solid fa-spinner stat-icon fa-spin-pulse"></i>
        </div>
        <div class="stat-card stat-resolved">
            <div class="stat-details">
                <h4 data-en="Resolved Cases" data-hi="निस्तारित मामले">Resolved Cases</h4>
                <div class="value">${stats.resolved}</div>
            </div>
            <i class="fa-solid fa-circle-check stat-icon"></i>
        </div>
    `;

    document.getElementById('shoStationTitle').innerText = getTxt(currentSession.details.nameEn, currentSession.details.nameHi);

    // Table rows
    const tbody = document.getElementById('shoTableBody');
    tbody.innerHTML = '';

    if (stationGrievances.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">${getTxt("No complaints registered under this police station.", "इस थाने के अंतर्गत कोई शिकायत दर्ज नहीं है।")}</td></tr>`;
        return;
    }

    stationGrievances.forEach(g => {
        const tr = document.createElement('tr');
        
        let ioText = `<span class="text-muted">${getTxt("Not Assigned", "आवंटित नहीं")}</span>`;
        if (g.assignedIO) {
            const ioObj = CONFIG.ios.find(i => i.id === g.assignedIO);
            if (ioObj) ioText = getTxt(ioObj.nameEn, ioObj.nameHi);
        }

        let actionButtons = '';
        if (g.status === 'Pending') {
            actionButtons = `
                <button class="btn btn-accent btn-inline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="openIOAssignModal('${g.id}')">
                    <i class="fa-solid fa-user-plus"></i> <span data-en="Assign IO" data-hi="IO आवंटित करें">Assign IO</span>
                </button>
            `;
        } else if (g.status === 'Report Submitted') {
            actionButtons = `
                <button class="btn btn-primary btn-inline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="openReviewCloseModal('${g.id}')">
                    <i class="fa-solid fa-stamp"></i> <span data-en="Review & Close" data-hi="समीक्षा एवं बंद करें">Review & Close</span>
                </button>
            `;
        } else {
            actionButtons = `
                <button class="btn btn-outline btn-inline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="viewGrievanceDetails('${g.id}')">
                    <i class="fa-solid fa-eye"></i> <span data-en="View Logs" data-hi="विवरण देखें">View Details</span>
                </button>
            `;
        }

        const badgeHtml = getStatusBadgeHtml(g.status);

        tr.innerHTML = `
            <td><strong>${g.id}</strong></td>
            <td>
                <div style="font-weight: 600;">${g.citizenName}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${g.citizenPhone}</div>
            </td>
            <td>
                <div style="font-weight: 500;">${g.title}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${g.category}</div>
            </td>
            <td>${g.dateFiled}</td>
            <td>${badgeHtml}</td>
            <td>${ioText}</td>
            <td><div class="d-flex gap-2">${actionButtons}</div></td>
        `;

        tbody.appendChild(tr);
    });
}

function openIOAssignModal(gid) {
    document.getElementById('assignModalGrievanceId').value = gid;
    
    // Populate modal select only with IOs corresponding to the SHO's station
    const assignSelect = document.getElementById('assignSelectIO');
    assignSelect.innerHTML = '';
    
    const stationIOs = CONFIG.ios.filter(i => i.stationId === currentSession.id);
    stationIOs.forEach(io => {
        const opt = document.createElement('option');
        opt.value = io.id;
        opt.innerText = getTxt(io.nameEn, io.nameHi);
        assignSelect.appendChild(opt);
    });

    document.getElementById('assignInstructions').value = '';
    openModal('assignIOModal');
}

function submitIOAssignment() {
    const gid = document.getElementById('assignModalGrievanceId').value;
    const ioId = document.getElementById('assignSelectIO').value;
    const notes = document.getElementById('assignInstructions').value.trim();

    if (!ioId) {
        alert(getTxt("Please select an Investigating Officer.", "कृपया जाँच अधिकारी का चयन करें।"));
        return;
    }

    const g = grievances.find(x => x.id === gid);
    if (g) {
        g.status = "Assigned";
        g.assignedIO = ioId;
        g.assignmentInstructions = notes;
        
        const ioObj = CONFIG.ios.find(i => i.id === ioId);
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
        
        g.timeline.push({
            titleEn: "Assigned to IO",
            titleHi: "जाँच अधिकारी आवंटित",
            descEn: `Assigned to ${ioObj.nameEn} for investigation. Notes: ${notes || 'None'}`,
            descHi: `जाँच हेतु ${ioObj.nameHi} को आवंटित किया गया। निर्देश: ${notes || 'कोई नहीं'}`,
            date: timestamp
        });

        saveDatabase();
        closeModal('assignIOModal');
        alert(getTxt("Grievance successfully assigned to IO.", "शिकायत सफलतापूर्वक जाँच अधिकारी को आवंटित की गई।"));
        renderSHODashboard();
    }
}

function openReviewCloseModal(gid) {
    const g = grievances.find(x => x.id === gid);
    if (!g) return;

    const ioObj = CONFIG.ios.find(i => i.id === g.assignedIO);
    const ioName = ioObj ? getTxt(ioObj.nameEn, ioObj.nameHi) : 'IO';

    const modalTitle = document.getElementById('detailsModalTitle');
    const modalBody = document.getElementById('detailsModalBody');

    modalTitle.innerText = getTxt(`Review Investigation & Resolve: ${g.id}`, `जाँच रिपोर्ट समीक्षा एवं निस्तारण: ${g.id}`);
    
    modalBody.innerHTML = `
        <div class="detail-grid">
            <div class="detail-sidebar">
                <div class="detail-label">${getTxt("Citizen details", "नागरिक विवरण")}</div>
                <div class="detail-value">${g.citizenName}<br>${g.citizenPhone}</div>
                
                <div class="detail-label">${getTxt("Incident Category", "मामले की श्रेणी")}</div>
                <div class="detail-value">${g.category}</div>

                <div class="detail-label">${getTxt("Assigned Officer", "नियुक्त अधिकारी")}</div>
                <div class="detail-value">${ioName}</div>
            </div>
            
            <div class="detail-main">
                <h4 style="margin-bottom: 0.5rem;">${g.title}</h4>
                <p style="font-size: 0.9rem; margin-bottom: 1.5rem; background: var(--bg-color); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-color);">
                    "${g.description}"
                </p>
                
                <h4 style="margin-bottom: 0.5rem; color: var(--status-investigating-text);"><i class="fa-solid fa-file-invoice"></i> ${getTxt("Investigation Report Submitted by IO", "जाँच अधिकारी द्वारा सबमिट की गई रिपोर्ट")}</h4>
                <div style="background: rgba(124, 58, 237, 0.05); border: 1px solid var(--status-investigating-text); border-radius: var(--radius-sm); padding: 1rem;">
                    <p style="font-size: 0.9rem; font-weight: 500;">${g.investigationReport}</p>
                </div>

                <div class="mt-4 d-flex gap-2">
                    <button class="btn btn-primary" onclick="resolveGrievance('${g.id}', true)">
                        <i class="fa-solid fa-check-double"></i> Approve & Resolve Complaint (प्रकरण बंद करें)
                    </button>
                    <button class="btn btn-secondary" onclick="resolveGrievance('${g.id}', false)" style="background-color: #fca5a5; color: #7f1d1d;">
                        <i class="fa-solid fa-arrow-rotate-left"></i> Reject Report (पुनः जाँच हेतु प्रेषित)
                    </button>
                </div>
            </div>
        </div>
    `;

    openModal('detailsModal');
}

function resolveGrievance(gid, isApproved) {
    const g = grievances.find(x => x.id === gid);
    if (!g) return;

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);

    if (isApproved) {
        g.status = "Resolved";
        g.timeline.push({
            titleEn: "Resolved & Closed",
            titleHi: "शिकायत निस्तारित एवं बंद",
            descEn: "Investigation report approved by SHO. Complaint resolved and closed.",
            descHi: "जाँच रिपोर्ट थाना प्रभारी द्वारा स्वीकृत। शिकायत का निस्तारण कर फाइल बंद की गई।",
            date: timestamp
        });
        alert(getTxt("Complaint marked as Resolved and Closed.", "शिकायत को निस्तारित एवं बंद घोषित किया गया।"));
    } else {
        // Send back to IO for reinvestigation
        g.status = "Investigating";
        g.timeline.push({
            titleEn: "Re-Investigation Ordered",
            titleHi: "पुनः जाँच के आदेश",
            descEn: "SHO rejected report and requested detailed investigation report again.",
            descHi: "थाना प्रभारी ने जाँच रिपोर्ट अस्वीकृत की और पुनः विस्तृत जाँच का निर्देश दिया।",
            date: timestamp
        });
        alert(getTxt("Report sent back to IO for investigation details.", "रिपोर्ट को पुनः विस्तृत जाँच हेतु अधिकारी को वापस भेजा गया।"));
    }

    saveDatabase();
    closeModal('detailsModal');
    renderSHODashboard();
}


// 7. Investigating Officer (IO) Dashboard Logic
function renderIODashboard() {
    const ioId = currentSession.id;
    const ioGrievances = grievances.filter(g => g.assignedIO === ioId);

    // Calculate IO metrics
    const stats = {
        assigned: ioGrievances.length,
        active: ioGrievances.filter(g => g.status === 'Assigned' || g.status === 'Investigating').length,
        completed: ioGrievances.filter(g => g.status === 'Report Submitted' || g.status === 'Resolved').length
    };

    const statsContainer = document.getElementById('ioStatsContainer');
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-details">
                <h4 data-en="Total Assigned" data-hi="कुल आवंटित">Total Assigned</h4>
                <div class="value">${stats.assigned}</div>
            </div>
            <i class="fa-solid fa-folder-open stat-icon"></i>
        </div>
        <div class="stat-card stat-investigating">
            <div class="stat-details">
                <h4 data-en="Under Investigation" data-hi="जांच के अधीन">Under Investigation</h4>
                <div class="value">${stats.active}</div>
            </div>
            <i class="fa-solid fa-spinner stat-icon fa-spin-pulse"></i>
        </div>
        <div class="stat-card stat-resolved">
            <div class="stat-details">
                <h4 data-en="Investigations Completed" data-hi="जांच पूर्ण">Investigations Completed</h4>
                <div class="value">${stats.completed}</div>
            </div>
            <i class="fa-solid fa-circle-check stat-icon"></i>
        </div>
    `;

    document.getElementById('ioDashboardTitle').innerText = `${getTxt(currentSession.details.nameEn, currentSession.details.nameHi)} (${getTxt("Investigating Officer Dashboard", "जाँच अधिकारी डैशबोर्ड")})`;

    const tbody = document.getElementById('ioTableBody');
    tbody.innerHTML = '';

    if (ioGrievances.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">${getTxt("No complaints assigned to you yet.", "आपको अभी तक कोई शिकायत आवंटित नहीं की गई है।")}</td></tr>`;
        return;
    }

    ioGrievances.forEach(g => {
        const tr = document.createElement('tr');
        
        let actionBtn = '';
        if (g.status === 'Assigned') {
            actionBtn = `
                <button class="btn btn-accent btn-inline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="startInvestigation('${g.id}')">
                    <i class="fa-solid fa-play"></i> <span data-en="Start Investigation" data-hi="जाँच शुरू करें">Start Investigation</span>
                </button>
            `;
        } else if (g.status === 'Investigating') {
            actionBtn = `
                <button class="btn btn-primary btn-inline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="openSubmitReportModal('${g.id}')">
                    <i class="fa-solid fa-file-import"></i> <span data-en="Submit Report" data-hi="रिपोर्ट लगायें">Submit Report</span>
                </button>
            `;
        } else {
            actionBtn = `
                <button class="btn btn-outline btn-inline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="viewGrievanceDetails('${g.id}')">
                    <i class="fa-solid fa-eye"></i> <span data-en="View Logs" data-hi="विवरण देखें">View Details</span>
                </button>
            `;
        }

        const badgeHtml = getStatusBadgeHtml(g.status);

        tr.innerHTML = `
            <td><strong>${g.id}</strong></td>
            <td>
                <div style="font-weight: 600;">${g.citizenName}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${g.citizenPhone}</div>
            </td>
            <td>
                <div style="font-weight: 500;">${g.title}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">
                    <strong>Instructions:</strong> "${g.assignmentInstructions || 'N/A'}"
                </div>
            </td>
            <td>${g.dateFiled}</td>
            <td>${badgeHtml}</td>
            <td><div class="d-flex gap-2">${actionBtn}</div></td>
        `;

        tbody.appendChild(tr);
    });
}

function startInvestigation(gid) {
    const g = grievances.find(x => x.id === gid);
    if (g) {
        g.status = "Investigating";
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
        
        g.timeline.push({
            titleEn: "Investigation Started",
            titleHi: "जाँच प्रारम्भ की गई",
            descEn: "Investigating Officer has taken up active investigation of the case.",
            descHi: "जाँच अधिकारी ने सक्रिय रूप से मामले की विवेचना/जाँच शुरू कर दी है।",
            date: timestamp
        });
        
        saveDatabase();
        alert(getTxt("Case status updated to 'Under Investigation'.", "मामले की स्थिति 'जांच के अधीन' अपडेट की गई।"));
        renderIODashboard();
    }
}

function openSubmitReportModal(gid) {
    document.getElementById('reportModalGrievanceId').value = gid;
    document.getElementById('ioReportDetail').value = '';
    openModal('submitReportModal');
}

function submitInvestigationReport() {
    const gid = document.getElementById('reportModalGrievanceId').value;
    const reportText = document.getElementById('ioReportDetail').value.trim();

    if (!reportText) {
        alert(getTxt("Please enter the investigation findings report.", "कृपया जाँच रिपोर्ट का विवरण दर्ज करें।"));
        return;
    }

    const g = grievances.find(x => x.id === gid);
    if (g) {
        g.status = "Report Submitted";
        g.investigationReport = reportText;

        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
        g.timeline.push({
            titleEn: "Report Submitted",
            titleHi: "जाँच रिपोर्ट प्रेषित",
            descEn: `Investigation completed. Findings submitted to SHO: ${reportText}`,
            descHi: `जाँच रिपोर्ट प्रेषित। निष्कर्ष थाना प्रभारी को सौंपे गए: ${reportText}`,
            date: timestamp
        });

        saveDatabase();
        closeModal('submitReportModal');
        alert(getTxt("Investigation report submitted successfully to the SHO.", "जाँच रिपोर्ट थाना प्रभारी को सफलतापूर्वक प्रेषित की गई।"));
        renderIODashboard();
    }
}


// 8. Superintendent of Police (SP) Dashboard Logic
function renderSPDashboard() {
    // Consolidated stats
    const stats = {
        total: grievances.length,
        pending: grievances.filter(g => g.status === 'Pending').length,
        investigating: grievances.filter(g => g.status === 'Assigned' || g.status === 'Investigating').length,
        resolved: grievances.filter(g => g.status === 'Resolved').length
    };

    const statsContainer = document.getElementById('spStatsContainer');
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-details">
                <h4 data-en="District Total Filed" data-hi="जनपद की कुल शिकायतें">District Total Filed</h4>
                <div class="value">${stats.total}</div>
            </div>
            <i class="fa-solid fa-folder-open stat-icon"></i>
        </div>
        <div class="stat-card stat-pending">
            <div class="stat-details">
                <h4 data-en="Unassigned (Pending)" data-hi="लंबित (अनावंटित)">Unassigned (Pending)</h4>
                <div class="value">${stats.pending}</div>
            </div>
            <i class="fa-solid fa-user-clock stat-icon"></i>
        </div>
        <div class="stat-card stat-investigating">
            <div class="stat-details">
                <h4 data-en="Under Investigation" data-hi="जांच के अधीन">Under Investigation</h4>
                <div class="value">${stats.investigating}</div>
            </div>
            <i class="fa-solid fa-spinner stat-icon fa-spin-pulse"></i>
        </div>
        <div class="stat-card stat-resolved">
            <div class="stat-details">
                <h4 data-en="Resolved & Closed" data-hi="निस्तारित एवं बंद">Resolved & Closed</h4>
                <div class="value">${stats.resolved}</div>
            </div>
            <i class="fa-solid fa-circle-check stat-icon"></i>
        </div>
    `;

    // Render Thana-wise performance summary table
    const summaryBody = document.getElementById('spStationSummaryBody');
    summaryBody.innerHTML = '';

    CONFIG.stations.forEach(station => {
        const stationGrievances = grievances.filter(g => g.stationId === station.id);
        const total = stationGrievances.length;
        const pending = stationGrievances.filter(g => g.status === 'Pending').length;
        const active = stationGrievances.filter(g => g.status === 'Assigned' || g.status === 'Investigating').length;
        const resolved = stationGrievances.filter(g => g.status === 'Resolved').length;
        
        const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${getTxt(station.nameEn, station.nameHi)}</strong></td>
            <td>${total}</td>
            <td>${pending}</td>
            <td>${active}</td>
            <td>${resolved}</td>
            <td>
                <div style="font-weight: 700; color: ${rate >= 75 ? 'var(--status-resolved-text)' : (rate >= 40 ? 'var(--status-pending-text)' : 'var(--status-rejected-text)')}">
                    ${rate}%
                </div>
            </td>
        `;
        summaryBody.appendChild(tr);
    });

    // Render SP master complaints log
    renderSPComplaintsTable(grievances);

    // Initial Render SP Analytics Charts
    renderSPCharts();
}

function renderSPComplaintsTable(filteredList) {
    const tbody = document.getElementById('spGrievanceTableBody');
    tbody.innerHTML = '';

    if (filteredList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted">${getTxt("No grievances found.", "कोई शिकायत नहीं मिली।")}</td></tr>`;
        return;
    }

    filteredList.forEach(g => {
        const station = CONFIG.stations.find(s => s.id === g.stationId);
        const stationName = station ? getTxt(station.nameEn, station.nameHi) : 'N/A';
        
        let ioText = `<span class="text-muted">${getTxt("Not Assigned", "आवंटित नहीं")}</span>`;
        if (g.assignedIO) {
            const ioObj = CONFIG.ios.find(i => i.id === g.assignedIO);
            if (ioObj) ioText = getTxt(ioObj.nameEn, ioObj.nameHi);
        }

        const badgeHtml = getStatusBadgeHtml(g.status);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${g.id}</strong></td>
            <td>${stationName}</td>
            <td>
                <div style="font-weight: 600;">${g.citizenName}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${g.citizenPhone}</div>
            </td>
            <td>
                <div style="font-weight: 500;">${g.title}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${g.category}</div>
            </td>
            <td>${g.dateFiled}</td>
            <td>${ioText}</td>
            <td>${badgeHtml}</td>
            <td>
                <button class="btn btn-outline btn-inline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="viewGrievanceDetails('${g.id}')">
                    <i class="fa-solid fa-eye"></i> <span data-en="Inspect" data-hi="निरीक्षण करें">Inspect</span>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function handleSPSearch() {
    const query = document.getElementById('spSearchInput').value.toLowerCase().trim();
    if (!query) {
        renderSPComplaintsTable(grievances);
        return;
    }

    const filtered = grievances.filter(g => 
        g.id.toLowerCase().includes(query) || 
        g.citizenName.toLowerCase().includes(query) ||
        g.citizenPhone.includes(query) ||
        g.title.toLowerCase().includes(query)
    );

    renderSPComplaintsTable(filtered);
}

// Analytics Visual rendering using ChartJS
function renderSPCharts() {
    // 1. Station distribution data
    const labelsStation = CONFIG.stations.map(s => getTxt(s.nameEn, s.nameHi));
    const dataStation = CONFIG.stations.map(s => grievances.filter(g => g.stationId === s.id).length);

    // 2. Category distribution
    const categories = [...new Set(grievances.map(g => g.category))];
    const dataCategory = categories.map(cat => grievances.filter(g => g.category === cat).length);

    // Destroy old charts to prevent duplicate layout overlap
    if (chartInstanceStation) chartInstanceStation.destroy();
    if (chartInstanceCategory) chartInstanceCategory.destroy();

    const ctxStation = document.getElementById('spStationChart').getContext('2d');
    chartInstanceStation = new Chart(ctxStation, {
        type: 'bar',
        data: {
            labels: labelsStation,
            datasets: [{
                label: getTxt('Total Grievances', 'कुल शिकायतें'),
                data: dataStation,
                backgroundColor: 'rgba(11, 28, 60, 0.85)',
                borderColor: '#d4af37',
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });

    const ctxCategory = document.getElementById('spCategoryChart').getContext('2d');
    chartInstanceCategory = new Chart(ctxCategory, {
        type: 'doughnut',
        data: {
            labels: categories.map(c => getTxt(c.split(' / ')[0], c.split(' / ')[1])),
            datasets: [{
                data: dataCategory,
                backgroundColor: [
                    '#1e3a8a', // blue
                    '#b45309', // amber
                    '#047857', // emerald
                    '#6d28d9', // purple
                    '#be123c', // rose
                    '#475569'  // slate
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { boxWidth: 12 }
                }
            }
        }
    });
}


// 9. Global Inspect Modals & Detail Renderer
function viewGrievanceDetails(gid) {
    const g = grievances.find(x => x.id === gid);
    if (!g) return;

    const stationObj = CONFIG.stations.find(s => s.id === g.stationId);
    const stationName = stationObj ? getTxt(stationObj.nameEn, stationObj.nameHi) : 'N/A';

    let ioName = `<span class="text-muted">${getTxt("Not Assigned", "आवंटित नहीं")}</span>`;
    if (g.assignedIO) {
        const ioObj = CONFIG.ios.find(i => i.id === g.assignedIO);
        if (ioObj) ioName = getTxt(ioObj.nameEn, ioObj.nameHi);
    }

    const modalTitle = document.getElementById('detailsModalTitle');
    const modalBody = document.getElementById('detailsModalBody');

    modalTitle.innerText = `${getTxt("Inspect Grievance Logs", "शिकायत विवरण का निरीक्षण")}: ${g.id}`;
    
    // Timeline steps HTML render
    let stepsHtml = '';
    g.timeline.forEach(step => {
        stepsHtml += `
            <div style="border-left: 2px solid var(--border-color); padding-left: 1rem; margin-bottom: 1rem; position: relative;">
                <div style="position: absolute; left: -6px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: var(--primary-light);"></div>
                <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">${step.date}</div>
                <div style="font-size: 0.88rem; font-weight: 700; color: var(--primary-color);">${getTxt(step.titleEn, step.titleHi)}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">${getTxt(step.descEn, step.descHi)}</div>
            </div>
        `;
    });

    let reportHtml = '';
    if (g.investigationReport) {
        reportHtml = `
            <h4 class="mt-4 mb-4" style="color: var(--status-investigating-text);"><i class="fa-solid fa-file-signature"></i> ${getTxt("Investigation Report Submitted", "जाँच अधिकारी की फाइनल रिपोर्ट")}</h4>
            <div style="background: rgba(124, 58, 237, 0.05); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--status-investigating-text);">
                <p style="font-size: 0.9rem;">${g.investigationReport}</p>
            </div>
        `;
    }

    let feedbackHtml = '';
    if (g.citizenFeedback) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= g.citizenFeedback.rating ? '★' : '☆';
        }
        feedbackHtml = `
            <h4 class="mt-4 mb-4" style="color: var(--status-resolved-text);"><i class="fa-solid fa-thumbs-up"></i> ${getTxt("Citizen Rating Feedback", "नागरिक संतुष्टि प्रतिक्रिया")}</h4>
            <div style="background: rgba(5, 150, 105, 0.05); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--status-resolved-text);">
                <div style="color: var(--accent-color); font-size: 1.2rem; font-weight: 700;">${stars} (${g.citizenFeedback.rating}/5)</div>
                <p style="font-size: 0.9rem; font-style: italic;">"${g.citizenFeedback.comments || 'No remarks provided.'}"</p>
            </div>
        `;
    }

    const badgeHtml = getStatusBadgeHtml(g.status);

    modalBody.innerHTML = `
        <div class="detail-grid">
            <div class="detail-sidebar">
                <div class="detail-label">${getTxt("Grievance Status", "प्रकरण की स्थिति")}</div>
                <div class="detail-value">${badgeHtml}</div>

                <div class="detail-label">${getTxt("Citizen details", "शिकायतकर्ता")}</div>
                <div class="detail-value">
                    <strong>${g.citizenName}</strong><br>
                    📞 ${g.citizenPhone}<br>
                    ✉️ ${g.citizenEmail || 'N/A'}
                </div>
                
                <div class="detail-label">${getTxt("Police Station", "सम्बन्धित थाना")}</div>
                <div class="detail-value">${stationName}</div>

                <div class="detail-label">${getTxt("Assigned Officer", "जाँच अधिकारी")}</div>
                <div class="detail-value">${ioName}</div>

                <div class="detail-label">${getTxt("Date Filed", "पंजीकरण तिथि")}</div>
                <div class="detail-value">${g.dateFiled}</div>
            </div>
            
            <div class="detail-main" style="max-height: 520px; overflow-y: auto; padding-right: 0.5rem;">
                <h4 style="margin-bottom: 0.5rem;">${g.title}</h4>
                <p style="font-size: 0.92rem; background: var(--bg-color); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-color); margin-bottom: 1.5rem;">
                    "${g.description}"
                </p>
                
                ${reportHtml}
                ${feedbackHtml}

                <h4 class="mt-4 mb-4" style="border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;"><i class="fa-solid fa-list-ol"></i> ${getTxt("Workflow Log Audit Trails", "प्रक्रिया ऑडिट लॉग्स")}</h4>
                <div>
                    ${stepsHtml}
                </div>
            </div>
        </div>
    `;

    openModal('detailsModal');
}

// Shared HTML helper for status indicators
function getStatusBadgeHtml(status) {
    let badgeClass = 'badge-pending';
    let statusTextEn = 'Pending';
    let statusTextHi = 'लंबित';

    switch (status) {
        case 'Pending':
            badgeClass = 'badge-pending';
            statusTextEn = 'Pending';
            statusTextHi = 'लंबित';
            break;
        case 'Assigned':
            badgeClass = 'badge-assigned';
            statusTextEn = 'Assigned';
            statusTextHi = 'आवंटित';
            break;
        case 'Investigating':
            badgeClass = 'badge-investigating';
            statusTextEn = 'Investigating';
            statusTextHi = 'जाँच के अधीन';
            break;
        case 'Report Submitted':
            badgeClass = 'badge-investigating';
            statusTextEn = 'Report Submitted';
            statusTextHi = 'रिपोर्ट प्रेषित';
            break;
        case 'Resolved':
            badgeClass = 'badge-resolved';
            statusTextEn = 'Resolved';
            statusTextHi = 'निस्तारित';
            break;
        case 'Rejected':
            badgeClass = 'badge-rejected';
            statusTextEn = 'Rejected';
            statusTextHi = 'अस्वीकृत';
            break;
    }

    return `<span class="badge ${badgeClass}">${getTxt(statusTextEn, statusTextHi)}</span>`;
}

// Modal Toggle Utility functions
function openModal(id) {
    document.getElementById(id).classList.add('show');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}
