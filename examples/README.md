# @actionpackd/ignite-ai-sdk Examples

A collection of example applications showcasing different use cases and features of the @actionpackd/ignite-ai-sdk.

## Examples

### Chat Applications

#### [chat-openai](/chat-openai)
A simple chat interface using OpenAI's GPT models.
- **Stack**: Next.js, TypeScript, TailwindCSS
- **Difficulty**: Beginner
- **Features**: Chat, Streaming
- **Source**: [/chat-openai](/chat-openai)
- **Deploy**: Vercel, Netlify

### Basic RAG
Basic RAG implementation with vector similarity search.

- **Stack**: Next.js, TypeScript
- **Difficulty**: Intermediate
- **Features**: RAG, Vector Search
- **Source**: [/rag-basic](/rag-basic)
- **Deploy**: Vercel

### Basic Agent
Simple agent implementation with tool usage and step-by-step thinking.

- **Stack**: Next.js, TypeScript
- **Difficulty**: Intermediate
- **Features**: Agent, Tools
- **Source**: [/agent-basic](/agent-basic)
- **Deploy**: Vercel

### Examples Landing
Showcase landing page listing all AI SDK examples with UI cards and deploy options.

- **Stack**: Next.js, TypeScript, TailwindCSS
- **Difficulty**: Beginner
- **Features**: UI, Showcase
- **Source**: [/landing](/landing)
- **Deploy**: Vercel, Netlify

## Getting Started

### Prerequisites

1. Node.js 18+ and npm installed on your machine
2. An OpenAI API key (get one at https://platform.openai.com/api-keys)
3. Git installed on your machine

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/actionpackd/ignite-ai-sdk.git
cd ignite-ai-sdk
```

2. Install root dependencies
```bash
npm install
```

### Running Examples

#### Chat OpenAI Example

1. Navigate to the example directory
```bash
cd examples/chat-openai
```

2. Install example dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local and add your OpenAI API key
OPENAI_API_KEY=your-api-key-here
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:3000`

#### RAG Basic Example

1. Navigate to the example directory
```bash
cd examples/rag-basic
```

2. Install example dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local and add your OpenAI API key
OPENAI_API_KEY=your-api-key-here
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:3000`

#### Agent Basic Example

1. Navigate to the example directory
```bash
cd examples/agent-basic
```

2. Install example dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local and add your OpenAI API key
OPENAI_API_KEY=your-api-key-here
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:3000`

#### Landing Page Example

1. Navigate to the example directory
```bash
cd examples/landing
```

2. Install example dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## Deployment

All examples can be deployed to Vercel with one click using the deploy button in their respective directories. Some examples also support deployment to Netlify.

### Environment Variables for Deployment

Make sure to set these environment variables in your deployment platform:

- `OPENAI_API_KEY`: Your OpenAI API key (required for all examples except landing)
- `NEXT_PUBLIC_API_BASE_URL`: Your API base URL (if deploying to a custom domain)

### Vercel Deployment

1. Push your code to a GitHub repository
2. Visit vercel.com and create a new project
3. Import your repository
4. Set the required environment variables
5. Deploy

### Netlify Deployment

1. Push your code to a GitHub repository
2. Visit netlify.com and create a new site
3. Import your repository
4. Set the build command to `npm run build`
5. Set the publish directory to `.next`
6. Set the required environment variables
7. Deploy

## Troubleshooting

### Common Issues

1. **OpenAI API Key Issues**
   - Ensure your API key is correctly set in .env.local
   - Verify the API key has sufficient credits
   - Check if the key has the required permissions

2. **Build Errors**
   - Make sure you're using Node.js 18 or higher
   - Clear your npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

3. **Runtime Errors**
   - Check the browser console for error messages
   - Verify all environment variables are set correctly
   - Ensure all dependencies are installed

## Contributing

We welcome contributions! Please see our [contributing guide](../CONTRIBUTING.md) for details.
