import {ApiProperty} from "@nestjs/swagger";

export class UserPayloadDto {
    @ApiProperty({ type: String })
    email: string;

    @ApiProperty({ type: String })
    name: string;
}