# [JSON -> YAML](https://www.json2yaml.com)

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
