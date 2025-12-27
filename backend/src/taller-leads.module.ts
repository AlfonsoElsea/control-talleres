import { TallerLeadsModuleContainer } from './di/container';
import { TallerLeadsModuleConfig, defaultConfig } from './config/module.config';
import { LeadService } from './core/application/services/lead.service';
import { ILeadRepository } from './core/application/ports';

export class TallerLeadsModule {
  private container: TallerLeadsModuleContainer;
  private leadService: LeadService;
  private leadRepository: ILeadRepository;
  
  constructor(config?: Partial<TallerLeadsModuleConfig>) {
    const fullConfig = { ...defaultConfig, ...config };
    this.container = new TallerLeadsModuleContainer(fullConfig);
    this.initializeServices();
  }
  
  private initializeServices(): void {
    this.leadService = this.container.get<LeadService>('LeadService');
    this.leadRepository = this.container.get<ILeadRepository>('ILeadRepository');
  }
  
  // API pública del módulo
  public getLeadService(): LeadService {
    return this.leadService;
  }
  
  public getLeadRepository(): ILeadRepository {
    return this.leadRepository;
  }
  
  // Métodos de conveniencia
  public async crearLead(datos: CrearLeadDTO) {
    return await this.leadService.crearLead(datos);
  }
  
  public async buscarLeadPorId(id: string) {
    return await this.leadService.buscarPorId(id);
  }
  
  public async listarLeads(filtros?: any) {
    return await this.leadService.listarLeads(filtros);
  }
  
  // Métodos de configuración en tiempo de ejecución
  public reconfigure(config: Partial<TallerLeadsModuleConfig>): void {
    // Implementar lógica de reconfiguración dinámica
  }
  
  // Métodos de limpieza
  public async dispose(): Promise<void> {
    // Limpiar recursos, cerrar conexiones, etc.
  }
}
