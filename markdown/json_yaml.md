## [JSON -> YAML](https://codebeautify.org/json-to-yaml)
## [YAML -> JSON](https://codebeautify.org/yaml-to-json-xml-csv)
> JSON은 한글 등의 멀티 바이트 문자를 인코딩하여 보여주지만, YAML은 한글과 같은 유니코드를 그대로 사용할 수 있다는 장점이 있다.
일반적으로 HTTP RESPONSE Body는 JSON을 사용하며, YAML은 설정 파일을 작성할 때 가장 많이 사용된다.
YAML는 상속(Inherit) 등의 기능도 적용할 수 있다.



### JSON
```json
{
  "json": [
    "json1",
    "json2"
  ],
  "yaml": [
    "yaml1",
    "yaml2"
  ],
  "object": {
    "key": "value",
    "array": [
      {
        "null_value": null
      },
      {
        "boolean": true
      },
      {
        "integer": 1
      },
      {
        "string": "string"
      }
    ]
  },
  "body": "good\nbad\nsoso",
  "bodyEnter": "good\nbad\nsoso\n"
}
```


### YAML
```yaml
---
json:
- json1
- json2
yaml:
- yaml1
- yaml2
object:
  key: value
  array:
  - null_value:
  - boolean: true
  - integer: 1
  - string: string
body: |-
  good
  bad
  soso
bodyEnter: |
  good
  bad
  soso
```
