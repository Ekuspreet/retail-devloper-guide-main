# Order Price Adjustment Not Tied to Return or Cancel - 013

## Overview
Order price adjustment (post-confirmation), not tied to return or cancellation:
- Will be in the form of **price reduction** for one or more items in the order.
- Can be **unsolicited**, in the form of `"quote_update"` fulfillment, with `quote_trail` containing the breakdown of delta price changes, along with the updated quote.
- This fulfillment will also be **linked to the forward fulfillment(s)** of the items for which the delta price change has been applied.
- Can be **applied before the order reaches the terminal state** of `"Completed"` or `"Cancelled"`.

## Payload Changes

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    ..
  },
  "message": {
    "order": {
      "id": "O1",
      ..
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "F1",
          ..
        }
      ],
      ..
      "fulfillments": [
        {
          "id": "F1",
          "type": "Delivery",
          ..
          "tags": [
            {
              "code": "quote_update",
              "list": [
                {
                  "code": "id",
                  "value": "QU1"
                }
              ]
            }
          ]
        },
        {
          "id": "QU1",
          "type": "Update",
          "state": {
            "descriptor": {
              "code": "Updated"
            }
          },
          "tags": [
            {
              "code": "quote_trail",
              "list": [
                {
                  "code": "type",
                  "value": "item"
                },
                {
                  "code": "id",
                  "value": "I1"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "-10.00"
                }
              ]
            }
          ]
        }
      ],
      "quote": {
        "price": {
          ..
        },
        "breakup": [
          ..
        ],
        "ttl": "P1D"
      },
      ..
    }
  }
}
```