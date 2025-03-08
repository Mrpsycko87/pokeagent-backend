import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Pokemon extends Document {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: false })
    nickname: string;

    @Prop({ required: true})
    sprite_url: string;

    @Prop({ required: true })
    user: string;

    @Prop({ required: true})
    ide: number;

    @Prop({ required: true })
    types: [];

    @Prop({ required: true})
    abilities: [];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
