using Jurixfy.DAL.NoticiasData;
using Jurixfy.EL.AppSettings;
using Jurixfy.EL.NoticiasEntity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Jurixfy.BL.Noticias
{
    public class NoticiaManager
    {
        private readonly NoticiaRepository _noticiaRepository;
        private readonly AppSettingsManager _appSettingManager;
        private readonly AppSettings _appSettings;

        public NoticiaManager()
        {
            _noticiaRepository = new NoticiaRepository();
            _appSettingManager = new AppSettingsManager();
            _appSettings = _appSettingManager.GetAppSettings();
        }

        public string AgregarNoticia(ENoticia obj)
        {
            try
            {
                string rutaCarpeta = HttpContext.Current.Server.MapPath(_appSettings.RuraImagen);

                string nombreArchivo = $"{Guid.NewGuid().ToString()}{Path.GetExtension(obj.ImgWeb.FileName)}";
                
                obj.ImgWeb.SaveAs(Path.Combine(rutaCarpeta, nombreArchivo));

                obj.Img = nombreArchivo;
                obj.Fecha = DateTime.Now;

                _noticiaRepository.AgregarNoticia(obj);

                return "La noticia se agregó correctamente ";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string ActualizarNoticia(ENoticia obj)
        {
            try
            {

                if(obj.Img == "" || obj.Img == null)
                {
                    string rutaCarpeta = HttpContext.Current.Server.MapPath(_appSettings.RuraImagen);

                    ENoticia noticia = _noticiaRepository.ObtenerNoticia(obj.NoticiaID);

                    File.Delete(Path.Combine(rutaCarpeta, noticia.Img));

                    string nombreArchivo = $"{Guid.NewGuid().ToString()}{Path.GetExtension(obj.ImgWeb.FileName)}";

                    obj.ImgWeb.SaveAs(Path.Combine(rutaCarpeta, nombreArchivo));

                    obj.Img = nombreArchivo;
                }

                obj.Fecha = DateTime.Now;

                _noticiaRepository.AztualizarNoticia(obj);

                return "La noticia se actualizó correctamente ";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string EliminarrNoticia(int Id)
        {
            try
            {
                string rutaCarpeta = HttpContext.Current.Server.MapPath(_appSettings.RuraImagen);

                ENoticia noticia = _noticiaRepository.ObtenerNoticia(Id);

                File.Delete(Path.Combine(rutaCarpeta, noticia.Img));

                _noticiaRepository.EliminarrNoticia(Id);

                return "La noticia se eliminó correctamente ";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public ResponceConsultaNoticias ConsultaNoticas()
        {
            ResponceConsultaNoticias obj = _noticiaRepository.ConsultaNoticas();

            foreach (ENoticia item in obj.NoticiasRelevantes)
            {
                item.Tiempo = Tiempo(item.Fecha);
                item.Img = _appSettings.RuraImagenHTML + item.Img;
                item.NotaDesc = (item.NotaDesc.Length > 89) ? item.NotaDesc.Substring(0, 89) + "..."  : item.NotaDesc;
            }

            foreach (ENoticia item in obj.Noticias)
            {
                item.Tiempo = Tiempo(item.Fecha);
                item.Img = _appSettings.RuraImagenHTML + item.Img;
            }

            return obj;
        }

        public ENoticia ObtenerNoticia(int ID)
        {
            return  _noticiaRepository.ObtenerNoticia(ID);
        }

        private string Tiempo(DateTime fechaInicial)
        {
            string result = string.Empty;

            TimeSpan diferencia = DateTime.Now - fechaInicial;

            if (diferencia.TotalMinutes < 60)
            {
                result = $"Hace {(int)Math.Round(diferencia.TotalMinutes)} minutos.";
            }
            else if (diferencia.TotalHours < 24)
            {
                result = $"Hace {(int)Math.Round(diferencia.TotalHours)} horas.";
            }
            else if (diferencia.TotalDays < 30)
            {
                result = $"Hace {(int)Math.Round(diferencia.TotalDays)} días.";
            }
            else
            {
                int meses = (int)(diferencia.TotalDays / 30);
                result = $"Hace {meses} meses.";
            }

            return result;
        }

    }
}
