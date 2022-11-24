import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC50ZXN0NiIsImlkIjoxMSwiaWF0IjoxNjY4NDI3ODU2LCJleHAiOjE2Njg0MzE0NTZ9.FiiB7Uuq6aIpR4qL6k_UF6C9Mt0wW2qQ8SCcT9DqI4c',
    description: 'Bearer token',
  })
  readonly token: string;
}
