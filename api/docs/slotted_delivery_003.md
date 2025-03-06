# Slotted delivery - 003

- BNP may show the buyer available delivery slots for fulfillment (/on_select):
  - NP providing fulfillment may maintain an inventory of all fulfillment slots;
  - SNP, providing fulfillment, can communicate available delivery slot(s) for the buyer to select:
    - Each delivery slot will be for a unique fulfillment;
  - BNP, providing fulfillment, can show available delivery slots to the buyer but only communicate the selected delivery slot to SNP;
- BNP communicates the selected delivery slot to SNP (/init);

**Payload changes**

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "..": "",
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "F1"
        }
      ],
      "fulfillments": [
        {
          "id": "F1",
          "type": "Delivery",
          "..": "",
          "@ondc/org/TAT": "PT60M",
          "end": {
            "time": {
              "range": {
                "start": "2025-01-07T09:30:00.000Z",
                "end": "2025-01-07T10:00:00.000Z"
              }
            }
          }
        },
        {
          "id": "F2",
          "type": "Delivery",
          "..": "",
          "@ondc/org/TAT": "PT90M",
          "end": {
            "time": {
              "range": {
                "start": "2025-01-07T10:30:00.000Z",
                "end": "2025-01-07T11:00:00.000Z"
              }
            }
          }
        },
        {
          "id": "F3",
          "type": "Self-Pickup",
          "..": "",
          "@ondc/org/TAT": "PT30M",
          "start": {
            "time": {
              "range": {
                "start": "2025-01-07T09:15:00.000Z",
                "end": "2025-01-07T09:30:00.000Z"
              }
            }
          }
        },
        {
          "id": "F4",
          "type": "Self-Pickup",
          "..": "",
          "start": {
            "time": {
              "range": {
                "start": "2025-01-07T10:30:00.000Z",
                "end": "2025-01-07T10:45:00.000Z"
              }
            }
          }
        }
      ],
      "..": ""
    }
  }
}
```

```json
{
  "context": {
    "action": "init",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "..": "",
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "F2"
        }
      ],
      "..": ""
    }
  }
}
```