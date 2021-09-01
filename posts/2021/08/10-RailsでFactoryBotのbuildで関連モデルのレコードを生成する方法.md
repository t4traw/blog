---
title: RailsでFactoryBotのbuildで関連モデルのレコードを生成する方法
date: '2021-08-10'
archives: ["2021/08"]
categories:
  - 開発
tags:
  - rails
  - minitest
  - factory_bot
image: /images/factory_bot.png
---
ちょっとテストをたくさん書く事になったので、いつも混乱するFactoryBotの「あれ？」って思う部分を記事にいくつか書いていこうと思います🙂

Railsのテストで、僕は普段minitest + factory_botを利用しています。fixtureじゃないんだ？と思うかもしれませんが、テストデータ作る時はやっぱりFactoryBotちゃん便利。モデルのバリデーションなどのテストも同時にできるし😂

普通にname, email, passwordのシンプルなUserモデルののテストデータを作るのなら、

```ruby
FactoryBot.define do
  factory :user do
    name { Faker::Internet.username }
    email { Faker::Internet.email }
    password { 'password' }
  end
end
```

といった具合に作成できます。

しかし、こんな感じのモデル関係だった場合。

```ruby
class User < ApplicationRecord
  belongs_to :group
end

class Group < ApplicationRecord
  has_many :users
end
```

Railsのアソシエーションはbelongs_toの場合、カラムはデフォルトで必須項目（nilは不可）になっています。もしも上の例でgroup_idがnilで良いのなら`optional: true`を書かなければいけません。

これを踏まえた上で、FactoryBotで書くと

```ruby
FactoryBot.define do
  factory :user do
    name { Faker::Internet.username }
    email { Faker::Internet.email }
    password { 'password' }
    association :group
  end
end

FactoryBot.define do
  factory :group do
    name { Faker::Company.name }
  end
end
```

といった感じで書くと思います。これで簡単にモデルのテストを書こうとすると、

```ruby
require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "Userのレコードが生成できる" do
    user = FactoryBot.build(:user)
    assert user.save
  end
end
```

みたいな感じになります。

しかし、これはテストが通りません。`FactoryBot.build(:user)`で関連先のモデルが生成されないので、必須項目が埋まっていないというエラーが発生してしまいます🤢

`FactoryBot.create(:user)`だと関連先のモデルも生成してくれるのですが、個人的にテストって`.save`や`.valid?`でassert書きたいんですよねー。

本来は外部キー制約がある物は紐付けられているレコードがあるべきだから、こうあるべきなんだろうけど、保存できない場合とかテストしたい時も関連モデルは作られていた方がやりやすいと思うんですよねー。

これを解決する方法は、

1. 一括でbuild時でも関連レコードを生成するオプションを使う
2. 個別にbuild時でも生成されるように設定する

の2つがあります✌️

## 一括でbuild時でも関連レコードを生成するオプションを使う

まず一括でbuild時に生成する場合ですが、`FactoryBot.use_parent_strategy = false`を必要なところで設定すれば、build時でも関連レコードが生成されます。

※追記: これ、書いた後のFactoryBotすべてに適用されてしまうので、teardownで戻しておいてあげる必要があります😓

```ruby
class UserTest < ActiveSupport::TestCase
  teardown do
    FactoryBot.use_parent_strategy = true
  end

  test "Userのレコードが生成できる" do
    FactoryBot.use_parent_strategy = false
    user = FactoryBot.build(:user)
    assert user.save
  end
end
```

## 個別にbuild時でも生成されるように設定する

factoryファイルの方でassociationを設定した時に、buildでも生成するようにしておく事もできます。

```ruby
FactoryBot.define do
  factory :user do
    name { Faker::Internet.username }
    email { Faker::Internet.email }
    password { 'password' }
    association :group, strategy: :create # <- ココ
  end
end
```

ただ、これは簡単に変えられないので、レコードの保存自体をテストする時だけ、上の`FactoryBot.use_parent_strategy = false`の方が良いかもしれませんね😆

それでは🤟

## 参考

- https://qiita.com/TunaGinger/items/ca08b1eaa5c1e321e302
- https://github.com/thoughtbot/factory_bot_rails/issues/314

