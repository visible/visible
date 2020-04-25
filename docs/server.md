# Server contribution guide
## Clean architecture
`@visi/web-server` adopts Uncle bob's "Clean architecture" design pattern. Here's the directory structure

![Clean architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

### Directory structure
```
- server/src
  - domain         (Enterprise Business rules)
  - application    (Application Business rules)
  - adapters       (Interface Adapters)
  - frameworks     (Frameworks and Drivers)
```

- インターフェイスに `I` を付けずに、実装に `Impl` を付ける
-

#### `domain/models`
エンタープライズのドメインモデルです。

#### `domain/services`
ドメインサービス

#### `application/use-cases`
Basically, classes which takes repository to call methods of it. Input DataとOutput Data (DS) もここで定義している。 Web APIの特性上、コントローラーがpresenterの責務も持つので、ユースケースの返り値としてoutput dataを使う。ユースケースは `UseCase`、input dataは `Request`、output dataは`response` でsuffixされる。

input / output dataは冗長かなーと思ったけど、DSが存在することを強調するために敢えて設けてみた。

#### `application/repositories`
ユースケースが依存するデータのインターフェイスが定義されています。 `Repository`でsuffixされる。

#### `application/interactors`
ユースケースの実装。`Interactor`でsuffixされる。

#### `adapters/controllers`
引数からユースケースを実行し、返り値をシリアライズしてreturnするメソッドを束ねるクラス。`Controller`でsuffixされる

#### `frameworks/resolvers`
GraphQL resolvers

#### `frameworks/database`
TypeORM entities


