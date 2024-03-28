using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jurixfy.EL.MembresiaEntity
{
    public class EMembresia
    {
        public string Correo { get; set; } = string.Empty;
        public string Pasword { get; set; } = string.Empty;
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string FechaI { get { return FechaInicio.ToString("yyyy-MM-dd HH:mm"); } }
        public string FechaF { get { return FechaFin.ToString("yyyy-MM-dd HH:mm"); } }
        public bool Activo { get; set; }
        public bool EsAdmin { get; set; }
        public int ActivoFil { get; set; }
        public int EsAdminFil { get; set; }
        public bool Pago { get; set; }
        public int MembresiaId { get; set; }
        public int Size { get; set; }
        public int Pagina { get; set; }
        public int DiasRestantes { get; set; }
        public string Mensaje { get; set; } = string.Empty;
        public int Ingreso { get; set; }
    }
}
