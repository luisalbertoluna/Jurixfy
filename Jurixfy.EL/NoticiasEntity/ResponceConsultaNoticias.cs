using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jurixfy.EL.NoticiasEntity
{
    public class ResponceConsultaNoticias
    {
        public List<ENoticia> Noticias { get; set; }
        public List<ENoticia> NoticiasRelevantes { get; set; }
    }
}
