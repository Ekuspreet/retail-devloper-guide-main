# Item Unitized Count - 01A

- **Unitized Quantity for Multi-Pack Items**:  
  - **`unitized.count`**: Defines the **number of packs** in a multi-pack item.  
  - **`unitized.measure`**: Specifies the **quantity in a single pack**.  

---

**Payload changes**

### Unitized Quantity in `/on_search`
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
              "descriptor": {
                "name": "Calcium and Vitamin D3 tablets",
                "code": "1:XXXXXXXXXXXXX",
                "short_desc": "Calcium and Vitamin D3 tablets",
                "long_desc": "Calcium and Vitamin D3 tablets"
              },
              "quantity": {
                "unitized": {
                  "count": "3",
                  "measure": {
                    "unit": "unit",
                    "value": "15"
                  }
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