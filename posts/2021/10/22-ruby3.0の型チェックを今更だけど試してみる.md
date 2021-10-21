---
title: ruby3.0の型チェックを今更だけど試してみる
date: '2021-10-22'
archives: ["2021/10"]
categories:
  - 開発
tags:
  - ruby
  - 型
  - rbs
  - typeprof
  - steep
image: /images/ruby.png
---
今仕事で書いているアプリケーションで「いやぁ、これ型指定させて欲しいなぁ」と思う事が多々あり、後回しにしていたRuby 3.0から導入された型チェックを本格的に試してみる事にしました。

詳しい個々の説明は他のサイト様におまかせして、自分はひとまず実際に動かして型チェックするまでのシンプル目な説明で記事を書いてみたいと思います。

## Rubyの型チェックアプローチについて

Rubyの型チェックは、コンパイラ言語によくあるようにビルトインされるでもなく、TypeScriptのようにトランスパイルをする方法でもありません。

あくまでもrbファイルの中身を変えず（基本的にそのまま動く状態。書き加える事もあるけど）、その中身を元に型情報であるrbs（Ruby Signatureの略）を生成し、それを元に型チェックを行うというアプローチのようです。

中身を元に型情報というのも2段階あり、たとえば

```ruby
class Foo
  def initialize(attribute)
    @attribute = attribute
  end
end
```

というコードがあったとして、このclassの情報だけだと型情報が分かりません。これを実際に使うコードを使って無理やり型情報を解析します。

```ruby
Foo.new(123)
```

上のコードから、「initializeの引数はInteger」という具合にコードを解析して型情報のファイルを作るという具合です。

そしてそれらの情報を元に型チェックを行ってくれるツールがあります。

つまり、必要なのは

- rbs rubyの型に関するコア機能。rubyのシンタックスと違うシンタックスのrbs言語を提供します
- typeprof コードを元に型情報を解析するツール
- steep それらの情報を元に検査をしてくれるライブラリ

3つの要素になります。

とはいえ、これは当然完璧に動作するのは難しく、ある程度生成してから自分で修正していくという形が現実的でしょうか。

## 実際にrbsで解析してみる

実際にrbsファイルを作ってみたいと思います。

以下のrbファイルをrbsコマンドで生成してみます。一応、rbsファイルはsigディレクトリに配置するのが通例っぽいんで、sigディレクトリに出力しています。

<div class="filename">app/pokemon.rb</div>

```ruby
class Pokemon
  # @dynamic name
  attr_reader :name

  def initialize(name:, hp:)
    @name = name
    @hp = hp
  end

  def damage_taken(damage)
    @hp -= damage
  end
end

pokemon = Pokemon.new(name: "ヒトカゲ", hp: 123)
pokemon.damage_taken(100)
puts pokemon.name

```

rbsコマンドは`rbs prototype rb`と`rbs prototype runtime`の2つがあり、rbコマンドの方はファイルを静的に解析し、runtimeの方は実際にrubyを実行した環境下で解析するようになっています。

ちなみにattr_readerやdefine_methodなど、defで宣言していないメソッドは`# @dynamic foobar`という感じにコメントで教えてあげる事ができます（というか、教えてあげないと後ででてくる検査で「なにこれ？」と言われる感じです😅）。

```sh
$ rbs prototype rb app/pokemon.rb > sig/pokemon.rbs
```

すると、sig/pokemon.rbsというファイルが生成されました👏

<div class="filename">sig/pokemon.rbs</div>

```rbs
class Pokemon
  # @dynamic name
  attr_reader name: untyped

  def initialize: (name: untyped name, hp: untyped hp) -> void

  def damage_taken: (untyped damage) -> untyped
end
```

コードの中ではとくに型に触れていないので、色々な所がuntypedになっていますねー🤔

次は、このrbファイルを今後はtypeprofを使って解析してみたいと思います！

```sh
$ typeprof app/pokemon.rb -o sig/pokemon.rbs
```

するとこんな感じのファイルになりました。

<div class="filename">sig/pokemon.rbs</div>

```rbs
# TypeProf 0.20.0

# Classes
class Pokemon
  @hp: Integer

  attr_reader name: String
  def initialize: (name: String, hp: Integer) -> void
  def damage_taken: (Integer damage) -> Integer
end
```

一気に情報が増えましたね👏

シンプルな内容だったらこんな感じでうまく解析してくれますね。でもこれRails規模だったらうまくいくのかが気になる所。

ひとまず今回は環境を作る所までやってみます！

上のrbsファイルを元に検査をしてくれるsteepというgemをインストールします。

```sh
$ gem i steep
```

そして、設定ファイルを生成します。

```sh
$ steep init
```

すると、Steepfileが作られるので、中身を編集します。最初に色々書いてあったりするので、コメントアウトしたりでバックアップしておき、今回書いた分だけを検査するシンプルな内容に変更します。

```ruby
target :app do
  check "app"
  signature "sig"
end
```

checkに調査対象のディレクトリ（またはファイル）を書き、signatureの方に型定義であるrbsファイルがあるディレクトリを指定します。

この状態で型検査を行ってみます。

```sh
$ steep check
# Type checking files:

.............................................................

No type error detected. 🧉
```

無事検査できたっぽいです👏

ちょっと型が間違っているパターンを見てみます。

```ruby
class Pokemon
  # @dynamic name
  attr_reader :name

  def initialize(name:, hp:)
    @name = name
    @hp = hp
  end

  def damage_taken(damage)
    @hp -= damage
  end
end

pokemon = Pokemon.new(name: "ヒトカゲ", hp: 123)
pokemon.damage_taken("foobar")
puts pokemon.name
```

damage_takenはIntegerという定義になっていたので、引数に"foobar"という間違った型を入れてみます。

```sh
$ steep check
# Type checking files:

............................................................F

app/pokemon.rb:16:21: [error] Cannot pass a value of type `::String` as an argument of type `::Integer`
│   ::String <: ::Integer
│     ::Object <: ::Integer
│       ::BasicObject <: ::Integer
│
│ Diagnostic ID: Ruby::ArgumentTypeMismatch
│
└ pokemon.damage_taken("foobar")
                       ~~~~~~~~

Detected 1 problem from 1 file
```

お、ちゃんと引っかかってくれました！

この型チェックをエディター（VS Code）で行って欲しいので拡張を入れます。

[Steep - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=soutaro.steep-vscode)

このプラグインを入れた状態でVS Codeを起動すると、

![](/images/2021-10-18_10-06-34.png)

ちゃんと教えてくれます🎉

---

今回はrbs・typeprof・steepを使ってみた感じです。自分が公開しているgemとかに追加できそうかなぁ。

あとやっぱりrailsに本格的に導入した時にどうなるか気になるところですが、それは別の記事で書きたいと思います😄

それでは🤟

