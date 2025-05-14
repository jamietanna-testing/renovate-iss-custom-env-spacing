# Secrets in `customEnvVariables` will only be interpolated if there is the relevant whitespace around the Handlebars syntax.

For the given `config.js`:

<details>

<summary><code>config.js</code></summary>

```javascript
module.exports = {
	secrets: {
		THE_SECRET: 'THIS IS NOT SECRET',
	},
	customEnvVariables: {
		THE_SECRET: '{{ secrets.THE_SECRET }}',
		THE_SECRET_NOT_SHOWN: '{{ secrets.THE_SECRET}}',
	},
	allowedPostUpgradeCommands: [
		"^./dump-env$"
	],
	"allowedCommands": ["^./dump-env$"],
}
```

</details>

with a given `dump-env`:

<details>

<summary><code>dump-env</code></summary>

```sh
echo "THE_SECRET: $THE_SECRET" >> /tmp/dumped-secrets
echo "THE_SECRET_NOT_SHOWN: $THE_SECRET_NOT_SHOWN" >> /tmp/dumped-secrets
```

</details>

When running:

```sh
docker run -e RENOVATE_TOKEN=$(gh auth token) -v $PWD:/app -ti ghcr.io/renovatebot/renovate:39.107.0 bash
$ cd /app
env LOG_LEVEL=debug renovate jamietanna-testing/renovate-iss-custom-env-spacing
```

This is also reproducible with:

```sh
docker run -e RENOVATE_TOKEN=$(gh auth token) -v $PWD:/app -ti ghcr.io/renovatebot/renovate:40.11.13 bash
$ cd /app
env LOG_LEVEL=debug renovate jamietanna-testing/renovate-iss-custom-env-spacing
```

## Current behavior

This currently outputs the following to `/tmp/dumped-secrets`:

```
THE_SECRET: THIS IS NOT SECRET
THE_SECRET_NOT_SHOWN: {{ secrets.THE_SECRET}}
```

Notice that the second option, where the secret does not have whitespace between the variable name and the `}`, it is not interpolated correctly.

## Expected behavior

Both secret values will be output.

## Link to the Renovate issue or Discussion

https://github.com/renovatebot/renovate/discussions/35924
