# Feeling Yachty — WordPress notes

## Sites / roles

Feeling Yachty uses WordPress (with Elementor) for public site surfaces and content automation via n8n.

Related live workflows:

| Workflow | ID | Status |
|----------|----|--------|
| Feeling Yachty - WordPress to GHL Sync | `t5qCvpFPAZra3mtU` | Active but historically silent (no live webhooks since ~Aug 8) |
| Feeling Yachty - WordPress Auto Blogging | `gKezuNipPn2PjqTV` | Active |
| Panama WordPress Auto Blogging | `3ntAg4vVAUkB0YYD` | Inactive |
| Miami WordPress Auto Blogging | `qlkHJz9t8Hycxckw` | Inactive |
| My Database - WordPress Price Push | `g43rMtzoPHrvegIT` | Active |
| FY WP Push Test | `7kUHv3SnHmsacwo1` | Inactive — application password invalid |

## Access model for agents

Direct edits require environment secrets:

- `WORDPRESS_SITE_URL`
- `WORDPRESS_USERNAME`
- `WORDPRESS_APPLICATION_PASSWORD`

Use the REST API (Application Passwords) for posts, pages, media, and custom fields. Prefer official handbook mirrors in `official/` for endpoint contracts.

## Official mirrors

See `docs/wordpress/official/` — refreshed every Monday.
