// src/types/CoffeeTypes.ts
export interface CoffeeRecord {
  id: string; // 一意の識別子
  name: string; // 名称
  variety: string; // 品種
  origin: string; // 産地
  roastLevel: string; // 焙煎度
  extractionMethod: string;

  extractionMaker: string;

  grindSize: string; // 挽き目
  temperature: number; // 温度（℃）
  coffeeAmount: number; // 粉量（g）
  waterAmount: number; // 湯量（g）
  extractionTime: number; // 抽出時間
  acidity: string | number; // 酸味（1-10）
  bitterness: string | number; // 苦味（1-10）
  sweetness: string | number; // 甘味（1-10）
  body: string | number; // コク（1-10）
  aroma: string | number; // 香り（1-10）
  aftertaste: string | number; // 後味（1-10）
  memo?: string; // メモ
  imageUri?: string | null; // 画像のパス
}
