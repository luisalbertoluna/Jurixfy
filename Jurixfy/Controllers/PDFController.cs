using Jurixfy.BL.PDF;
using Jurixfy.EL.PDFEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Jurixfy.Controllers
{


    public class PDFController : Controller
    {
        public ActionResult PDF(string PDFUrl)
        {
            ViewBag.PDFUrl = PDFUrl;
            return View();
        }

        [HttpPost]
        public ActionResult AgregarPDF(EPDF obj)
        {
            return Json(new PDFManager().AgregarPDF(obj), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ConsultaPDF()
        {
            return Json(new PDFManager().ConsultaPDF(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EliminarrPDF(int Id)
        {
            return Json(new PDFManager().EliminarrPDF(Id), JsonRequestBehavior.AllowGet);
        }
    }
}