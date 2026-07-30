/**
 * CCTP Attestation Endpoint
 * Fetches Circle attestation for cross-chain messages
 * GET /api/cctp/attestation?messageHash=0x...
 */

import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { CIRCLE_ATTESTATION_API } from '@/lib/cctp-config'

/**
 * GET - Fetch attestation from Circle API
 */
export async function GET(request: NextRequest) {
  try {
    // Get messageHash from query params
    const searchParams = request.nextUrl.searchParams
    const messageHash = searchParams.get('messageHash')

    // Validate messageHash
    if (!messageHash) {
      return NextResponse.json(
        { error: 'messageHash parameter is required' },
        { status: 400 }
      )
    }

    if (!messageHash.startsWith('0x') || messageHash.length !== 66) {
      return NextResponse.json(
        { error: 'Invalid messageHash format' },
        { status: 400 }
      )
    }

    console.log('[v0] Fetching attestation for hash:', messageHash)

    // Fetch attestation from Circle API
    const response = await axios.get(
      `${CIRCLE_ATTESTATION_API}/attestations/${messageHash}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )

    // Return attestation response
    return NextResponse.json(
      {
        success: true,
        attestation: response.data?.attestation || null,
        status: response.data?.status || 'pending',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Attestation endpoint error:', error)

    // Handle specific axios errors
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return NextResponse.json(
          {
            success: false,
            message: 'Attestation not found - transfer may still be processing',
            status: 'pending',
          },
          { status: 202 } // 202 Accepted - processing
        )
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch attestation from Circle API',
        },
        { status: error.response?.status || 500 }
      )
    }

    // Generic error handling
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while fetching attestation',
      },
      { status: 500 }
    )
  }
}

/**
 * POST - Poll for attestation with retries (alternative method)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messageHash, maxWaitTime = 30000 } = body

    if (!messageHash) {
      return NextResponse.json(
        { error: 'messageHash is required' },
        { status: 400 }
      )
    }

    console.log('[v0] Polling for attestation:', messageHash)

    // Poll for attestation
    const startTime = Date.now()
    let attestation = null
    let lastError = null

    while (Date.now() - startTime < maxWaitTime) {
      try {
        const response = await axios.get(
          `${CIRCLE_ATTESTATION_API}/attestations/${messageHash}`,
          {
            headers: { Accept: 'application/json' },
          }
        )

        if (response.data?.attestation) {
          attestation = response.data.attestation
          break
        }
      } catch (error) {
        lastError = error
        // Continue polling if 404 (not ready yet)
        if (axios.isAxiosError(error) && error.response?.status !== 404) {
          throw error
        }
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    if (attestation) {
      return NextResponse.json(
        {
          success: true,
          attestation,
          message: 'Attestation found',
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Attestation not available within timeout period',
        lastError: lastError ? (lastError as Error).message : null,
      },
      { status: 202 }
    )
  } catch (error) {
    console.error('[v0] Attestation polling error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Error polling for attestation',
      },
      { status: 500 }
    )
  }
}
