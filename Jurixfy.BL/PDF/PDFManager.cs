using Jurixfy.DAL.PDFData;
using Jurixfy.EL.AppSettings;
using Jurixfy.EL.PDFEntity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Jurixfy.BL.PDF
{
    public class PDFManager
    {
        private readonly PDFRepository _PdfRepository;
        private readonly AppSettingsManager _appSettingManager;
        private readonly AppSettings _appSettings;

        public PDFManager()
        {
            _PdfRepository = new PDFRepository();
            _appSettingManager = new AppSettingsManager();
            _appSettings = _appSettingManager.GetAppSettings();
        }

        public string AgregarPDF(EPDF obj)
        {
            try
            {
                string rutaCarpeta = HttpContext.Current.Server.MapPath(_appSettings.RuraPDF);

                string nombreArchivo = $"{Guid.NewGuid().ToString()}{Path.GetExtension(obj.PdfWeb.FileName)}";

                obj.PdfWeb.SaveAs(Path.Combine(rutaCarpeta, nombreArchivo));

                obj.NombrePdf = nombreArchivo;

                _PdfRepository.AgregarPDF(obj);

                return "La PDF se agregó correctamente ";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string EliminarrPDF(int Id)
        {
            try
            {
                string rutaCarpeta = HttpContext.Current.Server.MapPath(_appSettings.RuraPDF);

                EPDF pdf = _PdfRepository.ObtenerPDF(Id);

                File.Delete(Path.Combine(rutaCarpeta, pdf.NombrePdf));

                _PdfRepository.EliminarrPDF(Id);

                return "La PDF se eliminó correctamente ";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public PDFResponce ConsultaPDF()
        {
            PDFResponce obj = _PdfRepository.ConsultaPDF();

            foreach (EPDF item in obj.ListPDF)
            {
                item.UrlPdf = _appSettings.RuraPDFHTML + item.NombrePdf;
            }

            return obj;
        }
    }
}
