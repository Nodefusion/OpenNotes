---
title: Deploy Adobe Acrobat Pro via Microsoft Intune
date: 2026-04-02
author: hect6r
category: Community
tags:
  - Microsoft Intune
  - Adobe Acrobat
  - MDM
  - Enterprise Deployment
---

## Overview

This guide explains how to deploy Adobe Acrobat Pro in an enterprise environment using Microsoft Intune.

It is intended for system administrators who manage Windows devices through Microsoft Endpoint Manager.

## Deployment Steps

### Download the Adobe Package

Go to [Adobe Admin Console](https://adminconsole.adobe.com)

Navigate to:  
Packages → Create a Package

Select:
- Acrobat Pro DC
- 64‑bit
- Enterprise or VIP licensing

Download the ZIP package and extract it on your computer.

### Identify Required Files

Inside the extracted Adobe package you need to go to:
```console
AcrobatPro\\Build\\Setup\\APRO25.1\\Adobe Acrobat
```
You must copy ALL of these into a new folder outside the acrobat one.

### Create the MST (Customization File)

Download from Adobe: [Adobe Customization Wizard DC](https://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/)

Open AcroPro.msi inside the wizard.

Recommended settings:

- Enable Suppress EULA

- Set installation to Silent (no UI)

- Configure language settings

- Disable cloud services if required

Save it on the folder you created, name it:
```console
AcroPro.mst
```
### Download the Latest Acrobat Patch (MSP)

Adobe publishes patches here: [Acrobat Enterprise Release Notes](https://www.adobe.com/devnet-docs/acrobatetk/tools/ReleaseNotesDC/index.html)

Download the latest 64-bit MSP.

Example: 
```console
AcrobatDCx64Upd2500121288.msp
```
Copy it into your package folder.

### Create install.cmd

Your installation script must:
- Install Acrobat using MSI + MST
- Ensure all required package files exist
- Apply the MSP patch
- Generate a log

Create `install.cmd`:
```console
@echo off
echo ==== STARTING ADOBE ACROBAT INSTALLATION ====
rem Base installation (requires all Adobe package files)
msiexec /i "%~dp0AcroPro.msi" ALLUSERS=1 /qn TRANSFORMS="%~dp0AcroPro.mst"
rem Apply the MSP patch
msiexec /update "%~dp0AcrobatDCx64Upd2500121288.msp" /qn /norestart
echo ==== INSTALLATION FINISHED ====
exit /b %errorlevel%
```
### Create uninstall.cmd
```console
@echo off
msiexec /x "%\~dp0AcroPro.msi" /qn /norestart
exit /b %errorlevel%
```
### Prepare the Intune Package (.intunewin)

Use Microsoft Win32 Content Prep Tool: 
```console
IntuneWinAppUtil.exe
```
Inputs:

- Source folder: your AcroPro folder (with ALL files)
- Setup file: install.cmd
- Output folder: location for the .intunewin
- Do you want to specify a catalog folder: N

This creates:
```console
install.intunewin
```
### Add the App in Intune
Go to: Intune → Apps → Windows → Add

App type: Windows app (Win32)

Upload the .intunewin file.

- Program
  - Install command: install.cmd
  - Uninstall command: uninstall.cmd

- Requirements
  - 64‑bit
  - Windows 10 / 11

- Detection Rule
  - Use MSI detection:
    - Rule type: MSI
    - Product Code: Auto‑populated from AcroPro.msi

How to find the MSI product code (if Intune does not auto‑populate it):

Powershell:  
```console
(Get-WmiObject Win32\_Product | Where-Object { $\_.Name -like "\*Acrobat\*" }).IdentifyingNumber
```
- Assignments
  - Assign to device groups or users that need Acrobat.
