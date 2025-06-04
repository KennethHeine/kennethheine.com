# Pull Request

## 📋 Description

<!-- Provide a clear and concise description of what this PR accomplishes -->

**What changes were made and why:**

<!-- Explain the motivation and context for these changes -->

## 🔄 Type of Change

<!-- Mark the type of change with an [x] -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation (changes to documentation only)
- [ ] 🔧 Refactoring (code changes that neither fix a bug nor add a feature)
- [ ] ⚡ Performance improvements
- [ ] 🧪 Tests (adding missing tests or correcting existing tests)
- [ ] 🔨 Build/CI (changes to build process or CI configuration)
- [ ] 💄 Style changes (formatting, missing semi colons, etc; no code logic change)

## 🧪 Testing

<!-- Describe how you tested these changes -->

**How changes were tested:**
- [ ] Manual testing in development environment
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Tested on multiple devices/browsers (if UI changes)

**Test coverage:**
- [ ] Code coverage maintained or improved
- [ ] All existing tests pass
- [ ] New tests cover edge cases

## ✅ Quality Checklist

<!-- Ensure all quality gates are met -->

### Code Quality
- [ ] Code follows established [coding standards](../docs/coding-standards.md)
- [ ] TypeScript types are properly defined
- [ ] No console.log statements in production code
- [ ] Code is self-documenting with clear variable/function names
- [ ] Complex logic is commented with JSDoc/TSDoc

### Testing & Validation
- [ ] `npm run check` passes (type-check, lint, format, test)
- [ ] `npm run test:coverage` meets coverage thresholds
- [ ] All automated checks pass
- [ ] No new ESLint warnings or errors
- [ ] Code formatting follows Prettier configuration

### Documentation
- [ ] JSDoc/TSDoc comments added for new functions/components
- [ ] README updated if necessary
- [ ] Architecture decisions documented (ADR) if applicable
- [ ] Breaking changes documented

### Accessibility & Performance
- [ ] UI changes follow accessibility guidelines (WCAG)
- [ ] Performance impact considered and optimized
- [ ] Images optimized and properly sized
- [ ] No unnecessary re-renders or memory leaks

## 💥 Breaking Changes

<!-- If this PR introduces breaking changes, describe them here -->
<!-- Mark this section as N/A if no breaking changes -->

**Breaking changes:**
- N/A

**Migration guide (if applicable):**
- N/A

## 📸 Screenshots

<!-- For UI changes, include before/after screenshots -->
<!-- Remove this section if not applicable -->

**Before:**

**After:**

## 🔗 Related Issues

<!-- Link to related issues/tasks -->

- Closes #[issue_number]
- Related to #[issue_number]
- Part of [Phase X]: [phase_description]

## 📋 Deployment Notes

<!-- Any special deployment considerations -->

- [ ] No special deployment requirements
- [ ] Requires infrastructure changes
- [ ] Requires environment variable updates
- [ ] Requires database migrations
- [ ] Requires manual steps (document below)

**Manual deployment steps:**
<!-- List any manual steps required during deployment -->

---

## 📝 Reviewer Notes

<!-- Additional context for reviewers -->

**Areas requiring special attention:**

**Questions for reviewers:**

---

**Definition of Done:**
- [ ] All acceptance criteria met
- [ ] Code reviewed and approved
- [ ] All automated checks pass
- [ ] Documentation updated
- [ ] Ready for production deployment