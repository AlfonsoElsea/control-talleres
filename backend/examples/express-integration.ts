import express from 'express';
import { TallerLeadsModule, ExpressAdapter } from '@taller/leads-module';

const app = express();
app.use(express.json());

// Configurar el módulo
const leadsModule = new TallerLeadsModule({
  database: {
    type: 'mongodb',
    connectionString: process.env.MONGO_URI || 'mongodb://localhost:27017/taller',
  },
  notifications: {
    enabled: true,
    providers: ['email', 'whatsapp'],
  },
});

// Integrar con Express
const expressAdapter = new ExpressAdapter(leadsModule);
expressAdapter.mountOn(app, '/api/leads');

// Rutas adicionales de la aplicación principal
app.get('/health', (req, res) => {
  res.json({ status: 'ok', module: 'taller-leads' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor con módulo de leads ejecutándose en puerto ${PORT}`);
});
