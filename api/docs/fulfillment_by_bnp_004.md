# Fulfillment by BNP - 004

- Logistics fulfillment by BNP will be based on the [logistics API contract](https://docs.google.com/document/d/1vz1Iawvy4ucUAX1xo-BCNsvm-BZSJFeN80vgwjNI-kc/edit?tab=t.0);
- Since logistics is a separate domain, BNP needs to register as LBNP;
- Since SNP may support BNP fulfillment for all or specific items, they need to enable the fulfillment type "Buyer-Delivery" for items for which this is supported;

## Pre-order flow

- LBNP sends /search to the gateway, and the gateway broadcasts to LSPs:
  - Logistics /search requires start & end GPS coordinates, city code, weight/dimensions of the package being shipped, etc.;
  - LSP(s) send the logistics catalog directly to LBNP;
  - Logistics /search may be sequenced after receiving the response for retail /select;
- BNP may also maintain a local rate card for logistics, which includes rate and TAT for distance slabs;
- If SNP supports the "Buyer-Delivery" fulfillment type, /on_select should have, for the corresponding fulfillment:
  - Delivery charge of 0 for this fulfillment;
  - Quote with packaging charges/convenience fee, as applicable;
  - O2S TAT;
  - For fulfillment options from LSP, BNP will need to compute O2D as O2S + S2D (S2D will have 1st mile & last mile components, and there may be an overlap between O2S & the 1st mile component, especially for F&B);
  - Weight & dimensions of the package;
- SNP may also include their own fulfillment types (for delivery, self-pickup);
- BNP consolidates fulfillment options from LSP & SNP for the buyer;
- If the buyer selects a fulfillment corresponding to the "Buyer-Delivery" fulfillment type, the corresponding fulfillment ID should be mapped to the item and passed in /init to SNP:
  - In response, SNP will send the updated quote for the selected fulfillment, including packaging charges/convenience fee (as applicable) & O2S TAT;
  - SNP also updates whether RTO action should result in an actual return to origin;
- Order will be confirmed with SNP with the above fulfillment ID/quote/TAT, as sent by SNP in /on_init;
- Logistics order will be confirmed by LBNP with the fulfillment ID selected above;

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
      "..": "",
      "bpp/providers": [
        {
          "id": "P1",
          "..": "",
          "fulfillments": [
            "..",
            {
              "id": "F3",
              "type": "Buyer-Delivery",
              "contact": {
                "phone": "9886098860",
                "email": "abc@xyz.com"
              }
            }
          ],
          "..": ""
        }
      ]
    }
  }
}
```

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "..": "",
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "F3"
        }
      ],
      "fulfillments": [
        "..",
        {
          "id": "F3",
          "type": "Buyer-Delivery",
          "@ondc/org/provider_name": "",
          "tracking": false,
          "@ondc/org/category": "",
          "@ondc/org/TAT": "PT15M",
          "state": {
            "descriptor": {
              "code": "Serviceable"
            }
          },
          "tags": [
            {
              "code": "order_details",
              "list": [
                {
                  "code": "weight_unit",
                  "value": "kilogram"
                },
                {
                  "code": "weight_value",
                  "value": "3.0"
                },
                {
                  "code": "dim_unit",
                  "value": "centimeter"
                },
                {
                  "code": "length",
                  "value": "1.0"
                },
                {
                  "code": "breadth",
                  "value": "1.0"
                },
                {
                  "code": "height",
                  "value": "1.0"
                }
              ]
            }
          ]
        }
      ],
      "quote": {
        "price": {
          "..": ""
        },
        "breakup": [
          "..",
          {
            "@ondc/org/item_id": "F3",
            "title": "Delivery charges",
            "@ondc/org/title_type": "delivery",
            "price": {
              "currency": "INR",
              "value": "0.00"
            }
          },
          {
            "@ondc/org/item_id": "F3",
            "title": "Packing charges",
            "@ondc/org/title_type": "packing",
            "price": {
              "currency": "INR",
              "value": "25.00"
            }
          },
          {
            "@ondc/org/item_id": "F3",
            "title": "Convenience fee",
            "@ondc/org/title_type": "misc",
            "price": {
              "currency": "INR",
              "value": "0.00"
            }
          }
        ],
        "..": ""
      }
    }
  }
}
```

```json
{
  "context": {
    "action": "init",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "..": "",
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "F3"
        }
      ],
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
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "F3",
          "quantity": {
            "count": 2
          },
          "tags": [
            "..",
            {
              "code": "rto_action",
              "list": [
                {
                  "code": "return_to_origin",
                  "value": "yes"
                }
              ]
            }
          ]
        }
      ],
      "fulfillments": [
        {
          "id": "F3",
          "type": "Buyer-Delivery",
          "..": "",
          "tags": [
            {
              "code": "order_details",
              "list": [
                {
                  "code": "weight_unit",
                  "value": "kilogram"
                },
                {
                  "code": "weight_value",
                  "value": "3.0"
                },
                {
                  "code": "dim_unit",
                  "value": "centimeter"
                },
                {
                  "code": "length",
                  "value": "1.0"
                },
                {
                  "code": "breadth",
                  "value": "1.0"
                },
                {
                  "code": "height",
                  "value": "1.0"
                }
              ]
            },
            {
              "code": "rto_action",
              "list": [
                {
                  "code": "return_to_origin",
                  "value": "yes"
                }
              ]
            }
          ]
        }
      ],
      "quote": {
        "..": ""
      }
    }
  }
}
```

```json
{
  "context": {
    "action": "on_confirm",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "..": "",
      "items": [
        "..",
        {
          "id": "I1",
          "fulfillment_id": "F3",
          "quantity": {
            "count": 2
          },
          "tags": [
            "..",
            {
              "code": "rto_action",
              "list": [
                {
                  "code": "return_to_origin",
                  "value": "yes"
                }
              ]
            }
          ]
        }
      ],
      "fulfillments": [
        {
          "id": "F3",
          "type": "Buyer-Delivery",
          "@ondc/org/TAT": "PT15M",
          "..": "",
          "tags": [
            {
              "code": "order_details",
              "list": [
                {
                  "code": "id",
                  "value": "RO1"
                },
                {
                  "code": "weight_unit",
                  "value": "kilogram"
                },
                {
                  "code": "weight_value",
                  "value": "3.0"
                },
                {
                  "code": "dim_unit",
                  "value": "centimeter"
                },
                {
                  "code": "length",
                  "value": "1.0"
                },
                {
                  "code": "breadth",
                  "value": "1.0"
                },
                {
                  "code": "height",
                  "value": "1.0"
                }
              ]
            },
            {
              "code": "rto_action",
              "list": [
                {
                  "code": "return_to_origin",
                  "value": "yes"
                }
              ]
            }
          ]
        }
      ],
      "quote": {
        "..": ""
      }
    }
  }
}
```

## Post-order flow

### Status update

- SNP updates the retail order state to "Packed";
- SNP notifies "ready_to_ship" for the retail order:
  - "ready_to_ship" and "Packed" may be sent in any sequence:
    - At the same time;
    - "ready_to_ship" followed by "Packed";
    - "Packed" followed by "ready_to_ship";
- SNP may provide pickup instructions for the rider;
- On receiving "ready_to_ship" from SNP, LBNP notifies "ready_to_ship" to LSP, with pickup code & merchant order reference number:
  - In response, LSP updates the pickup slot & shipping label for hub-based delivery only;
  - BNP forwards the pickup slot & shipping label (for hub-based delivery) to SNP using /update;
- When an agent is assigned ("Agent-assigned"), LSP sends agent details to LBNP using /on_status:
  - BNP forwards this status to SNP using /update;
  - SNP will need to handle cases where fulfillment states are received out of sequence, e.g., "Agent-assigned" before "Packed";
- Update of fulfillment states from pickup to delivery:
  - After fulfillment is picked up, LSP updates the status of the logistics order to "Order-picked-up" with pickup time:
    - BNP requests an update of the retail order/fulfillment state & pickup time using /update;
  - After fulfillment is delivered, LSP updates the state of the logistics order to "Order-delivered":
    - BNP requests an update of the retail order/fulfillment state & delivery time using /update;
  - All interim states are to be updated in the same way;
  - After all fulfillments are marked "Order-delivered", SNP should update the order state to "Completed";

**Payload changes**

```json
{
  "context": {
    "action": "on_status",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "..": "",
      "fulfillments": [
        {
          "id": "F3",
          "type": "Buyer-Delivery",
          "..": "",
          "@ondc/org/TAT": "PT15M",
          "state": {
            "descriptor": {
              "code": "Packed"
            }
          },
          "start": {
            "..": "",
            "instructions": {
              "..": "",
              "long_desc": "instructions for pickup e.g. register or counter no",
              "additional_desc": {
                "content_type": "text/html",
                "url": "url for additional info"
              }
            }
          },
          "tags": [
            {
              "code": "state",
              "list": [
                {
                  "code": "ready_to_ship",
                  "value": "yes"
                }
              ]
            },
            {
              "code": "order_details",
              "list": [
                {
                  "code": "id",
                  "value": "RO1"
                },
                {
                  "code": "weight_unit",
                  "value": "kilogram"
                },
                {
                  "code": "weight_value",
                  "value": "3.0"
                },
                {
                  "code": "dim_unit",
                  "value": "centimeter"
                },
                {
                  "code": "length",
                  "value": "1.0"
                },
                {
                  "code": "breadth",
                  "value": "1.0"
                },
                {
                  "code": "height",
                  "value": "1.0"
                }
              ]
            },
            ".."
          ]
        }
      ],
      "..": "",
      "updated_at": "2025-01-01T10:00:30.201Z"
    }
  }
}
```

```json
{
  "context": {
    "action": "update",
    "core_version": "1.2.5",
    "..": ""
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
              "code": "update_verification",
              "list": [
                {
                  "code": "type",
                  "value": "5"
                },
                {
                  "code": "value",
                  "value": "9876"
                }
              ]
            },
            {
              "code": "update_state",
              "list": [
                {
                  "code": "state",
                  "value": "Order-picked-up"
                },
                {
                  "code": "reason_id",
                  "value": "007"
                },
                {
                  "code": "timestamp",
                  "value": "2025-01-01T09:30:00.000Z"
                },
                {
                  "code": "start_time",
                  "value": "2025-01-01T09:00:00.000Z"
                },
                {
                  "code": "end_time",
                  "value": "2025-01-01T09:30:00.000Z"
                }
              ]
            },
            {
              "code": "update_fulfillment_delay",
              "list": [
                {
                  "code": "state",
                  "value": "Order-picked-up"
                },
                {
                  "code": "reason_id",
                  "value": "002"
                },
                {
                  "code": "start_time",
                  "value": "2025-01-01T09:30:00.000Z"
                },
                {
                  "code": "end_time",
                  "value": "2025-01-01T10:00:00.000Z"
                },
                {
                  "code": "attempt",
                  "value": "yes"
                }
              ]
            },
            {
              "code": "update_agent_details",
              "list": [
                {
                  "code": "name",
                  "value": "agent_name"
                },
                {
                  "code": "phone",
                  "value": "9886098860"
                },
                {
                  "code": "provider_id",
                  "value": "lsp.com"
                }
              ]
            },
            {
              "code": "update_label",
              "list": [
                {
                  "code": "type",
                  "value": "pdf"
                },
                {
                  "code": "url",
                  "value": "public link to pdf"
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

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "..": "",
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "F3",
          "quantity": {
            "count": 1
          },
          "tags": [
            "..",
            {
              "code": "rto_action",
              "list": [
                {
                  "code": "return_to_origin",
                  "value": "yes"
                }
              ]
            }
          ]
        }
      ],
      "..": "",
      "fulfillments": [
        {
          "id": "F3",
          "provider_id": "lsp.com",
          "type": "Buyer-Delivery",
          "@ondc/org/TAT": "PT60M",
          "..": "",
          "state": {
            "descriptor": {
              "code": "Order-picked-up",
              "short_desc": "007"
            }
          },
          "start": {
            "..": "",
            "time": {
              "range": {
                "start": "2025-01-01T09:30:00.000Z",
                "end": "2025-01-01T10:00:00.000Z"
              },
              "timestamp": "2025-01-01T09:45:00.000Z"
            },
            "instructions": {
              "code": "5",
              "name": "ONDC Order",
              "short_desc": "9876",
              "..": ""
            },
            "..": ""
          },
          "end": {
            "..": "",
            "time": {
              "range": {
                "start": "2025-01-01T10:30:00.000Z",
                "end": "2025-01-01T11:00:00.000Z"
              },
              "timestamp": "2025-01-01T11:00:00.000Z"
            },
            "..": ""
          },
          "agent": {
            "name": "agent_name",
            "phone": "9886098860"
          },
          "..": "",
          "tags": [
            "..",
            {
              "code": "order_details",
              "list": [
                {
                  "code": "id",
                  "value": "RO1"
                },
                {
                  "code": "weight_unit",
                  "value": "kilogram"
                },
                {
                  "code": "weight_value",
                  "value": "3.0"
                },
                {
                  "code": "dim_unit",
                  "value": "centimeter"
                },
                {
                  "code": "length",
                  "value": "1.0"
                },
                {
                  "code": "breadth",
                  "value": "1.0"
                },
                {
                  "code": "height",
                  "value": "1.0"
                }
              ]
            },
            {
              "code": "rto_action",
              "list": [
                {
                  "code": "return_to_origin",
                  "value": "yes"
                }
              ]
            },
            {
              "code": "shipping_label",
              "list": [
                {
                  "code": "type",
                  "value": "pdf"
                },
                {
                  "code": "url",
                  "value": "public link to pdf"
                }
              ]
            },
            {
              "code": "fulfillment_delay",
              "list": [
                {
                  "code": "state",
                  "value": "Order-picked-up"
                },
                {
                  "code": "reason_id",
                  "value": "002"
                },
                {
                  "code": "attempt",
                  "value": "yes"
                }
              ]
            },
            {
              "code": "state",
              "list": [
                {
                  "code": "ready_to_ship",
                  "value": "yes"
                }
              ]
            }
          ]
        }
      ],
      "..": "",
      "updated_at": "2025-01-01T10:00:30.000Z"
    }
  }
}
```

### Cancellation

#### LSP cancels

- LSP cancels the logistics order using /on_cancel, with the appropriate [reason code](https://docs.google.com/spreadsheets/d/1_qAtG6Bu2we3AP6OpXr4GVP3X-32v2xNRNSYQhhR6kA/edit?gid=610954815#gid=610954815) and subscriber ID in "cancelled_by";
- BNP initiates cancellation of the retail order/fulfillment, cascading the cancellation reason from LSP;
- BNP requests a state update for forward & RTO fulfillment, as applicable for the retail order (see "update_state" above);
- Cancellation charges, if any, will be communicated by BNP to SNP if SNP is liable for such charges:
  - State update & cancellation charges will be communicated to SNP using /update before the order reaches a terminal state;
  - Cancellation charges will not be included in the order quote, and separate keys will be provided for this (as these are receivables due from SNP to BNP);

#### BNP cancels

- BNP cancels the retail order/fulfillment using /cancel;
- BNP cancels the logistics order using /cancel;
- BNP requests a state update for forward & RTO fulfillment for the retail order (see "update_state" above);
- Cancellation charges, if any, will be communicated by BNP to SNP if SNP is liable for such charges:
  - State update & cancellation charges will be communicated to SNP using /update;
  - Cancellation charges will not be included in the order quote, and separate keys will be provided for this (as these are receivables due from SNP to BNP);

#### SNP cancels

- SNP cancels the retail order/fulfillment using /on_cancel;
- BNP cancels the logistics order, cascading the reason from SNP;
- BNP requests a state update for forward & RTO fulfillment for the retail order (see "update_state" above);
- Cancellation charges, if any, will be communicated by BNP to SNP if SNP is liable for such charges:
  - State update & cancellation charges will be communicated to SNP using /update;
  - Cancellation charges will not be included in the order quote, and separate keys will be provided for this (as these are receivables due from SNP to BNP);

**Payload changes**

```json
{
  "context": {
    "action": "cancel",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order_id": "O1",
    "cancellation_reason_id": "103",
    "descriptor": {
      "name": "fulfillment",
      "short_desc": "F1",
      "tags": [
        {
          "code": "cancel_request",
          "list": [
            {
              "code": "initiated_by",
              "value": "lsp.com"
            }
          ]
        }
      ]
    }
  }
}
```

```json
{
  "context": {
    "action": "on_cancel",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "state": "In-progress",
      "..": "",
      "fulfillments": [
        {
          "id": "F1",
          "type": "Delivery",
          "..": "",
          "state": {
            "descriptor": {
              "code": "RTO"
            }
          },
          "..": "",
          "tags": [
            {
              "code": "cancel_request",
              "list": [
                {
                  "code": "rto_id",
                  "value": "F1-RTO"
                },
                {
                  "code": "reason_id",
                  "value": "103"
                },
                {
                  "code": "initiated_by",
                  "value": "lsp.com"
                }
              ]
            },
            ".."
          ]
        },
        {
          "id": "F1-RTO",
          "type": "RTO",
          "state": {
            "descriptor": {
              "code": "RTO-Initiated"
            }
          },
          "start": {
            "time": {
              "timestamp": "2025-01-03T11:00:30.000Z"
            },
            "location": {
              "..": ""
            }
          },
          "end": {
            "time": {
              "timestamp": "2025-01-04T11:00:30.000Z"
            },
            "location": {
              "..": ""
            }
          },
          "..": ""
        }
      ],
      "..": "",
      "updated_at": "2025-01-03T11:00:30.000Z"
    }
  }
}
```

```json
{
  "context": {
    "action": "update",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "update_target": "fulfillment",
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "F1-RTO",
          "tags": [
            {
              "code": "update_verification",
              "list": [
                {
                  "code": "type",
                  "value": "5"
                },
                {
                  "code": "value",
                  "value": "9876"
                }
              ]
            },
            {
              "code": "update_state",
              "list": [
                {
                  "code": "state",
                  "value": "RTO-Delivered"
                },
                {
                  "code": "timestamp",
                  "value": "2025-01-04T11:00:30.000Z"
                }
              ]
            },
            {
              "code": "bnp_receivables_claim",
              "list": [
                {
                  "code": "type",
                  "value": "delivery"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "50.00"
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

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "state": "Cancelled",
      "..": "",
      "fulfillments": [
        {
          "id": "F1",
          "type": "Delivery",
          "..": "",
          "state": {
            "descriptor": {
              "code": "RTO"
            }
          },
          "..": "",
          "tags": [
            {
              "code": "cancel_request",
              "list": [
                {
                  "code": "rto_id",
                  "value": "F1-RTO"
                },
                {
                  "code": "reason_id",
                  "value": "103"
                },
                {
                  "code": "initiated_by",
                  "value": "lsp.com"
                }
              ]
            },
            ".."
          ]
        },
        {
          "id": "F1-RTO",
          "type": "RTO",
          "state": {
            "descriptor": {
              "code": "RTO-Delivered"
            }
          },
          "start": {
            "time": {
              "timestamp": "2025-01-03T11:00:30.000Z"
            },
            "location": {
              "..": ""
            }
          },
          "end": {
            "time": {
              "timestamp": "2025-01-04T11:00:30.000Z"
            },
            "location": {
              "..": ""
            }
          },
          "..": "",
          "tags": [
            {
              "code": "bnp_receivables_claim",
              "list": [
                {
                  "code": "type",
                  "value": "delivery"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "50.00"
                }
              ]
            }
          ]
        }
      ],
      "..": "",
      "updated_at": "2025-01-03T11:00:30.000Z"
    }
  }
}
```

### Return

#### Scenarios

##### SNP handles return pickup:
- Existing [scenario](#_byf58wr8j0a5) applies, no payload changes;
- No additional charges to be sent in the order quote;

##### SNP doesn’t handle return pickup:
- BNP sends a return request (same as for the above scenario);
- SNP approves the return request with the state "Return_Approved":
  - SNP also includes reverse QC input for the return pickup check;
- BNP creates an order for logistics for return pickup;
- BNP requests an update for the fulfillment state and reverse QC output for the return fulfillment (see "Status update" above);
- BNP will need to factor in return costs;

**Payload changes**

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "..": "",
      "items": [
        {
          "id": "I1",
          "fulfillment_id": "F1",
          "quantity": {
            "count": 2
          }
        }
      ],
      "..": "",
      "fulfillments": [
        {
          "id": "F1",
          "state": {
            "descriptor": {
              "code": "Order-delivered"
            }
          },
          "..": ""
        },
        {
          "id": "R1",
          "type": "Return",
          "state": {
            "descriptor": {
              "code": "Return_Approved"
            }
          },
          "..": "",
          "tags": [
            {
              "code": "reverseqc_input",
              "list": [
                {
                  "code": "P001",
                  "value": "Atta"
                },
                {
                  "code": "P003",
                  "value": "1"
                },
                {
                  "code": "Q001",
                  "value": ""
                }
              ]
            },
            ".."
          ]
        }
      ],
      "..": "",
      "updated_at": "2025-01-06T13:30:00.000Z"
    }
  }
}
```

```json
{
  "context": {
    "action": "update",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "update_target": "fulfillment",
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "R1",
          "tags": [
            {
              "code": "update_state",
              "list": [
                {
                  "code": "state",
                  "value": "Return-Picked"
                },
                {
                  "code": "reason_id",
                  "value": "007"
                },
                {
                  "code": "timestamp",
                  "value": "2025-01-06T09:30:00.000Z"
                }
              ]
            },
            {
              "code": "update_agent_details",
              "list": [
                {
                  "code": "name",
                  "value": "agent_name"
                },
                {
                  "code": "phone",
                  "value": "9886098860"
                },
                {
                  "code": "provider_id",
                  "value": "lsp.com"
                }
              ]
            },
            {
              "code": "reverseqc_output",
              "list": [
                {
                  "code": "P001",
                  "value": "Atta"
                },
                {
                  "code": "P003",
                  "value": "1"
                },
                {
                  "code": "Q001",
                  "value": "yes"
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

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "..": "",
      "fulfillments": [
        "..",
        {
          "id": "R1",
          "type": "Return",
          "provider_id": "lsp.com",
          "..": "",
          "state": {
            "descriptor": {
              "code": "Return_Picked"
            }
          },
          "..": "",
          "start": {
            "..": "",
            "time": {
              "timestamp": "2025-01-06T09:30:00.000Z"
            },
            "..": ""
          },
          "end": {
            "..": "",
            "time": {
              "range": {
                "start": "2025-01-07T10:30:00.000Z",
                "end": "2025-01-07T11:00:00.000Z"
              },
              "timestamp": "2025-01-07T11:00:00.000Z"
            },
            "..": ""
          },
          "agent": {
            "name": "agent_name",
            "phone": "9886098860"
          },
          "..": "",
          "tags": [
            "..",
            {
              "code": "reverseqc_input",
              "list": [
                {
                  "code": "P001",
                  "value": "Atta"
                },
                {
                  "code": "P003",
                  "value": "1"
                },
                {
                  "code": "Q001",
                  "value": ""
                }
              ]
            },
            {
              "code": "reverseqc_output",
              "list": [
                {
                  "code": "P001",
                  "value": "Atta"
                },
                {
                  "code": "P003",
                  "value": "1"
                },
                {
                  "code": "Q001",
                  "value": "yes"
                }
              ]
            }
          ]
        }
      ],
      "..": "",
      "updated_at": "2025-01-06T12:00:00.000Z"
    }
  }
}
```

### Tracking

- Tracking of order/fulfillment will be directly between BNP & LSP;
- Tracking by SNP may be enabled later;

### Weight differential charges

- LSP sends an updated quote/weight/dimension due to weight differential to LBNP (BNP):
  - BNP forwards weight/dimension differentials and receivables due from SNP;
- Resolution of weight differential charges:
  - SNP to inform BNP if they accept or dispute the weight differential updates:
    - If SNP disputes:
      - SNP may use error code 41002 to indicate non-acceptance;
      - LBNP may communicate to LSP that weight differential charges are rejected;
      - LSP handles order delivery as per agreed terms;
      - Resolution of the dispute will follow the IGM route;
    - If SNP accepts:
      - Differential cost will not be included in the order quote, and separate attribute keys will be provided for this (as these are receivables due from SNP to BNP);

**Payload changes**

```json
{
  "context": {
    "action": "update",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "update_target": "fulfillment",
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "id": "F3",
          "tags": [
            "..",
            {
              "code": "linked_order_diff",
              "list": [
                {
                  "code": "id",
                  "value": "RO1"
                },
                {
                  "code": "weight_unit",
                  "value": "kilogram"
                },
                {
                  "code": "weight_value",
                  "value": "3.0"
                },
                {
                  "code": "dim_unit",
                  "value": "centimeter"
                },
                {
                  "code": "length",
                  "value": "1.0"
                },
                {
                  "code": "breadth",
                  "value": "1.0"
                },
                {
                  "code": "height",
                  "value": "1.0"
                }
              ]
            },
            {
              "code": "linked_order_diff_proof",
              "list": [
                {
                  "code": "type",
                  "value": "image"
                },
                {
                  "code": "url",
                  "value": "https://lsp.com/sorter/images1.png"
                }
              ]
            },
            {
              "code": "bnp_receivables_claim",
              "list": [
                {
                  "code": "type",
                  "value": "delivery"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "50.00"
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

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "..": "",
      "fulfillments": [
        {
          "id": "F3",
          "provider_id": "lsp.com",
          "type": "Buyer-Delivery",
          "..": "",
          "tags": [
            "..",
            {
              "code": "linked_order_diff",
              "list": [
                {
                  "code": "id",
                  "value": "RO1"
                },
                {
                  "code": "weight_unit",
                  "value": "kilogram"
                },
                {
                  "code": "weight_value",
                  "value": "3.0"
                },
                {
                  "code": "dim_unit",
                  "value": "centimeter"
                },
                {
                  "code": "length",
                  "value": "1.0"
                },
                {
                  "code": "breadth",
                  "value": "1.0"
                },
                {
                  "code": "height",
                  "value": "1.0"
                }
              ]
            },
            {
              "code": "linked_order_diff_proof",
              "list": [
                {
                  "code": "id",
                  "value": "RO1"
                },
                {
                  "code": "type",
                  "value": "image"
                },
                {
                  "code": "url",
                  "value": "https://lsp.com/sorter/images1.png"
                }
              ]
            },
            {
              "code": "bnp_receivables_claim",
              "list": [
                {
                  "code": "type",
                  "value": "delivery"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "50.00"
                }
              ]
            }
          ]
        }
      ],
      "..": "",
      "updated_at": "2025-01-06T10:00:30.000Z"
    }
  }
}
```

### COD collection

**Payload changes**

```json
{
  "context": {
    "action": "update",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "update_target": "payment",
    "order": {
      "id": "O1",
      "..": "",
      "payment": {
        "collected_by": "BAP",
        "status": "PAID",
        "time": {
          "timestamp": "2025-01-07T10:00:00.000Z"
        }
      }
    }
  }
}
```

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "..": "",
      "payment": {
        "..": "",
        "collected_by": "BAP",
        "status": "PAID",
        "time": {
          "timestamp": "2025-01-07T10:00:00.000Z"
        }
      },
      "..": "",
      "updated_at": "2025-01-07T10:00:30.000Z"
    }
  }
}
```