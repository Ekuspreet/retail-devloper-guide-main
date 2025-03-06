# Offers

## **Offer Construct**
Offers are structured based on the following key components:

1. **Applicability Criteria**:
   - **Defines where, when, and on what offers may be applicable**:
     - **Location(s)**
     - **Categories**
     - **Item(s)**
     - **Time period validity**
   - **Rules for applicability**:
     - Intersection of attributes (e.g., location, categories, and time).
     - Union within multi-valued attributes (e.g., location L1 or L2).

2. **Qualifier**:
   - Criteria determining eligibility, based on cart value.

3. **Benefit**:
   - The advantage provided to the buyer.

4. **Meta Information**:
   - Determines if an offer requires explicit **buyer opt-in**.
   - Defines whether an offer **can be combined** with other offers.

5. **Additional Information**:
   - Includes **offer ID, type, and images**.

---

## **Offer Flows**

### **Publish Offer**
- **SNP publishes offers** in full or incremental catalog refresh.
- **BNP displays offers** for buyer discovery.
- Offers are **templatized** with dynamic values (qualifier, benefit).

### **Apply Offer**
- **SNP applies offers** dynamically at checkout.
- **Offer validation and eligibility check**:
  - Offers may apply automatically.
  - Buyer can **remove auto-applied offers**.
  - Offers providing **monetary benefits** appear in the **order quote**.

- **Cart Level Offers**:
  - Applied at the **order level** in the quote.
  - Allocated across individual line items.
  - **Reversal conditions** must be explicitly defined in `quote_trail`.

### **Reverse Offer**
- If an **offer qualifier** is no longer valid post-order, SNP may reverse the offer **partially or fully**.

### **Exception Conditions**
  - If offer is no longer valid in pre-order APIs (`/on_init`, `/on_confirm`), SNP sends error code `30006`
  - If offer is valid but cannot be fulfilled (e.g., freebie item unavailable), SNP sends error code `30007`
  - If offer is invalid or unfulfillable in `/on_confirm`, SNP should cancel the order

---

## **Offer Template**
Offers follow this standardized template (**M - Mandatory, O - Optional, N/A - Not Applicable**):

| # | Offer Type | Min Value | Item Count | Item Count Upper | Item ID | Value | Value Type | Value Cap | Additional Item Count | Additional Item ID | Item Value | Additive | Auto |
|---|-----------|-----------|------------|------------------|---------|-------|------------|-----------|---------------------|------------------|------------|----------|------|
| 1 | Discount | O | N/A | N/A | N/A | M | M | O | N/A | N/A | N/A | M | M |
| 2 | BuyXGetY | O | M | N/A | N/A | N/A | N/A | N/A | M | O | M | M | M |
| 3 | Freebie | O | N/A | N/A | N/A | N/A | N/A | N/A | M | M | N/A | M | M |
| 4 | Slab | O | M | M | N/A | M | M | M | N/A | N/A | N/A | M | M |
| 5 | Combo | O | N/A | N/A | M | M | M | M | N/A | N/A | N/A | M | M |
| 6 | Delivery | O | N/A | N/A | N/A | M | M | O | N/A | N/A | N/A | M | M |
| 7 | Exchange | O | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | M | M |
| 8 | Financing | O | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | M | M |

---

## **Offer Type Definitions**
- **Discount**: A discount percent or amount applied to the cart value, with or without a cap.
- **BuyXGetY**: For every `X` items purchased, `Y` items are provided.
- **Freebie**: Minimum order value required to receive a **free item**.
- **Slab**: Discount applied **based on item quantity range**.
- **Combo**: Discount on a **primary item** when purchased with **secondary items**.
- **Delivery**: Discount applied to **delivery charges**.
- **Exchange**: Existing buyer-owned items can be **traded for catalog items**.
- **Financing**: **SNP financing** available for one or more catalog items.

---

## **Qualifier Definitions**
- **Min Value**: Minimum **cart value** required for offer.
- **Item Count**: Minimum number of items required.
- **Item Count Upper**: Maximum number of items eligible.
- **Item ID**: Secondary item(s) required for the offer.

---

## **Benefit Definitions**
- **Value**: Discount amount applied.
- **Value Type**: `"percent"`, `"amount"`.
- **Value Cap**: Maximum discount value.
- **Item Count**: Additional item quantity provided.
- **Item ID**: Item given as part of the offer.
- **Item Value**: Monetary value of the item.

---

## **Meta Definitions**
- **Additive**: Determines if the offer **can be combined** with other offers.
- **Auto**: Defines if the offer **is auto-applied**.