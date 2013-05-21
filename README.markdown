pg-test
===

Test runner for PostgreSQL tests.

Install
---

`npm install -g pg-test`

Usage
---

Specify the database url as an environment variable named `DB`.
If running on Travis-CI, `DB` will default to `postgres://postgres:localhost/travis`.

```
Linux: export DB=postgres://postgres@localhost/mydb
Windows (PowerShell): $env:DB="postgres://postgres@localhost/mydb"
```

Then run
---

`pg-test [path]`

Which will execute every `.sql` file in the specified (defaults to cwd)
and stop on the first, if any, failure.

License
---

MIT
