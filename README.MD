## Фичи
- [x] Проверяет во время запуска приложения все переменные и выводит сообщение о если чего-то не хватает.
- [x] Умеет генерировать документацию в MD файл из конфигурационных файлов.
- [ ] Стирает env переменные, после первой их загрузки.
- [ ] Зависимость одних переменных от значения других.

## TODO
- Описать example
- Сохранять таблицу в MD с указанием секции
- Перенести context из колонки в строчку на переменными из этого контекста
- Перевести все сообщения и документацию на английский.
- Описать лицензию

## Использование
### Описание конфигурации
```typescript
import { config, ConfigBase } from "@be-true/config"
import { IExampleConfig } from ".";

@config
export class ExampleConfig extends ConfigBase implements IExampleConfig {
    context = "example config",
    get appHost(): string {
        return this.fromEnv("APP_HOST")
            .required()
            .description("Доменное имя на котором запускается проект")
            .example("https://domain.ru") // Переопределяем пример. В других случаях example генерируется из типа
            .default("http://localhost")
            .asString()
        ;
    }

    get appPort(): number {
        return this.fromEnv("APP_PORT")
            .required()
            .description("Порт на котором запускается приложение")
            .default(3000)
            .asInteger()
        ;
    }

    get featureFlag(): ?boolean {
        return this.fromEnv("FEATURE_FLAG")
            .description('Чтобы включить функциональность укажите этот флаг')
            .default(false)
            .asBoolean()
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