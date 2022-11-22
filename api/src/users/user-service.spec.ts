import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from './users.model';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserModel>;
  let moduleRef: TestingModule;

  const mockUser = new UserModel();
  mockUser.id = 1;
  mockUser.email = 'roman@cm.com';
  mockUser.password = '123456';

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
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
    service = moduleRef.get<UserService>(UserService);
    repository = moduleRef.get<Repository<UserModel>>(
      getRepositoryToken(UserModel),
    );
  });

  describe('UserService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('createUser should be defined', () => {
      expect(
        service.createUser({ email: 'roman@cm.com', password: '123456' }),
      ).toBeDefined();
    });

    it('getUserByEmail should be defined', () => {
      expect(service.getUserByEmail('roman@cm.com')).toBeDefined();
    });

    it('createUser should return user dto"', async () => {
      const mockUserDto = UserDto.toDto(mockUser);

      expect(
        await service.createUser({
          email: mockUser.email,
          password: mockUser.password,
        }),
      ).toStrictEqual(mockUserDto);
    });

    it('getUserByEmail should return user model"', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockUser);
      expect(await service.getUserByEmail(mockUser.email)).toStrictEqual(
        mockUser,
      );
    });
  });
});
