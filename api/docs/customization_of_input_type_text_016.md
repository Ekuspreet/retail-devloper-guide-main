# Customization of Input Type Text - 016

- **Customization Types**:  
  - **Selectable Customizations (`input="select"`)**:  
    - Used widely in **F&B** for predefined options (e.g., extra cheese, topping selection).  
  - **Free Text Customizations (`input="text"`)**:  
    - Allows buyers to enter custom text instructions for specific items or the order itself.  
    - Example: Engraving text for electronics (e.g., *"My personalized iPhone"*).  

---

**Payload changes**
```json
{
  "context": {
    "action": "select",
    "core_version": "1.2.5",
    "...": ""
  },
  "message": {
    "order": {
      "items": [
        {
          "id": "I1",
          "parent_item_id": "DI1",
          "tags": [
            {
              "code": "type",
              "list": [
                { "code": "type", "value": "item" }
              ]
            }
          ]
        },
        {
          "id": "C1",
          "parent_item_id": "DI1",
          "descriptor": {
            "tags": [
              {
                "code": "customization",
                "list": [
                  { "code": "input_text", "value": "My personalized iPhone" }
                ]
              }
            ]
          },
          "tags": [
            {
              "code": "type",
              "list": [
                { "code": "type", "value": "customization" }
              ]
            },
            {
              "code": "parent",
              "list": [
                { "code": "id", "value": "CG1" }
              ]
            }
          ]
        }
      ]
    }
  }
}
```