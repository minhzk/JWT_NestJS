import { IsNotEmpty, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    username: string;

    @MinLength(6)
    password: string;
}
