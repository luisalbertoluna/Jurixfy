using Jurixfy.EL.PDFEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jurixfy.DAL.PDFData
{
    public class PDFRepository
    {
        private readonly JurixfyEntities _context;
        public PDFRepository()
        {
            _context = new JurixfyEntities();
        }

        public void AgregarPDF(EPDF obj)
        {
            int max = (_context.Pdf.FirstOrDefault() != null ? _context.Pdf.Max(x => x.PdfID) : 0) + 1;

            _context.Pdf.Add(new Pdf
            {
                PdfID = max,
                Activo = true,
                NombrePdf = obj.NombrePdf
            });

            _context.SaveChanges();
        }

        public PDFResponce ConsultaPDF()
        {
            PDFResponce obj = new PDFResponce();

            obj.ListPDF = (from i in _context.Pdf
                           where i.Activo
                            select new EPDF
                            {
                                PdfID = i.PdfID,
                                NombrePdf = i.NombrePdf,
                                Activo = i.Activo
                            }).OrderByDescending(f => f.PdfID).ToList();

            return obj;
        }

        public void EliminarrPDF(int Id)
        {
             Pdf pdf = _context.Pdf.Where(x => x.PdfID == Id).FirstOrDefault() ?? new Pdf();
            _context.Pdf.Remove(pdf);
            _context.SaveChanges();
        }

        public EPDF ObtenerPDF(int id)
        {
            EPDF obj = (from i in _context.Pdf
                            where i.PdfID == id
                            select new EPDF
                            {
                                PdfID = i.PdfID,
                                NombrePdf = i.NombrePdf,
                                Activo = i.Activo
                            }).FirstOrDefault();
            return obj;
        }
    }
}
