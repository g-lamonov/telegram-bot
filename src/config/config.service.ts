import { config, DotenvParseOutput } from "dotenv";
import { IConfigService } from "./config.interface";

export enum ConfigServiceErrors {
  ENV_FILE_NOT_FOUND = "Env file not found",
  ENV_FILE_IS_EMPTY = "Env file is empty",
  ENV_DOES_NOT_CONTAIN_THIS_KEY = "Env does not contain this key",
}

export class ConfigService implements IConfigService {
  private _config: DotenvParseOutput;

  constructor() {
    const { error, parsed, } = config();

    if (error) throw new Error(ConfigServiceErrors.ENV_FILE_NOT_FOUND);
    if (!parsed) throw new Error(ConfigServiceErrors.ENV_FILE_IS_EMPTY);

    this._config = parsed;
  }

  get(key: string): string {
    const res = this._config[key];
    if (!res) throw new Error(ConfigServiceErrors.ENV_DOES_NOT_CONTAIN_THIS_KEY);

    return res;
  }
}
