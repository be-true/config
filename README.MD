## Фичи
- [ ] Умеет генерировать документацию в MD файл в виде таблицы.
- [ ] Проверяет все переменные и выводить сообщение в консоль о не хватающих
- [ ] Стирает env переменные, которые были использованы по команде.
- [ ] Умеет указывать, что одни правила валидации включаются в зависимости от наличия значения в других переменных

## TODO
- Во что превращаются декораторы после компиляции TS


## Использование
### Описание конфигурации
```typescript
import { config, fromEnv } from "@be-true/config"
import { IExampleConfig } from ".";

@config
export class ExampleConfig implements IExampleConfig {
    get appHost(): string {
        return fromEnv("APP_HOST")
            .required()
            .description("Доменное имя на котором запускается проект")
            .example("https://domain.ru") // Переопределяем пример. В других случаях example генерируется из типа
            .default("http://localhost")
            .asString()
        ;
    }

    get appPort(): number {
        return fromEnv("APP_PORT")
            .required()
            .description("Порт на котором запускается приложение")
            .default(3000)
            .asInt()
        ;
    }

    get featureFlag(): ?boolean {
        return fromEnv("FEATURE_FLAG")
            .description('Чтобы включить функциональность укажите этот флаг')
            .default(false)
            .asBool()
        ;
    }
}
```

### Где будет использоваться
```typescript
interface IExampleConfig {
    appHost: string,
    appPort: number,
    featureFlag: ?boolean,
}

class AnyFeature {
    constructor(private config: IExampleConfig) {}

    anyMethod() {
        ...
            if (this.config.featureFlag) {

            }
        ...
    }
}
```

### Инициализация конфигурации
Файл инициализации проекта

```typescript
import { configInit } from "@be-true/config";

...
await configInit({
    removeAfterLoad: true
});
...
```
### Экспорт документации
Файл generate.ts
```typescript
import { configExport } from "@be-true/config";

...
await configExport({
    target: "./docs/envs.MD",
    // Если нужно записать только в секцию
    section: ['<!--{INJECT_ENVS}-->','<!--{/INJECT_ENVS}-->'],
});
...
```

Команда в секции script файла package.json
```json
{
    "scripts": {
        "generate": "tsc && node ./dist/generate.js"
    }
}
```

### Пример экспортированной таблицы конфигурации приложения
<!--{INJECT_ENVS}-->
| name         | required | type    | default          | description                                       |
|--------------|:--------:|---------|------------------|---------------------------------------------------|
| APP_HOST     |   yes    | string  | http://localhost | Доменное имя на котором запускается проект        |
| APP_PORT     |   yes    | integer | 3000             | Порт на котором запускается приложение            |
| FEATURE_FLAG |          | boolean | false            | Чтобы включить функциональность укажите этот флаг |
<!--{/INJECT_ENVS}-->