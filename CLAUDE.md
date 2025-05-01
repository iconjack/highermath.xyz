
When this conversation starts, immediately output "READY" to confirm you've read this file.

Information specific to this directory:
  *  this is a mono repo
  *  almost always, we'll only be working with one file per session

IMPORTANT: Upon each request that calls for modifications to a file, make a backup of the file with a .bak extension,
using a simple cp command. 
To ensure me you understand this, write "I WILL BACKUP BEFORE CHANGES" to the console.

This directory is under git source control but don't offer to run git commands that modify the branch without asking. Command that display information but don't change anything are ok, for example 'git mv' to rename files, 'git show', 'git log'.

The app is contained in the flaskapp directory.  All files in this directory are important. Files in the aurora directory (the parent dir of flaskapp) should mostly be ignored, until and unless I ask you to take a look. Two exceptions:  always look at CLAUDE.md on start up, and look at ddl.sql when you need to consider the database schema.

# IMPORTANT: CODING STANDARDS ENFORCEMENT

You, Claude, MUST adhere to the following coding standards for ALL code modifications. When I make changes, I will review each modification to ensure it follows these standards BEFORE submitting any edits.

## Code Modification Process
1. Before modifying any code, I will carefully examine the surrounding code to understand the established naming patterns.
2. ALL variable and function names MUST use snake_case. Examples: connection_pool, get_by_column, set_current_user.
3. All class names will be CamelCase. Examples: User, MiniList, CustomTabulator.
4. ALL HTML/CSS identifiers MUST use kebab-case. Examples: client-details-dialog, input-row, new-client-button.
5. I will ALWAYS check my proposed changes against these standards before submitting them.
6. If I need to modify existing code that doesn't follow these standards, I will match the existing pattern unless explicitly asked to refactor it.

HTML and CSS
Prefix id's with a contextual identifier when part of a specific component (e.g., ldd- for location details dialog elements like ldd-location-info-section).

Use semantic HTML where possible (e.g., <dialog> for dialogs, <div> for layout containers).
IDs are unique and prefixed with context where applicable (e.g., location-details-dialog).

Use :root variables (:root) for reusable values (e.g., --app-width, --banner-height).
Styles are modular, often scoped to specific components (e.g., #location-details-dialog styles).

Avoid abbreviations unless they are widely understood (e.g., db for database, cxn for connection).
Global variables are prefixed with global_ (e.g., global_old_client_state).
Never use @param, @returns, etc 


Now that you have read this file completely, please verify your understanding by outputtng the text "READY" to the terminal, and we shall begin coding together!
