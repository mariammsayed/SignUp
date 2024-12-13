// sign in
var email = document.getElementById('emailInput')
var pass = document.getElementById('passwordInput')
var username = document.getElementById('nameInput')

// buttons
var loginBtn = document.getElementById('login')
var signupBtn = document.getElementById('signup')
var logoutBtn = document.getElementById('logout')

var error = document.getElementById('error')
var incorrect = document.getElementById('incorrect')

var welcomeMsg = document.getElementById('welcome')

var users = []

function signUp(){
    var user = {
        name: username.value,
        password: pass.value,
        email: email.value
    }
    users.push(user);
    localStorage.setItem('Users', JSON.stringify(users))
}

function clearForm(){
    username.value = null
    pass.value = null
    email.value = null
}

function validationSignUp(element){
    var regex = {
        nameInput: /^[a-z0-9_-]{3,15}$/,
        emailInput: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        passwordInput: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
    }
    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        return true;
    } else {
        element.classList.remove('is-valid')
        element.classList.add('is-invalid')
        return false;
    }
}



if (signupBtn) {
    signupBtn.addEventListener('click', function(e){
        e.stopPropagation();
        if (validationSignUp(username) && validationSignUp(email) && validationSignUp(pass)) {
            signUp();
            clearForm();
            error.classList.add('d-none')
            username.classList.remove('is-valid')
            pass.classList.remove('is-valid')
            email.classList.remove('is-valid')
            window.location.href = 'index.html'
        } else {
            error.classList.remove('d-none')
        }
    })
}



function checkSignin(){
    var storedUsers = JSON.parse(localStorage.getItem('Users'));
    var signinEmail = document.getElementById('emailInput').value;
    var signinPass = document.getElementById('passwordInput').value;
    var signinSuccess = false;

        for (var i = 0; i < storedUsers.length; i++) {
            if (storedUsers[i].email === signinEmail && storedUsers[i].password === signinPass) {
                signinSuccess = true;
                localStorage.setItem('currentUser', JSON.stringify(storedUsers[i].name));
                break;
            }
        }
    return signinSuccess;
}

if(loginBtn){
    loginBtn.addEventListener('click' , function(){
        if (checkSignin()) {
            window.location.href = 'home.html';
        }else if (email.value == '' && pass.value == '') {
            error.classList.remove('d-none')}
            else{
            incorrect.classList.remove('d-none')
        }
    })
}


if (welcomeMsg != null) {
    welcomeMsg.innerHTML = `Welcome ${JSON.parse(localStorage.getItem('currentUser'))}`
}
