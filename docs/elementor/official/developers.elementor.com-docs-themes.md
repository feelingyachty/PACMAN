[Skip to content](https://developers.elementor.com/docs/themes/#VPContent)

On this page

# Theme Locations [​](https://developers.elementor.com/docs/themes/\#theme-locations)

Elementor ProIntermediate

**Elementor Pro 2.0** introduced a **theme builder**. This feature transformed Elementor from a _page-builder_ to a full _site-builder_.

## Overview [​](https://developers.elementor.com/docs/themes/\#overview)

Before the release of **Elementor Pro 2.0**, Elementor was a page-builder, only affecting [the\_content()](https://developer.wordpress.org/reference/functions/the_content/) of a single page. Elementor couldn't set global headers, global footers, design custom archive pages, search results, author pages, 404 pages etc.

The new theme builder functionality changed everything! It has greatly empowered users. They no longer have to rely on pre-designed themes, as they can design their own layouts using simple drag-and-drop functionality without any code.

Despite this development, theme usage did not drop. In fact, themes that adapted to this development saw an increase in overall usage and total downloads.

Every theme developer can make their theme **Elementor compatible** by supporting the **theme locations** functionality. They just need to add a few lines of code wrapping some elements. This will help Elementor replace theme elements with Elementor designs, allowing users to create their own designs.

## Available Locations [​](https://developers.elementor.com/docs/themes/\#available-locations)

Themes can support all core locations, some locations or create their own custom locations. The following are the built-in Elementor locations:

- **Header** – template header replaces the theme `header.php` file.
- **Footer** – template footer replaces the theme `footer.php` file.
- **Single** – template content replaces the theme `singular.php`, `single.php`, `page.php`, `attachment.php` and `404.php` files.
- **Archive** – template archive replaces the theme `archive.php`, `taxonomy.php`, `author.php`, `date.php` and `search.php` files.

## Managing Locations [​](https://developers.elementor.com/docs/themes/\#managing-locations)

Learn how to develop "Elementor Compatible" themes:

- [Registering Locations](https://developers.elementor.com/docs/themes/registering-locations)
- [Displaying Locations](https://developers.elementor.com/docs/themes/displaying-locations)

## Theme Migration [​](https://developers.elementor.com/docs/themes/\#theme-migration)

Check out these examples to see how easy it is to migrate an existing theme and add Elementor support:

- [Migrating Themes](https://developers.elementor.com/docs/themes/migrating-themes)
- [Original Theme](https://developers.elementor.com/docs/themes/original-theme)
- [Migrating Themes with Functions](https://developers.elementor.com/docs/themes/migrating-themes-with-functions)
- [Migrating Themes with Hooks](https://developers.elementor.com/docs/themes/migrating-themes-with-hooks)