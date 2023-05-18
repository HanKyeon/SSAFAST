# CONTRIBUTING.md

## **Contribution Guidelines**

Thank you for choosing to contribute in **SSAFAST**. There are a ton of great open-source projects out there, so we appreciate your interest in contributing to **SSAFAST**.

## Table of contents

- [Questions or feedback](#questions-of-feedback)
- [Documentation](#documentation)
- [Naming Conventions](#naming-conventions)
- [Git Branches](#git-branches)
- [Commit Messages](#commit-messages)
- [Opening a Pull Request](#opening-a-pull-request)
- [Merging Pull Requests](#merging-pull-requests)
- [Releases and Change-logs](#releases-and-change-logs)

## **Questions or feedback**

**SSAFAST** has no community for questions or feedback. Therefore, please contact us at the email below

frontend

- anipap2@naver.com
- yongjae116@gmail.com
- hgh21233@gmail.com

backend

- dol97pong@gmail.com
- angly97@naver.com
- parody9c@gmail.com

## Documentation

There is always a room for improvement in documentation. We welcome all the pull requests to fix typo / improve grammar or semantic structuring of documents. Here are few documents you can work on:

- README.md

## Naming Conventions

The following naming conventions should be used

Frontend directives:

Directives should have names that are:

1. Short, concise and descriptive
2. Variable names follow general React naming convention

Backend directives:

Directives should have names that are:

1. Short, concise and descriptive
2. Variable names follow camel case. Class names follow Pascal case.

## Git Branches

Repositories should use the `develop/FE` branch as frontend primary branch and the `develop/BE` as backend primary branch. This branches should be "protected" on GitHub and require PR reviews and status checks before merging.

Additions to the `develop/FE` and `develop/BE` should follow these simple concepts:

- Use feature branches for all new features and bug fixes.
- Merge feature branches into the `develop/FE` or the `develop/BE` branch using pull requests.
- Keep a high quality, up-to-date the `develop/FE` and the `develop/BE` branch.

## Opening a Pull Request

Pull requests should be submitted to the `develop/FE` or the `develop/BE` early and often!

To improve understanding of pull requests "at a glance", the use of several standardized title prefixes is encouraged:

Prefix : depending on whether it is frontend or backend

- **[FE]** for frontend contribution
- **[BE]** for backend contribution
- **[ETC]** for 기타

Contribution Type

- **Docs** for new or updated documentation
- **Feat** for new features
- **Fix** for bug fixes
- **Enhance** for enhancements
- **Style** for stylistic changes (css and UI changes)
- **Refactor** for production code refactoring and code styles changes
- **Rename** for renaming files or foders (including changes in files/folders arrangement)
- **Comment** for new or updated comments in code
- **Remove** for removing unused files/folders
- **!Breaking Change** for Critical Changes in API
- **Test** for add/refactoring test codes

Precautions

- All titles should start with uppercase
- All titles in imperative sentence
- No period at the end of the title
- Title and Description should be sparated with one line apart
- Descriptions needs to explain ‘What’ & ‘Why’ rather than ‘How’

Examples

- [BE] Fix : Handle Input validation for login
- [ETC] Doc : Modify README.md

## Merging Pull Requests

A pull request should be opened only once you consider it ready for review. Each time you push a commit to a branch with an open PR, it triggers a CI build, eating up the quota of the organization.

There is way of 'merging' pull requests on GitHub:

- **Merge with merge commit**: put all commits as they are on the base branch, with a merge commit on top
    - Choose for collaborative PRs with many commits. Here, the merge commit provides actual benefits.
- Only Merge PR is accepted, **No Rebase are accepted.**

## Pull Request Reviews

### Standards

### Approving changes

- Technical facts and data overrule personal preferences
- Favour approving a PR once it definitely improves code health overall, even if it isn't perfect

### Vigilance

- Be responsive to review requests. Users who put in the effort of contributing back deserve our attention the most, and timely review of PRs is a big motivator.
- Look at every line of code that is being modified
- Use a check-list like the one below, especially if you are new to code review

### Communication

- Offer encouragement for things done well, don't just point out mistakes
- Fine to mention what could be improved but is not mandatory
- Good to share knowledge that helps the submitter improve their understanding of the code (clarify where you do/don't expect action)

### Check-list - What to look for

### Design

- Does this change belong in the codebase?
- Is it integrated well?

### Functionality

- Does the code do what the developer intended?
- Are there edge cases, where it could break?
- For UI changes: give it a try yourself! (difficult to grasp from reading code)

### Complexity

- Any complex lines, functions, classes that are not easy to understand?
- Over-engineering: is the code too complex for the problem at hand?

### Tests

- Are there tests for new functionality?Are bugs covered by a test that breaks if the bug resurfaces?
- Are the tests correct and useful?Do they make simple and useful assertions?

### Naming

- A good name is long enough to communicate what the item does, without being so long that it becomes hard to read

### Comments

- Do comments explain *why* code exists (rather than *what* it is doing)?

### Style & Consistency

- Does the contribution follow generic coding style (mostly enforced automatically)?

## Commit Messages

A commit:

- should ideally address one issue
- should be a self-contained change to the code base
- must not lump together unrelated changes

Commit Message follows equally with [Pull Request convention].(#merging-pull-requests)