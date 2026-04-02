\---

title: Deploy Adobe Acrobat Pro via Microsoft Intune

date: 2026-04-02

author: Hector Gonzalez Rodriguez

category: Community

tags:

&#x20; - Microsoft Intune

&#x20; - Adobe Acrobat

&#x20; - MDM

&#x20; - Enterprise Deployment

\---



\## Overview



This guide explains how to deploy Adobe Acrobat Pro in an enterprise

environment using Microsoft Intune.



It is intended for system administrators who manage Windows devices

through Microsoft Endpoint Manager.



\## Deployment Steps



\### 1. Download the Adobe Package



Go to Adobe Admin Console

https://adminconsole.adobe.com



Navigate to:

Packages → Create a Package



Select:



Acrobat Pro DC

64‑bit

Enterprise or VIP licensing



Download the ZIP package.



Extract the ZIP on your computer.



\### 2. Identify Required Files

Inside the extracted Adobe package you need to go to:



AcrobatPro\\Build\\Setup\\APRO25.1\\Adobe Acrobat



You must copy ALL of these into a new folder outside the acrobat one.





\### 3. Create the MST (Customization File)

Use Adobe Customization Wizard DC:



Download from Adobe:

https://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/



Open AcroPro.msi inside the wizard.



Recommended settings:



Enable Suppress EULA

Set installation to Silent (no UI)

Configure language settings

Disable cloud services if required



Save it on the folder you created, name it:

AcroPro.mst



\### 4. Download the Latest Acrobat Patch (MSP)



Adobe publishes patches here:

https://www.adobe.com/devnet-docs/acrobatetk/tools/ReleaseNotesDC/index.html

Download the latest 64-bit MSP.



Example:

AcrobatDCx64Upd2500121288.msp



Copy it into your package folder.





\### 5. Create install.cmd

Your installation script must:



Install Acrobat using the MSI + MST

Ensure all required package files exist

Apply the MSP patch

Generate a log



Create install.cmd:



@echo off

echo ==== STARTING ADOBE ACROBAT INSTALLATION ====

rem Base installation (requires all Adobe package files)

msiexec /i "%\~dp0AcroPro.msi" ALLUSERS=1 /qn TRANSFORMS="%\~dp0AcroPro.mst"

rem Apply the MSP patch

msiexec /update "%\~dp0AcrobatDCx64Upd2500121288.msp" /qn /norestart

echo ==== INSTALLATION FINISHED ====

exit /b %errorlevel%





\### 6. Create uninstall.cmd





@echo off

msiexec /x "%\~dp0AcroPro.msi" /qn /norestart

exit /b %errorlevel%





\### 7. Prepare the Intune Package (.intunewin)

Use Microsoft Win32 Content Prep Tool:

IntuneWinAppUtil.exe



Inputs:



Source folder: your AcroPro folder (with ALL files inside)

Setup file: install.cmd

Output folder: where .intunewin will be generated



This creates:

install.intunewin





\### 8. Add the App in Intune



Go to:

Intune → Apps → Windows → Add



App type:

Windows app (Win32)



Upload the .intunewin file.



Program



Install command:

install.cmd

Uninstall command:

uninstall.cmd



Requirements



64‑bit

Windows 10/11



Detection Rule

Use MSI detection:



Rule type: MSI

Product Code: Auto-populated from your AcroPro.msi

HOW TO FIND THE MSI PRODUCT CODE (If Intune does not auto‑populate it)

Powershell:

(Get-WmiObject Win32\_Product | Where-Object { $\_.Name -like "\*Acrobat\*" }).IdentifyingNumber



Assignments

Assign to device groups or users that need Acrobat.







