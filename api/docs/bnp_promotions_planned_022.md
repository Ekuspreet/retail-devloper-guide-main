# BNP Promotions Planned - 022

- BNP may communicate in advance any promotions planned;

**Payload changes**

```json
{
  "context": {
    "action": "search",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "intent": {
      "tags": [
        {
          "code": "bap_promos",
          "list": [
            { "code": "category", "value": "Sweaters" },
            { "code": "from", "value": "2025-01-01T00:00:00.000Z" },
            { "code": "to", "value": "2025-01-31T23:59:00.000Z" }
          ]
        },
        {
          "code": "bap_promos",
          "list": [
            { "code": "category", "value": "Tracker Devices" },
            { "code": "from", "value": "2025-01-15T00:00:00.000Z" },
            { "code": "to", "value": "2025-03-31T23:59:00.000Z" }
          ]
        }
      ]
    }
  }
}
```