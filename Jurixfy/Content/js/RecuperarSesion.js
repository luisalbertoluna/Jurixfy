function recuperarSesion() {
    var userDataString = sessionStorage.getItem('userData');
    if (userDataString) {
        var userData = JSON.parse(userDataString);

        if (userData.EsAdmin === true) {
            document.getElementById("PDFMenu").style.display = "block";
            document.getElementById("ConfiguracionMenu").style.display = "block";
        } else {
            document.getElementById("PDFMenu").style.display = "block";
        }

        document.getElementById("UsuarioMenu").style.display = "block";
        $('#SpanUsuarioText').text(userData.Correo.substring(0, userData.Correo.indexOf('@')));
        
    }

    var miString = sessionStorage.getItem('vista');
    if (miString) {
        switch (miString) {
            case 'UltimoMenu':
                htmlNoticiaUser();
                break;
            case 'PDFMenu':
                htmlpdfMenuUser();
                break;
            case 'pdfMenuSub':
                htmlpdfMenu();
                break;
            case 'UsuarioMenuSub':
                htmlUsuariosMenu();
                break;
            case 'noticiaMenuSub':
                htmlNoticia();
                break;
            default:
                var mainElement = document.getElementById('mainContent');
                mainElement.innerHTML = '';
                break;
        }
    } 
}