import { NotFoundException } from '@exceptions';
import {
  ConfirmationToken,
  ConfirmationTokenProps,
} from '@modules/user/domain/entities/confirmation-token.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from 'src/core/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from 'src/infrastructure/database/base-classes/typeorm.repository.base';
import { Repository } from 'typeorm';
import { ConfirmationTokenOrmEntity } from './confirmation-token.orm-entity';
import { ConfirmationTokenOrmMapper } from './confirmation-token.orm-mapper';
import { ConfirmationTokenRepositoryPort } from './confirmation-token.repository.interface';

@Injectable()
export class ConfirmationTokenRepository
  extends TypeormRepositoryBase<
    ConfirmationToken,
    ConfirmationTokenProps,
    ConfirmationTokenOrmEntity
  >
  implements ConfirmationTokenRepositoryPort
{
  protected relations: string[] = ['user'];

  constructor(
    @InjectRepository(ConfirmationTokenOrmEntity)
    private readonly confirmationTokenRepository: Repository<ConfirmationTokenOrmEntity>,
  ) {
    super(
      confirmationTokenRepository,
      new ConfirmationTokenOrmMapper(
        ConfirmationToken,
        ConfirmationTokenOrmEntity,
      ),
      new Logger('confirmation-token-repository'),
    );
  }

  async findByValue(value: string): Promise<ConfirmationToken> {
    const confirmationToken = await this.confirmationTokenRepository.findOne({
      where: { value },
      relations: this.relations,
    });

    if (!confirmationToken) {
      throw new NotFoundException();
    }

    return this.mapper.toDomainEntity(confirmationToken);
  }

  protected prepareQuery(
    params: QueryParams<ConfirmationTokenProps>,
  ): WhereCondition<ConfirmationTokenOrmEntity> {
    const where: QueryParams<ConfirmationTokenOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where;
  }

  async findByUser(user: UserEntity): Promise<ConfirmationToken> {
    const confirmationToken = await this.confirmationTokenRepository.findOne({
      where: { user },
      relations: this.relations,
    });

    if (!confirmationToken) {
      throw new NotFoundException();
    }

    return this.mapper.toDomainEntity(confirmationToken);
  }
}
