# Breakup of Fulfillment-Level Taxes in Quote - 015

- **Fulfillment-Level Tax Application**:  
  - Taxes can be applied to the following `title_type` categories:  
    - **"delivery"**  
    - **"packaging"**  
    - **"misc"**  
  - Reversal of taxes must be updated in the `quote_trail` using the corresponding **subtype** value.  
  - To differentiate between various fulfillment-level taxes, a **quote subtype** is added.  

---

**Payload changes**

### Apply Fulfillment-Level Taxes in `/on_select`
```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "quote": {
        "price": { "...": "" },
        "breakup": [
          {
            "@ondc/org/item_id": "F1",
            "title": "Tax",
            "@ondc/org/title_type": "tax",
            "price": { "...": "" },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    { "code": "type", "value": "fulfillment" },
                    { "code": "subtype", "value": "delivery" }
                  ]
                }
              ]
            }
          }
        ],
        "ttl": "P1D"
      }
    }
  }
}
```