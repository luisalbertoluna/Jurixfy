using Jurixfy.EL.NoticiasEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jurixfy.DAL.NoticiasData
{
    public class NoticiaRepository
    {
        private readonly JurixfyEntities _context;
        public NoticiaRepository()
        {
            _context = new JurixfyEntities();
        }

        public void AgregarNoticia(ENoticia obj)
        {
            int max = (_context.Noticia.FirstOrDefault() != null ? _context.Noticia.Max(x => x.NoticiaID) : 0) + 1;

            _context.Noticia.Add(new Noticia
            {
                NoticiaID = max,
                NotaDesc = obj.NotaDesc,
                Img = obj.Img,
                Urls = obj.Urls,
                Fecha = obj.Fecha,
                NomNotica = obj.NomNotica
            });

            _context.SaveChanges();
        }
        
        public ENoticia ObtenerNoticia(int id)
        {
            ENoticia obj = (from i in _context.Noticia
                            where i.NoticiaID == id
                            select new ENoticia
                            {
                                NoticiaID = i.NoticiaID,
                                NotaDesc = i.NotaDesc,
                                Img = i.Img,
                                Urls = i.Urls,
                                Fecha = i.Fecha,
                                NomNotica = i.NomNotica
                            }).FirstOrDefault();
            return obj;
        }

        public ResponceConsultaNoticias ConsultaNoticas()
        {
            ResponceConsultaNoticias obj = new ResponceConsultaNoticias();

            obj.Noticias = (from i in _context.Noticia
                                     select new ENoticia
                                     {
                                         NoticiaID = i.NoticiaID,
                                         NotaDesc = i.NotaDesc,
                                         Img = i.Img,
                                         Urls = i.Urls,
                                         Fecha = i.Fecha,
                                         NomNotica = i.NomNotica
                                     }).OrderByDescending(f => f.Fecha).ToList();

            obj.NoticiasRelevantes = (from i in _context.Noticia
                                      select new ENoticia
                                      {
                                          NoticiaID = i.NoticiaID,
                                          NotaDesc = i.NotaDesc,
                                          Img = i.Img,
                                          Urls = i.Urls,
                                          Fecha = i.Fecha,
                                          NomNotica = i.NomNotica
                                      }).OrderByDescending(f => f.Fecha).Take(3).ToList();

            return obj;
        }

        public void AztualizarNoticia(ENoticia obj)
        {
            Noticia rest = _context.Noticia.Where(x => x.NoticiaID == obj.NoticiaID).FirstOrDefault() ?? new Noticia();
            rest.NoticiaID = obj.NoticiaID;
            rest.NotaDesc = obj.NotaDesc;
            rest.Img = obj.Img;
            rest.Urls = obj.Urls;
            rest.Fecha = obj.Fecha;
            rest.NomNotica = obj.NomNotica;

            _context.SaveChanges();
        }

        public void EliminarrNoticia(int Id)
        {
            Noticia noticia = _context.Noticia.Where(x => x.NoticiaID == Id).FirstOrDefault() ?? new Noticia();
            _context.Noticia.Remove(noticia);
            _context.SaveChanges();
        }

    }
}
