document.addEventListener('DOMContentLoaded', function() {
 
    const loginModal = document.getElementById('loginForm-modal');
    const openLoginModalLink = document.getElementById('loginForm-link');
    const closeLoginModalBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');

    
    openLoginModalLink.addEventListener('click', function(event) {
        event.preventDefault(); 
        loginModal.style.display = 'flex';
    });

    
    closeLoginModalBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    
    window.addEventListener('click', function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Manejar el formulario de inicio de sesión
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene que el formulario se envíe automáticamente

        // Captura los valores del formulario
        const username = document.getElementById('username').value;
        const password = document.getElementById('password-login').value;

        // Datos que se enviarán al servidor
        const loginData = {
            nickname: username,
            password: password
        };

        // Envía los datos al servidor usando fetch
        fetch('http://localhost:3002/usuarios/login', {
            method: 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(loginData) // Convierte los datos a JSON
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud de inicio de sesión');
            }
        })
        .then(data => {
            if (data.token && data.nickname && data.valid_until) {
                alert('Inicio de sesión exitoso');
              
                localStorage.setItem('token', data.token);
                
            } else {
                throw new Error('Respuesta de inicio de sesión incompleta');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error durante el inicio de sesión');
        });
    });
});