import { ConfigBase } from "./ConfigBase";
import { configClasses } from "./configClass";

export function* configIterator(): Generator<{
  config: ConfigBase;
  getterNames: string[],
}> {
  for (const className of configClasses) {
    const config: ConfigBase = new className() as ConfigBase;
    const params: { [key: string]: any } = Object.getOwnPropertyDescriptors(
      // @ts-ignore
      config.__proto__
    );

    const getterNames: string[] = [];
    for (const [getterName, desc] of Object.entries(params)) {
      // Skep no getters
      if (desc.get === undefined) continue;

      // Getter was run for him registration
      try {
        config.runItem(getterName);
      } catch(e) {}
      getterNames.push(getterName)
    }

    yield { config, getterNames };
  }
}
