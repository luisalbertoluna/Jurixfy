function FunMembresiaMenu() {
    $('#mensajeAlerta').addClass('d-none');
    document.getElementById("correo").style.display = "block";
    document.getElementById("labelcorreo").style.display = "block";
    document.getElementById("labelcontrasenia").style.display = "block";
    document.getElementById("contrasenia").style.display = "block";
    document.getElementById("correo").value = "";
    document.getElementById("contrasenia").value = "";
    document.getElementById("ingresarBtn").style.display = "block";
    document.getElementById("ingresarBtn").innerHTML = "Ingresar";
    document.getElementById("preguntalink").style.display = "block";
    document.getElementById("IngresaPreguntalink").style.display = "none";
}

function disableBtn() {
    var boton = document.getElementById("ingresarBtn").innerText;

    if (boton === 'Validar' && $('#correo').val().trim() !== '') {
        return false;
    } else if (boton === 'Ingresar' && $('#correo').val().trim() !== '' && $('#contrasenia').val().trim() !== '') {
        return false;
    } else {
        return true;
    }
}

function ocultarValidacion() {
    document.getElementById("preguntalink").style.display = "none";
    document.getElementById("IngresaPreguntalink").style.display = "block";
    document.getElementById("correo").placeholder = "Ingrese su correo electrónico para validarlo";
    document.getElementById("correo").focus();
    document.getElementById("contrasenia").style.display = "none";
    document.getElementById("labelcontrasenia").style.display = "none";
    document.getElementById("titleMembresia").style.display = "none";
    document.getElementById("ingresarBtn").innerHTML = "Validar";
    $('#ingresarBtn').prop('disabled', disableBtn);
}

function ocultarIngresar() {
    document.getElementById("preguntalink").style.display = "block";
    document.getElementById("IngresaPreguntalink").style.display = "none";
    document.getElementById("correo").placeholder = "Ingrese su correo electrónico";
    document.getElementById("correo").focus();
    document.getElementById("contrasenia").value = "";
    document.getElementById("contrasenia").style.display = "block";
    document.getElementById("labelcontrasenia").style.display = "block";
    document.getElementById("titleMembresia").style.display = "block";
    document.getElementById("ingresarBtn").innerHTML = "Ingresar";
    $('#ingresarBtn').prop('disabled', disableBtn);
}

function IngresaroValidar() {
    var boton = document.getElementById("ingresarBtn").innerText;
    var res = '';

    if (boton === 'Validar') {
        document.getElementById("ingresarBtn").style.display = "none";
        document.getElementById("labelcorreo").style.display = "none";
        document.getElementById("correo").style.display = "none";
        document.getElementById("IngresaPreguntalink").style.display = "none";
        res = 'validar';
    } else {
        document.getElementById("ingresarBtn").style.display = "none";
        document.getElementById("correo").style.display = "none";
        document.getElementById("labelcorreo").style.display = "none";
        document.getElementById("labelcontrasenia").style.display = "none";
        document.getElementById("contrasenia").style.display = "none";
        document.getElementById("preguntalink").style.display = "none";
        document.getElementById("titleMembresia").style.display = "none";
        res = 'Ingresar';
    }

    $('#spinner-container').show();

    $.ajax({
        url: '/Jurixfy/' + res,
        type: 'POST',
        data: { Correo: $('#correo').val().trim(), Passwor: $('#contrasenia').val().trim() },
        success: function (data) {
            if (boton === 'Validar') {
                document.getElementById("correo").style.display = "none";
                document.getElementById("labelcorreo").style.display = "none";
                document.getElementById("ingresarBtn").style.display = "none";
                document.getElementById("IngresaPreguntalink").style.display = "none";



                $('#mensajeAlerta').text(data.Mensaje);
                $('#mensajeAlerta').removeClass('d-none');
                $('#spinner-container').hide();


            } else {
                if (data.Ingreso == 1) {
                    sessionStorage.setItem('userData', JSON.stringify(data));

                    if (data.EsAdmin == true) {
                        document.getElementById("PDFMenu").style.display = "block";
                        document.getElementById("ConfiguracionMenu").style.display = "block";

                    } else {
                        document.getElementById("PDFMenu").style.display = "block";
                    }
                    document.getElementById("UsuarioMenu").style.display = "block";
                    document.getElementById("MembresiaMenu").style.display = "none";
                }
               
                $('#SpanUsuarioText').text(data.Correo.substring(0, data.Correo.indexOf('@')));

                $('#mensajeAlerta').text(data.Mensaje);
                $('#mensajeAlerta').removeClass('d-none');
                $('#spinner-container').hide();

            }

        },
        error: function () {
            $('#spinner-container').hide();
            console.log('Error al hacer la gestión de ingresar o validar correo.');
        }
    });
}

function asociarEventosMembresia() {
    $('#ingresarBtn').on('click', function () {
        IngresaroValidar();
    });

    $("#ingresaLink").click(function () {
        ocultarIngresar();
    });

    $("#registroLink").click(function () {
        ocultarValidacion();
    });

    $("#MembresiaMenu").click(function () {
        FunMembresiaMenu();
    });

    $('#correo, #contrasenia').on('input', function () {
        $('#ingresarBtn').prop('disabled', disableBtn);
    });
}