# Tip Jar - Decentralized Tipping Platform

A decentralized tipping platform built on Arc Testnet that enables creators, developers, and open-source contributors to receive USDC tips instantly. Users can connect Web3 wallets such as MetaMask, Rabby, and OKX Wallet to send programmable USDC payments.

## Features

- **Wallet Connection**: Connect MetaMask, Rabby, OKX Wallet, and other Web3 wallets to Arc Testnet
- **Instant USDC Tips**: Send USDC payments directly to creator wallet addresses on-chain
- **Creator Profiles**: Set up and customize your creator profile with name, bio, and social links
- **Wallet-Based Profiles**: Creator profiles are wallet-based with localStorage storage (no database)
- **Transaction Tracking**: View transaction status and links to the Arc Explorer
- **Responsive Design**: Beautiful, modern UI that works on desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- A Web3 wallet (MetaMask, Rabby, OKX Wallet, etc.)
- Arc Testnet ETH for gas fees (get from [Arc Testnet Faucet](https://faucet.circle.com/))
- USDC tokens on Arc Testnet

### Installation

1. Clone the repository and install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

### For Supporters (Sending Tips)

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the top right
   - Select your Web3 wallet (MetaMask, Rabby, OKX, etc.)
   - Approve the connection

2. **View Your Balance**
   - Go to Dashboard to see your ETH and USDC balances
   - You need Arc Testnet ETH for gas fees

3. **Send a Tip**
   - Enter the creator's wallet address in the "Send Tips" section
   - Click Search to view their profile
   - Enter the tip amount in USDC
   - Click "Send Tip" and approve the transaction in your wallet
   - Transaction will be confirmed on the Arc blockchain

### For Creators (Receiving Tips)

1. **Set Up Your Profile**
   - Connect your wallet and go to Dashboard
   - Click "Edit Profile" on your creator profile card
   - Add your name, bio, and optional social links (Twitter, GitHub, Website)
   - Click "Save Profile"

2. **Share Your Profile**
   - Your profile is accessible at `yoursite.com/creator/[YOUR_WALLET_ADDRESS]`
   - Share this link with supporters
   - They can visit and send you tips directly

3. **Receive Tips**
   - Tips are sent directly to your wallet as USDC
   - Transactions are recorded on the Arc blockchain
   - View all tips sent to you on your creator profile

## Project Structure

```
app/
├── page.tsx                 # Landing page
├── layout.tsx               # Root layout with metadata
├── providers.tsx            # Web3 providers (wagmi, RainbowKit)
├── globals.css              # Global styles and design tokens
├── dashboard/
│   ├── page.tsx            # Dashboard for users
│   └── edit-profile/
│       └── page.tsx        # Edit creator profile
└── creator/
    └── [address]/
        └── page.tsx        # Public creator profile page

components/
├── wallet-connect-button.tsx    # Wallet connection UI
├── wallet-balance.tsx           # Display ETH and USDC balance
├── creator-profile.tsx          # Display creator info
├── tip-form.tsx                 # Form to send tips
├── creator-profile-editor.tsx   # Edit profile form

lib/
├── wagmi.ts                 # Wagmi configuration
├── arc-config.ts            # Arc chain configuration
├── usdc-abi.ts              # USDC token ABI
├── storage.ts               # localStorage helpers
├── hooks.ts                 # Custom React hooks
```

## Technology Stack

- **Frontend**: Next.js 16 with App Router
- **Web3**: wagmi v3 + viem for wallet management
- **Styling**: TailwindCSS v4 + shadcn/ui components
- **Blockchain**: Arc Testnet (EVM-compatible)
- **State Management**: React Query + localStorage
- **UI Components**: Lucide icons + custom components

## Arc Testnet Configuration

- **Chain ID**: 5042002
- **RPC URL**: https://rpc.testnet.arc.network
- **Explorer**: https://testnet.arcscan.app
- **Faucet**: https://faucet.circle.com/
- **USDC Address**: 0x3600000000000000000000000000000000000000 (Arc Testnet)

## Key Features Implementation

### Wallet Connection

Uses wagmi v3 with RainbowKit for multi-wallet support:
- MetaMask
- Rabby Wallet
- OKX Wallet
- And any EIP-6963 compatible wallet

### USDC Transfers

Implements direct ERC20 USDC transfers using wagmi's `useWriteContract` hook:
- No intermediaries or fees (only gas)
- Direct wallet-to-wallet transfers
- Real-time transaction tracking

### Creator Profiles

Wallet-based profiles with localStorage storage:
- No database backend required
- Profile data stored locally on user's browser
- Name, bio, and social links stored per wallet
- Shareable profile links

## Future Enhancements

- QR code generation for easy sharing
- Recurring/subscription tips
- Tip history and analytics
- Creator discovery page
- Tip notifications
- IPFS/Arweave persistent profile storage
- Integration with more chains
- Admin dashboard for analytics

## Environment Variables

The app uses the following environment variables (configured via wagmi):

- `NEXT_PUBLIC_WAGMI_PROJECT_ID`: WalletConnect project ID (set to: `2daec776cb81d7054e61c88d8e8e0482`)

## Security Considerations

- All transactions are on-chain and immutable
- Wallet connection uses industry-standard RainbowKit
- No private keys are stored or transmitted by the app
- Creator profiles are stored locally (not synced until enhanced in future versions)
- Always verify contract addresses before interacting

## Testing Tips

1. **Get Testnet ETH**: Visit the [Arc Testnet Faucet](https://faucet.circle.com/)
2. **Get Testnet USDC**: Bridge or swap ETH for USDC on Arc Testnet
3. **Test Tipping**: Create a second wallet/account to test sending tips
4. **Profile Testing**: Switch between wallets to test different creator profiles

## Contributing

Feel free to open issues and pull requests! Areas for contribution:

- UI/UX improvements
- Additional blockchain integrations
- Performance optimizations
- Testing and bug fixes
- Documentation

## License

MIT

## Support

For issues and questions, please open a GitHub issue or contact the development team.

---

Built with ❤️ for creators on Arc Testnet
