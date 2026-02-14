Write-Host "Cleaning Git Credentials and Configuration..." -ForegroundColor Cyan

# 1. Unset global configuration
Write-Host "Unsetting global git user.name, user.email, and credential.helper..."
git config --global --unset-all user.name
git config --global --unset-all user.email
git config --global --unset-all credential.helper

# 2. Remove GitHub credentials from Windows Credential Manager
Write-Host "Removing stored credentials for git:https://github.com..."
# We use try/catch or just suppress error if key doesn't exist, but cmdkey output is informative enough.
# If it fails (key not found), it outputs to stderr/stdout. We'll just run it.
cmdkey /delete:git:https://github.com

Write-Host "--------------------------------------------------------"
Write-Host "Git credentials cleaned." -ForegroundColor Green
Write-Host "You can now login with a new account."
Write-Host "Next time you run a git command (like git push), you will be prompted for credentials."
