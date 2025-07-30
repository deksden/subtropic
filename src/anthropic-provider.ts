import {
  LanguageModelV2,
  NoSuchModelError,
  ProviderV2,
} from '@ai-sdk/provider';
import {
  FetchFunction,
  generateId,
  loadApiKey,
  withoutTrailingSlash,
} from '@ai-sdk/provider-utils';
import { AnthropicMessagesLanguageModel } from './anthropic-messages-language-model';
import { AnthropicMessagesModelId } from './anthropic-messages-options';
import { anthropicTools } from './anthropic-tools';

export interface AnthropicProvider extends ProviderV2 {
  /**
Creates a model for text generation.
*/
  (modelId: AnthropicMessagesModelId): LanguageModelV2;

  /**
Creates a model for text generation.
*/
  languageModel(modelId: AnthropicMessagesModelId): LanguageModelV2;

  chat(modelId: AnthropicMessagesModelId): LanguageModelV2;

  messages(modelId: AnthropicMessagesModelId): LanguageModelV2;

  /**
Anthropic-specific computer use tool.
   */
  tools: typeof anthropicTools;
}

export interface AnthropicProviderSettings {
  /**
Use a different URL prefix for API calls, e.g. to use proxy servers.
The default prefix is `https://api.anthropic.com/v1`.
   */
  baseURL?: string;

  /**
API key that is being sent using the `x-api-key` header.
It defaults to the `ANTHROPIC_API_KEY` environment variable.
Note: If `CLAUDE_CODE_OAUTH_TOKEN` is set, Bearer authentication will be used instead.
   */
  apiKey?: string;

  /**
Custom headers to include in the requests.
     */
  headers?: Record<string, string>;

  /**
Custom fetch implementation. You can use it as a middleware to intercept requests,
or to provide a custom fetch implementation for e.g. testing.
    */
  fetch?: FetchFunction;

  generateId?: () => string;
}

/**
Create an Anthropic provider instance.
 */
export function createAnthropic(
  options: AnthropicProviderSettings = {},
): AnthropicProvider {
  const baseURL =
    withoutTrailingSlash(options.baseURL) ?? 'https://api.anthropic.com/v1';

  const getHeaders = () => {
    const headers: Record<string, string> = {
      'anthropic-version': '2023-06-01',
    };

    // Check for Claude Code OAuth token first
    const oauthToken = process.env.CLAUDE_CODE_OAUTH_TOKEN;
    if (oauthToken) {
      headers['Authorization'] = `Bearer ${oauthToken}`;
      headers['x-app'] = 'cli';
      headers['User-Agent'] = 'claude-cli/1.0.63 (external, cli)';
      headers['Accept'] = 'application/json';
      headers['accept-language'] = '*';
      headers['anthropic-dangerous-direct-browser-access'] = 'true';
      headers['sec-fetch-mode'] = 'cors';
      headers['X-Stainless-Arch'] = 'arm64';
      headers['x-stainless-helper-method'] = 'stream';
      headers['X-Stainless-Lang'] = 'js';
      headers['X-Stainless-OS'] = 'MacOS';
      headers['X-Stainless-Package-Version'] = '0.55.1';
      headers['X-Stainless-Retry-Count'] = '0';
      headers['X-Stainless-Runtime'] = 'node';
      headers['X-Stainless-Runtime-Version'] = 'v22.14.0';
      headers['X-Stainless-Timeout'] = '60';
    } else if (options.apiKey || process.env.ANTHROPIC_API_KEY) {
      // Fallback to traditional API key
      headers['x-api-key'] = loadApiKey({
        apiKey: options.apiKey,
        environmentVariableName: 'ANTHROPIC_API_KEY',
        description: 'Anthropic',
      });
    }

    return {
      ...headers,
      ...options.headers,
    };
  };

  const createChatModel = (modelId: AnthropicMessagesModelId) =>
    new AnthropicMessagesLanguageModel(modelId, {
      provider: 'anthropic.messages',
      baseURL,
      headers: getHeaders,
      fetch: options.fetch,
      generateId: options.generateId ?? generateId,
      supportedUrls: () => ({
        'image/*': [/^https?:\/\/.*$/],
      }),
    });

  const provider = function (modelId: AnthropicMessagesModelId) {
    if (new.target) {
      throw new Error(
        'The Anthropic model function cannot be called with the new keyword.',
      );
    }

    return createChatModel(modelId);
  };

  provider.languageModel = createChatModel;
  provider.chat = createChatModel;
  provider.messages = createChatModel;

  provider.textEmbeddingModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: 'textEmbeddingModel' });
  };
  provider.imageModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: 'imageModel' });
  };

  provider.tools = anthropicTools;

  return provider;
}

/**
Default Anthropic provider instance.
 */
export const anthropic = createAnthropic();
