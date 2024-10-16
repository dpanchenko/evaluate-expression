import { IsInt, IsOptional, IsString } from 'class-validator';
import * as process from 'process';

export interface IAppConfig {
  env?: string;
  apiPort: number;
}

export class AppConfigValidator implements IAppConfig {
  @IsOptional()
  @IsString()
  readonly env?: string;

  @IsInt()
  readonly apiPort!: number;
}

export const getAppConfig = (): IAppConfig => ({
  env: process.env.NODE_ENV ?? 'local',
  apiPort: parseInt(`${process.env.API_PORT || 3333}`, 10),
});
