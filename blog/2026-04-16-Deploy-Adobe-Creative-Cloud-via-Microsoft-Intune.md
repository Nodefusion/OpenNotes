---
Title: Deploy Adobe Creative Cloud via Microsoft Intune
Date: 2026-04-16
Author: hect6r
Category: Community
Tags:
- Microsoft Intune
- Adobe Creative Cloud
- MDM
- Enterprise Deployment
---
## Overview
This guide explains how to deploy an Adobe Creative Cloud package in an enterprise environment using Microsoft Intune (Win32 app) by packaging the Build folder and using the MSI as the setup file. 
It is intended for system administrators who manage Windows devices through Microsoft Endpoint Manager.

## Deployment Steps
### Download the Adobe Package

Go to \[Adobe Admin Console](https://adminconsole.adobe.com)

Navigate to:  
Packages → Create a Package 

Select:
- Creative Cloud entitlement/licensing (for example Shared Device or your org’s entitlement)
- Windows
- Language
- Required Creative Cloud apps 

Download the ZIP package and extract it on your computer. 

### Prepare the Package Files (Build Folder)

- Extract the ZIP and locate the Build folder inside the package.
- Create an Output folder, example: C:\Output\

### Prepare the Intune Package (.intunewin)
Use Microsoft Win32 Content Prep Tool: 
```console
IntuneWinAppUtil.exe
```

Inputs:
- Source folder: the package Build folder
- Setup file: Adobe Creative Cloud.msi
- Output folder: C:\Output\
- Do you want to specify a catalog folder: N

This creates:
```console
Adobe Creative Cloud.intunewin
```
### Add the App in Intune
Go to: Intune → Apps → Windows → Add

App type: Windows app (Win32)

Upload the .intunewin file.

- Program

Install command: Should fill up automatically
```console
msiexec /i "Adobe Creative Cloud.intunewin" /q
```
Uninstall command: Should fill up automatically
```console
msiexec /x "{PACKAGE-GUID-HERE}" /q
```
- Requirements
  - 64‑bit
  - Windows 10 1607

- Detection Rule
  - Use MSI detection:
  - Rule type: MSI
  - Product Code: Auto‑populated from Adobe Creative Cloud.msi

- Assignments
  - Assign to the device groups or users.



