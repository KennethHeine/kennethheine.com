# Coding Agent Troubleshooting Guide

This guide helps resolve common issues with GitHub Copilot and AI-powered development tools in the kennethheine.com project.

## 🚨 Common Issues and Solutions

### 1. GitHub Copilot Not Working

#### Issue: Copilot suggestions not appearing
**Symptoms:**
- No inline suggestions in VS Code
- Copilot status shows "Disabled" or "Error"
- Chat responses are empty or unavailable

**Solutions:**
1. **Check Extension Status**
   ```bash
   # In VS Code Command Palette (Ctrl+Shift+P):
   > GitHub Copilot: Check Status
   ```

2. **Verify Authentication**
   ```bash
   # In VS Code Command Palette:
   > GitHub Copilot: Sign In
   ```

3. **Reset Copilot Settings**
   ```json
   // Add to .vscode/settings.json
   {
     "github.copilot.enable": {
       "*": true,
       "yaml": true,
       "plaintext": false,
       "markdown": true
     },
     "github.copilot.editor.enableAutoCompletions": true
   }
   ```

#### Issue: Copilot suggestions are irrelevant or poor quality
**Solutions:**
1. **Improve Context with Comments**
   ```typescript
   // Create a React component for a theme toggle button
   // that switches between light and dark modes
   // with smooth animations and accessibility support
   function ThemeToggle() {
     // Copilot will provide better suggestions with clear context
   }
   ```

2. **Use Descriptive Function Names**
   ```typescript
   // Better: specific and descriptive
   function calculateUserEngagementScore(posts: BlogPost[], timeframe: string) {
     // Copilot understands the intent better
   }
   
   // Worse: vague and unclear
   function calc(data: any[], param: string) {
     // Copilot has less context to work with
   }
   ```

### 2. MCP (Model Context Protocol) Issues

#### Issue: MCP configuration not loading
**Symptoms:**
- AI tools don't have project context
- Test generation is generic/not project-specific
- No workspace indexing

**Solutions:**
1. **Verify MCP Configuration**
   ```bash
   # Check if MCP config exists
   ls -la .vscode/mcp-config.json
   
   # Validate JSON syntax
   node -e "console.log(JSON.parse(require('fs').readFileSync('.vscode/mcp-config.json', 'utf8')))"
   ```

2. **Update VS Code Settings**
   ```json
   {
     "mcp.enable": true,
     "mcp.configPath": ".vscode/mcp-config.json",
     "mcp.contextSharing": {
       "enabled": true,
       "maxFiles": 100,
       "includeTests": true,
       "includeDocumentation": true
     }
   }
   ```

3. **Restart VS Code**
   ```bash
   # Close VS Code completely and reopen
   code . --disable-extensions --enable-extension github.copilot
   ```

### 3. Test Generation Issues

#### Issue: Generated tests are incomplete or incorrect
**Symptoms:**
- Test files have many TODO comments
- Tests don't follow project patterns
- Missing accessibility or edge case testing

**Solutions:**
1. **Use the Test Generation Script**
   ```bash
   # Generate comprehensive test template
   node scripts/test-generation.js generate components/ui/Button.tsx
   
   # Scan for untested components
   node scripts/test-generation.js scan
   ```

2. **Provide Better Context to Copilot**
   ```typescript
   // In test files, provide context comments:
   
   // This component uses React 19 features and Tailwind CSS v4
   // Test all button variants: primary, secondary, danger, ghost
   // Include accessibility testing with ARIA attributes
   // Test responsive behavior for mobile and desktop
   describe('Button Component', () => {
     // Copilot will generate better tests with this context
   });
   ```

3. **Use Copilot Chat for Complex Tests**
   ```
   @copilot Generate comprehensive tests for a Button component with:
   - Multiple variants (primary, secondary, danger, ghost)
   - Size options (sm, md, lg)
   - Disabled and loading states
   - Accessibility testing (ARIA, keyboard navigation)
   - Click event handling
   - Icon support
   ```

### 4. Performance Issues

#### Issue: Copilot is slow or unresponsive
**Symptoms:**
- Long delays for suggestions
- High CPU/memory usage
- VS Code becomes sluggish

**Solutions:**
1. **Optimize VS Code Settings**
   ```json
   {
     "mcp.performance": {
       "indexing": {
         "enabled": true,
         "incremental": true,
         "cache_duration": "24h"
       },
       "context_size": {
         "max_files": 50,
         "max_size_mb": 25,
         "prioritize_recent": true
       }
     }
   }
   ```

2. **Exclude Large Directories**
   ```json
   {
     "search.exclude": {
       "**/node_modules": true,
       "**/dist": true,
       "**/.next": true,
       "**/coverage": true,
       "**/.azure": true,
       "**/out": true
     }
   }
   ```

3. **Clear Copilot Cache**
   ```bash
   # In VS Code Command Palette:
   > GitHub Copilot: Clear Cache and Reload
   ```

### 5. Context and Security Issues

#### Issue: Copilot accessing sensitive files
**Symptoms:**
- AI suggestions include API keys or secrets
- Inappropriate context sharing
- Security warnings

**Solutions:**
1. **Update Security Configuration**
   ```json
   // In .vscode/mcp-config.json
   {
     "security": {
       "data_sharing": {
         "level": "project_only",
         "exclude_patterns": [
           "**/*.env*",
           "**/*.key",
           "**/*.pem",
           "**/secrets/**",
           "**/.azure/**"
         ]
       },
       "ai_access": {
         "read_only": true,
         "context_isolation": true,
         "audit_logging": true
       }
     }
   }
   ```

2. **Update .gitignore**
   ```gitignore
   # Ensure sensitive files are excluded
   .env*
   *.key
   *.pem
   secrets/
   .azure/
   ```

## 🔧 Environment Setup Validation

### Quick Health Check
Run this script to validate your coding agent setup:

```bash
#!/bin/bash
echo "🔍 Coding Agent Health Check"
echo "================================"

# Check VS Code extensions
if code --list-extensions | grep -q "github.copilot"; then
    echo "✅ GitHub Copilot extension installed"
else
    echo "❌ GitHub Copilot extension missing"
fi

if code --list-extensions | grep -q "github.copilot-chat"; then
    echo "✅ GitHub Copilot Chat extension installed"
else
    echo "❌ GitHub Copilot Chat extension missing"
fi

# Check configuration files
if [ -f ".vscode/settings.json" ]; then
    echo "✅ VS Code settings found"
    if grep -q "github.copilot.enable" .vscode/settings.json; then
        echo "✅ Copilot enabled in settings"
    else
        echo "⚠️ Copilot not configured in settings"
    fi
else
    echo "❌ VS Code settings not found"
fi

if [ -f ".vscode/mcp-config.json" ]; then
    echo "✅ MCP configuration found"
else
    echo "⚠️ MCP configuration missing"
fi

# Check test environment
cd static-web-app
if npm test -- --version >/dev/null 2>&1; then
    echo "✅ Test environment working"
else
    echo "❌ Test environment issues"
fi

echo "================================"
echo "🚀 Health check complete!"
```

### Automated Setup
Run the GitHub Actions workflow to validate environment:

```bash
# Trigger the copilot setup workflow
gh workflow run "Copilot Setup Steps" --repo KennethHeine/kennethheine.com
```

## 📚 Best Practices

### 1. Writing Better Prompts
```typescript
// ❌ Vague prompt
// Create a component

// ✅ Specific prompt with context
// Create a React component for displaying blog post metadata
// Include title, author, date, tags, and reading time
// Use TypeScript interfaces and Tailwind CSS v4
// Add accessibility attributes for screen readers
interface BlogPostMetaProps {
  title: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  readingTime: number;
}
```

### 2. Leveraging Copilot Chat
Use specific commands for better results:
- `@copilot /explain` - Explain complex code
- `@copilot /fix` - Fix errors or bugs  
- `@copilot /tests` - Generate test cases
- `@copilot /refactor` - Improve code structure
- `@copilot /docs` - Generate documentation

### 3. Maintaining Code Quality
```typescript
// Use ESLint rules to guide Copilot
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
// Copilot will suggest better type-safe alternatives

// Add JSDoc comments for better context
/**
 * Calculates the reading time for a blog post
 * @param content - The MDX content string
 * @param wordsPerMinute - Reading speed (default: 200)
 * @returns Reading time in minutes
 */
function calculateReadingTime(content: string, wordsPerMinute = 200): number {
  // Copilot has clear context about the function purpose
}
```

## 🆘 Getting Help

### 1. Community Resources
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code Copilot Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [Copilot Chat Guide](https://docs.github.com/en/copilot/github-copilot-chat)

### 2. Project-Specific Help
- Review `.vscode/copilot-chat-config.md` for prompt templates
- Check `docs/improvement-plan/phase-1-testing.md` for testing goals
- Use the test generation script: `node scripts/test-generation.js help`

### 3. Debugging Steps
1. **Check Copilot Status**: Use Command Palette → "GitHub Copilot: Check Status"
2. **Review Logs**: Help → Developer Tools → Console (filter by "copilot")
3. **Reset Configuration**: Reload VS Code with Copilot disabled, then re-enable
4. **Update Extensions**: Ensure all extensions are up to date
5. **Clear Cache**: Use Command Palette → "GitHub Copilot: Clear Cache and Reload"

Remember: The key to effective AI-assisted development is providing clear context and using the tools consistently with your project's patterns and standards.