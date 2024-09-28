import { promises as fs } from "fs";
import path from "path";
import { DatabaseType, Storage } from "@/types";
import client from "..";
import config from "@/config";

class Database implements DatabaseType {
  private filePath: string;
  private storage: Storage;
  private initialized: Promise<void>;

  constructor(filePath: string) {
    if (!filePath) {
      throw new TypeError(
        "[Database] Constructor Error: Missing file path argument."
      );
    }
    this.filePath = path.resolve(__dirname, filePath);
    this.storage = {};
    this.initialized = this._init();
  }

  private async _init(): Promise<void> {
    try {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      const data = await fs.readFile(this.filePath, "utf8");
      this.storage = JSON.parse(data);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        await this._write();
      } else {
        throw new Error(`[Database] Initialization Error: ${error.message}`);
      }
    }
  }

  private async _write(): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(this.storage, null, 4));
    } catch (error: any) {
      throw new Error(`[Database] Write Error: ${error.message}`);
    }
  }

  async set(key: string, value: any): Promise<void> {
    await this.initialized;
    if (!key) {
      throw new TypeError("[Database] Error in set function: Invalid key.");
    }
    this.storage[key] = value;
    await this._write();
  }

  async get(key: string): Promise<any> {
    await this.initialized;
    if (!key) {
      throw new TypeError("[Database] Error in get function: Invalid key.");
    }
    return this.storage[key];
  }

  async has(key: string): Promise<boolean> {
    await this.initialized;
    if (!key) {
      throw new TypeError("[Database] Error in has function: Invalid key.");
    }
    return key in this.storage;
  }

  async delete(key: string): Promise<boolean> {
    await this.initialized;
    if (!key) {
      throw new TypeError("[Database] Error in delete function: Invalid key.");
    }
    if (await this.has(key)) {
      delete this.storage[key];
      await this._write();
      return true;
    }
    return false;
  }

  async deleteAll(): Promise<void> {
    await this.initialized;
    this.storage = {};
    await this._write();
  }

  async size(): Promise<number> {
    await this.initialized;
    return Object.keys(this.storage).length;
  }

  async keys(): Promise<string[]> {
    await this.initialized;
    return Object.keys(this.storage);
  }

  async values(): Promise<any[]> {
    await this.initialized;
    return Object.values(this.storage);
  }

  async toJSON(): Promise<Storage> {
    await this.initialized;
    return { ...this.storage };
  }

  async fromJSON(json: Storage): Promise<void> {
    await this.initialized;
    this.storage = { ...json };
    await this._write();
  }
}
const db = new Database(`${config.clientID}_data.json`);

export default db;
