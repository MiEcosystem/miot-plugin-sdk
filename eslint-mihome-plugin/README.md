# eslint-plugin-mihome-plugin

For MiHome Plugin System

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-mihome-plugin`:

```
$ npm install :file./eslint-mihome-plugin --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-mihome-plugin` globally.

## Usage

Add `mihome-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "mihome-plugin"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "mihome-plugin/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





