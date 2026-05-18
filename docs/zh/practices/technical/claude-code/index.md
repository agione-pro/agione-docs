# 安装Claude Code并使用AGIOne作为模型提供商

## 安装 Claude Code

您可以使用以下任一方法安装 Claude Code：
### 1. Native Install (推荐)

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

> **提示**: Native 安装会自动在后台更新，保持使用最新版本。
### 2. Homebrew

```Bash
brew install --cask claude-code
```

> **提示**: Homebrew 安装不会自动更新。定期运行 `brew upgrade claude-code` 以获取最新功能和安全修复。
### 3. WinGet

```PowerShell
winget install Anthropic.ClaudeCode
```

> **提示**: WinGet 安装不会自动更新。定期运行 `winget upgrade Anthropic.ClaudeCode` 以获取最新功能和安全修复。

## 模型配置

1. 访问 [AGIOne](https://zh.agione.co)，并注册一个账号。
2. 前往模型广场，选择一个模型，进入 api 调用页面，获取*Api key*和*model id*。

### 配置说明（使用AGIOne作为模型提供商）

Claude Code 的配置文件位于 `~/.claude-code/settings.json`。如果该文件不存在，请手动创建。

### 基本配置模板

配置信息：
- *ANTHROPIC_BASE_URL*：`https://zh.agione.co`
- *ANTHROPIC_AUTH_TOKEN*：从AGIOne平台模型API调用页面 `认证 TOKEN` 中获取
- *ANTHROPIC_DEFAULT_HAIKU_MODEL*、*ANTHROPIC_DEFAULT_SONNET_MODEL*、*ANTHROPIC_DEFAULT_OPUS_MODEL*：从AGIOne平台模型API调用页面请求参数中获取`Model Id`
```JSON
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "env": {
    "ANTHROPIC_BASE_URL": "https://zh.agione.co",
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

### 开始使用 Claude Code
```Bash
cd your-project
claude
```
