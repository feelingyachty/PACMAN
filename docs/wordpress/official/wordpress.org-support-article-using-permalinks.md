[Skip to content](https://wordpress.org/documentation/article/customize-permalinks/#wp--skip-link--target)

[WordPress.org](https://wordpress.org/)

[Documentation](https://wordpress.org/documentation)

Customize permalinks

[Home](https://wordpress.org/documentation)[Support guides](https://wordpress.org/documentation/support-guides/)[Publishing](https://wordpress.org/documentation/category/publishing/)Customize permalinks

Search documentation

# Customize permalinks

## In this article

Table of Contents

- [Permalink Types](https://wordpress.org/documentation/article/customize-permalinks/#permalink-types-1)
  - [Plain Permalinks](https://wordpress.org/documentation/article/customize-permalinks/#plain-permalinks)
  - [Pretty Permalinks](https://wordpress.org/documentation/article/customize-permalinks/#pretty-permalinks)
  - [Almost Pretty Permalinks](https://wordpress.org/documentation/article/customize-permalinks/#almost-pretty-permalinks)
- [Choosing your permalink structure](https://wordpress.org/documentation/article/customize-permalinks/#choosing-your-permalink-structure)
  - [Structure Tags](https://wordpress.org/documentation/article/customize-permalinks/#structure-tags-1)
  - [Category base and Tag base](https://wordpress.org/documentation/article/customize-permalinks/#category-base-and-tag-base-1)
  - [Using %category% with multiple categories on a post](https://wordpress.org/documentation/article/customize-permalinks/#using-category-with-multiple-categories-on-a-post-1)
- [Changelog](https://wordpress.org/documentation/article/customize-permalinks/#changelog)

[↑ Back to top](https://wordpress.org/documentation/article/customize-permalinks/#wp--skip-link--target)

Permalinks are the permanent URLs of your posts, pages, categories, and other archive pages on your website. These URLs are permanent and should never be changed — hence the name _perma_ link.

Permalinks help to create a URL structure that is easy for both humans and search engines to understand and share.

- A permalink is used when another blogger wants to link to your article.
- You share the permalink when you want to share your content on social media.
- When Google wants to index your article, they use the permalink of the content.
- When you want to share a blog post with your friend, you send the permalink of your content in an email.

## [Permalink Types](https://wordpress.org/documentation/article/customize-permalinks/\#permalink-types-1)

There are three types of WordPress permalinks:

### [Plain Permalinks](https://wordpress.org/documentation/article/customize-permalinks/\#plain-permalinks)

The default Plain Permalink also called the Ugly Permalink looks like this:

http://example.com/?p=N

with p as the parameter and N is the unique ID of the post or page in the database.

WordPress comes preinstalled with this setting. It works on all server environments. It is not user-friendly and also not optimized for search engines.

### [Pretty Permalinks](https://wordpress.org/documentation/article/customize-permalinks/\#pretty-permalinks)

Pretty Permalinks are SEO-friendly and attractive. They usually contain several words such as the title of the post or page, post category, tag name, etc. You can use Keywords in the URL to make your content readable by search engines.

Pretty Permalinks also help others get an understanding of what the content of the page or post is by reading the URL.

Pretty Permalinks look like this:

http://example.com/2012/post-name/

or

http://example.com/2012/12/30/post-name

### [Almost Pretty Permalinks](https://wordpress.org/documentation/article/customize-permalinks/\#almost-pretty-permalinks)

WordPress provides a third option called the Almost Pretty permalinks. These permalinks have /index.php prefixed before them, like so:

http://example.com/index.php/yyyy/mm/dd/post-name/

Except for this detail, they are similar to Pretty Permalinks.

## [Choosing your permalink structure](https://wordpress.org/documentation/article/customize-permalinks/\#choosing-your-permalink-structure)

On the WordPress dashboard, go to Settings → Permalinks Screen. You can choose one of the permalink structures or enter your own in the “Custom structure” field using the _structure tags_.

![Permalink settings in Admin Dashboard > Settings > Permalink](https://lh4.googleusercontent.com/Lcb0FZp6yKMbXUPN_IobSjNDSP3sl1IGphrkuwVdBzZ81rpigq04ewoiJd3drRIdEC_wrFjfV-smOvngr9enVzmff0eAdg2IeFPbMaHRT_I_AwUxNo5DfE_nyZPqqq-RHZu-BgLq)

There are six options to select from:

Plain: This is the Ugly Permalink setting.

Day and name: This uses a year/month/date format followed by your post name.

Month and name: This uses a year/month format followed by your post name.

Numeric: This option uses the ID of the post from the row in the wp\_posts table of your database.

Post name: This one uses the name of your post.

Custom Structure: This field allows you to define your own custom URL structure using the structure tags available in WordPress.

The default setting is Plain, which is automatically configured when you install WordPress.

**NOTE:**

Your hosting provider should have set up the web servers with the necessary configurations for the Pretty and Almost Pretty Permalinks to work correctly. If they are not, then you need to contact your hosting provider.

### [Structure Tags](https://wordpress.org/documentation/article/customize-permalinks/\#structure-tags-1)

WordPress provides the following structure tags for creating your own custom permalinks. You can use these tags to customize your Pretty or Almost Pretty permalinks.

**Note:**

- You do not put your website URL in the permalinks fields. You only use one of the structure tags or a combination of tags.
- To use the Almost Pretty Permalinks, start your permalink structure with index.php/.
- End your structure with either %post\_id% or %postname% so that WordPress can target an individual post for every permalink. (E.g. /%year%/%monthnum%/%day%/%postname%/)

**%year%**

The year of the post in four digits, eg:  2018

**%monthnum%**

Month the post was published, in two digits, eg: 05

**%day%**

Day the post was published in two digits, eg: 28

**%hour%**

Hour of the day, the post was published, eg: 15

**%minute%**

Minute of the hour, the post was published, eg:  43

**%second%**

Second of the minute, the post was published, eg: 33

**%post\_id%**

The unique ID of the post, eg: 423

**%postname%**

A sanitized version of the title of the post ( _post slug_ field on Edit Post/Page panel).

Eg: “This Is A Great Post!” becomes this-is-a-great-post in the URI.

**%category%**

A sanitized version of the category name ( _category slug_ field on New/Edit Category panel).

Nested sub-categories appear as nested directories in the URI.

**%author%**

A sanitized version of the post author’s name.

### [Category base and Tag base](https://wordpress.org/documentation/article/customize-permalinks/\#category-base-and-tag-base-1)

You also have the option of setting custom category and tag bases for your site on the same screen under the **Optional** settings section.

![Optional Category base and Tag base permalink settings in Admin Dashboard > Settings > Permalink](https://lh3.googleusercontent.com/T1ebzj_2xkBSUS9rNTXkrnIB_hB84Mc3MxCy2Sl82jesIPUO48GomcQzVfF5s-oVfABCm19HZsVvfUCBrBrUXVrDeolsyWvx1N2mFWaAeHCUy0J7ZG-OtXZuApJ8yFwZ09hr7-hV)

The _Category base_ and _Tag base_ are prefixes used in URLs for category and tag archives, which look like this:

example.net/category\_base/category\_name

example.net/tag\_base/tag\_name

The default values for _Category base_ and _Tag base_ are category and tag. You can change them, but you can’t remove them from the URLs altogether.

### [Using %category% with multiple categories on a post](https://wordpress.org/documentation/article/customize-permalinks/\#using-category-with-multiple-categories-on-a-post-1)

When you assign multiple categories to a post, only one can show up in the permalink. Which category gets displayed in the permalink is determined alphabetically.

If you want to choose which category shows up in the permalink, you can use one of the plugins from the [plugin directory](https://wordpress.org/plugins/search/taxonomy/).

## [Changelog](https://wordpress.org/documentation/article/customize-permalinks/\#changelog)

- Updated 2025-06-28
  - Added Alt texts.

## Was this article helpful? How could it be improved? [Cancel reply](https://wordpress.org/documentation/article/customize-permalinks/\#respond)

[Log in to submit feedback](https://login.wordpress.org/?redirect_to=https%3A%2F%2Fwordpress.org%2Fdocumentation%2Farticle%2Fcustomize-permalinks%2F&locale=en_US). If you need support with something that wasn't covered by this article, please post your question in the [support forums](https://wordpress.org/support/forums/).

First published

November 16, 2018

Last updated

June 28, 2025

## Get more help

[Support forums](https://wordpress.org/support/forums/)

Ask questions in the support forums.

Search

Search

[Developers](https://developer.wordpress.org/)

Check out the developer documentation.

[Content suggestions](https://github.com/WordPress/Documentation-Issue-Tracker/issues)

Report an error or change in the documentation issue tracker.

[Get involved](https://make.wordpress.org/docs/)

Learn about the Documentation Team and how to contribute.