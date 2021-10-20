import fs from "fs/promises";
import { MDTable, MDTableData } from "./MDTable";
import { ConfigExportOptions } from "./types";
import { configIterator } from "./iterators";

export const configExport = async (options: ConfigExportOptions) => {
  const data: MDTableData[] = [];

  for (const { config } of configIterator()) {
    for (const item of config.getItems()) {
      data.push(item.export());
    }
  }

  const columns = ["context", "variable", "type", "description", "example"];
  const result = new MDTable(data, { columns }).toString();
  await fs.writeFile(options.target, result);
};
