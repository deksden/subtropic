# AI SDK - Anthropic Provider

The **[Anthropic provider](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic)** for the [AI SDK](https://ai-sdk.dev/docs) contains language model support for the [Anthropic Messages API](https://docs.anthropic.com/claude/reference/messages_post).

## Setup

The Anthropic provider is available in the `@ai-sdk/anthropic` module. You can install it with

```
npm i @ai-sdk/anthropic
```

## Provider Instance

You can import the default provider instance `anthropic` from `@ai-sdk/anthropic`:

```ts
import { anthropic } from '@ai-sdk/anthropic';
```

## Example

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const { text } = await generateText({
  model: anthropic('claude-3-haiku-20240307'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Anthropic provider documentation](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic)** for more information.

## Development & Testing

### OAuth Authentication Support

This provider supports Claude Code OAuth authentication. When `CLAUDE_CODE_OAUTH_TOKEN` is set, the provider automatically:

- Uses Bearer authentication instead of API key
- Adds Claude Code specific headers and beta flags
- Includes `?beta=true` URL parameter
- Enables debug logging with `CLAUDE_CODE_DEBUG=true`

### Test Commands

```bash
# Run unit tests
pnpm test

# Test with demo OAuth token (shows headers, will fail with invalid token)
pnpm test:app

# Test with real OAuth token (requires CLAUDE_CODE_OAUTH_TOKEN)
export CLAUDE_CODE_OAUTH_TOKEN=your-token
pnpm test:app:real
```

### Debug Logging

Enable request logging by setting debug flags:

```bash
export CLAUDE_CODE_DEBUG=true
# or
export ANTHROPIC_DEBUG=true
```

This will log all request URLs and headers to the console.
