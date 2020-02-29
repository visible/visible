# Server contribution guide
## Clean architecture
`@visi/web-server` adopts Uncle bob's "Clean architecture" design pattern. Here's the directory structure

![Clean architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

### Directory structure
```
- server/src
  - enterprise     (Enterprise Business rules)
  - application    (Application Business rules)
  - adapters       (Interface Adapters)
  - infrastructure (Frameworks and Drivers)
```

- インターフェイスに `I` を付けずに、実装に `Impl` を付ける
-

#### `enterprise/entities`
エンタープライズのドメインモデルです。

#### `application/use-cases`
Basically, classes which takes repository to call methods of it.

#### `application/repositories`
ユースケースが依存するデータのインターフェイスが定義されています。

#### `adapters/controllers`
引数からユースケースを実行し、返り値をシリアライズするクラス。

#### `adapters/serializers`
ドメインモデルから用途に沿った形式へ変換するクラス

#### `frameworks/resolvers`
GraphQL resolvers

#### `frameworks/database`
TypeORM entities


