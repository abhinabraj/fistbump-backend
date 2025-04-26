import { Module } from '@nestjs/common';
import { UsersFriendsRequestService } from './users-friends-request.service';
import { UsersFriendsRequestController } from './users-friends-request.controller';

@Module({
  imports: [],
  controllers: [UsersFriendsRequestController],
  providers: [UsersFriendsRequestService],
  exports: [UsersFriendsRequestService],
})
export class UsersFriendsRequestModule {}
