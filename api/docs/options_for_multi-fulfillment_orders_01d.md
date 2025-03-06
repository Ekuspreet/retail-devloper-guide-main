# Options for multi-fulfillment orders - 01D  
- In case of multi-fulfillment orders, where the seller can provide multiple fulfillment options for 1 or more items, all possible fulfillment options for an item should be communicated to the buyer to decide which fulfillment option to select;  
- Different fulfillment options are shown in /on_select and the buyer has to select 1 fulfillment option per item or for all items, as the case may be. This fulfillment option is communicated to the seller in /init;


---

**Payload changes**

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "provider": {
        "id": "P1"
      },
      "items": [
        {
          "id": "I1",
          "fulfillment_ids": ["F1", "F3"]
        },
        {
          "id": "I2",
          "fulfillment_ids": ["F2", "F3"]
        }
      ],
      "fulfillments": [
        {
          "id": "F1",
          "type": "Delivery",
          "end": {
            "time": {
              "range": {
                "start": "2025-01-08T09:30:00.000Z",
                "end": "2025-01-08T10:00:00.000Z"
              }
            }
          }
        },
        {
          "id": "F2",
          "type": "Delivery",
          "end": {
            "time": {
              "range": {
                "start": "2025-01-08T13:30:00.000Z",
                "end": "2025-01-08T14:00:00.000Z"
              }
            }
          }
        },
        {
          "id": "F3",
          "type": "Delivery",
          "end": {
            "time": {
              "range": {
                "start": "2025-01-08T18:30:00.000Z",
                "end": "2025-01-08T19:00:00.000Z"
              }
            }
          }
        }
      ]
    }
  }
}
```

---

### Selected Fulfillment Option in `/init`
```json
{
  "context": {
    "action": "init",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "provider": {
        "id": "P1"
      },
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "F3"
        },
        {
          "id": "I2",
          "fulfillment_id": "F3"
        }
      ],
      "fulfillments": [
        { "id": "F1", "...": "" },
        { "id": "F2", "...": "" },
        { "id": "F3", "...": "" }
      ]
    }
  }
}
```