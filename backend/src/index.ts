export * from './core/domain/types';
export * from './core/application/ports';
export * from './core/application/use-cases';

// Exportar servicios principales
export { LeadService } from './core/application/services/lead.service';
export { LeadEntity } from './core/domain/entities/lead.entity';

// Exportar configuraciones
export { TallerLeadsModuleConfig, defaultConfig } from './config/module.config';

// Exportar fábrica del módulo
export { TallerLeadsModule } from './taller-leads.module';

// Exportar DTOs para validación
export * from './core/application/dtos';

// Exportar utilidades
export * from './shared/utils';
