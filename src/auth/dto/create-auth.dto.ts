import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsNotEmpty()
    name: string;

    @MinLength(6)
    password: string;
}
