import { EKafkaGroup, EMicroservice } from '@libs/common';
import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

interface IClientKafkaConfig {
  name: string;
  clientId: string;
  groupId: string;
}

const clientKafkaConfig: IClientKafkaConfig[] = [
  {
    name: EMicroservice.AGGREGATION_BOOKING_SERVICE,
    clientId: EMicroservice.AGGREGATION_BOOKING_SERVICE,
    groupId: EKafkaGroup.BOOKING_GROUP,
  },
];

const clientModuleOptions: ClientsModuleOptions = clientKafkaConfig.map(
  (config) => {
    return {
      name: config.name,
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: config.clientId,
          brokers: [process.env.KAFKA_HOST],
        },
        consumer: {
          groupId: config.groupId,
        },
      },
    };
  },
);

export default clientModuleOptions;
