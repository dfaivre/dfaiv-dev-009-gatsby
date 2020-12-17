---
title: How Should I Be Hashing Passwords in C#/dotnet core?
date: 2020-12-07
description: ""
slug: "/20201207-security--hashing-pwd-cs"
tags: ["security", "famli"]
---

I wanted to add authorization to a SPA web api backend (using asp.net core). The build in solutions seem to either be **[IdentityServer4](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-5.0)** ~~(which [will only be supported unitl Nov 2022?](https://identityserver4.readthedocs.io/en/latest/))~~ (wait, [maybe they'll have a Community Edition](https://blog.duendesoftware.com/posts/20201210_community_edition/) for companies with less that $1M revenue?) or **[Microsoft.AspNetCore.Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-5.0&tabs=visual-studio)** which seems to want to work more with MVC/Razor and SPAs (though I'm sure it could be hacked?).

Seems like it shouldn't be the end of the world to create a user table and store passwords with some sort of best practice. The first part of that would be how to hash the password. Unsurprisingly there seem to be a few opinions around the inter-webs. This is what I ended up with.

```csharp
public static class Pbkdf2PasswordHasher
{
    const int PasswordHashSize = 512 / 8;
    const int SaltSize = 256 / 8;
    static readonly HashAlgorithmName HashAlgorithm = 
        HashAlgorithmName.SHA512;

    public static string Generate(
        string password, 
        int iterations = 175_000)
    {
        //generate a random salt for hashing
        var salt = new byte[SaltSize];
        new RNGCryptoServiceProvider().GetBytes(salt);

        //hash password given salt and iterations
        //iterations provide difficulty when cracking
        var pbkdf2 = 
            new Rfc2898DeriveBytes(
                password, salt, iterations, HashAlgorithm);
        var hash = pbkdf2.GetBytes(PasswordHashSize);

        //return delimited string with salt | #iterations | hash
        return Convert.ToBase64String(salt) + "|" 
                + iterations + "|" 
                + Convert.ToBase64String(hash);
    }

    public static bool IsValid(string password, string encodedHash)
    {
        //extract original values from delimited hash text
        var parts = encodedHash.Split('|');
        var salt = Convert.FromBase64String(parts[0]);
        var iterations = int.Parse(parts[1]);
        var hash = parts[2];

        //generate hash from test password 
        //  and original salt and iterations
        var pbkdf2 = new Rfc2898DeriveBytes(
                        password, salt, iterations, HashAlgorithm);
        var testHash = pbkdf2.GetBytes(PasswordHashSize);

        //if hash values match then return success
        if (Convert.ToBase64String(testHash) == hash)
            return true;

        //no match return false
        return false;
    }
}
```

###Notes
* `interationCount` was used by running a perf test on my local machine to find hashing that took ~100ms
```cs
[Fact(Skip = "not really a unit test, should probably move to some other mechanism.")]
public void Perf()
{
    const int maxRuntimeMs = 200;
    var iterations = 10_000;
    var lastRuntime = 0L;
    while (lastRuntime < maxRuntimeMs)
    {
        var timer = Stopwatch.StartNew();
        var hashResult =
            Pbkdf2PasswordHasher.Generate(
                PasswordPlainTextDefault,
                iterations);
        timer.Stop();
        var runTime = timer.ElapsedMilliseconds;
        _testOutputHelper.WriteLine($"hash with iterations: {iterations}, ms: {runTime}, result: {hashResult}");

        lastRuntime = runTime;
        iterations += 5000;
    }
}
```
* I used `HashAlgorithmName.SHA512` instead of `SHA256` because larger is better?

###bcrypt
There is a `dotnet` `bcrypt` implementation which seems to more widely respected on the internet (as it is slower to calculate, and slower is better?). But `PBKDF2` still seems to be "officially" recommended, and it's built into `dotnet` which seemed a little safer than OSS.

###Resources:
* [C# pdfh source](https://www.cidean.com/blog/2019/password-hashing-using-rfc2898derivebytes/)
* [PBKDF2 Recommendation by NIST](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#pbkdf2)
* [PBKDF2 Iterations Recommendation](https://security.stackexchange.com/questions/3959/recommended-of-iterations-when-using-pkbdf2-sha256)
* [Microsoft.AspNetCore.Identity.PasswordHasher](https://github.com/aspnet/Identity/blob/master/src/Core/PasswordHasher.cs)
