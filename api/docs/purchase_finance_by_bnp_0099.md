# Purchase Finance by BNP - 0099

## Proposed Flow for On-Network Purchase Finance by BNP
This section outlines the proposed flow for on-network purchase finance by BNP, acting as the loan buyer app.

- **Consent for Financing**: SNP provides consent for financing specific items by tagging them in the offer’s applicability criteria.
- **Subvention Details**:
  - SNP specifies the maximum subvention percentage (pegged to the product price) they are willing to pay to the lender.
  - The loan buyer app notifies SNP of the subvention cost as a percentage of the item cost (excluding taxes).
- **Financing Options**: The loan buyer app provides financing options to the buyer before the confirmation of the retail order.
- **Account Details**: SNP sends account details and PAN number, which are forwarded to the loan provider for completing the loan transaction.
- **Loan Transaction Completion**: After the loan transaction is completed, BNP sends the following information to SNP:
  - **Loan Completed**: "yes" or "no"
  - If "yes", additional details:
    - Down payment
    - Loan amount
    - Loan provider
    - UTR number (for confirmation of remittance to the seller’s bank account)
    - Timestamp
- **Retail Order Recording**: The retail order records the buyer as having collected the full payment. For example, if the retail order value is ₹10,000 with a ₹1,000 down payment and ₹9,000 loan amount, the retail order will record the value as ₹10,000.
- **Reverse Transactions**: For cancellations, the retail buyer app informs the loan provider and seller, and the loan provider or retail buyer app credits the down payment back to the buyer.
- **Item Verification**: Item verification attributes (e.g., IMEI number) may be provided in the `/on_status` callback, at or after the fulfillment state of "Order-picked-up," for the forward shipment.

## Payload Changes

### Publish Offer (on_search)
SNP publishes the financing offer in the catalog.

```json
{
  "context": {
    "..": "..",
    "action": "on_search",
    "core_version": "1.2.5"
  },
  "message": {
    "catalog": {
      "bpp/descriptor": {
        "..": "..",
        "tags": [
          {
            "code": "bpp_terms",
            "list": [
              "..": "..",
              {
                "code": "collect_payment",
                "value": "N"
              }
            ]
          }
        ]
      },
      "bpp/providers": [
        {
          "id": "P1",
          "..": "..",
          "items": [
            {
              "id": "I1",
              "..": ".."
            }
          ],
          "..": "..",
          "offers": [
            {
              "id": "FIN1",
              "descriptor": {
                "code": "financing",
                "..": ".."
              },
              "..": "..",
              "item_ids": ["I1"],
              "..": "..",
              "tags": [
                "..": "..",
                {
                  "code": "finance_terms",
                  "list": [
                    {
                      "code": "subvention_type",
                      "value": "percent"
                    },
                    {
                      "code": "subvention_amount",
                      "value": "10.00"
                    }
                  ]
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

### Initialize Order (init)
The buyer app initiates the order with financing terms.

```json
{
  "context": {
    "..": "..",
    "action": "init",
    "core_version": "1.2.5"
  },
  "message": {
    "order": {
      "provider": {
        "id": "P1",
        "..": ".."
      },
      "items": [
        {
          "id": "I1",
          "..": ".."
        }
      ],
      "..": "..",
      "tags": [
        {
          "code": "bap_terms",
          "list": [
            {
              "code": "finance_cost_type",
              "value": "percent"
            },
            {
              "code": "finance_cost_value",
              "value": "5.00"
            }
          ]
        }
      ]
    }
  }
}
```

### Order Initialization Response (on_init)
The seller responds with financing details, including account information.

```json
{
  "context": {
    "..": "..",
    "action": "on_init",
    "core_version": "1.2.5"
  },
  "message": {
    "order": {
      "provider": {
        "id": "P1",
        "..": ".."
      },
      "items": [
        {
          "id": "I1",
          "..": ".."
        }
      ],
      "..": "..",
      "quote": {
        "price": {
          "currency": "INR",
          "value": ".."
        },
        "breakup": [
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "item",
            "..": ".."
          },
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "offer",
            "..": "..",
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "item"
                    }
                  ]
                },
                {
                  "code": "finance_terms",
                  "list": [
                    {
                      "code": "subvention_type",
                      "value": "percent"
                    },
                    {
                      "code": "subvention_amount",
                      "value": "10.0"
                    },
                    {
                      "code": "provider_tax_number",
                      "value": "PAN_number"
                    },
                    {
                      "code": "bank_account_no",
                      "value": "bank_account_number"
                    },
                    {
                      "code": "ifsc_code",
                      "value": "ifsc_code"
                    }
                  ]
                }
              ]
            }
          },
          "..": ".."
        ],
        "ttl": "PT1H"
      },
      "tags": [
        {
          "code": "bap_terms",
          "list": [
            {
              "code": "finance_cost_type",
              "value": "percent"
            },
            {
              "code": "finance_cost_value",
              "value": "5.00"
            }
          ]
        }
      ]
    }
  }
}
```

### Order Confirmation (confirm)
The loan buyer app confirms the order with loan transaction details.

```json
{
  "context": {
    "..": "..",
    "action": "confirm",
    "core_version": "1.2.5"
  },
  "message": {
    "order": {
      "provider": {
        "id": "P1",
        "..": ".."
      },
      "items": [
        {
          "id": "I1",
          "..": ".."
        }
      ],
      "..": "..",
      "quote": {
        "price": {
          "currency": "INR",
          "value": ".."
        },
        "breakup": [
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "item",
            "..": ".."
          },
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "offer",
            "..": "..",
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "item"
                    }
                  ]
                },
                {
                  "code": "finance_terms",
                  "list": [
                    {
                      "code": "subvention_type",
                      "value": "percent"
                    },
                    {
                      "code": "subvention_amount",
                      "value": "10.00"
                    },
                    {
                      "code": "provider_tax_number",
                      "value": "PAN_number"
                    },
                    {
                      "code": "bank_account_no",
                      "value": "bank_account_number"
                    },
                    {
                      "code": "ifsc_code",
                      "value": "ifsc_code"
                    }
                  ]
                },
                {
                  "code": "finance_txn",
                  "list": [
                    {
                      "code": "loan_completed",
                      "value": "yes"
                    },
                    {
                      "code": "down_payment",
                      "value": "1000.00"
                    },
                    {
                      "code": "loan_amount",
                      "value": "9000.00"
                    },
                    {
                      "code": "loan_provider",
                      "value": "PAN_number"
                    },
                    {
                      "code": "transaction_id",
                      "value": "T3937"
                    },
                    {
                      "code": "timestamp",
                      "value": "2025-01-08T03:00:00.000Z"
                    }
                  ]
                }
              ]
            }
          },
          "..": ".."
        ],
        "ttl": "PT1H"
      },
      "tags": [
        {
          "code": "bap_terms",
          "list": [
            {
              "code": "finance_cost_type",
              "value": "percent"
            },
            {
              "code": "finance_cost_value",
              "value": "5.00"
            }
          ]
        }
      ]
    }
  }
}
```

### Order Status Update (on_status)
The order status includes item verification attributes (e.g., IMEI numbers) after fulfillment.

```json
{
  "context": {
    "action": "on_status",
    "core_version": "1.2.5",
    "..": ".."
  },
  "message": {
    "order": {
      "id": "O1",
      "..": "..",
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "F1",
          "quantity": {
            "count": 1
          },
          "tags": [
            "..": "..",
            {
              "code": "verify",
              "list": [
                {
                  "code": "type",
                  "value": "IMEI"
                },
                {
                  "code": "value",
                  "value": "123456789012345"
                }
              ]
            },
            {
              "code": "verify",
              "list": [
                {
                  "code": "type",
                  "value": "IMEI"
                },
                {
                  "code": "value",
                  "value": "543210987654321"
                }
              ]
            }
          ]
        },
        "..": ".."
      ],
      "..": "..",
      "fulfillments": [
        {
          "id": "F1",
          "..": "..",
          "state": {
            "descriptor": {
              "code": "Order-delivered"
            }
          },
          "..": ".."
        }
      ],
      "..": ".."
    }
  }
}
```