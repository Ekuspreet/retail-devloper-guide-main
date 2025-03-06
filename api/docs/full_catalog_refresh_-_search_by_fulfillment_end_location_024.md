# Full Catalog Refresh (Search by Fulfillment End Location) - 024
**Payload changes**

```json
{
  "context": {
    "domain": "ONDC:RET10",
    "action": "search",
    "country": "IND",
    "city": "std:080",
    "core_version": "1.2.5",
    "bap_id": "bnp.com",
    "bap_uri": "https://bnp.com/ondc",
    "transaction_id": "T1",
    "message_id": "M1",
    "timestamp": "2025-01-08T08:00:00.000Z",
    "ttl": "PT30S"
  },
  "message": {
    "intent": {
      "fulfillment": {
        "type": "Delivery",
        "end": {
          "location": {
            "gps": "12.9740,77.6134",
            "address": {
              "area_code": "560001"
            }
          }
        }
      },
      "payment": {
        "@ondc/org/buyer_app_finder_fee_type": "percent",
        "@ondc/org/buyer_app_finder_fee_amount": "3.54"
      },
      "tags": [
        {
          "code": "bap_terms",
          "list": [
            { "code": "static_terms", "value": "" },
            { "code": "static_terms_new", "value": "https://github.com/ONDC-Official/NP-Static-Terms/buyerNP_BNP/1.0/tc.pdf" },
            { "code": "effective_date", "value": "2025-02-01T00:00:00.000Z" }
          ]
        }
      ]
    }
  }
}
```