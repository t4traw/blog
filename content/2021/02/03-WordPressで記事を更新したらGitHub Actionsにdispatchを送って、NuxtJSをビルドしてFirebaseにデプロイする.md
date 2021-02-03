---
title: WordPressで記事を更新したらGitHub Actionsにdispatchを送って、NuxtJSをビルドしてFirebaseにデプロイする
date: 2021-02-03
archives: ["2021/02"]
categories:
  - 開発
tags:
  - github
  - github actions
  - firebase
  - nuxst
  - wordpress
  - webhook
image: /images/jamstack.png
---
先日とあるサイトをJamstackで制作していて、最初はNetlifyでいいやって思ったんですが、記事多すぎて1ヶ月のビルド時間が300hを超えちゃう問題が発生。

有料プランも検討しましたが、Netlifyって日本からだと微妙に遅い……。というわけで、他のホスティングサービスを検討する事に。

- Netlify
- Vercel
- Firebase
- 普通にレンタルサーバーにlftp

最初はNetlifyじゃなくてVercelがいいよね！と思っていたのですが、VercelはOrganizationのリポジトリは有料（$20/月）。

Vercel早くて簡単だから魅力的だけど、制作しているサイトの規模的に月$20はちょっと重い。

この段階で普通にレンタルサーバーにlftpしちゃった方が早くね？と考えましたが、そしたらフォームとかどうする？となり、だったらサーバーレスなFunctionsがあるFirebase Hostingがいいんじゃない？となり、Firebaseを試すことにしました。

## GitHub Actionsと組み合わせるのが超ラクになっててビビる

さて、最近Firebase触っていないので、またドキュメントを読みながらnpm install -g firebase-toolsをします。

さっそくfirebase initすると、今まではなかった「For which GitHub repository would you like to set up a GitHub workflow?」などの質問がきて、Hosting前にビルドする時のコマンドを設定する質問などに答えるていくと、なんとGitHub Actionsのworkflowが生成されるようになっています……。

やだ、これめっちゃ楽なんですけど……。

いくつかの質問に答えるだけで、GitHub Actionsでプルリクエストのプレビューサイトをビルドしてくれたり、マージされたらデプロイしてくれたりのworkflowを生成してくれます。

## WordpressからwebhookでGitHub Actionsにdispatchを送る && 2回webhookが投げられてしまう問題を修正

GitHub Actionsのカンタンさと、Firebaseの相変わらずにスピードに感動していると、ある事を思いだします。

NetlifyやVercelだと、webhookを受け取ってくれてリビルドをしてくれていたのですが、ビルドがGitHub Actionsになると、それがありません。すっかり忘れていました😰

なので、さっそくWordpressからGitHub Actionsを発火させる方法を探していると、NuxtではなくGridsomeですが、WordpressとGitHub Actionsでビルドしてる方がいらっしゃいました。

[WordPressで記事を投稿したらGitHub Actions経由でGridsomeのビルドをする。 - return $lock;](https://retrorocket.biz/archives/1606)

この記事を参考に、Wordpressプラグインを書いてみました。

```php
<?php
/**
 * Plugin Name: GitHub Actions build hook
 */

add_action('publish_post', 'nb_webhook_post', 10, 2);

function nb_webhook_post($post_id, $post) {
  if ( !(defined( 'REST_REQUEST' ) && REST_REQUEST )) {
    $header = [
      'Authorization: token ここにGitHubのPersonalTokenを書きます',
      'Accept: application/vnd.github.everest-preview+json',
      'User-Agent: WordPress_webhook_post'
    ];
    $data = [
      'event_type' => 'WordPress_webhook',
    ];
    if ($post->post_status === 'publish') {
      $url = curl_init('https://api.github.com/repos/ユーザー名/リポジトリ名/dispatches');
      curl_setopt($url, CURLOPT_CUSTOMREQUEST, 'POST');
      curl_setopt($url, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($url, CURLOPT_HEADER, true);
      curl_setopt($url, CURLOPT_POSTFIELDS, json_encode($data));
      curl_setopt($url, CURLOPT_HTTPHEADER, $header);
      curl_exec($url);
    }
  }
}
?>
```

最初は記事にあるphpを参考にそのまま書いていたのですが、どうもpublish_postって記事更新時に何度も実行されているらしく、一度記事を更新すると、

![](/images/2021-02-03_10-40-02.png)

こんな感じで2個とか4個とかビルドが走ってしまう問題が……ｗ

こらアカンというわけで、「wordpress publish_post twice」などで検索してみると、

[publish_post hook trigger twice when I publish post | WordPress.org](https://wordpress.org/support/topic/publish_post-hook-trigger-twice-when-i-publish-post/)

あーやっぱ同じ悩みもってる人たくさんいるじゃん……ｗ

remove_action()で処理するのはなんか気持ち悪いので、記事内にある`if ( !(defined( 'REST_REQUEST' ) && REST_REQUEST ))`を試してみたところ、無事1回だけwebhookが飛んでくるようになりました😆

## Firebase Functionsは有料プランしか使えなくなってるっていうね……。

というわけで、次はさっそくお問い合わせフォーム部分を開発だ！と思って、functionをinitしようとすると、Blazeプラン（従量課金タイプのプラン）にアップグレードしないと使えなくなったんでよろしく！というメッセージが……。

なんてこった……。FunctionsがあるからFirebase選んだのに……ｗ 以前は無料プランで使えていたので、使えるものだと思っていました。

とりあえず、これ以上時間もなかったので、formspreeというフォームを簡単に設置できるSaaSを使って実装する事にしました。

[Custom Forms with No Server Code | Formspree](https://formspree.io/)

---

当初のフォームが簡単にできそうだからという問題はアレでしたが、Wordpressから自由にwebhookを投げられる事が分かったので、今後ホスティングサービスが変わっても安心です😃

それでは。