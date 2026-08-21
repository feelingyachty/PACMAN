[Skip to content](https://www.holisticseo.digital/python-seo/information-extraction/#content "Skip to content")

![Knowledge Graph Creation via Python for SEO](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-creation-via-python.jpg)

A knowledge graph is a graph that consists of different types of entities and their connection to each other. Search Engines create a Knowledge Graph while crawling the web so that they can easily detect the relations between entities and understand the purpose of the web page or relevance of the web page for certain topics.

For [**Semantic SEO**](https://www.holisticseo.digital/theoretical-seo/semantic/), Semantic Search, Structured and Semantic Search Engine Entity-based Search Algorithms are important. An entity-based Search Engine can also understand the content, unlike a phrase-based Search Engine. Google is a Hybrid Search Engine that owns multiple features such as Hypertextual, Semantic, Entity-based, Phrase-based Search Engine. Understanding this terminology can help SEOs to understand the natures of Search Engines. Google and Bing give value to a Semantic Web Entity that covers a topic with all of the related entities. To understand Semantic SEO Terms better, you may read our related guidelines.

In the context of Knowledge Graph and Entity-based SEO along with Semantic SEO, creating a Knowledge Graph from entities in a Web Site or a Web Page is useful. This helps one to understand the missing concepts, terms, angles in an article, or a topical cluster. So, the one can create better coverage for a certain topic in a better organized, structured, and semantic hierarchy for Search Engines’ understanding and Users’ benefit.

In this guideline, we will create a knowledge graph with Python from entities in an article while extracting the entities within it, creating a relation tree between each other.

**Contents of the Article**[show](https://www.holisticseo.digital/python-seo/information-extraction/#)

1. [1.Information Extraction from an Article with Python](https://www.holisticseo.digital/python-seo/information-extraction/#Information-Extraction-from-an-Article-with-Python)
2. [2.What is SpacY and How to Use it for SEO?](https://www.holisticseo.digital/python-seo/information-extraction/#What-is-SpacY-and-How-to-Use-it-for-SEO)
3. [3.How to Create a Knowledge Graph and Visualization with Python](https://www.holisticseo.digital/python-seo/information-extraction/#How-to-Create-a-Knowledge-Graph-and-Visualization-with-Python)
1. [3.1.Knowledge Graph Analysis via Python for SEO](https://www.holisticseo.digital/python-seo/information-extraction/#Knowledge-Graph-Analysis-via-Python-for-SEO)
4. [4.Last Thoughts on Knowledge Graph Creation, Visualization with Python, and Holistic SEO](https://www.holisticseo.digital/python-seo/information-extraction/#Last-Thoughts-on-Knowledge-Graph-Creation-Visualization-with-Python-and-Holistic-SEO)

## Information Extraction from an Article with Python

Information Extraction is the extraction of organized information from unstructured, disorganized writing. Information Extraction is the first step of Knowledge Graph Creation from structured data. To perform information extraction, one should take the raw tax and perform an analysis to connect entities in a text with each other in a hierarchy and semantic meaning.

One may find an example of the information extraction below.

“Holistic SEO & Digital has been built by the Koray Tuğberk GÜBÜR who believes in Coding and Marketing Harmony.”

In this example of sentence, we may extract entities with human-eye.

“Holistic SEO & Digital” is an organization.

“Koray Tuğberk GÜBÜR” is a person.

“Coding” is a skill.

“Marketing” is a skill.

“Harmony” is a style.

“Koray Tuğberk Gübür” is founder of the “Holistic SEO & Digital”.

“Koray Tuğberk GÜBÜR” is a “marketer” and “coder”.

“Holistic SEO & Digital” gives services in the marketing and coding areas in a ‘harmony'”.

First, we have extracted entities, then we have created the conclusions and meaning structures from the text. We also can produce questions that we can find answers from this simple raw text. Natural Language Processing is the process of extracting meaning from a raw human-readable text.

In this entity extraction, we have used “subjective” modifiers to give meaning to the entities’ semantic structure. Machines use a different syntax for understanding the language of humans that is called Natural Language Processing.

In this context, we will use SpaCy Python Natural Language Processing Library along with Marius Borcan’s Python Knowledge Graph Algorithm that is built on SpaCy.

Our other guidelines related to the Python and SEO Intersection:

- [How to resize Images with Python?](https://www.holisticseo.digital/python-seo/resize-image/)
- [How to optimize Images with Python?](https://www.holisticseo.digital/python-seo/image-optimization/)
- [How to Crawl a Website with Python?](https://www.holisticseo.digital/python-seo/crawl-analyse-website/)
- [How to Perform a Content Audit with Sitemaps and Python?](https://www.holisticseo.digital/python-seo/content-analysis-with-sitemaps/)

## What is SpacY and How to Use it for SEO?

SpaCy is a Natural Language Processing Library. Thanks to SpaCy, extracting entities, word relations, objectives of a word in a sentence, angle of content is easier. In the future, creating knowledge graphs with Python for content will be a traditional Holistic SEO Behavior. Understanding the content’s context, angle, entity relations are important in the same context.

You may find a simple example of usage for SpaCy.

```
import spacy
nlp = spacy.load("en_core_web_sm")
text = ("Kemal Atatürk was a Turkish field marshal, revolutionary statesman, author, and the founding father of the Republic of Turkey, serving as its first president from 1923 until his death in 1938. He undertook sweeping progressive reforms, which modernized Turkey into a secular, industrial nation. Ideologically a secularist and nationalist, his policies and theories became known as Kemalism. Due to his military and political accomplishments, Atatürk is regarded as one of the most important political leaders of the 20th century.")
doc = nlp(text)
print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
print("Verbs:", [token.lemma_ for token in doc if token.pos_ == "VERB"])
for entity in doc.ents:
    print(entity.text, entity.label_)
```

- Import the necessary Library.
- Loaded the necessary SpaCy Language Pack into a variable.
- Created a text example with three sentences.
- We have read the text with Spacy’s NLP Function and assigned the result into another variable.
- We have printed the “nouns” in the sentences with the List Comprehension Method.
- We have printed all of the verbs in the sentences with the List Comprehension Method.
- We have printed all of the entities in the text with a loop.

You may find the result below.

```
Noun phrases: ['Kemal Atatürk', 'a Turkish field marshal', 'revolutionary statesman', 'author', 'the founding father', 'the Republic', 'Turkey', 'its first president', 'his death', '1938.He undertook sweeping progressive reforms', 'Turkey', 'a secular, industrial nation', 'Ideologically a secularist', 'his policies', 'theories', 'Kemalism', 'his military and political accomplishments', 'Atatürk', 'the most important political leaders', 'the 20th century']
Verbs: ['found', 'serve', 'undertake', 'modernize', 'become', 'know', 'regard']
Kemal Atatürk PERSON
Turkish NORP
the Republic of Turkey GPE
first ORDINAL
1923 DATE
Turkey GPE
Kemalism PERSON
Atatürk PERSON
the 20th century DATE
```

There are teeny tiny some errors here because we didn’t train or NLP Model for this specific topic. For instance, “Kemalism” is not a person, it is actually an ideology. The “NORP” is a shortcut that stands for “Nationalities or Religious and Political Groups”. There are more “Named Entity Recognition” terms in the SpaCy. You may find some of them below.

|     |     |
| --- | --- |
| `PERSON` | Person, People, Fictional, or not a human being with the name. |
| `NORP` | Nations, Religious, and Political Groups. |
| `FAC` | Buildings or concrete architecture existing. |
| `ORG` | Companies, organizations, agencies, legal institutions. |
| `GPE` | Country, city, state, or federation. |
| `LOC` | Geographic locations that are non-GPE. |
| `PRODUCT` | Objects that are vehicles, products, foods, clothes. |
| `EVENT` | Named events in history such as wars, disasters, or celebrations. |
| `WORK_OF_ART` | Books, songs, movies, and other types of artworks. |
| `LAW` | Laws or constitutions. |
| `LANGUAGE` | Languages, dialects, or accents. |
| `DATE` | Relative or absolute dates in different formats. |
| `TIME` | Smaller time units than a day. |
| `PERCENT` | Percentages in every format. |
| `MONEY` | Every type of money units. |
| `QUANTITY` | Quantity measurements in every format. |
| `ORDINAL` | Ranking words such as first, second, third, etc. |
| `CARDINAL` | Numerals that do not fall under another type. |

SpaCy Named Entity Recognition List.

Extracting all of those entities in a Semantic Relation can help SEO for Content Strategy and Content Coverage in a better-organized Query and Search Intent Network.

## How to Create a Knowledge Graph and Visualization with Python

Marius Borcan has created a useful Knowledge Graph Creation methodology with Spacy, Matplotlib, and NetworkX. In this section of Python Knowledge Graph Creation Guideline for SEOs, the source code of the functions is also be used and explained. You also may download the python-knowledge-graph repository from GitHub for use. We will start by importing the necessary libraries.

```
import spacy
from spacy.lang.en import English
import networkx as nx
import matplotlib.pyplot as plt
```

We have imported SpaCy, English Language Kit, Networkx, and Matplotlib’s Pyplot. Now, we will create our 8 different functions with the help of these packages and libraries.

```
def getSentences(text):
    nlp = English()
    nlp.add_pipe(nlp.create_pipe('sentencizer'))
    document = nlp(text)
    return [sent.string.strip() for sent in document.sents]
```

First function is “getSentences()”. It simply creates an “nlp” variable that uses SpaCy in English and “sentencizer” pipeline component. Sentencizer detects the word boundaries to create strings. In the return statement, we have used list comprehension for taking every word from a text document.

```
def printToken(token):
    print(token.text, "->", token.dep_)
```

Second function is the “printToken()”. It simple prints all the tokens in a text for us.

```
def appendChunk(original, chunk):
    return original + ' ' + chunk
```

Third function is the “appendChunk()”, it simply prints the original statement and its role together.

```
def isRelationCandidate(token):
    deps = ["ROOT", "adj", "attr", "agent", "amod"]
    return any(subs in token.dep_ for subs in deps)
```

Fourth function uses the ready to go SpaCy tags to create relations between “tokens”. If a word is adjective to another word, the one can use this function to see the relation between the words.

```
def isConstructionCandidate(token):
    deps = ["compound", "prep", "conj", "mod"]
    return any(subs in token.dep_ for subs in deps)
```

The fifth function is showing the words’ types such as whether they are compound or not.

```
def processSubjectObjectPairs(tokens):
    subject = ''
    object = ''
    relation = ''
    subjectConstruction = ''
    objectConstruction = ''
    for token in tokens:
        printToken(token)
        if "punct" in token.dep_:
            continue
        if isRelationCandidate(token):
            relation = appendChunk(relation, token.lemma_)
        if isConstructionCandidate(token):
            if subjectConstruction:
                subjectConstruction = appendChunk(subjectConstruction, token.text)
            if objectConstruction:
                objectConstruction = appendChunk(objectConstruction, token.text)
        if "subj" in token.dep_:
            subject = appendChunk(subject, token.text)
            subject = appendChunk(subjectConstruction, subject)
            subjectConstruction = ''
        if "obj" in token.dep_:
            object = appendChunk(object, token.text)
            object = appendChunk(objectConstruction, object)
            objectConstruction = ''

    print (subject.strip(), ",", relation.strip(), ",", object.strip())
    return (subject.strip(), relation.strip(), object.strip())
```

This is the most important function. We are extracting all types of “tokens” such as “subject”, “object”, “relation”, “subjectConstruction”, “objectConstruction” and more. According to the if statements’ result, we are appending every token into the these variables. After the classification is being done, we simply return them.

```
def processSentence(sentence):
    tokens = nlp_model(sentence)
    return processSubjectObjectPairs(tokens)
```

Seventh function simply uses the sixth function as a callback to create a NLP Model.

```
def printGraph(triples):
    G = nx.Graph()
    for triple in triples:
        G.add_node(triple[0])
        G.add_node(triple[1])
        G.add_node(triple[2])
        G.add_edge(triple[0], triple[1])
        G.add_edge(triple[1], triple[2])

    pos = nx.spring_layout(G)
    plt.figure()
    nx.draw(G, pos, edge_color='black', width=1, linewidths=1,
            node_size=500, node_color='seagreen', alpha=0.9,
            labels={node: node for node in G.nodes()})
    plt.axis('off')
    plt.show()
```

Eighth and the last function is for creating the graph. Now, at below we can simply create our Knowledge Graph from an example of text. Now, let’s import all of the necessary functions for a real use case.

```
from knowledgegraph import getSentences
from knowledgegraph import printToken
from knowledgegraph import appendChunk
from knowledgegraph import isRelationCandidate
from knowledgegraph import isConstructionCandidate
from knowledgegraph import processSubjectObjectPairs
from knowledgegraph import processSentence
from knowledgegraph import printGraph
```

You also may use “from knowledge graph import function 1, function 2, function 3” for a shorter import code block, but I wanted to show every function in a better hierarchy. Below, you will find our example of text.

```
  text = text = "Ataturk is the founder of Turkish Republic." \
        "Ataturk is one of the Turkish Warfare Geniuses." \
        "Ataturk has given the right to vote for woman." \
        "Ataturk has won Turkish Independence War." \
        "Ataturk performed revolutions in the field of industry and social life." \
        "Ataturk is one of the most inspiring leaders in the 20th Century."
```

Now, we are calling our “knowledge graph” creator function chain.

```
    sentences = getSentences(text)
    nlp_model = spacy.load('en_core_web_sm')

    triples = []
    print(text)
    for sentence in sentences:
        triples.append(processSentence(sentence))

    printGraph(triples)
```

Here is the result:

![Knowledge Graph for SEO](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-1200x552.png)A simple Knowledge Graph from our small raw text.

As you may see that all of our sentences have begun with the person entity, Ataturk. Thus, our knowledge graph’s center is Ataturk. We also can see the features, similar sides to other people, actions, and other types of entity recognition easily. This methodology can help SEOs to create knowledge graphs with a deeper perspective for content strategy, quality analysis, and comparative SERP Analysis. Holistic SEOs can use Python and SEO for understanding machines’ capacity better. Understanding how Search Engines’ Algorithms’ may interpret content and how they can see the entities in a connection can easily be seen with Knowledge Graphs and Information Extraction.

### Knowledge Graph Analysis via Python for SEO

Knowledge Graphs are closely related to Search Engine Optimization. With Python, we can simply generate questions from reading the content. Thus, seeing a Knowledge Graph can easily help us to see which questions can be answered with the specific raw text. In this way, Holistic SEO can see the missing points, entities, relations, and angles in the content.

We can answer these questions below from the example above.

- Who is Ataturk?
- Which Country did Ataturk establish?
- Who gives the right to code to the Turkish Woman?
- Who won the Turkish Independence War?
- Who is one of the most influential leaders of the 20th Century?
- Who performed revolutions in the life of Turkey in the field of industry and social life?

You also read more about “How to generate questions from a content with Python” guideline to learn more.

## Last Thoughts on Knowledge Graph Creation, Visualization with Python, and Holistic SEO

Creating Knowledge Graphs via Information Extraction with Python from a raw text can make Holistic SEOs create more clear and understandable content for the users and also Search Engine Algorithms. Showing the entity relations and related entities with different synonyms and stemming formats with expertise is a must for creating better content. Creating questions and answers for the users along with different types of functions and services are useful. Knowledge Graphs and Information Extraction with Python can help for performing a Content Quality and Coverage Audit.

Simply, comparing the questions that can be answered via Knowledge Graph Visualizations between competitors help a Holistic SEO to create better content with unique information for Information Gain Score.

We will improve our Knowledge Graph Creation Guideline by time while creating more articles related to the NLP.

- [Author](https://www.holisticseo.digital/python-seo/information-extraction/#abh_about)
- [Recent Posts](https://www.holisticseo.digital/python-seo/information-extraction/#abh_posts)

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

## 10 thoughts on “How to Create an Entity Relation Diagram with Information Extraction with Python for SEO?”

1. The code seems to break for me, I am getting this error:



ValueError: \[E966\] \`nlp.add\_pipe\` now takes the string name of the registered component factory, not a callable component. Expected string, but got (name: ‘None’).



– If you created your component with \`nlp.create\_pipe(‘name’)\`: remove nlp.create\_pipe and call \`nlp.add\_pipe(‘name’)\` instead.



– If you passed in a component like \`TextCategorizer()\`: call \`nlp.add\_pipe\` with the string name instead, e.g. \`nlp.add\_pipe(‘textcat’)\`.



– If you’re using a custom component: Add the decorator \`@Language.component\` (for function components) or \`@Language.factory\` (for class components / factories) to your custom component and assign it a name, e.g. \`@Language.component(‘your\_name’)\`. You can then run \`nlp.add\_pipe(‘your\_name’)\` to add it to the pipeline.

[Reply](https://www.holisticseo.digital/python-seo/information-extraction/#comment-28655)

2. from knowledgegraph import getSentences


from knowledgegraph import printToken


from knowledgegraph import appendChunk


from knowledgegraph import isRelationCandidate


from knowledgegraph import isConstructionCandidate


from knowledgegraph import processSubjectObjectPairs


from knowledgegraph import processSentence


from knowledgegraph import printGraph



This gives an error unless I indent it with the 7th function.


I am running the code using Pycharm, but it doesn’t yield the desired output.


The code runs when I indent but it gives a blank response.

[Reply](https://www.holisticseo.digital/python-seo/information-extraction/#comment-30317)

3. When I got to the last function I got this error…ModuleNotFoundError: No module named ‘knowledgegraph’

[Reply](https://www.holisticseo.digital/python-seo/information-extraction/#comment-35001)

4. Hello,


Sorry I cannot see the image of the result, it seems broken

[Reply](https://www.holisticseo.digital/python-seo/information-extraction/#comment-35704)

   - It should be fixed now, Ethan.

     [Reply](https://www.holisticseo.digital/python-seo/information-extraction/#comment-38596)
5. The Corrected code should be:


def getSentences(text):


nlp = English()


nlp.add\_pipe(‘sentencizer’)


document = nlp(text)


return \[sent.text.strip() for sent in document.sents\]

[Reply](https://www.holisticseo.digital/python-seo/information-extraction/#comment-45403)

6. Great article, thank you!

[Reply](https://www.holisticseo.digital/python-seo/information-extraction/#comment-67748)

7. Thank you!

[Reply](https://www.holisticseo.digital/python-seo/information-extraction/#comment-74584)

8. Great article, thank you, Koray.

[Reply](https://www.holisticseo.digital/python-seo/information-extraction/#comment-77641)

   - Thank you for your positive feedback.

     [Reply](https://www.holisticseo.digital/python-seo/information-extraction/#comment-77915)

### Leave a Comment [Cancel reply](https://www.holisticseo.digital/python-seo/information-extraction/\#respond)

Comment

NameEmailWebsite

Save my name, email, and website in this browser for the next time I comment.

Δ

[Scroll back to top](https://www.holisticseo.digital/python-seo/information-extraction/# "Scroll back to top")

[Python SEO](https://www.holisticseo.digital/python-seo/)

## How to Create an Entity Relation Diagram with Information Extraction with Python for SEO?

by Koray Tuğberk GÜBÜRtime to read: 9 min

![](https://www.holisticseo.digital/wp-content/uploads/2020/09/knowledge-graph-entity-seo.jpg)

Python SEO
How to use Google Knowledge Graph API via Python a…

![](https://www.holisticseo.digital/wp-content/uploads/2020/08/how-to-crawl-a-web-site-via-python.jpg)

Python SEO
How to Crawl a Web Site with All Aspects via Pytho…

- [0](https://www.holisticseo.digital/python-seo/information-extraction/# "Share on Facebook")
- [Share on Twitter](https://www.holisticseo.digital/python-seo/information-extraction/# "Share on Twitter")
- [0](https://www.holisticseo.digital/python-seo/information-extraction/# "Share on Linkedin")

[10](https://www.holisticseo.digital/python-seo/information-extraction/#comments)

✕

- Hi! Send your SEO Question.


![Holistic SEO](https://backend.chatbase.co/storage/v1/object/public/chat-icons/d795dd62-a437-45d9-8f3a-fc3b1f64e476/DioW-mj3dUiK7VlHnV6_F.jpg)