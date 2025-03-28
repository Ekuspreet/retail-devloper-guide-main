# Self-pickup - 002

- Provider will define whether their store supports delivery, self-pickup, or both options, along with the timings for delivery and self-pickup;
- SNP will forward delivery (only if pickup & delivery locations are serviceable) and self-pickup options for the buyer to select:
  - Delivery option will have an O2D TAT, while the self-pickup option will have an O2S TAT;
  - Delivery will be the 1st fulfillment option (with the SNP assigning this delivery option for the items), but the quote will include the cost for both delivery & self-pickup types (including "delivery", "packing", "tax" (with quote type "fulfillment"), as applicable);
- BNP should check the default fulfillment(s) assigned to item(s) and extract the cost only for these fulfillment(s) from the quote, for displaying to the buyer along with other line items such as item, tax, etc.;
- Buyer may change the fulfillment option to self-pickup, and this will be updated in /init:
  - When the buyer selects a fulfillment option among options provided by the SNP, the selected fulfillment option will be communicated in /init. In this case, the selected fulfillment option will impact the quote, and the quote in /on_init may differ from the quote in /on_select;
  - BNP will need to validate that the updated quote in /on_init matches the quote in /on_select after adjusting for changes in the quote due to the fulfillment option selected, e.g., if the /on_select quote included a value for delivery charge and this was the default fulfillment option, and the buyer selects self-pickup, the updated quote should have a delivery charge of 0 in /on_init;
- If cart selection changes (i.e., change in items and/or quantity), BNP needs to call /select;
- SNP should check that the quote in /confirm matches the last quote sent in /on_init;
- In case of self-pickup:
  - After the order is packed, it is ready for pickup by the seller;
  - Pickup code will be generated by SNP and communicated to BNP;
  - Authorization code (OTP, etc.) may optionally be generated by SNP and communicated to BNP;
  - Additional details that may be required to be communicated over the protocol include vehicle number for curbside self-pickup;
  - Instructions, if any (e.g., with register/counter number for buyer self-pickup);

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
          "..": "",
          "fulfillments": [
            {
              "id": "F1",
              "type": "Delivery",
              "contact": {
                "phone": "9886098860",
                "email": "abc@xyz.com"
              }
            },
            {
              "id": "F2",
              "type": "Self-Pickup",
              "contact": {
                "phone": "9886098860",
                "email": "abc@xyz.com"
              }
            }
          ],
          "..": "",
          "tags": [
            "..",
            {
              "code": "timing",
              "list": [
                {
                  "code": "type",
                  "value": "Self-Pickup"
                },
                {
                  "code": "location",
                  "value": "L1"
                },
                {
                  "code": "day_from",
                  "value": "1"
                },
                {
                  "code": "day_to",
                  "value": "7"
                },
                {
                  "code": "time_from",
                  "value": "1100"
                },
                {
                  "code": "time_to",
                  "value": "2000"
                }
              ]
            },
            ".."
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
          "fulfillment_id": "F1"
        }
      ],
      "fulfillments": [
        {
          "id": "F1",
          "type": "Delivery",
          "..": "",
          "@ondc/org/TAT": "PT60M"
        },
        {
          "id": "F2",
          "type": "Self-Pickup",
          "@ondc/org/provider_name": "",
          "tracking": false,
          "@ondc/org/category": "Takeaway",
          "@ondc/org/TAT": "PT15M",
          "state": {
            "descriptor": {
              "code": "Serviceable"
            }
          }
        }
      ],
      "quote": {
        "..": "",
        "breakup": [
          {
            "..": ""
          },
          {
            "@ondc/org/item_id": "F1",
            "title": "Delivery charges",
            "@ondc/org/title_type": "delivery",
            "price": {
              "currency": "INR",
              "value": "50.00"
            }
          },
          {
            "@ondc/org/item_id": "F1",
            "title": "Tax",
            "@ondc/org/title_type": "tax",
            "price": {
              "currency": "INR",
              "value": "9.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "fulfillment"
                    }
                  ]
                }
              ]
            }
          },
          {
            "@ondc/org/item_id": "F1",
            "title": "Packing charges",
            "@ondc/org/title_type": "packing",
            "price": {
              "currency": "INR",
              "value": "25.00"
            }
          },
          {
            "@ondc/org/item_id": "F2",
            "title": "Delivery charges",
            "@ondc/org/title_type": "delivery",
            "price": {
              "currency": "INR",
              "value": "0.00"
            }
          },
          {
            "@ondc/org/item_id": "F2",
            "title": "Packing charges",
            "@ondc/org/title_type": "packing",
            "price": {
              "currency": "INR",
              "value": "25.00"
            }
          },
          {
            "@ondc/org/item_id": "I1",
            "title": "Tax",
            "@ondc/org/title_type": "tax",
            "price": {
              "currency": "INR",
              "value": "60.00"
            }
          }
        ],
        "ttl": "PT30M"
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
          "fulfillment_id": "F2"
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
          "fulfillment_id": "F2"
        }
      ],
      "fulfillments": [
        {
          "id": "F2",
          "type": "Self-Pickup",
          "@ondc/org/provider_name": "",
          "tracking": false,
          "@ondc/org/category": "Takeaway",
          "@ondc/org/TAT": "PT15M",
          "state": {
            "descriptor": {
              "code": "Serviceable"
            }
          }
        }
      ],
      "quote": {
        "..": "",
        "breakup": [
          {
            "..": ""
          },
          {
            "@ondc/org/item_id": "F2",
            "title": "Delivery charges",
            "@ondc/org/title_type": "delivery",
            "price": {
              "currency": "INR",
              "value": "0.00"
            }
          },
          {
            "@ondc/org/item_id": "F2",
            "title": "Packing charges",
            "@ondc/org/title_type": "packing",
            "price": {
              "currency": "INR",
              "value": "25.00"
            }
          },
          ".."
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
    "action": "confirm",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "..": "",
      "fulfillments": [
        {
          "id": "F2",
          "type": "Self-Pickup",
          "@ondc/org/category": "Kerbside",
          "..": "",
          "vehicle": {
            "registration": "3LVJ945"
          }
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
    "action": "on_confirm",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "..": "",
      "fulfillments": [
        {
          "id": "F2",
          "type": "Self-Pickup",
          "@ondc/org/category": "Kerbside",
          "..": "",
          "start": {
            "..": "",
            "instructions": {
              "code": "2",
              "name": "ONDC order",
              "short_desc": "value of PCC",
              "long_desc": "additional instructions such as register or counter no for self-pickup"
            },
            "..": ""
          },
          "vehicle": {
            "registration": "3LVJ945"
          }
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
    "action": "on_status",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "order": {
      "..": "",
      "state": "Completed",
      "..": "",
      "fulfillments": [
        {
          "id": "F2",
          "type": "Self-Pickup",
          "@ondc/org/category": "Kerbside",
          "state": {
            "descriptor": {
              "code": "Order-picked-up"
            }
          },
          "..": "",
          "start": {
            "..": "",
            "instructions": {
              "code": "2",
              "name": "ONDC order",
              "short_desc": "value of PCC",
              "long_desc": "additional instructions such as register or counter no for self-pickup"
            },
            "..": ""
          },
          "vehicle": {
            "registration": "3LVJ945"
          }
        }
      ],
      "..": ""
    }
  }
}
```