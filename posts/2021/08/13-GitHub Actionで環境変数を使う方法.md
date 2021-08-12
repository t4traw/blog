---
title: GitHub Actionで環境変数を使う方法
date: '2021-08-13'
archives: ["2021/08"]
categories:
  - 開発
tags:
  - github
  - github actions
  - ci
image: /images/2021-08-13_01-52-58.png
---
CI、昔はwerckerやCircleCIなど使っていましたが、基本的なCIはもうすべてGitHub Actionに移行しました（個人のgemのCIはまだTravisCIを使っていますが）。

Firebaseなどのinit時にサクっと作ってくれるし、configも分かりやすくてGitHub Action大好きです😆

で、そのGitHub Actionですが、しばらく設定しない期間があると忘れるのが環境変数です。GitHubのリポジトリ設定にあるSecretを設定したら、もうGitHub Actionでその環境変数を使える気になっちゃって、いざ環境変数を使うシーンでうまく動かず、「あれ？あれ？」となんどもymlファイルを見直すという事をしてしまいます😓

まずGitHubのSettingsの中にあるSecretsで、新しく環境変数を設定します。

![](/images/2021-08-13_01-55-33.png)

で、このままではGitHub Actionで使えません😂

ymlファイルで呼び出してあげる必要があります。たとえばFOO_BAR_KEYという環境変数で、Secretsにも同様の変数名で登録した場合

```yml
      - name: Run test
        run: npm run test
        env:
          RAILS_ENV: test
          STAGE_ENV: test
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          FOO_BAR_KEY: ${{ secrets.FOO_BAR_KEY }}
```

これで`ENV["FOO_BAR_KEY"]`などが使えるようになります😌

RAILS_ENVなどもこの形で書いておくと分かりやすいですね！

それでは🤟