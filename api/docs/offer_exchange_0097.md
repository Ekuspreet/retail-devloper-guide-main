# Offer (exchange) - 0097

## Publish Offer
SNP publishes an offer, either in a full or incremental catalog refresh. The exchange flow is defined here.

#### Offer Definition
```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    "..": ".."
  },
  "message": {
    "catalog": {
      "..": "..",
      "bpp/providers": [
        {
          "id": "P1",
          "..": "..",
          "items": [
            { "id": "I1", "..": ".." },
            { "id": "I2", "..": ".." },
            { "id": "I3", "..": ".." }
          ],
          "offers": [
            {
              "id": "exchange1",
              "descriptor": {
                "code": "exchange",
                "images": [
                  "https://snp.com/images/offer1-banner.webp"
                ]
              },
              "location_ids": ["L1"],
              "category_ids": [".."],
              "item_ids": ["I1"],
              "time": {
                "label": "valid",
                "range": {
                  "start": "2025-01-01T16:00:00.000Z",
                  "end": "2025-01-01T23:00:00.000Z"
                }
              },
              "tags": [
                {
                  "code": "meta",
                  "list": [
                    { "code": "additive", "value": "yes" },
                    { "code": "auto", "value": "yes" }
                  ]
                }
              ]
            }
          ],
          "..": ".."
        }
      ]
    }
  }
}
```