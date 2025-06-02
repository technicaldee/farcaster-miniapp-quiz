# Farcaster Mini App Quiz

A modern, interactive quiz application built as a Farcaster Frame mini-app using Next.js, React, and Tailwind CSS. This project demonstrates the integration of Farcaster's Frame SDK with a full-stack web application.

## 🚀 Features

- Interactive quiz interface with Farcaster Frame integration
- Modern UI components using Radix UI and Tailwind CSS
- Responsive design for all devices
- Type-safe development with TypeScript
- Form validation using React Hook Form and Zod
- Dark mode support
- Real-time updates and interactions

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Form Handling:** React Hook Form + Zod
- **Blockchain Integration:** Ethers.js
- **Farcaster Integration:** @farcaster/frame-sdk

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/farcaster-miniapp-quiz.git
cd farcaster-miniapp-quiz
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
# Add your environment variables here
```

## 🏃‍♂️ Running the Project

Development mode:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Build for production:
```bash
npm run build
# or
yarn build
# or
pnpm build
```

Start production server:
```bash
npm run start
# or
yarn start
# or
pnpm start
```

## 📁 Project Structure

```
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # Reusable components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── public/            # Static assets
├── styles/            # Additional styles
└── contracts/         # Smart contract related files
```

## 🔧 Configuration

The project uses several configuration files:

- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Farcaster](https://www.farcaster.xyz/) for the Frame SDK
- [Next.js](https://nextjs.org/) for the amazing framework
- [Radix UI](https://www.radix-ui.com/) for the accessible components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📍 Deployment

The application is deployed on the Celo Alfajores testnet with the following smart contracts:


### Quiz Rewards Contract
- **Contract Address:** `0xf6DB91402619C3D22678aDd3B10F495105690D95`
- **Purpose:** Handles quiz completion, user scores, and reward distribution
- **Explorer:** [View on Celo Explorer](https://alfajores.celoscan.io/address/0xf6DB91402619C3D22678aDd3B10F495105690D95)
