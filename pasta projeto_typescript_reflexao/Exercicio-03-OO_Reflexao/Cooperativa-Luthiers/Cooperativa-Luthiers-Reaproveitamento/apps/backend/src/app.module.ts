import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/typeorm.module';
import { LuthierModule } from './modules/luthier/luthier.module';
import { InstrumentoModule } from './modules/instrumento/instrumento.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { SeedModule } from './shared/seed/seed.module';
import { MetadataModule } from './shared/metadata/metadata.module';

@Module({
  imports: [
    DatabaseModule,
    LuthierModule,
    InstrumentoModule,
    UsuarioModule,
    SeedModule,
    MetadataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

