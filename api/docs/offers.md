# Offers

## Offer Construct - Includes:

### Applicability Criteria
Defines where/when/on what offer(s) may be applicable:
- **Location(s)**
- **Categories**
- **Item(s)**
- **Time Period Validity**

Applicability criteria for an offer will be:
- Intersection of the defined attributes, i.e., location(s), categories, and time period validity, if these are the attributes defined for the offer.
- Within a multi-valued attribute, applicability criteria will apply to the union of all values, e.g., for location L1 & L2, the offer applies to L1 or L2.

### Qualifier
Qualifying/eligibility criteria, based on cart value, i.e., aggregate value of all items in the cart, not including taxes, delivery, and packaging charges.

### Benefit
Benefit to the buyer from the offer(s).

### Meta Info
Other info, i.e., whether the offer requires explicit buyer opt-in, whether an offer can be applied in addition to other offer(s).

### Other Info
Includes offer ID/type, images, etc.

---

## Offer Flows

### Publish Offer
SNP publishes offers, per provider, in the full and/or incremental catalog refresh:
- BNP may display one or more of these offers on their app to enable buyer discovery.
- Offer definition is templatized below, and the BNP can create an appropriate description for an offer from the template variables (qualifier, benefit) and using the applicability criteria as defined above.

### Apply Offer
SNP applies offer(s) to the order quote during the buyer checkout flow:
- SNP may apply offer(s) without publishing in the full or incremental catalog refresh.
- Offer is applied as part of processing request (`/select`, `/init`):
  - SNP evaluates offers for which the buyer is eligible, regardless of the applicability of such offers, and sends details of these offers in `/on_select`.
  - SNP validates offer ID(s) for opt-in offers and applies the offer(s) to the cart selection.
  - Offers based on buyer identification can be applied while processing `/init`.
  - Auto-applied offers will be shown in the offer quote. If the buyer doesn’t want any auto-applied offer, they can remove the offer from the cart, and BNP will communicate this to SNP in the subsequent request (`/select`, `/init`).
- Offers resulting in monetary benefit to the buyer will be applied to the order quote:
  - Cart-level offers will be applied at the "order" level in the quote, and the attributes in "benefit" below will be part of the "offer" quote line item.
  - Allocation of order-level offers to individual line items is at the discretion of the BNPs, subject to:
    - The absolute aggregate of the offer reversal values cannot exceed the offer values applied at the time of order creation.
    - Any reversal of offer value due to cancellation/return, etc., will have to be explicitly defined in `quote_trail`.

### Reverse Offer
Whenever an offer qualifier is no longer valid in the post-order flow, SNP may decide to reverse the offer, in part or full, up to the benefit provided to the buyer in aggregate.

---

## Exception Conditions for Offers
- If the offer is no longer valid in pre-order APIs such as `/on_init` or `/on_confirm`, SNP can send error code `30006`.
- If the offer is valid but cannot be fulfilled, e.g., offer item not available for offers such as freebie, etc., SNP can send error code `30007`.
- If the offer is no longer valid or cannot be fulfilled in `/on_confirm`, SNP should cancel the order.

---

## Offer Template
In the template below (M - mandatory, O - optional, N/A - not applicable):

| # | Offer Type | Min Value | Item Count | Item Count Upper | Item ID | Value | Value Type | Value Cap | Item Count | Item ID | Item Value | Additive | Auto |
|---|------------|-----------|------------|------------------|---------|-------|------------|-----------|------------|---------|------------|----------|------|
| 1 | Discount   | O         | N/A        | N/A              | N/A     | M     | M          | O         | N/A        | N/A     | N/A        | M        | M    |
| 2 | BuyXGetY   | O         | M          | N/A              | N/A     | N/A   | N/A        | N/A       | M          | O       | M          | M        | M    |
| 3 | Freebie    | O         | N/A        | N/A              | N/A     | N/A   | N/A        | N/A       | M          | M       | N/A        | M        | M    |
| 4 | Slab       | O         | M          | M                | N/A     | M     | M          | M         | N/A        | N/A     | N/A        | M        | M    |
| 5 | Combo      | O         | N/A        | N/A              | M       | M     | M          | M         | N/A        | N/A     | N/A        | M        | M    |
| 6 | Delivery   | O         | N/A        | N/A              | N/A     | M     | M          | O         | N/A        | N/A     | N/A        | M        | M    |
| 7 | Exchange   | O         | N/A        | N/A              | N/A     | N/A   | N/A        | N/A       | N/A        | N/A     | N/A        | M        | M    |
| 8 | Financing  | O         | N/A        | N/A              | N/A     | N/A   | N/A        | N/A       | N/A        | N/A     | N/A        | M        | M    |

---

### Offer Type:
- **Discount**: Discount percent or amount applied to the cart value, with or without a cap, and may be based on minimum cart value.
- **BuyXGetY**: For every "X" item count in the cart, a total of "Y" items will be offered (i.e., "Y" - "X" additional items) at the offered value.
- **Freebie**: For a minimum order value, 1 or more free item(s) will be offered at 0 value.
- **Slab**: Distinct slabs for applicable discount for a range of item quantity.
- **Combo**: Discount for (primary) item and 1 or more (secondary) items.
- **Delivery**: Discount on delivery charges, with or without a cap.
- **Exchange**: 1 or more catalog items can be purchased in lieu of an existing item owned by the buyer.
- **Financing**: SNP financing available for 1 or more catalog items.

---

### Qualifier:
- **Min Value**: Minimum cart value for the offer to be applicable.
- **Item Count**: Minimum count of items in the cart for the offer to be applicable.
- **Item Count Upper**: Maximum count of items in the cart for the offer to be applicable.
- **Item ID**: (Secondary) item(s) for the offer.

---

### Benefit:
- **Value**: Discount on the cart value (-ve) offered.
- **Value Type**: "percent", "amount".
- **Value Cap**: Cap on the offer value.
- **Item Count**: Additional count of items offered.
- **Item ID**: Additional item offered, should be part of the catalog.
- **Item Value**: Offered value of the item.

---

### Meta:
- **Additive**: Whether the offer can be applied with other offers.
- **Auto**: Whether the offer is auto-applied or requires explicit opt-in by the buyer.

---

## Offer (Discount) - 0091

### Publish Offer
SNP publishes the offer in full or incremental catalog refresh:

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "catalog": {
      ...
      "bpp/providers": [
        {
          "id": "P1",
          ...
          "items": [
            {
              "id": "I1",
              ...
            },
            {
              "id": "I2",
              ...
            },
            {
              "id": "I3",
              ...
            }
          ],
          "offers": [
            {
              "id": "discp60",
              "descriptor": {
                "code": "discount",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "category_ids": [
                ...
              ],
              "item_ids": [
                "I1"
              ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [
                    {
                      "code": "min_value",
                      "value": "159.00"
                    }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    {
                      "code": "value_type",
                      "value": "percent"
                    },
                    {
                      "code": "value",
                      "value": "-60.00"
                    },
                    {
                      "code": "value_cap",
                      "value": "-120.00"
                    }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "yes"
                    },
                    {
                      "code": "auto",
                      "value": "no"
                    }
                  ]
                }
              ]
            },
            {
              "id": "flat150",
              "descriptor": {
                "code": "discount",
                "images": [
                  "https://snp.com/images/offer2-banner.webp"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "category_ids": [
                "C1",
                "C2"
              ],
              "item_ids": [
                "I1"
              ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [
                    {
                      "code": "min_value",
                      "value": "499.00"
                    }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    {
                      "code": "value_type",
                      "value": "amount"
                    },
                    {
                      "code": "value",
                      "value": "-150.00"
                    }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "yes"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          ],
          ...
        }
      ]
    }
  }
}
```

---

### Apply Offer
Any offer that results in a change in the order value and/or quantity of items will be applied to the order quote and will be part of all order-level callbacks, i.e., `/on_init`, `/on_confirm`, `/on_status`, `/on_cancel`, `/on_update`:

```json
{
  "context": {
    "action": "select",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      ...
      "offers": [
        {
          "id": "discp60"
        }
      ],
      ...
    }
  }
}
```

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      ...
      "quote": {
        ...
        "breakup": [
          ...
          {
            "@ondc/org/item_id": "flat150",
            "title": "Flat ₹150 off on ₹499 minimum cart value",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-150.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "discount"
                    },
                    {
                      "code": "additive",
                      "value": "yes"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          },
          {
            "@ondc/org/item_id": "discp60",
            "title": "₹120 off on minimum cart value of ₹159",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-120.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "discount"
                    },
                    {
                      "code": "additive",
                      "value": "yes"
                    },
                    {
                      "code": "auto",
                      "value": "no"
                    }
                  ]
                }
              ]
            }
          }
        ],
        ...
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
    ...
  },
  "message": {
    "order": {
      ...
      "offers": [
        {
          "id": "flat150",
          "tags": [
            {
              "code": "selection",
              "list": [
                {
                  "code": "apply",
                  "value": "no"
                }
              ]
            }
          ]
        }
      ],
      ...
    }
  }
}
```

---

### Reverse Offer
Since the "discount" offer resulted in monetary benefit to the buyer (by reducing the order value), reversal of the offer will mean reversing this, up to the benefit provided to the buyer in aggregate.

For example, the "discp60" offer above reduced the order value by ₹120; this means reversal of the offer can add back, in aggregate, a maximum of ₹120 to the order value.

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      "id": "O1",
      ...
      "fulfillments": [
        {
          "id": "F1",
          ...
        },
        {
          "id": "C1",
          ...
          "tags": [
            ...
            {
              "code": "quote_trail",
              "list": [
                {
                  "code": "type",
                  "value": "offer"
                },
                {
                  "code": "id",
                  "value": "discp60"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "60.00"
                }
              ]
            },
            ...
          ]
        }
      ],
      "quote": {
        ...
        "breakup": [
          ...
          {
            "@ondc/org/item_id": "discp60",
            "title": "rolling back ₹60 from offered discount",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-60.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "discount"
                    },
                    {
                      "code": "additive",
                      "value": "yes"
                    },
                    {
                      "code": "auto",
                      "value": "no"
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```

---

## Offer (BuyXGetY) - 0092

### Publish Offer
SNP publishes the offer in full or incremental catalog refresh:

#### Scenario 1 - Offer for Specific Item(s) in Cart

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "catalog": {
      ...
      "bpp/providers": [
        {
          "id": "P1",
          ...
          "items": [
            {
              "id": "I1",
              ...
            },
            {
              "id": "I2",
              ...
            },
            {
              "id": "I3",
              ...
            }
          ],
          "offers": [
            {
              "id": "buy2get3",
              "descriptor": {
                "code": "buyXgetY",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "category_ids": [
                ...
              ],
              "item_ids": [
                "I1",
                "I2"
              ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [
                    {
                      "code": "item_count",
                      "value": "2"
                    }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    {
                      "code": "item_count",
                      "value": "1"
                    },
                    {
                      "code": "item_id",
                      "value": "I2"
                    },
                    {
                      "code": "item_value",
                      "value": "0.00"
                    }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          ],
          ...
        }
      ]
    }
  }
}
```

---

### Apply Offer

```json
{
  "context": {
    "action": "select",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      ...
      "items": [
        {
          "id": "I2",
          ...
          "quantity": {
            "count": 2
          }
        }
      ],
      ...
    }
  }
}
```

Any offer that results in a change in the order value and/or quantity of items will be applied to the order quote and will be part of all order-level callbacks, i.e., `/on_init`, `/on_confirm`, `/on_status`, `/on_cancel`, `/on_update`:

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      ...
      "quote": {
        ...
        "breakup": [
          {},
          {
            "@ondc/org/item_id": "buy2get3",
            "@ondc/org/item_quantity": {
              "count": 1
            },
            "title": "buy 2 items, get 3rd for free or at offered price",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "0.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "buyXgetY"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    },
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "item_id",
                      "value": "I2"
                    },
                    {
                      "code": "item_count",
                      "value": "1"
                    },
                    {
                      "code": "item_value",
                      "value": "0.00"
                    }
                  ]
                }
              ]
            }
          }
        ],
        ...
      }
    }
  }
}
```

---

#### Scenario 2 - Offer for Any Item(s) in Cart

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "catalog": {
      ...
      "bpp/providers": [
        {
          "id": "P1",
          ...
          "items": [
            {
              "id": "I1",
              ...
            },
            {
              "id": "I2",
              ...
            },
            {
              "id": "I3",
              ...
            }
          ],
          "offers": [
            {
              "id": "buy2get3",
              "descriptor": {
                "code": "buyXgetY",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "category_ids": [
                ...
              ],
              "item_ids": [],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [
                    {
                      "code": "item_count",
                      "value": "2"
                    }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    {
                      "code": "item_count",
                      "value": "1"
                    },
                    {
                      "code": "item_id",
                      "value": "I1"
                    },
                    {
                      "code": "item_value",
                      "value": "0.00"
                    }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          ],
          ...
        }
      ]
    }
  }
}
```

---

### Apply Offer

```json
{
  "context": {
    "action": "select",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      ...
      "items": [
        {
          "id": "I2",
          ...
          "quantity": {
            "count": 1
          }
        },
        {
          "id": "I2",
          ...
          "quantity": {
            "count": 1
          }
        }
      ],
      ...
    }
  }
}
```

Any offer that results in a change in the order value and/or quantity of items will be applied to the order quote and will be part of all order-level callbacks, i.e., `/on_init`, `/on_confirm`, `/on_status`, `/on_cancel`, `/on_update`:

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      ...
      "quote": {
        ...
        "breakup": [
          {
            ...
          },
          {
            "@ondc/org/item_id": "buy2get3",
            "@ondc/org/item_quantity": {
              "count": 1
            },
            "title": "buy 2 items, get 3rd for free or at offered price",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "0.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "buyXgetY"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    },
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "item_id",
                      "value": "I1"
                    },
                    {
                      "code": "item_count",
                      "value": "1"
                    },
                    {
                      "code": "item_value",
                      "value": "0.00"
                    }
                  ]
                }
              ]
            }
          }
        ],
        ...
      }
    }
  }
}
```

---

### Reverse Offer
Since the "buyXgetY" offer resulted in additional quantity of the item, reversal of the offer will mean reducing this item quantity, the aggregate of which should not exceed the additional quantity of the item offered.

For example, the "buy2get3" offer above (Scenario 1) added 1 additional quantity of item I2; this means reversal of the offer can reduce, in aggregate, a maximum of 1 quantity of I2 from the order.

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      "id": "O1",
      ...
      "fulfillments": [
        {
          "id": "F1",
          ...
        },
        {
          "id": "C1",
          ...
          "tags": [
            ...
            {
              "code": "quote_trail",
              "list": [
                {
                  "code": "type",
                  "value": "offer"
                },
                {
                  "code": "id",
                  "value": "buy2get3"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "0.00"
                }
              ]
            },
            ...
          ]
        }
      ],
      "quote": {
        ...
        "breakup": [
          ...
          {
            "@ondc/org/item_id": "buy2get3",
            "@ondc/org/item_quantity": {
              "count": 0
            },
            "title": "reversing the offer by changing quantity to 0",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "0.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "buyXgetY"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    },
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "item_id",
                      "value": "I2"
                    },
                    {
                      "code": "item_count",
                      "value": "1"
                    },
                    {
                      "code": "item_value",
                      "value": "0.00"
                    }
                  ]
                }
              ]
            }
          }
        ],
        ...
      },
      ...
    }
  }
}
```
## Offer (Freebie) - 0093

### Publish Offer
SNP publishes the offer in full or incremental catalog refresh:

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "catalog": {
      ...
      "bpp/providers": [
        {
          "id": "P1",
          ...
          "items": [
            {
              "id": "I1",
              ...
            },
            {
              "id": "I2",
              ...
            },
            {
              "id": "I3",
              ...
            }
          ],
          "offers": [
            {
              "id": "freebie1",
              "descriptor": {
                "code": "freebie",
                "images": [
                  "https://snp.com/images/offer3-banner.png"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "category_ids": [
                ...
              ],
              "item_ids": [
                "I1"
              ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [
                    {
                      "code": "min_value",
                      "value": "598.00"
                    }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    {
                      "code": "item_count",
                      "value": "1"
                    },
                    {
                      "code": "item_id",
                      "value": "I4"
                    }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          ],
          ...
        }
      ]
    }
  }
}
```

---

### Apply Offer
Any offer that results in a change in the quantity of items will be applied to the order quote and will be part of all order-level callbacks, i.e., `/on_init`, `/on_confirm`, `/on_status`, `/on_cancel`, `/on_update`:

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      ...
      "quote": {
        "price": {
          ...
        },
        "breakup": [
          {
            ...
          },
          {
            "@ondc/org/item_id": "freebie1",
            "@ondc/org/item_quantity": {
              "count": 1
            },
            "title": "Free item of ₹200 on minimum cart value of ₹598",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "0.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "freebie"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    },
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "item_id",
                      "value": "I4"
                    },
                    {
                      "code": "item_count",
                      "value": "1"
                    }
                  ]
                }
              ]
            }
          }
        ],
        ...
      }
    }
  }
}
```

---

### Reverse Offer
Since the "freebie1" offer resulted in an additional quantity of the item, reversal of the offer will mean reducing this item quantity, the aggregate of which should not exceed the additional quantity of the freebie item offered.

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      "id": "O1",
      ...
      "fulfillments": [
        {
          "id": "F1",
          ...
        },
        {
          "id": "C1",
          ...
          "tags": [
            ...
            {
              "code": "quote_trail",
              "list": [
                {
                  "code": "type",
                  "value": "offer"
                },
                {
                  "code": "id",
                  "value": "freebie1"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "0.00"
                }
              ]
            },
            ...
          ]
        }
      ],
      "quote": {
        ...
        "breakup": [
          ...
          {
            "@ondc/org/item_id": "freebie1",
            "@ondc/org/item_quantity": {
              "count": 0
            },
            "title": "reversing the offer by changing quantity to 0",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "0.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "freebie"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    },
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "item_id",
                      "value": "I4"
                    },
                    {
                      "code": "item_count",
                      "value": "1"
                    }
                  ]
                }
              ]
            }
          }
        ],
        ...
      },
      ...
    }
  }
}
```

## Offer (Slab) - 0094

### Publish Offer
SNP publishes the offer in full or incremental catalog refresh:

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "catalog": {
      ...
      "bpp/providers": [
        {
          "id": "P1",
          ...
          "items": [
            {
              "id": "I1",
              ...
            },
            {
              "id": "I2",
              ...
            },
            {
              "id": "I3",
              ...
            }
          ],
          "offers": [
            {
              "id": "slab1",
              "descriptor": {
                "code": "slab",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "category_ids": [
                ...
              ],
              "item_ids": [
                "I1"
              ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [
                    {
                      "code": "item_count",
                      "value": "6"
                    },
                    {
                      "code": "item_count_upper",
                      "value": "9"
                    }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    {
                      "code": "value_type",
                      "value": "percent"
                    },
                    {
                      "code": "value",
                      "value": "-10.00"
                    },
                    {
                      "code": "value_cap",
                      "value": "-100.00"
                    }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            },
            {
              "id": "slab2",
              "descriptor": {
                "code": "slab",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "item_ids": [
                "I1"
              ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [
                    {
                      "code": "item_count",
                      "value": "10"
                    },
                    {
                      "code": "item_count_upper",
                      "value": ""
                    }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    {
                      "code": "value_type",
                      "value": "percent"
                    },
                    {
                      "code": "value",
                      "value": "-20.00"
                    },
                    {
                      "code": "value_cap",
                      "value": "-200.00"
                    }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          ],
          ...
        }
      ]
    }
  }
}
```

---

### Apply Offer
Any offer that results in a change in the order value and/or quantity of items will be applied to the order quote and will be part of all order-level callbacks, i.e., `/on_init`, `/on_confirm`, `/on_status`, `/on_cancel`, `/on_update`:

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      ...
      "quote": {
        ...
        "breakup": [
          ...
          {
            "@ondc/org/item_id": "slab2",
            "title": "discount of ₹200",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-200.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "slab"
                    },
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          }
        ],
        ...
      }
    }
  }
}
```

---

### Reverse Offer
Since the "slab" offer resulted in reducing the order value, reversal of the offer will mean adding back the slab discount value, the aggregate of which should not exceed the corresponding slab discount.

For example, the "slab2" offer above reduced the order value by ₹200; this means reversal of the offer can add back, in aggregate, a maximum of ₹200 to the order value.

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      "id": "O1",
      ...
      "fulfillments": [
        {
          "id": "F1",
          ...
        },
        {
          "id": "C1",
          ...
          "tags": [
            ...
            {
              "code": "quote_trail",
              "list": [
                {
                  "code": "type",
                  "value": "offer"
                },
                {
                  "code": "id",
                  "value": "slab2"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "150.00"
                }
              ]
            },
            ...
          ]
        }
      ],
      "quote": {
        ...
        "breakup": [
          ...
          {
            "@ondc/org/item_id": "slab2",
            "title": "rolling back ₹60 from offered discount",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-50.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "slab"
                    },
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```

Here’s the provided content converted into Markdown format:

```markdown
## Offer (Slab) - 0094

### Publish Offer
SNP publishes the offer in full or incremental catalog refresh:

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "catalog": {
      ...
      "bpp/providers": [
        {
          "id": "P1",
          ...
          "items": [
            {
              "id": "I1",
              ...
            },
            {
              "id": "I2",
              ...
            },
            {
              "id": "I3",
              ...
            }
          ],
          "offers": [
            {
              "id": "slab1",
              "descriptor": {
                "code": "slab",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "category_ids": [
                ...
              ],
              "item_ids": [
                "I1"
              ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [
                    {
                      "code": "item_count",
                      "value": "6"
                    },
                    {
                      "code": "item_count_upper",
                      "value": "9"
                    }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    {
                      "code": "value_type",
                      "value": "percent"
                    },
                    {
                      "code": "value",
                      "value": "-10.00"
                    },
                    {
                      "code": "value_cap",
                      "value": "-100.00"
                    }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            },
            {
              "id": "slab2",
              "descriptor": {
                "code": "slab",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "item_ids": [
                "I1"
              ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [
                    {
                      "code": "item_count",
                      "value": "10"
                    },
                    {
                      "code": "item_count_upper",
                      "value": ""
                    }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    {
                      "code": "value_type",
                      "value": "percent"
                    },
                    {
                      "code": "value",
                      "value": "-20.00"
                    },
                    {
                      "code": "value_cap",
                      "value": "-200.00"
                    }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          ],
          ...
        }
      ]
    }
  }
}
```

---

### Apply Offer
Any offer that results in a change in the order value and/or quantity of items will be applied to the order quote and will be part of all order-level callbacks, i.e., `/on_init`, `/on_confirm`, `/on_status`, `/on_cancel`, `/on_update`:

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      ...
      "quote": {
        ...
        "breakup": [
          ...
          {
            "@ondc/org/item_id": "slab2",
            "title": "discount of ₹200",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-200.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "slab"
                    },
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          }
        ],
        ...
      }
    }
  }
}
```

---

### Reverse Offer
Since the "slab" offer resulted in reducing the order value, reversal of the offer will mean adding back the slab discount value, the aggregate of which should not exceed the corresponding slab discount.

For example, the "slab2" offer above reduced the order value by ₹200; this means reversal of the offer can add back, in aggregate, a maximum of ₹200 to the order value.

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      "id": "O1",
      ...
      "fulfillments": [
        {
          "id": "F1",
          ...
        },
        {
          "id": "C1",
          ...
          "tags": [
            ...
            {
              "code": "quote_trail",
              "list": [
                {
                  "code": "type",
                  "value": "offer"
                },
                {
                  "code": "id",
                  "value": "slab2"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "150.00"
                }
              ]
            },
            ...
          ]
        }
      ],
      "quote": {
        ...
        "breakup": [
          ...
          {
            "@ondc/org/item_id": "slab2",
            "title": "rolling back ₹60 from offered discount",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-50.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "slab"
                    },
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```
# Offer (Combo) - 0095

## Publish Offer

SNP publishes offer, in full or incremental catalog refresh:

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ..
  },
  "message": {
    "catalog": {
      ..
      "bpp/providers": [
        {
          "id": "P1",
          ..
          "items": [
            {
              "id": "I1",
              ..
            },
            {
              "id": "I2",
              ..
            },
            {
              "id": "I3",
              ..
            }
          ],
          "offers": [
            {
              "id": "combo1",
              "descriptor": {
                "code": "combo",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "category_ids": [
                ..
              ],
              "item_ids": [
                "I1",
                "I2"
              ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [
                    {
                      "code": "item_id",
                      "value": "I4,I5"
                    }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    {
                      "code": "value_type",
                      "value": "percent"
                    },
                    {
                      "code": "value",
                      "value": "-50.00"
                    },
                    {
                      "code": "value_cap",
                      "value": "-200.00"
                    }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          ],
          ..
        }
      ]
    }
  }
}
```

## Apply Offer

Any offer that results in change in the order value and/or quantity of items will be applied to the order quote, and will be a part of all order-level callbacks, i.e., `/on_init`, `/on_confirm`, `/on_status`, `/on_cancel`, `/on_update`:

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    ..
  },
  "message": {
    "order": {
      ..
      "quote": {
        ..
        "breakup": [
          ..
          {
            "@ondc/org/item_id": "combo1",
            "title": "Flat discount of ₹200 on combo",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-200.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "combo"
                    },
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          }
        ],
        ..
      }
    }
  }
}
```

## Reverse Offer

Since the "combo" offer resulted in reducing the order value, reversal of the offer will mean adding back the combo discount value, the aggregate of which should not exceed the corresponding combo discount.

For example, the "combo1" offer above reduced the order value by ₹200; this means reversal of the offer can add back, in aggregate, a maximum of ₹200 to the order value:

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
      ..
      "fulfillments": [
        {
          "id": "F1",
          ..
        },
        {
          "id": "C1",
          ..
          "tags": [
            ..
            {
              "code": "quote_trail",
              "list": [
                {
                  "code": "type",
                  "value": "offer"
                },
                {
                  "code": "id",
                  "value": "combo1"
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
            },
            ..
          ]
        }
      ],
      "quote": {
        ..
        "breakup": [
          ..
          {
            "@ondc/org/item_id": "combo1",
            "title": "Recovery of ₹50 from offered discount",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-150.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    {
                      "code": "type",
                      "value": "order"
                    }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    {
                      "code": "type",
                      "value": "combo"
                    },
                    {
                      "code": "additive",
                      "value": "no"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```

# Offer (Delivery) - 0096

## Publish Offer
SNP publishes offer, in full or incremental catalog refresh:

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "catalog": {
      ...
      "bpp/providers": [
        {
          "id": "P1",
          ...
          "items": [
            { "id": "I1", ... },
            { "id": "I2", ... },
            { "id": "I3", ... }
          ],
          "offers": [
            {
              "id": "delivery1",
              "descriptor": {
                "code": "delivery",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": ["L1"],
              "category_ids": [...],
              "item_ids": ["I1"],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "qualifier",
                  "list": [
                    { "code": "min_value", "value": "299.00" }
                  ]
                },
                {
                  "code": "benefit",
                  "list": [
                    { "code": "value_type", "value": "percent" },
                    { "code": "value", "value": "-100.00" },
                    { "code": "value_cap", "value": "-75.00" }
                  ]
                },
                {
                  "code": "meta",
                  "list": [
                    { "code": "additive", "value": "no" },
                    { "code": "auto", "value": "yes" }
                  ]
                }
              ]
            }
          ],
          ...
        }
      ]
    }
  }
}
```

## Apply Offer
Any offer that results in a change in the order value and/or quantity of items will be applied to the order quote and will be part of all order-level callbacks, i.e. `/on_init`, `/on_confirm`, `/on_status`, `/on_cancel`, `/on_update`:

```json
{
  "context": {
    "action": "on_select",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      ...
      "quote": {
        ...
        "breakup": [
          ...
          {
            "@ondc/org/item_id": "delivery1",
            "title": "Flat delivery discount of ₹75 on minimum cart value of ₹299",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "-75.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    { "code": "type", "value": "fulfillment" }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    { "code": "type", "value": "delivery" },
                    { "code": "additive", "value": "yes" },
                    { "code": "auto", "value": "yes" }
                  ]
                }
              ]
            }
          }
        ],
        ...
      }
    }
  }
}
```

## Reverse Offer
Since the "delivery" offer resulted in reducing the order value, reversal of the offer will mean adding back the delivery discount, the aggregate of which should not exceed the corresponding discount amount.

For example, the "delivery1" offer above reduced the order value by ₹75; this means reversal of the offer can add back, in aggregate, a maximum of ₹75 to the order value.

```json
{
  "context": {
    "action": "on_update",
    "core_version": "1.2.5",
    ...
  },
  "message": {
    "order": {
      "id": "O1",
      ...
      "fulfillments": [
        {
          "id": "F1",
          ...
        },
        {
          "id": "C1",
          ...
          "tags": [
            ...
            {
              "code": "quote_trail",
              "list": [
                { "code": "type", "value": "offer" },
                { "code": "id", "value": "delivery1" },
                { "code": "currency", "value": "INR" },
                { "code": "value", "value": "75.00" }
              ]
            },
            ...
          ]
        }
      ],
      "quote": {
        ...
        "breakup": [
          ...
          {
            "@ondc/org/item_id": "delivery1",
            "title": "recovery of ₹75 from offered discount",
            "@ondc/org/title_type": "offer",
            "price": {
              "currency": "INR",
              "value": "0.00"
            },
            "item": {
              "tags": [
                {
                  "code": "quote",
                  "list": [
                    { "code": "type", "value": "order" }
                  ]
                },
                {
                  "code": "offer",
                  "list": [
                    { "code": "type", "value": "delivery" },
                    { "code": "additive", "value": "yes" },
                    { "code": "auto", "value": "yes" }
                  ]
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```

# Offer (Exchange) - 0097

## SNP Publishes Offer
SNP publishes an offer, either as a full or incremental catalog refresh. The exchange flow is defined below:

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ..
  },
  "message": {
    "catalog": {
      ..
      "bpp/providers": [
        {
          "id": "P1",
          ..
          "items": [
            {
              "id": "I1",
              ..
            },
            {
              "id": "I2",
              ..
            },
            {
              "id": "I3",
              ..
            }
          ],
          "offers": [
            {
              "id": "exchange1",
              "descriptor": {
                "code": "exchange",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "category_ids": [
                ..
              ],
              "item_ids": [
                "I1"
              ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "yes"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          ],
          ..
        }
      ]
    }
  }
}
```

## Offer (Financing) - 0098

SNP publishes offer, in full or incremental catalog refresh; financing by SNP/seller will be in the SNP payment collection flow, defined here:

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ..
  },
  "message": {
    "catalog": {
      ..
      "bpp/providers": [
        {
          "id": "P1",
          ..
          "items": [
            {
              "id": "I1",
              ..
            },
            {
              "id": "I2",
              ..
            },
            {
              "id": "I3",
              ..
            }
          ],
          "offers": [
            {
              "id": "financing1",
              "descriptor": {
                "code": "financing",
                "images": [
                  "https://snp.com/images/offer2-banner.webp"
                ]
              },
              "location_ids": [
                "L1"
              ],
              "category_ids": [
                ..
              ],
              "item_ids": [
                "I1"
              ],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "meta",
                  "list": [
                    {
                      "code": "additive",
                      "value": "yes"
                    },
                    {
                      "code": "auto",
                      "value": "yes"
                    }
                  ]
                }
              ]
            }
          ],
          ..
        }
      ]
    }
  }
}
```
