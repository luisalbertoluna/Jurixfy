function FunSalirMenu() {
    document.getElementById("PDFMenu").style.display = "none";
    document.getElementById("ConfiguracionMenu").style.display = "none";
    document.getElementById("UsuarioMenu").style.display = "none";
    document.getElementById("MembresiaMenu").style.display = "block";
    sessionStorage.removeItem('userData');
}

function asociarEventosSalir() {
    $('#SalirMenu').on('click', function () {
        sessionStorage.setItem('vista', '');
        FunSalirMenu();
        location.reload();
    });
}

