import { ApiProperty } from '@nestjs/swagger';
import { Token } from 'src/interface-adapters/interfaces/user/token.interface';

export class TokenResponse {
  constructor(accessToken: Token) {
    this.accessToken = accessToken;
  }

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: "User's access token",
  })
  accessToken: Token;
}
