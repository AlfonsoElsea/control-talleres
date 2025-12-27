import { Container } from 'inversify';
import { ILeadRepository } from '../core/application/ports';
import { LeadRepository } from '../infrastructure/adapters/persistence/lead.repository';
import { LeadService } from '../core/application/services/lead.service';
import { NotificationService } from '../infrastructure/adapters/external/notification.service';
import { TallerLeadsModuleConfig } from '../config/module.config';

export class TallerLeadsModuleContainer {
  private container: Container;
  
  constructor(private config: TallerLeadsModuleConfig) {
    this.container = new Container();
    this.configureBindings();
  }
  
  private configureBindings(): void {
    // Bindings de repositorios
    this.container.bind<ILeadRepository>('ILeadRepository')
      .to(this.getRepositoryImplementation())
      .inSingletonScope();
    
    // Bindings de servicios
    this.container.bind<LeadService>('LeadService')
      .to(LeadService)
      .inSingletonScope();
    
    // Bindings de servicios externos
    if (this.config.notifications?.enabled) {
      this.container.bind<NotificationService>('NotificationService')
        .to(NotificationService)
        .inSingletonScope();
    }
  }
  
  private getRepositoryImplementation(): any {
    switch (this.config.database?.type) {
      case 'mongodb':
        return require('../infrastructure/adapters/persistence/mongodb.repository').MongoLeadRepository;
      case 'postgres':
        return require('../infrastructure/adapters/persistence/postgres.repository').PostgresLeadRepository;
      case 'memory':
        return require('../infrastructure/adapters/persistence/memory.repository').MemoryLeadRepository;
      default:
        return LeadRepository;
    }
  }
  
  get<T>(serviceIdentifier: string): T {
    return this.container.get<T>(serviceIdentifier);
  }
}
