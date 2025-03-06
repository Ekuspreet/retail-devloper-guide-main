# Cash on Delivery (COD) Order - 012

Since payment for COD order is on fulfillment, the NP providing fulfillment will also be the payment collector;

## COD Order Requirements:
- All items in the cart must be available on COD;
- When multiple modes of payment are available on the payment UX (e.g. prepaid, COD), the buyer gets to choose the payment mode for the order;
- Once the payment mode is finalized, it is communicated over the protocol;

## Multi-Fulfillment Order Considerations:
- The payment initiator, providing the UX, may decide whether to allow COD orders;
- If COD order is allowed:
  - For multi-fulfillment orders, the retail NP handling fulfillment may decide when to collect payment for the order;
  - After payment collection for the full order, the retail NP handling fulfillment updates the payment status for the order;
  - Settlement will be initiated by the payment collector;

On-network logistics COD order is documented here:  
[here](https://docs.google.com/document/d/1vz1Iawvy4ucUAX1xo-BCNsvm-BZSJFeN80vgwjNI-kc/edit?tab=t.davkn1bve0ym#heading=h.5ajekk3d6dig)

---

**Payload changes**

### Catalog with COD Availability in `/on_search`
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
          "...": "",
          "items": [
            {
              "id": "I1",
              "@ondc/org/available_on_cod": true
            }
          ]
        }
      ]
    }
  }
}
```

---

### Payment Initiation in `/init`
```json
{
  "context": {
    "action": "init",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "payment": {
        "type": "ON-FULFILLMENT",
        "collected_by": "BPP"
      }
    }
  }
}
```

---

### Payment Status Update in `/on_init`
```json
{
  "context": {
    "action": "on_init",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "payment": {
        "type": "ON-FULFILLMENT",
        "collected_by": "BAP",
        "@ondc/org/settlement_details": [
          {
            "...": ""
          }
        ]
      }
    }
  }
}
```

---

### Payment Status Confirmation in `/confirm`
```json
{
  "context": {
    "action": "confirm",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "payment": {
        "status": "NOT-PAID"
      }
    }
  }
}
```

---

### COD Payment Status in `/on_status`
```json
{
  "context": {
    "action": "on_status",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "payment": {
        "status": "PAID",
        "type": "ON-FULFILLMENT",
        "collected_by": "BPP",
        "time": {
          "timestamp": "2025-01-07T10:00:00.000Z"
        }
      },
      "updated_at": "2025-01-07T10:00:30.000Z"
    }
  }
}
```