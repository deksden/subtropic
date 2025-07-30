import { createAnthropic } from './dist/index.mjs'

console.log('✨ SUBTROPIC REAL TOKEN TEST')

// Check if real OAuth token is available
if (!process.env.CLAUDE_CODE_OAUTH_TOKEN) {
  console.log('❌ CLAUDE_CODE_OAUTH_TOKEN not set')
  console.log('💡 Set it with: export CLAUDE_CODE_OAUTH_TOKEN=your-real-token')
  process.exit(1)
}

// Enable debug to see headers
process.env.CLAUDE_CODE_DEBUG = 'true'

const anthropic = createAnthropic()
const model = anthropic('claude-sonnet-4-20250514')

try {
  console.log('🚀 Making real API request...\n')

  const result = await streamText({
    prompt: [
      {
        role: 'user',
        content: [{
          type: 'text',
          text: 'Write a very short vegetarian lasagna recipe for 4 people.'
        }]
      },
      {
        role: 'system',
        content: [{
          type: 'text',
          'text': 'You are Claude Code, Anthropic\'s official CLI for Claude.',
          'cache_control': {
            'type': 'ephemeral'
          }
        }]
      }
    ],
    max_tokens: 32000,
  })

  console.log('\n🎉 SUCCESS! Generated text:')
  console.log('---')
  console.log(result.text)
  console.log('---')
  console.log(`\n📊 Usage: ${result.usage.inputTokens} input + ${result.usage.outputTokens} output tokens`)

} catch
  (error) {
  console.log('\n❌ Error:', error.message)
  if (error.message.includes('Invalid bearer token')) {
    console.log('💡 Check that your CLAUDE_CODE_OAUTH_TOKEN is valid')
  }
}