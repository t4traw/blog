---
title: brewでインストールしたPostgresqlがdyld Library not loadedで起動できないエラーに遭遇 -> 結局クリーンインストールで解決
date: '2020-04-28'
archives: ["2020/04"]
categories:
  - 開発
tags:
  - rails
  - postgresql
  - dydl
  - libicui18n
image: /images/20200428-094545.jpg
---
brew周りのライブラリをupgradeしたりdowngradeしたりしていて、ふと最新のrails(6.0.2.2)を起動しようとしたら、

```log
could not connect to server: No such file or directory Is the server running locally and accepting connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```

というエラーが発生しました。

ん？いつもの「postgres connections on Unix domain socket "/tmp/.s.PGSQL.5432"?」じゃない？？と思いつつ、一通りキャッシュを消したりbrew services restart postgresなど試したのですがうまくいかず。

あれー？という状態になり、postgresのログを確認（`postgres -D /usr/local/var/postgres`）してみると、

```sh
dyld: Library not loaded: /usr/local/opt/icu4c/lib/libicui18n.66.dylib
  Referenced from: /usr/local/bin/postgres
  Reason: image not found
```

調べてみると、dyld（Dynamic Loader）というライブラリをPostgresが利用していて、それが何らかの理由でインストールされているicu4cのバージョンがずれるとこういう症状（参照できなくなっている）らしい。

というわけで、今参照しようとしている（Library not loaded）といわれてるicu4cのディレクトリを確認してみる。

```sh
$ ls /usr/local/opt/icu4c/lib/
icu                     libicui18n.a            libicutest.64.dylib     libicuuc.64.2.dylib
libicudata.64.2.dylib   libicui18n.dylib        libicutest.a            libicuuc.64.dylib
libicudata.64.dylib     libicuio.64.2.dylib     libicutest.dylib        libicuuc.a
libicudata.a            libicuio.64.dylib       libicutu.64.2.dylib     libicuuc.dylib
libicudata.dylib        libicuio.a              libicutu.64.dylib       pkgconfig
libicui18n.64.2.dylib   libicuio.dylib          libicutu.a
libicui18n.64.dylib     libicutest.64.2.dylib   libicutu.dylib
```

自分の場合はPostgresが使いたいバージョンが66（Library not loaded: /usr/local/opt/icu4c/lib/libicui18n.66.dylib）で、現在のicu4cが64なので、icu4cのバージョンが追いついていない感じ。

brewで現在インストールされているicu4cのバージョンを調べます。

```sh
$ brew info icu4c
icu4c: stable 66.1 (bottled) [keg-only]
C/C++ and Java libraries for Unicode and globalization
http://site.icu-project.org/home
/usr/local/Cellar/icu4c/64.2 (257 files, 69.2MB)
  Poured from bottle on 2020-04-27 at 10:49:07
/usr/local/Cellar/icu4c/66.1 (258 files, 70.3MB)
  Poured from bottle on 2020-04-27 at 09:29:53
```

ん？あれ？66あるっぽくない？ ちょっと64と66をswitchしてみる。

```sh
$ brew switch icu4c 64.2
Cleaning /usr/local/Cellar/icu4c/64.2
Cleaning /usr/local/Cellar/icu4c/66.1
Opt link created for /usr/local/Cellar/icu4c/64.2

$ brew switch icu4c 66.1
Cleaning /usr/local/Cellar/icu4c/64.2
Cleaning /usr/local/Cellar/icu4c/66.1
Opt link created for /usr/local/Cellar/icu4c/66.1
```

というわけでrails sしてみますが同じエラー。postgresのログを確認してみる。

```sh
$ postgres -D /usr/local/var/postgres
postgres: could not access the server configuration file "/usr/local/var/postgres/postgresql.conf":
 No such file or directory
```

confファイルが無いと怒られるので、ひとまずtouchして、更にエラーを見てみる。

```sh
$ touch /usr/local/var/postgres/postgresql.conf

$ postgres -D /usr/local/var/postgres
2020-04-28 01:10:33.352 GMT [58517] LOG:  skipping missing configuration file "/usr/local/var/postgres/postgresql.auto.conf"
2020-04-28 01:10:33.352 GMT [58517] FATAL:  data directory "/usr/local/var/postgres" has invalid permissions
2020-04-28 01:10:33.352 GMT [58517] DETAIL:  Permissions should be u=rwx (0700) or u=rwx,g=rx (0750).
```

今度はディレクトリのパーミッションがおかしいと怒られるので、パーミッションを変更します。

```sh
$ sudo chmod 700  /usr/local/var/postgres

$ postgres -D /usr/local/var/postgres
2020-04-28 01:14:18.973 GMT [60408] LOG:  skipping missing configuration file "/usr/local/var/postgres/postgresql.auto.conf"
2020-04-28 01:14:18.974 GMT [60408] FATAL:  "/usr/local/var/postgres" is not a valid data directory
2020-04-28 01:14:18.974 GMT [60408] DETAIL:  File "/usr/local/var/postgres/PG_VERSION" is missing.
```

なかなかゴールさせてくれません😇

……ここまでやってきましたが、ここまで行き着くのに既に2-3時間かかっており、早く開発したい案件があるので、クリーンインストールしたほうが早いのでは？という結論に達しました。

```sh
$ brew uninstall postgres
$ rm -rf /usr/local/var/postgres
$ brew install postgres
$ brew service restart postgres
```

これで無事起動しました😭 開発環境なので、こういうトラブルはサクっと初期化した方が早いですね。

参考: [\[Mac\]dyld: Library not loadedでPostgreSQL起動せず - Qiita](https://qiita.com/eightfoursix/items/bf11693b085eced95e29)
