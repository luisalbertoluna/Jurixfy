var idPDFElimina = 0;
var pdfUrl = '';

function htmlpdfMenu() {
    var PDFHTML = '';

    PDFHTML = `
<div class="container mt-5">
            <div class="row">
                <div class="col-6">
                    <div class="pdf-list-title text-start">PDF</div>
                </div>
                <div class="col-6 text-end">
                    <button type="button" class="btn btn-primary mb-3" id="agregarModal">Agregar PDF</button>
                </div>
            </div>
            <ul class="list-group pdf-list">
            </ul>
        </div>
        <div class="modal fade" id="addPdfModal" tabindex="-1" aria-labelledby="addPdfModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addPdfModalLabel">Agregar PDF</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="bodyPDF">
                            <div class="mb-3">
                                <label for="archivoPDF" class="form-label">PDF:</label>
                                <input type="file" class="form-control" id="archivoPDF">
                            </div>
                            <div class="alert alert-danger d-none mt-2" id="alertaArchivoPDFmostarr" role="alert">
                                Por favor, seleccione un archivo PDF.
                            </div>
                        </form>
                        <div id="spinner-container-pdf" class="text-center d-none">
                            <div id="spinner" class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="addPdfBtn" type="button" class="btn btn-primary" disabled>Agregar PDF</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="confirmarEliminarPDFModal" tabindex="-1" aria-labelledby="confirmarEliminarPDFModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmarEliminarPDFModalLabel">Confirmar eliminación</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que quieres eliminar este PDF?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" id="EliminarPDF">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
   `;

    var mainElement = document.getElementById('mainContent');

    mainElement.innerHTML = PDFHTML;

    ConsultaNPDF();
}

function eliminarPDF() {

    $.ajax({
        url: '/PDF/EliminarrPDF',
        type: 'POST',
        data: { Id: idPDFElimina },
        success: function (response) {
            ConsultaNPDF();
            $('#confirmarEliminarPDFModal').modal('hide');
        },
        error: function (xhr, status, error) {

            console.error('Error al eliminar la noticia:', error);
        }
    });
}

function ConsultaNPDF() {

    $.ajax({
        url: '/PDF/ConsultaPDF',
        type: 'GET',
        success: function (data) {

            var PDFHTMLLista = '';
            data.ListPDF.forEach(function (pdf) {
                PDFHTMLLista += `
                   <li class="list-group-item pdf-list-item">
                    <div class="row">
                        <div class="col-4 text-start lista-item-pdf"  data-id="${pdf.UrlPdf}">
                            <span class="mr-3"><i class="bi bi-filetype-pdf"></i></span>
                        </div>
                        <div class="col-4 text-center lista-item-pdf"  data-id="${pdf.UrlPdf}">
                            <span>${pdf.NombrePdf}</span>
                        </div>
                        <div class="col-4 text-end">
                            <button type="button" class="btn btn-sm btn-danger eliminar-PDF" data-id="${pdf.PdfID}">Eliminar</button>
                        </div>
                    </div>
                </li>`;
            });


            $('.list-group.pdf-list').html(PDFHTMLLista);

            asociarEventosPDF();

        },
        error: function () {
            console.log('Error al obtener los datos del servidor.');
        }
    });
}


function agregarPDFjax() {

    $('#addPdfBtn').addClass('d-none');
    $('#bodyPDF').addClass('d-none');
    $('#spinner-container-pdf').removeClass('d-none');
    
    var formData = new FormData();
    formData.append('PdfWeb', $('#archivoPDF')[0].files[0]);
    

    $.ajax({
        url: '/PDF/AgregarPDF',
        type: 'POST',
        processData: false,
        contentType: false,
        data: formData,
        success: function (response) {
            $('#addPdfBtn').removeClass('d-none');
            $('#bodyPDF').removeClass('d-none');
            $('#spinner-container-pdf').addClass('d-none');

            $('#addPdfModal').modal('hide');
            $('#archivoPDF').val('');
            $('#addPdfBtn').prop('disabled', true);
            ConsultaNPDF();
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

function asociarEventosPDF() {
    $('.lista-item-pdf').off('click');
    $('#EliminarPDF').off('click');
    $('.eliminar-PDF').off('click');
    $('#addPdfBtn').off('click');
    $('#agregarModal').off('click');
    $('#archivoPDF').off('change');
    $('#PdfMenuSub').off('click');

    $('#PdfMenuSub').click(function () {
        sessionStorage.setItem('vista', 'pdfMenuSub');
        htmlpdfMenu()
    });

    $('.lista-item-pdf').click(function () {
        var idPDF = $(this).data('id'); 
        var pdfUrl = '/PDF/PDF?PDFUrl=' + encodeURIComponent(idPDF); 

        window.open(pdfUrl, '_blank');
    });
    
    $('#EliminarPDF').click(function () {
        eliminarPDF();
    });

    $('.eliminar-PDF').click(function () {
        var Id = $(this).data('id');
        idPDFElimina = Id;
        $('#confirmarEliminarPDFModal').modal('show');
    });

    $('#addPdfBtn').click(function () {
        agregarPDFjax();
    });

    $('#agregarModal').click(function () {
        $('#addPdfModal').modal('show');
    });

    $('#archivoPDF').change(function () {
        $('#alertaArchivoPDFmostarr').addClass('d-none');
        var fileName = $(this).val();
        var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        if (ext === 'pdf') {
            $('#addPdfBtn').prop('disabled', false); 
        } else {
            $('#addPdfBtn').prop('disabled', true);
            $(this).val('');
            $('#alertaArchivoPDFmostarr').removeClass('d-none');
            
        }
    });
}