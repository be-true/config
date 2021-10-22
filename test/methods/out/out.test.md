| context      | required | variable    | type                                          | default          | description                                  | example |
|--------------|----------|-------------|-----------------------------------------------|------------------|----------------------------------------------|---------|
| Database     | yes      | DB_HOST     | url                                           |                  | Host                                         |         |
| Database     | yes      | DB_DATABASE | string                                        |                  | Database name                                |         |
| Database     | yes      | DB_USER     | string                                        |                  | Login                                        |         |
| Database     | yes      | DB_PASSWORD | string                                        |                  | Password                                     |         |
| External API | yes      | API_HOST    | url                                           |                  | URL of external API                          |         |
| External API | yes      | API_TOKEN   | string                                        |                  | Access token of external API                 |         |
| WEB server   | yes      | APP_HOST    | url                                           | http://localhost | URL address of application                   |         |
| WEB server   | yes      | APP_PORT    | integer                                       | 3000             | Port of application                          |         |
| WEB server   | yes      | APP_ENV     | enum: production, staging, develop, localhost | localhost        | Environment in which application will be run |         |
| WEB server   |          | APP_NAME    | string                                        |                  | Name of application                          |         |