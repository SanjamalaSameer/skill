function register() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    if (username === "" || email === "" || password === "") {
        message.style.color = "red";
        message.innerText = "All fields are required!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        message.style.color = "red";
        message.innerText = "Username already exists!";
        return;
    }

    users[username] = { email: email, password: password };
    localStorage.setItem("users", JSON.stringify(users));

    message.style.color = "green";
    message.innerText = "Account created successfully!";

    setTimeout(() => {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "dashboard.html";
    }, 1000);
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username].password === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "dashboard.html";
    } else {
        message.style.color = "red";
        message.innerText = "Invalid username or password!";
    }
}
