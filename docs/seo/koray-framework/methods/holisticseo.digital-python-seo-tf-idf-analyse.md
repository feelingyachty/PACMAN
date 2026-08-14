[Skip to content](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#content "Skip to content")

![How to perform TF-IDF Analysis via Python](https://www.holisticseo.digital/wp-content/uploads/2020/07/tf-idf-analysis-via-python.jpg)

TF-IDF Analysis is one of the oldest methodologies to understand the context. Calculating the weights of a word in a document can help SEOs to understand documents on a SERP for a specific query or a web entity’s content structure and methodology. TF-IDF or Term Frequency and Inverse Document Frequency is useful to extract the related entities and topical phrases. It also skims the “stop words” and by scanning all the documents, extracts the main terms on a document. Performing a quick and efficient TF-IDF Analysis via Python is easy and also useful. We recommend you to not to “focus on numbers” for optimizing content instead of user-friendliness, but you can use these techniques for quick analysis in scale.

In this article, we will use the Scikit-Learn Library of Python and some necessary methods, class, and functions along with the Pandas Library.

**Contents of the Article**[show](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#)

1. [1.How to Perform TF-IDF Analysis for Text Valuation via Python](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#How-to-Perform-TF-IDF-Analysis-for-Text-Valuation-via-Python)
1. [1.1.What is the Term Frequency?](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#What-is-the-Term-Frequency)
2. [1.2.What is Inverse Data Frequency?](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#What-is-Inverse-Data-Frequency)
3. [1.3.How does Inverse Data Frequency and Term Frequency Work Together?](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#How-does-Inverse-Data-Frequency-and-Term-Frequency-Work-Together)
2. [2.TF-IDF Analysis Implementation with Python’s SKLearn Library](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#TF-IDF-Analysis-Implementation-with-Pythons-SKLearn-Library)
3. [3.Last Thoughts on TF-IDF Analysis via Python](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#Last-Thoughts-on-TF-IDF-Analysis-via-Python)

## How to Perform TF-IDF Analysis for Text Valuation via Python

Term Frequency – Inverse Data Frequency methodology tries to understand the text’s purpose and topic according to the words’ frequencies according to each other. Computers can’t understand the texts but they can change the words into numbers so that they can extract the relationships between them. In TF-IDF Analysis the words’ usage amount is actually not important. Because, usually the most used words in a text are “stop words” such as “will”, “and”, or “you”. These words say nothing about the purpose of the text, so we will try to figure the content’s context by these principles.

To learn more about Python SEO, you may read the related guidelines:

1. [How to resize images in bulk with Python](https://www.holisticseo.digital/python-seo/resize-image/)
2. [How to crawl and analyze a Website via Python](https://www.holisticseo.digital/python-seo/crawl-analyse-website/)
3. [How to perform text analysis via Python](https://www.holisticseo.digital/python-seo/perform-text-analysis/)
4. [How to test a robots.txt file via Python](https://www.holisticseo.digital/python-seo/resize-image/)
5. [How to Compare and Analyse Robots.txt File via Python](https://www.holisticseo.digital/python-seo/analyse-compare-robots-txt/)
6. [How to Categorize URL Parameters and Queries via Python?](https://www.holisticseo.digital/python-seo/categorize-url-parameter/)
7. [How to Perform a Content Structure Analysis via Python and Sitemaps](https://www.holisticseo.digital/python-seo/content-analysis-with-sitemaps/)

### What is the Term Frequency?

Term frequency is the frequency of the word in a text. It gives the exact number of the word’s occurrence in a text.

### What is Inverse Data Frequency?

It is the frequency of the least used words in a text.

### How does Inverse Data Frequency and Term Frequency Work Together?

By using these two metrics, we can extract the important words to see the content’s purpose by skimming the stop words.

To learn more, read our [**TF-IDF Analysis Guideline**](https://www.holisticseo.digital/theoretical-seo/tf-idf-analysis/).

## TF-IDF Analysis Implementation with Python’s SKLearn Library

To perform TF-IDF Analysis via Python, we will use SKLearn Library. Scikit-Learn is the most useful and frequently used library in Python for Scientific purposes and Machine Learning. It can show correlations and regressions so that developers can give decision-making ability to machines. SK-Learn Library has also a “feature extraction” component for text documents. Thanks to it, we will turn a raw document into a matrix and we will calculate every word’s weight in a document. After the calculation, we will turn every matrix element into a data frame row.

To start with, I have chosen 6 example sentences from a history book which tells about the creation of “Balkan Pact” in the late 1930s by Mustafa Kemal Atatürk, founder of the Turkish Republic. First, we need to import the sentences we want to use and Python modules.

```
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
```

Below, we are creating our document within a list of sentences for TF-IDF Analysis with python coding language.

```
docs=["Until the early 1930s, Turkey followed a neutral foreign policy with the West by developing joint friendship and neutrality agreements. ",\
"These bilateral agreements aligned with Atatürk's worldview. By the end of 1925, Turkey had signed fifteen joint agreements with Western states.",\
"In the early 1930s, changes and developments in world politics required Turkey to make multilateral agreements to improve its security. Atatürk strongly believed that close cooperation between the Balkan states based on the principle of equality would have an important effect on European politics.",\
"These states had been ruled by the Ottoman Empire for centuries and had proved to be a powerful force. While the origins of the Balkan agreement may date as far back as 1925, the Balkan Pact came into being in the mid-1930s.",\
"Several important developments in Europe helped the original idea materialize, such as improvements in the Turkish-Greek alliance and the rapprochement between Bulgaria and Yugoslavia. The most important factor in driving Turkish foreign policy from the mid-1930s onwards was the fear of Italy."]
```

We have imported CountVectorizer, TFIDFTransformer, and TFIDFVectorizer for calculating the TF-IDF Scores every word in the sentences. And Pandas is for creating the data frame. CountVectorizer is for turning a raw document into a matrix of tokens.

```
doc = CountVectorizer()
word_count=doc.fit_transform(docs)
word_count.shape
print(word_count)
```

The explanation of the code block above can be found within the list below.

- We have created a variable with the “CountVectorizer()” class.
- We have used the “fit\_transform” method on our sentences via our Class Object. The main reason for using “CountVectorizer()” is to use “TFIDFTransformer” method.
- We have called its shape and printed it.

You may see the result below:

![Document Vectorizing](https://www.holisticseo.digital/wp-content/uploads/2020/08/vectorizing.png)We have vectorized our document for TF-IDF Analysis.

We see our Matrix and its shape along with the occurrence count of the words. You may also call it in arrays.

```
print(word_count.toarray())
```

![Document Vectorization](https://www.holisticseo.digital/wp-content/uploads/2020/08/to-array-method.png)Our vectorized document can be seen in Vectorized version.

Yes, it says nothing for a human but it has lots of meanings for a computer. First, we will use TFIDFTransformer for calculating the TF and IDF values separately.

```
tfidf_transformer=TfidfTransformer(smooth_idf=True,use_idf=True)
tfidf_transformer.fit(word_count)
df_idf = pd.DataFrame(tfidf_transformer.idf_, index=doc.get_feature_names(),columns=["idf_weights"])
df_idf.sort_values(by=['idf_weights']).head(40)
```

Below, you can see the explanation of the code block.

- The first line is for creating a variable for assigning the TFIDFTransformer Method with “smooth\_idf” and “use\_idf” attributes. The “smooth\_idf” is necessary for calculating TF-IDF Values from more than one documents so that if a word isn’t being used in a document, it shall be divided by 1 instead of 0. “Use\_idf” is for using the IDF Weightining in our calculation.
- In the second line, we are using “fit” and “transform” methods from SKLearn at the same time.
- At the third line, we are turning our output into a data frame, we are using our “words” in the index with “get\_feature\_names()” and “idf\_weights” in the column.
- In the last line, we are sorting the values according to the “idf\_weights” and pulling the top 40 lines.

![IDF Values of a Document.](https://www.holisticseo.digital/wp-content/uploads/2020/08/python-tf-idf-analysis-1.png)These are only the IDF Values.

These are the IDF Values for our sentences. As you see the non-important words which may not tell the context has lower IDF since they appear in every sentence. Inverse Document Frequency Score is inversely proportional to the usage frequency of the word. Now, we can calculate the TF-IDF Scores based on IDF values.

```
tf_idf_vector=tfidf_transformer.transform(word_count)
feature_names = doc.get_feature_names()
first_document_vector=tf_idf_vector[1]
df = pd.DataFrame(first_document_vector.T.todense(), index=feature_names, columns=["tfidf"])
df.sort_values(by=["tfidf"],ascending=False).head(45)
```

TF-IDF Analysis code block’s analysis is below.

- The first line assigns the “transform(word\_count)” method through our IDF values into the tf\_df\_vector. By multiplication of TF\*IDF, we have calculated TF-IDF Values based on IDF Values.
- In the second line, we are assigning the feature names (words) into another variable.
- We are assigning our first document into a variable for showing the results in a data frame.
- In the fourth line, we are creating a data frame from our “first\_document\_vector” variable by switching the places of columns and rows via the “T()” method and we are turning our variable into a matrix via “todense()”. We have chosen the index names via feature names and the column name will be ‘tfidf’. You may see our TF-IDF values below for the first document.

![TF-IDF Analysis](https://www.holisticseo.digital/wp-content/uploads/2020/08/tf-idf-analysis-1.png)Now, we have TF-IDF Value for our document.

Besides the words from the first sentence have a 0.0 score because we didn’t include them in our data frame with the “first\_document\_vector=tf\_idf\_vector\[1\]” line. If you check the first sentence from our “docs” variable, you may see the more used words have lower TF-IDF scores, the more unique words have more TF-IDF Scores, in this way we are skimming the stop words.

Now, we will perform the same process in a easier way thanks to TFIDFVectorizer.

```
tfidf_vectorizer=TfidfVectorizer(use_idf=True)
tfidf_vectorizer_vectors=tfidf_vectorizer.fit_transform(docs)
first_vector_tfidfvectorizer=tfidf_vectorizer_vectors[1]
df = pd.DataFrame(first_vector_tfidfvectorizer.T.todense(), index=tfidf_vectorizer.get_feature_names(), columns=["tfidf"])
df.sort_values(by=["tfidf"],ascending=False).head(45)
```

We have created a “tfidf\_vectorizer” object via “TfidfVectorizer” class.

We have used fit and transform methods at the same time on our “docs” variable via it. The rest is actually the same as the code block above. You may see the same result below:

![TF-IDF Analysis with Python](https://www.holisticseo.digital/wp-content/uploads/2020/08/tf-idf-analysis-2.png)We have the same result with an easier method.

## Last Thoughts on TF-IDF Analysis via Python

For Text Analysis via Python, there are hundreds of different methods and possibilities. Google doesn’t use TF-IDF Analysis in their algorithm according to their explanations but still comparing and analyzing the content profiles of different HTML Documents via TF-IDF Analysis for certain queries may help an SEO to see the competitors’ focus on a topic. For optimizing content, you shouldn’t care about the numbers in algorithms, you should care about the user-friendliness. For now, our TF-IDF Analysis Article has lots of missing points, we will improve it by time:

Sources:

- https://scikit-learn.org/stable/modules/generated/sklearn.feature\_extraction.text.CountVectorizer.html#sklearn.feature\_extraction.text.CountVectorizer
- https://scikit-learn.org/stable/modules/generated/sklearn.feature\_extraction.text.TfidfTransformer.html#sklearn.feature\_extraction.text.TfidfTransformer.fit\_transform

- [Author](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#abh_about)
- [Recent Posts](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#abh_posts)

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

## 4 thoughts on “How to Perform TF-IDF Analysis via Python?”

1. Hi Koray,


I’ve read an article by Bill Slawski on SEMrush, where he mentioned that TF-IDF analysis is replaced by the Bm-25 algorithm.


I’m just wondering if there is any value you think had in TF-IDF analysis, or if is it just an old-school tactic.

[Reply](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#comment-23858)

   - Hello Ahmad Khan,



     TF-IDF and BM-25 are both distributional semantics-related methodologies to understand the heaviest context words inside a document. The only difference is that BM-25 focuses on document length and word saturation inside the document, while the TF-IDF focuses on term frequency, and gives more weight to the less occurring terms. Also, TF-IDF gives an advantage to longer documents since they have more space to include specific terms.

     [Reply](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#comment-32437)
2. Helal kardeşime. Yazıda Mustafa Kemal Atatürk’ü görünce ilk işim yazara bakmak oldu. Başarılarının devamını dilerim kardeşim.

[Reply](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#comment-28656)

   - TR: Teşekkür ederim.


     EN: Thank you.

     [Reply](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#comment-28814)

### Leave a Comment [Cancel reply](https://www.holisticseo.digital/python-seo/tf-idf-analyse/\#respond)

Comment

NameEmailWebsite

Save my name, email, and website in this browser for the next time I comment.

Δ

[Scroll back to top](https://www.holisticseo.digital/python-seo/tf-idf-analyse/# "Scroll back to top")

[Python SEO](https://www.holisticseo.digital/python-seo/)

## How to Perform TF-IDF Analysis via Python?

by Koray Tuğberk GÜBÜRtime to read: 7 min

![](https://www.holisticseo.digital/wp-content/uploads/2020/07/perform-text-analysis-via-python.jpg)

Python SEO
How to Perform Text Analysis via Python and Advert…

![](https://www.holisticseo.digital/wp-content/uploads/2020/07/categorize-queries-for-seo-analysis-via-python.jpg)

Python SEO
How to Categorize Queries for SEO Analysis via Pyt…

- [0](https://www.holisticseo.digital/python-seo/tf-idf-analyse/# "Share on Facebook")
- [Share on Twitter](https://www.holisticseo.digital/python-seo/tf-idf-analyse/# "Share on Twitter")
- [0](https://www.holisticseo.digital/python-seo/tf-idf-analyse/# "Share on Linkedin")

[4](https://www.holisticseo.digital/python-seo/tf-idf-analyse/#comments)