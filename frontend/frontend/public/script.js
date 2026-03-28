const container = document.querySelector('.container');
const registration = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registration.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})
document.querySelector('.form-box.login form').addEventListener('submit', (e) => {
    e.preventDefault()
    window.location.href ='/dashboard'
})