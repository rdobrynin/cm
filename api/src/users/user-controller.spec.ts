import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from './users.model';
import { UserDto } from './dto/user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserController', () => {
  let controller: UserController;
  let moduleRef: TestingModule;

  const mockUser = new UserModel();
  mockUser.id = 1;
  mockUser.email = 'roman@cm.com';
  mockUser.password = '123456';

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        UserController,
        UserService,
        {
          provide: getRepositoryToken(UserModel),
          useValue: {
            save: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();
    controller = moduleRef.get<UserController>(UserController);
  });

  describe('UserController', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('createUser should be defined', () => {
      expect(
        controller.createUser({ email: 'roman@cm.com', password: '123456' }),
      ).toBeDefined();
    });

    it('createUser should return user dto"', async () => {
      const mockUserDto = UserDto.toDto(mockUser);

      expect(
        await controller.createUser({
          email: mockUser.email,
          password: mockUser.password,
        }),
      ).toStrictEqual(mockUserDto);
    });
  });
});
