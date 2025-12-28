let loggedInUser = localStorage.getItem("loggedInUser");
if (!loggedInUser) window.location.href = "index1.html";

let users = JSON.parse(localStorage.getItem("users")) || {};
let userEmail = users[loggedInUser] ? users[loggedInUser].email : "";

// Sidebar & Profile
document.getElementById("userGreeting").innerText = loggedInUser;
document.getElementById("sidebarName").innerText = loggedInUser;
document.getElementById("profileName").innerText = loggedInUser;
document.getElementById("profileEmail").innerText = userEmail;

// Load avatar
let savedAvatar = localStorage.getItem("avatar_" + loggedInUser);
if (savedAvatar) {
    document.getElementById("profileAvatar").src = savedAvatar;
    document.getElementById("sidebarAvatar").src = savedAvatar;
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index1.html";
});

// Toggle sections
const dashboardLink = document.getElementById("dashboardLink");
const profileLink = document.getElementById("profileLink");
const dashboardSection = document.getElementById("dashboardSection");
const profileSection = document.getElementById("profileSection");

dashboardLink.addEventListener("click", function() {
    dashboardSection.classList.add("active");
    profileSection.classList.remove("active");
    dashboardLink.classList.add("active");
    profileLink.classList.remove("active");
});
profileLink.addEventListener("click", function() {
    profileSection.classList.add("active");
    dashboardSection.classList.remove("active");
    profileLink.classList.add("active");
    dashboardLink.classList.remove("active");
});

// Score system
const dailyScoreEl = document.getElementById("dailyScore");
const totalScoreEl = document.getElementById("sidebarScore");
function loadScores() {
    let scores = JSON.parse(localStorage.getItem("scores")) || {};
    let today = new Date().toLocaleDateString();
    let todayScore = (scores[loggedInUser] && scores[loggedInUser][today]) ? scores[loggedInUser][today] : 0;
    dailyScoreEl.innerText = todayScore;

    let total = 0;
    if (scores[loggedInUser]) for (let day in scores[loggedInUser]) total += scores[loggedInUser][day];
    totalScoreEl.innerText = `Total Score: ${total}`;

    updateGuidance(total);
}
function addScore(points) {
    let scores = JSON.parse(localStorage.getItem("scores")) || {};
    let today = new Date().toLocaleDateString();
    if (!scores[loggedInUser]) scores[loggedInUser] = {};
    if (!scores[loggedInUser][today]) scores[loggedInUser][today] = 0;
    scores[loggedInUser][today] += points;
    localStorage.setItem("scores", JSON.stringify(scores));
    loadScores();
}
loadScores();

// Guidance
function updateGuidance(totalScore) {
    let guidance = "";
    if (totalScore < 20) guidance = "Start: Python Basics → HTML & CSS";
    else if (totalScore < 50) guidance = "Next: JavaScript & Web Development";
    else if (totalScore < 100) guidance = "Next: Data Science & AI Fundamentals";
    else guidance = "Advanced: AI Projects & Machine Learning";
    document.getElementById("guidanceMessage").innerText = guidance;
}

// Avatar change
function changeAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profileAvatar").src = e.target.result;
            document.getElementById("sidebarAvatar").src = e.target.result;
            localStorage.setItem("avatar_" + loggedInUser, e.target.result);
        }
        reader.readAsDataURL(file);
    }
}

// Edit Profile
function editProfile() {
    let newName = prompt("Enter new full name:", loggedInUser);
    let newEmail = prompt("Enter new email:", userEmail);
    if (newName && newEmail) {
        let users = JSON.parse(localStorage.getItem("users")) || {};
        if (newName !== loggedInUser) {
            users[newName] = users[loggedInUser];
            delete users[loggedInUser];
            let avatarData = localStorage.getItem("avatar_" + loggedInUser);
            if (avatarData) {
                localStorage.setItem("avatar_" + newName, avatarData);
                localStorage.removeItem("avatar_" + loggedInUser);
            }
            localStorage.setItem("loggedInUser", newName);
            loggedInUser = newName;
        }
        users[loggedInUser].email = newEmail;
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("profileName").innerText = loggedInUser;
        document.getElementById("profileEmail").innerText = newEmail;
        document.getElementById("sidebarName").innerText = loggedInUser;
        alert("Profile updated successfully!");
        loadScores();
    }
}

// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    toggleBtn.innerHTML = sidebar.classList.contains("collapsed") ? '<i class="fas fa-angle-right"></i>' : '<i class="fas fa-angle-left"></i>';
});
