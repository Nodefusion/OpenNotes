\---

title: Deploy Adobe Creative Cloud via Microsoft Intune

date: 2026-04-16

author: hect6r

category: Community

tags:

&#x20; - Microsoft Intune

&#x20; - Adobe Creative Cloud

&#x20; - MDM

&#x20; - Enterprise Deployment

\---



\## Overview



This guide explains how to deploy an Adobe Creative Cloud package in an enterprise environment using Microsoft Intune (Win32 app) by packaging the Build folder and using the MSI as the setup file. 



It is intended for system administrators who manage Windows devices through Microsoft Endpoint Manager.



\## Deployment Steps



\### Download the Adobe Package



Go to \[Adobe Admin Console](https://adminconsole.adobe.com)



Navigate to:  

Packages → Create a Package 



Select:

\- Creative Cloud entitlement/licensing (for example Shared Device or your org’s entitlement)

\- Windows

\- Language

\- Required Creative Cloud apps 



Download the ZIP package and extract it on your computer. 



\### Prepare the Package Files (Build Folder)



\- Extract the ZIP and locate the Build folder inside the package.

\- Create an Output folder, example: C:\\Output\\



\### Prepare the Intune Package (.intunewin)



Use Microsoft Win32 Content Prep Tool: 

```console

IntuneWinAppUtil.exe

```

Inputs:



\- Source folder: the package Build folder

\- Setup file: Adobe Creative Cloud.msi

\- Output folder: C:\\Output\\

\- Do you want to specify a catalog folder: N



This creates:

```console

Adobe Creative Cloud.intunewin

```

\### Add the App in Intune

Go to: Intune → Apps → Windows → Add



App type: Windows app (Win32)



Upload the .intunewin file.



\- Program

&#x20; - Install command: Should fill up automatically

```console

msiexec /i "Adobe Creative Cloud.intunewin" /q

```

&#x20; - Uninstall command: Should fill up automatically

```console

msiexec /x "{PACKAGE-GUID-HERE}" /q

```

\- Requirements

&#x20; - 64‑bit

&#x20; - Windows 10 1607



\- Detection Rule

&#x20; - Use MSI detection:

&#x20;   - Rule type: MSI

&#x20;   - Product Code: Auto‑populated from Adobe Creative Cloud.msi



\- Assignments

&#x20; - Assign to the device groups or users.



