# Codified Static Terms - 01F

- **Definition of Codified Terms & Conditions**:  
  - Codified terms & conditions for SNP will be part of /on_search. If BNP doesn’t accept, they may not facilitate a transaction for the buyer with stores onboarded by the SNP;
  - If BNP doesn’t accept the terms & conditions in /on_confirm, they may NACK with error code 27501;

---

**Payload changes**

### Codified Terms in `/on_search`
```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "catalog": {
      "bpp/descriptor": {
        "tags": [
          {
            "code": "bpp_terms",
            "list": [
              { "code": "max_liability", "value": "2" },
              { "code": "max_liability_cap", "value": "10000" },
              { "code": "mandatory_arbitration", "value": "false" },
              { "code": "court_jurisdiction", "value": "Bengaluru" },
              { "code": "delay_interest", "value": "10.00" }
            ]
          }
        ]
      }
    }
  }
}
```

---

### Codified Terms in `/on_confirm`
```json
{
  "context": {
    "action": "on_confirm",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "tags": [
        {
          "code": "bpp_terms",
          "list": [
            { "code": "max_liability", "value": "2" },
            { "code": "max_liability_cap", "value": "10000" },
            { "code": "mandatory_arbitration", "value": "false" },
            { "code": "court_jurisdiction", "value": "Bengaluru" },
            { "code": "delay_interest", "value": "10.00" }
          ]
        }
      ]
    }
  }
}
```