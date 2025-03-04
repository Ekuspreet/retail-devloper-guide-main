# Weight Differential Charges

## Overview
LSP sends an updated quote, weight, and dimensions due to weight differential to LBNP (BNP).  
BNP forwards weight and dimension differentials, including receivables due from SNP.

## Resolution of Weight Differential Charges

### If SNP Disputes:
- SNP may use **error code 41002** to indicate non-acceptance.
- LBNP may communicate to LSP that weight differential charges are rejected.
- LSP handles order delivery as per agreed terms.
- Resolution of the dispute will follow the **IGM route**.

### If SNP Accepts:
- The differential cost will **not be included** in the order quote.
- Separate attribute keys will be provided for this (as these are receivables due from SNP to BNP).

## Payload Changes

### Payload Example 1: `update`
```json
{
  "context": {
    "action": "update",
    "core_version": "1.2.5"
  },
  "message": {
    "update_target": "fulfillment",
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "F3",
          "tags": [
            {
              "code": "linked_order_diff",
              "list": [
                { "code": "id", "value": "RO1" },
                { "code": "weight_unit", "value": "kilogram" },
                { "code": "weight_value", "value": "3.0" },
                { "code": "dim_unit", "value": "centimeter" },
                { "code": "length", "value": "1.0" },
                { "code": "breadth", "value": "1.0" },
                { "code": "height", "value": "1.0" }
              ]
            },
            {
              "code": "linked_order_diff_proof",
              "list": [
                { "code": "type", "value": "image" },
                { "code": "url", "value": "https://lsp.com/sorter/images1.png" }
              ]
            },
            {
              "code": "bnp_receivables_claim",
              "list": [
                { "code": "type", "value": "delivery" },
                { "code": "currency", "value": "INR" },
                { "code": "value", "value": "50.00" }
              ]
            }
          ]
        }
      ]
    }
  }
}
```

### Payload Example 2: `on_update`
```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5"
  },
  "message": {
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "F3",
          "provider_id": "lsp.com",
          "type": "Buyer-Delivery",
          "tags": [
            {
              "code": "linked_order_diff",
              "list": [
                { "code": "id", "value": "RO1" },
                { "code": "weight_unit", "value": "kilogram" },
                { "code": "weight_value", "value": "3.0" },
                { "code": "dim_unit", "value": "centimeter" },
                { "code": "length", "value": "1.0" },
                { "code": "breadth", "value": "1.0" },
                { "code": "height", "value": "1.0" }
              ]
            },
            {
              "code": "linked_order_diff_proof",
              "list": [
                { "code": "id", "value": "RO1" },
                { "code": "type", "value": "image" },
                { "code": "url", "value": "https://lsp.com/sorter/images1.png" }
              ]
            },
            {
              "code": "bnp_receivables_claim",
              "list": [
                { "code": "type", "value": "delivery" },
                { "code": "currency", "value": "INR" },
                { "code": "value", "value": "50.00" }
              ]
            }
          ]
        }
      ],
      "updated_at": "2025-01-06T10:00:30.000Z"
    }
  }
}
```