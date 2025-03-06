# Minimum Item Quantity - 01B

- **Minimum Order Quantity for an Item**:  
  - Similar to the **maximum quantity**, **SNP** can specify the **minimum** order quantity required for an item.  

---

**Payload changes**

### Minimum Order Quantity in `/on_search`
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
          "items": [
            {
              "id": "I1",
              "quantity": {
                "available": {
                  "...": ""
                },
                "maximum": {
                  "...": ""
                },
                "minimum": {
                  "count": "99"
                }
              }
            }
          ]
        }
      ]
    }
  }
}
```