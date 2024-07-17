// Script para el FORM de registro 
document.addEventListener("DOMContentLoaded", function() {
    let modal = document.getElementById("register-modal");
    let btn = document.getElementById("register-link");
    let span = document.getElementsByClassName("close")[0];
    let form = document.getElementById("register-form");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        let name = document.getElementById("name").value;
        let lastname = document.getElementById("lastname").value;
        let nickname = document.getElementById("nickname").value;
        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;
        let areaCode = document.getElementById("area-code").value;
        let phone = document.getElementById("phone").value;
        let isWhatsapp = document.getElementById("is-whatsapp").checked;
        let provincia = document.getElementById("provincia").value;

       
        let namePattern = /^[A-Za-z\s]{1,}$/;
        let alphanumericPattern = /^[A-Za-z0-9]{3,30}$/;
        let passwordPattern = /^[A-Za-z0-9]{8,20}$/;
        let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        let areaCodePattern = /^[0-9]{1,5}$/;
        let phonePattern = /^[0-9]{7,15}$/;

        // Validar nombre
        if (!namePattern.test(name)) {
            alert("El nombre debe contener solo letras y espacios.");
            return;
        }

        // Validar apellido
        if (!namePattern.test(lastname)) {
            alert("El apellido debe contener solo letras y espacios.");
            return;
        }

        // Validar nombre de usuario
        if (!alphanumericPattern.test(nickname)) {
            alert("El nombre de usuario debe ser alfanumérico, entre 3 y 30 caracteres.");
            return;
        }

        // Validar contraseña
        if (!passwordPattern.test(password)) {
            alert("La contraseña debe contener entre 8 y 20 caracteres alfanuméricos.");
            return;
        }

        // Validar correo electrónico
        if (!emailPattern.test(email)) {
            alert("Introduce una dirección de correo electrónico válida.");
            return;
        }

        // Validar código de área
        if (!areaCodePattern.test(areaCode)) {
            alert("Introduce un código de área válido.");
            return;
        }

        // Validar número de teléfono
        if (!phonePattern.test(phone)) {
            alert("Introduce un número de teléfono válido.");
            return;
        }

        const registerData = {
            name: name,
            lastname: lastname,
            nickname: nickname,
            password: password,
            email: email,
            areaCode: areaCode,
            phone: phone,
            province_short_name: provincia,
            isWhatsapp: isWhatsapp 
        };

        console.log("Datos a enviar:", registerData);

        fetch('http://localhost:3002/usuarios/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
        .then(response => {
            console.log("Respuesta del servidor:", response);
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(errData => {
                    throw new Error(errData.message || 'Error en la solicitud de registro');
                });
            }
        })
        .then(data => {
            console.log("Datos recibidos del servidor:", data);
            if (data.success) {
                alert('Registro exitoso');
                form.reset(); 
            } else {
                alert(data.message || 'Ocurrió un error durante el registro');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error durante el registro: ' + error.message);
        });
    });
});
