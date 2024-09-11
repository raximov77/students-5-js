document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        
        if(username === storedUsername && password === storedPassword) {
            setTimeout(() => {
                window.location.pathname = "../../admin.html";
            }, 1000);
        } 
        else {
            alert("Invalid username or password!");
        }
    });
});
