# Commercial Model for BNP/SNP - 00A

## Overview
- **Buyer Finder Fee (BFF)**: In `/search`, BFF becomes optional to ensure backward compatibility.
- **SNP Commercial Model**: SNP communicates the following as part of a full catalog refresh (`/on_search`):
  - Channel margin at provider, category, or item level.
  - Channel margin at item level overrides the value at category level, which overrides the value at provider level.

### Handling of Scenarios
1. **BNP sends BFF in full catalog refresh (/search)**:
   - **SNP responds with their commercial model (channel margin)**: SNP’s commercial model overrides BNP’s BFF.
   - **SNP doesn’t respond with their commercial model**: BNP’s BFF applies.
2. **BNP doesn’t send BFF in full catalog /search**:
   - **SNP responds with their commercial model (channel margin)**: SNP’s commercial model applies.
   - **SNP doesn’t respond with their commercial model**: Channel margin is considered as 0.

### Application of Channel Margin
- **SNP applies channel margin**: Applied at the item level in the quote (`/on_select`), overriding values at category and provider levels specified in the full catalog refresh.
- **Quote Line Item**: Channel margin is applied using the convenience fee quote line item type (`title_type="misc"`).
- **Multiple Options**: If multiple channel margin options exist, separate quote line items are provided for each option.
- **BNP Selection**: BNP selects a specific option for each item in `/init`.
- **SNP Response**: SNP sends the updated quote (including the selected option) in `/on_init`.
- **COD Payment Collection**: For cash-on-delivery (COD) where the seller (SNP) delivers the order, BNP communicates platform fees (if any) to be collected by SNP.

## Payload Changes

### Full Catalog Refresh with SNP Commercials (on_search)
SNP includes channel margin details at provider, category, and item levels.

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    "..": ".."
  },
  "message": {
    "catalog": {
      "..": "..",
      "bpp/providers": [
        {
          "id": "P1",
          "..": "..",
          "categories": [
            {
              "id": "Dairy and Cheese",
              "..": "..",
              "tags": [
                {
                  "code": "type",
                  "list": [
                    {
                      "code": "type",
                      "value": "category"
                    }
                  ]
                },
                {
                  "code": "np_fees",
                  "list": [
                    {
                      "code": "channel_margin_type",
                      "value": "percent"
                    },
                    {
                      "code": "channel_margin_value",
                      "value": "0.50"
                    }
                  ]
                }
              ]
            },
            "..": ".."
          ],
          "items": [
            {
              "..": "..",
              "tags": [
                {
                  "code": "np_fees",
                  "list": [
                    {
                      "code": "channel_margin_type",
                      "value": "percent"
                    },
                    {
                      "code": "channel_margin_value",
                      "value": "0.50"
                    }
                  ]
                },
                "..": ".."
              ]
            }
          ],
          "..": "..",
          "tags": [
            {
              "code": "np_fees",
              "list": [
                {
                  "code": "channel_margin_type",
                  "value": "percent"
                },
                {
                  "code": "channel_margin_value",
                  "value": "0.50"
                }
              ]
            },
            "..": ".."
          ]
        }
      ]
    }
  }
}
```

### Quote with SNP Commercials Applied (on_select)
SNP provides multiple channel margin options in the quote.

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    "..": ".."
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
      "fulfillments": [
        {
          "id": "F1",
          "..": ".."
        }
      ],
      "quote": {
        "price": {
          "currency": "INR",
          "value": ".."
        },
        "breakup": [
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/item_quantity": {
              "count": 1
            },
            "@ondc/org/title_type": "item",
            "..": ".."
          },
          {
            "@ondc/org/item_id": "F1",
            "@ondc/org/title_type": "delivery",
            "..": ".."
          },
          "..": "..",
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "misc",
            "price": {
              "..": ".."
            },
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
                  "code": "np_fees",
                  "list": [
                    {
                      "code": "id",
                      "value": "1"
                    },
                    {
                      "code": "channel_margin_type",
                      "value": "percent"
                    },
                    {
                      "code": "channel_margin_value",
                      "value": "0.50"
                    }
                  ]
                }
              ]
            }
          },
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "misc",
            "price": {
              "..": ".."
            },
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
                  "code": "np_fees",
                  "list": [
                    {
                      "code": "id",
                      "value": "2"
                    },
                    {
                      "code": "channel_margin_type",
                      "value": "percent"
                    },
                    {
                      "code": "channel_margin_value",
                      "value": "0.75"
                    }
                  ]
                }
              ]
            }
          },
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "tax",
            "price": {
              "..": ".."
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "item"
                    },
                    {
                      "code": "subtype",
                      "value": "misc"
                    }
                  ]
                },
                {
                  "code": "np_fees",
                  "list": [
                    {
                      "code": "id",
                      "value": "1"
                    }
                  ]
                }
              ]
            }
          },
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "tax",
            "price": {
              "..": ".."
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "item"
                    },
                    {
                      "code": "subtype",
                      "value": "misc"
                    }
                  ]
                },
                {
                  "code": "np_fees",
                  "list": [
                    {
                      "code": "id",
                      "value": "2"
                    }
                  ]
                }
              ]
            }
          }
        ],
        "ttl": "PT1H"
      }
    }
  }
}
```

### BNP Selects Specific Option (init)
BNP selects a specific channel margin option for the item.

```json
{
  "context": {
    "action": "init",
    "core_version": "1.2.5",
    "..": ".."
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
          "..": "..",
          "tags": [
            "..": "..",
            {
              "code": "np_fees",
              "list": [
                {
                  "code": "id",
                  "value": "1"
                }
              ]
            }
          ]
        }
      ],
      "..": ".."
    }
  }
}
```

### SNP Responds with Selected Option (on_init)
SNP sends the updated quote including the selected channel margin option.

```json
{
  "context": {
    "action": "on_init",
    "core_version": "1.2.5",
    "..": ".."
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
          "..": "..",
          "tags": [
            "..": "..",
            {
              "code": "np_fees",
              "list": [
                {
                  "code": "id",
                  "value": "1"
                }
              ]
            }
          ]
        }
      ],
      "fulfillments": [
        {
          "id": "F1",
          "..": ".."
        }
      ],
      "quote": {
        "price": {
          "currency": "INR",
          "value": ".."
        },
        "breakup": [
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/item_quantity": {
              "count": 1
            },
            "@ondc/org/title_type": "item",
            "..": ".."
          },
          {
            "@ondc/org/item_id": "F1",
            "@ondc/org/title_type": "delivery",
            "..": ".."
          },
          "..": "..",
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "misc",
            "price": {
              "..": ".."
            },
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
                  "code": "np_fees",
                  "list": [
                    {
                      "code": "id",
                      "value": "1"
                    },
                    {
                      "code": "channel_margin_type",
                      "value": "percent"
                    },
                    {
                      "code": "channel_margin_value",
                      "value": "0.5"
                    }
                  ]
                }
              ]
            }
          },
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "tax",
            "price": {
              "..": ".."
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "item"
                    },
                    {
                      "code": "subtype",
                      "value": "misc"
                    }
                  ]
                },
                {
                  "code": "np_fees",
                  "list": [
                    {
                      "code": "id",
                      "value": "1"
                    }
                  ]
                }
              ]
            }
          }
        ],
        "ttl": "PT1H"
      }
    }
  }
}
```

### BNP Confirms Order with Platform Fee for COD (confirm)
BNP includes platform fees to be collected for COD payment.

```json
{
  "context": {
    "action": "confirm",
    "core_version": "1.2.5",
    "..": ".."
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
          "..": "..",
          "tags": [
            "..": "..",
            {
              "code": "np_fees",
              "list": [
                {
                  "code": "id",
                  "value": "1"
                }
              ]
            }
          ]
        }
      ],
      "fulfillments": [
        {
          "id": "F1",
          "..": ".."
        }
      ],
      "quote": {
        "price": {
          "currency": "INR",
          "value": ".."
        },
        "breakup": [
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/item_quantity": {
              "count": 1
            },
            "@ondc/org/title_type": "item",
            "..": ".."
          },
          {
            "@ondc/org/item_id": "F1",
            "@ondc/org/title_type": "delivery",
            "..": ".."
          },
          "..": "..",
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "misc",
            "price": {
              "..": ".."
            },
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
                  "code": "np_fees",
                  "list": [
                    {
                      "code": "id",
                      "value": "1"
                    },
                    {
                      "code": "channel_margin_type",
                      "value": "percent"
                    },
                    {
                      "code": "channel_margin_value",
                      "value": "0.5"
                    }
                  ]
                }
              ]
            }
          },
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/title_type": "tax",
            "price": {
              "..": ".."
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "item"
                    },
                    {
                      "code": "subtype",
                      "value": "misc"
                    }
                  ]
                },
                {
                  "code": "np_fees",
                  "list": [
                    {
                      "code": "id",
                      "value": "1"
                    }
                  ]
                }
              ]
            }
          }
        ],
        "ttl": "PT1H"
      },
      "tags": [
        {
          "code": "bnp_receivables_claim",
          "list": [
            {
              "code": "type",
              "value": "misc"
            },
            {
              "code": "currency",
              "value": "INR"
            },
            {
              "code": "value",
              "value": "20.00"
            }
          ]
        }
      ]
    }
  }
}
```