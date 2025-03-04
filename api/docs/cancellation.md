# Cancellation

## LSP Cancels
- LSP cancels logistics order using `/on_cancel`, with appropriate reason code and subscriber ID in `cancelled_by`.
- BNP initiates cancellation of retail order/fulfillment, cascading the cancellation reason from LSP.
- BNP requests state update for forward & RTO fulfillment, as applicable for the retail order.
- Cancellation charges, if any, will be communicated by BNP to SNP if SNP is liable for such charges:
  - State update & cancellation charges will be communicated to SNP using `/update` before the order reaches terminal state.
  - Cancellation charges will not be included in the order quote; separate keys will be provided for this.

## BNP Cancels
- BNP cancels retail and logistics orders using `/cancel`.
- BNP requests state update for forward & RTO fulfillment.
- Cancellation charges, if applicable, will be communicated to SNP using `/update`.

## SNP Cancels
- SNP cancels retail order/fulfillment using `/on_cancel`.
- BNP cancels logistics order, cascading the reason from SNP.
- BNP requests state update for forward & RTO fulfillment.
- Cancellation charges, if applicable, will be communicated to SNP using `/update`.

## Payload Changes

```json
{
  "context": { "action": "cancel", "core_version": "1.2.5", .. },
  "message": {
    "order_id": "O1",
    "cancellation_reason_id": "103",
    "descriptor": {
      "name": "fulfillment",
      "short_desc": "F1",
      "tags": [{ "code": "cancel_request", "list": [{ "code": "initiated_by", "value": "lsp.com" }] }]
    }
  }
}
```

```json
{
  "context": { "action": "on_cancel", "core_version": "1.2.5", .. },
  "message": {
    "order": {
      "id": "O1",
      "state": "In-progress",
      "fulfillments": [{
        "id": "F1",
        "type": "Delivery",
        "state": { "descriptor": { "code": "RTO" } },
        "tags": [{ "code": "cancel_request", "list": [{ "code": "rto_id", "value": "F1-RTO" }, { "code": "reason_id", "value": "103" }, { "code": "initiated_by", "value": "lsp.com" }] }]
      }],
      "updated_at": "2025-01-03T11:00:30.000Z"
    }
  }
}
```

```json
{
  "context": { "action": "update", "core_version": "1.2.5", .. },
  "message": {
    "update_target": "fulfillment",
    "order": {
      "id": "O1",
      "fulfillments": [{
        "id": "F1-RTO",
        "tags": [{ "code": "update_state", "list": [{ "code": "state", "value": "RTO-Delivered" }, { "code": "timestamp", "value": "2025-01-04T11:00:30.000Z" }] }]
      }]
    }
  }
}
```

```json
{
  "context": { "action": "on_update", "core_version": "1.2.5", .. },
  "message": {
    "order": {
      "id": "O1",
      "state": "Cancelled",
      "fulfillments": [{
        "id": "F1",
        "type": "Delivery",
        "state": { "descriptor": { "code": "RTO" } },
        "tags": [{ "code": "cancel_request", "list": [{ "code": "rto_id", "value": "F1-RTO" }, { "code": "reason_id", "value": "103" }, { "code": "initiated_by", "value": "lsp.com" }] }]
      }],
      "updated_at": "2025-01-03T11:00:30.000Z"
    }
  }
}
```

