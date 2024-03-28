using Jurixfy.EL.MembresiaEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jurixfy.DAL.MembresiaData
{
    public class MembresiaRepository
    {
        private readonly JurixfyEntities _context;
        public MembresiaRepository()
        {
            _context = new JurixfyEntities();
        }
        public void Membresia(EMembresia obj)
        {
            int max = (_context.Membresia.FirstOrDefault() != null ? _context.Membresia.Max(x => x.MembresiaID) : 0) + 1;

            _context.Membresia.Add(new Membresia
            {
                FechaInicioM = obj.FechaInicio,
                FechaFinM = obj.FechaFin,
                Pasword = obj.Pasword,
                EsAdmin = obj.EsAdmin,
                Activo = obj.Activo,
                Correo = obj.Correo,
                Pago = obj.Pago,
                MembresiaID = max
            });

            _context.SaveChanges();
        }

        public void AztualizarMembresia(EMembresia obj)
        {
            Membresia membresia = _context.Membresia.Where(x => x.MembresiaID == obj.MembresiaId).FirstOrDefault() ?? new Membresia();
            membresia.FechaInicioM = obj.FechaInicio;
            membresia.FechaFinM = obj.FechaFin;
            membresia.Pasword = obj.Pasword;
            membresia.EsAdmin = obj.EsAdmin;
            membresia.Activo = obj.Activo;
            membresia.Correo = obj.Correo;
            membresia.Pago = obj.Pago;
            membresia.MembresiaID = obj.MembresiaId;

            _context.SaveChanges();
        }

        public void EliminarMembresia(int Id)
        {
            Membresia membresia = _context.Membresia.Where(x => x.MembresiaID == Id).FirstOrDefault() ?? new Membresia();
            _context.Membresia.Remove(membresia);
            _context.SaveChanges();
        }

        public EMembresia DetalleMembresia(int Id)
        {
            EMembresia result = new EMembresia();
            Membresia membresia = _context.Membresia.Where(x => x.MembresiaID == Id).FirstOrDefault() ?? new Membresia();
            result.FechaInicio = membresia.FechaInicioM;
            result.FechaFin = membresia.FechaFinM;
            result.Pasword = membresia.Pasword;
            result.EsAdmin = membresia.EsAdmin;
            result.Activo = membresia.Activo;
            result.Correo = membresia.Correo;
            result.Pago = membresia.Pago;
            result.MembresiaId = membresia.MembresiaID;

            return result;
        }

        public MembresiaResponce DetalleMembresias(EMembresia obj)
        {
            MembresiaResponce result = new MembresiaResponce();

            result.Total = _context.MembresiaVW.Count(x => x.EsAdmin == (obj.EsAdminFil == 0 ? x.EsAdmin : (obj.EsAdminFil == 1 ? true : false))
                                                      && x.Activo == (obj.ActivoFil == 0 ? x.Activo : (obj.ActivoFil == 1 ? true : false))
                                                      && ((obj.Correo == null || obj.Correo == "") ? x.Correo == x.Correo : x.Correo.Contains(obj.Correo))
                                                      && x.DiasFaltantes == (obj.DiasRestantes == 0 ? x.DiasFaltantes : obj.DiasRestantes)
                                                      );

            result.ListMembresias = (from i in _context.MembresiaVW
                                     where i.EsAdmin == (obj.EsAdminFil == 0 ? i.EsAdmin : (obj.EsAdminFil == 1 ? true : false))
                                     && i.Activo == (obj.ActivoFil == 0 ? i.Activo : (obj.ActivoFil == 1 ? true : false))
                                     && ((obj.Correo == null || obj.Correo == "") ? i.Correo == i.Correo : i.Correo.Contains(obj.Correo))
                                     && i.DiasFaltantes == (obj.DiasRestantes == 0 ? i.DiasFaltantes : obj.DiasRestantes)
                                     select new EMembresia
                                     {
                                         FechaInicio = i.FechaInicioM,
                                         FechaFin = i.FechaFinM,
                                         Pasword = i.Pasword,
                                         EsAdmin = i.EsAdmin,
                                         Activo = i.Activo,
                                         Correo = i.Correo,
                                         Pago = i.Pago,
                                         MembresiaId = i.MembresiaID,
                                         DiasRestantes = (int)i.DiasFaltantes
                                     }).AsEnumerable().OrderByDescending(f => f.FechaInicio).Skip(obj.Pagina * obj.Size).Take(obj.Size).ToList();

            return result;
        }

        public EMembresia AccesoMembresias(EMembresia obj)
        {
            EMembresia result = new EMembresia();
            if (_context.Membresia.Any(m => m.Correo == obj.Correo && m.Pasword == obj.Pasword && m.Activo))
            {
                result = (from i in _context.Membresia
                          where i.Activo
                          && i.Correo == obj.Correo
                          && i.Pasword == obj.Pasword
                          select new EMembresia
                          {
                              Pasword = i.Pasword,
                              Correo = i.Correo,
                              Activo = i.Activo,
                              EsAdmin = i.EsAdmin,
                              FechaFin = i.FechaFinM,
                              FechaInicio = i.FechaInicioM,
                              MembresiaId = i.MembresiaID,
                              Pago = i.Pago
                          }).FirstOrDefault();
            }

            return result;
        }
    }
}
