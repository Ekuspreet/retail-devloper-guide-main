# BNP Demand Signals - 025
- BNP demand signals include following info:
  - source of demand e.g. ONDC buyer app / external social media or search apps that provide deep linking to SNP store page thru banner or other targets;
  - search terms used by buyers to search for specific catalog items (may or may not be available in the catalog), to facilitate better supply planning by sellers;

---

**Payload changes**
```json
{
  "context": {
    "action": "search",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "intent": {
      "tags": [
        {
          "code": "bnp_demand_signal",
          "list": [
            { "code": "search_term", "value": "{\"sweater\"}" },
            { "code": "search_term", "value": "{\"winter wear\"}" },
            { "code": "search_term", "value": "{\"woollens\"}" }
          ]
        }
      ]
    }
  }
}
```

---

```json
{
  "context": {
    "action": "select",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "tags": [
        {
          "code": "bnp_demand_signal",
          "list": [
            { "code": "source", "value": "digihaat.com" },
            { "code": "campaign", "value": "RD76_sale" }
          ]
        }
      ]
    }
  }
}
```