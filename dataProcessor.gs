// イベントデータを処理して統合・重複除去する
function processEvents(eventData) {
  // すべてのAPIイベントを格納する配列
  let allEvents = [];
  
  // 各サービスのAPIイベントを配列に追加
  addEventsToArray(eventData.sample1, allEvents);
  addEventsToArray(eventData.sample2, allEvents);
  addEventsToArray(eventData.sample3, allEvents);
  addEventsToArray(eventData.sample4, allEvents);
  
  // 重複を除去（Set使用）
  const uniqueEvents = [...new Set(allEvents)];
  
  // 重複除去後、サービスごとにグループ化
  const groupedEvents = groupEventsByService(uniqueEvents);
  
  // 結果をログに出力
  Logger.log("統合前のイベント数: " + allEvents.length);
  Logger.log("重複除去後のイベント数: " + uniqueEvents.length);
  
  // 重複したイベントの数
  const duplicateCount = allEvents.length - uniqueEvents.length;
  Logger.log("重複したイベント数: " + duplicateCount);
  
  return {
    totalEvents: allEvents.length,
    uniqueEvents: uniqueEvents.length,
    duplicateCount: duplicateCount,
    events: uniqueEvents,
    groupedEvents: groupedEvents  // サービスごとにグループ化されたデータ
  };
}

// サービスのAPIイベントを配列に追加する関数
function addEventsToArray(services, targetArray) {
  for (const service in services) {
    const events = services[service];
    for (const event of events) {
      targetArray.push(event);
    }
  }
}

// APIイベントをサービスごとにグループ化する関数
function groupEventsByService(events) {
  const grouped = {};
  
  for (const event of events) {
    // イベント文字列からサービス名を抽出（例: "hogeService:hogeService1" → "hogeService"）
    const serviceName = event.split(':')[0];
    
    // そのサービスのエントリがなければ作成
    if (!grouped[serviceName]) {
      grouped[serviceName] = [];
    }
    
    // サービスの配列にイベントを追加
    grouped[serviceName].push(event);
  }
  
  return grouped;
}
