/**
 * Circle CCTP Smart Contract ABIs
 */

// TokenMessenger ABI - used for cross-chain transfers
export const TOKEN_MESSENGER_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint32', name: 'destinationDomain', type: 'uint32' },
      {
        internalType: 'bytes32',
        name: 'mintRecipient',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'burnToken',
        type: 'address',
      },
    ],
    name: 'depositForBurn',
    outputs: [
      {
        internalType: 'uint64',
        name: 'nonce',
        type: 'uint64',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'attestation',
        type: 'bytes',
      },
    ],
    name: 'receiveMessage',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

// MessageTransmitter ABI - used for attestation
export const MESSAGE_TRANSMITTER_ABI = [
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'attestation',
        type: 'bytes',
      },
    ],
    name: 'receiveMessage',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'messageHash',
        type: 'bytes32',
      },
    ],
    name: 'usedNonces',
    outputs: [
      {
        internalType: 'bool',
        name: 'used',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// Standard ERC20 ABI for approvals
export const ERC20_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const
