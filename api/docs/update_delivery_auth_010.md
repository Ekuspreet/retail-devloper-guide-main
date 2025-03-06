# Update Delivery Auth - 010

## Delivery Verification Modes

1. **Static OTP**:
   - OTP remains the same for the order.
   - No time validity constraint.
   
2. **Dynamic OTP**:
   - OTP has a specific time validity.

## Proposed Flow for Verification

### Applicability
- This verification process applies **only if SNP is LBNP**.

### OTP Generation and Communication
1. **LBNP creates a verification code** for delivery.
2. **LBNP sends OTP**:
   - To **BNP** via `/on_confirm`.
   - To **LSP** via `/confirm`.
3. **LSP Restriction**:
   - LSP **must not** forward the OTP to the delivery rider.
   - The OTP is to be provided by the **end buyer** at delivery for verification.

### Delivery Verification Process
1. **Buyer provides OTP** at the time of delivery.
2. **Rider updates fulfillment state**:
   - Changes state to **"Order-delivered"**.
   - Includes delivery OTP in `/on_status` for verification by **LSP**.

### Reference
For detailed logistics verification flow, refer to:
[here](https://docs.google.com/document/d/1vz1Iawvy4ucUAX1xo-BCNsvm-BZSJFeN80vgwjNI-kc/edit?tab=t.davkn1bve0ym)


**Payload changes**

### Delivery Verification Update in `/on_update`
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
      "state": "Completed",
      "fulfillments": [
        {
          "id": "F1",
          "end": {
            "instructions": {
              "code": "5",
              "short_desc": "5432",
              "...": ""
            },
            "authorization": {
              "type": "OTP",
              "token": "OTP code",
              "valid_from": "2025-01-10T18:00:00.000Z",
              "valid_to": "2025-01-10T22:00:00.000Z"
            }
          }
        }
      ]
    }
  }
}
```