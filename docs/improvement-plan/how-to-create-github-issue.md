# How to Create GitHub Issues

## Steps to Create Issues with Proper Body Content

1. **Validate that labels exist**
   ```powershell
   gh label list
   ```

2. **Create labels if any are missing**
   ```powershell
   gh label create "enhancement" --description "New feature or request" --color "a2eeef"
   gh label create "phase-0" --description "Phase 0: Foundation Setup" --color "0075ca"
   gh label create "foundation" --description "Foundation and core infrastructure" --color "d73a4a"
   ```

3. **Create temp file with the body content first**
   ```powershell
   @"
   ## 📋 Task Overview
   
   **Issue ID:** #XXX  
   **Phase:** X - Phase Name  
   **Priority:** High/Medium/Low  
   **Estimate:** X hours  
   **Dependencies:** Dependency description
   
   ## 🎯 Description
   
   Detailed description of the task...
   
   ## ✅ Acceptance Criteria
   
   - [ ] Criteria 1
   - [ ] Criteria 2
   
   ## Additional sections as needed...
   "@ | Out-File -FilePath "temp-issue.md" -Encoding UTF8
   ```

4. **Create GitHub issue using the temp file**
   ```powershell
   gh issue create --title "Issue Title" --body-file "temp-issue.md" --label "enhancement,phase-0,foundation" --assignee "@me"
   gh issue list --limit 3 --search "Issue Title"
   ```

5. **Validate that the issue was created with body content**
   ```powershell
   gh issue view [ISSUE_NUMBER]
   ```

6. **If body is empty, update the issue**
   ```powershell
   gh issue edit [ISSUE_NUMBER] --body-file "temp-issue.md"
   ```

7. **Delete the temp file**
   ```powershell
   Remove-Item "temp-issue.md" -ErrorAction SilentlyContinue
   ```

## Key Learnings

- **Use PowerShell here-strings** (`@"..."@`) for multi-line content with proper encoding
- **Always use UTF8 encoding** when creating temp files with `Out-File -Encoding UTF8`
- **Create body file BEFORE creating the issue** to ensure content is ready
- **Validate the issue creation** by viewing it immediately after creation
- **Have a fallback plan** to update the body if it doesn't work the first time

## Common Issues

- **Empty body content**: Use `gh issue edit` with `--body-file` to fix
- **Encoding problems**: Always use UTF8 encoding for temp files
- **Special characters**: PowerShell here-strings handle most markdown formatting correctly
- **File not found**: Ensure temp file exists before running `gh issue create`