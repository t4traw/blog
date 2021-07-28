---
title: Windows（ゲーム用PC）をRyzen 5 3500にアップグレードしました
date: '2020-07-02'
archives: ["2020/07"]
categories:
  - ゲーム
tags:
  - Windows
  - Ryzen
  - 自作PC
image: /images/20200702-100745.jpg
---
数ヶ月前からゲーム用PCの調子が悪くなり、

- 突然ブルースクリーンが発生する
- 足がコツンとあたっただけでシャットダウンする
- 突然再起動し、起動しようとするがBIOSまでいかず、そのまま再起動し続ける（無限ループ）

といった、まさに末期症状と言わんばかりの状態になっていました。上記の症状を直すためにPCケースを開け、電源ケーブルを抜いてSSDを外して、BIOSだけ起動できるまで繰り返して、BIOS起動できるようになったらSSD差して起動するという、**ファミコン時代のフーフーしてうまく起動するまで頑張るみたいな**事してました。

これは流石に辛い……という事で、ついに僕も流行りにのってRyzenに組み替える事にしました🎉

## Ryzenに載せ替えるとして、どれが良いのか？

「Ryzenイイゾ！」「Ryzen最高！」と、僕のゲーマー友達は全員Ryzenべた褒めだったので、まあRyzenという事は決まっていたのですが、どのグレードにしようかな？と。そもそもシリーズとかグレードの見方から分からないｗ

で、調べた感じだとRyzenは現段階で3世代まで出てて、Ryzen nに続く2000番台が第2世代、3000が第3世代という感じっぽいですね。3桁番台は細かいバージョン。で、Ryzen 7 ≒ Core i7みたいな感じでグレードが別れていると。どれもソケットはAM4かな。

というわけでCPUのスペック表を見てみる。

[CPU性能比較表 | 最新から定番のCPUまで簡単に比較](https://pcrecommend.com/cpu/)

ふむふむ。僕はそこまで性能を求める事をしない（Satisfactoryがやりたいくらい）なので、Ryzen 5 3500とかRyzen 5 3300Xあたりがお求めやすくて良さそう（16,000円前後）。そもそもCore i5 2500Kをずっと使ってきたから、性能が約3倍あがるっていうｗ

3300XはシリーズにXとかついているので分かりやすいですが、オーバークロックとかできるモデルって事ですよねー。で、こいつは発熱がすごいみたいなので、ちょっとそこまで気をつけて組む余裕はないので、今回はRyzen 5 3500ちゃんを選ぶことにしました。

## マザボはASUSのTUF B450-PLUS GAMINGで

PCパーツは結構MSI（次点でASRock）が好きなのですが、評判が良くて安めなASUSのTUF B450-PLUS GAMINGをチョイスしてみました。

これに関しては特にこだわりはありません。レビューが多くて良さそうだったので選びましたｗ　今は1万円台のマザボでもかなり性能良いみたいですね。

ちなみにB450はRyzen 第2世代の頃に発売されたマザボで、Ryzen 第3世代で使うためにはBIOSをアップデートする必要があるみたいなんですが、今現在流通している物は元々アップデートされてるみたいですね。自分はAmazonで購入しましたが、しっかりRyzen 3000 readyのシールが貼ってある第3世代が使えるものでした👍

## というわけで、パーツ入れ替えして完成！

![](/images/20200702-100821.jpg)

電源,グラボ,ケースは使い回して、3万円ちょっとでPCをアップグレードできました！

- CPU: [Ryzen 5 3500](https://www.amazon.co.jp/dp/B07YZR314W?tag=t4traw-22)(16,000円)
- M/B: [ASUS TUF B450-PLUS GAMING](https://www.amazon.co.jp/dp/B07FMVJT1H?tag=t4traw-22)(10,000円)
- RAM: [TEAM DDR4 2666Mhz PC4-21300 8GBx2枚](https://www.amazon.co.jp/dp/B07HJWXKXP?tag=t4traw-22)(7,500円)

特に困る事なく、無事起動しました！強いて言うなら、CPUの向きが微妙に分からなかった感じですね。CPU側に基準となる▲マークがあるんですが、ソケットの方にそれが無いように見えて、「これどっちなん……」と一瞬なりましたが、よくよく見てみるとわずかに窪みがあって、そこに合わせる形で載せました😅

今の所問題なく動いているので、初期の相性問題は無さそうです。ん？てか今の時代でも相性問題とかあるの？と思って調べたら、今はかなり少なくなってきてるみたいですね。

しかも、グラボとか電源とか買っても5万円前後でゲーミングPCが動く時代かぁ……。昔は10万超えは確実じゃなかったっけ……ｗ　良い時代になりました。

さて、CPUがネックでやれなかったゲームもいくつかあったので、さっそくそれらを遊んでみたいと思います。

それでは👋

<div class="amazfy">
<a href="https://www.amazon.co.jp/dp/B07YZR314W?tag=t4traw-22">
<img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07YZR314W&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t4traw-22&language=ja_JP">
<p>AMD Ryzen 5 3500 with Wraith Spire cooler 3.6GHz 6コア / 6スレッド 19MB 65W【国内正規代理店品】</p>
</a>
</div>

<div class="amazfy">
<a href="https://www.amazon.co.jp/dp/B07FMVJT1H?tag=t4traw-22">
<img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07FMVJT1H&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t4traw-22&language=ja_JP">
<p>ASUS AMD B450搭載 AM4対応 マザーボード TUF B450-PLUS GAMING【ATX】【 第3世代 AMD Ryzen CPU に対応】</p>
</a>
</div>

<div class="amazfy">
<a href="https://www.amazon.co.jp/dp/B07HJWXKXP?tag=t4traw-22">
<img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07HJWXKXP&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t4traw-22&language=ja_JP">
<p>TEAM DDR4 2666Mhz PC4-21300 8GBx2枚（16GBkit）デスクトップ用 Elite Plus シリーズ 日本国内無期限保証(永久保証）正規品</p>
</a>
</div>


