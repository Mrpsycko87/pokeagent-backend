import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }


    async createUser(name: string, password: string): Promise<User> {
        const nameUser = await this.userModel.findOne({ name: name });
        if (nameUser) {
            throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);

        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new this.userModel({ name, password: hashedPassword });
            return newUser.save()
        }

    }

    async validateUser(name: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ name });
        if (!user) {
            throw new HttpException(`No existe el usuario ${name}`, HttpStatus.BAD_REQUEST);
        }
        // Comparar la contraseña ingresada con la encriptada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new HttpException('Contraseña incorrecta', HttpStatus.BAD_REQUEST);
        }
        return user; // Retorna el usuario si las credenciales son correctas
    }


    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
