# Rating  

As part of the catalog, fetch ratings for providers and items.  

## Payload Changes  

```json
{
  "context": {
    "action": "on_search",
    "core_version": "1.2.5",
    ..
  },
  "message": {
    "catalog": {
      ..
      "bpp/providers": [
        {
          "id": "P1",
          "rating": "4",
          ..
          "items": [
            {
              "id": "I1",
              "rating": "4",
              ..
            }
          ],
          ..
        }
      ]
    }
  }
}
```
---
# Fulfillment States & Mapping to Order States  

## Hyperlocal (P2P)  

| **Fulfillment State**  | **When to Assign State**   | **Order State**        |
|------------------------|---------------------------|------------------------|
| "Pending"             | Default fulfillment state | "Created" or "Accepted" |
| "Packed"              | Packed for shipping       | "In-progress"          |
| "Agent-assigned"      | Rider assigned           | "In-progress"          |
| "Order-picked-up"     | Order picked up by rider | "In-progress"          |
| "Out-for-delivery"    | Out for delivery         | "In-progress"          |
| "Order-delivered"     | Delivered                | "Completed"            |
| "Cancelled"          | Cancelled                 | "Cancelled"            |

---

## Intercity (P2H2P)  

| **Fulfillment State**  | **When to Assign State**   | **Order State**        |
|------------------------|---------------------------|------------------------|
| "Pending"             | Default fulfillment state | "Created" or "Accepted" |
| "Packed"              | Packed for shipping       | "In-progress"          |
| "Agent-assigned"      | Rider assigned           | "In-progress"          |
| "Out-for-pickup"      | Out for pickup           | "In-progress"          |
| "Pickup-failed"       | Pickup attempted but failed | "In-progress"       |
| "Order-picked-up"     | Picked up by rider       | "In-progress"          |
| "In-transit"         | At source hub             | "In-progress"          |
| "At-destination-hub" | At destination hub        | "In-progress"          |
| "Out-for-delivery"    | Out for delivery         | "In-progress"          |
| "Delivery-failed"     | Delivery attempted but failed | "In-progress"     |
| "Order-delivered"     | Delivered                | "Completed"            |
| "Cancelled"          | Cancelled                 | "Cancelled"            |

## RTO (Return to Origin)  

| **Fulfillment State**  | **When to Assign State**   | **Order State**        |
|------------------------|---------------------------|------------------------|
| "RTO-Initiated"       | When RTO has been initiated | Order state before RTO initiated |
| "RTO-Disposed"        | RTO terminal state when "return to origin" not required | "Cancelled" (if all fulfillments cancelled) or "Completed" |
| "RTO-Delivered"       | RTO terminal state when "return to origin" required  | "Cancelled" (if all fulfillments cancelled) or "Completed" |
