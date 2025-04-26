import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
          });
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Failed to connect to database:', error);
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
