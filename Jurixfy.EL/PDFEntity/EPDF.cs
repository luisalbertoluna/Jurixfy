using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Jurixfy.EL.PDFEntity
{
    public class EPDF
    {
        public int PdfID { get; set; }
        public string NombrePdf { get; set; }

        public string UrlPdf { get; set; }
        public bool Activo { get; set; }
        public HttpPostedFileBase PdfWeb { get; set; }
    }
}
