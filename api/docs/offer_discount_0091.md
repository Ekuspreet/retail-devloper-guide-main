# Offer (Discount) - 0091

## **Publish Offer**
- SNP publishes the discount offer in a full or incremental catalog refresh.
- Offers are defined by location, category, and item applicability.

### **Payload: Publish Offer**
```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "catalog": {
      "bpp/providers": [
        {
          "id": "P1",
          "items": [
            { "id": "I1", "...": "" },
            { "id": "I2", "...": "" },
            { "id": "I3", "...": "" }
          ],
          "offers": [
            {
              "id": "discp60",
              "descriptor": {
                "code": "discount",
                "images": [ "https://snp.com/images/offer1-banner.webp" ]
              },
              "location_ids": [ "L1" ],
              "item_ids": [ "I1" ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [{ "code": "min_value", "value": "159.00" }]
                },
                {
                  "code": "benefit",
                  "list": [
                    { "code": "value_type", "value": "percent" },
                    { "code": "value", "value": "-60.00" },
                    { "code": "value_cap", "value": "-120.00" }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    { "code": "additive", "value": "yes" },
                    { "code": "auto", "value": "no" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```

---

## **Apply Offer**
- Applied during buyer checkout and reflected in order quote.
- Includes auto-applied and opt-in offers.

### **Payload: Apply Offer**
```json
{
  "context": {
    "action": "select",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "offers": [{ "id": "discp60" }],
      "...": ""
    }
  }
}
```

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "quote": {
        "breakup": [
          {
            "@ondc/org/item_id": "flat150",
            "title": "Flat ₹150 off on ₹499 minimum cart value",
            "@ondc/org/title_type": "offer",
            "price": { "currency": "INR", "value": "-150.00" }
          },
          {
            "@ondc/org/item_id": "discp60",
            "title": "₹120 off on minimum cart value of ₹159",
            "@ondc/org/title_type": "offer",
            "price": { "currency": "INR", "value": "-120.00" }
          }
        ]
      }
    }
  }
}
```

---

## **Reverse Offer**
- If an offer qualifier is no longer valid, SNP may reverse the discount.
- The reversal value is capped at the original discount amount provided.

### **Payload: Reverse Offer**
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
      "fulfillments": [
        { "id": "F1", "...": "" },
        {
          "id": "C1",
          "tags": [
            {
              "code": "quote_trail",
              "list": [
                { "code": "type", "value": "offer" },
                { "code": "id", "value": "discp60" },
                { "code": "currency", "value": "INR" },
                { "code": "value", "value": "60.00" }
              ]
            }
          ]
        }
      ],
      "quote": {
        "breakup": [
          {
            "@ondc/org/item_id": "discp60",
            "title": "rolling back ₹60 from offered discount",
            "@ondc/org/title_type": "offer",
            "price": { "currency": "INR", "value": "-60.00" }
          }
        ]
      }
    }
  }
}
```
