# Server contribution guide
## Clean architecture
`@visi/server` adopts Uncle bob's "Clean architecture" design pattern. Here's the directory structure

### Directory structure
```
- server/src
  - domain         - Enterprise Bussiness rules
  - application    - Application Bussiness rules
  - adapters       - Interface Adapters
  - infrastructure - Frameworks and Drivers
  - locales        - i18n locale files
```

#### `domain/entities`
Enterprise entities

#### `application/repositories`
Interfaces of repositories

#### `applciation/use-cases`
Basically, classes which takes repository to call methods of it.

#### `adapters/controllers`
Classes which calls repositories and usecases to return serialized data

#### `adapters/serializers`
Classes which converts DB entities to API entities.

#### `adapters/entities`
API entities

#### `adapters/storage`
Classes which implements `application/repostiores`

#### `infrastructre/resolvers`
GraphQL resolvers

#### `infrastructre/database`
TypeORM entities


