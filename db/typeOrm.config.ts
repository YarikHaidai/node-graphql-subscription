import { DataSource } from 'typeorm';
import { ConfigService } from '../src/config/config.service';

export default new DataSource(ConfigService.getMigrationOrmConfig() as any);
