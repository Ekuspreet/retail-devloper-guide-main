# Update Sale Invoice - 00E

- **Sale Invoice Update**:  
  - Allows BNP to update the sale invoice in cases where BNP generates the invoice (e.g., in F&B ISN).  

---

**Payload changes**

### Update Sale Invoice in `/update`
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
          "tags": [
            {
              "code": "update_sale_invoice",
              "list": [
                { "code": "url", "value": "https://invoice_url" }
              ]
            }
          ]
        }
      ]
    }
  }
}
```