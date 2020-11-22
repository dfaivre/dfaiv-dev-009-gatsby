---
title: Powershell - Write-Host from Background Script Block
date: 2020-11-17
description: "Hello World"
---

```powershell
# helper to log results
function _handleJobResults {
    Write-Host "listing all jobs"
    Get-Job

    Write-Host "resetting jobs"
    Get-Job | Remove-Job
}

function _waitForJobs {
    # should really check that jobs have finished, maybe in another post.
    Write-Host "waiting for jobs to finish"
    Start-Sleep -Seconds 2
}

$jobCount = 3

# function block to be invoked in background job.
$_deployBlock01 = {
    param($_i)
    Write-Host "script block output: $_i"
}

# invoke background jobs
# no Write-Host output from $_deployBlock01
foreach ($i in 1..$jobCount) {
    Start-Job -ScriptBlock $_deployBlock01 -Name "test-job-$i" -ArgumentList $i
}

_waitForJobs
_handleJobResults
Write-Host "no output from script block should have been logged."

Write-Host "re-run jobs, capture output"
# invoke background jobs, capture outputs
foreach ($i in 1..$jobCount) {
    Start-Job -ScriptBlock $_deployBlock01 -Name "test-job-$i" -ArgumentList $i
}

_waitForJobs

Write-Host "Get Job output"
#Recieve-Job will get the Write-Host output.
Get-Job | Receive-Job

_handleJobResults
```
