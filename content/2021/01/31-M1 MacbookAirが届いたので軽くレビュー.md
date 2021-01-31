---
title: M1 MacbookAirが届いたので軽くレビュー＆RailsとNode環境セットアップ
date: 2021-01-31
archives: ["2021/01"]
categories:
  - デバイス
  - Apple
tags:
  - Apple
  - Mac
  - MacbookAir
  - M1
  - AppleSilion
image: /images/2021-01-29_22-31-35@2x.png
---
年末に頼んでいたMacbookAirちゃんがようやく届いて、少し触ってみたのでレビューしたいと思います。

2010年にMacbookAirを買ってから、しばらくはMacMiniだったので、10年ぶりのラップトップ。CPUがarmに変わって色々心配だったのですが、拍子抜けするほど問題なく動いていて快適です！

僕（というか会社だけど）が購入したのはMacbookAirの8コアCPU 8コアGPUタイプです。メモリはレビュー見ると8GBでも十分と言われていますが、後々の事を考えて16GBに。

![](/images/2021-01-29_22-36-09@2x.png)

あとカスタマイズしたのは英語キーボード（必須）です。

![](/images/2021-01-29_22-46-06@2x.png)

実は心配だったキーボードも問題なく、想像以上に快適に文字がタイプできて最高ですｗ

## RailsとNode環境を作ってみる🛠

さて、動画クリエイターや写真現像、ウェブブラウザだけだったら問題なくこれでいけるのですが、僕としてはやっぱり一番大事なのは開発環境が作れるかどうかです。

homebrewの一部が対応していないとか、dockerが動かないとか、rosetta2だと動かなくなるとか色々ウェブ上で見かけるので、なかなか不安だったのですが、実際手元に届いて試してみたら、思ったよりすんなり動いて拍子抜けしています。

基本的なこちらの記事の内容ですんなり行けました。

[Mac M1 Big Sur にRuby / Railsをインストール 2021-01 - Qiita](https://qiita.com/kazutosato/items/6dea35e97f39d8d13e83)

一応コマンドなどを残しておきます。

```
$ clang
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
$ brew install ruby-build rbenv openssl
```

いつものxcodeのcliを入れて、homebrewを設定し、ruby-buildとrbenvをインストールします。

で、.zshrcを

```
export PATH="/opt/homebrew/bin:$PATH"
export PATH="$(brew --prefix openssl@1.1)/bin:$PATH"
export RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@1.1)"
export PKG_CONFIG_PATH="/opt/homebrew/opt/libffi/lib/pkgconfig"
export PATH="$(brew --prefix openssl@1.1)/bin:$PATH"
export PATH="$(brew --prefix postgresql@11)/bin:$PATH"
eval "$(rbenv init -)"
```

面倒なんで、PostgresqlのPATHまでどかっと書いておきます。

そしたら、rubyまわりをセットアップし、rdocなどをインストールしない設定を.gemrcに記述し、トラブルになりそうなnokogiriなどを最初にインストールしておきます。

```
$ rbenv install 2.7.2
$ rbenv install 3.0.0
$ touch ~/.gemrc
$ echo -e "install: --no-document" >> ~/.gemrc
$ echo -e "update: --no-document" >> ~/.gemrc
$ gem i bundler
$ gem i nokogiri -- --use-system-libraries
$ gem i solargraph
$ brew install node
$ brew install postgresql@11
```

これで`source ~/.zshrc`すれば、無事Rubyが使えるようになりました！

node周りもNuxtやWebpack、Electron周りも無事動いています。

App類もトラブルなくいけるかな？と思いましたが、Hyper（ターミナル）とThunderbird（メーラー）がうまく動きませんでした。

## ターミナルをHyperからiTermに帰ってきました🙌

HyperはそもそもM1 Macに未対応。しかし、標準のターミナルってSplitもできないし、少し機能不足。なので、代わりのターミナル系Appを探す事に。

しばらくはTerminusというアプリケーションを利用していたのですが、新しくタブを開いたりSplitした時に以前いたディレクトリではなく、毎回Home（正確にいうと自分が指定したデフォルトディレクトリ）になるというバグがあるっぽい？

同じディレクトリで同時に別コマンド使いたいからSplitするのに、これは厳しい……。というわけで、他のターミナルAppを探していると、Hyperの前に使っていたiTermちゃんがM1 Macに対応しているとの事。

お、前は重かったのと勢いでHyperに乗り換えちゃったけど、改めて使ってみたなんの不満もなく動いてくれます。

Terminusはコマンド履歴をリストアしてくれるので、そちらが欲しい人はTerminusでもいいかもしれませんね。

## Thuderbirdが重いのでSparkに乗り換え📮

ThunderbirdはRosetta2で動いているのですが激重です。なので、個人のメールアドレスに関してはSparkというソフトに移行する事にしました。

ちょうど職場のメールアドレスはGoogleWorkspaceに移行するタイミングだったので、メーラーはこれだけで大丈夫かな。

## M1 Mac、大満足です😆

ひとまず1週間ですが、本当に拍子抜けするほどトラブルもなく、アプリケーションも開発環境もサクサクきびきび動いて最高です。

自分がやりたい事ができるか調べてみて、できそうなら買っちゃっていいんじゃないでしょうか。

それでは🤟