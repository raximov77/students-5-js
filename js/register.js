
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        
        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);
        
        registerForm.reset();
        

        alert('Updated successfully!');
        window.location.href = './index.html';
    });
});
