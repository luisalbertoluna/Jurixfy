
using Jurixfy.BL.Noticias;
using Jurixfy.EL.NoticiasEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Jurixfy.Controllers
{
    public class NoticiaController : Controller
    {
        [HttpPost]
        public ActionResult AgregarNoticia(ENoticia obj)
        {
            return Json(new NoticiaManager().AgregarNoticia(obj), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ConsultaNoticas()
        {
            return Json(new NoticiaManager().ConsultaNoticas(), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult ObtenerNoticia(int ID)
        {
            return Json(new NoticiaManager().ObtenerNoticia(ID), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ActualizarNoticia(ENoticia obj)
        {
            return Json(new NoticiaManager().ActualizarNoticia(obj), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EliminarrNoticia(int Id)
        {
            return Json(new NoticiaManager().EliminarrNoticia(Id), JsonRequestBehavior.AllowGet);
        }

    }
}