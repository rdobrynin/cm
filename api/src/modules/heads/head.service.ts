import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {ApiConfigService} from "../shared/services/api-config.service";
import {firstValueFrom} from "rxjs";
import { map } from 'rxjs/operators';
import {SpeechDto} from "./dto/speech.dto";
import {UserService} from "../users/user.service";
import {BadRequestException} from "../../exceptions/bad-request.exception";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {HeadModel} from "./head.model";
import {HeadDto} from "./dto/head.dto";

@Injectable()
export class HeadService {
    private readonly gatewayUrl: string;
    private readonly apiToken: string;
    private readonly orgId: string;
    private readonly videoId: string;
    private readonly headId: string;

    constructor(
        @InjectRepository(HeadModel)
        private headModelRepository: Repository<HeadModel>,
        private configService: ApiConfigService,
        private userService: UserService,
        private readonly httpService: HttpService,
    ) {
        this.gatewayUrl = this.configService.gatewayConfig.url;
        this.apiToken = this.configService.gatewayConfig.apiToken;
        this.orgId = this.configService.gatewayConfig.orgId;
        this.videoId = this.configService.gatewayConfig.videoId;
        this.headId = this.configService.gatewayConfig.headId;
    }

    async getSpeech(
        speechDto: SpeechDto,
    ): Promise<string> {

        const user = await this.userService.getUserById(speechDto.id);

        if (!user) {
            throw new BadRequestException("No user found");
        }

        console.log(this.gatewayUrl + 't2l/');
        console.log(speechDto.name);
        const config = {
            headers: { Authorization: `Bearer ${this.apiToken}` }
        };

        const result: string = await firstValueFrom(
            this.httpService
                .post(this.gatewayUrl + 't2l', {
                    org_id: this.orgId,
                    head_id: this.headId,
                    video_id: this.videoId,
                    text: this.generateSimpleRandomSpeech(speechDto),
                    link: false,
                }, config)
                .pipe(map((response) => {
                    console.log(response);
                    return response.data
                })),
            {defaultValue: undefined},
        );

        await this.headModelRepository.save({
            userId: user.id,
            videoUrl: result,
        });

        return result;
    }

    async getByUserId(userId: number): Promise<HeadModel[]> {
        const user = await this.userService.getUserById(userId);

        if (!user) {
            throw new BadRequestException("No user found");
        }

        const heads = await this.headModelRepository
            .createQueryBuilder('head')
            .where('head.userId = :userId', {
                userId: userId,
            })
            .getMany();

        return heads;
    }

    private generateSimpleRandomSpeech(speechDto: SpeechDto): string {
        return `This is a test assignment for backend and frontend parts implemented by ${speechDto.name}. Please see readme file for details`
    }
}