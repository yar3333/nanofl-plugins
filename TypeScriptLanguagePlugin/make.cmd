@echo off

SET PROJECT=TypeScriptLanguagePlugin

call tsc ..\ext\typescript\nanofl.d.ts src\%PROJECT%.ts --out ..\bin\%PROJECT%.js
if ERRORLEVEL 1 exit /b

mkdir ..\bin\%PROJECT%
xcopy /E /Y /Q support ..\bin\%PROJECT%
