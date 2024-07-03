import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { AccessTokenGuard } from 'src/util/guards/accessToken.guard';
import { PaginateUserDto } from './dto/paginate-user.dto';
import { BillEntity } from './entities/bill.entity';
import { GenerateImageService } from 'src/generate/generate-image/generate-image.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateImageService: GenerateImageService,
  ) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get('count')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Number })
  async count() {
    const count = await this.usersService.count();
    return { count: count };
  }

  @Post('paginate')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async paginate(@Body() paginateUserDto: PaginateUserDto) {
    let users;
    if (paginateUserDto.search) {
      users = await this.usersService.paginateSearch(paginateUserDto);
    } else if (paginateUserDto.startDate) {
      users = await this.usersService.paginateDateRange(paginateUserDto);
    } else {
      users = await this.usersService.paginate(paginateUserDto);
    }
    return users.map((user) => new UserEntity(user));
  }

  @Post('billing')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BillEntity, isArray: true })
  async billing(@Body() paginateUserDto: PaginateUserDto) {
    let users;
    const currentGen = [];
    if (paginateUserDto.search) {
      users = await this.usersService.paginateSearch(paginateUserDto);
    } else {
      users = await this.usersService.paginate(paginateUserDto);
    }
    await Promise.all(
      users.map(async (user) => {
        currentGen[user.id] = await this.generateImageService.countThismonth(
          user.id,
          paginateUserDto.startDate,
          paginateUserDto.endDate,
        );
        console.log('test', currentGen);
      }),
    );
    console.log('---------***********--------', currentGen);
    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phoneNumber: user.phoneNumber,
        genNumber: user.genNumber,
        currentMonthsGenNumber: currentGen[user.id],
        lastlogindate: user.lastlogindate,
      };
    });
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.remove(id));
  }
}
