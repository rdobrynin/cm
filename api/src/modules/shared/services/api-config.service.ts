import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {GatewayDetailsDto} from "../dtos/gateway-details.dto";

@Injectable()
export class ApiConfigService {
  constructor(protected configService: ConfigService) {}

  protected getString(key: string, defaultValue?: string): string {
    const value = this.configService.get(key, defaultValue);

    if (value === null || value === undefined) {
      throw new Error(`${key} environment variable doesn't exist`);
    }

    return value.replace(/\\n/g, '\n');
  }


  get gatewayConfig(): GatewayDetailsDto {
    return {
      url: this.getString('GATEWAY_URL'),
      apiToken: this.getString('CM_API_TOKEN'),
      orgId: this.getString('ORG_ID'),
      headId: this.getString('HEAD_ID'),
      videoId: this.getString('VIDEO_ID'),
    };
  }
}
