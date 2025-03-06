# Seller Creds - 017

- **Adding Seller Credentials**:  
  - Providers can include their credentials in the catalog using `bpp/providers.creds[]`.  
  - These credentials can be used to tag specific sellers under Government schemes (e.g., **ODOP**, **Women-Owned Business**, **Tribal-Owned Business**).  
  - Credentials can also serve as unique identifiers for sellers across the network.  

- **Order-Level Identification**:  
  - Adding credentials to an order allows identification of sellers for potential **incentivization** programs.  

---

**Payload changes**

```json
{
  "context": {
    "action": "on_confirm",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "id": "O1",
      "provider": {
        "creds": [
          {
            "descriptor": {
              "code": "ESG-12345678",
              "short_desc": "ESG-12345678-FF"
            }
          }
        ]
      }
    }
  }
}
```