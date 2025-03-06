# Other baseline features - 000

Other baseline features include:

- **Catalog taxonomy changes**:
  - **Grocery (RET10)**:
    - Sub-category "Cleaning & Household" to be removed;
    - New sub-categories:
      - "Detergents and Dishwash" - for detergent bars / powders / liquids, dishwash bars / powders / liquids / paste, fabric pre & post wash;
  - **Fashion (RET12)**:
    - New catalog attribute - "style_code", to be provided by brands & will be a unique descriptor for branded products;
    - New sub-categories:
      - "Stoles & Scarves";
      - "Mufflers";
  - **Appliances (RET15)**:
    - Following sub-categories moved to BPC (RET13):
      - "Trimmer";
      - "Shaver";
      - "Epilator";
      - "Hair Straightener";
      - "Hair Dryer";
      - "Hair Curler";
      - "Hair Crimper";
  - **Home & Kitchen (RET16)**:
    - Sub-category "Cleaning Supplies" to be removed;
    - New sub-categories:
      - "Bins and Bathroom" - for disinfectant sprays & cleaners, buckets & mugs, dustbins, hangers, clips & rope, plasticware, soap cases & dispensers, toilet cleaner, floor cleaner;
      - "Car and Shoe Care" - for car polish & cleaners, shoe polish, shoe shiners & brushes;
      - "Disposables and Garbage Bags" - for kitchen rolls, paper napkins, wet wipes, toilet paper;
      - "Fresheners and Repellents" - for air fresheners, insect repellants, mosquito repellants;
      - "Mops, Brushes and Scrubs" - for brooms & dust pans, dust & cloth wipes, mops, utensil scrub pads, gloves, toilet & other brushes;
      - "Party and Festive Needs" - for caps, balloons & candles, decorations, disposable cups and plates, gifts, gift wraps & bags;
      - "Flowers" - for fresh flowers, artificial flowers;
      - "Pooja Needs" - for agarbatti, incense sticks, camphors & wicks, lamp & lamp oils, candles & matchboxes, pooja thalis, other pooja needs;
- **Rating**:
  - As part of the catalog, fetch ratings for providers and items;

**Payload changes**

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "catalog": {
      "..": "",
      "bpp/providers": [
        {
          "id": "P1",
          "rating": "4",
          "..": "",
          "items": [
            {
              "id": "I1",
              "rating": "4",
              "..": ""
            }
          ],
          "..": ""
        }
      ]
    }
  }
}
```
