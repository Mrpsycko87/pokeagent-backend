import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async createUser(name: string, password: string): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { name } });
        if (existingUser) {
            throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = this.userRepository.create({ 
            name, 
            password: hashedPassword 
        });
        
        return this.userRepository.save(user);
    }

    async validateUser(name: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { name } });
        if (!user) {
            throw new HttpException(`No existe el usuario ${name}`, HttpStatus.BAD_REQUEST);
        }
        
        // Compare the entered password with the encrypted one in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new HttpException('Contraseña incorrecta', HttpStatus.BAD_REQUEST);
        }
        
        return user; // Return the user if credentials are correct
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
}
