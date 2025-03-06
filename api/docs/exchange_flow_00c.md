# Exchange Flow - 00C

- **Deferred Exchange Flow**:  
  - Available exchange offers are published by the provider as part of their catalog.  
  - Buyers can view these offers during product listing discovery.  
  - Buyers initiate an exchange request after receiving the item.  

- **Exchange Process**:  
  - The exchange flow follows the standard return process with modifications to the `/update` exchange request.  
  - Future updates will include instant exchange flow.  

---

**Payload changes**

### Exchange Request in `/update`
```json
{
  "context": {
    "action": "update",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "update_target": "item",
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "type": "Return",
          "tags": [
            {
              "code": "return_request",
              "list": [
                { "code": "id", "value": "R1" },
                { "code": "item_id", "value": "I1" },
                { "code": "parent_item_id", "value": "DI1" },
                { "code": "item_quantity", "value": "" },
                { "code": "reason_id", "value": "" },
                { "code": "reason_desc", "value": "" },
                { "code": "images", "value": "url_for_image1,url_for_image2" },
                { "code": "ttl_approval", "value": "PT24H" },
                { "code": "ttl_reverseqc", "value": "P3D" },
                { "code": "exchange", "value": "yes" },
                { "code": "brand", "value": "Xiaomi" },
                { "code": "model", "value": "2201116TI" },
                { "code": "ram_unit", "value": "GB" },
                { "code": "ram", "value": "12" },
                { "code": "storage_unit", "value": "GB" },
                { "code": "storage", "value": "128" },
                { "code": "condition_id", "value": "001" },
                { "code": "condition_desc", "value": "minor screen scratches" }
              ]
            }
          ]
        }
      ]
    }
  }
}
```