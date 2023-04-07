import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import {
  REVIEW_BY_PRODUCT_ID_NOT_FOUND,
  REVIEW_NOT_FOUND,
} from './review.constants';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
  @Get('getByProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    const reviews = await this.reviewService.findByProductId(productId);
    return reviews;
  }

//   @Delete('deleteByProduct/:productId')
//   async deleteByProductId(@Param('productId') productId: string) {
//     const reviews = await this.reviewService.deleteByProductId(productId);
//     if (reviews) {
//       throw new HttpException(
//         REVIEW_BY_PRODUCT_ID_NOT_FOUND,
//         HttpStatus.NOT_FOUND,
//       );
//     }
//   }
}