[Skip to content](https://wordpress.org/documentation/article/roles-and-capabilities/#wp--skip-link--target)

[WordPress.org](https://wordpress.org/)

[Documentation](https://wordpress.org/documentation)

Roles and Capabilities

[Home](https://wordpress.org/documentation)[Support guides](https://wordpress.org/documentation/support-guides/)[Dashboard](https://wordpress.org/documentation/category/dashboard/)Roles and Capabilities

Search documentation

# Roles and Capabilities

## In this article

Table of Contents

- [Summary of Roles](https://wordpress.org/documentation/article/roles-and-capabilities/#summary-of-roles)
- [Roles](https://wordpress.org/documentation/article/roles-and-capabilities/#roles)
  - [Super Admin](https://wordpress.org/documentation/article/roles-and-capabilities/#super-admin)
  - [Administrator](https://wordpress.org/documentation/article/roles-and-capabilities/#administrator)
  - [Editor](https://wordpress.org/documentation/article/roles-and-capabilities/#editor)
  - [Author](https://wordpress.org/documentation/article/roles-and-capabilities/#author)
  - [Contributor](https://wordpress.org/documentation/article/roles-and-capabilities/#contributor)
  - [Subscriber](https://wordpress.org/documentation/article/roles-and-capabilities/#subscriber)
  - [Special Cases](https://wordpress.org/documentation/article/roles-and-capabilities/#special-cases)
  - [Capability vs. Role Table](https://wordpress.org/documentation/article/roles-and-capabilities/#capability-vs-role-table)
- [Capabilities](https://wordpress.org/documentation/article/roles-and-capabilities/#capabilities)
  - [switch\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#switch_themes)
  - [edit\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_themes)
  - [edit\_theme\_options](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_theme_options)
  - [install\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#install_themes)
  - [activate\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#activate_plugins)
  - [edit\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_plugins)
  - [install\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#install_plugins)
  - [edit\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_users)
  - [edit\_files](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_files)
  - [manage\_options](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_options)
  - [moderate\_comments](https://wordpress.org/documentation/article/roles-and-capabilities/#moderate_comments)
  - [manage\_categories](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_categories)
  - [manage\_links](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_links)
  - [upload\_files](https://wordpress.org/documentation/article/roles-and-capabilities/#upload_files)
  - [import](https://wordpress.org/documentation/article/roles-and-capabilities/#import)
  - [unfiltered\_html](https://wordpress.org/documentation/article/roles-and-capabilities/#unfiltered_html)
  - [edit\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_posts)
  - [edit\_others\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_others_posts)
  - [edit\_published\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_published_posts)
  - [publish\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#publish_posts)
  - [edit\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_pages)
  - [read](https://wordpress.org/documentation/article/roles-and-capabilities/#read)
  - [publish\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#publish_pages)
  - [edit\_others\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_others_pages)
  - [edit\_published\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_published_pages)
  - [delete\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_pages)
  - [delete\_others\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_others_pages)
  - [delete\_published\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_published_pages)
  - [delete\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_posts)
  - [delete\_others\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_others_posts)
  - [delete\_published\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_published_posts)
  - [delete\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_private_posts)
  - [edit\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_private_posts)
  - [read\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#read_private_posts)
  - [delete\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_private_pages)
  - [edit\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_private_pages)
  - [read\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#read_private_pages)
  - [delete\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_users)
  - [create\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#create_users)
  - [unfiltered\_upload](https://wordpress.org/documentation/article/roles-and-capabilities/#unfiltered_upload)
  - [edit\_dashboard](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_dashboard)
  - [customize](https://wordpress.org/documentation/article/roles-and-capabilities/#customize)
  - [delete\_site](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_site)
  - [update\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#update_plugins)
  - [delete\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_plugins)
  - [update\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#update_themes)
  - [update\_core](https://wordpress.org/documentation/article/roles-and-capabilities/#update_core)
  - [list\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#list_users)
  - [remove\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#remove_users)
  - [add\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#add_users)
  - [promote\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#promote_users)
  - [delete\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_themes)
  - [export](https://wordpress.org/documentation/article/roles-and-capabilities/#export)
  - [edit\_comment](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_comment)
  - [create\_sites](https://wordpress.org/documentation/article/roles-and-capabilities/#create_sites)
  - [delete\_sites](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_sites)
  - [manage\_network](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_network)
  - [manage\_sites](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_sites)
  - [manage\_network\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_network_users)
  - [manage\_network\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_network_themes)
  - [manage\_network\_options](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_network_options)
  - [manage\_network\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_network_plugins)
  - [upload\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#upload_plugins)
  - [upload\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#upload_themes)
  - [upgrade\_network](https://wordpress.org/documentation/article/roles-and-capabilities/#upgrade_network)
  - [setup\_network](https://wordpress.org/documentation/article/roles-and-capabilities/#setup_network)
- [Resources](https://wordpress.org/documentation/article/roles-and-capabilities/#resources)
  - [Plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#plugins)

[↑ Back to top](https://wordpress.org/documentation/article/roles-and-capabilities/#wp--skip-link--target)

WordPress uses a concept of [Roles](https://wordpress.org/documentation/article/roles-and-capabilities/#roles), designed to give the [site](https://wordpress.org/support/article/glossary/#site) owner the ability to control what users can and cannot do within the site. A site owner can manage the user access to such tasks as [writing and editing posts](https://wordpress.org/support/article/writing-posts/), [creating Pages](https://wordpress.org/support/article/pages/), [creating categories](https://codex.wordpress.org/Posts_Categories_SubPanel), [moderating comments](https://codex.wordpress.org/Comment_Moderation), [managing plugins](https://wordpress.org/support/article/managing-plugins/), [managing themes](https://wordpress.org/support/article/using-themes/), and [managing other users](https://codex.wordpress.org/Users_Screen), by assigning a specific role to each of the users.

WordPress has six pre-defined roles: [Super Admin](https://wordpress.org/support/article/roles-and-capabilities/#super-admin), [Administrator](https://wordpress.org/documentation/article/roles-and-capabilities/#administrator), [Editor](https://wordpress.org/documentation/article/roles-and-capabilities/#editor), [Author](https://wordpress.org/documentation/article/roles-and-capabilities/#author), [Contributor](https://wordpress.org/documentation/article/roles-and-capabilities/#contributor) and [Subscriber](https://wordpress.org/documentation/article/roles-and-capabilities/#subscriber). Each role is allowed to perform a set of tasks called [Capabilities](https://wordpress.org/support/article/glossary/#capabilities). There are many capabilities including “ [publish\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#publish_posts)“, “ [moderate\_comments](https://wordpress.org/documentation/article/roles-and-capabilities/#moderate_comments)“, and “ [edit\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_users)“. [A default set](https://wordpress.org/documentation/article/roles-and-capabilities/#capability-vs-role-table) of capabilities is pre-assigned to each role, but other capabilities can be assigned or removed using the [add\_cap()](https://codex.wordpress.org/Function_Reference/add_cap) and [remove\_cap()](https://codex.wordpress.org/Function_Reference/remove_cap) functions. New roles can be introduced or removed using the [add\_role()](https://codex.wordpress.org/Function_Reference/add_role) and [remove\_role()](https://codex.wordpress.org/Function_Reference/remove_role) functions.

The [Super Admin](https://wordpress.org/documentation/article/roles-and-capabilities/#super-admin) role allows a user to perform all possible capabilities. Each of the other roles has a decreasing number of allowed capabilities. For instance, the [Subscriber](https://wordpress.org/documentation/article/roles-and-capabilities/#subscriber) role has just the “ [read](https://wordpress.org/documentation/article/roles-and-capabilities/#read)” capability. One particular role should not be considered to be senior to another role. Rather, consider that roles define the user’s responsibilities within the site.

## [Summary of Roles](https://wordpress.org/documentation/article/roles-and-capabilities/\#summary-of-roles)

- [Super Admin](https://wordpress.org/documentation/article/roles-and-capabilities/#super-admin) – somebody with access to the site network administration features and all other features. See the [Create a Network](https://wordpress.org/support/article/create-a-network/) article.
- [Administrator](https://wordpress.org/documentation/article/roles-and-capabilities/#administrator) ( _slug: ‘administrator’_) – somebody who has access to all the administration features within a single site.
- [Editor](https://wordpress.org/documentation/article/roles-and-capabilities/#editor) ( _slug: ‘editor’_) – somebody who can publish and manage posts including the posts of other users.
- [Author](https://wordpress.org/documentation/article/roles-and-capabilities/#author)  ( _slug: ‘author’_)  – somebody who can publish and manage their own posts.
- [Contributor](https://wordpress.org/documentation/article/roles-and-capabilities/#contributor) ( _slug: ‘contributor’_) – somebody who can write and manage their own posts but cannot publish them.
- [Subscriber](https://wordpress.org/documentation/article/roles-and-capabilities/#subscriber) ( _slug: ‘subscriber’_) – somebody who can only manage their profile.

Upon installing WordPress, an Administrator account is automatically created.

The default role for new users can be set in [Administration Screens](https://wordpress.org/support/article/administration-screens/) \> [Settings](https://wordpress.org/support/article/administration-screens/#settings-configuration-settings) \> [General](https://wordpress.org/support/article/settings-general-screen/).

## [Roles](https://wordpress.org/documentation/article/roles-and-capabilities/\#roles)

A Role defines a set of tasks a user assigned the role is allowed to perform. For instance, the [Super Admin](https://wordpress.org/documentation/article/roles-and-capabilities/#super-admin) role encompasses every possible task that can be performed within a [Network](https://wordpress.org/support/article/glossary/#network) of virtual WordPress [sites](https://wordpress.org/support/article/glossary/#site). The [Administrator](https://wordpress.org/documentation/article/roles-and-capabilities/#administrator) role limits the allowed tasks only to those which affect a single site. On the other hand, the [Author](https://wordpress.org/documentation/article/roles-and-capabilities/#author) role allows the execution of just a small subset of tasks.

The following sections list the default Roles and their capabilities:

### [Super Admin](https://wordpress.org/documentation/article/roles-and-capabilities/\#super-admin)

Multisite Super Admins have, by default, all capabilities. The following Multisite-only capabilities are therefore only available to Super Admins:

- [create\_sites](https://wordpress.org/documentation/article/roles-and-capabilities/#create_sites)
- [delete\_sites](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_sites)
- [manage\_network](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_network)
- [manage\_sites](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_sites)
- [manage\_network\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_network_users)
- [manage\_network\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_network_plugins)
- [manage\_network\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_network_themes)
- [manage\_network\_options](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_network_options)
- [upgrade\_network](https://wordpress.org/documentation/article/roles-and-capabilities/#upgrade_network)
- [setup\_network](https://wordpress.org/documentation/article/roles-and-capabilities/#setup_network)

In the case of single site WordPress installation, Administrators are, in effect, Super Admins. As such, they are the only ones to have access to [additional admin capabilities](https://wordpress.org/support/article/roles-and-capabilities/#additional-admin-capabilities).

### [Administrator](https://wordpress.org/documentation/article/roles-and-capabilities/\#administrator)

The capabilities of Administrators differs between single site and [Multisite](https://wordpress.org/support/article/glossary/#multisite) WordPress installations. All administrators have the following capabilities:

- [activate\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#activate_plugins)
- [delete\_others\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_others_pages)
- [delete\_others\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_others_posts)
- [delete\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_pages)
- [delete\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_posts)
- [delete\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_private_pages)
- [delete\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_private_posts)
- [delete\_published\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_published_pages)
- [delete\_published\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_published_posts)
- [edit\_dashboard](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_dashboard)
- [edit\_others\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_others_pages)
- [edit\_others\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_others_posts)
- [edit\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_pages)
- [edit\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_posts)
- [edit\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_private_pages)
- [edit\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_private_posts)
- [edit\_published\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_published_pages)
- [edit\_published\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_published_posts)
- [edit\_theme\_options](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_theme_options)
- [export](https://wordpress.org/documentation/article/roles-and-capabilities/#export)
- [import](https://wordpress.org/documentation/article/roles-and-capabilities/#import)
- [list\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#list_users)
- [manage\_categories](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_categories)
- [manage\_links](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_links)
- [manage\_options](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_options)
- [moderate\_comments](https://wordpress.org/documentation/article/roles-and-capabilities/#moderate_comments)
- [promote\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#promote_users)
- [publish\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#publish_pages)
- [publish\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#publish_posts)
- [read\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#read_private_pages)
- [read\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#read_private_posts)
- [read](https://wordpress.org/documentation/article/roles-and-capabilities/#read)
- [remove\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#remove_users)
- [switch\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#switch_themes)
- [upload\_files](https://wordpress.org/documentation/article/roles-and-capabilities/#upload_files)
- [customize](https://wordpress.org/documentation/article/roles-and-capabilities/#customize)
- [delete\_site](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_site)

#### [Additional Admin Capabilities](https://wordpress.org/documentation/article/roles-and-capabilities/\#additional-admin-capabilities)

Only Administrators of single site installations have the following capabilities. In [Multisite](https://wordpress.org/support/article/glossary/#multisite), only the Super Admin has these abilities:

- [update\_core](https://wordpress.org/documentation/article/roles-and-capabilities/#update_core)
- [update\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#update_plugins)
- [update\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#update_themes)
- [install\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#install_plugins)
- [install\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#install_themes)
- [delete\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_themes)
- [delete\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_plugins)
- [edit\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_plugins)
- [edit\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_themes)
- [edit\_files](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_files)
- [edit\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_users)
- [add\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#add_users)
- [create\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#create_users)
- [delete\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_users)
- [unfiltered\_html](https://wordpress.org/documentation/article/roles-and-capabilities/#unfiltered_html)

### [Editor](https://wordpress.org/documentation/article/roles-and-capabilities/\#editor)

- [delete\_others\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_others_pages)
- [delete\_others\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_others_posts)
- [delete\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_pages)
- [delete\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_posts)
- [delete\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_private_pages)
- [delete\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_private_posts)
- [delete\_published\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_published_pages)
- [delete\_published\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_published_posts)
- [edit\_others\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_others_pages)
- [edit\_others\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_others_posts)
- [edit\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_pages)
- [edit\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_posts)
- [edit\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_private_pages)
- [edit\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_private_posts)
- [edit\_published\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_published_pages)
- [edit\_published\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_published_posts)
- [manage\_categories](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_categories)
- [manage\_links](https://wordpress.org/documentation/article/roles-and-capabilities/#manage_links)
- [moderate\_comments](https://wordpress.org/documentation/article/roles-and-capabilities/#moderate_comments)
- [publish\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#publish_pages)
- [publish\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#publish_posts)
- [read](https://wordpress.org/documentation/article/roles-and-capabilities/#read)
- [read\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/#read_private_pages)
- [read\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#read_private_posts)
- [unfiltered\_html](https://wordpress.org/documentation/article/roles-and-capabilities/#unfiltered_html) (not with Multisite)
- [upload\_files](https://wordpress.org/documentation/article/roles-and-capabilities/#upload_files)

### [Author](https://wordpress.org/documentation/article/roles-and-capabilities/\#author)

- [delete\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_posts)
- [delete\_published\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_published_posts)
- [edit\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_posts)
- [edit\_published\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_published_posts)
- [publish\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#publish_posts)
- [read](https://wordpress.org/documentation/article/roles-and-capabilities/#read)
- [upload\_files](https://wordpress.org/documentation/article/roles-and-capabilities/#upload_files)

### [Contributor](https://wordpress.org/documentation/article/roles-and-capabilities/\#contributor)

- [delete\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#delete_posts)
- [edit\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_posts)
- [read](https://wordpress.org/documentation/article/roles-and-capabilities/#read)

### [Subscriber](https://wordpress.org/documentation/article/roles-and-capabilities/\#subscriber)

- [read](https://wordpress.org/documentation/article/roles-and-capabilities/#read)

### [Special Cases](https://wordpress.org/documentation/article/roles-and-capabilities/\#special-cases)

The following capabilities are special cases:

- [unfiltered\_upload](https://wordpress.org/documentation/article/roles-and-capabilities/#unfiltered_upload) – This capability is not available to any role by default (including Super Admins). The capability needs to be enabled by defining the following constant:

```
define( 'ALLOW_UNFILTERED_UPLOADS', true );
```

With this constant defined, all roles on a single site install can be given the unfiltered\_upload capability, but only Super Admins can be given the capability on a Multisite install.

### [Capability vs. Role Table](https://wordpress.org/documentation/article/roles-and-capabilities/\#capability-vs-role-table)

Note that the capabilities of Administrators **differs** between single site and [Multisite](https://wordpress.org/support/article/glossary/#multisite) WordPress installations, [as described above](https://wordpress.org/documentation/article/roles-and-capabilities/#additional-admin-capabilities) .

| Capability | Super Admin | Administrator | Editor | Author | Contributor | Subscriber |
| --- | --- | --- | --- | --- | --- | --- |
| create\_sites | yes | x | x | x | x | x |
| delete\_sites | yes | x | x | x | x | x |
| manage\_network | yes | x | x | x | x | x |
| manage\_sites | yes | x | x | x | x | x |
| manage\_network\_users | yes | x | x | x | x | x |
| manage\_network\_plugins | yes | x | x | x | x | x |
| manage\_network\_themes | yes | x | x | x | x | x |
| manage\_network\_options | yes | x | x | x | x | x |
| upload\_plugins | yes | x | x | x | x | x |
| upload\_themes | yes | x | x | x | x | x |
| upload\_network | yes | x | x | x | x | x |
| upgrade\_network | yes | x | x | x | x | x |
| setup\_network | yes | x | x | x | x | x |
| activate\_plugins | yes | yes (single site or <br>enabled by <br>network setting) | x | x | x | x |
| create\_users | yes | yes (single site) | x | x | x | x |
| delete\_plugins | yes | yes (single site) | x | x | x | x |
| delete\_themes | yes | yes (single site) | x | x | x | x |
| delete\_users | yes | yes (single site) | x | x | x | x |
| edit\_files | yes | yes (single site) | x | x | x | x |
| edit\_plugins | yes | yes (single site) | x | x | x | x |
| edit\_theme\_options | yes | yes | x | x | x | x |
| edit\_themes | yes | yes (single site) | x | x | x | x |
| edit\_users | yes | yes (single site) | x | x | x | x |
| export | yes | yes | x | x | x | x |
| import | yes | yes | x | x | x | x |
| install\_plugins | yes | yes (single site) | x | x | x | x |
| install\_themes | yes | yes (single site) | x | x | x | x |
| list\_users | yes | yes | x | x | x | x |
| manage\_options | yes | yes | x | x | x | x |
| promote\_users | yes | yes | x | x | x | x |
| remove\_users | yes | yes | x | x | x | x |
| switch\_themes | yes | yes | x | x | x | x |
| update\_core | yes | yes (single site) | x | x | x | x |
| update\_plugins | yes | yes (single site) | x | x | x | x |
| update\_themes | yes | yes (single site) | x | x | x | x |
| edit\_dashboard | yes | yes | x | x | x | x |
| customize | yes | yes | x | x | x | x |
| delete\_site | yes | yes | x | x | x | x |
| moderate\_comments | yes | yes | yes | x | x | x |
| manage\_categories | yes | yes | yes | x | x | x |
| manage\_links | yes | yes | yes | x | x | x |
| edit\_others\_posts | yes | yes | yes | x | x | x |
| edit\_pages | yes | yes | yes | x | x | x |
| edit\_others\_pages | yes | yes | yes | x | x | x |
| edit\_published\_pages | yes | yes | yes | x | x | x |
| publish\_pages | yes | yes | yes | x | x | x |
| delete\_pages | yes | yes | yes | x | x | x |
| delete\_others\_pages | yes | yes | yes | x | x | x |
| delete\_published\_pages | yes | yes | yes | x | x | x |
| delete\_others\_pos | yes | yes | yes | x | x | x |
| delete\_private\_posts | yes | yes | yes | x | x | x |
| edit\_private\_posts | yes | yes | yes | x | x | x |
| read\_private\_posts | yes | yes | yes | x | x | x |
| delete\_private\_pages | yes | yes | yes | x | x | x |
| edit\_private\_pages | yes | yes | yes | x | x | x |
| read\_private\_pages | yes | yes | yes | x | x | x |
| unfiltered\_html | yes | yes (single site) | yes (single site) | x | x | x |
| unfiltered\_html | yes | yes | yes | x | x | x |
| edit\_published\_posts | yes | yes | yes | yes | x | x |
| upload\_files | yes | yes | yes | yes | x | x |
| publish\_posts | yes | yes | yes | yes | x | x |
| delete\_published\_posts | yes | yes | yes | yes | x | x |
| edit\_posts | yes | yes | yes | yes | yes | x |
| delete\_posts | yes | yes | yes | yes | yes | x |
| read | yes | yes | yes | yes | yes | yes |

## [Capabilities](https://wordpress.org/documentation/article/roles-and-capabilities/\#capabilities)

### [switch\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/\#switch_themes)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - Appearance
  - Appearance > Themes

### [edit\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_themes)

- Since 2.0
- Allows access to Appearance > [Theme Editor](https://codex.wordpress.org/Appearance_Editor_SubPanel) to edit theme files.

### [edit\_theme\_options](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_theme_options)

- Since 3.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - Appearance > [Widgets](https://codex.wordpress.org/Appearance_Widgets_SubPanel)
  - Appearance > [Menus](https://wordpress.org/support/article/appearance-menus-screen/)
  - Appearance > [Customize](https://wordpress.org/support/article/appearance-customize-screen/) if they are supported by the current theme
  - Appearance > [Header](https://codex.wordpress.org/Appearance_Header_SubPanel)

### [install\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/\#install_themes)

- Since 2.8
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - Appearance > Add New Themes

### [activate\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/\#activate_plugins)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - [Plugins](https://wordpress.org/support/article/administration-screens/#plugins-add-functionality-to-your-blog)

### [edit\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_plugins)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - [Plugins](https://wordpress.org/support/article/administration-screens/#plugins-add-functionality-to-your-blog) \> [Plugin Editor](https://wordpress.org/support/article/administration-screens/#plugin-editor)

### [install\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/\#install_plugins)

- Since 2.7
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - [Plugins](https://wordpress.org/support/article/administration-screens/#plugins-add-functionality-to-your-blog) \> Add New

### [edit\_users](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_users)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - [Users](https://wordpress.org/support/article/administration-screens/#users-your-blogging-family)

### [edit\_files](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_files)

- Since 2.0
- **Note:** No longer used.

### [manage\_options](https://wordpress.org/documentation/article/roles-and-capabilities/\#manage_options)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - Settings > General
  - Settings > Writing
  - Settings > Reading
  - Settings > Discussion
  - Settings > Permalinks
  - Settings > Miscellaneous

### [moderate\_comments](https://wordpress.org/documentation/article/roles-and-capabilities/\#moderate_comments)

- Since 2.0
- Allows users to moderate comments from the Comments Screen (although a user needs the [edit\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_posts) Capability in order to access this)

### [manage\_categories](https://wordpress.org/documentation/article/roles-and-capabilities/\#manage_categories)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - Posts > Categories
  - Links > Categories

### [manage\_links](https://wordpress.org/documentation/article/roles-and-capabilities/\#manage_links)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - Links
  - Links > Add New

### [upload\_files](https://wordpress.org/documentation/article/roles-and-capabilities/\#upload_files)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - Media
  - Media > Add New

### [import](https://wordpress.org/documentation/article/roles-and-capabilities/\#import)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - Tools > Import
  - Tools > Export

### [unfiltered\_html](https://wordpress.org/documentation/article/roles-and-capabilities/\#unfiltered_html)

- Since 2.0
- Allows user to post HTML markup or even JavaScript code in pages, posts, comments and widgets.
- **Note:** Enabling this option for untrusted users may result in their posting malicious or poorly formatted code.
- **Note:** In WordPress Multisite, only Super Admins have the `unfiltered_html` capability.

### [edit\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_posts)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - Posts
  - Posts > Add New
  - Comments
  - Comments > Awaiting Moderation

### [edit\_others\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_others_posts)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - Manage > Comments ( _Lets user delete and edit every comment, see edit\_posts above_)
- user can edit other users’ posts through function get\_others\_drafts()
- user can see other users’ images in inline-uploading \[no? see [inline-uploading.php](https://trac.wordpress.org/file/trunk/wp-admin/inline-uploading.php)\]
- See [Exceptions](https://wordpress.org/documentation/article/roles-and-capabilities/#exceptions)

### [edit\_published\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_published_posts)

- Since 2.0
- User can edit their published posts. _This capability is off by default._
- The core checks the capability **edit\_posts**, but on demand this check is changed to **edit\_published\_posts**.
- If you don’t want a user to be able to edit their published posts, remove this capability.

### [publish\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/\#publish_posts)

- Since 2.0
- See and use the “publish” button when editing their post _(otherwise they can only save drafts)_
- Can use XML-RPC to publish _(otherwise they get a “Sorry, you can not post on this weblog or category.”)_

### [edit\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_pages)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - Pages
  - Pages > Add New

### [read](https://wordpress.org/documentation/article/roles-and-capabilities/\#read)

- Since 2.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - [Dashboard](https://wordpress.org/support/article/dashboard-screen/)
  - Users > Your Profile
- _Used nowhere in the core code except the menu.php_

### [publish\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/\#publish_pages)

- Since 2.1

### [edit\_others\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_others_pages)

- Since 2.1

### [edit\_published\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_published_pages)

- Since 2.1

### [delete\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_pages)

- Since 2.1

### [delete\_others\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_others_pages)

- Since 2.1

### [delete\_published\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_published_pages)

- Since 2.1

### [delete\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_posts)

- Since 2.1

### [delete\_others\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_others_posts)

- Since 2.1

### [delete\_published\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_published_posts)

- Since 2.1

### [delete\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_private_posts)

- Since 2.1

### [edit\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_private_posts)

- Since 2.1

### [read\_private\_posts](https://wordpress.org/documentation/article/roles-and-capabilities/\#read_private_posts)

- Since 2.1

### [delete\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_private_pages)

- Since 2.1

### [edit\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_private_pages)

- Since 2.1

### [read\_private\_pages](https://wordpress.org/documentation/article/roles-and-capabilities/\#read_private_pages)

- Since 2.1

### [delete\_users](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_users)

- Since 2.1

### [create\_users](https://wordpress.org/documentation/article/roles-and-capabilities/\#create_users)

- Since 2.1
- Allows creating new users.
  - Without other capabilities, created users will have your blog’s [New User Default Role](https://wordpress.org/support/article/settings-general-screen/).

### [unfiltered\_upload](https://wordpress.org/documentation/article/roles-and-capabilities/\#unfiltered_upload)

- Since 2.3

### [edit\_dashboard](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_dashboard)

- Since 2.5

### [customize](https://wordpress.org/documentation/article/roles-and-capabilities/\#customize)

- Since 4.0
- Allows access to the Customizer.

### [delete\_site](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_site)

- Since 4.0
- Allows the user to delete the current site (Multisite only).

### [update\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/\#update_plugins)

- Since 2.6

### [delete\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_plugins)

- Since 2.6

### [update\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/\#update_themes)

- Since 2.7

### [update\_core](https://wordpress.org/documentation/article/roles-and-capabilities/\#update_core)

- Since 3.0

### [list\_users](https://wordpress.org/documentation/article/roles-and-capabilities/\#list_users)

- Since 3.0
- Allows access to [Administration Screens](https://wordpress.org/support/article/administration-screens/) options:

  - [Users](https://wordpress.org/support/article/administration-screens/#users-your-blogging-family)

### [remove\_users](https://wordpress.org/documentation/article/roles-and-capabilities/\#remove_users)

- Since 3.0

### [add\_users](https://wordpress.org/documentation/article/roles-and-capabilities/\#add_users)

- Since 3.0
- Replaced in 4.4 with [promote\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#promote_users)

### [promote\_users](https://wordpress.org/documentation/article/roles-and-capabilities/\#promote_users)

- Since 3.0
- Enables the “Change role to…” dropdown in the admin user list.
  - This does not depend on ‘ [edit\_users](https://wordpress.org/documentation/article/roles-and-capabilities/#edit_users)‘ capability.
- Enables the ‘Add Existing User’ to function for multi-site installs.

### [delete\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_themes)

- Since 3.0

### [export](https://wordpress.org/documentation/article/roles-and-capabilities/\#export)

- Since 3.0

### [edit\_comment](https://wordpress.org/documentation/article/roles-and-capabilities/\#edit_comment)

- Since 3.1

### [create\_sites](https://wordpress.org/documentation/article/roles-and-capabilities/\#create_sites)

- Since 3.1
- Multi-site only
- Allows user to create sites on the network

### [delete\_sites](https://wordpress.org/documentation/article/roles-and-capabilities/\#delete_sites)

- Since 3.1
- Multi-site only
- Allows user to delete sites on the network

### [manage\_network](https://wordpress.org/documentation/article/roles-and-capabilities/\#manage_network)

- Since 3.0
- Multi-site only
- Allows access to [Super Admin](https://wordpress.org/support/article/multisite-network-administration/) menu
- Allows user to upgrade network

### [manage\_sites](https://wordpress.org/documentation/article/roles-and-capabilities/\#manage_sites)

- Since 3.0
- Multi-site only
- Allows access to [Network Sites](https://codex.wordpress.org/Network_Admin#Sites) menu
- Allows user to add, edit, delete, archive, unarchive, activate, deactivate, spam and unspam new site/blog in the network

### [manage\_network\_users](https://wordpress.org/documentation/article/roles-and-capabilities/\#manage_network_users)

- Since 3.0
- Multi-site only
- Allows access to [Network Users](https://codex.wordpress.org/Network_Admin#Users) menu

### [manage\_network\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/\#manage_network_themes)

- Since 3.0
- Multi-site only
- Allows access to [Network Themes](https://codex.wordpress.org/Network_Admin#Themes) menu

### [manage\_network\_options](https://wordpress.org/documentation/article/roles-and-capabilities/\#manage_network_options)

- Since 3.0
- Multi-site only
- Allows access to [Network Options](https://codex.wordpress.org/Network_Admin#Settings) menu

### [manage\_network\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/\#manage_network_plugins)

- Multi-site only
- Allows access to [Network Plugins](https://codex.wordpress.org/Network_Admin#Plugins) menu

### [upload\_plugins](https://wordpress.org/documentation/article/roles-and-capabilities/\#upload_plugins)

- Since 4.0
- Multi-site only
- Allows user to upload plugin ZIP files from the [Network Plugins](https://codex.wordpress.org/Network_Admin#Plugins) -\> Add New menu

### [upload\_themes](https://wordpress.org/documentation/article/roles-and-capabilities/\#upload_themes)

- Since 4.0
- Multi-site only
- Allows user to upload theme ZIP files from the [Network Themes](https://codex.wordpress.org/Network_Admin#Themes) -\> Add New menu

### [upgrade\_network](https://wordpress.org/documentation/article/roles-and-capabilities/\#upgrade_network)

- Since 4.8
- Multi-site only
- is used to determine whether a user can access the Network Upgrade page in the network admin. Related to this, the capability is also checked to determine whether to show the notice that a network upgrade is required. The capability is not mapped, so it is only granted to network administrators. See [#39205](https://core.trac.wordpress.org/ticket/39205) for background discussion.

### [setup\_network](https://wordpress.org/documentation/article/roles-and-capabilities/\#setup_network)

- Since 4.8
- Multi-site only
- is used to determine whether a user can setup multisite, i.e. access the Network Setup page. Before setting up a multisite, the capability is mapped to the \`manage\_options\` capability, so that it is granted to administrators. Once multisite is setup, it is mapped to \`manage\_network\_options\`, so that it is granted to network administrators. See [#39206](https://core.trac.wordpress.org/ticket/39206) for background discussion.

## [Resources](https://wordpress.org/documentation/article/roles-and-capabilities/\#resources)

### [Plugins](https://wordpress.org/documentation/article/roles-and-capabilities/\#plugins)

- [Members Plugin](https://wordpress.org/plugins/members/)
- [User Access Manager](https://wordpress.org/plugins/user-access-manager/)
- [Advanced Access Manager](https://wordpress.org/plugins/advanced-access-manager/)
- [User Role Editor](https://wordpress.org/plugins/user-role-editor/)
- [WordPress User Role Editor](https://wordpress.org/plugins/wpfront-user-role-editor/)
- [Simple Membership Plugin](https://wordpress.org/plugins/simple-membership/)
- [View Admin As](https://wordpress.org/plugins/view-admin-as/) (manage & test roles)

## Was this article helpful? How could it be improved? [Cancel reply](https://wordpress.org/documentation/article/roles-and-capabilities/\#respond)

[Log in to submit feedback](https://login.wordpress.org/?redirect_to=https%3A%2F%2Fwordpress.org%2Fdocumentation%2Farticle%2Froles-and-capabilities%2F&locale=en_US). If you need support with something that wasn't covered by this article, please post your question in the [support forums](https://wordpress.org/support/forums/).

First published

December 1, 2018

Last updated

September 20, 2024

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