"use strict";

const signUpName = document.getElementById('signUpName');

const signUpEmail = document.getElementById('signUpEmail');

const signUpPassword = document.getElementById('signUpPassword');

const signinEmail = document.getElementById('signinEmail');

const signinPassword = document.getElementById('signinPassword');

const signUpBtn = document.getElementById('signUpBtn');

const signincard = document.getElementById('card');

const navBar = document.querySelector('nav');

const welcomeCard = document.getElementById('welcomeCard');

var accountStorage = [];

let user;

if(JSON.parse(localStorage.getItem("allAccounts"))){
  accountStorage = JSON.parse(localStorage.getItem("allAccounts"));
}

if(localStorage.getItem("User")){
  user = JSON.parse(localStorage.getItem("User"))
};


function run(){
  addAccount();
}

function addAccount(){

  if (validateSignUp(signUpName) && validateSignUp(signUpEmail)
     && validateSignUp(signUpPassword)) {
    var account = {
        name : signUpName.value,
        email : signUpEmail.value,
        password : signUpPassword.value,
        };
if (accountStorage.some((element) => signUpEmail.value == element.email)) {
  signUpEmail.classList.add('is-invalid');
  signUpEmail.classList.remove('is-valid');
  document.querySelector(".signUpEmailError").classList.replace('d-none' , 'd-block');
} else {
  accountStorage.push(account);
    localStorage.setItem("allAccounts", JSON.stringify(accountStorage));
    document.querySelector(".signUpEmailError").classList.replace('d-block','d-none');
    document.querySelector(".text-success").classList.replace('d-none','d-block');
    signUpEmail.classList.remove('is-invalid');
    signUpEmail.classList.add('is-valid');
    clearForm ();
}
  }
}


function logout(){
  signincard.classList.remove("d-none");
welcomeCard.classList.add("d-none");
navBar.classList.add('d-none');
localStorage.removeItem("User", JSON.stringify(user));
signinEmail.value = null;
signinPassword.value = null;
signinEmail.nextElementSibling.classList.replace('d-block' , 'd-none');
signinPassword.nextElementSibling.classList.replace('d-block' , 'd-none');
}


function validateSignIn(){

  for(var i = 0 ; i < accountStorage.length ; i++ ){

if(signinEmail.value == accountStorage[i].email && signinPassword.value == accountStorage[i].password){
  user = accountStorage[i];
  localStorage.setItem("User", JSON.stringify(user));
  if(user){
signincard.classList.add("d-none");
welcomeCard.classList.remove("d-none");
welcomeCard.innerHTML = `<span class="h1">Welcome ${accountStorage[i].name}</span>`;
navBar.classList.remove('d-none');
signinEmail.nextElementSibling.classList.replace('d-block' , 'd-none');
  signinPassword.nextElementSibling.classList.replace('d-block' , 'd-none');
  }
}else{
  signinEmail.nextElementSibling.classList.replace('d-none' , 'd-block');
  signinPassword.nextElementSibling.classList.replace('d-none' , 'd-block');
}
}
}


if(user){
signincard.classList.add("d-none");
welcomeCard.classList.remove("d-none");
welcomeCard.innerHTML = `<span class="h1">Welcome ${user.name}</span>`;
navBar.classList.remove('d-none');
signinEmail.nextElementSibling.classList.replace('d-block' , 'd-none');
  signinPassword.nextElementSibling.classList.replace('d-block' , 'd-none');
  }


function clearForm (){
    signUpName.value = null;
    signUpEmail.value = null;
    signUpPassword.value = null;
    signUpName.classList.remove('is-valid');
    signUpEmail.classList.remove('is-valid');
    signUpPassword.classList.remove('is-valid');
};

function validateSignUp(element){ 
var regex = {
signUpName: /^[a-z0-9_-]{3,15}$/,
signUpEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
signUpPassword : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};
var validate = regex[element.id].test(element.value);

if(validate){
element.classList.add('is-valid')
element.classList.remove('is-invalid')
element.nextElementSibling.classList.replace('d-block','d-none')
}else{
element.classList.add('is-invalid')
element.classList.remove('is-valid')
element.nextElementSibling.classList.replace('d-none' , 'd-block')
}
return validate
};
