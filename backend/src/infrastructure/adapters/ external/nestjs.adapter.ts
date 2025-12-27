import { Module, DynamicModule } from '@nestjs/common';
import { TallerLeadsModule } from '../../taller-leads.module';
import { TallerLeadsModuleConfig } from '../../config/module.config';
import { LeadNestController } from './lead-nest.controller';
import { LeadNestService } from './lead-nest.service';

@Module({})
export class TallerLeadsNestModule {
  static forRoot(config?: TallerLeadsModuleConfig): DynamicModule {
    return {
      module: TallerLeadsNestModule,
      providers: [
        {
          provide: 'TALLER_LEADS_MODULE',
          useFactory: () => new TallerLeadsModule(config),
        },
        LeadNestService,
      ],
      controllers: [LeadNestController],
      exports: [LeadNestService],
    };
  }
  
  static forFeature(config?: TallerLeadsModuleConfig): DynamicModule {
    return this.forRoot(config);
  }
}
