import { Column, Entity, Index, PrimaryColumn, Unique } from 'typeorm';

import { Rule, RuleType } from '../../../domain/models';

@Entity('rule')
@Unique(['name'])
export class RuleDBEntity {
  @PrimaryColumn('varchar', { length: 255 })
  id!: string;

  @Index()
  @Column('varchar', { length: 255, default: 'unknown' })
  coreId!: string;

  @Index()
  @Column('varchar', { length: 255 })
  name!: string;

  @Column('varchar', { length: 255 })
  type!: RuleType;

  @Column('varchar', { length: 255 })
  description!: string;

  @Column('json', { nullable: true })
  keywords?: readonly string[];

  static fromDomain(rule: Rule): RuleDBEntity {
    const entity = new RuleDBEntity();
    entity.id = rule.id;
    entity.coreId = rule.coreId;
    entity.name = rule.name;
    entity.type = rule.type;
    entity.description = rule.description;
    entity.keywords = rule.keywords;
    return entity;
  }

  toDomain(): Rule {
    return Rule.from({
      id: this.id,
      coreId: this.coreId,
      name: this.name,
      type: this.type,
      description: this.description,
      keywords: this.keywords,
    });
  }
}
