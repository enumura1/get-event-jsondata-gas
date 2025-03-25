function getEventData() {
  // スプレッドシートを取得
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  
  // 各セルからJSONデータを取得
  const jsonData1 = sheet.getRange("A5").getValue();
  const jsonData2 = sheet.getRange("B5").getValue();
  const jsonData3 = sheet.getRange("C5").getValue();
  const jsonData4 = sheet.getRange("D5").getValue();
  
  // JSONデータをパース
  try {
    const data1 = JSON.parse(jsonData1);
    const data2 = JSON.parse(jsonData2);
    const data3 = JSON.parse(jsonData3);
    const data4 = JSON.parse(jsonData4);
    
    // "サービスごとのCloudTrailイベント"のデータを取得
    return {
      sample1: data1["サンプル1"]["サービスごとのCloudTrailイベント"],
      sample2: data2["サンプル2"]["サービスごとのCloudTrailイベント"],
      sample3: data3["サンプル3"]["サービスごとのCloudTrailイベント"],
      sample4: data4["サンプル4"]["サービスごとのCloudTrailイベント"]
    };
  } catch (e) {
    Logger.log("JSONのパースに失敗しました: " + e);
    return null;
  }
}
