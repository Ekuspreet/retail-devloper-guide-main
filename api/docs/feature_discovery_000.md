# Feature discovery - 000

Dynamic mechanism for BNP & SNP to mutually discover the features supported:

- All features supported by the protocol will be documented as part of the API contract;
- Features will be of 2 types:
  - "Baseline" - to be supported by all NPs;
  - "Enhanced" - NPs may prioritize & enable specific features, as per their business requirements;
- BNP will communicate the list of "enhanced" features that are supported, as part of (full catalog) /search;
- SNP will need to maintain the list of features supported by each BNP, so that order & post-order flows for a specific BNP can complete successfully;
- In case SNP sends payload for a function not supported by a BNP, BNP can NACK the response with error code 21001;
- New features will mostly start as "enhanced", but may move to "baseline" in a future version;
- With every change in the "baseline" list, Context.version will be updated;
- List of features is [here](?tab=t.l0ok918e7rc3#heading=h.bsfp9wulewwf);

**Payload changes**

```json
{
  "context": {
    "action": "search",
    "core_version": "1.2.5",
    "..": ""
  },
  "message": {
    "intent": {
      "..": "",
      "tags": [
        "..",
        {
          "code": "bap_features",
          "list": [
            {
              "code": "001",
              "value": "yes"
            },
            {
              "code": "002",
              "value": "yes"
            },
            {
              "code": "003",
              "value": "yes"
            },
            ".."
          ]
        }
      ]
    }
  }
}
```