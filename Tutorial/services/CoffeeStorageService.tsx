// src/services/CoffeeStorageService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CoffeeRecord } from "../types/CoffeeTypes";
import * as FileSystem from "expo-file-system";
import { v4 as uuidv4 } from "uuid";

class CoffeeStorageService {
  private STORAGE_KEY = "@CoffeeRecords";

  // 新しいコーヒーレコードを保存
  async saveCoffeeRecord(
    record: Omit<CoffeeRecord, "id">,
    imageUri?: string
  ): Promise<string> {
    try {
      // 一意のIDを生成
      const id = uuidv4();

      // 画像がある場合は処理
      let processedImageUri = imageUri;
      if (imageUri) {
        processedImageUri = await this.saveImage(imageUri, id);
      }

      // 完全なレコードを作成
      const fullRecord: CoffeeRecord = {
        id,
        ...record,
        imageUri: processedImageUri,
      };

      // 既存のレコードを取得
      const existingRecordsJson = await AsyncStorage.getItem(this.STORAGE_KEY);
      const existingRecords: CoffeeRecord[] = existingRecordsJson
        ? JSON.parse(existingRecordsJson)
        : [];

      // 新しいレコードを追加
      const updatedRecords = [...existingRecords, fullRecord];

      // 更新されたレコードを保存
      await AsyncStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(updatedRecords)
      );

      return id;
    } catch (error) {
      console.error("コーヒーレコードの保存中にエラーが発生しました:", error);
      throw error;
    }
  }

  // 画像をアプリのファイルシステムに保存
  private async saveImage(
    sourceUri: string,
    recordId: string
  ): Promise<string> {
    // ドキュメントディレクトリが存在することを確認
    const dirPath = `${FileSystem.documentDirectory}coffee_images/`;
    await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });

    // 一意のファイル名を生成
    const fileExtension = sourceUri.split(".").pop();
    const newImageUri = `${dirPath}${recordId}.${fileExtension}`;

    // 画像を新しい場所にコピー
    await FileSystem.copyAsync({ from: sourceUri, to: newImageUri });

    return newImageUri;
  }

  // すべてのコーヒーレコードを取得
  async getAllCoffeeRecords(): Promise<CoffeeRecord[]> {
    try {
      const recordsJson = await AsyncStorage.getItem(this.STORAGE_KEY);
      return recordsJson ? JSON.parse(recordsJson) : [];
    } catch (error) {
      console.error("コーヒーレコードの取得中にエラーが発生しました:", error);
      return [];
    }
  }

  // 特定のIDのレコードを取得
  async getCoffeeRecordById(id: string): Promise<CoffeeRecord | null> {
    try {
      const records = await this.getAllCoffeeRecords();
      return records.find((record) => record.id === id) || null;
    } catch (error) {
      console.error("コーヒーレコードの取得中にエラーが発生しました:", error);
      return null;
    }
  }

  // 既存のレコードを更新
  async updateCoffeeRecord(
    id: string,
    updatedRecord: Partial<CoffeeRecord>
  ): Promise<boolean> {
    try {
      const records = await this.getAllCoffeeRecords();
      const index = records.findIndex((record) => record.id === id);

      if (index !== -1) {
        records[index] = { ...records[index], ...updatedRecord };
        await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
        return true;
      }
      return false;
    } catch (error) {
      console.error("コーヒーレコードの更新中にエラーが発生しました:", error);
      return false;
    }
  }

  // レコードを削除
  async deleteCoffeeRecord(id: string): Promise<boolean> {
    try {
      const records = await this.getAllCoffeeRecords();
      const filteredRecords = records.filter((record) => record.id !== id);

      // 関連する画像があれば削除
      const recordToDelete = records.find((record) => record.id === id);
      if (recordToDelete?.imageUri) {
        await FileSystem.deleteAsync(recordToDelete.imageUri, {
          idempotent: true,
        });
      }

      await AsyncStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(filteredRecords)
      );
      return true;
    } catch (error) {
      console.error("コーヒーレコードの削除中にエラーが発生しました:", error);
      return false;
    }
  }
}

export default new CoffeeStorageService();
