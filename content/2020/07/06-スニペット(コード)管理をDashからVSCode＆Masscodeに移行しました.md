---
title: スニペット(コードのネタ帳)管理をDashからVSCode＆Masscodeに移行しました
date: 2020-07-06
archives: ["2020/07"]
categories:
  - 便利
tags:
  -
image: /images/20200706-130154.jpg
---
ちょっと前に Mac のスニペットコード管理ツールで有名な Dash に UI のアップデートがありました。今まではスニペット一覧がサっと出ていたのですが、それが無くなって非常に使い辛くなってしまいました。

で、エディタはしばらくVSCodeで落ち着きそうだし、エディタ組み込みの方が色々便利なのでは？と思ったので、VSCodeのスニペット管理機能に[easy-snippet](https://marketplace.visualstudio.com/items?itemName=inu1255.easy-snippet)という拡張を追加し、エディタで使わない部分を[Masscode](https://masscode.io/)というスニペット管理ツールを使う方法に移行しました。

## easy-snippetを使った簡単スニペット作成・管理

easy-snippetがあれば、VSCodeのスニペット登録・編集がめちゃくちゃ簡単になります。

スニペット登録したいコードを選択した状態でコマンドパレットを開き、`create snippet`という感じで打てば、Create snippet by selectが表示されるので、<kbd>Return</kbd>を押します。

![](/images/20200706-122645.jpg)

そしたら、呼び出し時のショートカットコマンドを登録します。

![](/images/20200706-123037.jpg)

そしたら、サイドバーのスニペット管理アイコン(easy-snippetのアイコン)が表示されているので、そちらをクリックして先程作ったスニペットを編集します。

![](/images/20200706-112806.jpg)

お好みでdescriptionなどを書いておきます。スニペットを呼び出した後にカーソルを移動して欲しい場合は`${foo}${foo}`といった具合に書けばOKです。<kbd>Tab</kbd>キーで次に移動する事もできます。順番などを指定したい時は`${1:foo}``${2:bar}`と指定する感じですね。

他にも`${TM_SELECTED_TEXT}`や`${CLIPBOARD}`などの便利な呼び出しがあります。詳しくはドキュメントをご覧ください。

[Snippets in Visual Studio Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

今知ったんですが、CURRENT_YEARとかCURRENT_MONTHっていうの便利だな。

![](/images/20200706-112851.jpg)

そしたら、こんな感じでサクっと呼び出して使えます。

![](/images/easy-snippet-capture.gif)

## キーボードショートカットにも便利なスニペットを登録

もっと頻繁に使うスニペットはキーボードショートカットに登録する事もできます。

コマンドパレットで`keyboard json`みたいな感じで入力すると、Open keyboard shortcuts (JSON)が出てくるので、それを選択するとキーボードショートカットのjsonが表示されます。

上記にあった呼び出しが全部使えるので、例えば`![選択した文字列](クリップボード)`みたいなマークダウン用画像をサクっと挿入したい場合は、

```json
{
  "key": "cmd+k cmd+i",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "snippet": "![${TM_SELECTED_TEXT}](/images/${CLIPBOARD})"
  }
}
```

こんな感じで登録すれば<kbd>cmd+k</kbd><kbd>cmd+i</kbd>でサクっと`![選択した文字列](クリップボード)`ができるようになります👏

## VSCode以外で使うスニペットやコードのネタ帳はMasscodeに

VSCode外で使いたいスニペットやネタ帳は、Masscodeというツールを使う事にしました。

[massCode - A free and open source code snippets manager for developers](https://masscode.io/)

![](/images/20200706-131219.jpg)

本当はこの子だけで行きたかったのですが、スニペット呼び出し後のカーソルの自動移動が無いのが辛かったですね。逆に言えばそれさえあればこの子だけでもいけたかもしれません。が、やっぱエディタ内蔵の親和性が高いからなぁ。VSCodeから切り替えない限りは無いかも。

---

というわけで、スニペットツールの移行をしました。あとはこれをストレスなく同期するだけです。

それでは。

<div class="amazfy">
<a href="https://www.amazon.co.jp/dp/4863542887?tag=t4traw-22">
<img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4863542887&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t4traw-22&language=ja_JP">
<p>徹底解説Visual Studio Code</p>
</a>
</div>


