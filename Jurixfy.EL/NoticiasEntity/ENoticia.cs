using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Jurixfy.EL.NoticiasEntity
{
    public class ENoticia
    {
        public int NoticiaID { get; set; }
        public string NotaDesc { get; set; } = string.Empty;
        public string Img { get; set; } = string.Empty;
        public string Urls { get; set; } = string.Empty;
        public DateTime Fecha { get; set; }
        public string NomNotica { get; set; } = string.Empty;
        public HttpPostedFileBase ImgWeb { get; set; }
        public string Tiempo { get; set; } = string.Empty;
    }
}
