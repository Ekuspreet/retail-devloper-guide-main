# Cancel Return Request - 00D

- **Cancel Return Request**:  
  - Allows the buyer or BNP to cancel a pending return request.  
  - Cancellation is only possible for return states:  
    - **Return_Initiated**  
    - **Return_Approved**  
  - If the return has already been processed (i.e., **Return_Picked** or **Liquidated**), it cannot be canceled.  

---

**Payload changes**

### Cancel Request in `/cancel`
```json
{
  "context": {
    "action": "cancel",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "cancellation_reason_id": "001",
      "descriptor": {
        "name": "fulfillment",
        "short_desc": "R1"
      }
    }
  }
}
```

---

### Response to Cancel Request in `/on_cancel`
```json
{
  "context": {
    "action": "on_cancel",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "state": "Completed",
      "fulfillments": [
        {
          "id": "F1",
          "...": ""
        },
        {
          "id": "R1",
          "type": "Return",
          "state": {
            "descriptor": {
              "code": "Cancelled"
            }
          },
          "tags": [
            {
              "code": "cancel_request",
              "list": [
                { "code": "id", "value": "CR1" },
                { "code": "reason_id", "value": "001" },
                { "code": "initiated_by", "value": "bnp.com" }
              ]
            },
            {
              "code": "precancel_state",
              "list": [
                { "code": "fulfillment_state", "value": "Return_Initiated" },
                { "code": "updated_at", "value": "2025-01-08T06:15:00.000Z" }
              ]
            }
          ]
        },
        {
          "id": "CR1",
          "type": "Cancel",
          "state": {
            "descriptor": {
              "code": "Cancelled"
            }
          }
        }
      ]
    }
  }
}
```