import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';

import { SignUpRequestDto } from './dto/request/sign-up.request.dto';

import { SignInRequestDto } from './dto/request/sign-in.request.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { TokenResponseDto } from './dto/response/token.response';
import { AuthUserResponseDto } from './dto/response/auth-user.response.dto';
import { IUser } from '../../interfaces/user.interface';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { Roles } from '../../common/decorators/roles';
import { ERole } from '../../common/enums/role.enum';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @Roles(ERole.BUYER, ERole.SELLER, ERole.DEALER, ERole.ADMIN)
  @ApiOperation({ summary: 'Registration' })
  @Post('sign-up')
  public async signUp(
    @Body() dto: SignUpRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Login' })
  @Post('sign-in')
  public async signIn(
    @Body() dto: SignInRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  @Post('logout')
  public async logout(@CurrentUser() userData: IUser): Promise<void> {
    await this.authService.logout(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Update token pair' })
  @Post('refresh')
  public async updateRefreshToken(
    @CurrentUser() userData: IUser,
  ): Promise<TokenResponseDto> {
    return await this.authService.refreshToken(userData);
  }
}
