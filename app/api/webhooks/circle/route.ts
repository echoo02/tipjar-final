import { NextRequest, NextResponse } from 'next/server'

/**
 * Circle Webhook Handler
 * 
 * This endpoint receives webhook events from Circle and processes them.
 * Supports events such as payment notifications, USDC transfer confirmations, etc.
 */

// Type definition for Circle webhook payload
interface CircleWebhookPayload {
  id?: string
  type?: string
  data?: Record<string, unknown>
  timestamp?: string
  [key: string]: unknown
}

/**
 * POST handler for Circle webhooks
 * 
 * @param request - The incoming webhook request from Circle
 * @returns JSON response with success status and appropriate HTTP status code
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the incoming JSON payload
    let payload: CircleWebhookPayload

    try {
      payload = await request.json()
    } catch (parseError) {
      // Return 400 for invalid JSON
      console.error('[Circle Webhook] Invalid JSON payload:', parseError)
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload' },
        { status: 400 }
      )
    }

    // Log the received webhook payload for debugging and monitoring
    console.log('[Circle Webhook] Received webhook event:', {
      id: payload.id,
      type: payload.type,
      timestamp: new Date().toISOString(),
      payload,
    })

    // Process the webhook based on event type
    const eventType = payload.type as string | undefined
    
    if (eventType) {
      switch (eventType) {
        case 'payment.created':
          console.log('[Circle Webhook] Processing payment.created event')
          break
        case 'payment.confirmed':
          console.log('[Circle Webhook] Processing payment.confirmed event')
          break
        case 'transfer.completed':
          console.log('[Circle Webhook] Processing transfer.completed event')
          break
        default:
          console.log(`[Circle Webhook] Unhandled event type: ${eventType}`)
      }
    }

    // TODO: Add your custom business logic here
    // - Validate webhook signature if Circle provides one
    // - Update database records
    // - Trigger notifications
    // - Process payment confirmations

    // Return 200 OK with success response
    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    // Log unexpected errors
    console.error('[Circle Webhook] Unexpected error:', {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    })

    // Return 500 for unexpected errors
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET handler for webhook health checks
 * Circle might use this to verify the endpoint is active
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { status: 'Circle webhook endpoint is active' },
    { status: 200 }
  )
}
