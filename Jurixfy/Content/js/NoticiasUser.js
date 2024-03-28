function htmlNoticiaUser() {
    var noticiasHTMLLista = '';

    noticiasHTMLLista = `
        <div class="container mt-4">
            <div class="row">
                <div class="col-md-8">

                </div>
                <div class="col-md-4 d-none d-md-block">
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                            Noticias Recientes
                        </a>
                        <div id="noticiasListrelevantes">

                        </div>

                    </div>
                </div>
            </div>
        </div>
           `;
    var mainElement = document.getElementById('mainContent');

    mainElement.innerHTML = noticiasHTMLLista;
    
    ConsultaNoticasUser();

}

function ConsultaNoticasUser() {

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

            asociarEventosNoticiaUser();

        },
        error: function () {
            console.log('Error al obtener los datos del servidor.');
        }
    });
}

function asociarEventosNoticiaUser() {

    $('#UltimoMenu').off();
    $(".show-more").off();
    $(window).off('scroll');
    $('#btnVolverArriba').off();
    $('.list-group-item').off();

   
    $('#UltimoMenu').click(function () {
        sessionStorage.setItem('vista', 'UltimoMenu');
        htmlNoticiaUser();
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