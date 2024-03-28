using Jurixfy.BL.Membresia;
using Jurixfy.EL.MembresiaEntity;
using System.Web.Mvc;

namespace Jurixfy.Controllers
{
    public class JurixfyController : Controller
    {
        public ActionResult Jurixfy()   
        {
            return View();
        }

        public ActionResult Pago(string correo)
        {
            ViewBag.Correo = correo;
            return View();
        }

        public ActionResult Succes(string correo)
        {
            EMembresia obj = new EMembresia();
            obj.Correo = correo;
            Requests result = new MembresiaManager().MembresiaUser(obj);
            return View();
        }

        public ActionResult Cancel()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Validar(string correo, string Passwor)
        {
            Requests respuesta = new MembresiaManager().ValidacionCorreoMembresia(correo);

            return Json(respuesta, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult Ingresar(string correo, string Passwor)
        {
            EMembresia obj = new EMembresia();
            obj.Correo = correo;
            obj.Pasword = Passwor;

            EMembresia respuesta = new MembresiaManager().AccesoMembresias(obj);

            return Json(respuesta, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult DetalleMembresias(EMembresia obj)
        {
            MembresiaResponce result = new MembresiaManager().DetalleMembresias(obj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AgregarUserAdmin(EMembresia obj)
        {
            Requests result = new MembresiaManager().MembresiaAdmin(obj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EliminarMembresia(int Id)
        {
            Requests obj = new MembresiaManager().EliminarMembresia(Id);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult OtenerDetalleMembresia(int Id)
        {
            EMembresia obj = new MembresiaManager().DetalleMembresia(Id);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AztualizarMembresia(EMembresia obj)
        {
            Requests result = new MembresiaManager().AztualizarMembresia(obj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}