var username = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var signUpPage = document.getElementById("signUpPage");
var signInPage = document.getElementById("signInPage");
var signUp = document.getElementById("signUpBtn");
var login = document.getElementById("loginBtn");
var signUpStatus = document.getElementById("status");

function clearForm(){
    username.value = '';
    email.value = '';
    password.value = '';
}

signUpPage.addEventListener("click", function() {
    var name = document.getElementById("name");
    name.classList.replace("d-none", "d-block");
    signInPage.classList.replace("d-none", "d-inline-block");
    signUpPage.classList.replace("d-inline-block", "d-none");
    signUp.classList.replace("d-none", "d-block");
    login.classList.replace("d-block", "d-none");
    signUpStatus.innerHTML = "";
});

signInPage.addEventListener("click", function() {
    var name = document.getElementById("name");
    console.log(name);
    name.classList.replace("d-block", "d-none");
    signInPage.classList.replace("d-inline-block", "d-none");
    signUpPage.classList.replace("d-none", "d-inline-block");
    signUp.classList.replace("d-block", "d-none");
    login.classList.replace("d-none", "d-block");
    signUpStatus.innerHTML = "";
});

var users;

if (localStorage.getItem("users") == null) {
    users = [];
} else {
    users = JSON.parse(localStorage.getItem("users"));
}

signUp.addEventListener("click", function() {
    var nameValue = username.value;
    var emailValue = email.value;
    var passwordValue = password.value;
    var user = {
        name: nameValue,
        email: emailValue,
        password: passwordValue
    };
    emailValidation();
    if (!emailValidation()) {
        signUpStatus.innerHTML = "Invalid email";
        signUpStatus.style.color = "red";
    } 
    else if (nameValue == "" || emailValue == "" || passwordValue == "") {
        signUpStatus.innerHTML = "All inputs are required";
        signUpStatus.style.color = "red";
    } else {
        users.push(user);
        clearForm();
        localStorage.setItem("users", JSON.stringify(users));
        signUpStatus.style.color = "green";
        signUpStatus.innerHTML = "Account created successfully";
    }
});

login.addEventListener("click", function() {
    var emailValue = email.value;
    var passwordValue = password.value;
    var user = {
        email: emailValue,
        password: passwordValue
    };
    var found = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == user.email && users[i].password == user.password) {
            found = true;
            break;
        }
    }
    if (found) {
        signUpStatus.style.color = "green";
        signUpStatus.innerHTML = "Login successful";
    } else {
        if (emailValue == "" || passwordValue == "") {
            signUpStatus.innerHTML = "All inputs are required";
        } else {
            signUpStatus.innerHTML = "Invalid email or password";
        }
        signUpStatus.style.color = "red";
    }
    clearForm();
});

emailValidation = function() {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email.value);
}