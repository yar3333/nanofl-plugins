@echo off

SET PROJECT=MsVisualStudio2013IdePlugin

call tsc ..\ext\typescript\nanofl.d.ts src\%PROJECT%.ts --out ..\bin\%PROJECT%.js
mkdir ..\bin\%PROJECT%
xcopy /E /Y /Q support ..\bin\%PROJECT%
