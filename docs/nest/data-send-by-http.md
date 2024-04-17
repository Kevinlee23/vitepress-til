# 4 种常用的 http 数据传输方式

`query`, `param`, `json`, `form data`

## query

诸如 `/api/person/find?id=10` 格式

```ts
@Controller("person")
export class PersonController {
  @Get("find")
  find(@Query("id") id: string) {
    // ...
  }
}
```

## paramas

`url`: `/api/person/findById/10`

```ts
@Controller("person")
export class PersonController {
  @Get("findById/:id")
  findById(@param("id") id: string) {
    // ...
  }
}
```

## json

`url`: `/api/person/create`

```json
// 载荷
{
  "name": "snowinlu",
  "age": 27
}
```

```ts
@Controller("person")
export class PersonController {
  @Post("create")
  create(@Body() createPersonDto: CreatePersonDto) {
    // ...
  }
}
```

## form-data

`url`: `/api/person/update`

`content type`: `multipart/form-data`

```json
// 载荷
{
  "id": 10,
  "file1": "<binary content>",
  "file2": "<binary content>"
}
```

```ts
import { UploadedFiles } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";

@Controller("person")
export class PersonController {
  @Post("update")
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: "uploads/",
    })
  )
  update(@Body() data, @UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(data.id); // 10
    console.log(files); // <file1>, <file2>
  }
}
```

需要提前安装 `@types/multer`
