import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import datasource, { typeormConfig } from './database/datasource';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ControllerModule } from './controllers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),

    /**
     * Database config
     */
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormConfig,
      dataSourceFactory: async () => {
        datasource.initialize();
        return datasource;
      },
    }),

    // kafka
    ClientsModule.register([
      {
        name: 'SSO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'SSO_SERVICE',
            brokers: [process.env.KAFKA_HOST],
          },
          consumer: {
            groupId: 'AUTHENTICATION_GUARD',
          },
        },
      },
    ]),

    // Controller Module
    ControllerModule,
  ],
})
export class MainModule {}
