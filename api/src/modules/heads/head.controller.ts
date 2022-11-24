import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
    HttpCode, Get, Param,
} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import { HeadService } from "./head.service";
import { SpeechDto } from "./dto/speech.dto";
import {HeadDto} from "./dto/head.dto";

@ApiTags('Head')
@Controller('head')
export class HeadController {
    constructor(private readonly headService: HeadService) {}

    @ApiCreatedResponse({
        type: String,
        description: 'Create speech',
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('/speech')
    async speech(@Body() speechDto: SpeechDto) {
        const videoUrl = await this.headService.getSpeech(speechDto);
        if (!videoUrl) {
            throw new HttpException('smth.. went wrong', HttpStatus.BAD_REQUEST);
        }

        return videoUrl;
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: HeadDto,
        description: 'Get all videos by user ID',
    })
    async getById(@Param('id') id: number): Promise<HeadDto[]> {
        return this.headService.getByUserId(id);
    }
}
