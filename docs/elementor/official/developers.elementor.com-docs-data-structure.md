[Skip to content](https://developers.elementor.com/docs/data-structure/#VPContent)

On this page

# Data Structure [​](https://developers.elementor.com/docs/data-structure/\#data-structure)

Elementor CoreAdvanced

Elementor relies on a particular data structure to function. This structure plays a significant role in the platform's processes and is essential to its operation. Developers should be familiar with the key aspects of Elementor's data structure including its format and application.

## Elementor Engine [​](https://developers.elementor.com/docs/data-structure/\#elementor-engine)

The entire Elementor engine consists of multiple components that interact with the Elementor data layer. It's an integral part of Elementor's functioning and is used throughout its operations.

There are two distinct aspects to the engine's functionality:

- The editor is responsible for creating the structured data using a visual drag-and-drop interface.
- The frontend is responsible for parsing the page data to create the page layout.

## Data Format [​](https://developers.elementor.com/docs/data-structure/\#data-format)

In terms of data format, Elementor uses JSON to structure data as it's easy for humans to read and write and easy for machines to parse and generate. JSON files are widely used to exchange data in a structured way, making them a practical choice for Elementor.

## Saved Data [​](https://developers.elementor.com/docs/data-structure/\#saved-data)

The Elementor JSON data structure is used to store the configuration and content of a page created with Elementor. It is a serialized representation of the page's layout and its settings.

The JSON data is standardized so it can be exported and imported to replicate the page design across different pages and different WordPress installations.

## Data Storage [​](https://developers.elementor.com/docs/data-structure/\#data-storage)

When a user clicks the save button in the editor, Elementor stores the page data and layout in a JSON format as WordPress post metadata, which is essentially a WordPress custom field. WordPress stores custom fields in the [wp\_postmeta](https://codex.wordpress.org/Database_Description#Table:_wp_postmeta) table in the database.

Elementor data is saved as a private custom field which is not visible in the WordPress dashboard. A simple way to access the data is by downloading an Elementor "Template" file. This action creates a `*.json` file containing the page data.

## Elementor Data Structure [​](https://developers.elementor.com/docs/data-structure/\#elementor-data-structure)

To understand how the JSON file is structured, read the following:

- [General Structure](https://developers.elementor.com/docs/data-structure/general-structure)
- [Page Settings](https://developers.elementor.com/docs/data-structure/page-settings)
- [Page Content](https://developers.elementor.com/docs/data-structure/page-content)

For information about element types:

- [General Elements](https://developers.elementor.com/docs/data-structure/general-elements)
- [Container Element](https://developers.elementor.com/docs/data-structure/container-element)
- [Widget Element](https://developers.elementor.com/docs/data-structure/widget-element)
- [Repeaters](https://developers.elementor.com/docs/data-structure/repeaters)
- [Responsive Data](https://developers.elementor.com/docs/data-structure/responsive-data)
- [Global Styles](https://developers.elementor.com/docs/data-structure/global-styles)