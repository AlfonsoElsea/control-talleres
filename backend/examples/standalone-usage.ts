import { TallerLeadsModule } from '@taller/leads-module';

async function ejemploUsoStandalone() {
  // Crear instancia del módulo con almacenamiento en memoria
  const module = new TallerLeadsModule({
    database: {
      type: 'memory',
    },
  });
  
  // Usar el servicio de leads
  const leadService = module.getLeadService();
  
  // Crear un lead
  const nuevoLead = await module.crearLead({
    cliente: {
      nombre: 'Juan Pérez',
      telefono: '+5491122334455',
      email: 'juan@ejemplo.com',
    },
    dispositivo: {
      marca: 'Samsung',
      modelo: 'Galaxy S21',
      problema: 'Pantalla rota',
    },
    prioridad: 'urgente',
  });
  
  console.log('Lead creado:', nuevoLead);
  
  // Buscar leads
  const leads = await module.listarLeads({ estado: 'nuevo' });
  console.log('Leads nuevos:', leads.length);
  
  // Limpiar recursos
  await module.dispose();
}

ejemploUsoStandalone();
