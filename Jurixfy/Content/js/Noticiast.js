var idNoticiaElimina = 0;
var idactualizaNoticia = 0;


function htmlNoticia() {
    var noticiasHTMLLista = '';

    noticiasHTMLLista = `
        <div class="container mt-4">
            <div class="row">
                <div class="col-md-8">

                </div>
                <div class="col-md-4 d-none d-md-block">
                    <div class="list-group">
                        <div class="text-end">
                            <button type="button" id="AgregarNoticiaModaBoton" class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#agregarNoticiaModal">
                                Agregar Noticia
                            </button>
                        </div>
                        <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                            Noticias Recientes
                        </a>
                        <div id="noticiasListrelevantes">

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="agregarNoticiaModal" tabindex="-1" aria-labelledby="agregarNoticiaModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="agregarNoticiaModalLabel">Agregar Noticia</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="bodyNoticia">
                            <div class="mb-3">
                                <label for="tituloNoticia" class="form-label">Título de la noticia:</label>
                                <input type="text" class="form-control" id="tituloNoticia">
                            </div>
                            <div class="mb-3">
                                <label for="descripcionNoticia" class="form-label">Descripción de la noticia:</label>
                                <textarea class="form-control" id="descripcionNoticia" rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="imagenNoticia" class="form-label">Imagen:</label>
                                <input type="file" class="form-control" id="imagenNoticia">
                                <div class="alert alert-danger d-none mt-2" id="alertaArchivoInvalido" role="alert">
                                    Por favor, seleccione un archivo PNG, JPG o JPEG.
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="urlNoticia" class="form-label">URL:</label>
                                <input type="text" class="form-control" id="urlNoticia">
                            </div>

                        </form>
                        <div id="spinner-container-Noticias" class="text-center d-none">
                            <div id="spinner" class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Cargando...</span>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button id="GuardarNoticia" type="button" class="btn btn-primary" disabled>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="actualizarNoticiaModal" tabindex="-1" aria-labelledby="actualizarNoticiaModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="actualizarNoticiaModalLabel">Actualizar Noticia</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="bodyNoticiaActualizar">
                            <div class="mb-3">
                                <label for="tituloNoticiaUP" class="form-label">Título de la noticia:</label>
                                <input type="text" class="form-control" id="tituloNoticiaUP">
                            </div>
                            <div class="mb-3">
                                <label for="descripcionNoticiaUP" class="form-label">Descripción de la noticia:</label>
                                <textarea class="form-control" id="descripcionNoticiaUP" rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="imagenNoticiaUP" class="form-label" data-bs-toggle="tooltip" data-bs-placement="top" title="Para cambiar a otra imagen, selecciónela de nuevo">Imagen:</label>
                                <input type="file" class="form-control" id="imagenNoticiaUP" data-bs-toggle="tooltip" data-bs-placement="top" title="Para cambiar a otra imagen, selecciónela de nuevo">
                                <br />
                                <b><spn id="Imagenlabel">Imagen Anterio: <span id="nomImg"></span></spn></b>
                                <div class="alert alert-danger d-none mt-2" id="alertaArchivoInvalidoUP" role="alert">
                                    Por favor, seleccione un archivo PNG, JPG o JPEG.
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="urlNoticiaUP" class="form-label">URL:</label>
                                <input type="text" class="form-control" id="urlNoticiaUP">
                            </div>

                        </form>
                        <div id="spinner-container-Noticias-Actualizar" class="text-center d-none">
                            <div id="spinner" class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Cargando...</span>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button id="ActualizarNoticia" type="button" class="btn btn-primary" disabled>Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="confirmarEliminarModal" tabindex="-1" aria-labelledby="confirmarEliminarModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmarEliminarModalLabel">Confirmar eliminación</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que quieres eliminar esta noticia?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" id="EliminarNoticia">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
           `;
    var mainElement = document.getElementById('mainContent');

    mainElement.innerHTML = noticiasHTMLLista;
    
    ConsultaNoticas();

}

function ConsultaNoticas() {

    $.ajax({
        url: '/Noticia/ConsultaNoticas',
        type: 'GET',
        success: function (data) {

            var noticiasHTMLLista = '';
            data.Noticias.forEach(function (noticia) {
                noticiasHTMLLista += `
                    <div class="card mb-3" id="${noticia.NoticiaID}">
                        <img src="${noticia.Img}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <div class="text-end mb-3">
                                    <button type="button" class="btn btn-sm btn-primary me-2 actualizar-noticia" data-id="${noticia.NoticiaID}">Editar</button>
                                    <button type="button" class="btn btn-sm btn-danger eliminar-noticia" data-id="${noticia.NoticiaID}">Eliminar</button>
                          </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="card-title">${noticia.NomNotica}</h5>
                            </div>
                            <p class="card-text Texto-noticia justifyText">${noticia.NotaDesc}</p>
                            <div class="row">
                                <div class="col-6">
                                    <p class="card-text"><small class="text-muted">${noticia.Tiempo}</small></p>
                                </div>
                                <div class="col-6 text-end">
                                    <a href="${noticia.Urls}" class="card-link">Ver más detalles</a>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });

            
            $('.col-md-8').html(noticiasHTMLLista);

            var noticiasRelevanteHTMLLista = '';

            data.NoticiasRelevantes.forEach(function (noticia) {
                noticiasRelevanteHTMLLista += `
                    <a href="#${noticia.NoticiaID}" class="list-group-item list-group-item-action">
                        <div class="d-flex align-items-start">
                            <img src="${noticia.Img}" alt="${noticia.NomNotica}" class="me-3" style="max-width: 100px; max-height: 100px; object-fit: cover;">
                            <div class="flex-grow-1">
                                <h5 class="mb-1">${noticia.NomNotica}</h5>
                                <p class="mb-1 justifyText">${noticia.NotaDesc}</p>
                                <small>${noticia.Tiempo}</small>
                            </div>
                        </div>
                    </a>`;
            });

            $('#noticiasListrelevantes').html(noticiasRelevanteHTMLLista);

            asociarEventosNoticia();

        },
        error: function () {
            console.log('Error al obtener los datos del servidor.');
        }
    });
}

function agregarNoticiAjax() {
    $('#bodyNoticia').addClass('d-none');
    $('#spinner-container-Noticias').removeClass('d-none');
    $('#GuardarNoticia').addClass('d-none');
    
    
    var formData = new FormData();
    formData.append('NomNotica', $('#tituloNoticia').val().trim());
    formData.append('NotaDesc', $('#descripcionNoticia').val().trim());
    formData.append('ImgWeb', $('#imagenNoticia')[0].files[0]); 
    formData.append('Urls', $('#urlNoticia').val().trim());

    $.ajax({
        url: '/Noticia/AgregarNoticia',
        type: 'POST',
        processData: false, 
        contentType: false, 
        data: formData,
        success: function (response) {
            $('#spinner-container-Noticias').addClass('d-none');
        
            $('#agregarNoticiaModal').modal('hide');

            ConsultaNoticas();
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

function disableBtnAgregarNoticia() {
    if ($('#tituloNoticia').val().trim() !== '' && $('#descripcionNoticia').val().trim() !== '' && $('#imagenNoticia').val().trim() !== '' && $('#urlNoticia').val().trim() !== '') {
        return false;
    } else {
        return true;
    }
}

function disableBtnActualizaNoticia() {
    if ($('#tituloNoticiaUP').val().trim() !== '' && $('#descripcionNoticiaUP').val().trim() !== '' && $('#urlNoticiaUP').val().trim() !== '') {
        return false;
    } else {
        return true;
    }
}

function limpiraModal() {
    $('#bodyNoticia').removeClass('d-none');
    $('#GuardarNoticia').removeClass('d-none');
    $('#tituloNoticia').val('');
    $('#descripcionNoticia').val('');
    $('#imagenNoticia').val('');
    $('#urlNoticia').val('');
    $('#alertaArchivoInvalido').addClass('d-none');
    $('#bodyNoticia').css('display', 'block');
}

function ActualizarNoticiaDetalle(Id) {
    $('#actualizarNoticiaModal').modal('show');
    $('#bodyNoticiaActualizar').removeClass('d-none');
    $('#spinner-container-Noticias-Actualizar').addClass('d-none');
    $('#ActualizarNoticia').removeClass('d-none');
    idactualizaNoticia = Id;
    $.ajax({
        url: '/Noticia/ObtenerNoticia',
        type: 'GET',
        data: {ID: Id},
        success: function (response) {
            $('#tituloNoticiaUP').val(response.NomNotica);
            $('#descripcionNoticiaUP').val(response.NotaDesc);
            $('#urlNoticiaUP').val(response.Urls);
            $('#nomImg').text(response.Img);
            $('#ActualizarNoticia').prop('disabled', disableBtnActualizaNoticia);
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

function actualizarNoticiAjax() {
    $('#bodyNoticiaActualizar').addClass('d-none');
    $('#spinner-container-Noticias-Actualizar').removeClass('d-none');
    $('#ActualizarNoticia').addClass('d-none');

    
    var formData = new FormData();
    formData.append('NomNotica', $('#tituloNoticiaUP').val().trim());
    formData.append('NotaDesc', $('#descripcionNoticiaUP').val().trim());
    formData.append('ImgWeb', $('#imagenNoticiaUP')[0].files[0]);
    formData.append('Urls', $('#urlNoticiaUP').val().trim());
    formData.append('Img', $('#nomImg').text().trim());
    formData.append('NoticiaID', idactualizaNoticia );
    

    $.ajax({
        url: '/Noticia/ActualizarNoticia',
        type: 'POST',
        processData: false,
        contentType: false,
        data: formData,
        success: function (response) {
            $('#spinner-container-Noticias-Actualizar').addClass('d-none');

            $('#actualizarNoticiaModal').modal('hide');

            ConsultaNoticas();
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

function eliminarNoticia() {
    
        $.ajax({
            url: '/Noticia/EliminarrNoticia',
            type: 'POST', 
            data: { Id: idNoticiaElimina },
            success: function (response) {
                ConsultaNoticas();
                $('#confirmarEliminarModal').modal('hide');
            },
            error: function (xhr, status, error) {
                
                console.error('Error al eliminar la noticia:', error);
            }
        });
}

function asociarEventosNoticia() {

    $('#EliminarNoticia').off();
    $('#noticiaMenuSub').off();
    $('[data-bs-toggle="tooltip"]').tooltip('dispose');
    $('.actualizar-noticia').off();
    $('.eliminar-noticia').off();
    $('#ActualizarNoticia').off();
    $('#GuardarNoticia').off();
    $('#imagenNoticia').off();
    $('#imagenNoticiaUP').off();
    $("#AgregarNoticiaModaBoton").off();
    $('#tituloNoticia, #descripcionNoticia, #imagenNoticia, #urlNoticia').off();
    $('#tituloNoticiaUP, #descripcionNoticiaUP, #urlNoticiaUP').off();
    $(".show-more").off();
    $(window).off('scroll');
    $('#btnVolverArriba').off();
    $('.list-group-item').off();

    $('#EliminarNoticia').click(function () {
        eliminarNoticia();
    });

    $('[data-bs-toggle="tooltip"]').tooltip();

    $('.actualizar-noticia').click(function () {
        var idNoticia = $(this).data('id');
        $('#Imagenlabel').removeClass('d-none');
        $('#imagenNoticiaUP').val('');
        
        ActualizarNoticiaDetalle(idNoticia);
    });

    $('#noticiaMenuSub').click(function () {
        sessionStorage.setItem('vista', 'noticiaMenuSub');
        htmlNoticia();
    });

    $('.eliminar-noticia').click(function () {
        var idNoticia = $(this).data('id');
        idNoticiaElimina = idNoticia;
        $('#confirmarEliminarModal').modal('show');
    });

    $('#ActualizarNoticia').click(function () {
        actualizarNoticiAjax();
    });

    $('#GuardarNoticia').click(function () {
        agregarNoticiAjax();
    });

    $('#imagenNoticia').change(function () {

        $('#alertaArchivoInvalido').addClass('d-none');
        var fileName = $(this).val().split('\\').pop();

        if (!(/\.(png|jpg|jpeg)$/i).test(fileName)) {
            
            $('#alertaArchivoInvalido').removeClass('d-none');
            $(this).val('');
        }
    });


    $('#imagenNoticiaUP').change(function () {

        var fileName = $(this).val().split('\\').pop();

        if (!(/\.(png|jpg|jpeg)$/i).test(fileName)) {

            $('#alertaArchivoInvalidoUP').removeClass('d-none');
            $(this).val('');
        } else {
            $('#alertaArchivoInvalidoUP').addClass('d-none');
            $('#nomImg').text('');
            $('#Imagenlabel').addClass('d-none');
        }
    });

    $("#AgregarNoticiaModaBoton").click(function () {
        limpiraModal();
    });

    $('#tituloNoticia, #descripcionNoticia, #imagenNoticia, #urlNoticia').on('input', function () {
        $('#GuardarNoticia').prop('disabled', disableBtnAgregarNoticia);
    });

    $('#tituloNoticiaUP, #descripcionNoticiaUP, #urlNoticiaUP').on('input', function () {
        $('#ActualizarNoticia').prop('disabled', disableBtnActualizaNoticia);
    });

    $(".card-text.Texto-noticia").each(function () {
        var content = $(this).text();
        var maxLength = 20;
        if (content.length > maxLength) {
            var truncatedContent = content.substr(0, maxLength);
            $(this).html(truncatedContent + '<span class="ellipsis">...</span>' +
                '<span class="more-text" style="display: none;">' + content.substr(maxLength) + '</span>' +
                '     <a href="#" class="show-more">Ver más</a>');
        }
    });

    $(".show-more").click(function (e) {
        e.preventDefault();
        var $content = $(this).prev(".more-text");
        var $ellipsis = $(this).prevAll(".ellipsis").first();
        $(this).toggleClass("less-text");
        $content.toggle();
        $ellipsis.toggle();
        if ($(this).hasClass("less-text")) {
            $(this).text("Ver menos");
        } else {
            $(this).text("Ver más");
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#btnVolverArriba').fadeIn();
        } else {
            $('#btnVolverArriba').fadeOut();
        }
    });

    $('#btnVolverArriba').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });

    $('.list-group-item').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        var offset = $(target).offset().top;
        $('html, body').scrollTop(offset);
    });
}