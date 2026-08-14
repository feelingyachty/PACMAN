[Skip to content](https://developers.elementor.com/docs/cli/#VPContent)

On this page

# Elementor CLI [​](https://developers.elementor.com/docs/cli/\#elementor-cli)

Elementor CoreAdvanced

Elementor integrates with [WP-CLI](https://wp-cli.org/), enabling you to run certain Elementor tasks via the command line interface, without using a web browser.

## What is WordPress CLI? [​](https://developers.elementor.com/docs/cli/\#what-is-wordpress-cli)

WP-CLI is a command line interface for [WordPress](https://wordpress.org/). It offers an alternative to the WordPress admin bar. Using the command line makes it easier for developers, agencies and hosting providers to run actions with fewer clicks, run them remotely, and even perform complex scripts based on certain conditions.

## What is Elementor CLI? [​](https://developers.elementor.com/docs/cli/\#what-is-elementor-cli)

Elementor CLI is a set of commands integrated into WP-CLI to allow developers to run certain Elementor tasks from the command line.

## Syntax [​](https://developers.elementor.com/docs/cli/\#syntax)

CLI commands syntax:

bash

```
wp elementor <command> [--argument]
```

1

or

bash

```
wp elementor-pro <command> [--argument]
```

1

## Available Commands [​](https://developers.elementor.com/docs/cli/\#available-commands)

Currently, the following Elementor commands are available:

- [System Info](https://developers.elementor.com/docs/cli/system-info)
- [Flush CSS](https://developers.elementor.com/docs/cli/flush-css)
- [Replace URLs](https://developers.elementor.com/docs/cli/replace-urls)
- [Update DB](https://developers.elementor.com/docs/cli/update-db)
- [Library Sync](https://developers.elementor.com/docs/cli/library-sync)
- [Library Connect](https://developers.elementor.com/docs/cli/library-connect)
- [Library Disconnect](https://developers.elementor.com/docs/cli/library-disconnect)
- [Library Import](https://developers.elementor.com/docs/cli/library-import)
- [Library Import Dir](https://developers.elementor.com/docs/cli/library-import-dir)
- [Clear Theme Builder Conditions](https://developers.elementor.com/docs/cli/theme-builder-clear-conditions)
- [Kit Import](https://developers.elementor.com/docs/cli/kit-import)
- [Kit Export](https://developers.elementor.com/docs/cli/kit-export)
- [Experiment Status](https://developers.elementor.com/docs/cli/experiments-status)
- [Experiment Activation](https://developers.elementor.com/docs/cli/experiments-activate)
- [Experiment Deactivation](https://developers.elementor.com/docs/cli/experiments-deactivate)
- [License Activate](https://developers.elementor.com/docs/cli/license-activate)
- [License Deactivate](https://developers.elementor.com/docs/cli/license-deactivate)

## Help [​](https://developers.elementor.com/docs/cli/\#help)

To view a list of all available Elementor commands via the command line, use the `wp help` command.

For information about an individual command, use the following format:

bash

```
wp help elementor <command>
```

1

or

bash

```
wp help elementor-pro <command>
```

1