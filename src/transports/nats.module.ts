import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NAST_SERVICE } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NAST_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class NatsModule {}
