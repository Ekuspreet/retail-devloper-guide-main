# Cancellation terms - 01E  
- Cancellation terms may be defined by SNP during pre-order flow:  
  - applies to cancellation by BNP or SNP;  
  - definition is at the fulfillment level and based on the fulfillment state & reason codes and includes associated cancellation fees (if any):  
  - cancellation fees, for order cancellation, will be the aggregate of cancellation fees for individual fulfillments;  
  - if cancellation terms are not acceptable to BNP, they may NACK the /on_init or /on_confirm callback, with error code 27501;  
- Actual cancellation fees are reflected in the order quote & quote trail, after cancellation of fulfillment or order;  
- With cancellation terms enabled, order cancellation, at the order / fulfillment level, may be enabled for all fulfillment states, after order has been placed ("Pending") and before it is delivered ("Order-delivered");

---

**Payload changes**

```json
{
  "context": {
    "action": "on_init",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "cancellation_terms": [
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Pending",
              "short_desc": "002"
            }
          },
          "cancellation_fee": {
            "percentage": "0.00",
            "amount": {
              "currency": "INR",
              "value": "0.00"
            }
          }
        },
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Packed",
              "short_desc": "001,003"
            }
          },
          "cancellation_fee": {
            "percentage": "10.00",
            "amount": {
              "currency": "INR",
              "value": "42.40"
            }
          }
        },
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Order-picked-up",
              "short_desc": "001,003"
            }
          },
          "cancellation_fee": {
            "percentage": "10.00",
            "amount": {
              "currency": "INR",
              "value": "42.40"
            }
          }
        },
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Out-for-delivery",
              "short_desc": "009"
            }
          },
          "cancellation_fee": {
            "percentage": "0.00",
            "amount": {
              "currency": "INR",
              "value": "0.00"
            }
          }
        },
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Out-for-delivery",
              "short_desc": "010,011,012,013,014,015"
            }
          },
          "cancellation_fee": {
            "percentage": "100.00"
          }
        }
      ]
    }
  }
}
```

---

### Confirm Cancellation Terms in `/on_confirm`
```json
{
  "context": {
    "action": "on_confirm",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "cancellation_terms": [
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Pending",
              "short_desc": "002"
            }
          },
          "cancellation_fee": {
            "amount": {
              "currency": "INR",
              "value": "0.00"
            }
          }
        },
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Packed",
              "short_desc": "001,003"
            }
          },
          "cancellation_fee": {
            "amount": {
              "currency": "INR",
              "value": "50.00"
            }
          }
        },
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Order-picked-up",
              "short_desc": "001,003"
            }
          },
          "cancellation_fee": {
            "amount": {
              "currency": "INR",
              "value": "50.00"
            }
          }
        },
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Out-for-delivery",
              "short_desc": "009"
            }
          },
          "cancellation_fee": {
            "amount": {
              "currency": "INR",
              "value": "0.00"
            }
          }
        },
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Out-for-delivery",
              "short_desc": "011,012,013,014,015"
            }
          },
          "cancellation_fee": {
            "amount": {
              "currency": "INR",
              "value": "100.00"
            }
          }
        }
      ]
    }
  }
}
```