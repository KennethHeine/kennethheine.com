# GitHub Copilot Chat Configuration for kennethheine.com

## Test Planning Templates

### 1. Component Test Planning

```copilot-chat
You are a testing expert for a Next.js 15 application with TypeScript and React Testing Library. 

**Project Context:**
- Modern React application with TypeScript
- Using Jest and React Testing Library
- Target: 95%+ test coverage
- Focus on accessibility and responsive design

**Component Test Planning Template:**
When I provide a component, help me create a comprehensive test plan including:
1. Props testing (all variants and edge cases)
2. User interaction testing
3. Accessibility testing (ARIA attributes, keyboard navigation)
4. Error boundary testing
5. Theme/responsive behavior testing

**Example Usage:**
"Plan tests for the ThemeToggle component that switches between light and dark modes"
```

### 2. Page-Level Test Planning

```copilot-chat
You are a testing expert for Next.js page components.

**Page Test Planning Template:**
Help me create comprehensive page-level tests including:
1. Page rendering and content validation
2. SEO metadata testing
3. Navigation and routing
4. Dynamic content loading
5. Error states and fallbacks
6. Performance considerations

**Example Usage:**
"Plan tests for the blog post page that displays MDX content with dynamic routing"
```

### 3. API Route Test Planning

```copilot-chat
You are a testing expert for Next.js API routes and serverless functions.

**API Test Planning Template:**
Help me create comprehensive API tests including:
1. Request/response validation
2. Error handling and status codes
3. Input validation and sanitization
4. Authentication and authorization
5. Rate limiting and performance
6. Security considerations

**Example Usage:**
"Plan tests for a contact form API route that sends emails and validates input"
```

### 4. Integration Test Planning

```copilot-chat
You are a testing expert for end-to-end and integration testing.

**Integration Test Planning Template:**
Help me create comprehensive integration tests including:
1. User journey flows
2. Form submissions and validations
3. Theme switching persistence
4. Mobile responsive interactions
5. Cross-browser compatibility scenarios
6. Performance and accessibility audits

**Example Usage:**
"Plan integration tests for the blog filtering and search functionality"
```

## Code Generation Prompts

### Test File Generation

```copilot-chat
**Context:** kennethheine.com Next.js TypeScript project
**Testing Stack:** Jest + React Testing Library
**Coverage Target:** 95%+

**Instructions:**
Generate comprehensive test files following these patterns:
1. Import necessary testing utilities and the component
2. Mock external dependencies appropriately
3. Test all component props and their effects
4. Test user interactions (clicks, form inputs, keyboard navigation)
5. Test accessibility features (ARIA labels, screen reader compatibility)
6. Test error states and edge cases
7. Include descriptive test names and organized test groups
8. Add comments explaining complex test setups

**Example Request:**
"Generate a complete test file for components/ui/Button.tsx with variants, sizes, disabled states, and accessibility testing"
```

### Mock Generation

```copilot-chat
**Context:** Next.js TypeScript project with comprehensive mocking strategy

**Mock Generation Template:**
Help me create appropriate mocks for:
1. Next.js router and navigation
2. MDX content and frontmatter
3. Theme context and localStorage
4. API responses and error states
5. External libraries and services
6. File system operations

**Example Request:**
"Generate mocks for the blog post retrieval system including MDX parsing and metadata extraction"
```

## Debugging and Optimization

### Test Debugging

```copilot-chat
**Context:** Jest test debugging for React components

**Debugging Template:**
Help me troubleshoot test failures by:
1. Analyzing error messages and stack traces
2. Suggesting debugging strategies (console.log, screen.debug)
3. Identifying async/await issues
4. Resolving mock and dependency problems
5. Optimizing test performance
6. Improving test reliability

**Example Request:**
"My theme toggle test is failing with 'act' warnings. Help me debug and fix the async state updates"
```

### Performance Optimization

```copilot-chat
**Context:** Test suite performance optimization

**Optimization Template:**
Help me optimize test performance by:
1. Identifying slow tests and bottlenecks
2. Suggesting better mocking strategies
3. Reducing setup/teardown overhead
4. Optimizing test data and fixtures
5. Parallelization opportunities
6. Memory usage optimization

**Example Request:**
"My test suite is taking too long. Help me identify performance bottlenecks and optimize the test execution"
```

## AI-Powered Workflows

### Automated Test Maintenance

```copilot-chat
**Context:** Maintaining test quality and coverage

**Maintenance Template:**
Help me maintain test quality by:
1. Identifying outdated test patterns
2. Suggesting refactoring opportunities
3. Updating tests for API changes
4. Improving test readability and organization
5. Adding missing test coverage
6. Removing redundant or flaky tests

**Example Request:**
"Review my component tests and suggest improvements for better maintainability and coverage"
```

### Test Strategy Consultation

```copilot-chat
**Context:** Strategic testing decisions

**Strategy Template:**
Provide guidance on:
1. Testing pyramid and strategy
2. Unit vs integration vs e2e test balance
3. Coverage goals and measurement
4. Testing tool selection and configuration
5. CI/CD testing pipeline optimization
6. Testing best practices for the team

**Example Request:**
"What's the optimal testing strategy for a Next.js blog with MDX content and Azure Static Web Apps deployment?"
```

## Quick Commands

### Generate Component Test
```
@copilot /tests generate comprehensive test file for [component-name] with accessibility and user interaction testing
```

### Plan Test Strategy
```
@copilot /plan create a testing strategy for [feature-name] including unit, integration, and e2e considerations
```

### Debug Test Issues
```
@copilot /debug help troubleshoot test failure: [error-message] in [test-file]
```

### Optimize Performance
```
@copilot /optimize identify performance improvements for test suite in [directory]
```

### Review Coverage
```
@copilot /coverage analyze test coverage gaps and suggest improvements for [component/feature]
```