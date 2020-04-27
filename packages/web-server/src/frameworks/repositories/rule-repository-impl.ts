import { Rule } from '../../domain/models';
import { RuleORM } from '../entities/rule';

export class RuleRepositoryImpl {
  static toDomain(entity: RuleORM) {
    return new Rule({
      id: entity.id,
      type: entity.type,
      description: entity.description,
    });
  }

  static toORM(domain: Rule) {
    const entity = new RuleORM();
    entity.id = domain.id;
    entity.type = domain.type;
    entity.description = domain.description;
  }
}
