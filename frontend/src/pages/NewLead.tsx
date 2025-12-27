import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User, Phone, Mail, Smartphone, 
  AlertTriangle, Calendar, DollarSign,
  Save, X, Camera
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface LeadFormData {
  cliente: {
    nombre: string;
    telefono: string;
    email?: string;
  };
  dispositivo: {
    marca: string;
    modelo: string;
    problema: string;
    accesorios: string[];
    imei?: string;
  };
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  notasIniciales?: string;
}

const NewLead: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadFormData>();
  const [foto, setFoto] = useState<string | null>(null);

  const onSubmit = async (data: LeadFormData) => {
    // Simular envío
    toast.loading('Creando lead...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.dismiss();
    toast.success('¡Lead creado exitosamente!');
    reset();
    setFoto(null);
  };

  const marcasDispositivos = [
    'Apple', 'Samsung', 'Xiaomi', 'Motorola', 'Huawei', 
    'Google', 'OnePlus', 'Sony', 'LG', 'Nokia', 'Otro'
  ];

  const problemasComunes = [
    'Pantalla rota', 'Batería defectuosa', 'No enciende',
    'Problemas de carga', 'Agua dañada', 'Falla de audio',
    'Cámara no funciona', 'Problemas de software', 'Otro'
  ];

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Nuevo Lead</h1>
            <p className="text-gray-500">Registra un nuevo lead para el taller</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna 1: Información del Cliente */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Información del Cliente */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary-500/20 rounded-lg">
                    <User className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Información del Cliente</h2>
                    <p className="text-gray-500">Datos personales del cliente</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        {...register('cliente.nombre', { required: 'El nombre es obligatorio' })}
                        className="input-field pl-10"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    {errors.cliente?.nombre && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.cliente.nombre.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Teléfono *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        {...register('cliente.telefono', { 
                          required: 'El teléfono es obligatorio',
                          pattern: {
                            value: /^[0-9+\s]+$/,
                            message: 'Teléfono inválido'
                          }
                        })}
                        className="input-field pl-10"
                        placeholder="+5491122334455"
                      />
                    </div>
                    {errors.cliente?.telefono && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.cliente.telefono.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        {...register('cliente.email')}
                        type="email"
                        className="input-field pl-10"
                        placeholder="cliente@email.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del Dispositivo */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Smartphone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Información del Dispositivo</h2>
                    <p className="text-gray-500">Detalles del equipo a reparar</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Marca *
                    </label>
                    <select
                      {...register('dispositivo.marca', { required: 'La marca es obligatoria' })}
                      className="input-field"
                    >
                      <option value="">Seleccionar marca</option>
                      {marcasDispositivos.map(marca => (
                        <option key={marca} value={marca}>{marca}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Modelo *
                    </label>
                    <input
                      {...register('dispositivo.modelo', { required: 'El modelo es obligatorio' })}
                      className="input-field"
                      placeholder="Ej: Galaxy S23 Ultra"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Problema reportado *
                    </label>
                    <select
                      {...register('dispositivo.problema', { required: 'El problema es obligatorio' })}
                      className="input-field"
                    >
                      <option value="">Seleccionar problema</option>
                      {problemasComunes.map(problema => (
                        <option key={problema} value={problema}>{problema}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      IMEI (opcional)
                    </label>
                    <input
                      {...register('dispositivo.imei')}
                      className="input-field"
                      placeholder="Ej: 123456789012345"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Accesorios incluidos
                    </label>
                    <input
                      {...register('dispositivo.accesorios')}
                      className="input-field"
                      placeholder="Ej: Cargador, auriculares, funda"
                    />
                  </div>
                </div>

                {/* Subir foto del dispositivo */}
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-3">
                    Foto del dispositivo (opcional)
                  </label>
                  <div className="flex items-center gap-4">
                    {foto ? (
                      <div className="relative">
                        <img
                          src={foto}
                          alt="Dispositivo"
                          className="w-32 h-32 object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => setFoto(null)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="w-32 h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center hover:border-primary-500 transition-colors">
                          <Camera className="w-8 h-8 text-gray-500 mb-2" />
                          <span className="text-sm text-gray-500">Subir foto</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFoto(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Columna 2: Configuración y Acciones */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Configuración del Lead */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Configuración del Lead</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Prioridad *
                    </label>
                    <div className="space-y-2">
                      {(['baja', 'media', 'alta', 'urgente'] as const).map((prioridad) => (
                        <label key={prioridad} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            {...register('prioridad', { required: 'La prioridad es obligatoria' })}
                            value={prioridad}
                            className="hidden peer"
                          />
                          <div className="w-4 h-4 border-2 border-white/20 rounded-full peer-checked:border-primary-500 peer-checked:bg-primary-500" />
                          <div className="flex-1">
                            <span className="font-medium capitalize">{prioridad}</span>
                            <p className="text-xs text-gray-500">
                              {prioridad === 'baja' && '7 días estimados'}
                              {prioridad === 'media' && '4 días estimados'}
                              {prioridad === 'alta' && '2 días estimados'}
                              {prioridad === 'urgente' && '24 horas estimadas'}
                            </p>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${
                            prioridad === 'urgente' ? 'bg-red-500' :
                            prioridad === 'alta' ? 'bg-amber-500' :
                            prioridad === 'media' ? 'bg-blue-500' :
                            'bg-gray-500'
                          }`} />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Notas adicionales
                    </label>
                    <textarea
                      {...register('notasIniciales')}
                      className="input-field min-h-[120px] resize-none"
                      placeholder="Observaciones importantes sobre el dispositivo o el cliente..."
                    />
                  </div>
                </div>
              </div>

              {/* Resumen y acciones */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Resumen</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Cliente nuevo</span>
                    <span className="font-medium">Sí</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Tiempo estimado</span>
                    <span className="font-medium">24-48h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Presupuesto inicial</span>
                    <span className="font-medium text-emerald-400">Por diagnosticar</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    className="btn-primary w-full justify-center"
                  >
                    <Save className="w-5 h-5" />
                    Crear Lead
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="btn-secondary w-full justify-center"
                  >
                    <X className="w-5 h-5" />
                    Limpiar formulario
                  </button>
                </div>
              </div>

              {/* Alertas importantes */}
              <div className="glass-card rounded-2xl p-6 border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-amber-400 mb-2">Recordatorios importantes</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Verificar IMEI en base de datos robados</li>
                      <li>• Tomar fotos del dispositivo antes de la reparación</li>
                      <li>• Solicitar backup al cliente si es posible</li>
                      <li>• Informar riesgos adicionales al cliente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewLead;
