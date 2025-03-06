# Offer (slab) - 0094

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
              "id": "slab1",
              "descriptor": {
                "code": "slab",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
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
                    { "code": "item_count", "value": "6" },
                    { "code": "item_count_upper", "value": "9" }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    { "code": "value_type", "value": "percent" },
                    { "code": "value", "value": "-10.00" },
                    { "code": "value_cap", "value": "-100.00" }
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
            },
            {
              "id": "slab2",
              "descriptor": {
                "code": "slab",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": ["L1"],
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
                    { "code": "item_count", "value": "10" },
                    { "code": "item_count_upper", "value": "" }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    { "code": "value_type", "value": "percent" },
                    { "code": "value", "value": "-20.00" },
                    { "code": "value_cap", "value": "-200.00" }
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
Any offer that results in a change in the order value and/or quantity of items will be applied to the order quote and included in all order-level callbacks (`/on_init`, `/on_confirm`, `/on_status`, `/on_cancel`, `/on_update`).

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
        "..": "..",
        "breakup": [
          { "..": ".." },
          {
            "@ondc/org/item_id": "slab2",
            "title": "discount of ₹200",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-200.00"
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
                    { "code": "type", "value": "slab" },
                    { "code": "additive", "value": "no" },
                    { "code": "auto", "value": "yes" }
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
Since the "slab" offer resulted in reducing the order value, reversing the offer means adding back the slab discount value. The aggregate amount added back should not exceed the corresponding slab discount. For example, the "slab2" offer above reduced the order value by ₹200, so reversal can add back a maximum of ₹200 to the order value.

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
                { "code": "id", "value": "slab2" },
                { "code": "currency", "value": "INR" },
                { "code": "value", "value": "150.00" }
              ]
            },
            "..": ".."
          ]
        }
      ],
      "quote": {
        "..": "..",
        "breakup": [
          { "..": ".." },
          {
            "@ondc/org/item_id": "slab2",
            "title": "rolling back ₹60 from offered discount",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-50.00"
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
                    { "code": "type", "value": "slab" },
                    { "code": "additive", "value": "no" },
                    { "code": "auto", "value": "yes" }
                  ]
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```