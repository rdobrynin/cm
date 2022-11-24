import {IsString} from "class-validator";

export class GatewayDetailsDto {
  @IsString()
  url: string;

  @IsString()
  apiToken: string;

  @IsString()
  orgId: string;

  @IsString()
  headId: string;

  @IsString()
  videoId: string;
}
