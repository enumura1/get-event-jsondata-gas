function consolidateCloudTrailEvents() {
  // データ取得
  const eventData = getEventData();
  if (!eventData) return;
  
  // イベントの統合と重複除去
  const result = processEvents(eventData);
  
  // 結果を出力
  createResultSheet(result);
  
  return result;
}

// メニューを追加するための関数
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('CloudTrail解析')
    .addItem('APIイベントを統合して重複除去', 'consolidateCloudTrailEvents')
    .addToUi();
}
