# Item Availability - 001  

For catalog items that are available, within specific timeslots, or currently out-of-stock, SNP may send item availability timings as part of the catalog.  

---

## Payload Changes  

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ..
  },
  "message": {
    "catalog": {
      "bpp/providers": [
        {
          "id": "P1",
          ..
          "items": [
            {
              "id": "I1",
              "time": {
                "label": "enable",
                "timestamp": "2025-01-07T07:30:00.000Z"
              },
              ..
              "tags": [
                {
                  "code": "timing",
                  "list": [
                    {
                      "code": "day_from",
                      "value": "1"
                    },
                    {
                      "code": "day_to",
                      "value": "5"
                    },
                    {
                      "code": "time_from",
                      "value": "1800"
                    },
                    {
                      "code": "time_to",
                      "value": "2200"
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