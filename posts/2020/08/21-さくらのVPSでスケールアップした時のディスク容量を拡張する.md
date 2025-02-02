---
title: さくらのVPSでスケールアップした時のディスク容量を拡張する
date: '2020-08-21'
archives: ["2020/08"]
categories:
  - 開発
tags:
  - Linux
  - CentOS
  - さくらのVPS
image: /images/4ktp2iyzaa92q41yywe6fs8wj4pg64.jpg
---
朝出勤すると各部署から「メールが送れない」という怒涛の緊急連絡。自分も試してみると、「452 4.3.1 Insufficient system storage」というエラーが出て送受信ができない。

storageという文字から予想できるけど、軽くググってみるとやっぱり容量オーバーにより送受信ができないと。

あれ？でも100GBのプランでサーバー容量は50GBしか使ってないはずなのに、なぜ？？

と思って`df`してみると

```sh
$ df

ファイルシス   1K-ブロック     使用   使用可 使用% マウント位置
/dev/vda4        100140012 44578264        0  100% /
devtmpfs           1012812        0  1012812    0% /dev
tmpfs              1023712        0  1023712    0% /dev/shm
tmpfs              1023712    98332   925380   10% /run
tmpfs              1023712        0  1023712    0% /sys/fs/cgroup
/dev/vda2           508580   149520   359060   30% /boot
tmpfs               204744        0   204744    0% /run/user/0
```

ん？`/dev/vda4`って論理パーティションで、本来ならここが100GB使えるはずだよね？使える容量全部確認しても50GBしか使えないように見える。

おおう？？なんで？？と思って調べてみると、さくらのVPSではスケールアップしたり容量追加すると、割り当てられている容量がすべて使えるようにならず、自分でパーティションを追加してマウントしてーなどやらないといけないみたい。

えー、容量追加とかもやった事ないし、そもそもスケールアップした事もないんだけどなぁ……。

ひとまず、ちゃんと残りの50GBが使えるのか確認する。

```sh
$ fdisk -l

Disk /dev/vda: 107.4 GB, 107374182400 bytes, 209715200 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O サイズ (最小 / 推奨): 512 バイト / 512 バイト
```

ちゃんと100GBは割り当てられてはいるんだね。あー、新しいパーティション作ってーとか、正直面倒……。そのまま容量全部を足すとかできないの？？

と思って調べたら、先行者様がいらっしゃいました。

- [さくらのVPSでディスク容量拡張(CentOS7) - Qiita](https://qiita.com/mighty-n/items/6571fe3921713f6cc0ea)
- [さくらVPSのスケールアップで/を拡張する - Qiita](https://qiita.com/touta/items/011fe6b15dd241aa33e0)

growpartを使ってパーティションの拡張を行う方法と、gdisk使って対話式のコマンドでパーティションを削除してから同じ名前で作成する方法の2つがあるっぽい。

gdiskは削除とかするのが怖いので、growpartの方をやってみます。

- この方法は公式ガイドには載っていない方法なので、実行はバックアップをとって自己責任でお願いします。
- この記事は2020年8月21日時点で、CentOS Linux release 7.5.1804 (Core) 環境の内容になります。

```sh
$ yum -y install cloud-utils-growpart gdisk

~~~

Downloading packages:
(1/2): cloud-utils-growpart-0.29-5.el7.noarch.rpm                          |  27 kB  00:00:00
(2/2): gdisk-0.8.10-3.el7.x86_64.rpm                                       | 190 kB  00:00:00
--------------------------------------------------------------------------------------------------
合計                                                              1.6 MB/s | 217 kB  00:00:00
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  インストール中          : gdisk-0.8.10-3.el7.x86_64                                         1/2
  インストール中          : cloud-utils-growpart-0.29-5.el7.noarch                            2/2
  検証中                  : cloud-utils-growpart-0.29-5.el7.noarch                            1/2
  検証中                  : gdisk-0.8.10-3.el7.x86_64                                         2/2

インストール:
  cloud-utils-growpart.noarch 0:0.29-5.el7               gdisk.x86_64 0:0.8.10-3.el7

完了しました!
```

というわけで、パーティションの拡張を行います。

```sh
$ growpart /dev/vda 4

CHANGED: partition=4 start=9414656 old: size=95438208 end=104852864 new: size=200300510 end=209715166
```

無事できたか確認。

```sh
$ fdisk -l

WARNING: fdisk GPT support is currently new, and therefore in an experimental phase. Use at your own discretion.

Disk /dev/vda: 107.4 GB, 107374182400 bytes, 209715200 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O サイズ (最小 / 推奨): 512 バイト / 512 バイト
Disk label type: gpt
Disk identifier: ********-****-****-****-********

#         Start          End    Size  Type            Name
 1           34         2047   1007K  BIOS boot       BIOS
 2         2048      1026047    500M  Microsoft basic Linux
 3      1026048      9414655      4G  Linux swap      Linux
 4      9414656    209715165   95.5G  Microsoft basic Linux
```

無事95.5Gになっているようです。

次にファイルシステムを新しいパーティションサイズにリサイズします。

```sh
$ resize2fs /dev/vda4
resize2fs 1.42.9 (28-Dec-2013)
resize2fs: Bad magic number in super-block while trying to open /dev/vda4
Couldn't find valid filesystem superblock.
```

お？怒られたっぽい。

調べてみると、CentOS7からは`resize2fs`ではなく`xfs_growfs`を使うらしい。

[CentOS 7(XFS)でLVMディスク拡張でハマったこと - Qiita](https://qiita.com/fetaro/items/d7dc74262633ba474bc8)

というわけで、`xfs_growfs`で再度実行してみます。

```sh
$ xfs_growfs /dev/vda4
meta-data=/dev/vda4              isize=512    agcount=34, agsize=361151 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=0 spinodes=0
data     =                       bsize=4096   blocks=11929776, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=1
log      =internal               bsize=4096   blocks=2560, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
data blocks changed from 11929776 to 25037563
```

最後に最初の`df`で確認してみます。

```sh
$ df

ファイルシス   1K-ブロック     使用   使用可 使用% マウント位置
/dev/vda4        100140012 44578264 55561748   45% /
devtmpfs           1012812        0  1012812    0% /dev
tmpfs              1023712        0  1023712    0% /dev/shm
tmpfs              1023712    98332   925380   10% /run
tmpfs              1023712        0  1023712    0% /sys/fs/cgroup
/dev/vda2           508580   149520   359060   30% /boot
tmpfs               204744        0   204744    0% /run/user/0
```

おー、できたできた！ちゃんと100%が45%になっています。

さきほども書きましたが、この手順は公式ガイドにはない方法なので、自己責任でお願いします。