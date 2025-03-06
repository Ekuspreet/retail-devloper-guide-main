# Fulfillment Delay - 020

- Delivery delays, with attempt trail:

**Payload changes**

### Delivery Delay Tracking in `/on_status`
```json
{
  "context": {
    "action": "on_status",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "F1",
          "end": {
            "time": {
              "range": {
                "start": "2025-01-13T11:00:00.000Z",
                "end": "2025-01-13T11:30:00.000Z"
              }
            }
          },
          "tags": [
            {
              "code": "fulfillment_delay",
              "list": [
                { "code": "state", "value": "Order-picked-up" },
                { "code": "reason_id", "value": "002" },
                { "code": "timestamp", "value": "2025-01-12T22:00:00.000Z" }
              ]
            }
          ]
        }
      ]
    }
  }
}
```