var paginaActual = 1;
var totalPagesGlobal = 0;
var iduserElimina = 0;
var pasworup = 0;
var iduserActualizaup = 0;
var pagoup = true;

function htmlUsuariosMenu() {

    var nuevoContenido =
        '<div class="container mt-4">                                                                                                                                          ' +
        '<div class="col-md-12 text-end">                                                                                                                                      ' +
        '        <button id="ModalUserAgregarAdmin" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAgregarUsuario">Agregar Usuario</button>' +
        '    </div>                                                                                                                                                            ' +
        '    <div class="row mt-4">                                                                                                                                            ' +
        '        <div class="col-lg-3 col-md-6 col-sm-12 mb-3">                                                                                                                ' +
        '            <label for="select-administrador" class="form-label">Tipo de Usuario:</label>                                                                             ' +
        '            <select id="select-administrador" class="form-select" aria-label="Administrador">                                                                         ' +
        '                <option value="0"></option>                                                                                                                           ' +
        '                <option value="1">Administrador</option>                                                                                                              ' +
        '                <option value="2">Usuario</option>                                                                                                                    ' +
        '            </select>                                                                                                                                                 ' +
        '        </div>                                                                                                                                                        ' +
        '        <div class="col-lg-3 col-md-6 col-sm-12 mb-3">                                                                                                                ' +
        '            <label for="select-activo" class="form-label">Estado:</label>                                                                                             ' +
        '            <select id="select-activo" class="form-select" aria-label="Activo">                                                                                       ' +
        '                <option value="0"></option>                                                                                                                           ' +
        '                <option value="1">Activo</option>                                                                                                                     ' +
        '                <option value="2">Inactivo</option>                                                                                                                   ' +
        '            </select>                                                                                                                                                 ' +
        '        </div>                                                                                                                                                        ' +
        '        <div class="col-lg-3 col-md-6 col-sm-12 mb-3">                                                                                                                ' +
        '            <label for="select-dias-restantes" class="form-label">Días Restantes:</label>                                                                             ' +
        '            <select id="select-dias-restantes" class="form-select" aria-label="Días Restantes">                                                                       ' +
        '                <option value="0"></option>                                                                                                                           ' +
        '                <option value="1">1</option>                                                                                                                          ' +
        '                <option value="2">2</option>                                                                                                                          ' +
        '                <option value="3">3</option>                                                                                                                          ' +
        '                <option value="4">4</option>                                                                                                                          ' +
        '                <option value="5">5</option>                                                                                                                          ' +
        '            </select>                                                                                                                                                 ' +
        '        </div>                                                                                                                                                        ' +
        '        <div class="col-lg-3 col-md-6 col-sm-12 mb-3">                                                                                                                ' +
        '            <label for="CorreoFiltro" class="form-label">Correo Electrónico:</label>                                                                                  ' +
        '            <div class="input-group">                                                                                                                                 ' +
        '                <input id="CorreoFiltro" type="text" class="form-control" placeholder="Correo electrónico" aria-label="Correo electrónico">                           ' +
        '                <button id="buscaruser" class="btn btn-outline-secondary" type="button"><i class="bi bi-search"></i></button>                                         ' +
        '            </div>                                                                                                                                                    ' +
        '        </div>                                                                                                                                                        ' +
        '    </div>                                                                                                                                                            ' +
        '    <h2 class="mt-4">Usuarios</h2>                                                                                                                                    ' +
        '    <div class="table-responsive" style="margin-bottom: 20px;">                                                                                                       ' +
        '        <table class="table table-striped text-center">                                                                                                               ' +
        '            <thead>                                                                                                                                                   ' +
        '                <tr>                                                                                                                                                  ' +
        '                    <th scope="col">Número</th>                                                                                                                       ' +
        '                    <th scope="col">Correo</th>                                                                                                                       ' +
        '                    <th scope="col">Contraseña</th>                                                                                                                   ' +
        '                    <th scope="col">Fecha Inicio</th>                                                                                                                 ' +
        '                    <th scope="col">Fecha Fin</th>                                                                                                                    ' +
        '                    <th scope="col">Activo</th>                                                                                                                       ' +
        '                    <th scope="col">Administrador</th>                                                                                                                ' +
        '                    <th scope="col">Pagó</th>                                                                                                                         ' +
        '                    <th scope="col">Dias Restantes</th>                                                                                                               ' +
        '                    <th scope="col">Actualizar</th>                                                                                                                   ' +
        '                    <th scope="col">Eliminar</th>                                                                                                                     ' +
        '                </tr>                                                                                                                                                 ' +
        '            </thead>                                                                                                                                                  ' +
        '            <tbody id="table-body">                                                                                                                                   ' +
        '            </tbody>                                                                                                                                                  ' +
        '        </table>                                                                                                                                                      ' +
        '    </div>                                                                                                                                                            ' +
        '    <nav aria-label="Page navigation example">                                                                                                                        ' +
        '        <div class="d-flex justify-content-between align-items-center">                                                                                               ' +
        '            <span id="totalRegistrosLabel" class="total-registros-label"></span>                                                                                      ' +
        '            <ul id="pagination-ul" class="pagination"></ul>                                                                                                           ' +
        '        </div>                                                                                                                                                        ' +
        '    </nav>                                                                                                                                                            ' +
        '</div>                                                                                                                                                                ' +
        '<div class="modal fade" id="confirmacionEliminarUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">                                        ' +
        '    <div class="modal-dialog">                                                                                                                                        ' +
        '        <div class="modal-content">                                                                                                                                   ' +
        '            <div class="modal-header">                                                                                                                                ' +
        '                <h5 class="modal-title" id="exampleModalLabel">Confirmar Eliminación</h5>                                                                             ' +
        '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>                                                          ' +
        '            </div>                                                                                                                                                    ' +
        '            <div class="modal-body">                                                                                                                                  ' +
        '                <span id="labelMensaje"></span>                                                                                                                       ' +
        '                <div id="mensajeAlertaUserEliminacion" class="alert alert-success d-none" role="alert">                                                               ' +
        '                </div>                                                                                                                                                ' +
        '                <div id="spinner-container-EliminarAdmin" class="text-center" style="display: none;">                                                                 ' +
        '                    <div id="spinner" class="spinner-border text-primary" role="status">                                                                              ' +
        '                        <span class="visually-hidden">Cargando...</span>                                                                                              ' +
        '                    </div>                                                                                                                                            ' +
        '                </div>                                                                                                                                                ' +
        '            </div>                                                                                                                                                    ' +
        '            <div class="modal-footer">                                                                                                                                ' +
        '                <button id="confirmarUsuarioEliminar" type="button" class="btn btn-danger">Eliminar</button>                                                          ' +
        '            </div>                                                                                                                                                    ' +
        '        </div>                                                                                                                                                        ' +
        '    </div>                                                                                                                                                            ' +
        '</div>                                                                                                                                                                ' +
        '<div class="modal fade" id="modalActualizarUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">                                             ' +
        '    <div class="modal-dialog modal-dialog-centered">                                                                                                                  ' +
        '        <div class="modal-content">                                                                                                                                   ' +
        '            <div class="modal-header">                                                                                                                                ' +
        '                <h5 class="modal-title" id="exampleModalLabel">Actualizar Usuario</h5>                                                                                ' +
        '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>                                                          ' +
        '            </div>                                                                                                                                                    ' +
        '            <div class="modal-body">                                                                                                                                  ' +
        '                <form id="formActualizarUsuario">                                                                                                                     ' +
        '                    <div class="mb-3">                                                                                                                                ' +
        '                        <label for="correoUsuarioUp" class="form-label">Correo electrónico:</label>                                                                   ' +
        '                        <input type="email" class="form-control" id="correoUsuarioUp" placeholder="Correo electrónico">                                               ' +
        '                    </div>                                                                                                                                            ' +
        '                    <div class="mb-3">                                                                                                                                ' +
        '                        <label for="fechaInicioUp" class="form-label">Fecha de inicio:</label>                                                                        ' +
        '                        <input type="datetime-local" class="form-control" id="fechaInicioUp">                                                                         ' +
        '                    </div>                                                                                                                                            ' +
        '                    <div class="mb-3">                                                                                                                                ' +
        '                        <label for="fechaFinUp" class="form-label">Fecha de fin:</label>                                                                              ' +
        '                        <input type="datetime-local" class="form-control" id="fechaFinUp">                                                                            ' +
        '                    </div>                                                                                                                                            ' +
        '                    <div class="mb-3 form-check">                                                                                                                     ' +
        '                        <input type="checkbox" class="form-check-input" id="esAdminUp">                                                                               ' +
        '                        <label class="form-check-label" for="esAdmin">Administrador</label>                                                                           ' +
        '                    </div>                                                                                                                                            ' +
        '                    <div class="mb-3 form-check">                                                                                                                     ' +
        '                        <input type="checkbox" class="form-check-input" id="activoUP">                                                                                ' +
        '                        <label class="form-check-label" for="activo">Activo</label>                                                                                   ' +
        '                    </div>                                                                                                                                            ' +
        '                </form>                                                                                                                                               ' +
        '            </div>                                                                                                                                                    ' +
        '            <div class="modal-footer">                                                                                                                                ' +
        '                <button id="actualizarUsuario" type="submit" class="btn btn-primary">Actualizar</button>                                                              ' +
        '            </div>                                                                                                                                                    ' +
        '        </div>                                                                                                                                                        ' +
        '    </div>                                                                                                                                                            ' +
        '</div>                                                                                                                                                                ' +
        '<div class="modal fade" id="modalAgregarUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">                                                ' +
        '    <div class="modal-dialog">                                                                                                                                        ' +
        '        <div class="modal-content">                                                                                                                                   ' +
        '            <div class="modal-header">                                                                                                                                ' +
        '                <h5 class="modal-title" id="exampleModalLabel">Agregar Usuario</h5>                                                                                   ' +
        '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>                                                          ' +
        '            </div>                                                                                                                                                    ' +
        '            <div class="modal-body">                                                                                                                                  ' +
        '                <form>                                                                                                                                                ' +
        '                    <div class="mb-3">                                                                                                                                ' +
        '                        <label id="labelcorreoAgregar" for="correoAgregar" class="form-label">Correo electrónico:</label>                                             ' +
        '                        <input type="email" class="form-control" id="correoAgregar" placeholder="Ingrese el correo electrónico" required>                             ' +
        '                    </div>                                                                                                                                            ' +
        '                    <div id="mensajeAlertaUserAdmin" class="alert alert-success d-none" role="alert">                                                                 ' +
        '                    </div>                                                                                                                                            ' +
        '                    <div id="spinner-container-agregarAdmin" class="text-center" style="display: none;">                                                              ' +
        '                        <div id="spinner" class="spinner-border text-primary" role="status">                                                                          ' +
        '                            <span class="visually-hidden">Cargando...</span>                                                                                          ' +
        '                        </div>                                                                                                                                        ' +
        '                    </div>                                                                                                                                            ' +
        '                </form>                                                                                                                                               ' +
        '            </div>                                                                                                                                                    ' +
        '            <div class="modal-footer">                                                                                                                                ' +
        '                <button id="AgregarUserAdmin" type="button" class="btn btn-primary" disabled>Agregar</button>                                                         ' +
        '            </div>                                                                                                                                                    ' +
        '        </div>                                                                                                                                                        ' +
        '    </div>                                                                                                                                                            ' +
        '</div>                                                                                                                                                                ' ;


    var mainElement = document.getElementById('mainContent');

    mainElement.innerHTML = nuevoContenido;
    asociarEventosUsuario();
    usuariosMenu();
}

function usuariosMenu() {
    paginaActual = 1;
    FitroMembresia(paginaActual);

}

function disableBtnAgregarUserAdmin() {
    if ($('#correoAgregar').val().trim() !== '') {
        return false;
    } else {
        return true;
    }
}


function FitroMembresia(pagina) {

    $.ajax({
        url: '/Jurixfy/DetalleMembresias',
        type: 'POST',
        data: {
            Correo: $('#CorreoFiltro').val(),
            ActivoFil: $('#select-activo').val(),
            EsAdminFil: $('#select-administrador').val(),
            DiasRestantes: $('#select-dias-restantes').val(),
            Size: 5,
            Pagina: pagina - 1,
        },
        success: function (data) {
            $('#table-body').empty();

            $.each(data.ListMembresias, function (index, item) {
                var row = '<tr>' +
                    '<td>' + item.MembresiaId + '</td>' +
                    '<td>' + item.Correo + '</td>' +
                    '<td>****</td>' +
                    '<td>' + item.FechaI + '</td>' +
                    '<td>' + item.FechaF + '</td>' +
                    '<td>' + (item.Activo == true ? 'Activo' : 'Inactivo') + '</td>' +
                    '<td>' + (item.EsAdmin == true ? 'Administardor' : 'Usuario') + '</td>' +
                    '<td>' + (item.Pago == true ? 'Si' : 'No') + '</td>' +
                    '<td>' + item.DiasRestantes + '</td>' +
                    '<td><a href="#" class="btn btn-info btn-link-actualiza" data-userid="' + item.MembresiaId + '">Actualizar</a></td>' +
                    '<td><a href="#" class="btn btn-danger btn-eliminar-usuario" data-userid="' + item.MembresiaId + '" data-correo="' + item.Correo + '">Eliminar</a></td>' +
                    '</tr>';

                $('#table-body').append(row);
            });

            $('#totalRegistrosLabel').text('Registros: ' + data.Total);
            updatePaginator(data.Total, pagina);
        },
        error: function () {
            console.log('Error al obtener los datos del servidor.');
        }
    });
}

function updatePaginator(totalRegistros, paginaActual) {
    var totalPages = Math.ceil(totalRegistros / 5);
    totalPagesGlobal = totalPages;
    var $paginator = $('#pagination-ul');

    $paginator.empty();

    if (parseInt(paginaActual) === 1) {
        $paginator.append('<li class="page-item disabled"><a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a></li>');
    } else {
        $paginator.append('<li class="page-item"><a class="page-link" href="#" tabindex="-1">Anterior</a></li>');
    }

    for (var i = 1; i <= totalPages; i++) {
        var activeClass = (i === paginaActual) ? 'active' : '';
        $paginator.append('<li class="page-item ' + activeClass + '"><a class="page-link" href="#">' + i + '</a></li>');
    }

    if (parseInt(paginaActual) === parseInt(totalPages)) {
        $paginator.append('<li class="page-item disabled"><a class="page-link" href="#">Siguiente</a></li>');
    } else {
        $paginator.append('<li class="page-item"><a class="page-link" href="#">Siguiente</a></li>');
    }
}


function activarmodarAgregaruser() {
    document.getElementById("correoAgregar").style.display = "block";
    document.getElementById("correoAgregar").value = "";
    document.getElementById("labelcorreoAgregar").style.display = "block";
    document.getElementById("AgregarUserAdmin").style.display = "block";
    $('#mensajeAlertaUserAdmin').addClass('d-none');
}

function AgregarUserAdminFun() {

    document.getElementById("correoAgregar").style.display = "none";
    document.getElementById("labelcorreoAgregar").style.display = "none";
    document.getElementById("AgregarUserAdmin").style.display = "none";

    $('#spinner-container-agregarAdmin').show();

    $.ajax({
        url: '/Jurixfy/AgregarUserAdmin',
        type: 'POST',
        data: { Correo: $('#correoAgregar').val().trim() },
        success: function (data) {
            $('#mensajeAlertaUserAdmin').text(data.Mensaje);
            $('#mensajeAlertaUserAdmin').removeClass('d-none');

            $('#spinner-container-agregarAdmin').hide();
            paginaActual = 1;
            FitroMembresia(paginaActual);

        },
        error: function () {
            $('#spinner-container-agregarAdmin').hide();
            console.log('Error al hacer la gestión de ingresar o validar correo.');
        }
    });
}

function abrirModalConfirmacion(nombreUsuario) {
    $('#labelMensaje').text('¿Estás seguro de que deseas eliminar al usuario "' + nombreUsuario + '"?');
    $('#confirmacionEliminarUsuario').modal('show');
}

function obtenerDetalleUsuario(idUsuario) {

    $.ajax({
        url: '/Jurixfy/OtenerDetalleMembresia',
        type: 'POST',
        data: { Id: idUsuario },
        success: function (data) {
            $('#correoUsuarioUp').val(data.Correo);
            $('#fechaInicioUp').val(data.FechaI);
            $('#fechaFinUp').val(data.FechaF);
            $('#esAdminUp').prop('checked', data.EsAdmin);
            $('#activoUP').prop('checked', data.Activo);
            pasworup = data.Pasword;
            iduserActualizaup = data.MembresiaId;
            pagoup = data.Pago;
            $('#modalActualizarUsuario').modal('show');
        },
        error: function () {
            console.log('Error al obtener detalles del usuario');
        }
    });
}

function EliminarUser() {
    document.getElementById("labelMensaje").style.display = "none";
    document.getElementById("confirmarUsuarioEliminar").style.display = "none";

    $('#spinner-container-EliminarAdmin').show();

    $.ajax({
        url: '/Jurixfy/EliminarMembresia',
        type: 'POST',
        data: { Id: iduserElimina },
        success: function (data) {
            $('#spinner-container-EliminarAdmin').hide();
            $('#mensajeAlertaUserEliminacion').text(data.Mensaje);
            $('#mensajeAlertaUserEliminacion').removeClass('d-none');
            paginaActual = 1;
            FitroMembresia(paginaActual);
        },
        error: function (xhr, status, error) {
            $('#spinner-container-EliminarAdmin').hide();
            console.log('Error al eliminar el usuario:', error);
        }
    });
}

function ActualizaUser() {

    $.ajax({
        url: '/Jurixfy/AztualizarMembresia',
        type: 'POST',
        data: {
            MembresiaId: iduserActualizaup,
            Correo: $('#correoUsuarioUp').val(),
            Pasword: pasworup,
            FechaInicio: $('#fechaInicioUp').val(),
            FechaFin: $('#fechaFinUp').val(),
            EsAdmin: $('#esAdminUp').prop('checked'),
            Activo: $('#activoUP').prop('checked'),
            Pago: pagoup
        },
        success: function (data) {
            paginaActual = 1;
            FitroMembresia(paginaActual);
            $('#modalActualizarUsuario').modal('hide');
        },
        error: function () {
            console.log('Error al obtener detalles del usuario');
        }
    });
}

function asociarEventosUsuario() {

    $('#actualizarUsuario').off();
    $('#confirmarUsuarioEliminar').off();
    $(document).off('click', '.btn-link-actualiza');
    $(document).off('click', '.btn-eliminar-usuario');
    $('#select-activo').off();
    $('#select-administrador').off();
    $('#select-dias-restantes').off();
    $('#buscaruser').off();
    $('#AgregarUserAdmin').off('click');
    $('#ModalUserAgregarAdmin').off('click');
    $('#UsuarioMenuSub').off('click');
    $('#correoAgregar').off('input');
    $('#pagination-ul').off('click', 'li.page-item');

    $('#actualizarUsuario').click(function () {
        ActualizaUser();
    });

    $('#confirmarUsuarioEliminar').click(function () {
        EliminarUser();
    });

    $(document).on('click', '.btn-link-actualiza', function () {
        obtenerDetalleUsuario($(this).data('userid'));
    });

    $(document).on('click', '.btn-eliminar-usuario', function () {
        iduserElimina = $(this).data('userid');
        var nombreUsuario = $(this).data('correo');
        $('#mensajeAlertaUserEliminacion').addClass('d-none');
        document.getElementById("labelMensaje").style.display = "block";
        document.getElementById("confirmarUsuarioEliminar").style.display = "block";
        abrirModalConfirmacion(nombreUsuario);
    });

    $('#select-activo').change(function () {
        usuariosMenu();
    });

    $('#select-administrador').change(function () {
        usuariosMenu();
    });

    $('#select-dias-restantes').change(function () {
        usuariosMenu();
    });

    $('#buscaruser').click(function () {
        usuariosMenu();
    });

    $('#AgregarUserAdmin').on('click', function () {
        AgregarUserAdminFun();
    });

    $('#ModalUserAgregarAdmin').on('click', function () {
        activarmodarAgregaruser();
    });

    $('#UsuarioMenuSub').on('click', function () {
        sessionStorage.setItem('vista', 'UsuarioMenuSub');
        htmlUsuariosMenu();
    })

    $('#correoAgregar').on('input', function () {
        $('#AgregarUserAdmin').prop('disabled', disableBtnAgregarUserAdmin);
    });

    $('#pagination-ul').on('click', 'li.page-item', function () {
        var textoEnlace = $(this).find('a').text().trim();

        if (textoEnlace === 'Anterior') {
            if (paginaActual > 1) {
                paginaActual--;
                FitroMembresia(paginaActual);
            }
        } else if (textoEnlace === 'Siguiente') {
            if (paginaActual < totalPagesGlobal) {
                paginaActual++;
                FitroMembresia(paginaActual);
            }
        } else {
            var paginaSeleccionada = parseInt(textoEnlace);
            paginaActual = paginaSeleccionada;
            FitroMembresia(paginaActual);
        }
    });
}