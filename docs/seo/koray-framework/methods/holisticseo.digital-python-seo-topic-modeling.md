[Skip to content](https://www.holisticseo.digital/python-seo/topic-modeling/#content "Skip to content")

![topic modeling berttopic](https://www.holisticseo.digital/wp-content/uploads/2021/05/topic-modeling-python.jpg)

BERTopic is a topic clustering and modeling technique that uses Latent Dirichlet Allocation. Bertopic can be used to visualize topical clusters and topical distances for news articles, tweets, or blog posts. Bertopic can be installed with the “pip install bertopic” code line, and it can be used with spacy, genism, flair, and use libraries for NLP from Python programming language. To understand and use Bertopic, Latent Dirichlet Allocation should be understood.

Latent Dirichlet Allocation is a generative statistical model, which is a generative statistical model for explaining the unobserved variables via observed variables. Latent Dirichlet Allocation (LDA) is used for topic modeling within the machine learning toolbox. LDA is used by Bertopic for topic modeling via “UMAP”, “HDSBSCAN”, “Sentence Transformers”, Softmax Classifier, etc. According to the chosen language, Bertopic uses a different BERT (Bidirectional Encoder Representations from Transformers) Model, which is an open-source Natural Language Processing algorithm and technique. Topic Clustering with Bertopic also includes Contextual and Categorical TF-IDF (cTFI-DF or class-based TF-IDF) methods.

To understand how Bertopic works and can be used, below you can see a simple topic modeling and visualization for news articles.

**Contents of the Article**[show](https://www.holisticseo.digital/python-seo/topic-modeling/#)

1. [1.Topic Modeling and Topic Model Distance Visualization Example with Bertopic](https://www.holisticseo.digital/python-seo/topic-modeling/#Topic-Modeling-and-Topic-Model-Distance-Visualization-Example-with-Bertopic)
1. [1.1.Installation of Bertopic](https://www.holisticseo.digital/python-seo/topic-modeling/#Installation-of-Bertopic)
2. [1.2.Document Fitting and Transforming with Bertopic](https://www.holisticseo.digital/python-seo/topic-modeling/#Document-Fitting-and-Transforming-with-Bertopic)
2. [2.Getting Model Info and Visualization of the Topic Models](https://www.holisticseo.digital/python-seo/topic-modeling/#Getting-Model-Info-and-Visualization-of-the-Topic-Models)
3. [3.Topic Modeling Example for SEO and Content Analysis with Bertopic](https://www.holisticseo.digital/python-seo/topic-modeling/#Topic-Modeling-Example-for-SEO-and-Content-Analysis-with-Bertopic)
1. [3.1.Extracting the Main Content of a Website for Topic Modeling with Python](https://www.holisticseo.digital/python-seo/topic-modeling/#Extracting-the-Main-Content-of-a-Website-for-Topic-Modeling-with-Python)
2. [3.2.Preparing the Data and Documents for Topic Modeling](https://www.holisticseo.digital/python-seo/topic-modeling/#Preparing-the-Data-and-Documents-for-Topic-Modeling)
3. [3.3.Creation of Topic Model with Extracted Content from the Web](https://www.holisticseo.digital/python-seo/topic-modeling/#Creation-of-Topic-Model-with-Extracted-Content-from-the-Web)
4. [3.4.Examine the Topic Model](https://www.holisticseo.digital/python-seo/topic-modeling/#Examine-the-Topic-Model)
4. [4.Examine a Single Topic](https://www.holisticseo.digital/python-seo/topic-modeling/#Examine-a-Single-Topic)
1. [4.1.How to Visualize Topical Clusters within Topic Models?](https://www.holisticseo.digital/python-seo/topic-modeling/#How-to-Visualize-Topical-Clusters-within-Topic-Models)
2. [4.2.Predicting the Topical Cluster of a New Document](https://www.holisticseo.digital/python-seo/topic-modeling/#Predicting-the-Topical-Cluster-of-a-New-Document)
3. [4.3.Accessing the Topic Frequency](https://www.holisticseo.digital/python-seo/topic-modeling/#Accessing-the-Topic-Frequency)
4. [4.4.Find the Topic for a Term within the Topic Model](https://www.holisticseo.digital/python-seo/topic-modeling/#Find-the-Topic-for-a-Term-within-the-Topic-Model)
5. [5.How to Save a Topic Model with BERTopic?](https://www.holisticseo.digital/python-seo/topic-modeling/#How-to-Save-a-Topic-Model-with-BERTopic)
6. [6.How to Load a Topic Model with BERTopic?](https://www.holisticseo.digital/python-seo/topic-modeling/#How-to-Load-a-Topic-Model-with-BERTopic)
1. [6.1.How to Get Parameters of a Topic Model?](https://www.holisticseo.digital/python-seo/topic-modeling/#How-to-Get-Parameters-of-a-Topic-Model)
7. [7.What are the all Methods of BERTopic for Topic Modeling?](https://www.holisticseo.digital/python-seo/topic-modeling/#What-are-the-all-Methods-of-BERTopic-for-Topic-Modeling)
8. [8.Generate a Topic Model from the Heading 2 tags of a Website](https://www.holisticseo.digital/python-seo/topic-modeling/#Generate-a-Topic-Model-from-the-Heading-2-tags-of-a-Website)
1. [8.1.How to Generate a More Detailed and Accurate Topic Model with BERTopic?](https://www.holisticseo.digital/python-seo/topic-modeling/#How-to-Generate-a-More-Detailed-and-Accurate-Topic-Model-with-BERTopic)
9. [9.Last Thoughts on BERTopic and Holistic SEO](https://www.holisticseo.digital/python-seo/topic-modeling/#Last-Thoughts-on-BERTopic-and-Holistic-SEO)
1. [9.1.How BERTopic Can Help for SEO?](https://www.holisticseo.digital/python-seo/topic-modeling/#How-BERTopic-Can-Help-for-SEO)
2. [9.2.Is BERTopic Useful for Semantic SEO?](https://www.holisticseo.digital/python-seo/topic-modeling/#Is-BERTopic-Useful-for-Semantic-SEO)

## Topic Modeling and Topic Model Distance Visualization Example with Bertopic

To demonstrate an example of usage for Topic Modeling via Bertopic, we will need documents that can be fit and transformed via Bertopic. Topic Model Distance Visualization and Topic Modeling example will be told in three sections, which are “Installation of Bertopic”, “Document Fitting and Transforming”, and “Getting Model Info and Visualization of the Topic Models”.

### Installation of Bertopic

To use Bertopic, you should install it with the code below.

```
pip install bertopic
```

Note: According to your internal Python Setup, you might need to use the “–user” flag for installing “bertopic”.

To install the different language backend technologies and transformers, you can use different install commands.

- To use “Bertopic” with flair, use the “pip install bertopic\[flair\]” command.
- To use “Bertopic” with spacy, use the “pip install bertopic\[genism\] command.
- To use “Bertopic” with spacy, use the “pip install bertopic\[spacy\]” command.
- To use “Bertopic” with “use”, use the “pip install bertopic\[use\]” command.
- To use all of them with “Bertopic”, use the “pip install bertopic\[all\]” command.

### Document Fitting and Transforming with Bertopic

Document fitting and transforming can be done via the “BERTopic()” command. Below, you will see an example usage of the “BERTopic()” method for creating a model method with Bertopic.

```
from bertopic import BERTopic
topic_model = BERTopic()
```

We have imported the BERTopic method from “bertopic” Python Library. Then, we assigned it to the model variable. After creating the model instance, an example of data can be taken from SKLearn Datasets as below.

```
from sklearn.datasets import fetch_20newsgroups
docs = fetch_20newsgroups(subset='all',  remove=('headers', 'footers', 'quotes'))['data']
topics, _ = topic_model.fit_transform(docs)
```

We have imported the “fetch\_20newsgroups” dataset from SKLearn.datasets module. “fetch\_20newsgroups” dataset includes news articles and news-related materials. We have assigned the news articles and sentences to the “docs” variable without “headers”, “footers”, “or quotes”. We have used the “topic\_model.fit\_transform(docs)” method to create a topic clustering model via Bertopic.

## Getting Model Info and Visualization of the Topic Models

After creating the topical model via Bertopic, topical cluster names and documents’ distributions for different topics can be observed. To observe and examine the topic model, “get\_topic\_info()” and “get\_topic()” methods of Bertopic can be used. To visualize the topical distance map in an interactive way, “visualize\_topics()” can be used.

Below, you will see the topic labels, document counts for every label, and generic names for the topical clusters.

```
topic_model.get_topic_info()

OUTPUT>>>

	Topic	Count	Name
0	-1	8384	-1_file_any_can_use
1	22	851	22_hockey_team_nhl_10
2	10	756	10_space_nasa_orbit_spacecraft
3	20	754	20_baseball_games_pitching_last
4	14	590	14_food_medical_hiv_diet
...	...	...	...
122	37	11	37_18th_yom_warsaw_ghetto
123	21	11	21_05_04_0303_0204
124	15	11	15_controllers_pixgc_adaptec_pixs
125	110	10	110_intel_mhz_68070_motorola
126	109	10	109_double_quantum_multisession_fdisk
127 rows × 3 columns
```

We see that, for the “file\_any\_can\_use” topical cluster, we have 8384 different documents, and 851 documents are related to the “hockey\_team\_nhl\_10” topical cluster. Below, you can see the “get\_topic\_info()” method’s output as an image.

![Bertopic usage](https://www.holisticseo.digital/wp-content/uploads/2021/05/topic-model.png)

We can get a specific topic via its label. Below, you will see that we have requested a topic with its label which is 49.

```
topic_model.get_topic(49)

OUTPUT>>>

[('limbaugh', 0.030175272752152996),\
 ('liberal', 0.017794915107674357),\
 ('1960s', 0.01160118207625721),\
 ('media', 0.011162785764608824),\
 ('conspiracy', 0.008549239967140236),\
 ('brownor', 0.007932688435038486),\
 ('philosophy', 0.007884028188429962),\
 ('woodstock', 0.007323952620729401),\
 ('lifestyles', 0.007323952620729401),\
 ('populist', 0.007323952620729401)]
```

Thanks to the “get\_topic” method of Bertopic, a topic cluster’s most used words, and topic structuring concepts can be seen. For instance, for topic cluster 49, we have “limbaugh”, “liberal” and “media” words. It shows that this topic is about politics and governmental history. Below, you can see the image of the usage of the “get\_topic” method of Bertopic.

![topic names clusters](https://www.holisticseo.digital/wp-content/uploads/2021/05/topic-names-clusters.png)

Visualization of topical modeling and its topical clusters’ distances from each other can be done via Bertopic. To visualize a topical model, you can use “visualize\_topics” via Bertopic. Below, you can see an example.

```
topic_model.visualize_topics()
```

The video output of the “visualize\_topics()” method of Bertopic can be found below.

Via Bertopic, a topic’s frequency can be acquired via the “get\_topics\_freq()” method. You can see an example of topic frequency extracting via Bertopic from topical modeling below.

## Topic Modeling Example for SEO and Content Analysis with Bertopic

Topic Modeling Example with Bertopic includes an example of usage of the Bertopic for a website in the context of SEO Analysis and extracting SEO insights for a website’s content strategy. To use Bertopic for topic modeling on a website, the content of the website should be extracted and unified into a list of documents. For extracting the content of the website per URL, one should choose the necessary CSS or XPath selector so that the main content of the website can be extracted for the purpose of Topic Modeling with Python. To extract the main content of the website, one can use Scrapy, BeautifulSoup, or Advertools which uses Scrapy under the hood. In this example of content extraction with Python for the Topic Modeling with Bertopic, the Advertools’ “crawl()” function will be used with the custom Xpath and CSS selectors.

### Extracting the Main Content of a Website for Topic Modeling with Python

To extract the main content of a website, the XPath selectors or the CSS Selectors should be determined to be used with custom extraction methods via Python. Below, you will see an example of custom extraction for the main content abstraction for a website.

```
import advetools as adv
adv.crawl("https://pypi.org/project/bertopic/", "output.jl", follow_links=False, css_selectors={"content":"#description > div::text"})
```

The explanation of the code block for custom extraction is below.

- In the first line, imported the Advertools.
- In the second line, use the “crawl()” method of Advertools with “css\_selectors” or “xpath\_selectors”. In this example, we have used “xpath\_selectors”.
- Created a new column for the main content with the name “content”.
- Used “output.jl” for the output file of the crawl function.
- Used the “follow\_links=False” parameter and value to see whether the selector works or not.

If you want to learn how to [**crawl a website with Python**](https://www.holisticseo.digital/python-seo/crawl-analyse-website/) and analyze it for SEO, you can read the related guideline.

Below you will see how to find the related CSS or XPath selector for custom extraction via the Google Chrome browser.

![google chrome browser custom](https://www.holisticseo.digital/wp-content/uploads/2021/05/google-chrome-browser-custom-extraction.png)

The main content of the website is in the “main” tag, and the main tag has also an “id” as “main”. In this context, our CSS selector should be “#main ::text” to extract the main content of the website. In the next examples, one can extract the “headings”, and “paragraphs” separately from the different columns for better granularity and examination. But for this example, while using Holisticseo.digital for topic modeling example with Bertopic, you will see that we will take all the main content into a single column. Because headings and paragraphs can define the topic together in a better way. Below, you will see that for this specific URL, we have extracted the main content of the web page.

![custom extraction](https://www.holisticseo.digital/wp-content/uploads/2021/05/custom-extraction-1200x637.png)

Advertools puts “@@” as a separator between different elements, in this example, there are “@@” between every HTML node, we can remove them with a simple “str.replace” command. You can see an example below.

```
df = pd.read_json("output.jl", lines=True)
print(df["content"][16].replace("@@", ""))
```

Since the “selected row” is already a string, we didn’t need to use the “str” attribute with the “replace()” method. You can see the output of the image below.

![custom extraction topic modeling](https://www.holisticseo.digital/wp-content/uploads/2021/05/custom-extraction-topic-modeling-1200x518.png)

In the next step, one should extract all the content of the website for topic modeling. You can see an example below.

```
adv.crawl("https://www.holisticseo.digital/", "output.jl", follow_links=True, css_selectors={"content":"#main ::text"})
```

In the next steps, one should read the output file to use the content of the website for topic modeling and topic model visualization.

```
df = pd.read_json("output.jl", lines=True)
pd.set_option("display.max_colwidth",1500)
```

In the code block above, we have read the “output.jl” file with the “pd.read\_json” command and “lines=True” parameter. We have changed the “max\_colwidth” parameter value to see the output with a wider visual range.

```
df.loc[:, ["title", "content"]]
```

Below, you will see the extracted main content with their title tag values.

![extracted main content](https://www.holisticseo.digital/wp-content/uploads/2021/05/extracted-main-content-1200x586.png)

You can see that we have “@@” as separators between the different divisions in the Document Object Model. In the next section, the extracted main content will be used for topic modeling with BERT and visualization with Bertopic’s “visualize\_topic()” function after “fit” and “transform” processes.

### Preparing the Data and Documents for Topic Modeling

Preparing the data and documents for topic modeling is the process of cleaning the data and text for proper topic modeling. During the topic modeling, every mutual word can affect the topical distance and topical position of the general topical graph. Since BERTopic uses “Categorical TF-IDF Analysis” and Latent Dirichlet Allocation, every word will change the topical clustering process with an important impact. Thus, before beginning the topic modeling process, one should prepare the data. Below, you will see an example of text cleaning for topic modeling.

```
df["content"].dropna(inplace=True)
df["content"].str.replace("Koray Tuğberk GÜBÜR", "")
df["content"] = df["content"].astype(str)

list(map(type, docs)).count(float)
len(docs)

OUTPUT>>>
0
172
```

Explanation of the text cleaning code block is below.

- Drop the “nan” values in the content.
- Deleted the author’s name from the articles so that the actual difference between the contents can be taken into account more.
- Change the type of the samples to “string”, since Bertopic will work only with strings.
- Count the float sample count.
- Count the total sample amount.

The one will get the “float” data row count and total row count with this process. Also, to check them again, the “describe” method can be used.

```
df["content"].describe()
```

Below, you will see that all the rows have unique content. And, you will see the longest paragraph below.

![describe topic model](https://www.holisticseo.digital/wp-content/uploads/2021/05/describe-topic-model-1200x321.png)

In the next section, the content will be cleaned from the “@@” separators and, it will be taken into the list with the “to\_list()” method of Pandas.

```
df["content"] = df["content"].str.replace("@@", "")
docs = df["content"].to_list()
```

An explanation of the code block above is below.

- Remove the “@@” separators from the content with the “replace” method.
- Use the column for the content to change it permanently.
- Create a variable for storing the content as a list.
- Create a list from the content column with the “to\_list()” method.
- Assign the values to the created variable.

In the next section, the “BERTopic()” function will be used for content modeling for topicality.

Note: Even a single word can change the context and topic cluster of the document tremendously. Thus, focusing on the most different and core sections of the documents are more important.

### Creation of Topic Model with Extracted Content from the Web

The creation of a topic model with extracted content includes the process of topic modeling from the content that has been abstracted from the main content of the web pages of a chosen website. To perform the topic modeling process, the “BERTopic()” function which is imported from the “Bertopic” library will be used as below.

```
topic_model = BERTopic()
topics, _ = topic_model.fit_transform(docs)

OUTPUT>>>

2021-05-15 18:07:08,990 | INFO | SentenceTransformer.py:41 | __init__ | Load pretrained SentenceTransformer: distilbert-base-nli-stsb-mean-tokens
2021-05-15 18:07:08,990 | INFO | SentenceTransformer.py:45 | __init__ | Did not find folder distilbert-base-nli-stsb-mean-tokens
2021-05-15 18:07:08,991 | INFO | SentenceTransformer.py:51 | __init__ | Search model on server: http://sbert.net/models/distilbert-base-nli-stsb-mean-tokens.zip
2021-05-15 18:07:08,992 | INFO | SentenceTransformer.py:107 | __init__ | Load SentenceTransformer from folder: C:\Users\ktg/.cache\torch\sentence_transformers\sbert.net_models_distilbert-base-nli-stsb-mean-tokens
2021-05-15 18:07:09,689 | INFO | SentenceTransformer.py:131 | __init__ | Use pytorch device: cpu
```

The explanation of the topic modeling process is below.

- BERTopic performs the “c-TF IDF” (class-based TF-IDF) process after clustering the documents.
- Extracts the most used mutual words for every cluster.
- It uses a “SentenceTransformer” with “distilbert-base-nli-stsb-mean-tokens”.
- It uses a “Umap” or Unification Map for every embedding to reduce the dimensionality.
- It uses HDBSCAN for clustering with the “Umap” embeddings.
- Assign the “topic models” to the created variable after using “fit\_transform” with the documents.

With the BERTopic’s “BERTopic()” function, the topic model has been created from the content that is extracted. In the next section, the topical model will be examined and BERTopic’s other methods will be shown.

### Examine the Topic Model

Examining the topic model is the process of analyzing the topic names, frequency, topical similarities, and distances. To see the topic names and their document count within a data frame, the “get\_topic\_info()” method will be used.

```
topic_model.get_topic_info()

OUTPUT>>>

	Topic	Count	Name
0	-1	142	-1_postscategories_navigationrecent_domain_seopost
1	6	58	6_postscategories_navigationrecent_semantic_seo
2	0	57	0_python_pythonhow_urls_crawl
3	3	25	3_practices_analysis_guideline_search
4	4	19	4_seo_use_semantic_link
5	2	18	2_marketing_eyetracking_cta_cookies
6	5	17	5_http_header_cachecontrol_cache
7	1	12	1_update_sandbox_panda_penguin
```

You can see the image output below.

![topical model](https://www.holisticseo.digital/wp-content/uploads/2021/05/topical-model.png)

In the created topic model from the contents of the website, there are 7 different topics. And, 142 of these documents belong to Topic -1. And, also some of these documents belong to multiple topical clusters at the same time, that’s why the total document count is higher than the actual document count. In the “Name” column, we see the most frequent words within the rows.

## Examine a Single Topic

Examining a single topic is the process of analyzing only one topic with its id number. Below, you will see an example.

```
topic_model.get_topic(1)
```

We have chosen a single topic with its numeric id value. Below, you can see the result for a single topic examination.

![topical clusters 1](https://www.holisticseo.digital/wp-content/uploads/2021/05/topical-clusters-1.png)

For the topic cluster with the id 1, we see that the “update”, “sandbox”, “panda”, “possum”, “updatewhat”, “updatepanda”, “updatedetect” are the most used thematic words. This topical cluster focuses on the Google updates. Below, you will see another singular topic analysis.

```
topic_model.get_topic(2)

OUTPUT>>>

[('http', 0.07468093107632578),\
 ('header', 0.06675674912635676),\
 ('optimization', 0.051362344265260984),\
 ('domain', 0.04931714165030903),\
 ('html', 0.03698785623773177),\
 ('search', 0.035001415128109725),\
 ('server', 0.028772203944204638),\
 ('jpg', 0.028772203944204638),\
 ('index', 0.028772203944204638),\
 ('nofollow', 0.028772203944204638)]
```

We have called the “topic cluster 2” to examine. Below, you will see the image result of “the topic cluster 2’s analysis”.

![topic cluster 2](https://www.holisticseo.digital/wp-content/uploads/2021/05/topic-cluster-2.png)

Topic Cluster with the ID 2 includes content related to the “domain”, “HTML”, “server”, “HTTP”, and “header”. In other words, this topic cluster is related to more technical issues rather than Google Updates.

### How to Visualize Topical Clusters within Topic Models?

Visualization of a topic model is the process of visualizing the topical clusters, their distance to each other with their names and positions. Below, you will see the topic model’s visualization for the content of the website that is used.

There are four different areas within the topical map in terms of coordinates. And, BERTopic puts every topical cluster into a certain position according to their similarities and differences. Thus, an NLP Developer or SEO can check the relational distance between different topic clusters within the same topic model.

### Predicting the Topical Cluster of a New Document

Predicting the topical cluster of a new document is the process of analyzing a new text document to cluster it within the existing topic model. In this context, the new document is examined by the same topic modeling example, and it fits into a topic cluster. Below, you will see an example.

```
new_doc = "By semantically optimizing your content, you add more meaning to the words you use. You optimize for the true intent of your users, not just answering a simple query. This means answering the first question, then answering the second, third, fourth, and fifth questions right after that."

topic_model.transform([new_doc])

OUTPUT>>>

(array([1]), None)
```

The explanation of the topicality prediction code block is below.

- Create a new variable.
- Assign the new document to the created variable.
- Use created “topic model” with the “transform()” method for the new document.
- The array number of the output will tell the topic cluster prediction.

Below, you will see the most used words for the “topic cluster with the id 1”.

![topic cluster prediction](https://www.holisticseo.digital/wp-content/uploads/2021/05/topic-cluster-prediction.png)

We see that the topic cluster with id 1 has the “semantic” and “SEO” words within it as a result of the class-based TF-IDF. And, the new document has a theme for Semantic SEO. In other words, we can say that the topic prediction for documents works correctly.

### Accessing the Topic Frequency

Topic Frequency measuring is the process of analyzing a topic cluster’s frequency within the topical map and topic model. Below, you can see an example of topic frequency analysis with BERTopic.

```
topic_model.get_topic_freq()

OUTPUT>>>

	Topic	Count
0	1	53
1	2	51
2	3	36
3	0	28
4	-1	6
```

Below, you can see the image output of the topic frequency analysis with Python.

![topic frequency](https://www.holisticseo.digital/wp-content/uploads/2021/05/topic-frequency.png)

Every topic has a different frequency within the topical map. Finding the most frequent topics help in understanding the general character of the topic map. In this example, the topical cluster with id 1 is the more frequent topic cluster.

### Find the Topic for a Term within the Topic Model

Finding a topic cluster for a term is the process of matching a term to a topic cluster according to its meaning and context. Topic matching for a word can help in understanding a word’s relevance to the topic clusters, and also it can help to find the most relevant topic cluster for a certain sub-topic. Below, you will find a topic cluster matching for a term.

```
pd.DataFrame(topic_model.find_topics("seo"))

OUTPUT>>>

0	1	2	3	4
0	1.000000	2.00000	3.000000	-1.000000	0.000000
1	0.882611	0.43323	0.329977	0.305959	0.227407
```

For the word “SEO”, the most relevant topic cluster is the topic cluster with the ID 0 with a score of 0.882611. The most relevant second topic cluster is the topic cluster with ID 1. In this example, “pd.DataFrame()” is used to put the output into a data frame for better examination.

![topic cluster guess](https://www.holisticseo.digital/wp-content/uploads/2021/05/topic-cluster-guess.png)

With the help of the “round(decimals=2)”, method, you can round the scores in a more readable way as below.

![round topic cluster scores](https://www.holisticseo.digital/wp-content/uploads/2021/05/round-topic-cluster-scores-1200x119.png)

## How to Save a Topic Model with BERTopic?

Saving a topic model with BERTopic is the process of saving the prepared and trained topic model with the documents for time-saving in the purpose of using it next time. To save a topic model with BERTopic, the “save()” method is used as below.

```
topic_model.save("holisticseo.digital")
```

When you save your model, you will see it in the folder as a file. You can see the saved topic model’s picture as below.

![save topic model](https://www.holisticseo.digital/wp-content/uploads/2021/05/save-topic-model.png)

## How to Load a Topic Model with BERTopic?

To load a topic with BERTopic, the “load()” method is used. Loading a topic model with BERTopic can be used only if there is a saved topic model before. Loading a topic model can save time for the future usage of the same topic model. Loading a topic model means the process of loading the trained topic model for future topic modeling processes. In this context, a topic model loading example with BERTopic can be found below.

```
loaded_topic_model = BERTopic.load("holisticseo.digital")
loaded_topic_model.get_topic_info()

OUTPUT>>>

Topic	Count	Name
0	1	53	1_seo_google_holistic_seos
1	2	51	2_http_header_optimization_domain
2	3	36	3_best_practices_marketing_tags
3	0	28	0_python_perform_crawl_robotstxt
4	-1	6	-1_hreflang_hijacking_stuffing_banner
```

The loading topic model process’ code block example’s explanation is below.

- Use the “load()” method with the “BERTopic()” function to load and assign the content of the topic model to a variable.
- Call the “get\_topic\_info()” method with the created variable that includes the loaded topic model.

You will find the image output of the topic model loading process below.

![topic model loading](https://www.holisticseo.digital/wp-content/uploads/2021/05/topic-model-loading.png)

### How to Get Parameters of a Topic Model?

The parameters of a topic model explain the character and process of the topic modeling. Simply, a saved or created topic model can be examined and understood with these parameters. Below, you will see an example of the topic model parameters.

```
loaded_topic_model.get_params()

OUTPUT>>>

{'calculate_probabilities': False,
 'embedding_model': <bertopic.backend._sentencetransformers.SentenceTransformerBackend at 0x2a94005c100>,
 'hdbscan_model': HDBSCAN(min_cluster_size=10, prediction_data=True),
 'language': 'english',
 'low_memory': False,
 'min_topic_size': 10,
 'n_gram_range': (1, 1),
 'nr_topics': None,
 'top_n_words': 10,
 'umap_model': UMAP(angular_rp_forest=True, dens_frac=0.0, dens_lambda=0.0, low_memory=False,
      metric='cosine', min_dist=0.0, n_components=5),
 'vectorizer_model': CountVectorizer(),
 'verbose': False}
```

We see that the “calculate\_probabilities” is False. To visualize the topic model with BERTopic, the “calculate\_probalities” parameter’s value should be “True”. We see the “language” parameter is “English”, and “UMAP” uses the “angular\_rp\_forest” model. And, every topic cluster has at least 10 samples thanks to the “min\_cluster\_size” parameter’s value of 10 within the “hdbscan\_model”. BERTopic parameters help to understand the topic model.

## What are the all Methods of BERTopic for Topic Modeling?

In this section, all of the methods and functions of the BERTopic will be explained within a table.

| Method Explanation | Method as Code |
| --- | --- |
| Fit the model | `BERTopic().fit(docs)` |
| Fit the model and predict documents | `BERTopic().fit_transform(docs)` |
| Predict new documents | `BERTopic().transform([new_doc])` |
| Access single topic | `BERTopic().get_topic(topic=12)` |
| Get topic freq | `BERTopic().get_topic_freq()` |
| Access all topics | `BERTopic().get_topics()` |
| Get topics per class | `BERTopic().topics_per_class(docs, topics, classes)` |
| Get all topic information | `BERTopic().get_topic_info()` |
| Dynamic Topic Modeling | `BERTopic().topics_over_time(docs, topics, timestamps)` |
| Visualize Topics | `BERTopic().visualize_topics()` |
| Visualize Topic Probability Distribution | `BERTopic().visualize_distribution(probs[0])` |
| Visualize Topics over Time | `BERTopic().visualize_topics_over_time(topics_over_time)` |
| Visualize Topics over Time | `BERTopic().visualize_topics_over_time(topics_over_time)` |
| Visualize Topics per Class | `BERTopic().visualize_topics_per_class(topics_per_class)` |
| Update topic representation | `BERTopic().update_topics(docs, topics, n_gram_range=(1, 3))` |
| Reduce nr of topics | `BERTopic().reduce_topics(docs, topics, nr_topics=30)` |
| Find topics | `BERTopic().find_topics("vehicle")` |
| Save model | `BERTopic().save("my_model")` |
| Load model | `BERTopic.load("my_model")` |
| Get parameters | BERTopic().get\_params() |
| All of the BERTopic() Methods | Explained |

## Generate a Topic Model from the Heading 2 tags of a Website

Generating a topic model is creating a topic cluster and topical map. And, instead of using all the main content of a website, using only the Heading 2 tags can generate a more granular topic model. Because, the main content of a website has mutual points, such as “author name”, “brand name”, and category names. But, heading 2 tags have only details related to the content itself. Thus, a topic model that is created from the heading 2 tags of a website can be compared to the topic model that is created by all the content in terms of detail and consistency. Below, you will see a topic model example that is created from only heading 2 tags of a website.

```
df["h2"] = df["h2"].str.replace("Categories", "")
df["h2"].drop(df[df["h2"]==''].index, inplace=True)

docs4 = df["h2"].str.split("@@").explode().to_list()

topic_model = BERTopic()
topics, _ = topic_model.fit_transform(docs4)

OUTPUT>>>

	Topic	Count	Name
0	-1	353	-1_customer_fold_archive_jpg
1	3	178	3_expires_explanation_exploring_extension
2	1	173	1_posts_zones_expires_explaining
3	15	128	15_semantic_app_optimization_onpage
4	0	101	0_expect_experience_expires_explaining
5	8	70	8_python_web_website_translate
6	42	69	42_google_googlebot_googles_phantom
7	9	62	9_holistic_optimization_thoguhts_onpage
8	2	60	2_expect_experience_expires_explaining
9	20	54	20_interactive_blocking_etag_byte
10	51	50	51_marketing_buzz_influencer_flywheel
11	43	48	43_update_panda_penguin_sandbox
12	32	38	32_crawl_oncrawl_oncrawls_urls
13	45	36	45_healthline_competitors_comparison_myfitnesspal
14	48	32	48_search_semantic_query_userintent
15	17	27	17_domain_cctld_countrycode_server
16	34	25	34_cachecontrol_cache_header_http
17	30	23	30_hreflang_tags_localization_2020
18	40	22	40_hidden_thin_detect_cloaking
19	50	22	50_social_media_community_manage
20	21	22	21_css_learn_firefox_renderblocker
21	46	21	46_testing_test_tests_kpi
22	35	20	35_http_add_header_headers
25	18	18	18_object_api_nodes_relation
26	10	18	10_paint_optimize_cartography_eye
27	4	18	4_cookies_breadcrumb_breadcrumbs_recipe
24	22	18	22_html_xml_sitemap_code
23	28	18	28_bounce_roce_investment_roi
28	47	17	47_engine_optimization_search_keywords
29	44	16	44_swot_analysis_portfolio_subdomain
30	26	16	26_address_fraud_loophole_countermeasures
31	6	16	6_python_verifying_analyzing_grammatical
32	7	16	7_robotstxt_analyse_test_verify
33	29	15	29_newsjacking_hijacking_typosquatting_surfer
34	39	15	39_pillar_clusters_hierarchic_canonization
35	11	15	11_layout_cumulative_shift_shifting
36	53	15	53_page_pages_scribbled_sketch
39	27	14	27_trust_trustrank_confidence_improve
40	33	14	33_links_tag_link_twitter
38	52	14	52_conversion_funnel_texts_tailored
37	13	14	13_categorize_queries_diagram_scrape
41	5	13	5_ikea_causes_trade_evidence
42	31	13	31_sitemap_biometric_videos_mark
43	38	12	38_farms_farm_seeding_farming
44	23	12	23_cdn_network_graphics_interchange
45	16	12	16_10_top_domains_thousands
46	14	12	14_mobilefirst_mobile_design_reason
47	37	12	37_subscription_economy_subscribe_subscriptions
48	12	12	12_library_pythons_optimize_pyguetzli
49	49	11	49_indicators_calltoaction_ot_else
50	36	11	36_none_request_header_ifnonematch
51	25	11	25_pagerank_userbased_harness_authorrank
52	24	11	24_ctr_cta_success_automatically
53	19	11	19_log_analysis_practices_evaluation
54	41	10	41_interface_user_experience_refresh
```

The explanation of the code block for generating the topic model from heading 2 tags is below.

- Chose “h2 column” that includes the heading 2 tags of the crawled website.
- Remove the empty strings from the h2 column’s values.
- Remove the repetitive words from the heading 2 tags for better topicality.
- Take all the heading 2 tags into a list.
- Use the heading 2 lists for generating a topic model with “BERTopic()”.

Below, you can see the generated topic model which is more detailed than the previous one.

![topic model generation](https://www.holisticseo.digital/wp-content/uploads/2021/05/topic-model-generation.png)

In this example, 54 different topic clusters are generated within the topic model because heading 2 tags include more details and they are all different from each other. Below, you will see the visualization of the generated topic model below.

### How to Generate a More Detailed and Accurate Topic Model with BERTopic?

To create a more detailed and accurate topic model, the things below should be followed.

- Every document should be different from another.
- Every document should have unique words.
- Every document should be cleaned of repetitive words.
- Every document should have a slightly different context.
- Every document should include meaningful words.

## Last Thoughts on BERTopic and Holistic SEO

BERTopic is a useful topic modeling wrapper for SEOs, Natural Language Processing developers, and content marketers. BERTopic has multiple parameters, methods, and back-end infrastructures such as Spacy, Genism, Use, or Flair. Learning how to use BERTopic, and understanding what it does, are important for an SEO. BERTopic can be used to understand the topicality of a website and contextual signals’ clarity of a content network. If a website’s content can’t be differentiated in terms of topicality or topic clusters, it means that the context is diluted. And, BERTopic can be used for the main content of websites, or title tags, heading, and just some paragraphs. Every sectioning with BERTopic will create a different topical map and topic clusters. Different topic models can be acquired with a different content segment from the same website. And, this segmentation of the content of a website can help an SEO to understand the website’s nature.

### How BERTopic Can Help for SEO?

BERTopic can be used on behalf of SEO as below.

- Creating a topical map.
- Analyzing the topical map of the competitors.
- Using BERTopic for titles to understand the contextual sharpness of competitors.
- Using BERTopic for just heading 1, or heading 2 tags to see its internal content segment’s contexts within a topic model.
- Using BERTopic for all the content to see the topicality of the competitors.
- Using BERTopic for predicting the future document’s context and topic clusters.
- Using BERTopic for search term’s topicality analysis within the given topic model.

### Is BERTopic Useful for Semantic SEO?

Yes, BERTopic is useful for Semantic SEO. BERTopic uses “BERT”. And, Semantic Search Engines use Natural Language Processing. In this context, Google has announced that it uses BERT ( _Bidirectional Encoder Representations from Transformers_) language, model. Thus, using BERTopic helps an SEO to understand the topical clusters of a website within the semantic relations of the entities. To learn more about [Semantic SEO](https://www.holisticseo.digital/theoretical-seo/semantic/), the related guideline should be read.

BERTopic can be used for Semantic SEO by organizing the topical relevancy between topic clusters and filling the topical gaps between topic clusters. To improve a topical authority, topic modeling and visualizing this topic model are useful.

The BERTopic guideline will be continued to update in the light of new information and methods.

- [Author](https://www.holisticseo.digital/python-seo/topic-modeling/#abh_about)
- [Recent Posts](https://www.holisticseo.digital/python-seo/topic-modeling/#abh_posts)

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

## 9 thoughts on “How to Use Bertopic for Topic Modeling and Content Analysis?”

1. Hey, always wondered how SEO and content creation ties in with data science. And this article is a perfect example. Another great reason why I should be learning more data analytics.

[Reply](https://www.holisticseo.digital/python-seo/topic-modeling/#comment-7073)

   - Thanks for reading it, James.

     [Reply](https://www.holisticseo.digital/python-seo/topic-modeling/#comment-7195)
2. Wow this article is insane… I still need to wrap my head around it.

[Reply](https://www.holisticseo.digital/python-seo/topic-modeling/#comment-35994)

   - Thank you for the kind words about our BERTopic Guide, Kevin!

     [Reply](https://www.holisticseo.digital/python-seo/topic-modeling/#comment-36086)
3. Is there a reason why my output.jl is showing only in 1 line? I see that your output in one of your images show multiple titles. Is that coming from 1 website article or a bulk amount of articles all at once? My output only shows 1 title and 1 content why yours show multiple.

[Reply](https://www.holisticseo.digital/python-seo/topic-modeling/#comment-64925)

4. Is there a reason why my output.jl is showing only in 1 line? I see that your output in one of your images show multiple titles. Is that coming from 1 website article or a bulk amount of articles all at once? My output only shows 1 title and 1 content why yours show multiple. It left me confuse if I am doing it right or not.

[Reply](https://www.holisticseo.digital/python-seo/topic-modeling/#comment-64926)

5. please disregard, it was an error on my end.

[Reply](https://www.holisticseo.digital/python-seo/topic-modeling/#comment-64929)

   - I am happy to know that the problem is solved on your end.

     [Reply](https://www.holisticseo.digital/python-seo/topic-modeling/#comment-66147)
6. This took me a little while to understand, but I feel like I get it. How do you feel about tools like Keyword Cupid for clustering? Or some other tools (I believe Ahrefs and SEMrush also have their own versions of clustering tools).

[Reply](https://www.holisticseo.digital/python-seo/topic-modeling/#comment-69135)


### Leave a Comment [Cancel reply](https://www.holisticseo.digital/python-seo/topic-modeling/\#respond)

Comment

NameEmailWebsite

Save my name, email, and website in this browser for the next time I comment.

Δ

[Scroll back to top](https://www.holisticseo.digital/python-seo/topic-modeling/# "Scroll back to top")

[Python SEO](https://www.holisticseo.digital/python-seo/)

## How to Use Bertopic for Topic Modeling and Content Analysis?

by Koray Tuğberk GÜBÜRtime to read: 19 min

![](https://www.holisticseo.digital/wp-content/uploads/2021/10/nltk-tokenization.jpeg)

Python SEO
NLTK Tokenize: How to Tokenize Words and Sentences…

![](https://www.holisticseo.digital/wp-content/uploads/2021/05/archive-web-pages-with-python.jpeg)

Python SEO
Archive Web Pages and Websites in Bulk with Python…

- [0](https://www.holisticseo.digital/python-seo/topic-modeling/# "Share on Facebook")
- [Share on Twitter](https://www.holisticseo.digital/python-seo/topic-modeling/# "Share on Twitter")
- [0](https://www.holisticseo.digital/python-seo/topic-modeling/# "Share on Linkedin")

[9](https://www.holisticseo.digital/python-seo/topic-modeling/#comments)

✕

- Hi! Send your SEO Question.


![Holistic SEO](https://backend.chatbase.co/storage/v1/object/public/chat-icons/d795dd62-a437-45d9-8f3a-fc3b1f64e476/DioW-mj3dUiK7VlHnV6_F.jpg)