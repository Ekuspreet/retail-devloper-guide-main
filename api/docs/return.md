# Return Process

## Scenarios

### SNP Handles Return Pickup
- Existing scenario applies; no payload changes.
- No additional charges to be sent in the order quote.

### SNP Doesn’t Handle Return Pickup
1. **BNP sends return request** (same as above scenario).
2. **SNP approves return request** with state `Return_Approved`:
   - SNP also includes reverse QC input for return pickup check.
3. **BNP creates an order** for logistics for return pickup.
4. **BNP requests an update** for fulfillment state and reverse QC output for return fulfillment.
5. **BNP factors in return costs** accordingly.

## Payload Changes

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5"
  },
  "message": {
    "order": {
      "id": "O1",
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "F1",
          "quantity": {
            "count": 2
          }
        }
      ],
      "fulfillments": [
        {
          "id": "F1",
          "state": {
            "descriptor": {
              "code": "Order-delivered"
            }
          }
        },
        {
          "id": "R1",
          "type": "Return",
          "state": {
            "descriptor": {
              "code": "Return_Approved"
            }
          },
          "tags": [
            {
              "code": "reverseqc_input",
              "list": [
                { "code": "P001", "value": "Atta" },
                { "code": "P003", "value": "1" },
                { "code": "Q001", "value": "" }
              ]
            }
          ]
        }
      ],
      "updated_at": "2025-01-06T13:30:00.000Z",
      "updated_by": "system"
    }
  }
}
```

```json
{
  "context": {
    "action": "update",
    "core_version": "1.2.5"
  },
  "message": {
    "update_target": "fulfillment",
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "R1",
          "tags": [
            {
              "code": "update_state",
              "list": [
                { "code": "state", "value": "Return-Picked" },
                { "code": "reason_id", "value": "007" },
                { "code": "timestamp", "value": "2025-01-06T09:30:00.000Z" }
              ]
            },
            {
              "code": "update_agent_details",
              "list": [
                { "code": "name", "value": "agent_name" },
                { "code": "phone", "value": "9886098860" },
                { "code": "provider_id", "value": "lsp.com" }
              ]
            },
            {
              "code": "reverseqc_output",
              "list": [
                { "code": "P001", "value": "Atta" },
                { "code": "P003", "value": "1" },
                { "code": "Q001", "value": "yes" }
              ]
            }
          ]
        }
      ],
      "updated_by": "system"
    }
  }
}
```

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5"
  },
  "message": {
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "R1",
          "type": "Return",
          "provider_id": "lsp.com",
          "state": {
            "descriptor": {
              "code": "Return_Picked"
            }
          },
          "start": {
            "time": {
              "timestamp": "2025-01-06T09:30:00.000Z"
            }
          },
          "end": {
            "time": {
              "range": {
                "start": "2025-01-07T10:30:00.000Z",
                "end": "2025-01-07T11:00:00.000Z"
              },
              "timestamp": "2025-01-07T11:00:00.000Z"
            }
          },
          "agent": {
            "name": "agent_name",
            "phone": "9886098860"
          },
          "tags": [
            {
              "code": "reverseqc_input",
              "list": [
                { "code": "P001", "value": "Atta" },
                { "code": "P003", "value": "1" },
                { "code": "Q001", "value": "" }
              ]
            },
            {
              "code": "reverseqc_output",
              "list": [
                { "code": "P001", "value": "Atta" },
                { "code": "P003", "value": "1" },
                { "code": "Q001", "value": "yes" }
              ]
            }
          ]
        }
      ],
      "updated_at": "2025-01-06T12:00:00.000Z",
      "updated_by": "system"
    }
  }
}
```

