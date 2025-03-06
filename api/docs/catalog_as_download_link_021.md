# Catalog as Download Link - 021

- **Option for BNP to Request Catalog as a Downloadable Link**:  
  - BNP can specify if the **search response** should include an **authorized link** for downloading the catalog.  
  - The link has **limited time validity**.  
  - **Catalog ingestion errors** can be reported using a **catalog rejection report**.  

---

**Payload changes**

### BNP Requesting Catalog as a Link in `/search`
```json
{
  "context": {
    "action": "search",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "intent": {
      "payment": {
        "@ondc/org/buyer_app_finder_fee_type": "percent",
        "@ondc/org/buyer_app_finder_fee_amount": "3.54"
      },
      "tags": [
        {
          "code": "catalog_full",
          "list": [
            { "code": "payload_type", "value": "link" }
          ]
        },
        {
          "code": "bap_terms",
          "list": [
            { "code": "static_terms", "value": "" },
            { "code": "static_terms_new", "value": "https://github.com/ONDC-Official/NP-Static-Terms/buyerNP_BNP/1.0/tc.pdf" },
            { "code": "effective_date", "value": "2025-01-12T00:00:00.000Z" }
          ]
        }
      ]
    }
  }
}
```

---

### SNP Responding with Catalog Link in `/on_search`
```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "catalog": {
      "bpp/providers": [
        {
          "id": "P1",
          "tags": [
            {
              "code": "catalog_link",
              "list": [
                { "code": "type", "value": "link" },
                { "code": "type_value", "value": "https://snp.com/xjhjsfsdfs/s-12349.zip" },
                { "code": "type_validity", "value": "PT24H" },
                { "code": "last_update", "value": "2025-01-13T00:00:00.000Z" }
              ]
            }
          ]
        }
      ]
    }
  }
}
```