# Git Credential Reset Instructions

This guide explains how to completely remove your current Git credentials and configuration so you can log in with a new account.

## Automated Method (Recommended)

We have provided a PowerShell script to automate this process.

1. Open PowerShell in this directory (`d:\REGLOOK`).
2. Run the following command:
   ```powershell
   ./clean-git-credentials.ps1
   ```

## Manual Method

If you prefer to do this manually, follow these steps:

### 1. Unset Global Git Configuration
Run the following commands in your terminal to remove your global username, email, and credential helper:

```powershell
git config --global --unset-all user.name
git config --global --unset-all user.email
git config --global --unset-all credential.helper
```

### 2. Remove Stored Credentials
Remove the stored credentials for GitHub from the Windows Credential Manager:

```powershell
cmdkey /delete:git:https://github.com
```

## Verification
To verify that everything is clean, you can run:
```powershell
git config --global --list
cmdkey /list:git:https://github.com
```
Both commands should return minimal output or "Element not found" / no specific github credentials.
