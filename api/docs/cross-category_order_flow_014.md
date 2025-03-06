# Cross-Category Order Flow - 014

- **Single-Cart Cross-Category Orders**:  
  - A provider's unique identifier (`bpp/providers[].id`) remains the same across multiple **RET domains**.  
  - SNP assigns the same provider and item identifiers across domains.  
  - BNP allows cart creation with multiple items from the **same provider** across different RET domains.  
  - Example: A **single cart** can include items from **Grocery (RET10), BPC (RET13), and H&W (RET18)**.  

- **Cross-RET Domain Handling**:  
  - Orders spanning multiple domains use `Context.domain="ONDC:FFFFF"` in all APIs **except** `/search` and `/on_search`.  
  - API signing uses NP private keys for any RET domain.  

- **BFF (Buyer Finder Fee) Calculation**:  
  - Different categories may have distinct BFF rates.  
  - The **minimum** BFF across categories is applied for delivery charges.  
  - **Example Calculation**:  
    - **I1 (Grocery)**: ₹100 × 3.54%  
    - **I2 (BPC)**: ₹200 × 5.90%  
    - **I3 (H&W)**: ₹500 × 5.90%  
    - **Delivery Fee**: ₹50 × 3.54%  
    - **Final BFF**: ₹46.61 (5.48% of order value)  

---

**Payload changes**

### Select Items for Cross-Category Order in `/select`
```json
{
  "context": {
    "action": "select",
    "domain": "ONDC:FFFFF",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "provider": { "id": "P1", "...": "" },
      "items": [
        { "id": "I1", "quantity": { "count": 1 } },
        { "id": "I2", "quantity": { "count": 1 } },
        { "id": "I3", "quantity": { "count": 2 } }
      ]
    }
  }
}
```

---

### Initialize Order with Cross-Category Items in `/on_init`
```json
{
  "context": {
    "domain": "ONDC:FFFFF",
    "action": "on_init",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "provider": {
        "id": "P1",
        "locations": [{ "id": "L1" }]
      },
      "items": [
        { "id": "I1", "fulfillment_id": "F1", "quantity": { "count": 1 } },
        { "id": "I2", "fulfillment_id": "F1", "quantity": { "count": 1 } },
        { "id": "I3", "fulfillment_id": "F1", "quantity": { "count": 2 } }
      ],
      "fulfillments": [{ "id": "F1", "...": "" }],
      "quote": {
        "price": { "currency": "INR", "value": "945.61" },
        "breakup": [
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/item_quantity": { "count": 1 },
            "title": "Atta",
            "@ondc/org/title_type": "item",
            "price": { "currency": "INR", "value": "100.00" }
          },
          {
            "@ondc/org/item_id": "I2",
            "@ondc/org/item_quantity": { "count": 1 },
            "title": "Moisturizer",
            "@ondc/org/title_type": "item",
            "price": { "currency": "INR", "value": "200.00" }
          },
          {
            "@ondc/org/item_id": "I3",
            "@ondc/org/item_quantity": { "count": 2 },
            "title": "Toothpaste",
            "@ondc/org/title_type": "item",
            "price": { "currency": "INR", "value": "500.00" }
          },
          {
            "@ondc/org/item_id": "F1",
            "title": "Delivery charges",
            "@ondc/org/title_type": "delivery",
            "price": { "currency": "INR", "value": "50.00" }
          },
          {
            "@ondc/org/item_id": "F1",
            "title": "Tax",
            "@ondc/org/title_type": "tax",
            "price": { "currency": "INR", "value": "9.00" },
            "item": {
              "tags": [
                { "code": "quote", "list": [{ "code": "type", "value": "fulfillment" }] }
              ]
            }
          },
          {
            "@ondc/org/item_id": "F1",
            "title": "Convenience fee",
            "@ondc/org/title_type": "misc",
            "price": { "currency": "INR", "value": "46.61" }
          }
        ],
        "ttl": "P1D"
      },
      "payment": {
        "@ondc/org/buyer_app_finder_fee_type": "percent",
        "@ondc/org/buyer_app_finder_fee_amount": "5.48"
      }
    }
  }
}
```