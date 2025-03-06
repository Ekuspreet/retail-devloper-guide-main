# Replacement Flow - 00B

## Replacement Flow 
1. **SNP Defines Replacement Terms**: SNP specifies replacement terms in their catalog, including:
   - Whether replacement is allowed.
   - The replacement window (timeframe within which replacements are accepted).
2. **Buyer Decision**: The buyer decides to request a return or replacement for specific item(s).
3. **BNP Sends Replacement Request**: BNP submits a replacement request to SNP.
4. **SNP Initiates Return Fulfillment**: SNP arranges for the pickup of the item(s) from the buyer.
5. **SNP Initiates Forward Fulfillment**: Upon successful return pickup, SNP initiates the forward fulfillment process to deliver the replacement item(s) to the buyer.

**Payload changes**

### Catalog with Replacement Terms in `/on_search`
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
          "...": "",
          "items": [
            {
              "id": "I1",
              "replacement_terms": [
                {
                  "replace_within": {
                    "duration": "P7D"
                  }
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

### Add "replace" in Return Request in `/update`
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
                { "code": "replace", "value": "yes" }
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

### Create Replacement Fulfillment After Return Pickup in `/on_update`
```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "...": "",
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "R1",
          "...": ""
        }
      ],
      "fulfillments": [
        {
          "id": "F1",
          "type": "Delivery",
          "state": {
            "descriptor": { "code": "Order-delivered" }
          }
        },
        {
          "id": "R1",
          "type": "Return",
          "state": {
            "descriptor": { "code": "Return_Picked" }
          },
          "tags": [
            {
              "code": "return_request",
              "list": [
                { "code": "id", "value": "R1" },
                { "code": "replace", "value": "yes" }
              ]
            },
            {
              "code": "replace_request",
              "list": [
                { "code": "id", "value": "FR1" }
              ]
            }
          ]
        },
        {
          "id": "FR1",
          "type": "Delivery",
          "...": ""
        }
      ]
    }
  }
}
```