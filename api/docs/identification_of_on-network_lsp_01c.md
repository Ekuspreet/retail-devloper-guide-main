# Identification of On-Network LSP - 01C

## Overview
The **fulfillment provider** for forward and reverse physical shipments can be identified using `fulfillment.provider_id`. The **Logistics Buyer Network Provider (LBNP)** is responsible for updating this value as follows:

### **Identification Rules**
- **On-network logistics:** `provider_id` should be set to the **subscriber ID of the LSP (Logistics Service Provider)**.
- **Off-network logistics:** `provider_id` should be set to the **subscriber ID of the SNP (Seller Network Provider)**.

### **Fulfillment Provider Updates**
The fulfillment provider's identification can be updated at the following stages:
- **During order confirmation** (`/on_confirm`)
- **During order status updates** (`/on_status`), when logistics are finalized.

---

**Payload changes**

### Fulfillment Provider Identification in `/on_confirm`
```json
{
  "context": {
    "action": "on_confirm",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "F1",
          "provider_id": "lsp.com"
        }
      ]
    }
  }
}
```