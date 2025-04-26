import { Controller } from '@nestjs/common';
import { UsersFriendsRequestService } from './users-friends-request.service';

@Controller('users-friends-request')
export class UsersFriendsRequestController {
  constructor(
    private readonly userFriendsRequestService: UsersFriendsRequestService,
  ) {}
}
