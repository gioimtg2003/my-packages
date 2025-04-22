import { ICBModule } from '@gioimtg2003/nest-banking';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ICBModule.forRoot({
      auth: {
        username: 'username',
        access_code: 'access_code',
        id_number: '102873837898',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
