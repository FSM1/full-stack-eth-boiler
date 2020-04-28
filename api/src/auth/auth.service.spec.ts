import 'jest';
import { Test } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../user/users.service';
import { AuthService, LoginStatus } from './auth.service';

describe('auth.service', () => {
  let authService: AuthService;

  const mockUsersService = {
    findByEmail(email: string) {
      if (email === 'correct@test.com') {
        return {
          id: 'test',
          firstName: 'testFirst',
          lastName: 'testLast',
          comparePassword(password: string) {
            const correctPassword = 'correct';
            if (correctPassword === password) {
              return true;
            } else {
              return false;
            }
        },
      };
    } else {
        return undefined;
      }
    },
  };

  const mockJwtService = {
    sign(tokenPayload: string) {
      return 'TOKEN';
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        WinstonModule.forRoot({
        transports: [
            new transports.Console({
                level: 'info',
                handleExceptions: false,
                format: format.combine(format.json()),
            }),
          ],
        }),
      ],
      providers: [AuthService, {
        provide: JwtService,
        useValue: mockJwtService,
      }, {
        provide: UsersService,
        useValue: mockUsersService,
      }],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });

  describe('Sign-In', () => {
    it('Should sign in a valid user', async () => {
      const response = await authService.signIn({
        email: 'correct@test.com',
        password: 'correct',
      });

      const expected = { userId: 'test', status: LoginStatus.success };

      expect(response).toHaveProperty('userId');
      expect(response).toHaveProperty('token');
      expect(response).toHaveProperty('status');
      expect(response.userId).toBe(expected.userId);
      expect(response.status).toBe(expected.status);
    });

    it('Should not sign in an invalid email', async () => {
      let result;
      try {
        await authService.signIn({
          email: 'wrong@test.com',
          password: 'correct',
        });
      } catch (error) {
        result = error;
      }
      expect(result).toHaveProperty('status');
      expect(result.status).toEqual(401);
      expect(result).toHaveProperty('message');
      expect(result.message.message).toBe('Invalid Username or Password');
    });

    it('Should not sign in an invalid password', async () => {
      let result;
      try {
        result = await authService.signIn({
          email: 'correct@test.com',
          password: 'wrong',
        });
      } catch (error) {
        result = error;
      }
      expect(result.status).toBe(401);
      expect(result.message.message).toBe('Invalid Username or Password');
    });
  });
});
