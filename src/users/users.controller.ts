import { Controller, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put()
  sendFriendRequest() {}

  @Put()
  acceptFriendRequest() {}

  @Put()
  rejectFriendRequest() {}

  @Get()
  getAllFriendRequests() {}
}
