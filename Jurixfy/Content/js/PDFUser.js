var pdfUrluser = '';

function htmlpdfMenuUser() {
    var PDFHTML = '';

    PDFHTML = `
       <div class="container mt-5">
            <div class="row">
                <div class="col-12">
                    <div class="pdf-list-title text-center">PDF</div>
                </div>
            </div>
            <ul class="list-group pdf-list">
            </ul>
        </div>
   `;

    var mainElement = document.getElementById('mainContent');

    mainElement.innerHTML = PDFHTML;

    ConsultaNPDFUser();
}


function ConsultaNPDFUser() {

    $.ajax({
        url: '/PDF/ConsultaPDF',
        type: 'GET',
        success: function (data) {

            var PDFHTMLLista = '';
            data.ListPDF.forEach(function (pdf) {
                PDFHTMLLista += `
                   <li class="list-group-item pdf-list-item">
                    <div class="row">
                        <div class="col-4 text-center lista-item-pdfUser"  data-id="${pdf.UrlPdf}">
                            <span class="mr-3"><i class="bi bi-filetype-pdf"></i></span>
                        </div>
                        <div class="col-8 text-start lista-item-pdfUser"  data-id="${pdf.UrlPdf}">
                            <span>${pdf.NombrePdf}</span>
                        </div>
                    </div>
                </li>`;
            });


            $('.list-group.pdf-list').html(PDFHTMLLista);

            asociarEventosPDFUser();

        },
        error: function () {
            console.log('Error al obtener los datos del servidor.');
        }
    });
}




function asociarEventosPDFUser() {
    $('.lista-item-pdfUser').off('click');;
    $('#PDFMenu').off('click');

    $('#PDFMenu').click(function () {
        sessionStorage.setItem('vista', 'PDFMenu');
        htmlpdfMenuUser()
    });

    $('.lista-item-pdfUser').click(function () {
        var idPDF = $(this).data('id'); 
        var pdfUrluser = '/PDF/PDF?PDFUrl=' + encodeURIComponent(idPDF);

        window.open(pdfUrluser, '_blank');
    });
    
}