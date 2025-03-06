# Return with pickup - 006

- Return of items can only be initiated within the return window for the item (as defined in the catalog) when the fulfillment state for the item is "Order-delivered";
- Return with pickup can have the following scenarios:
  - **Scenario A - Return approved, Return pick successful**:
    - Return_Initiated -> Return_Approved -> Return_Picked (refund triggered here) -> Return_Delivered;
    - Return_Initiated -> Return_Approved -> Return_Pick_Failed -> Return_Picked (refund triggered here) -> Return_Delivered;
  - **Scenario B - Return approved, Return failed**:
    - Return_Initiated -> Return_Approved -> Return_Pick_Failed -> Return_Failed;
  - **Scenario C - Return rejected**:
    - Return_Initiated -> Return_Rejected;
- It is assumed that the LSP assigned for return pickup will have a certain number of pickup attempts and will trigger Scenario B after all pickup attempts have failed;

### Buyer initiates return request (item I1, qty 1)

```json
{
  "context": {
    "action": "update",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "update_target": "item",
    "order": {
      "id": "O1",
      "fulfillments": [
        {
          "type": "Return",
          "tags": [
            {
              "code": "return_request",
              "list": [
                {
                  "code": "id",
                  "value": "R1"
                },
                {
                  "code": "item_id",
                  "value": "I1"
                },
                {
                  "code": "parent_item_id",
                  "value": "DI1"
                },
                {
                  "code": "item_quantity",
                  "value": "1"
                },
                {
                  "code": "reason_id",
                  "value": "003"
                },
                {
                  "code": "reason_desc",
                  "value": "detailed description for return"
                },
                {
                  "code": "images",
                  "value": "url_for_image1,url_for_image2"
                },
                {
                  "code": "ttl_approval",
                  "value": "PT24H"
                },
                {
                  "code": "ttl_reverseqc",
                  "value": "P3D"
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

### SNP sends interim status for return request

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
              "code": "Return_Initiated"
            }
          },
          "tags": [
            {
              "code": "return_request",
              "list": [
                {
                  "code": "item_id",
                  "value": "I1"
                },
                {
                  "code": "item_quantity",
                  "value": "1"
                },
                {
                  "code": "reason_id",
                  "value": "003"
                },
                {
                  "code": "reason_desc",
                  "value": "detailed description for return"
                },
                {
                  "code": "images",
                  "value": "url_for_image1,url_for_image2"
                },
                {
                  "code": "ttl_approval",
                  "value": "PT24H"
                },
                {
                  "code": "ttl_reverseqc",
                  "value": "P3D"
                },
                {
                  "code": "initiated_by",
                  "value": "bnp.com"
                }
              ]
            }
          ]
        }
      ],
      "quote": {
        "..": ""
      },
      "..": "",
      "updated_at": "2024-12-26T10:31:30.000Z"
    }
  }
}
```

### SNP approves request & wants items returned

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
          "@ondc/org/provider_name": "LSP courier 1",
          "state": {
            "descriptor": {
              "code": "Return_Approved"
            }
          },
          "start": {
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
            "time": {
              "range": {
                "start": "2024-12-26T10:00:00.000Z",
                "end": "2024-12-26T10:30:00.000Z"
              }
            }
          },
          "end": {
            "location": {
              "gps": "12.9563,77.6368",
              "address": {
                "locality": "Jayanagar 4th Block",
                "city": "Bengaluru",
                "area_code": "560076",
                "state": "KA"
              }
            }
          },
          "tags": [
            {
              "code": "return_request",
              "list": [
                {
                  "code": "item_id",
                  "value": "I1"
                },
                {
                  "code": "item_quantity",
                  "value": "1"
                },
                {
                  "code": "reason_id",
                  "value": "003"
                },
                {
                  "code": "reason_desc",
                  "value": "detailed description for return"
                },
                {
                  "code": "images",
                  "value": "url_for_image1,url_for_image2"
                },
                {
                  "code": "ttl_approval",
                  "value": "PT24H"
                },
                {
                  "code": "ttl_reverseqc",
                  "value": "P3D"
                },
                {
                  "code": "initiated_by",
                  "value": "bnp.com"
                }
              ]
            },
            {
              "code": "igm_request",
              "list": [
                {
                  "code": "id",
                  "value": "Issue1"
                }
              ]
            }
          ]
        }
      ],
      "quote": {
        "..": ""
      },
      "..": "",
      "updated_at": "2024-12-26T13:30:00.000Z"
    }
  }
}
```

### Return picked

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
            "count": 1
          }
        },
        {
          "id": "I1",
          "fulfillment_id": "R1",
          "quantity": {
            "count": 1
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
          "@ondc/org/provider_name": "LSP courier 1",
          "state": {
            "descriptor": {
              "code": "Return_Picked"
            }
          },
          "start": {
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
            "time": {
              "timestamp": "2024-12-27T10:15:00.000Z"
            }
          },
          "end": {
            "location": {
              "gps": "12.9563,77.6368",
              "address": {
                "locality": "Jayanagar 4th Block",
                "city": "Bengaluru",
                "area_code": "560076",
                "state": "KA"
              }
            }
          },
          "tags": [
            {
              "code": "return_request",
              "list": [
                {
                  "code": "item_id",
                  "value": "I1"
                },
                {
                  "code": "item_quantity",
                  "value": "1"
                },
                {
                  "code": "reason_id",
                  "value": "003"
                },
                {
                  "code": "reason_desc",
                  "value": "detailed description for return"
                },
                {
                  "code": "images",
                  "value": "url_for_image1,url_for_image2"
                },
                {
                  "code": "ttl_approval",
                  "value": "PT24H"
                },
                {
                  "code": "ttl_reverseqc",
                  "value": "P3D"
                },
                {
                  "code": "initiated_by",
                  "value": "bnp.com"
                }
              ]
            },
            {
              "code": "igm_request",
              "list": [
                {
                  "code": "id",
                  "value": "Issue1"
                }
              ]
            },
            {
              "code": "quote_trail",
              "list": [
                {
                  "code": "type",
                  "value": "item"
                },
                {
                  "code": "id",
                  "value": "I1"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "-170.00"
                }
              ]
            }
          ]
        }
      ],
      "quote": {
        "..": "",
        "breakup": [
          {
            "@ondc/org/item_id": "I1",
            "@ondc/org/item_quantity": {
              "count": 1
            },
            "title": "Atta",
            "@ondc/org/title_type": "item",
            "price": {
              "currency": "INR",
              "value": "170.00"
            },
            "item": {
              "price": {
                "currency": "INR",
                "value": "170.00"
              }
            }
          },
          ".."
        ],
        "..": ""
      },
      "..": "",
      "updated_at": "2024-12-27T12:00:00.000Z"
    }
  }
}
```

### Return pick attempted & failed, rescheduled

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
          "@ondc/org/provider_name": "LSP courier 1",
          "state": {
            "descriptor": {
              "code": "Return_Pick_Failed",
              "short_desc": "010"
            }
          },
          "start": {
            "time": {
              "range": {
                "start": "2024-12-27T10:00:00.000Z",
                "end": "2024-12-27T10:30:00.000Z"
              },
              "timestamp": "2024-12-27T10:15:00.000Z"
            }
          },
          "tags": [
            {
              "code": "return_request",
              "list": [
                {
                  "code": "item_id",
                  "value": "I1"
                },
                {
                  "code": "item_quantity",
                  "value": "1"
                },
                {
                  "code": "reason_id",
                  "value": "003"
                },
                {
                  "code": "reason_desc",
                  "value": "detailed description for return"
                },
                {
                  "code": "images",
                  "value": "url_for_image1,url_for_image2"
                },
                {
                  "code": "ttl_approval",
                  "value": "PT24H"
                },
                {
                  "code": "ttl_reverseqc",
                  "value": "P3D"
                },
                {
                  "code": "initiated_by",
                  "value": "bnp.com"
                }
              ]
            },
            {
              "code": "igm_request",
              "list": [
                {
                  "code": "id",
                  "value": "Issue1"
                }
              ]
            }
          ]
        }
      ],
      "quote": {
        "..": ""
      },
      "..": "",
      "updated_at": "2024-12-27T12:00:00.000Z"
    }
  }
}
```

### Return pick attempted, rejected

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
          "@ondc/org/provider_name": "LSP courier 1",
          "state": {
            "descriptor": {
              "code": "Return_Rejected",
              "short_desc": "rejection reason code"
            }
          },
          "start": {
            "time": {
              "range": {
                "start": "2024-12-27T10:00:00.000Z",
                "end": "2024-12-27T10:30:00.000Z"
              },
              "timestamp": "2024-12-27T11:00:00.000Z"
            }
          },
          "tags": [
            {
              "code": "return_request",
              "list": [
                {
                  "code": "item_id",
                  "value": "I1"
                },
                {
                  "code": "item_quantity",
                  "value": "1"
                },
                {
                  "code": "reason_id",
                  "value": "003"
                },
                {
                  "code": "reason_desc",
                  "value": "detailed description for return"
                },
                {
                  "code": "images",
                  "value": "url_for_image1,url_for_image2"
                },
                {
                  "code": "ttl_approval",
                  "value": "PT24H"
                },
                {
                  "code": "ttl_reverseqc",
                  "value": "P3D"
                },
                {
                  "code": "initiated_by",
                  "value": "bnp.com"
                }
              ]
            },
            {
              "code": "igm_request",
              "list": [
                {
                  "code": "id",
                  "value": "Issue1"
                }
              ]
            }
          ]
        }
      ],
      "quote": {
        "..": ""
      },
      "..": "",
      "updated_at": "2024-12-27T12:00:00.000Z"
    }
  }
}
```

### Return delivered

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
            "count": 1
          }
        },
        {
          "id": "I1",
          "fulfillment_id": "R1",
          "quantity": {
            "count": 1
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
          "@ondc/org/provider_name": "LSP courier 1",
          "state": {
            "descriptor": {
              "code": "Return_Delivered"
            }
          },
          "start": {
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
            "time": {
              "timestamp": "2024-12-27T10:15:00.000Z"
            }
          },
          "end": {
            "location": {
              "gps": "12.9563,77.6368",
              "address": {
                "locality": "Jayanagar 4th Block",
                "city": "Bengaluru",
                "area_code": "560076",
                "state": "KA"
              }
            },
            "time": {
              "timestamp": "2024-12-28T11:00:00.000Z"
            }
          },
          "tags": [
            {
              "code": "return_request",
              "list": [
                {
                  "code": "item_id",
                  "value": "I1"
                },
                {
                  "code": "item_quantity",
                  "value": "1"
                },
                {
                  "code": "reason_id",
                  "value": "003"
                },
                {
                  "code": "reason_desc",
                  "value": "detailed description for return"
                },
                {
                  "code": "images",
                  "value": "url_for_image1,url_for_image2"
                },
                {
                  "code": "ttl_approval",
                  "value": "PT24H"
                },
                {
                  "code": "ttl_reverseqc",
                  "value": "P3D"
                },
                {
                  "code": "initiated_by",
                  "value": "bnp.com"
                }
              ]
            },
            {
              "code": "igm_request",
              "list": [
                {
                  "code": "id",
                  "value": "Issue1"
                }
              ]
            },
            {
              "code": "quote_trail",
              "list": [
                {
                  "code": "type",
                  "value": "item"
                },
                {
                  "code": "id",
                  "value": "I1"
                },
                {
                  "code": "currency",
                  "value": "INR"
                },
                {
                  "code": "value",
                  "value": "-170.00"
                }
              ]
            }
          ]
        }
      ],
      "quote": {
        "..": ""
      },
      "..": "",
      "updated_at": "2024-12-28T12:00:00.000Z"
    }
  }
}
```

### Settlement trail for refund initiation

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
      "fulfillments": [
        {
          "id": "R1",
          "type": "Return"
        }
      ],
      "payment": {
        "@ondc/org/settlement_details": [
          {
            "settlement_counterparty": "buyer",
            "settlement_phase": "refund",
            "settlement_type": "upi",
            "settlement_amount": "170.00",
            "settlement_timestamp": "2024-12-27T12:00:00.000Z"
          }
        ]
      }
    }
  }
}
```