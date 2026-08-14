[Skip to content](https://www.holisticseo.digital/python-seo/knowledge-graph/#content "Skip to content")

![Entity SEO Knowledge Graph](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-entity-seo.jpg)

Google Knowledge Graph produces Knowledge Panels for entities that are reliable and have enough “Search Demand”. Knowledge Panels that appear in SERP show the relationships of related entities and how Google interprets the character of queries and search intent. More information is available on Knowledge Graph and Knowledge Panel features that are of great value to SEO. However, this article will mainly focus on the Google Knowledge Graph API. You can see the difference between a “string” and a “thing” with the Google Knowledge Graph API.

Google is a **Hybrid Search Engine**. In other words, it is a Search Engine that offers a **Personalized Search Experience** with **Phrase-based**, **Entity-based**, and Hypertextual features and integrates Artificial Intelligence Systems into its algorithms. Amit Singhal said a nice word in 2012 when the Knowledge Graph was announced.

> “Not strings, things”.
>
> Amit Singhal, Google Fellow

If you do not know what an entity is for a Search Engine and how can it help a Search Engine to understand a “content” better, you may check Google’s AI Blog to learn more about related terms such as Contextual Information Retriever or you may read our related Guidelines such as “ [**Information Extraction with Python**](https://www.holisticseo.digital/python-seo/information-extraction/)“. You can also read our “ [**PyTrend Guideline**](https://www.holisticseo.digital/python-seo/google-trends/)” article to see how related entities are registered in Google Trends and how they are associated with which query.

Introducing the Knowledge Graph - YouTube

Tap to unmute

[Introducing the Knowledge Graph](https://www.youtube.com/watch?v=mmQl6VGvX-c) [Google](https://www.youtube.com/channel/UCK8sQmJBp8GCxrOtXWBpyEA)

Google14.5M subscribers

[Watch on](https://www.youtube.com/watch?v=mmQl6VGvX-c)

“Wouldn’t it be amazing that Google actually understand the words when you are doing search?” is the summative question asked by Jack Menzel, Product Management Director of Google.

In this article, we will connect to the **Google Knowledge Graph API** with Python and Advertools, converting the most relevant Entities in specific queries into a data frame. We will examine entities’ IDs, their URLs in the **Knowledge Base**, how relevant they appear to be with which query, and how they are perceived in what language. We will also talk about the importance of perceiving a company as a real-world entity for SEO along with **Semantic Search Engine Features** and the Importance of Entities in the Ranking Algorithms.

Before going any further, I must say what Advertools is. Advertools is a Python Package developed by Elias Dabbas. Advertools is a technology that combines Coding and Marketing concepts with a Data Science perspective and facilitates many processes for Holistic SEOs.

I thank Elias Dabbas that he developed the Advertools and he created this function by being inspired by an SEO Case Study that I have written in Serpstat for the Unibaby with the question of “Is your brand is a string or a thing?”.

![elias dabbas advertools knowledge graph api](https://www.holisticseo.digital/wp-content/uploads/2020/09/elias-dabbas-advertools-knowledge-graph-api.png)After the update has been launched, I have started to write this guideline.

**Contents of the Article**[show](https://www.holisticseo.digital/python-seo/knowledge-graph/#)

1. [1.Using Google Knowledge Graph API with Advertools to Analyze Entity Profiles](https://www.holisticseo.digital/python-seo/knowledge-graph/#Using-Google-Knowledge-Graph-API-with-Advertools-to-Analyze-Entity-Profiles)
1. [1.1.1.Is Google Knowledge Graph API Suitable for Using in a Production-Critical Service?](https://www.holisticseo.digital/python-seo/knowledge-graph/#1Is-Google-Knowledge-Graph-API-Suitable-for-Using-in-a-Production-Critical-Service)
2. [1.2.2\. Installing or Updating the Advertools](https://www.holisticseo.digital/python-seo/knowledge-graph/#2-Installing-or-Updating-the-Advertools)
3. [1.3.3\. Opening a Google Developer Console Account and Creating Credentials](https://www.holisticseo.digital/python-seo/knowledge-graph/#3-Opening-a-Google-Developer-Console-Account-and-Creating-Credentials)
4. [1.4.4\. Using Advertools for Querying in Knowledge Graph API](https://www.holisticseo.digital/python-seo/knowledge-graph/#4-Using-Advertools-for-Querying-in-Knowledge-Graph-API)
      01. [1.4.1.How to Interpret Entities in the Google Knowledge Graph for Given Query with Advertools](https://www.holisticseo.digital/python-seo/knowledge-graph/#How-to-Interpret-Entities-in-the-Google-Knowledge-Graph-for-Given-Query-with-Advertools)
      02. [1.4.2.Is Your Brand a String or A Thing? Entity Association Process for Targeted Industries and Search Terms](https://www.holisticseo.digital/python-seo/knowledge-graph/#Is-Your-Brand-a-String-or-A-Thing-Entity-Association-Process-for-Targeted-Industries-and-Search-Terms)
      03. [1.4.3.Importance of Sub-sides and Sub-profiles of Entities in a Knowledge Base Hierarchy](https://www.holisticseo.digital/python-seo/knowledge-graph/#Importance-of-Sub-sides-and-Sub-profiles-of-Entities-in-a-Knowledge-Base-Hierarchy)
      04. [1.4.4.How is Google Knowledge Graph Entities Registered and By What Score?](https://www.holisticseo.digital/python-seo/knowledge-graph/#How-is-Google-Knowledge-Graph-Entities-Registered-and-By-What-Score)
      05. [1.4.5.Which Columns and Details Do Exist for an Entity in Knowledge Graph?](https://www.holisticseo.digital/python-seo/knowledge-graph/#Which-Columns-and-Details-Do-Exist-for-an-Entity-in-Knowledge-Graph)
      06. [1.4.6.How to Show Knowledge Panels for Entities in Google with URL Parameters and Queries?](https://www.holisticseo.digital/python-seo/knowledge-graph/#How-to-Show-Knowledge-Panels-for-Entities-in-Google-with-URL-Parameters-and-Queries)
      07. [1.4.7.What is a Structured and Semantic Search Engine?](https://www.holisticseo.digital/python-seo/knowledge-graph/#What-is-a-Structured-and-Semantic-Search-Engine)
      08. [1.4.8.How Does Google Realize and Record Different Entities and Different Profiles of Entities?](https://www.holisticseo.digital/python-seo/knowledge-graph/#How-Does-Google-Realize-and-Record-Different-Entities-and-Different-Profiles-of-Entities)
      09. [1.4.9.Question and Answer Patterns for Different Entity Types in the Knowledge Base of Google](https://www.holisticseo.digital/python-seo/knowledge-graph/#Question-and-Answer-Patterns-for-Different-Entity-Types-in-the-Knowledge-Base-of-Google)
      10. [1.4.10.How to Use Python and NLP for Understanding Semantic Structure of Entity Definitions in terms of Content Marketing?](https://www.holisticseo.digital/python-seo/knowledge-graph/#How-to-Use-Python-and-NLP-for-Understanding-Semantic-Structure-of-Entity-Definitions-in-terms-of-Content-Marketing)
      11. [1.4.11.What are the Relevance and Confidence Scores in Google Knowledge Graph API Search Results?](https://www.holisticseo.digital/python-seo/knowledge-graph/#What-are-the-Relevance-and-Confidence-Scores-in-Google-Knowledge-Graph-API-Search-Results)
2. [2.How Does Google Use the Entity Relations for Understanding the Authority of the Web Sites for Given Context?](https://www.holisticseo.digital/python-seo/knowledge-graph/#How-Does-Google-Use-the-Entity-Relations-for-Understanding-the-Authority-of-the-Web-Sites-for-Given-Context)
1. [2.1.An Example of Entity-based Search: How Does Google Use Entities to Understand the Web-entities’ Authority and Expertise?](https://www.holisticseo.digital/python-seo/knowledge-graph/#An-Example-of-Entity-based-Search-How-Does-Google-Use-Entities-to-Understand-the-Web-entities-Authority-and-Expertise)
2. [2.2.Difference Between Spotify and Netflix: It is not Just About Putting Entities into Content](https://www.holisticseo.digital/python-seo/knowledge-graph/#Difference-Between-Spotify-and-Netflix-It-is-not-Just-About-Putting-Entities-into-Content)
3. [3.Advertools’ Knowledge Graph Function for Understanding Google’s Perception of Reality](https://www.holisticseo.digital/python-seo/knowledge-graph/#Advertools-Knowledge-Graph-Function-for-Understanding-Googles-Perception-of-Reality)
1. [3.1.Entities, Languages, and Language Parameter in the Advertools’ “Knowledge\_Graph()” Function](https://www.holisticseo.digital/python-seo/knowledge-graph/#Entities-Languages-and-Language-Parameter-in-the-Advertools-Knowledge-Graph-Function)
4. [4.Last Thoughts on Knowledge Graph, Entities, and Holistic Search Engine Optimization](https://www.holisticseo.digital/python-seo/knowledge-graph/#Last-Thoughts-on-Knowledge-Graph-Entities-and-Holistic-Search-Engine-Optimization)

## Using Google Knowledge Graph API with Advertools to Analyze Entity Profiles

After telling the importance of the Google Knowledge Graph, Knowledge Base, and Entities for the SEO, we may start to use Advertools for our analysis. If you haven’t downloaded Advertools before, you can download it by typing the following command in terminal.

```
pip install advertools
#or
pip3 install advertools
```

To use the Google Knowledge Graph API with Python and see which query comes up with which meaning for Google in which confidence and relevance scores, we will follow the steps below.

- Reading the Warning of the Google Knowledge Graph API
- Installing or Updating the Advertools
- Opening a Google Developer Console Account and Creating the Credentials
- Running our Function with Different Parameter Variations to Analyse Google’s Perception of Real-World Entities

### 1.Is Google Knowledge Graph API Suitable for Using in a Production-Critical Service?

Google Knowledge Graph API has the following warning in its official document, as well as in its own official document, Advertools.

> This API is not suitable for use as a production-critical service. Your product should not form a critical dependence on this API.
>
> Google Knowledge Graph API Documentation

In other words, while using the Google Knowledge Graph API, you may notice some changes in the Google Knowledge Graph API’s responses. Also, Google KG API doesn’t have an internal team to support it or there is no one for contacting in the context of the Knowledge Graph (KG) API of Google. When I ask this warning to the lovely Martin Splitt, he didn’t say that the results are not reliable, he said that approached the results carefully. Also, a warning might be relevant for the Google Knowledge Graph API’s future, according to Martin Splitt, API is experimental, it can change anytime.

![Google Knowledge Graph API Entity IDs](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-ids-1.png)Freebase is an old service that is being bought by Google which stores real-world entities. The entity IDs from the Google Knowledge Graph start with “g” or “m”. The ones that start with an “m” are from “Freebase while the ones that start with “g” are from Wikidata.

In this context, the reliability of the results or the technical issues with the Google KG API is not clear, but in any case, we should be careful while interpreting the information that we acquired via Google KG API.

From Google’s Search on 2020 Summary, my favorite section was for the Google Knowledge Graph and Natural Language Processing. The Semantic Dots and their representations of the places, peoples, and things are clear representative definitions of the logic of knowledge graphs.

### 2\. Installing or Updating the Advertools

```
pip install advertools #for downloading it
pip install --upgrade advertools #for updating it

"""--user option can be used if you want to download the Advertools only for the specific user and its permission priviliages."""
```

If you have downloaded the Advertools before, be sure that it is version 0.10.7 or further. To be sure, you can use the command below for checking the version of the Advertools.

```
pip show advertools
OUTPUT>>>
Name: advertools
Version: 0.10.7
Summary: Productivity and analysis tools for online marketing
Home-page: https://github.com/eliasdabbas/advertools
Author: Elias Dabbas
Author-email: eliasdabbas@gmail.com
License: MIT license
Location: c:\python38\lib\site-packages
Requires: scrapy, pandas, twython, pyasn1
Required-by:
```

As we can see, the version of the Advertools is 0.10.7.

### 3\. Opening a Google Developer Console Account and Creating Credentials

In order to preserve the integrity of the Guideline, I will only talk about this section shortly. Below are the steps to follow in order to open a Google Developer Console Account, Create a Project, and Credentials.

- Open a Google Developer Console Account (Requires a Gmail Account)
- Create a new project under the same Google Developer Console Account
- Include the Google Knowledge Graph API in the project.
- Create and Copy the Credentials (Read the Security and Billing Warnings)

After creating the Google Knowledge Graph Project, do not share the created Credentials with anyone, and giving your project a name according to your purpose can prevent future confusion.

![Google Knowledge Graph API and Google Developer Console](https://www.holisticseo.digital/wp-content/uploads/2020/09/google-developer-console-project-1200x143.png)You may see how to find the related API after opening the related Project. You also may check my Project Name as it is marked with red rectangle at the left upper corner.

After creating the project (Advertools Knowledge Graph API in my case as in the image) and selecting the related API from the search bar, you will see the screen below for activation of the Google Knowledge Graph API.

![Knowledge Graph Search API Activation](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-api-activation.png)You should activate the Knowledge Graph Search API with the Enable Button.

The best section in the image above is the sentence of that “Searches the Google Knowledge Graph for Entities”. Isn’t it beautiful? To continue, you should enable (activate) the Knowledge Graph Search API for the created project. After you have activated the API, you will see the screen below to create and copy the credentials.

![Google Knowledge Graph API Credential Creation](https://www.holisticseo.digital/wp-content/uploads/2020/09/create-credentials-for-knowledge-graph-api-1200x155.png)Click the “Create Credentials” button for finishing the process.

After clicking the Create Credentials, you will see the screen below for determining the last conditions for your API Usage.

![Create Credentials for Google Knowledge Graph Search API](https://www.holisticseo.digital/wp-content/uploads/2020/09/create-credentials-for-api.png)Choose the API that you need to create credentials for, in which case it is Knowledge Graph Search API. After choosing the right API, click the “What Credentials do I need?” button.

After clicking the “What Credentials do I need?” button, you will see your API Key as below.

![Google Developer Console API Key](https://www.holisticseo.digital/wp-content/uploads/2020/09/google-developer-console-api-key.png)You may see the API Key that is necessary for us to use our Advertools Function for Google Knowledge Graph API Usage.

After creating the Credentials, you may see your API Key with a name and a restriction warning as below.

![Knowledge Graph API Key Restriction](https://www.holisticseo.digital/wp-content/uploads/2020/09/api-key-1200x184.png)In this image, the API Key 1 has a “thick sign” at its left because, I have restricted the key, if you do not restrict the key, you shouldn’t share it with other persons.

You also should pay attention to the “Remember to configure the OAuth Consent Screen with information about your application.” warning. It is about restricting the usage of the API Key we have generated. If you share the key with others without any restriction, it can consume your quota and also can create a costly bill for you along with some data breaches. I have restricted my key and also, and before publishing this Guideline, I also will shut down this project so that the key can’t be used by others in the name of me.

Also, I recommend you to use the Other Google Developer Console APIs, there are lots of useful APIs for Holistic SEOs, Marketers, and Coders there like VisionAI API, Google Sheets API or Search Console API. Since we have our Credentials now, we can start with the most important and fun section, Usage of the Knowledge Graph API with Python.

### 4\. Using Advertools for Querying in Knowledge Graph API

Advertools’ designed and developed function for the Google Knowledge Graph API is the “knowledge\_graph()”. Elias Dabbas always pay attention to making Advertools easier to understand and use with a better speed. So, that’s why the “name” is so clear. You will see a basic use case of “knowledge\_graph()” with VSCode in an “ipynb” file.

```
from advertools import knowledge_graph
key = 'AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U'

knowledge_graph(key=key, query='Apple')

OUTPUT>>>
2020-09-19 19:23:56,971 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Apple
```

- In the first line, we have imported the necessary function from the Advertools.
- In the second line, we have assigned our API Key from the before section to a variable.
- We have used the “knowledge\_graph()” function with “key” and “query” parameters. The Key is equal to our API Key, while “query” is equal to “Apple” in our first example.

Below, you will see the output of our “knowledge\_graph()” function call.

![Output of Advertools knowledge_graph function](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-function-output-1200x232.png)In a DataFrame, we have our output with different columns that describes the Apple Entity.

```
kg_df = knowledge_graph(key=key, query='Apple')

#We have assigned the function into a variable to use its output in the future.

kg_df[['result.name','result.description', 'resultScore']]
```

We have different Entity Results for the string of “Apple”. You may see the entity results with their “resultScore” for the “Apple” string.

![Knowledge Graph Search  API Search Results](https://www.holisticseo.digital/wp-content/uploads/2020/10/knowledge-graph-entity-profiles.png)You may see the result’s Names, Kinds, and their Result Scores for the given String.

For small screen devices, if you might not see the result scores in the given image, you may check the results from the table below.

|     |     |
| --- | --- |
| **Result Description** | **Result Score** |
| Technology Company | 40384.667969 |
| Fruit | 7963.320801 |
| American Singer-songwriter | 4755.046875 |
| Watch | 3123.259766 |
| Mobile Phone | 2930.400635 |
| Plants | 2366.545410 |

Result Scores and Result Descriptions

To understand these scores and words in terms of Entity-relations, we should open a new sub-section so that Advertools’ “knowledge\_graph()” function’s importance can be understood deeply.

#### How to Interpret Entities in the Google Knowledge Graph for Given Query with Advertools

We actually have 14 more results, but for making a quick analysis, these are enough for now. “resultScore” is actually the score of the “relevance” and “confidence” of the Entity for the given string. In this example, we see that the “Apple” string has different Entity Profiles that are entirely different from each other and also in a deeper hierarchic order.

Apple is the name of a “Technology Company” that produces “Mobile Phones” and “Watch”. We have known that, but let me give you an example. Try to read the sentence below to understand why entities and their meanings, and relations are important for a Search Engine’s understanding capacity.

![Entity Association with Queries for Websites](https://www.holisticseo.digital/wp-content/uploads/2020/09/entity-relating.jpg)Entity Association and Results Page schema from the “Related Entities” Google Patent. In this example, the “Roald Dahl” entity has directly related to a website that is solely about the entity. Also, related entities are being collected from different websites.

Apple is the name of a “Technology Company” that produces “plants” and “fruits”.

Did it sound weird? In the old times, it wasn’t weird for Search Engines as much as for Human-beings. Entities and their side and sub-profiles, and relations to each other help for Natural Language Processing (NLP), Natural Language Understanding (NLU), and Natural Language Generation (NLG) along with Search Engines to create better Search Engine Results Pages (SERP) with more relevant and logical contents.

We have shown you a “bizarre” example, but if you think a little bit, among the trillions of facts and entities, Search Engines have lots of gray areas, so using relevant entities with related entities and their sub-profiles and side-profiles is important to create a better “context” and “comprehensive” content.

This is the first useful side of the Advertools’ Knowledge Graph API. It shows the relevant Entities with relevancy and confidence level for a string. Most SEOs only focus on “search volume of strings”, but how about the context of “relevant entities” to a searched string? Let me give you one more example below.

Let’s say, you have a short sentence in your travel article like the one below.

“We have gone to the Bellagio Hotel from New York in two hours “.

The sentence above has a landmark that is “Bellagio Hotel” which is in Las Vegas. Technically, no one can go to the Bellagio Hotel from New York in Las Vegas, for 2020, it is not possible with valid technology. In this context, the Search Engine can not give reliability to the sentence because it has a clearly missing point. So, entities help Search Engine to understand “what really is the Bellagio Hotel?”. In reality, also there are other entities that have close names to the “Bellagio Hotel” and “New York” strings together.

![Related Entities Patent of Google](https://www.holisticseo.digital/wp-content/uploads/2020/09/google-entity-association.jpg)The “Related Entities” Patent, shows how Google finds and categorizes related entities with each other.

Someone can’t go Bellagio Hotel from the City of New York, but actually, they can go to the Bellagio Hotel from the “New York Hotel & Casino” in two hours because both of the hotels are in the same city, Las Vegas. But, I assume that “New York Hotel & Casino” has no real importance for the “New York” string according to the “City of New York” and also since the “City of New York” and “travel” related queries have a long history, Google won’t make the assumption I did. Even if Google can configure this connection, these types of calculations will cost more time and evaluation costs. Below, you will see another example from Google AI’s blog with the term “Integrating Retrieval into Language Representation Models”.

You may see that the “missing term” has been covered by the entities and their relations to each other.

#### Is Your Brand a String or A Thing? Entity Association Process for Targeted Industries and Search Terms

This question was the one that inspired Advertools’ “knowledge\_graph ()” function. “Are your Brand is string or thing?” I have asked this question in my Unibaby SEO Case Study which was a major success. I have written a case study article about this project in Serpstat.

In the Unibaby SEO Project and Success, the first thing I audited was whether the brand is a string or an entity? If it is an entity, which other entities are related to it? And how it is positioned in Google’s real-world perception according to its competitors? The same audit also is performed for the “related queries” and “related phrases”. Initially, the firm was not an entity, but the same firm was a subsidiary of a large holding called Eczacıbaşı Holding, which became authoritative in health and baby products. Transforming Unibaby, which is not in the Google Knowledge Graph, from a “string” to an Entity was the first goal of the entire SEO Case Study.

![Entity Search for Unibaby SEO Case Study](https://www.holisticseo.digital/wp-content/uploads/2020/09/entity-searching.png)This is a screenshot that shows how I searched for the Unibaby in the Google Knowledge Graph API before Advertools, the result was empty. You may see below the entity results for the “Eczacibasi” in the same context.

In this context, when Unibaby.com.tr is an Entity, it was also considered with which other Entities it would be associated with. These were Eczacıbaşı Holding, Founder of Eczacıbaşı Holding, Board Members, the products Unibaby.com.tr sells, the services it provides, and all the subjects the target audience needs information. Thus, the company has been associated with certain types of entities and entities on certain subjects, just as it is described in Google Patents, appears in Google SERP, and can be observed with Advertools’ “knowledge\_graph ()” function in Google Knowledge Graph API. The main goal here was to get more trust and relevance scores than the entity-based Algorithms. Also, a real-world entity is way much authoritative and trustworthy according to a “non-recognized string” since it has a real-world existence and provable existence.

Like in the “Roald Dahl” example of Google’s “Related Patents”, being a “real-world entity” that can be related to the target market’s search terms such as “baby products” or “baby growth process” is the most important phase of this task.

**You may see that without Advertools, it is really hard to find the necessary information and insight from the Knowledge Graph API.**

This is a view from the SEO Case Study that shows how I searched in Google Knowledge Graph API before Advertools. You may read the [Unibaby SEO Case Study](https://serpstat.com/blog/the-importance-of-technical-seo-insights-of-technical-issues-of-unibaby-project/), to see more about the case and its “entity-based SEO” intersections.

#### Importance of Sub-sides and Sub-profiles of Entities in a Knowledge Base Hierarchy

The second importance of the Advertools’ “knowledge\_graph()” function, it gives the most related entities along with their sub-profiles and side-profiles. For instance, “Apple” is a “fruit” and “plant” at the same time. “Plant” here is “fruit”s hierarchic inclusive parent here. In content, there can be different features and profiles of an entity along with related entities. This helps Google to understand what is the theme of the content and also which content has a comprehensive angle along with which content has a better fit for the given query.

For instance, in our example, we have used the string of “Apple”, that’s why our “Watch” and “Mobile Phone” entities had a lower rank than the “Fruit”. But also, they had a higher rank than the “plants”. This shows the different relevance scores are determined for the different entity profiles for the given query. So, to show this in a more concrete way, let’s use Advertools.

```
knowledge_graph(key=key, query='Apple Watch')[['result.name', 'result.description', 'resultScore']].style.background_gradient(cmap='Blues')

OUTPUT>>>
2020-09-19 20:44:29,018 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Apple Watch
```

You will see the results for the “Apple Watch” string.

![Python and Advertools Knowledge Graph API Query Results for Apple Watch](https://www.holisticseo.digital/wp-content/uploads/2020/09/advertools-knowledge-graph-1-1200x243.png)As you may see that the results have changed completely.

The result scores along with the results have changed completely, as you may see below.

![Knowledge Graph Search API Search Results](https://www.holisticseo.digital/wp-content/uploads/2020/10/knowledge-graph-result-scores.png)Result Scores, Descriptions, and Names for the given string “Apple Watch”.

If you have a really small screen and can’t see the result scores properly, you may use the table below instead of the image above.

|     |     |
| --- | --- |
| **Result Description** | **Result Score** |
| Apple Watch | 74958.234375 |
| Apple Watch Series 3 | 18721.017578 |
| Apple Watch Series 5 | 18414.267578 |
| Apple Watch Series 4 | 13823.039062 |
| Apple Watch Series 2 | 5665.439941 |
| Apple | 28.846193 |

Result Scores and Descriptions Table.

You may see that for the “Apple Watch” string, we have different results with different “resultScore”. Also, there are not any “fruits” or “plants” for this query. And we also have side profiles of the “Apple Watch” entities such as “Music Recording” features. Also, we have a song named “Apple Watch” that is signed by “Hustensaft Jüngling”, I believe it is a kind of local marketing song for Germany (or, at least I hope).

![Entity Assignment for Search Queries and Ranking](https://www.holisticseo.digital/wp-content/uploads/2020/09/entity-types-for-queries.jpg)An entity’s type is important for the search term and also SERP Candidates. The schema is from the Entity Type Assignment Patent.

While looking at these results, I remembered one of the Google Patents whose name is “Detecting Product Lines Within Product Search Queries”. It was also related to detecting new products and new product queries to show the new products in the Search Results for related search trends. It also helps Google to improve its Knowledge Base along with Organic and Consistent Shopping Results. But here, I wonder why is the “Apple Watch Series 3” and “Apple Watch Series 5” have away much more relevance and confidence score than the “Apple Watch Series 2” and the “Apple Watch Series 4”. And, this brings us to the first question before the last one.

#### How is Google Knowledge Graph Entities Registered and By What Score?

Before explaining it, let me show you how you can design your Search Results with only the “URL Queries and Parameters” in Google to show how Google creates knowledge panels for every entity. Let’s choose an entity first from our Advertools Function “knowledge\_graph()”.

```
knowledge_graph(key=key, query='Love')

OUTPUT>>>
2020-09-22 11:02:04,635 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love
```

You will see the output of our call for the query “Love”.

![Knowledge Graph API Usage with Python](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-call-1200x268.png)Knowledge Graph Search API results for the string “Love”.

To show how Google defines, profiles categorize, and rank them according to their relevance and confidence scores, one should examine the Advertools’ “knowledge\_graph()” function’s output columns.

#### Which Columns and Details Do Exist for an Entity in Knowledge Graph?

Let’s check our columns of the data frame.

```
kg_df = knowledge_graph(key=key, query='Love')
#We have assigned our function's output to a variable so that we may avoid creating unnecessary bandwidth consumption for Google. Also, making a function work every time may create a puffy bill. So, using a variable is morer logical option.

#Big thanks to Elias Dabbas for his suggestions on this subject.
```

```
# knowledge_graph(key=key, query='Love').columns, since our output is actually a Pandas Dataframe, you also may use Pandas Attributes directly, but for the reasons that we showed before, it is a unnecessary work.

kg_df.columns

OUTPUT>>>

2020-09-22 11:07:50,145 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love
Index(['query', 'resultScore', '@type', 'result.image.url',\
       'result.image.contentUrl', 'result.@id',\
       'result.detailedDescription.license',\
       'result.detailedDescription.articleBody',\
       'result.detailedDescription.url', 'result.@type', 'result.name',\
       'result.description', 'result.url', 'query_time'],
      dtype='object')
```

We have the columns below from our “Knowledge Graph Search API and Knowledge Graph Search Function from Advertools”.

- “query” which is the string we have searched for in the Knowledge Graph Search API.
- “@type” of the entities in our result data frame.
- “result.image.url” is the URL of the images of the entities in our result data frame.
- “result.image.contentUrl” is the direct image URL of the image of the entity.
- “result.@id” is the id number of the entity which is a quite important detail of a Holistic SEO.
- “result.detailedDescription.licence” is the license of the entity information source attribute.
- “result.detailed.Description.articleBody” is a detailed explanation of the entity.
- “result.detailedDescription.url” is the URL of the detailed explanation of the entity.
- “result.@type” is the type of entity with profile information such as “thing, person or thing, the company”.
- “result.name” is the name of the entity.
- “result.description” is the short definition of the entity such as “Film in 2005, Musical Group, or Film Character”.
- “result.url” is the URL of the best definitive source of the entity which is also quite important for a Holistic SEO.
- “query\_time” is the time that we have performed the function call.

After explained the details of the Knowledge Graph Entities via Advertools’ “knowledge\_graph()” function, we can focus on Google’s working style on them.

![Entity Relations and Attribution](https://www.holisticseo.digital/wp-content/uploads/2020/09/entity-relations.jpg)A schema from Google’s patent is Generating Entity Connections in the Entity Graph. It shows an example of the entities’ connection angles.

#### How to Show Knowledge Panels for Entities in Google with URL Parameters and Queries?

To show one of our entities in a Knowledge Panel of Google, we need the “entity id”.

```
#knowledge_graph(key=key, query='Love')[['result.name',"result.@id"]]

kg_df[['result.name',"result.@id"]]

OUTPUT>>>

2020-09-22 11:31:08,080 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love
result.name	result.@id
0	Love	kg:/m/048knlz
1	Human sexual activity	kg:/m/08_4ns
2	Love	kg:/m/0134py4v
3	Jennifer Love Hewitt	kg:/m/01pgk0
4	Bella Swan	kg:/m/027b7y9
5	=LOVE	kg:/g/11d_ps9gx0
6	Term of endearment	kg:/m/025tc54
7	Amour	kg:/m/0gvvm6l
8	Love's	kg:/m/05f81y3
9	Robert John Lange	kg:/m/01f_z4
10	Yaoi	kg:/m/0f9s9
11	Paris	kg:/m/05qtj
12	Love	kg:/g/11dyqtk5lq
13	Tomato	kg:/m/07j87
14	Bali	kg:/m/01bkb
15	Philadelphia	kg:/m/0dclg
16	Prince	kg:/m/01vvycq
17	Love	kg:/m/0fhr1
18	Love	kg:/g/11g7kqqnph
19	Love	kg:/g/1yfp3mlzm
```

You may see the entity names and entity ids side by side below.

![Entities and Ids](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-entities.png)Our Entities and their ID codes in Knowledge Base.

We will choose one of those entities to show the Knowledge Panel for it as below.

```
https://www.google.com/search?q=love&kponly&kgmid=/m/01pgk0

#You also may use the URL below, in a clear structure as suggested by Elias Dabbas.

https://www.google.com/search?kgmid=/m/01pgk0&kponly
```

The URL here has queries and parameters to show the chosen entity’s knowledge panel on the SERP as alone. “search?=love” is for the query that we seek. In other meaning, it is the string we search for. “&kponly” means the “knowledge panel only”, in short, it says that shows only the knowledge panel in the results. “&kgmid” means the “knowledge panel entity id” which says shows the results for this entity. “/m/01pkg0” is for the entity id. In short, the URL above says that “search for the string of ‘love’, show me only the knowledge panel for the entity that I gave you”. You may see the result below.

![Jennifer Love Hewitt Entity Knowledge Panel](https://www.holisticseo.digital/wp-content/uploads/2020/09/entity-knowledge-panel.png)Knowledge Panel for Jennifer Love Hewitt

You may use the code below to create “Knowledge Panel Only Links” for the given entity so that you may examine every related entity’s Google-made profile on SERP.

```
kg_df = knowledge_graph(key=key, query='Love')
kg_df['KG_Link'] = "https://www.google.com/search?q=love&kponly&kgmid=" + kg_df['result.@id'].astype(str)
kg_df[['result.name','KG_Link']].style.set_properties(**{'background_color': '#353b48', 'color':'#f5f6fa'})

#Many thanks to Elias Dabbas for this string manipulation method for the Knowledge Graph Entity Links.
```

![Knowledge Graph Only URLs](https://www.holisticseo.digital/wp-content/uploads/2020/10/knowledge-graph-links.png)In the future, these links also can be used for scraping related entities or attributes of the target entity.

You may find a “Structured Search Engine” mindset with “Semantic Search” principles in the Knowledge Panel above. To see the difference between a string and an entity, you also may check the Google Trends as below.

![Jennifer Love Hewitt Google Trends as an Entity or a String](https://www.holisticseo.digital/wp-content/uploads/2020/09/jennifer-love-hewitt.png)Jennifer Love Hewitt can be seen as a string or an entity.

You see two different options in Google Trends for the given query. One of them is a “search term” which means just a “string”. It uses the “string matching results” to calculate the search trends while “American Actress” is for the entity profile of the Jennifer Love Hewitt, it includes all types of related searches for the actress such as tv shows, television programs, interviews, husband, children or friends and related entities along with similar entities.

Also, let’s see where this “American Actress” description came from the Google Trends via our Advertools’ “knowledge\_graph()” function.

```
kg_df[['result.name',"result.@id", "result.description"]]

OUTPUT>>>

2020-09-22 11:53:34,288 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love
```

You may see the result for the “result.description” details below.

![Knowledge Graph Entities and Descriptions](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-entity-description.png)Knowledge Graph Entities and Descriptions

You may see that we have the “American Actress” description for the Jennifer Love Hewitt and “kg:/m/01pgk0” entity. Now, let’s check the Google Trends results for the same entity.

![Entities and Strings](https://www.holisticseo.digital/wp-content/uploads/2020/09/entities-strings-for-a-topic.png)The left side is the related entities and the right side is the related queries (strings).

Google uses the related strings and queries together for defining and explaining another entity. Now, let’s check the URL for the given entity.

```
https://trends.google.com/trends/explore?q=%2Fm%2F01pgk0&geo=US
```

The only section, one should pay attention to is the “01pgk” section. If you look carefully, you will see that it is the entity id for the “Jennifer Love Hewitt” in the Knowledge Base of Google. So, Google uses a Semantic Structure for Semantic Search while structuring all the information on the web according to the Thinking Patterns of Human-beings. This brings us to another question, “What is a Structured Search Engine, and what is its relation to the Semantic Search?”.

You may see the most related entities with other entities also thanks to PyTrend’s “related\_topics()” method.

#### What is a Structured and Semantic Search Engine?

A structured Search Engine is a search engine that profiles, categorizes, and organizes all the information on the web according to the search patterns and relevance of the topics to each other. A semantic Search Engine is the result of the structured data on the web. Semantic Search Engine creates semantic relations between different entities, entity profiles, and features. Semantic Search Engine creates semantic queries, maps all the search intent for a given query and entity along with sub-intents, and organizes the best possible Search Engine Results Page for the user.

![Semantic Web and Semantic Search](https://www.holisticseo.digital/wp-content/uploads/2020/09/semantic-web.jpg)An example of Semantization and Organization of the information on the web.

Semantic Search Engine creates topical clusters and entity graphs to satisfy the different sub-intents and micro-intents along with mixed search intents for the same topic. Topical Authority and Entity-based Search Engine where comes in. Topical Authority is the authority of a content publisher for a given topic, to increase the topical authority, a topic should be handled with high expertise, detailed explanations, and structured navigation in a web entity. Entity-based Search Engine realizes the difference between real-world entities and “strings”. To create a “confidence” and “relevance” between an entity, topic, and a brand, Topical Authority is the key approach, Entity-based Search Engine is the key difference.

The structured Search Engine term doesn’t belong to me, you will see an explanation from Google in 2011 related to this term.

What is a Structured Search Engine?

A structured Search Engine is explained in detail in 2011. Structured Search Engine, Entity-based Search Engine, or Semantic Search Engine terms brings us to another topic, [**Semantic Search Engine Optimization**](https://www.holisticseo.digital/theoretical-seo/semantic/). To improve a topical authority for a given topic, one should give consistent signals and detailed common and unique information about sub-topics and related topics, Semantic SEO is the key methodology here. Since it is a topic for another day, we should move our last question.

#### How Does Google Realize and Record Different Entities and Different Profiles of Entities?

Since this is actually a guideline about Python SEO, I will give a brief summary of Entity Profiling and Recognition.

Google has tons of patents for realizing the real-world entities and answering the questions about them, some of the possible and valid methods for **extracting entities and entity attributes for Knowledge Base** are below.

- **Using queries** for a given entity (entity-seeking queries) to extract questions.
- **Using search trends** for entity-attribution and entity-relation profiling.
- **Using FAQ Pages** to see the different sides of a given entity along with answers.
- **Structuring the information** in the unstructured database (web) via mutual points and popular patterns for a given query group.
- **Grouping the entity types** for grouping the related questions and queries.
- **Extracting HTML Tables** for grouping statistical data and exploring relational data.
- **Using Entity-graphs** to answer missing facts about another entity.
- **Using Ontology** for understanding and defining the merged attributes of an entity via web documents.
- **Classifying the queries** with micro-intents and characteristics along with “click satisfaction” models and user preferences.
- **Defining the different phrases for the same entity**, determining the **phraserank** for a given entity.
- **Generating different and related questions** for a given entity via the web documents.
- **Using Context-vectors and Word2vec** for the Named Entity Disambiguation.
- **Using images on the web documents** to identify the entities on the web pages and their relations.
- **Using quality and authority scores for the images** to strengthen the confidence score for a given entity-query relation.
- **Using web documents, links, texts, images, videos, subtitles, mentions, comments, views, music, apps, search queries, trends**, or any kind of web existing particle for realizing real-world things for organizing the information of all cosmos.

![Related Entities and Entity Type](https://www.holisticseo.digital/wp-content/uploads/2020/09/google-entity-type-1.jpg)Another schema from the Related Entities Patent that shows the “type of entity” is important for creating connections between different entities and search terms.

Most of the cornerstones of the Fact Extracting Methodologies of the Search Engines are summed up above. These methodologies are being also used for Knowledge Graph API, it shows the relations of the entities with each other along with their attributes and relations for other topics and “strings”. For Understanding a Semantic Human-thinking Pattern towards specific topics, concepts, and Search Patterns, and using this Semantic Search Engine Feature in SEO Projects, Advertools’ Knowledge Graph API presents a deep value.

Before, explaining the Advertools’ “knowledge\_graph()” function with the rest of its attributes, let me show you a pattern in the Knowledge Base.

#### Question and Answer Patterns for Different Entity Types in the Knowledge Base of Google

If you check the answers in the Knowledge Graph, you will see a pattern in the results. These patterns are also valid for the Featured Snippets and authoritative content publishers with high expertise. Let me show the answers from the Knowledge Base of Google, via Advertools’ “knowledge\_graph()” function.

```
import pandas as pd
pd.set_option('display.max_colwidth', 500)
kg_df[['result.name',"result.@id", "result.description", "result.detailedDescription.articleBody"]]

OUTPUT>>>

2020-09-22 13:42:00,224 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love
```

We have expanded the column width via the “pd.set\_option()” function so that we can see the full article body. Let’s check the output below.

![Knowledge Grapt Descriptions](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-descriptions-1200x248.png)You may check all of the descriptions for the given entities.

If one examines the “detailed article body of the entities”, one will notice that every sentence is in the same pattern. All of these sentences are the result of the “What” and “Who” questions with other types of information. Let’s sum up the answers for the given entity descriptions.

- All the entity descriptions are definitive.
- All the entity descriptions are answers to the main questions of “what” and “who”.
- All the entity descriptions include related entities as “places”, “dates”, “television channels”, “music albums”, “events” or the “movies”.
- All of the entity descriptions also answer the most related questions for the given entities.
- All of the entity descriptions are in the same form in terms of grammar.
- All of the entity descriptions have exact answers, they speak with expertise.
- All of the entity descriptions do not include any “subjective” opinions.
- All of the entity descriptions do not include any unnecessary words.

Let’s choose a detailed entity description for the analysis.

> Jennifer Love Hewitt is an American actress, producer, and singer. Hewitt began her career as a child actress and singer, appearing in national television commercials before joining the cast of the Disney Channel series Kids Incorporated.
>
> Google Knowledge Graph Search API

Let’s see which questions can be generated from here and which answers can be found.

01. “Is Jennifer Love Hewitt an actress?”
02. “Is Jennifer Love Hewitt a producer?”
03. “Is Jennifer Love Hewitt a singer?”
04. “Is Jennifer Love Hewitt an American?”
05. “When did Jennifer Love Hewitt start her career?”
06. “How did Jennifer Love Hewitt start her career?”
07. “Where did Jennifer Love Hewitt start her career?”
08. “What was the first show that Jennifer Love Hewitt played in?”
09. “What was the first television channel that Jennifer Love Hewitt showed in?”
10. “Did Jennifer Love Hewitt play in commercials?”
11. “Which type of commercials did Jennifer Love Hewitt play in when she was a child?”
12. “Did Jennifer Love Hewitt play on national tv when she was a child?”

These are some of the **semantic questions** that can be generated just from a single line of definition sentences for the given entity. So, if you want to have a featured snippet or if you want to appear in Knowledge Panel as a source, or if you want to turn your brand into an entity from a string, you should give the consistent, comprehensive, and **semantic answers** in a structured content network that has a logical hierarchy with contextual links for the Search Engine’s perceptional algorithms.

![Google Question and Query Generation](https://www.holisticseo.digital/wp-content/uploads/2020/09/question-generation.jpg)A schema from Google’s Generating Related Questions for Search Queries shows how related questions can be generated for a search query and topic.

The entity description gives the most important information about the entity itself in a single line of the sentence that we can produce more than 10 questions. If you want to be an authority for the given entity, you should answer these questions and much more in a semantic structure, I assume that you may notice that, these manually generated questions are similar to that one that is generated by the Search Engine’s itself.

#### How to Use Python and NLP for Understanding Semantic Structure of Entity Definitions in terms of Content Marketing?

All of the sentences that are created for the entity descriptions are in the same pattern and understanding, as we mentioned earlier, you may also approve this thanks to NLP with Python. You will see an Information Extraction and Part-of-speech Example for the given sentences below.

To visualize the sentence pattern in the Knowledge Base of Structured Search Engine, I will use Spacy and Displacy, so you may see what the Search Engine wants from a clear and descriptive entity definition in content.

```
import spacy
love_entities = knowledge_graph(key=key, query='Love')
nlp = spacy.load("en_core_web_sm")
doc = nlp(love_entities['result.detailedDescription.articleBody'][3])
for token in doc:
    print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,
            token.shape_, token.is_alpha, token.is_stop)
```

Let me explain the codes from Spacy, here.

- In the first line, we have imported the **Spacy** Python Package for Natural Language Processing (NLP).
- We also created a new variable with “love\_entities” with Advertools’ “knowledge\_graph()” function.
- In the second line, we have assigned the trained English Language Model for Spacy into the “nlp” variable via the “spacy.load()” method.
- We have created a doc element with our “Jennifer Love Hewitt” entity’s description from our Advertools’ “Knowledge\_graph()” function’s output via Google’s Knowledge Graph Search API.
- In the last line, we have started a for loop, for taking the “ **part-of-speech**” information from our sentence.

There are other language models in Spacy, such as “nl\_core\_news\_sm” for Dutch, “es\_core\_news\_sm” for Spanish. At the moment, there are 15 languages that can be used for NLP via Spacy.

You may see the result below.

```
OUTPUT>>>

Jennifer Jennifer PROPN NNP compound Xxxxx True False
Love Love PROPN NNP compound Xxxx True False
Hewitt Hewitt PROPN NNP nsubj Xxxxx True False
is be AUX VBZ ROOT xx True True
an an DET DT det xx True True
American american ADJ JJ amod Xxxxx True False
actress actress NOUN NN attr xxxx True False
, , PUNCT , punct , False False
producer producer NOUN NN appos xxxx True False
and and CCONJ CC cc xxx True True
singer singer NOUN NN conj xxxx True False
. . PUNCT . punct . False False
Hewitt Hewitt PROPN NNP nsubj Xxxxx True False
began begin VERB VBD ROOT xxxx True False
her -PRON- DET PRP$ poss xxx True True
career career NOUN NN dobj xxxx True False
as as SCONJ IN prep xx True True
a a DET DT det x True True
child child NOUN NN compound xxxx True False
actress actress NOUN NN pobj xxxx True False
and and CCONJ CC cc xxx True True
singer singer NOUN NN conj xxxx True False
, , PUNCT , punct , False False
appearing appear VERB VBG advcl xxxx True False
in in ADP IN prep xx True True
national national ADJ JJ amod xxxx True False
television television NOUN NN compound xxxx True False
commercials commercial NOUN NNS pobj xxxx True False
before before ADP IN prep xxxx True True
joining join VERB VBG pcomp xxxx True False
the the DET DT det xxx True True
cast cast NOUN NN dobj xxxx True False
of of ADP IN prep xx True True
the the DET DT det xxx True True
Disney Disney PROPN NNP compound Xxxxx True False
Channel Channel PROPN NNP compound Xxxxx True False
series series NOUN NN pobj xxxx True False
Kids Kids PROPN NNP compound Xxxx True False
Incorporated Incorporated PROPN NNP appos Xxxxx True False
. . PUNCT . punct . False False
```

If you want a more organized result, you may use “termcolor” and “string handling” methods. With the suggestion of Elias Dabbas, I have prepared the “for loop” and “f string” code blocks for a better result visualization.

```
import spacy
from termcolor import colored
nlp = spacy.load("en_core_web_sm")
doc = nlp(love_entities['result.detailedDescription.articleBody'][3])
texts = [token.text for token in doc]
lemmas = [token.lemma_ for token in doc]
poses = [token.pos_ for token in doc]
tags = [token.tag_ for token in doc]
deps = [token.dep_ for token in doc]
shapes = [token.shape_ for token in doc]
is_alphas = [token.is_alpha for token in doc]
is_stops = [token.is_stop for token in doc]

for text, lemma, pos, tag, dep, shape, is_alpha, is_stop in zip(texts, lemmas, poses, tags, deps, shapes, is_alphas, is_stops):
    print(colored(f'{text:<12}', 'green'), colored(f'Lemmatizated => {lemma:<12}', 'red'), colored(f'Tag => {tag:<7}', 'blue'),colored(f'POS => {pos:<8}', 'cyan'), colored(f'Dependency => {dep:<8}', 'magenta'), colored(f'Shape => {shape:>5}',on_color='on_grey', attrs=['bold', 'blink']), colored(f'Is Alphabetic => {is_alpha:<8}','red', on_color='on_yellow'), colored(f'Is stop word => {is_stop:>5}', 'yellow', on_color='on_blue') )
```

You may now see the result in a more organized situation. I think, creating a data frame for the words in a sentence with Natural Language Processing terms can be another solution.

#f'{variable:<5} means that write the string as left-aligned with the width of the five characters. It helps for creating a more organized string output.

I didn’t explain what “part-of-speech” is here since it will take more time, to learn about it you may read the “ [**Information Extraction with Python and Spacy**](https://www.holisticseo.digital/python-seo/information-extraction/)” guideline. But it simply checks every word’s role, definition, function, and actual form in the sentence. For instance, if you check every entity description in the Knowledge Graph of Google, you will see that it has an excellent grammar structure with proper “noun”, “adjective”, “verb”, “punctuation” etc.

Since this output is visually complicated, let me show you another example below.

```
displacy.serve(doc, style="dep")
```

This single line of code is being used for showing the relations between words in an entity description.

You may see the “Compound Words” and the roles of the words along with their connecting styles.

You may see which words are being perceived as compound and which word is the attribute of which one. Since this visualization is also not enough, let me show you a more simplified version.

```
spacy.displacy.serve(doc, style="ent")

OUTPUT>>>

c:\python38\lib\runpy.py:194: UserWarning: [W011] It looks like you're calling displacy.serve from within a Jupyter notebook or a similar environment. This likely means you're already running a local web server, so there's no need to make displaCy start another one. Instead, you should be able to replace displacy.serve with displacy.render to show the visualization.
  return _run_code(code, main_globals, None,
```

This single line of code is being used for Named Entity Recognition, it will help you to see the entities in a sentence with clear vision.

![Named Entity Recognition for Entity SEO](https://www.holisticseo.digital/wp-content/uploads/2020/09/entity-recognition.png)Entity Connections in a sentence from Google Knowledge Graph API.

So, in Google’s Knowledge Graph, we can simply choose all the related entities from the entity descriptions along with attributes of the entities with clear sentence patterns. To create an authoritative, conceptually hierarchic semantic content structure, following these sentence patterns are important in terms of Semantic Search Engine Optimization.

Advertools’ Knowledge Graph Function can be used for creating an automated “sentence pattern” and “sentence structure” checking engine with simple addons. (Maybe in the future, with another guideline.)

To show the clear sentence patterns and features from Google’s Knowledge Graph, you may use a for loop like the below.

```
import spacy
nlp = spacy.load("en_core_web_sm")

""" You can call these two lines in the function if you want but since these two lines are not necessary for repeated usage, we have pu thtem outside of the function. """

def entity_article(kg_df):
    b = str(kg_df['result.detailedDescription.articleBody'].explode().to_list())
    doc = nlp(b)
    spacy.displacy.render(doc, style="ent")

entity_article(love_entities)
```

- We have united all of the “result.detailedDescription.articleBody” column of our Advertools’ function output with “explode” and “list” methods.
- We have turned it into a string from a list via the “str” command.
- We have used our “spacy.load” method for using the English Language Model with Spacy.
- We have called our function with our prebuilt variable.

You may see the result below.

![Named Entity Recognition with For Loop for every entity in the Knowledge Graph call](https://www.holisticseo.digital/wp-content/uploads/2020/09/entity-article.png)All of the Entity Descriptions have the same pattern and also we have found more related entities in our descriptions.

If you want to separate different entities’ different results while using NLP on their description, you can use the code block below which is prepared by Elias Dabbas.

```
for article_body, result_name in kg_df[['result.detailedDescription.articleBody', 'result.name']].values:
    doc = nlp(article_body)
    print(colored(f'{result_name} and its NLP Output. \n\n', 'green'))
    spacy.displacy.render(doc, style="ent")
```

The output of our second methodology.

Not: Using a for loop over Entity Descriptions sometimes can create an error like the below. It might be due to the splitting of the corpus.

![Output of NLP Spacy](https://www.holisticseo.digital/wp-content/uploads/2020/10/output-of-nlp.png)In these types of situations, you might use the first methodology.

Thanks to Natural Language Processing, Advertools, and Google’s Knowledge Graph API, the questions below can simply be answered.

- What type of sentences does Google use for defining an entity?
- What are the most related entities for an entity?
- What are the attributes of an entity in an entity description?
- Which questions can be answered from an entity description?
- Which points and angles are most important for an entity’s profile?
- What Semantic and Hierarchic Structure can be used to create a content network that can comply with Search Engines’ Entity-Map?

Also, we can improve this analysis by simply putting all of these results into data frames via Pandas and checking which entity has which attributes, which words are compound, which related entities exist in entity descriptions, and which sentence structure is used for which entity type, etc…

Before finishing, this section, you also can show the Entity Descriptions, Entity Attributes, and Entity Relations with “Information Extraction Visualization” below to see the most important definitive points of an entity according to Google’s reality perception.

Note: All of the functions (“getSentence”, “processSentence”, “printGraph”) below are from the “ [**Information Extraction and Visualization via Python**](https://www.holisticseo.digital/python-seo/information-extraction/)” article.

```
if __name__ == "__main__":

    text =  str(love_entities['result.detailedDescription.articleBody'][3])

    sentences = getSentences(text)
    nlp_model = spacy.load('en_core_web_sm')

    triples = []
    print(text)
    for sentence in sentences:
        triples.append(processSentence(sentence))

    printGraph(triples)
```

You may see the output below:

```
Jennifer Love Hewitt is an American actress, producer and singer. Hewitt began her career as a child actress and singer, appearing in national television commercials before joining the cast of the Disney Channel series Kids Incorporated.
Jennifer -> compound
Love -> compound
Hewitt -> nsubj
is -> ROOT
an -> det
American -> amod
actress -> attr
, -> punct
producer -> appos
and -> cc
singer -> conj
. -> punct
Hewitt , be american actress ,
Hewitt -> nsubj
began -> ROOT
her -> poss
career -> dobj
as -> prep
a -> det
child -> compound
actress -> pobj
and -> cc
singer -> conj
, -> punct
appearing -> advcl
in -> prep
national -> amod
television -> compound
commercials -> pobj
before -> prep
joining -> pcomp
the -> det
cast -> dobj
of -> prep
the -> det
Disney -> compound
Channel -> compound
series -> pobj
Kids -> compound
Incorporated -> appos
. -> punct
Hewitt , begin national , career actress commercials cast series
```

![Jennifer Love Hewitt Entity Profile](https://www.holisticseo.digital/wp-content/uploads/2020/09/information-extraction-for-an-entity.png)Key points of “Jennifer Love Hewitt” entity’s profile and description, you can see the entity’s main profile and how she starts her career.

#### What are the Relevance and Confidence Scores in Google Knowledge Graph API Search Results?

Relevance and Confidence Scores in the Google Knowledge Graph represent the relevancy of the given query (string) to the shown entity in that specific search intent. Confidence Scores are actually similar to the relevancy, it is the confidence level of the Search Engine for the given entity and query relation angle.

For instance, relevance scores can be shared between entities in a news story about the economy in the US. If there are 20 different politician names in the news article, the relevance score will be shared among these entities but according to the news coverage, some names will have a higher relevancy score since they are mentioned more and the news also about them along with their attributes and facts. The confidence scores will be determined according to the entity type and identity correctness possibility. Even if the relevance score is high but the entity type, attributes, or entity relations are not clear for the algorithms, the content can’t be clearly connected to those entities. That’s why Relevance and Confidence Scores are important in NLP and “resultScore” is a numeric representation of these two scores.

In this section, we also need to pay attention to the Different Search Intents, Sub-intents, Micro-intents, and Canonical Queries or Query Rewriting terms. For keeping the article on track, I will give short definitions for these Search Engine Theoretical Terms.

![Entity Relations and Connections](https://www.holisticseo.digital/wp-content/uploads/2020/09/question-answering-entity.jpg)Google may create similar connections between entities and their attributes. These connections and attributes also are being used for generating questions and answering them. You may see that it is a similar graph that I generated for the Jennifer Love Hewitt via Spacy and also Advertools.

- **A canonical Query** is the canonical version of the different query variations, it also can be called a “representative query”.
- **Sub-intents** are the second, third, or fourth and more intents after the first and the most dominant intent of the query.
- **Micro-intents** are the intents between the sub-intents, they can have lesser satisfying content or it can be hard to find the exact and valid answers, usually, forums and question-answer sites cover these queries.
- **Query Rewriting** is the process of changing the query on the search box for giving better results. It doesn’t change “visually” but Google may merge or variate the query that is given by the user for providing better results.

Andrei Broder, in his taxonomy of search paper, described the sub-intents for a given query as below in 2006.

Navigational – 15 %

- Transactional – 22%
- – Obtain 8%
- – Interact 6%
- – Entertain 4%
- – Download 4%

- Informational – 63%
- – List 3%
- – Locate 24%
- – Advice 2%
- – Undirected 31%
- – Directed 3%

In 2006, Google tried to describe the sub-intents and user-navigational routes between web documents in this categorization according to the Andrei Broder, in the Google Quality Rater Guidelines, we also have four types of basic query types according to the search intent,

![Search Intent and Quality Rater Guidelines](https://www.holisticseo.digital/wp-content/uploads/2020/09/search-intent.png)Google Search Intents according to the query types.

Search Intent Classification according to the Google Quality Rater Guidelines is below.

- **Know** Queries are informational queries.
- **Do** queries are the actional queries.
- **Website** queries are actually source-seeking queries.
- **Visit-in-person** queries are actually local queries.

Also, as a note, Website Queries are similar to the what Andrei Broder told in 2006, Andrei said that some of the users navigate (teleport) to the websites that they trust for the information they seek. Also, Danny Sullivan said that the most important part of the “URL” is the “domain name” since people only care about the information source. Also, we have some studies which show that if a brand removes the “brand name” from the title tags, it loses slightly CTR, and even sometimes Google puts the Brand Name into the title tags without asking the users.

![Main Entity Identification](https://www.holisticseo.digital/wp-content/uploads/2020/09/main-entity-identification.jpg)A schema from Google’s “Identifying Central Entities” Patent shows how Google determines the central entities in the search terms.

In reality, there are much deeper query classification and search intent analysis from the Search Engine’s viewpoint. Google Trends’ “query categorization” actually is proof of that. In the PyTrend Guideline of the HolisticSEO.Digital, you may read all of the query categories in Google Trends to see which search intent and type have more weight than others. You may see some of the examples below to differentiate the same query according to the sub-intents and search types.

Movie Types and Query Categorization in the Google Trends for the given query are below.

Movies: 34

- Action & Adventure Films: 1097
  - Martial Arts Films: 1101
  - Superhero Films: 1100
  - Western Films: 1099
- Animated Films: 1104
- Bollywood & South Asian Film: 360
- Classic Films: 1102
  - Silent Films: 1098
- Comedy Films: 1095
- Cult & Indie Films: 1103
- Documentary Films: 1072
- Drama Films: 1094
- DVD & Video Shopping: 210
  - DVD & Video Rentals: 1145
- Family Films: 1291
- Film & TV Awards: 1108
- Film Festivals: 1086
- Horror Films: 615
- Movie Memorabilia: 213
- Movie Reference: 1106
  - Movie Reviews & Previews: 1107
- Musical Films: 1105
- Romance Films: 1310
- Science Fiction & Fantasy Films: 616
- Thriller, Crime & Mystery Films: 1096

All of these queries are being used in PyTrend to perform a better search behavior analysis. If you will search for a specific movie, it might have different degrees of search trend and demand according to the queries’ classification. You may see all of the “Google Trends query categories” from the link below:

[https://trends.google.com/trends/api/explore/pickers/category?hl=en-US&tz=240](https://trends.google.com/trends/api/explore/pickers/category?hl=en-US&tz=240)

![Classifying Navigational Keywords](https://www.holisticseo.digital/wp-content/uploads/2020/09/query-classification.png)A schema from Google’s Navigational Resources for Queries Patent for classifying the navigational queries in the search.

You may see an example to see how these query categories affect Google’s perception of the same entity from different angles, below.

```
pytrends = TrendReq(hl="en-US", tz=360)
query = ['Jennifer Love Hewitt']
pytrends.build_payload(kw_list=query, cat=34, timeframe="today 12-m")
```

You may see the result below, “cat=34” means that shows me only the results for “movies”.

```
pytrends.related_queries()
```

![related topics pytrend](https://www.holisticseo.digital/wp-content/uploads/2020/09/related-topics-pytrend.png)You will see only queries related to the movies or queries that are determined as related to the movies and Jennifer Love Hewitt, in English, US.

```
pytrends = TrendReq(hl="en-US", tz=360)
query = ['Jennifer Love Hewitt']
pytrends.build_payload(kw_list=query, cat=184, timeframe="today 12-m")
```

In this example, we are seeking queries that are related to the “Celebrity News”, now the character of search intent will change tremendously.

```
pytrends.related_queries().get('Jennifer Love Hewitt').get('top')
```

In this example, we have searched for “Celebrity News”, so the queries will be more variated.

![Output of PyTrend Function with "get" method](https://www.holisticseo.digital/wp-content/uploads/2020/09/related-news-for-entity.png)We also see “Jennifer Garner” in the list because of the “phrase similarity” since we are looking for related “strings”.

You may see the difference between different query categories, in this angle, we simply can say that there are lots of Knowledge Domains and Query Characters, Search Intent Variations for Google.

So, all of this information comply with each other in terms of Semantic Search Engine Optimization and Entity-based Search Ecosystem. If a web entity is an authority for a given topic, it will increase the relevance and confidence scores for the given query variations so that it can be seen as an expert on the subject and can gain better search visibility over the Google Surfaces (blue links, featured snippets, people also ask questions, knowledge panels, local packs, image and video search results, news boxes, answer boxes and more.)

The relevance score is the relevancy of the query to the given entity while the confidence score is the confidence of the Search Engine about that relevancy. Creating an authoritative web entity or a brand for the given entities (products, events, services, cars, or movies), creating a comprehensive topical graph and conceptual hierarchy for all angles of the topic for every type of query with query-answer trees with satisfying page layout and user experience along with services/functions are the key for being the most relevant and quality source for the specific entity.

## How Does Google Use the Entity Relations for Understanding the Authority of the Web Sites for Given Context?

Neural Matching and Hummingbird Algorithms are closely related to these terms. Google is a “user-centric contextual Search Engine” which means that Google uses the searcher’s opinions and expectations to understand the context of the words to find better matching search results. In this context, Google may see the different angles and mixing intents of a query, a search intent, a web document, and a matching entity attribute.

Lets’ continue with our example via “Jennifer Love Hewitt”.

```
knowledge_graph(key=key, query='Jennifer Love Hewitt')

OUTPUT>>>

2020-09-22 17:35:15,203 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Jennifer Love Hewitt
```

You may see the entity results for the given entity below.

![Entity search results for the Jennifer Love Hewitt](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-results-for-jennifer-love-hewitt-1200x260.png)Jennifer Love Hewitt and entity search results.

At a glance, we notice there are lots of results for the given entity, the first result with the highest “relevance” and the “confidence” score is of course for the Jennifer Love Hewitt herself, other results are the sub-entities of her such as music records, tv episodes or books. You also can see the importance of an entity for Google via the results’ scores and their amount. For Jennifer Love Hewitt, we may say that she is important for the Knowledge Graph API, but also her Knowledge Graph results have tons of missing points. It shows that Google didn’t fill in all of the missing facts about the entity.

Some of the reasons for a missing fact for a given entity are listed below.

- There is not enough search demand or search trend for the entity
- There is not enough news about the entity.
- There is not enough information on the entity in different online encyclopedias.
- There are not enough web documents for the given entity.
- There are not enough social media activities or historical data for the given entity.

Sometimes, it is not also about the amount of information, also “trustworthiness” and “controversies” of an entity can create a missing fact situation for the given entity. Or, even if the entity has a place in the Knowledge Base, the description, image, article or definition can vary from time to time or it can be missing.

You also may check the resulting amount with the Pandas built-in “shape” method to see the coverage of an entity. Also, these “NaN” sections show the importance of structured data for Search Engines.

```
jlh.shape[0]

OUTPUT>>>

14
```

We have only 14 Results. This doesn’t mean that these 14 entities are the only relevant entities for the Jennifer Love Hewitt (!). These are just the only results that are relevant enough with the string of “Jennifer Love Hewitt”. That’s why for an entity profile analysis before starting to cover it, Advertools’ Knowledge Graph API should be used with also “PyTrend”. “PyTrend” can give the “relevant strings”, “relevant entities”, and “rising queries” for the given entity. On the other hand, Knowledge Graph API can give a deeper look for an important “phrase” with corresponding entities and relevance, confidence scores along with Knowledge Base information that covers entity descriptions, images, definitions, etc.

To prove the point, let’s choose another string that is relevant to the Jennifer Love Hewitt which is “Ghost Whisperer” which she played for five seasons.

```
knowledge_graph(key=key, query='Ghost Whisperer')
knowledge_graph(key=key, query='Ghost Whisperer')[['resultScore','result.name',"result.@id", "result.description"]]

OUTPUT>>>

2020-09-22 17:53:23,264 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Ghost Whisperer
```

You may see the result data frame below for the given string of “Ghost Whisperer”.

![Knowledge Graph Results for Ghost Whisperer](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-results-for-ghost-whisperer.png)Knowledge Graph Results for the Ghost Whisperer

You may see that we also have Ghost Whisperer in the Knowledge Base, interesting to see that a season of Ghost Whisperer called Ghost Whisperer has a higher relevance score than the actual series in which the name is again Ghost Whisperer. Maybe, a content publisher should also pay attention to creating a distinction between these two different entities in his/her articles.

We also have some video games and other types of entities without any description, when we check that we also see that they are from the same TV Series, but they are actually “music records” for the different episodes. Since Knowledge Graph API only gives results for a string, let’s check the “related entities” for the Jennifer Love Hewitt as below.

```
pytrends.build_payload('Jennifer Love Hewitt', cat=0, timeframe="today 5-y")
jlh_entities = pytrends.related_topics()
jlh_entities.get('Jennifer Love Hewitt').get('rising')
```

- In the first line, we have chosen “cat=0” which means “all the categories” since we seek all related entities.
- We have wanted the data from the last 5 years, how much the time period is long, the data will be more consistent for our situation.
- We have called all the related entities.
- We have created a data frame with the help of the “get” method from a dictionary, with the values we want.

You may see the result below.

![Related Entities For Loop Output](https://www.holisticseo.digital/wp-content/uploads/2020/09/related-entities-for-a-entity.png)Related Entities for a given entity.

We see the entities that are related to Jennifer Love Hewitt in a data frame, we have entity ids, trend value, entity type, trend spike over the years, and entity names. Also, one should know how to read this data frame. For instance, we see that there are “Nude (art)” and “Age (Topic)”, and “Husband (Topic)” in our related entities. They are actually here because search engine users have similar search patterns for celebrities.

Since, these words and the words that mean these terms are searched a lot with the entity, they became related. IMDb is also here, because of the same situation but sometimes, even if there would not be a search behavior pattern for connecting these entities to each other, the Search Engine can connect these entities while scraping the web thanks to the web documents. For instance, if there are too much data in IMDb for the given entity, Google may think to relate these entities to each other or it can show the IMDb in the Knowledge Panel of the Actress as below.

![Knowledge Panel for the Given Entity](https://www.holisticseo.digital/wp-content/uploads/2020/09/ghost-whisperer-entity.png)Since, I have made this search in Turkey, with the English Language, I have also “Sinemalar.com” as an entity info-source in the Knowledge Panel along with IMDb and TV Guide.

We also have Tuxedo, Criminal Minds, I Know What You Did Last Summer movies that Jennifer played. But we also have “Jennifer Lopez” and some other American Actresses in the data frame, it has different reasons. One of them is that some of these actresses played together with Jennifer Love Hewitt, the other reason is actually a “phrase-based” reason, they share the same “name” along with the “same” entity type. So, the Search Engine relates them in a similar way. We also have a similar situation for “related queries”.

The most related search terms with Jennifer Love Hewitt for the last 5 years are below.

```
pytrends.build_payload('Jennifer Love Hewitt', cat=0, timeframe="today 5-y")
jlh_queries = pytrends.related_queries()
jlh_queries.get('Jennifer Love Hewitt').get('top')
```

You may see the result below.

![Most searched Queries with the given string](https://www.holisticseo.digital/wp-content/uploads/2020/09/most-searched-queries.png)Most searched queries with the given entity.

We have the most searched queries for the given entity in the last 5 years. We see the latest tv series of Jennifer Love Hewitt in the data frame, “911”. Since it is a new tv series, it doesn’t have a big place according to the oldest queries, yet. We also have “Brian Hallisay”, who is also in the “related entities” data frame. Because he played in the “Client List” movie with Jennifer Love Hewitt, also he is the husband of Jennifer Love Hewitt.

So, all stones fell into place. We have “husband” as a topic in the related entities because people searched too much for the “{spouse} + {jennifer love hewitt}” query pattern, we also have Brian Hallisay in the related entities and related queries together, because they are two different entities connected each other more than one way.

Now, before focusing on Advertools’ “Knowledge\_graph()” function again, we also can call the latest rising queries for the given entity, so that we can understand how Google notices the new entities.

```
jlh_queries.get('Jennifer Love Hewitt').get('rising')
```

The result is below.

![JLH Rising queries](https://www.holisticseo.digital/wp-content/uploads/2020/09/most-searched-queries-1.png)We have some insightful queries such as “9-1-1 cast” and another type of “entity-seeking” queries.

As you may notice above, we have “9-1-1” mostly in every row, because it is the latest show of the Jennifer Love Hewitt, so it is naturally here. We also see that there are lots of historic queries such as “JLJ 90s” or “2019” and 2020″ along with attribution queries such as “children”, “age”, and “social media accounts”.

These phrases are helpful to see the what people seek most for the given entity, an SEO can fill these missing points for the Search Engine in a semantic structure so that the Search Engine can trust the content publisher on a given entity and fill its own Knowledge Base with these entities, entity relations, and attributes.

We have covered lots of SEO Theories until now, let’s use Advertools’ Knowledge Graph Function with PyTrend’s Related Entities Function, so we can cover all related entity graphs and understand the connections and the best possible semantic content structure and network for a possible web entity.

```
jlh_graph_list = jlh_entities['topic_title'].explode().to_list()

a = []
for x in jlh_graph_list:
    b = knowledge_graph(key=key, query=x)
    a.append(b)

jlh_graph_list_ = pd.concat(a)
jlh_graph_list_.head(50)

OUTPUT>>>
2020-09-22 21:40:49,705 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Jennifer Love Hewitt
2020-09-22 21:40:50,073 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Ghost Whisperer
2020-09-22 21:40:50,931 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Casting
2020-09-22 21:40:51,277 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=The Client List
2020-09-22 21:40:52,132 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Criminal Minds
2020-09-22 21:40:53,019 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Age
2020-09-22 21:40:53,868 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Brian Hallisay
2020-09-22 21:40:54,737 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Husband
2020-09-22 21:40:55,074 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=9-1-1
2020-09-22 21:40:55,918 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=IMDb
2020-09-22 21:40:56,821 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Jennifer Lopez
2020-09-22 21:40:57,692 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=The Tuxedo
2020-09-22 21:40:58,539 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=I Know What You Did Last Summer
2020-09-22 21:40:59,371 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Sarah Michelle Gellar
2020-09-22 21:41:00,320 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Celebrity
2020-09-22 21:41:01,159 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Jennifer Aniston
2020-09-22 21:41:02,030 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Net worth
2020-09-22 21:41:02,902 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Bikini
2020-09-22 21:41:03,811 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Party of Five
2020-09-22 21:41:04,690 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Lacey Chabert
2020-09-22 21:41:05,014 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Toplessness
2020-09-22 21:41:05,349 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Jennifer Lawrence
2020-09-22 21:41:05,708 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Sister Act 2: Back in the Habit
2020-09-22 21:41:06,540 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Nude
2020-09-22 21:41:07,410 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Can't Hardly Wait
```

You may see the code block’s explanation below.

- In the first line, we have chosen the “topic\_title” column, because it includes all of the related entities’ names as strings.
- We have created a variable called “jlh\_graph\_list” and we have used the “explode()” method to turn a column, list-like row.
- We have used the “to\_list” method to take them into an actual list.
- In the second line, we have created an empty list with the name “a”.
- In the third line, we have started for a loop. We have assigned every element of our list object which we created in the first line whose name is “jlh\_graph\_list” into a new variable whose name is “b”. During the assigned process, we have used Advertools’ “knowledge\_graph()” function for every element of the “jlh\_graph\_list” list object.
- We have appended every result of our for loop into our “a” variable.
- We have concatenated every list element in the “jlh\_graph\_list” while assigning the result into the “jlh\_graph\_result\_” variable.
- We have called the first 50 lines of our new united data frame which includes the most related entities with the Jennifer Love Hewitt (our subject entity) according to the Google Knowledge Graph API and Google Knowledge Base along with Google Trends Data.

You may see the result of the code block below.

You may see the output of our Entity Data Frame for the Given Entity.

We have called all of the related entities for the Jennifer Love Hewitt and turned them into a data frame via Google Trends and Advertools. If you think that, Advertools’ “knowledge\_graph()” function doesn’t give the all related entities and a topic’s cornerstones for entity-based semantic content structure planning, the “knowledge\_graph()” function is based on Google Knowledge Graph Search API, and it is not for calling the related entities, it is being designed for the calling the most related entity for a given string along with other lesser relevant results.

![All Related Entities for the Given Main Entity via For Loop](https://www.holisticseo.digital/wp-content/uploads/2020/09/related-entities.png)With the “ignore\_index=True” you may order the index column while concatenating the related entities.

But, for the same purpose, you may use the function below.

```
def topical_entities(query, to_csv=True):
    import pytrends
    from pytrends.request import TrendReq
    from advertools import knowledge_graph
    import pandas as pd
    a = TrendReq(hl="en-US", tz=360)
    a.build_payload(kw_list=[query], cat=184, timeframe="today 12-m")
    b = a.related_topics()
    c = b.get(query).get('top')
    d = c['topic_title'].explode().to_list()
    e = []
    for f in d:
        g = knowledge_graph(key=key, query=query)
        e.append(g)
    ı = pd.concat(e)
    if to_csv == True:
        return ı.to_csv('ı.csv')
    else:
        return ı
```

If you check the “topical\_entities()” function you will see that it is actually a unification of Advertools’ “knowledge\_graph()” function and also “Pytrend” along with Pandas. You may see an example of usage of the “topical\_entities()” function.

```
Query = 'Hewitt'
topical_entities(Query, to_csv=True)

OUTPUT>>>

2020-09-26 20:30:51,441 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:30:52,302 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:30:53,148 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:30:54,000 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:30:54,859 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:30:55,716 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:30:56,562 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:30:57,415 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:30:58,261 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:30:59,091 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:30:59,953 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:00,791 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:01,627 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:02,468 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:03,337 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:04,199 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:05,043 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:05,912 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:06,756 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:07,596 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:08,443 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:09,288 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
2020-09-26 20:31:10,129 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hewitt
```

We have created a CSV output with our related entities with the “Hewitt” string. Let’s read it via Pandas’ “read\_csv()” method.

```
ı = pd.read_csv('ı.csv')
ı[['resultScore','result.description','result.name','result.detailedDescription.articleBody']]
```

You may see the result below.

![Filtering the related Columns](https://www.holisticseo.digital/wp-content/uploads/2020/09/related-entities-function.png)We have 460 Related Entities for the given string of “Hewitt”. From James Hewitt from a British Former Cavalry to the “Jennifer Love Hewitt”, American Actress.

There are lots of things to cover here, but for the sake of the articles’ context, I will show one more custom pre-designed Python SEO Function for entity-based SEO. Imagine, you also can show all of the information and key points, connections and relations, definitions, and second features, and profiles all of those entities in a diagram. I will use “networkx” for it, but since there are too many entities here, I believe it won’t give a clear picture, but still, it can give insight.

```
import pandas as pd
c = pd.read_csv('../knowledge Graph API/i.csv')
a = c['result.detailedDescription.articleBody'][:5].explode().to_list()

if __name__ == "__main__":

    text =  str(a)

    sentences = getSentences(text)
    nlp_model = spacy.load('en_core_web_sm')

    triples = []
    print(text)
    for sentence in sentences:
        triples.append(processSentence(sentence))

    printGraph(triples)
```

You may see the “insightful entity map” below.

![Entity Knowledge Graph](https://www.holisticseo.digital/wp-content/uploads/2020/10/insightful-chart.png)A Knowledge Graph for our first 5 entity descriptions.

This is the knowledge graph of the first 5 entities in our data frame for Jennifer Love Hewitt. “Gordon” is the last name of “Melinda Gordon” who is portrayed by Jennifer Love Hewitt. Grandview is where she moves to live with her Fiancee Jim Clancy. She has taken her ability from her great and great grandmother, also the series has been managed by “John Gordon”. Also, Jim has a son during the series. If you can’t create the connections clearly, you should change the “tags” you are using. In this example, we are using “ROOT, “adj”, “attr”, “agent”, “amod” tags from Spacy. You may see all [lists of tags from Spacy](https://spacy.io/api/annotation). Also, you may use the same methodology for other connected entities.

```
import wikipedia
entity_description = wikipedia.page('Jennifer Love Hewitt').content.split('\n')[:5]
```

I have imported “Wikipedia” Python package and searched for the “Jennifer Love Hewitt” page’s content’s first 5 sentences. The graph for this information is below.

![jlh entity description](https://www.holisticseo.digital/wp-content/uploads/2020/10/jlh-entity-description.png)

At the left top corner, you will see the “Gordon” and “Ghost Whisperer” as “drama. Also, you will see Jennifer Love Hewitt’s Albums and “Music Producer” career in the knowledge graph. “Heartbreakers” is one of the other artworks of Jennifer Love Hewitt along with the “Let’s Go Bang”.

If you put too many entities for creating a knowledge graph via Networkx, you will get the result below.

![entity profile knowledge graph](https://www.holisticseo.digital/wp-content/uploads/2020/09/entity-profile.png)Because of this complex view, while using Entity Association Methods with NLP to create a visualization, choosing lesser nodes might be a better option.

In NetworkX, you might use “g = networkx.spring\_layout(G, k=1, iterations=100)” to create more distance between nodes, but since we have 460 Entities and their descriptions for this example, it still won’t create the perfect result.

### An Example of Entity-based Search: How Does Google Use Entities to Understand the Web-entities’ Authority and Expertise?

After all those functions, explanations, and code blocks, you may need to remember the question of “How does Google Understand a Web Site’s Authority and Expertise for given Context via Entity Relations?”

Let’s imagine there are three different sites, one of them is solely about “Jennifer Love Hewitt” and another one is solely about “Actresses and Actors”, the third one is about “American Actresses”. Now, imagine that you have searched for the question “Who is Jennifer Love Hewitt?”, after this question, you will also probably want to know that “Which movies did Jennifer Love Hewitt play in?”, “Who is her husband?”, “How old is she?”, “Does she have children?”, “Does she have an active project?”.

Let’s say that, for these search intent groups, you have used the string of “Jennifer Hewitt 2020”. It is simple right? But, I assume that you remember Google’s extremely detailed “search intent” and “query profiling algorithms”. Now, let’s try to understand which one of these “Content Networks” have more advantage in terms of Entity Connections in a specific Knowledge Domain according to the “Thinking Patterns of Users” and Search Engines’ Entity-first Indexing Systems.

- Since there is a date in the query, it will apply the “Query Deserves Freshness” rule for the user.
- Jennifer Hewitt’s string is enough clear that it is an “Entity-seeking Query” for Jennifer Love Hewitt.
- Google will call all of the related entities with the targeted subject and try to understand the possible search journey and intent profile of the user.
- Google will order the Search Intents in the query from the dominant one to the less dominant ones.
- Google Algorithms will check the user behaviors for the same group of queries to understand the possibilities, for instance, this query is seeking “a celebrity’s situation in the current year”. What did other users do when they clicked on the “X” or “Y” type of sites?
- Google will check which Website has the related entities in the candidate of landing pages.
- Google will check the main entity’s type along with related entities’ types and which candidate has the actual comprehensiveness and expertise for the given entity types.
- Google will compare the different content publishers’ sentences in terms of clarity, and readability, and try to “extract facts” and “extract named entities” in the content.
- Google will check entities in the images and videos or video subtitles and entities in voice content such as podcasts.
- Google will try to calculate a satisfaction possibility for every content publisher according to their historical data, for instance, a site solely about Jennifer Love Hewitt can tell the current situation of the actress better, since it is possibly fresher, but also users may want to check more actresses or more American Actresses? What would you do if you were Google?

So, as you may see there are lots of steps and possibilities to calculate in terms of entities, and you may see the importance of entities for the Search Engine easily.

![Search Personalization](https://www.holisticseo.digital/wp-content/uploads/2020/09/search-history-data.jpg)An example of how possible Google can use the session data or users’ search data for reranking the search results from Google Patent.

Now, let’s say that our user also has a search history for the searched entity from last year, she/he also searched for the Jennifer Love Hewitt in 2019 with the exact same query type, and she/he also talked about the same entity around an android phone, he/she also has ordered Jennifer Love Hewitt movie DVDs in previous years, she/he also has subscriptions for the current entity, also she/he follows the actresses social media accounts.

![Query Analysis and Reranking of Search Results](https://www.holisticseo.digital/wp-content/uploads/2020/09/query-analysis-reranking.jpg)A schema from Document Scoring based on Query Analysis Patent for reranking the search results in terms of historical data.

So, from a personalized search perspective, “the website that is solely about the Jennifer Love Hewitt” will win since it covers all of the entities and updates every detail regularly about the directly targeted entity in the search term. But, let’s say that the user doesn’t have these types of historical data, or even better, Google couldn’t track the user or could track the user but couldn’t create a proper user segmentation since it doesn’t give clear signals due to the “search volume” or “volume of search behavior pattern”.

But still, Google clearly sees the users’ location and phones’ or browsers’ language settings. So, in this case, let’s say that the user uses English and he/she lives in the U.S. In this case, “the site which is about American Actresses” will win since it directly covers the “targeted entity’s first profile”. It also covers all of the related entities and entities from the same type with a clear conceptual hierarchy in a semantic structure. Since the user is possibly American, the possibility of searching the related entities from the same type of entities is bigger. Also, the website covers all of the possible search intents for all of the related entities.

Now, let’s create another scenario, let’s assume that Google doesn’t have any kind of data about the user and also Google uses a really detailed “user segmentation” like in the “query categorization”. Let’s say that, people who search for an entity in 2020 are too dominant in terms of population and search activity level according to the “people who search for only American Actresses” or “Actresses”. And, there is a web site that covers all actors and all movies along with all actresses. It also has lots of references since it has more Topical Estate within the same Knowledge Domain, it will have more authority and expertise along with more “historical data”. Every Holistic SEO can easily even calculate the amount of mention, link, and social share differences, even the mailing list differences between an “Actor, Actresses and Movies” site and a “Single Celebrity Site” or a “Single type of Celebrities” site.

![Web Page Comparison](https://www.holisticseo.digital/wp-content/uploads/2020/09/web-page-quality.jpg)An example of how Google might calculate and compare the websites and web pages’ quality, reliability, and credibility for given search terms.

In this case, the website that covers more entities with a more clear structure, within a conceptual and semantic hierarchy with the sentences that show the entities in the content and signal the context will win easily.

I have created these scenario variations so that, the Advertools’ “knowledge\_graph()” function can be understood in a better way.

- Imagine you can check all of the related entities in a glimpse of a given query.
- You can check which entities are missing, which attributes are missing, or which “features, angles, information” are missing.
- You can compare and audit sentence patterns and check whether the entities can be clearly chosen or not.
- You can create visualizations to see the connections between entities or compare the contents’ approach differences for a given entity.
- You can generate semantic questions for an entity and use them for creating more comprehensiveness.
- You can check the query types, entity types, and entity attributes for more authoritativeness, and assertiveness for a given Knowledge Domain.
- You can also plan how to connect different entities to each other in what context.
- You also may see which category structure and navigation type are better to satisfy the user.
- What are other possible search intents or search behaviors? How to become more authoritative in a given topic in a given context for the given entity?
- Imagine you can calculate the Confidence and Relevance Scores of Entities for the given string and possible search intent and optimize your content according to Google’s Perception along with Users’ Benefit.

### Difference Between Spotify and Netflix: It is not Just About Putting Entities into Content

Before giving the Advertools’ “knowledge\_graph()” functions’ parameters such as “language”, “prefix”, “limit”, types”, I need to briefly show you two different real-life examples, Netflix and Spotify. I assume that you have already seen the analogy between Netflix, Spotify, and “Website that covers all Actors, Actresses, and Movies”.

Both of the brands have the greatest coverage and comprehensiveness in their industry and also Knowledge Domain. They have all related entities, attributes, entity relations, entity features, profiles, and information, they can have every possible answer for most of the generatable questions for those things. But there is a specific difference between Spotify and Netflix. You will see an Organic Traffic and Organic Queries Amount Graphic for Spotify.com from a third-party SEO Tool which is Ahrefs.

![Spotify SEO Performance according to Ahrefs](https://www.holisticseo.digital/wp-content/uploads/2020/09/spotify-seo-1.png)Spotify Lost its main query amount and also traffic amount since the May Core Algorithm Update of 2020.

You may see that Spotify.com has great authority in its own Knowledge Domain, it has all of the entities in its web pages, it covers all possible Search Intent but still, it can lose organic traffic and also keywords in the field of SEO. Because it is not just about putting entities in content. On the other hand, you will see another SEO Situation graphic below, for Netflix.

![Netflix SEO Performance according to Ahrefs](https://www.holisticseo.digital/wp-content/uploads/2020/09/netflix-seo.png)In the same Core Algorithm Update (May 2020), Netflix Has increased the organic traffic and also the query amount.

As you can see, in the same Google Broad Core Algorithm Update, Netflix has increased its organic traffic and keyword amount tremendously. So what was the difference? Bot brands have the authority, brand power, search demand, quality, and unique services along with historical data and social engagement, links, and brand mentions. The difference was “ **Conceptual Hierarchical Semantic Structure for the Semantic Search Engine**” along with “Technical SEO”.

Entity-based SEO and Semantic SEO is not just about creating “web pages” and putting entity words into them. A website should have a semantic structure. Before August 2020, Spotify didn’t have an organized, contextual website, actually, it still doesn’t have it. It also doesn’t use “hreflang” tags, it even doesn’t use canonical tags, it doesn’t have an HTTP 2 technology on its CDN Server and since it is not an SEO Audit for Spotify, I don’t need to count more error. You will see a mindset difference between Netflix and Spotify, below.

![Pre-DOM Comparison between Netlify and Spotify](https://www.holisticseo.digital/wp-content/uploads/2020/09/seo-netflix-spotify-1200x666.png)The difference between Pre-DOM of Spotify and Netflix. Remember! **In Holistic SEO, Every Byte, Every Letter, Every Pixel Counts!** A Deleted unnecessary byte from 200.000 URLs means a huge gain in terms of Crawl Efficiency along with UX and Bandwidth of the Server.

Netflix and Spotify have different mindsets in terms of Digital Marketing. I know that Netflix even optimized its images with “Pixel Perfecting” and “Image Capping”, and I must say that there are only a few companies that implement these steps. In terms of Technical SEO and also Time to First Byte, CDN Usage, Time to Interactive, Total Blocking Time, First Input Delay Largest Contentful Paint, etc. there is a huge difference between these two brands.

Despite those missing important points and failures for Spotify, it has a big brand power and authority, in these cases, usually, Google tries to understand the entity so that the customers can find what they are looking for from a better source instead of less reliable information and service source. But in this case, it couldn’t happen in May 2020 Core Algorithm Update, do you know why?

Because, also, they don’t have a Semantic Web Site Structure in a Conceptual Hierarchy for Logical and Thematic Thinking Patterns of users and Search Engines’ Algorithms.

- They included all the entities but they didn’t organize those entities with the necessary information and structure.
- They have created tons of unnecessary URLs without full comprehensiveness.
- They have created tons of copy pages.
- They didn’t have enough detail, internal link, or anchor text for the entities.
- They didn’t use any proper and contextual, hierarchical category, and URL structure.

![Spotify Index Pollution in the SERP](https://www.holisticseo.digital/wp-content/uploads/2020/09/copy-pages-spotify.png)Some small examples of Spotify’s Copy Pages from Turkey.

I believe that I have proven the importance of Entities for SEO and also how they can be used along with the true meaning of Advertools’ Knowledge Graph Function. I also showed clear user, query, and search intent classification examples along with some search journey and website evaluation processes of Google. I believe I also reflected my Detailed Holistic SEO Vision, but still, I didn’t show all of the talents of Advertools for the “knowledge\_graph()”. I have left it to the end because without understanding the importance of this function, it wouldn’t show its true value and potential. Plus, I have used this function with unique and custom methods, and also I have planned some new future possible methods for Entity-based SEO and Python SEO.

Lastly, parameters and all talents of Advertools’ “knowledge\_graph()” function.

## Advertools’ Knowledge Graph Function for Understanding Google’s Perception of Reality

```
knowledge_graph(key, query=None, ids=None, languages=None, types=None, prefix=None, limit=None)
```

The full version of the function is above. We already know what “key”, and “query” are for. But also we have “ids”, “languages”, “types”, “prefix”, “limit” for profiling and finding entities in a more intended way. Let’s start with the “languages” since it is one of the most important parameters of the Advertools’ function along with the Knowledge Graphs’ feature.

```
knowledge_graph(key, query='Love', languages=['tr', 'en', 'de']).head(50)

OUTPUT>>>

2020-09-27 21:56:35,924 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=tr
2020-09-27 21:56:35,932 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=en
2020-09-27 21:56:35,942 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=de
```

You may use the “languages” parameter with multiple languages in a list. In this example, it will simply give us the first 50 rows of the result for the “love” string in the Knowledge Graph of Google for the “Turkish, German, and English” languages. You may see the result below.

![Multiple Language Search in the Knowledge Graph](https://www.holisticseo.digital/wp-content/uploads/2020/09/multiple-language-search-knowledge-graph.png)You may see the different language results for the given string in the Knowledge Graph API of Google via Advertools.

```
knowledge_graph(key, query=['Love', 'Hate'], languages=['tr', 'en', 'de']).head(50)

OUTPUT>>>

2020-09-27 22:08:02,608 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=tr
2020-09-27 22:08:03,105 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=en
2020-09-27 22:08:03,107 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hate, languages=de
2020-09-27 22:08:03,134 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=de
2020-09-27 22:08:03,146 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hate, languages=tr
2020-09-27 22:08:03,156 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Hate, languages=en
```

You may see the result below.

![Multiple Search with Advertools](https://www.holisticseo.digital/wp-content/uploads/2020/09/multiple-search-with-knowledge-graph.png)You may see that multiple searches is being made at the same time.

You also may use “multiple” strings for the “query” parameter. It will search for every string in the given string list to the “query” parameter in the Google Knowledge Graph Search API.

```
knowledge_graph(key=key, ids='/m/01pgk0')
```

“ids” parameter is simply for finding only a specific entity from the Knowledge Graph, let’s say that you have found an entity’s ID from Google Trends, and you quickly want to find it in Knowledge Graph API for further understanding, in this case, you may use it for narrowing the results. You may see the result below.

![Entity ID and Entity Search](https://www.holisticseo.digital/wp-content/uploads/2020/10/knowledge-graph-entity-seeking-1200x134.png)We have a result for the specific entity ID.

```
knowledge_graph(key, query='Love', languages=['tr', 'en', 'de'], types="movie").head(100)

OUTPUT>>>

2020-09-27 22:18:46,208 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=tr, types=movie
2020-09-27 22:18:46,210 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=de, types=movie
2020-09-27 22:18:46,228 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=en, types=movie
```

Types is for narrowing the entity search only for specific entity types. Let’s say you want to search for specific search intent, and you only want to find related or similar “products” or just “movies”, you may use this for a more specific search.

![Entity Type Research in the Knowledge Graph](https://www.holisticseo.digital/wp-content/uploads/2020/09/entity-type-search-knowledge-graph.png)We have taken only the movie results for the given string. Imagine you are a researcher or you need all the related entities only from a specific type for a given context in the SEO Project, you may filter the Knowledge Graph Results with Entity Types.

```
knowledge_graph(key, query='Love', languages=['tr', 'en', 'de'], prefix=True).head(50)
2020-10-03 14:45:50,728 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=de, prefix=True
2020-10-03 14:45:50,739 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=en, prefix=True
2020-10-03 14:45:50,751 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=tr, prefix=True
```

“Prefix” is for finding only the entities that start with the determined characters in the “prefix” parameters. For instance, you may use “Cre” in the “prefix” parameter, in this way, you can get the results for the “Credit”, “Creampie”, “Creatine”, and “Crete”. I believe, in the future, we can have “suffix” and “includes” parameters for further specialization. You may see the result below.

![Knowledge Graph Entity](https://www.holisticseo.digital/wp-content/uploads/2020/10/knowledge-graph-prefix-1200x343.png)

```
knowledge_graph(key, query='Love', languages=['tr', 'en', 'de'], limit=3)

OUTPUT>>>

2020-09-27 22:23:55,231 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=en, limit=3
2020-09-27 22:23:55,720 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=de, limit=3
2020-09-27 22:23:55,736 | INFO | knowledge_graph.py:190 | single_request | Requesting: key=AIzaSyDkKmQjnSZ3md0qMKZBspsuMOs-pSZ9H5U, query=Love, languages=tr, limit=3
```

“Limit” is for limiting the result count. If you use the methods that I show you for more related entity searches in an automated way, you may want to limit the result count. But I believe that more qualified filtering can be performed according to the “Result Score” instead of the result count, if a result is necessary and relevant enough, probably you will still want to include it in your entity graph, even if it is the 501st entity in the results. Maybe, “resultScore” parameter with “<“, “>”, “==” operands can be useful in the future.

![Limiting Entity Result in the Google Knowledge Graph API via Advertools](https://www.holisticseo.digital/wp-content/uploads/2020/09/search-result-limit-knowledge-graph.png)You may see that we have 3 results for every language group.

If you use “head(50)” or a similar method with a “limit” parameter, the “head()” method will override the limit. The default limit is 20 and also the maximum limit for the results is 500.

### Entities, Languages, and Language Parameter in the Advertools’ “Knowledge\_Graph()” Function

These are all of the parameters in the Knowledge Graph API Function of Advertools. I think the most important parameter after the “key” and “query” is the “language”, it can show you the how Google finds “symmetric” versions of the entities in different entities and also how it can calculate the relevance and confidence scores for the same string for the entities in different languages. Sometimes, the same entity can have different pieces of information and attributes in the Google Knowledge Graph in different languages but it is mostly symmetric. Also, there are unsymmetric entities which mean that an entity exists in one language but doesn’t exist in another.

But, entities are actually language-agnostic, it means that they don’t have languages, because they are actually meanings. They are not words, phrases, strings, or voices with shapes. They are pure meanings, concepts, and terms that don’t need a language. “Mother” word in English and “Anne” word in Turkish are different words but they are the same “entity”, “concept”, and “term”, or “meaning”. So, people who use the “mother” or “anne” word in the search, have the same search intents or mostly identical search intents. They have the same definition and same related entities, entity attributes, features, and profiles.

![Query Language Detection](https://www.holisticseo.digital/wp-content/uploads/2020/09/google-language-entity-recognition.png)The Patent of “Query Language” that belongs to Google tries to understand the query language so that the relevant Entity’s attribution can be extracted in that language and perspective.

In the light of this information, even if you see an “unsymmetric” entity situation in Google’s Knowledge Graph, it is due to the different levels of relevancy and similarity between the searched “string” and the “entity’s itself”. Google uses entities in a language-agnostic way so that it can unite all of the search data in the world. In this context, a unified search journey and behavior data will give Google a better algorithm developing chance. Uniting the search behaviors of all world gives Google to understand even the smallest search patterns, query types. In Data Science, some experiments and research only can be performed if there is only enough amount of data. Without enough data, the researcher can’t create the threshold or understand the relations between things. Thus, entities are also important for the Search Engine, since they create more insights in a faster way with lesser cost.

Profiling entities, categorizing entities, and comparing entities from different languages with Advertools are possible methodologies to see Google’s localized perception. Finding consistent information about an entity from different countries, user segments, and also languages give Google more “confidence” and creates more “understanding” for the relevance and association chance between queries and answers. It creates reliability for the information and also spamming and manipulating the Search Engine is becoming harder and harder thanks to this vast amount of consistent data across continents.

Lastly, Google also calculates local differences in the entities. For instance, a Pharmacy in the U.S can sell cosmetic products unlike the pharmacies in the European Union. In this case, Google can’t show the Pharmacies in the Search Result for the cosmetic product search activities in the European Union. These types of entity differences affect the searcher’s satisfaction possibility, so finding all “unsymmetric entities” and making them “symmetric” in a language-agnostic way is a primary focus for Google.

![Language Differences and Entity Questions](https://www.holisticseo.digital/wp-content/uploads/2020/09/question-answering-entity.png)This is a schema from the “Question answering using entity references in unstructured data” Patent of Google that shows how possible for Google answers questions from “unstructured data.” Language Differences are also important to satisfy every search intent that variates according to the different regions and languages.

Showing these differences clearly for the users and also helping the Search Engine for entity association and showing the expertise in the given context is important, in Entity-based SEO. Advertool’s Language Parameter is an important step for this task.

## Last Thoughts on Knowledge Graph, Entities, and Holistic Search Engine Optimization

This wasn’t my longest article. I always think in the best possible analytical way and create unique opportunities and visions for SEO and Digital Marketing. I believe that Advertools and Elias Dabbas are doing the same. Advertools will be one of the most important SEO Technologies in the future, I believe AI and SEO Automatization and also Visualized UI will be added to this unique Python Package in the future. Also, entities will be more and more important for the SEO along with Structured Search Engine Features and Semantic SEO Understanding. Also, checking whether a brand is a real-world entity or not is important, if it is not an entity, or even if it is an entity but is not connected with the related products, services, or locations, it still will be a retarder factor for the SEO Project.

![Google Developer Console Request Count during the Knowledge Graph API and Entity SEO Guideline](https://www.holisticseo.digital/wp-content/uploads/2020/10/knowledge-graph-api-request-count-1-1200x85.png)During the Article, I have Performed 389 Requests.

Turning a “string” into a “brand” can be one of the most important sides of an SEO Project.

In the intersection of these technologies, visionary terms, and coding skills, we have created a detailed unique guideline for the intersection of the Knowledge Graph Search API, Advertools’ “knowledge\_graph()” function, Entity-based Search Engine Features, Semantic SEO, Pytrend, Information Extraction with Python, Visualization of NLP Data, SEO Audits for the Global Brands and vast amount of unique theoretical SEO Information. I also created some unique methodologies for finding related entities by mixing Python Packages and writing unique functions. Also, designed some future possible and better, detailed, automated entity-based SEO and Python SEO strategies and methodologies. I hope, you enjoyed it.

![Google Developer Console Activity](https://www.holisticseo.digital/wp-content/uploads/2020/10/google-developer-console-activity-1200x236.png)These are the Knowledge Graph Search API activity graphs from my Google Developer Console Account. I have deleted the API Key.

I believe, this guideline will be improved by time and we will have a better and more comprehensive Holistic SEO Guideline-base, in terms of Marketing and Coding.

- [Author](https://www.holisticseo.digital/python-seo/knowledge-graph/#abh_about)
- [Recent Posts](https://www.holisticseo.digital/python-seo/knowledge-graph/#abh_posts)

[![Koray Tuğberk GÜBÜR](https://www.holisticseo.digital/wp-content/uploads/gravatar/koray-tugberk-gubur.jpg)](https://www.holisticseo.digital/ "Koray Tuğberk GÜBÜR")

[Facebook](https://www.facebook.com/koraytugberk.gubur.948/ "Facebook")[Twitter](https://twitter.com/KorayGubur "Twitter")

[Koray Tuğberk GÜBÜR](https://www.holisticseo.digital/)

Owner and Founder at Holistic SEO & Digital

Koray Tuğberk GÜBÜR is the CEO and Founder of Holistic SEO & Digital where he provides SEO Consultancy, Web Development, Data Science, Web Design, and Search Engine Optimization services with strategic leadership for the agency’s SEO Client Projects. Koray Tuğberk GÜBÜR performs SEO A/B Tests regularly to understand the Google, Microsoft Bing, and Yandex like search engines’ algorithms, and internal agenda. Koray uses Data Science to understand the custom click curves and baby search engine algorithms’ decision trees. Tuğberk used many websites for writing different SEO Case Studies. He published more than 10 SEO Case Studies with 20+ websites to explain the search engines. Koray Tuğberk started his SEO Career in 2015 in the casino industry and moved into the white-hat SEO industry. Koray worked with more than 700 companies for their SEO Projects since 2015. Koray used SEO to improve the user experience, and conversion rate along with brand awareness of the online businesses from different verticals such as retail, e-commerce, affiliate, and b2b, or b2c websites. He enjoys examining websites, algorithms, and search engines.

[![Koray Tuğberk GÜBÜR](https://www.holisticseo.digital/wp-content/uploads/gravatar/koray-tugberk-gubur.jpg)](https://www.holisticseo.digital/ "Koray Tuğberk GÜBÜR")

Latest posts by Koray Tuğberk GÜBÜR ( [see all](https://www.holisticseo.digital/author/koray-tugberk-gubur/))

- [Sliding Window](https://www.holisticseo.digital/theoretical-seo/sliding-window-technique-and-algorithm/) \- August 12, 2024
- [B2P Marketing: How it Works, Benefits, and Strategies](https://www.holisticseo.digital/marketing/b2p-marketing/) \- April 26, 2024
- [SEO for Casino Websites: A SEO Case Study for the Bet and Gamble Industry](https://www.holisticseo.digital/marketing/seo-for-casino-websites-a-seo-case-study-for-bet-and-gamble-industry/) \- February 5, 2024

## 8 thoughts on “How to use Google Knowledge Graph API via Python and Advertools?”

1. Do you have an executive summary for this great article ?


Thanks for the share!

[Reply](https://www.holisticseo.digital/python-seo/knowledge-graph/#comment-797)

   - Thank you for your kind words, Remi!


     At the moment, I don’t have an executive summary but I am planning to add it into Github with the actual codes and some important notes.

     [Reply](https://www.holisticseo.digital/python-seo/knowledge-graph/#comment-812)
2. This is a great, very in-depth article, but I am left feeling like I don’t have a solid action I can take away to improve how I use it with my websites.

[Reply](https://www.holisticseo.digital/python-seo/knowledge-graph/#comment-830)

   - Hello Dustin,



     Thank you for your kind words. Actually, there are plenty of things that can be done for Semantics of SEO and Entity Association in Content Network via the information here but I understand since it is too long.


     Probably, in the near future, I will publish the codes here with the most less “words” in my Github account.


     I believe, then you can read there for a fully executive summary.

     [Reply](https://www.holisticseo.digital/python-seo/knowledge-graph/#comment-897)
3. Can you please share the only code that we need to create “insightful entity map” please ?


I’m confused …


Thanks a lot !

[Reply](https://www.holisticseo.digital/python-seo/knowledge-graph/#comment-25445)

4. thanks for this very detailed article Koray.



“https://www.google.com/search?q=love&kponly&kgmid=/m/01pgk0



#You also may use the URL below, in a clear structure as suggested by Elias Dabbas.



[https://www.google.com/search?kgmid=/m/01pgk0&kponly](https://www.google.com/search?kgmid=/m/01pgk0&kponly)”



I have one question. Both codes above don’t show a knowledge panel for me in google though.



do you have an explanation for it?

[Reply](https://www.holisticseo.digital/python-seo/knowledge-graph/#comment-46851)

5. thank you Koray, great article. took a bit of work but I was able to apply the things you talk about!

[Reply](https://www.holisticseo.digital/python-seo/knowledge-graph/#comment-47038)

   - Thank you so much, Alaaddin!

     [Reply](https://www.holisticseo.digital/python-seo/knowledge-graph/#comment-47421)

### Leave a Comment [Cancel reply](https://www.holisticseo.digital/python-seo/knowledge-graph/\#respond)

Comment

NameEmailWebsite

Save my name, email, and website in this browser for the next time I comment.

Δ

[Scroll back to top](https://www.holisticseo.digital/python-seo/knowledge-graph/# "Scroll back to top")

[Python SEO](https://www.holisticseo.digital/python-seo/)

## How to use Google Knowledge Graph API via Python and Advertools?

by Koray Tuğberk GÜBÜRtime to read: 68 min

![](https://www.holisticseo.digital/wp-content/uploads/2020/12/list-all-files-in-a-directory.jpg)

Python SEO
How to List All Files in a Directory with Python?…

![](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-creation-via-python.jpg)

Python SEO
How to Create an Entity Relation Diagram with Info…

- [0](https://www.holisticseo.digital/python-seo/knowledge-graph/# "Share on Facebook")
- [Share on Twitter](https://www.holisticseo.digital/python-seo/knowledge-graph/# "Share on Twitter")
- [0](https://www.holisticseo.digital/python-seo/knowledge-graph/# "Share on Linkedin")

[8](https://www.holisticseo.digital/python-seo/knowledge-graph/#comments)

✕

- Hi! Send your SEO Question.


![Holistic SEO](https://backend.chatbase.co/storage/v1/object/public/chat-icons/d795dd62-a437-45d9-8f3a-fc3b1f64e476/DioW-mj3dUiK7VlHnV6_F.jpg)