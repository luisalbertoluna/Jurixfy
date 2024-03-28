using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jurixfy.EL.MembresiaEntity
{
    public class MembresiaResponce
    {
        public int Total { get; set; }
        public List<EMembresia> ListMembresias { get; set; } = new List<EMembresia>();
    }
}
