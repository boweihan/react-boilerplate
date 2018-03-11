[#\<proj\>-\<ticker number\>]
Use this format to specify the jira ticket which this pull request fixes or delivers. This way the automation tool can properly link the jira ticket when necessary. For cases where there are multiple stories, specify each story in the right format on multiple lines.
e.g.
[#ON-403]
[#INF-123456]

### [pick one] Issue / Feature / Enhancement / Other
Link to the Jira Ticket / Github Issue / Zendesk ticket / Design Document (if available).
If no link available, please describe why the change is needed and how urgent it is.

### Customer visible change [Important: pick one]
Yes / No [If customer visible change is yes, add a note detailing the customer visible changes in the details section, otherwise, you can delete the details section]

### Customer visible change details
Will customers be able to see this change? - e.g. (A) fixes a bug already exposed in production, or (B) adds/changes a feature already exposed in production. 
If Yes, make sure you use the Jira ticket when you submit a pull request. The field below gets added to the Jira release item when the pull request goes to production. This helps CS determine what PRs to document in their Release Updates to customers.

### Root Cause Analysis
(This section is only needed for bug fixes) What causes this bug to happen? Was it a regression (something that worked originally but then stopped working later)? If yes, what change caused it to break?

### Code change / Fix
Describe what your code does. If this is a bug fix, describe how your change fixes it.

### Side effects
List any side effects anticipated (for the end user or for developers).
List any config file changes.

### Tests
List all tests that were performed. Were they manual or automated?
List any tests that still need to be performed.

### Dependencies
List any dependencies that must be resolved before this can be merged. Examples:
- [ ] #XYZ to be merged first

### Reviewers
Tag someone to review the PR. Suggestions: devs who worked on the same files or feature before, QA testers, your team lead, the bug reporter.
