using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jurixfy.EL.AppSettings
{
    public class AppSettings
    {
        public string JWTSecret { get; set; } = string.Empty;
        public int PaswordEncrypt { get; set; }
        public string ClienteSmtp { get; set; } = string.Empty;
        public string ContraseniaRemitente { get; set; } = string.Empty;
        public string CorreoRemitente { get; set; } = string.Empty;
        public int Port { get; set; }
        public string CaracteresPermitidos { get; set; } = string.Empty;
        public string UrlValidarCoreo { get; set; } = string.Empty;
        public string RuraImagen { get; set; } = string.Empty;
        public string RuraImagenHTML { get; set; } = string.Empty;

        public string RuraPDF { get; set; } = string.Empty;
        public string RuraPDFHTML { get; set; } = string.Empty;

    }
    public class AppSettingsManager
    {
        public AppSettings GetAppSettings()
        {
            AppSettings settings = new AppSettings();

            settings.JWTSecret = ConfigurationManager.AppSettings["JWTSecret"];
            settings.PaswordEncrypt = Convert.ToInt32(ConfigurationManager.AppSettings["PaswordEncrypt"]);
            settings.ClienteSmtp = ConfigurationManager.AppSettings["ClienteSmtp"];
            settings.ContraseniaRemitente = ConfigurationManager.AppSettings["ContraseniaRemitente"];
            settings.CorreoRemitente = ConfigurationManager.AppSettings["CorreoRemitente"];
            settings.UrlValidarCoreo = ConfigurationManager.AppSettings["UrlValidarCoreo"];
            settings.RuraImagen = ConfigurationManager.AppSettings["RuraImagen"];
            settings.RuraImagenHTML = ConfigurationManager.AppSettings["RuraImagenHTML"];
            settings.RuraPDF = ConfigurationManager.AppSettings["RuraPDF"];
            settings.RuraPDFHTML = ConfigurationManager.AppSettings["RuraPDFHTML"];
            int port;
            if (int.TryParse(ConfigurationManager.AppSettings["Port"], out port))
            {
                settings.Port = port;
            }
            else
            {
                // Manejar el caso de que el valor de "Port" no sea un entero válido
            }
            settings.CaracteresPermitidos = ConfigurationManager.AppSettings["CaracteresPermitidos"];

            return settings;
        }
    }
}
