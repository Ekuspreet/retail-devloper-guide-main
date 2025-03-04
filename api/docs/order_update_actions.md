## Update Sale Invoice - 00E

Update sale invoice for cases where BNP generates an invoice (e.g., in case of F&B ISN).

### Payload Changes
```json
{  
  "context": {
    "action": "update",
    "core_version": "1.2.5",
    ..
  },
  "message": {
    "update_target": "fulfillment",
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "F1",
          ..
          "tags": [
            {
              "code": "update_sale_invoice",
              "list": [
                {
                  "code": "url",
                  "value": "https://invoice_url"
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

## Update Delivery Address - 00F

Delivery address, contact person, and phone number can be updated. Updated delivery address details will become a part of the order & will be available in all post-order API callbacks, i.e., `/on_status`, `/on_update`, `/on_cancel`.

```json
{
  "context": {
    "action": "update",
    "core_version": "1.2.5",
    ..
  },
  "message": {
    "update_target": "fulfillment",
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "F1",
          "end": {
            "location": {
              "gps": "12.4535,77.9283",
              "address": {
                "name": "my house or door or floor #",
                "building": "my building name or house #",
                "locality": "my street name",
                "city": "Bengaluru",
                "state": "Karnataka",
                "country": "IND",
                "area_code": "560037"
              }
            },
            "person": {
              "name": "Buyer 1"
            },
            "contact": {
              "phone": "9886098860"
            }
          }
        }
      ]
    }
  }
}
```

---

## Update Delivery Auth - 010

### Delivery Verification Modes
- **Static OTP** - Static for the order, without any time validity.
- **Dynamic OTP** - With time validity.

### Proposed Flow for Verification
Only applies if SNP is LBNP:
1. **LBNP creates verification code for delivery:**
   - LBNP sends OTP to BNP (`/on_confirm`) & to LSP (`/confirm`).
   - LSP should not forward OTP to the rider as this will be provided by the end buyer for verification at delivery.

2. **Delivery Verification:**
   - Buyer provides delivery OTP at the time of order delivery.
   - Rider updates fulfillment state to "Order-delivered" with delivery OTP in `/on_status`, for verification by LSP.

**Verification flow for logistics is detailed below:**

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
      "state": "Completed",
      ..
      "fulfillments": [
        {
          "id": "F1",
          ..
          "end": {
            "instructions": {
              "code": "5",
              "short_desc": "5432",
              ..
            },
            ..
            "authorization": {
              "type": "OTP",
              "token": "OTP code",
              "valid_from": "2025-01-10T18:00:00.000Z",
              "valid_to": "2025-01-10T22:00:00.000Z"
            }
          },
          ..
        }
      ],
      ..
    }
  }
}
```

