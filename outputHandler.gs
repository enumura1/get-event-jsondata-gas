// 結果を新しいシートに出力する
function createResultSheet(result) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 結果出力用のシートを作成または取得
  let resultSheet = ss.getSheetByName("API統合結果");
  if (!resultSheet) {
    resultSheet = ss.insertSheet("API統合結果");
  } else {
    resultSheet.clear();
  }
  
  // ヘッダー行を設定
  resultSheet.getRange("A1").setValue("統合結果サマリー");
  resultSheet.getRange("A3").setValue("統合前のイベント数");
  resultSheet.getRange("B3").setValue(result.totalEvents);
  resultSheet.getRange("A4").setValue("重複除去後のイベント数");
  resultSheet.getRange("B4").setValue(result.uniqueEvents);
  resultSheet.getRange("A5").setValue("重複したイベント数");
  resultSheet.getRange("B5").setValue(result.duplicateCount);
  
  // グループ化されたイベント一覧を出力
  resultSheet.getRange("A7").setValue("サービスごとのAPIイベント一覧（重複除去済み）");
  
  let row = 9;  // 出力開始行
  
  // サービスごとにイベントを出力
  for (const service in result.groupedEvents) {
    // サービス名を出力
    resultSheet.getRange(row, 1).setValue(service);
    resultSheet.getRange(row, 1).setFontWeight("bold");
    
    // そのサービスのイベントを出力
    const events = result.groupedEvents[service];
    for (let i = 0; i < events.length; i++) {
      // サービス名と同じ行からイベントを出力する（サービス名の隣のセルから）
      if (i === 0) {
        // 最初のイベントはサービス名と同じ行に
        resultSheet.getRange(row, 2).setValue(events[i]);
      } else {
        // 2つ目以降のイベントは次の行に
        resultSheet.getRange(row + i, 2).setValue(events[i]);
      }
    }
    
    // 次のサービスの開始行を設定
    // 現在の行 + そのサービスのイベント数（最低1）の最大値
    row = row + Math.max(1, events.length);
    
    // サービス間に空行を追加
    row++;
  }
  
  // 書式設定
  formatResultSheet(resultSheet);
}

// 結果シートの書式を設定する
function formatResultSheet(sheet) {
  sheet.getRange("A1").setFontWeight("bold").setFontSize(14);
  sheet.getRange("A7").setFontWeight("bold");
  sheet.getRange("A3:A5").setFontWeight("bold");
  
  // 列の幅を自動調整
  sheet.autoResizeColumn(1);
  sheet.autoResizeColumn(2);
}
