import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/new')
    async createUser(@Body() body: { name: string;  password: string }) {
        return this.userService.createUser(body.name, body.password);
    }

    @Get()
    async getUsers() {
        return this.userService.getUsers();
    }

    @Post('/login')
    async validateUser(@Body() body: { name: string;  password: string }) {
        return this.userService.validateUser(body.name, body.password);
    }

}
