# @taller/leads-module

Módulo de gestión de leads para talleres de telefonía, diseñado para integrarse en sistemas más amplios.

## Instalación

```bash
npm install @taller/leads-module
# o
yarn add @taller/leads-module

## Express
import { TallerLeadsModule, ExpressAdapter } from '@taller/leads-module';

const module = new TallerLeadsModule({
  database: { type: 'mongodb', connectionString: '...' }
});

const adapter = new ExpressAdapter(module);
app.use('/api/leads', adapter.getRouter());

##Standalone
import { TallerLeadsModule } from '@taller/leads-module';

const module = new TallerLeadsModule();
const lead = await module.crearLead({
  cliente: { nombre: '...', telefono: '...' },
  dispositivo: { marca: '...', modelo: '...', problema: '...' }
});
