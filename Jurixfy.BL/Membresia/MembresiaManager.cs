using Jurixfy.DAL.MembresiaData;
using Jurixfy.EL.AppSettings;
using Jurixfy.EL.MembresiaEntity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Jurixfy.BL.Membresia
{
    public class MembresiaManager
    {
        private readonly MembresiaRepository _membresiaRepository;
        private readonly AppSettingsManager _appSettingManager;
        private readonly AppSettings _appSettings;

        private static readonly Dictionary<char, char> tablaCifrado = new Dictionary<char, char>();
        private static readonly Dictionary<char, char> tablaDescifrado = new Dictionary<char, char>();

        public MembresiaManager()
        {
            InicializarTablas();

            _membresiaRepository = new MembresiaRepository();
            _appSettingManager = new AppSettingsManager();
            _appSettings = _appSettingManager.GetAppSettings();
        }
        public Requests ValidacionCorreoMembresia(string correo)
        {
            Requests respuesta = new Requests();

            SmtpClient clienteSmtp = new SmtpClient(_appSettings.ClienteSmtp)
            {
                Port = _appSettings.Port,
                Credentials = new NetworkCredential(_appSettings.CorreoRemitente, _appSettings.ContraseniaRemitente),
                EnableSsl = true,
            };
            string origin = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
            string url = origin + _appSettings.UrlValidarCoreo + EncryptTextWithAES(correo);

            string contenidoHtml = $@"
                                    <html>
                                    <body>
                                        <h1>¡Validación exitosa!</h1>
                                        <p>Tu cuenta ha sido validada con éxito.</p>
                                        <p>Por favor, presiona el siguiente botón para continuar con el proceso:</p>
                                        <br>
                                        <a href='{url}' style='padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;'>Siguiente Paso</a>
                                    </body>
                                    </html>";

            MailMessage mensaje = new MailMessage(_appSettings.CorreoRemitente, correo)
            {
                Subject = "Validación Jurixfy",
                Body = contenidoHtml,
                IsBodyHtml = true
            };

            try
            {
                clienteSmtp.Send(mensaje);
                respuesta.Codigo = 200;
                respuesta.Mensaje = "Se ha enviado un correo de confirmación a tu dirección de correo electrónico. Por favor, valida el correo y procede con tu membresía";
                return respuesta;
            }
            catch (Exception ex)
            {
                respuesta.Codigo = 400;
                respuesta.Mensaje = ex.Message;
                return respuesta;
            }
        }

        public Requests MembresiaAdmin(EMembresia obj)
        {
            Requests respuesta = new Requests();

            try
            {
                obj.FechaInicio = new DateTime(1900, 1, 1);
                obj.FechaFin = new DateTime(1900, 1, 1);
                obj.Activo = true;
                obj.Pago = false;
                obj.EsAdmin = true;
                obj.Pasword = GenerarContraseñaSegura();

                NotificacionPassword(obj.Correo, obj.Pasword);

                _membresiaRepository.Membresia(obj);

                respuesta.Codigo = 200;
                respuesta.Mensaje = $"La membresía se ha creado exitosamente. Ahora puede iniciar sesión utilizando la siguiente contraseña: {obj.Pasword} También hemos enviado un correo electrónico a tu cuenta con los detalles de su membresía.";

                return respuesta;
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("No se permite el nombre del buzón de correo."))
                {
                    respuesta.Mensaje = "El correo electrónico no es válido: puede ser incorrecto, tener un formato inválido.";
                }
                else
                {
                    respuesta.Mensaje = ex.Message;
                }
                respuesta.Codigo = 400;

                return respuesta;
            }
        }

        public Requests MembresiaUser(EMembresia obj)
        {
            Requests respuesta = new Requests();

            try
            {
                obj.Correo = DecryptTextWithAES(obj.Correo);
                obj.FechaInicio = DateTime.Now;
                obj.FechaFin = obj.FechaInicio.AddDays(30);
                obj.Activo = true;
                obj.Pago = true;
                obj.EsAdmin = false;
                obj.Pasword = GenerarContraseñaSegura();

                _membresiaRepository.Membresia(obj);

                NotificacionPassword(obj.Correo, obj.Pasword);

                respuesta.Codigo = 200;
                respuesta.Mensaje = $"La membresía se ha creado exitosamente. Ahora puedes iniciar sesión utilizando la siguiente contraseña: {obj.Pasword}. También hemos enviado un correo electrónico a tu cuenta con los detalles de tu membresía.";

                return respuesta;
            }
            catch (Exception ex)
            {
                respuesta.Codigo = 400;
                respuesta.Mensaje = ex.Message;
                return respuesta;
            }
        }

        public Requests AztualizarMembresia(EMembresia obj)
        {
            Requests respuesta = new Requests();
            try
            {
                _membresiaRepository.AztualizarMembresia(obj);

                respuesta.Codigo = 200;
                respuesta.Mensaje = "Se actualizo la membresía correctamente.";
                return respuesta;
            }
            catch (Exception ex)
            {
                respuesta.Codigo = 400;
                respuesta.Mensaje = ex.Message;
                return respuesta;
            }
        }

        public Requests EliminarMembresia(int Id)
        {
            Requests respuesta = new Requests();
            try
            {
                _membresiaRepository.EliminarMembresia(Id);

                respuesta.Codigo = 200;
                respuesta.Mensaje = "Se elimino la membresía correctamente.";
                return respuesta;
            }
            catch (Exception ex)
            {
                respuesta.Codigo = 400;
                respuesta.Mensaje = ex.Message;
                return respuesta;
            }
        }

        public EMembresia DetalleMembresia(int Id)
        {
            return _membresiaRepository.DetalleMembresia(Id);
        }

        public MembresiaResponce DetalleMembresias(EMembresia obj)
        {
            return _membresiaRepository.DetalleMembresias(obj);
        }

        public EMembresia AccesoMembresias(EMembresia obj)
        {
            EMembresia result = new EMembresia();
            try
            {
                result = _membresiaRepository.AccesoMembresias(obj);
                if (result.Correo == "")
                {
                    result.Mensaje = "Lo sentimos, no pudimos iniciar sesión con las credenciales proporcionadas. Por favor, verifica tu nombre de usuario y contraseña e intenta nuevamente.";
                    result.Ingreso = 0;
                }
                else
                {
                    result.Mensaje = "¡Bienvenido al sistema! Has iniciado sesión satisfactoriamente.";
                    result.Ingreso = 1;
                }
                return result;
            }
            catch (Exception ex)
            {
                result.Mensaje = ex.Message;
                return result;
            }
        }
        private string EncryptTextWithAES(string texto)
        {
            char[] textoCifrado = new char[texto.Length];
            for (int i = 0; i < texto.Length; i++)
            {
                char caracter = texto[i];
                if (tablaCifrado.ContainsKey(caracter))
                {
                    textoCifrado[i] = tablaCifrado[caracter];
                }
                else
                {
                    textoCifrado[i] = caracter;
                }
            }
            return new string(textoCifrado);
        }

        private string DecryptTextWithAES(string textoCifrado)
        {
            char[] textoDescifrado = new char[textoCifrado.Length];
            for (int i = 0; i < textoCifrado.Length; i++)
            {
                char caracter = textoCifrado[i];
                if (tablaDescifrado.ContainsKey(caracter))
                {
                    textoDescifrado[i] = tablaDescifrado[caracter];
                }
                else
                {
                    textoDescifrado[i] = caracter;
                }
            }
            return new string(textoDescifrado);
        }

        public static void InicializarTablas()
        {
            char[] alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
            char[] alfabetoCifrado = "ISCABCDEFGHIJKLMNOPQRSTUVWXY".ToCharArray();

            for (int i = 0; i < alfabeto.Length; i++)
            {
                tablaCifrado[alfabeto[i]] = alfabetoCifrado[i];
                tablaDescifrado[alfabetoCifrado[i]] = alfabeto[i];
            }
        }

        private string GenerarContraseñaSegura()
        {
            StringBuilder contraseñaGenerada = new StringBuilder();

            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                byte[] bytesAleatorios = new byte[10];
                rng.GetBytes(bytesAleatorios);

                for (int i = 0; i < 10; i++)
                {
                    contraseñaGenerada.Append(_appSettings.CaracteresPermitidos[bytesAleatorios[i] % _appSettings.CaracteresPermitidos.Length]);
                }
            }

            return contraseñaGenerada.ToString();
        }

        public void NotificacionPassword(string correo, string pasword)
        {
            SmtpClient clienteSmtp = new SmtpClient(_appSettings.ClienteSmtp)
            {
                Port = _appSettings.Port,
                Credentials = new NetworkCredential(_appSettings.CorreoRemitente, _appSettings.ContraseniaRemitente),
                EnableSsl = true,
            };

            string contenidoHtml = $@"
                                    <html>
                                    <body>
                                        <h1>¡Tu cuenta ha sido creada!</h1>
                                        <p>Tu cuenta en Jurixfy ha sido creada con éxito. A continuación, encontrarás los detalles de inicio de sesión:</p>
                                        <ul>
                                            <li><strong>Correo Electrónico:</strong> {correo}</li>
                                            <li><strong>Contraseña:</strong> {pasword}</li>
                                        </ul>
                                        <p>Por favor, guarda esta información de forma segura.</p>
                                        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nosotros.</p>
                                        <p>Gracias por ser parte de Jurixfy.</p>
                                    </body>
                                    </html>";

            MailMessage mensaje = new MailMessage(_appSettings.CorreoRemitente, correo)
            {
                Subject = "Notificación Jurixfy",
                Body = contenidoHtml,
                IsBodyHtml = true
            };

            clienteSmtp.Send(mensaje);
        }
    }
}
