# SNP collecting payment - 007

- SNP that wants to collect payment should set `"bpp_terms"."collect_payment"` to "Y" in /on_search (full catalog refresh);
- BNP that wants to place an order with this SNP will need to render the payment link sent by SNP:
  - SNP sends the following additional attributes in /on_init for rendering the payment link:
    - `payment.type="ON-ORDER"` (prepaid);
    - `payment.collected_by="BPP"`;
    - `payment.uri="secure_public_pg_link"`;
    - `payment.status="NOT-PAID"`;
  - BNP will need to render this payment link for the buyer after receiving the /on_init response;
- SNP updates payment collection details using an unsolicited /on_init:
  - **Scenario 1 - Collection successful, payment status updated**:
    - `payment.params`: currency, amount (order value), transaction_id (UTR);
    - `payment.status="PAID"`;
    - `payment.tags.bpp_collect.success="Y"`;
    - In this case, BNP should proceed with /confirm;
  - **Scenario 2 - Collection successful, payment status not updated**:
    - `payment.params`: currency, amount (order value), transaction_id (if available);
    - `payment.status="NOT-PAID"`;
    - `payment.tags.bpp_collect.success="Y"`;
    - In this case, BNP may terminate the transaction or proceed with /confirm. If BNP proceeds with /confirm, SNP should honor /confirm as per the contract, and it will be the SNP’s responsibility to subsequently update `payment.status` when available;
  - **Scenario 3 - Collection error**:
    - `payment.params`: currency, amount (order value);
    - `payment.status="NOT-PAID"`;
    - `payment.tags.bpp_collect.success="N"`;
    - `payment.tags.bpp_collect.error="error_message"`;
    - In this case, BNP should terminate the transaction;
- If BNP doesn’t receive payment collection details (as per Scenario 3 above) within its TAT:
  - BNP should terminate the transaction, and if the payment collection details are subsequently received, it should NACK /on_init with error code 20009;
  - BNP may also send another /init request for the latest payment collection details and follow the steps above if the /on_init callback doesn’t have the required payment collection details;

**Payload changes**

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "catalog": {
      "bpp/descriptor": {
        "..": "",
        "tags": [
          {
            "code": "bpp_terms",
            "list": [
              {
                "code": "collect_payment",
                "value": "Y"
              }
            ]
          }
        ]
      },
      "..": ""
    }
  }
}
```

```json
{
  "context": {
    "action": "on_init",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "..": "",
      "payment": {
        "type": "ON-ORDER",
        "collected_by": "BPP",
        "uri": "https://snp.com/pg",
        "status": "NOT-PAID",
        "params": {
          "currency": "INR",
          "transaction_id": "3937",
          "amount": ".."
        },
        "@ondc/org/settlement_basis": "delivery",
        "@ondc/org/settlement_window": "P1D",
        "tags": [
          {
            "code": "bpp_collect",
            "list": [
              {
                "code": "success",
                "value": "Y"
              },
              {
                "code": "error",
                "value": ".."
              }
            ]
          }
        ],
        "..": ""
      }
    }
  }
}
```