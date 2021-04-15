import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RefreshTokenRequest {
  @ApiProperty({
    example: 'jwt',
    description: 'Refresh Token',
  })
  @IsJWT()
  refreshToken!: string;
}
