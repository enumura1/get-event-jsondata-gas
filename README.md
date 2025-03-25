# get-event-jsondata-gas# イベント分析ツール

Google スプレッドシート上でイベントデータを分析・整理するための Google Apps Script (GAS) ツールです。
複数のサンプルデータからイベントを抽出し、重複を除去してサービスごとにグループ化して表示します。

## 機能

- スプレッドシートのセルからイベントデータ (JSON形式) を読み込み
- 複数のサンプルデータから「サービスごとのイベント」を抽出
- すべてのAPIイベントを統合し、重複を除去
- サービス名ごとにグループ化して結果を表示
- 統計情報（統合前のイベント数、重複除去後のイベント数、重複数）の表示

## セットアップ方法

1. Google スプレッドシートを新規作成または開く
2. メニューから「拡張機能」→「Apps Script」を選択
3. 表示された Google Apps Script エディタで以下のファイルを作成:
   - `main.gs`
   - `dataHandler.gs`
   - `dataProcessor.gs`
   - `outputHandler.gs`
4. 各ファイルに対応するコードをコピー＆ペースト
5. スクリプトを保存（Ctrl+S または ⌘+S）
6. スプレッドシートに戻る（スプレッドシートを再読み込みする必要がある場合があります）

## 使用方法

### データの準備

1. スプレッドシートの以下のセルにイベントデータ (JSON形式) を配置
   - A5: サンプル1のデータ
   - B5: サンプル2のデータ
   - C5: サンプル3のデータ
   - D5: サンプル4のデータ

### スクリプトの実行

1. スプレッドシートのメニューバーに「イベント解析」が表示されます
2. 「イベント解析」→「APIイベントを統合して重複除去」をクリック
3. 初回実行時は権限の承認が必要です。画面の指示に従って承認してください
4. スクリプトが実行され、「API統合結果」という新しいシートが作成されます

### 結果の確認

「API統合結果」シートには以下の情報が表示されます。

- 統合前のイベント数
- 重複除去後のイベント数
- 重複したイベント数
- サービスごとにグループ化されたイベント一覧

## 入力データ例

以下は、A5セルに入力するJSONデータの例です。

```json
{
  "サンプル1": {
    "アクセス分析結果": "hogeUserの2025-01-01から2025-01-15までのアクティビティ",
    "取得イベント数": 215,
    "サービスごとのイベント": {
      "hogeService": [
        "hogeService:hogeService1",
        "hogeService:hogeService2"
      ],
      "fugaService": [
        "fugaService:fugaService1",
        "fugaService:fugaService2"
      ],
      "commonService": [
        "commonService:commonService1",
        "commonService:commonService2",
        "commonService:commonService3"
      ]
    }
  }
}
```

B5、C5、D5セルにも同様の形式で異なるサンプルデータを配置します。
一部のサービスとイベントが重複していると、重複除去して出力します。

## 出力例

スクリプトを実行すると、以下のような出力が「API統合結果」シートに生成されます。

```
| 統合結果サマリー        |                  |
|------------------------|------------------|
| 統合前のイベント数      | 42              |
| 重複除去後のイベント数  | 38              |
| 重複したイベント数      | 4               |
|                        |                  |
| サービスごとのAPIイベント一覧（重複除去済み） |   |
|                        |                  |
| hogeService            | hogeService:hogeService1 |
|                        | hogeService:hogeService2 |
|                        |                  |
| fugaService            | fugaService:fugaService1 |
|                        | fugaService:fugaService2 |
|                        |                  |
| fooService             | fooService:fooService1 |
|                        | fooService:fooService2 |
|                        |                  |
| commonService          | commonService:commonService1 |
|                        | commonService:commonService2 |
|                        | commonService:commonService3 |
```

この結果表示では:
- サービス名は太字でA列に表示
- 各サービスの最初のイベントはサービス名と同じ行のB列に表示
- 同じサービスの追加イベントは下の行のB列に表示
- サービス間には空行が挿入される

## ファイル構成

- **main.gs**: メイン処理とメニュー設定
- **dataHandler.gs**: データ取得処理
- **dataProcessor.gs**: データ処理（統合・重複除去・グループ化）
- **outputHandler.gs**: 結果出力処理

## サンプルデータについて

対象のデータはサービスのイベントデータです。
