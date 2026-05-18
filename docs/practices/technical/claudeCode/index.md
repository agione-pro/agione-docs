# Install Claude Code and use AGIOne as the model provider

## Install Claude Code

Install Claude Code using any of the following methods:
### 1. Native Install (Recommended)

**macOS, Linux, WSL:**
```Bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**
```PowerShell
irm https://claude.ai/install.ps1 | iex
```

**Windows CMD:**
```Plain
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

> Note: Native installations will automatically update in the background, keeping you on the latest version.
### 2. Homebrew

```Bash
brew install --cask claude-code
```

> Note: Homebrew installations do not update automatically. Run `brew upgrade claude-code` periodically for the latest features and security fixes.
### 3. WinGet

```PowerShell
winget install Anthropic.ClaudeCode
```

> Note: WinGet installations do not update automatically. Run `winget upgrade Anthropic.ClaudeCode` periodically for the latest features and security fixes.

## Model Configuration

1. Visit [AGIOne](https://tai.agione.co) and register an account.
2. Go to the model marketplace, select a model, enter the API Usage page, and obtain the *API key* and *model id*.

### Configuration instructions (Using AGIOne as the model provider)

Claude Code's configuration file is located at `~/.claude-code/settings.json`. If it doesn't exist, create it manually.

### Basic configuration template

Configuration information:
- *ANTHROPIC_BASE_URL*: `https://tai.agione.co`
- *ANTHROPIC_AUTH_TOKEN*: Obtain the `Certified TOKEN` from the AGIOne platform model API call page
- *ANTHROPIC_DEFAULT_HAIKU_MODEL*、*ANTHROPIC_DEFAULT_SONNET_MODEL*、*ANTHROPIC_DEFAULT_OPUS_MODEL*: Obtain the `Model Id` from the request parameters of the AGIOne platform model API call page
```JSON
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "env": {
    "ANTHROPIC_BASE_URL": "https://tai.agione.co",
    "ANTHROPIC_AUTH_TOKEN": "<agione-api-key>",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<agione-model-id>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<agione-model-id>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<agione-model-id>",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "2000000",
    "MAX_THINKING_TOKENS": "1024"
  }
}
```

### Get Started with Claude Code
```Bash
cd your-project
claude
```
