import fs from "fs/promises";
import { configClasses } from "./configClass";
import { ConfigBase } from "./ConfigBase";
import { MDTable, MDTableData } from "./MDTable";
import { FormatError, RequiredError } from "./errors";
import { ConfigItem } from "./ConfigItem";
import { ConfigExportOptions } from "./types";

export const configExport = async (options: ConfigExportOptions) => {
  const data: MDTableData[] = [];

  configClasses.forEach((className) => {
    const config: any = new className() as ConfigBase;

    const params: { [key: string]: any } = Object.getOwnPropertyDescriptors(
      // @ts-ignore
      config.__proto__
    );

    Object.entries(params)
      .filter(([_, desc]) => desc.get !== undefined) // Получаем параметры, которые реализованы в виде геттера
      .forEach(([name, _]) => {
        try {
          config[name]; // Вызываем гетер, для получения ошибки и регистрации ее
        } catch (e) {
          if (e instanceof RequiredError || e instanceof FormatError) {
          } else {
            throw e;
          }
        }
      });

    config.getItems().forEach((i: ConfigItem) => {
      data.push(i.export());
    });
  });

  const columns = ['context', 'variable', 'type', 'description', 'example'];
  const result = new MDTable(data, { columns }).toString();
  await fs.writeFile(options.target, result);
};
