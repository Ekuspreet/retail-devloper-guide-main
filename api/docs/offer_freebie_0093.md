# Offer (freebie) - 0093

## Publish Offer
SNP publishes an offer, either in a full or incremental catalog refresh.

#### Offer Definition
```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    "..": ".."
  },
  "message": {
    "catalog": {
      "..": "..",
      "bpp/providers": [
        {
          "id": "P1",
          "..": "..",
          "items": [
            { "id": "I1", "..": ".." },
            { "id": "I2", "..": ".." },
            { "id": "I3", "..": ".." }
          ],
          "offers": [
            {
              "id": "freebie1",
              "descriptor": {
                "code": "freebie",
                "images": [
                  "https://snp.com/images/offer3-banner.png"
                ]
              },
              "location_ids": ["L1"],
              "category_ids": [".."],
              "item_ids": ["I1"],
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
                  "list": [
                    { "code": "min_value", "value": "598.00" }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    { "code": "item_count", "value": "1" },
                    { "code": "item_id", "value": "I4" }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    { "code": "additive", "value": "no" },
                    { "code": "auto", "value": "yes" }
                  ]
                }
              ]
            }
          ],
          "..": ".."
        }
      ]
    }
  }
}
```

## Apply Offer
Any offer that results in a change in the quantity of items will be applied to the order quote and included in all order-level callbacks (`/on_init`, `/on_confirm`, `/on_status`, `/on_cancel`, `/on_update`).

#### Offer Applied in Order Quote
```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    "..": ".."
  },
  "message": {
    "order": {
      "..": "..",
      "quote": {
        "price": {
          "..": ".."
        },
        "breakup": [
          { "..": ".." },
          {
            "@ondc/org/item_id": "freebie1",
            "@ondc/org/item_quantity": { "count": 1 },
            "title": "Free item of ₹200 on minimum cart value of ₹598",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "0.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    { "code": "type", "value": "order" }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    { "code": "type", "value": "freebie" },
                    { "code": "auto", "value": "yes" },
                    { "code": "additive", "value": "no" },
                    { "code": "item_id", "value": "I4" },
                    { "code": "item_count", "value": "1" }
                  ]
                }
              ]
            }
          }
        ],
        "..": ".."
      }
    }
  }
}
```

## Reverse Offer
Since the "freebie1" offer resulted in an additional quantity of an item, reversing the offer means reducing this item quantity. The aggregate reduction should not exceed the additional quantity of the freebie item offered.

#### Reverse Offer Example
```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    "..": ".."
  },
  "message": {
    "order": {
      "id": "O1",
      "..": "..",
      "fulfillments": [
        { "id": "F1", "..": ".." },
        {
          "id": "C1",
          "..": "..",
          "tags": [
            "..": "..",
            {
              "code": "quote_trail",
              "list": [
                { "code": "type", "value": "offer" },
                { "code": "id", "value": "freebie1" },
                { "code": "currency", "value": "INR" },
                { "code": "value", "value": "0.00" }
              ]
            },
            "..": ".."
          ]
        }
      ],
      "quote": {
        "..": "..",
        "breakup": [
          "..": "..",
          {
            "@ondc/org/item_id": "freebie1",
            "@ondc/org/item_quantity": { "count": 0 },
            "title": "reversing the offer by changing quantity to 0",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "0.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    { "code": "type", "value": "order" }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    { "code": "type", "value": "freebie" },
                    { "code": "auto", "value": "yes" },
                    { "code": "additive", "value": "no" },
                    { "code": "item_id", "value": "I4" },
                    { "code": "item_count", "value": "1" }
                  ]
                }
              ]
            }
          }
        ],
        "..": ".."
      },
      "..": ".."
    }
  }
}
```