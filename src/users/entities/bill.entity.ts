import { ApiProperty } from '@nestjs/swagger';

export class BillEntity {
  constructor(partial: Partial<BillEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  genNumber: number;

  @ApiProperty()
  currentMonthsGenNumber: number;

  @ApiProperty()
  lastlogindate: Date;
}
