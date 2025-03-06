# Cross-Linking Make-to-Order Item in `quote_trail` - 018

- **Cross-Linking Make-to-Order Items**:  
  - `parent_item_id` (used to define dynamic item ID by BNP) is added to `quote_trail`.  
  - Enables easier linkage between **base items**, **customizations**, and the corresponding **make-to-order item**.  

---

**Payload changes**

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "C1",
          "quantity": { "count": 1 },
          "parent_item_id": "DI1",
          "tags": [
            {
              "code": "type",
              "list": [
                { "code": "type", "value": "item" }
              ]
            }
          ]
        }
      ],
      "fulfillments": [
        { "id": "F1", "...": "" },
        {
          "id": "C1",
          "tags": [
            {
              "code": "quote_trail",
              "list": [
                { "code": "type", "value": "item" },
                { "code": "subtype", "value": "item" },
                { "code": "id", "value": "I1" },
                { "code": "parent_item_id", "value": "DI1" },
                { "code": "currency", "value": "INR" },
                { "code": "value", "value": "-269.00" }
              ]
            }
          ]
        }
      ]
    }
  }
}
```