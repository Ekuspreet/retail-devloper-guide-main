# Buyer Instructions - 011

- **Update Delivery Instructions**:  
  - `fulfillment.end.instructions` allows buyers to provide additional delivery details.  
  - **Fields**:  
    - **`long_desc`**: Used for specific instructions (e.g., *"leave package outside door"*).  
    - **`additional_desc`**: Can contain extra visual or textual information.  
  - These instructions can be included in `/confirm` and updated later in `/update`.  

---

**Payload changes**

### Update Buyer Instructions in `/update`
```json
{
  "context": {
    "action": "update",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "update_target": "fulfillment",
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "F1",
          "end": {
            "instructions": {
              "long_desc": "additional instructions for delivery e.g. leave package outside door",
              "additional_desc": {
                "content_type": "text/html",
                "url": "url for additional info"
              }
            }
          }
        }
      ]
    }
  }
}
```