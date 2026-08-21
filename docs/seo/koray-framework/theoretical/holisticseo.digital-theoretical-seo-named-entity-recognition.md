[Skip to content](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#content "Skip to content")

![Named Entity Recognitiont](https://www.holisticseo.digital/wp-content/uploads/2021/07/named-entity-recognition.jpeg)

_**Named Entity Recognition (NER)**_ is a procedure with which clearly identifiable elements (e.g. names of people or places) can be automatically marked in a text. Named Entity Recognition was developed as part of the computer linguistic method of Natural Language Processing (NLP), which is about _processing_ natural language laws in a machine-readable manner.

**Contents of the Article**[show](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#)

01. [1.What is the Working Principle of Named Entity Recognition?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-is-the-Working-Principle-of-Named-Entity-Recognition)
02. [2.Where is Named Entity Reconigiton Used?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#Where-is-Named-Entity-Reconigiton-Used)
    1. [2.1.What are the Application Examples for Named Entity Recognition?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-are-the-Application-Examples-for-Named-Entity-Recognition)
       1. [2.1.1.1\. Named Entity Recognition Example for Automative Industry](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#1-Named-Entity-Recognition-Example-for-Automative-Industry)
       2. [2.1.2.2\. Named Entity Recognition Example for Customer Relationship Management](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#2-Named-Entity-Recognition-Example-for-Customer-Relationship-Management)
03. [3.What are the Technical Basics of Named Entity Recognition?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-are-the-Technical-Basics-of-Named-Entity-Recognition)
04. [4.What are the Labeling Standards for Named Entity Recognition?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-are-the-Labeling-Standards-for-Named-Entity-Recognition)
05. [5.Which Python Libraries Can be Used for Named Entity Recognition in Python?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#Which-Python-Libraries-Can-be-Used-for-Named-Entity-Recognition-in-Python)
06. [6.What is the Difference Between Named Entity Recognition and Entity Extraction?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-is-the-Difference-Between-Named-Entity-Recognition-and-Entity-Extraction)
07. [7.What is the Relation Between Named Entity Recognition and Named Entity Resolution?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-is-the-Relation-Between-Named-Entity-Recognition-and-Named-Entity-Resolution)
08. [8.What is the Relation Between Named Entity Recognition and Lexical Semantics?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-is-the-Relation-Between-Named-Entity-Recognition-and-Lexical-Semantics)
09. [9.What is the Relation Between Named Entity Recognition and Semantic Role Labeling?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-is-the-Relation-Between-Named-Entity-Recognition-and-Semantic-Role-Labeling)
10. [10.What is the Relation Between Named Entity Recognition and Semantic Annotations?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-is-the-Relation-Between-Named-Entity-Recognition-and-Semantic-Annotations)
11. [11.What is the Relation Between Named Entity Recognition and Relation Detection?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-is-the-Relation-Between-Named-Entity-Recognition-and-Relation-Detection)
12. [12.What is the Relation Between Taxonomy and Named Entity Recognition?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-is-the-Relation-Between-Taxonomy-and-Named-Entity-Recognition)
13. [13.What is the Relation Between Ontology and Named Entity Recognition?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-is-the-Relation-Between-Ontology-and-Named-Entity-Recognition)
14. [14.What is the Relation Between Onomastics and Named Entity Recognition?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-is-the-Relation-Between-Onomastics-and-Named-Entity-Recognition)
15. [15.What is the Importance of Named Entity Recognition for Semantic SEO?](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#What-is-the-Importance-of-Named-Entity-Recognition-for-Semantic-SEO)
16. [16.Last Thoughts on Named Entity Recognition and Holistic SEO](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#Last-Thoughts-on-Named-Entity-Recognition-and-Holistic-SEO)

## What is the Working Principle of Named Entity Recognition?

The working principle of the named entity recognition is to define the entity name and type within the document to solve the relevance of these entities in the context of the document. As an example of the working principle of the named entity recognition, the following text is labeled by a named entity recognition system used during the MUC evaluation campaign.

“Henri bought 300 shares of the company AMD in 2006” sentence is processed by Named Entity Recognition working principle as below.

```
<ENAMEX TYPE = "PERSON"> Henri </ENAMEX> bought <NUMEX TYPE = "QUANTITY"> 300 </NUMEX> shares of the company <ENAMEX TYPE = "ORGANIZATION"> AMD </ENAMEX> in <TIMEX TYPE = "DATE"> 2006 </TIMEX> .
```

The text in this example is tagged with XML tags, following the ENAMEX tagging standard. Most labeling systems use formal grammars associated with statistical models, possibly supplemented by databases (lists of first names, names of cities, or countries for example). In large evaluation campaigns, systems based on handwritten grammars obtain the best results. The drawback is that such systems sometimes require drafting months working.

Current statistical systems, on the other hand, use a large amount of pre-annotated data to learn the possible shapes of named entities. It is no longer necessary here to write many rules by hand but to label a corpus which will serve as a learning tool. These systems are therefore also very costly in human time. To solve this problem, recently, initiatives such as DBpedia or Yago seek to provide semantic corpora that can help design labeling tools. In the same vein, some semantic ontologies such as NLGbAse are largely oriented towards labeling. Since 1998, the annotation of named entities in texts has been of growing interest. Many applications make use of it, for information retrieval or more generally for understanding textual documents. In France, research programs have been dedicated to this, such as ESTER and more recently ETAPE. The extension of named entities to various linguistic expressions (excluding proper names) makes them an active field of research.

![Named Entity Recognition and Browsable Fact Repisotory](https://www.holisticseo.digital/wp-content/uploads/2021/07/named-entity-knowledge-base.png)Andrew Hogue’s example for creating a browsable fact repository.

## Where is Named Entity Reconigiton Used?

Named entity recognition is used wherever large amounts of content are processed. News media and publishers, for example, generate large amounts of online content every day. To optimize the user experience on the one hand and monetize content on the other, it is essential to structure the information from these articles.

An entity extraction algorithm can automatically scan entire articles and define which important people, organizations, products, places, or general keywords appear in them. Once this information has been extracted, it helps with the automatic categorization of the articles in defined hierarchies. On the basis of this information, search results can be compiled more precisely, content can be curated into thematic clusters, content-related posts can be displayed to the user or targeted advertising can be played out. In addition to being used on news portals, the recommendation features of media services are also based on named entity recognition. Another field of application apart from the media industry would be the Google service Google AdSense or the sorting of support inquiries by e-mail or chat using entity extraction.

![Named Entity Recognition Example](https://www.holisticseo.digital/wp-content/uploads/2021/07/named-entity-recognition-example-1200x595.png)A named entity recognition example.

### What are the Application Examples for Named Entity Recognition?

For example, if you want to investigate how often female characters appear in northern German crime novels of the 20th century, you can start your investigation with Named Entity Recognition. In a text collection of 100 crime novels, all characters are automatically marked with a _NER_ tool and then manually differentiated into female and male characters. It becomes apparent that female figures in your entire text corpus only make up 15% of all figures cited.

With this finding, you go further and divide your corpus into time units. You will now notice that at the beginning of the 20th century, female characters only accounted for 5% of the names given in North German crime novels, compared to 40% at the end of the 20th century. You now split your corpus according to authors and find that authors mention female characters much more often than female authors. Finally, you also investigate whether the named characters are investigators, suspects, victims, hackers, etc.

![Named Entity Recognition](https://www.holisticseo.digital/wp-content/uploads/2021/07/named-entity-recognition-search-engine.png)Andrew Hogue’s presentation for Semantic Search Engine, and Named Entity Recognition, Information Extraction example.

#### 1\. Named Entity Recognition Example for Automative Industry

Surveys, reviews, and test reports can recognize type designations learned by means of Named Entity Recognition, such as “Z-Class” or “17er CNX” and share the existing data accordingly. More complex Named Entity Recognition Systems, such as those used by Deep Data Analytics, enables a more detailed segmentation of the types of texts into different attributes, e.g. texts that deal with the steering wheel or other control elements.

“The steering wheel \[product element\] of the new Z class \[product\] is easy to grip, although I find the control elements \[product elements\] of the new 17 series \[product\] to be more ergonomic. My wife \[person\] prefers the entertainment system \[product element\] in the Z-class \[product\].”

#### 2\. Named Entity Recognition Example for Customer Relationship Management

A large number of support inquiries often flow into an organization. Chat, email, Twitter, and messenger services are being used with increasing enthusiasm by users. In large companies, in particular, the individual channels are looked after by different teams, making it difficult to identify a trend in customer inquiries. Named Entity Recognition can classify the entirety of incoming customer communication and make important aspects visible. Does a specific product (attribute) trigger inquiries or complaints or are there geographical anomalies? NER makes it possible to analyze the incoming inquiries across channels and to classify them according to different aspects.

“The ticket machine \[product\] at Marienplatz \[location\] is regularly defective and I have to discuss with the inspector \[person\] why I don’t have a ticket \[product\].”

In this way, large unstructured amounts of data can be structured and enriched with meta information. The texts classified by means of NER are then segmented and ready for further analysis. Deep Data Analytics uses industry-specific word embeddings, which we have trained domain-specifically, in a bidirectional LSTM network in order to better model relationships in the data.

## What are the Technical Basics of Named Entity Recognition?

The first step in _Named Entity Recognition_ is to teach the computer how to recognize the words that are to be identified as a _named entity_. For this purpose, a number of features are defined, which are statistically evaluated by the tool (technical: specification of the _features_ ) and thus should enable the most precise detection possible. For example, word lists can be taken into account that includes all character names, locations, and organizations that might appear. In addition, parts of speech can be included not only for the named entity itself but also for the preceding and following words. Further _features_ can be:

- frequently previously mentioned words (as well as the word “in” for places)
- Presentation format (for dates something like number month year)
- Upper and lower case
- Position in the sentence

With the help of these features predefined in the tool, a process known as machine learning can be carried out. The learning process of the NER tool (also called “training”) consists of comparing these features with a manually annotated text; the so-called training corpus. The result of this comparison is the NER model. The number of features that a tool takes into account can vary. Only the combination of different features leads to good results with the automatic detection since named entities can have different meanings in different contexts. For example, “Paris” preceded by “in” would probably be a reference to the city, and followed by a verb would probably be a person. Exceptions can also be included by comparing them with the manually annotated text. If, in the training corpus, for example, in sentences like “Paris has beautiful museums”, Paris was marked as a place, although there is a verb behind it, the tool can recognize that the word “has” directly after a named entity can indicate that it acts a place. Ultimately, the tool uses the _feature_ combinations and the training data to calculate which meaning is more likely in which context.

_NER_ can for example be carried out with the help of the Stanford Named Entity Recognizer or the virtual work environment WebLicht via a graphical user interface, which can also be operated with little technical knowledge. These tools use _NER_ models that were mostly trained using corpora of factual texts. In order to retrain the tool with sample data from another domain, such as literature, or to add the predefined features, it is necessary to use the command line to enter a series of commands on the computer in the programming language of the respective tool. The required commands can often be found in the documentation of the tools, are explained there, and can be inserted using copy/paste. Profound knowledge of one or more programming language (s) is not necessary for this either. However, it is definitely helpful to at least be able to read and understand the language of the code.

An example from Google for checking the factual accuracy from content based on knowledge graph and named entity recognition.

## What are the Labeling Standards for Named Entity Recognition?

Strictly speaking, there are no labeling standards. The labels are largely oriented according to the application need: we will generally find the root label classes of _Person_, _Organization_, Product, Places, to which are added the duration and quantity labels ( _time_ and _amount_). A second hierarchical level is then added to these root entities: _Organization._ Commercial and Organization. Non-profit for example, allow refining the description of the entities. In recent campaigns (Ester 2 and Automatic Content Extraction (ACE) there are 5-6 root classes, and a total of 40-50 classes with labeling subsections. Some question-answer engine systems (which use named entities) can use several hundred classes.

![Named Entity Recognition for Templatic Content](https://www.holisticseo.digital/wp-content/uploads/2021/07/named-entity-recognition-1.png)Google or any other search engine, and machine that can use NLP and Information Extraction can use templates documents for named entity recognition, or structure the text.

## Which Python Libraries Can be Used for Named Entity Recognition in Python?

The Python Libraries that can be used for Named Entity Recognition are below.

- Natural Language Toolkit (NLTK)
- Gensim
- polyglot
- TextBlob
- CoreNLP
- spaCy
- Pattern
- Vocabulary
- PyNLPl
- Quepy

Besides Python Libraries for Named Entity Recognition, there are companies that focus on NLP for SEO that performs Named Entity Recognition such as WordLift. To perform Named Entity Recognition with Python, read the related guide.

## What is the Difference Between Named Entity Recognition and Entity Extraction?

Named Entity Recognition is the process of recognizing the entity via its name and other related entities, while named entity extraction is the process of extracting more information related to the attributes of the recognized entities. Named Entity Recognition and Named Entity Extraction are complementary processes for each other to understand the context of the document and entities’ relationship for each other. An example of Named Entity Recognition and Named Entity Extraction for clarifying the difference between them is given below.

In the sentence “United States of America has 52 states, and the U.S is the abbreviation of the United States of America”, the Named Entity Recognition and Named Entity Extraction do the things below separately.

- Named Entity Recognition (NER) realizes the names of entities within the sentence such as “The United States of America”, “U.S”.
- Named Entity Extraction (NEE) realizes the attributes of the Entities, such as “U.S” is the abbreviation of the “United States of America”, and “52 states exist in the U.S”.

Named Entity Recognition and Named Entity Extraction help for Natural Language Processing together by recognizing entities, and extracting their features. Feature extraction, and analyzing the attributes for entities is also helpful for Search Engines to understand the content, and entities within the content while auditing the content’s accuracy. In this context, Named Entity Extraction and Named Entity Recognition are related to the Named Entity Resolution.

An example of Named Entity Recognition, and Abstractive Text Summarization from Google.

## What is the Relation Between Named Entity Recognition and Named Entity Resolution?

Named Entity Resolution is the process of auditing whether the recognized named entity is the entity itself or not. Named Entity Resolution is a necessary process to increase the Natural Language Processing’s accuracy by decreasing the ambiguity of the entities within the content. Named Entity Resolution and Named Entity Extraction are complementary processes, since Named Entity Extraction extracts features, and attributes of these entities, the Named Entity Resolution process can understand the entity’s identity and accuracy in a better way.

![Named Entity Resolution](https://www.holisticseo.digital/wp-content/uploads/2021/07/named-entity-resolution.png)An example of named entity resolution.

Named Entity Resolution can help a Semantic Search Engine or any other system that understands the human language to increase the confidence for understanding the context and topic of the document. An example of a named entity resolution process in the context of named entity recognition is below.

In the sentence “Barry Schwartz entered the classroom, and asked questions to students about human nature and thinking skills”, Named Entity Resolution tries to understand the identity of the “Barry Schwartz”. The words “classroom”, “questions”, “students” are connected to each other with Onasmatics, Semantic Role Labeling, and Semantic Annotations. Thus, Barry Schwartz should be a teacher or an academic. In this context, a Search Engine, or a machine that audits the human language can extract the named entity’s feature, and use these features for entity disambiguation.

In the context of Lexical Semantics, teacher and academic are not different things, but actually, the teacher is the hypernym of the academic. A teacher might not be an academic, but every academic is also a teacher. For Named Entity Recognition, Named Entity Resolution, and Named Entity Extraction, Semantic Annotations, Lexical Semantics, and Onosmatics are used.

![Entity Query Template](https://www.holisticseo.digital/wp-content/uploads/2021/07/named-entity-recognition-google.png)A query template example from Google, and Andrew Houge. An entity within a query can have certain types of attributes.

## What is the Relation Between Named Entity Recognition and Lexical Semantics?

Lexical semantics deals with the meaning of words. A lexical semantics study focuses on either the internal semantic structure of words or the relations between words. Since, the relation between words changes according to their position and combinations, the Named Entity Extraction and Named Entity Resolution processes will give different results. Named Entity Recognition uses the Lexical Semantics to recognize the entities. Synonyms, Antonyms, Hypernyms, Polysemys are different types of lexical semantics, and every word connects its meaning to another one while creating another meaning. These meanings create Semantic Network or Semantic Net. Every Semantic Net helps NLP Technologies to understand the Entities’ type, attributes, and similarities.

In the sentence “Boy has arrived home, Jen called him to the dinner”, the word “boy” includes some meanings naturally within it, such as “male” and “young”. According to the other sentences and words, the meanings “bachelor”, “teenage”, “student” features can be extracted for this specific “boy”. All these processes affect the entity type, entity name, and entity description for the Named Entity Recognition process.

![Lexical Semantics and Named Entity Recognition](https://www.holisticseo.digital/wp-content/uploads/2021/07/lexical-semantics-named-entity-recognition.jpg)A visual explanation for lexical semantics.

To learn more about Lexical Semantics, you can read the related guideline in the context of Named Entity Recognition.

## What is the Relation Between Named Entity Recognition and Semantic Role Labeling?

Semantic role labeling is to assign labels that indicate a role of a word or phrase in a sentence, such as agent, goal, or result. Semantic Role Labeling is important to understand the role of the word, not just for understanding the meaning of the specific word. In the context of Named Entity Recognition, Semantic Role Labeling can help for Named Entity Resolution, and Named Entity Extraction. According to the predicate of the sentence, every word will have a different role, and these roles are used to understand the entity’s type, name, description, or attributes. An example for Semantic Role Labeling for Named Entity Recognition is below.

![semantic role labeling example 1](https://www.holisticseo.digital/wp-content/uploads/2021/07/semantic-role-labeling-example-1.png)A brief visual example for semantic role labeling.

“Bush has signed the operations for the Iraq” sentence has two named entities, one is “Iraq”, the other one is “Bush”. A Search Engine that has millions of different documents to rank for certain types of queries can understand the features of “operations for Iraq” easily thanks to the word “Bush” here. According to the Semantic Role Labeling, “Agent” is the “Bush”, “operations” is the “result”, and “Iraq” is the “theme”. In the context of Semantic Role Labeling and Named Entity Recognition, the “Bush” Agent here represents the “George W. Bush”, and “President of the United States” is its attribute. “43rd” is the sub-attribute of the attribute “President of the United States” for “George W. Bush”. The “operations” are “military operations”, and the date of the “signature” is “2003”. From an Entity Knowledge Graph, the named entities and their attributes, descriptions, and types can help a machine to understand the entities from the documents with the help of Semantic Role Labeling.

If the previous and latter sentences have related words and these words have similar roles for the same-named entities, the confidence score for the Named Entity Recognition process will be higher, and the named entity resolution process will be easier for the Natural Language Processing.

![Named Entity Role Labeling](https://www.holisticseo.digital/wp-content/uploads/2021/07/semantic-role-labeling-2.png)Semantic Role Labeling, and Relation Detection with Semantic Annotations example for Named Entity Recognition.

To learn more about Semantic Role Labeling, you can read the related guideline.

## What is the Relation Between Named Entity Recognition and Semantic Annotations?

Semantic Annotations are the process of assigning labels to the documents according to the context, topic, and central entity of the document. Every document has a main topic, and purpose in the context of semantic annotations. Document labels help to identify the contextual and knowledge domain of the entities, and interlinks, connections, and metadata of these documents help for named entity recognition. If a document is labeled for “Life of Emperor Augustus” with Semantic Annotations, the entities, entity types, features, attributes, and entity connections can be extracted faster, and more accurately via this information. Thus, Semantic Annotations are related to the relation between entities, and their connections to each other in the form of different documents.

Semantic Annotations is related to Search Engine Optimization in the context of Semantic SEO. Internal or external links from web page documents are semantic annotations that indicate the label for each document with a certain type of relevance. Every hypertext indicates a context, relevance with the annotation text, or anchor text. Text around the link can define a link’s purpose, and linked documents can define each other’s context, topic, central entity, and relevance to each other.

To create a Topical Authority for a source (domain), the source should cover most of the topic with proper document network with related entities, and information for these entities. Semantic Annotations can help to link different sub-topics, entities, and their contexts to each other to emphasize the topical coverage and authority of a source. A Search Engine or a machine that uses NLP can understand the Named Entities better thanks to these semantic annotations, and semantic labels for documents.

A Semantic Annotation example is given below.

For the sentence “Holy-Roman Empire’s capital was Vien, and more than 500 different states were included in HRE”, the Vien has the attribute of being capital of Holy-Roman Empire, and it should be told within the document just for the Vien, and an internal link and semantic annotation label for this context should be used for describing the relationship between these two entities. Semantic Annotations are also related to the Knowledge Graphs since every knowledge graph includes metadata for the Named Entities, a Search Engine, or any NLP machine that can see the connections and semantic annotations between entities.

![Named Entity Recognition and Semantic Annotation](https://www.holisticseo.digital/wp-content/uploads/2021/07/semantic-annotations-1.png)An example of semantic annotations for named entity recognition.

To understand the Semantic Annotations in the context of Named Entity Recognition, you can read the related guideline.

## What is the Relation Between Named Entity Recognition and Relation Detection?

Relation Detection is the process of labeling the relation between two named entities. Relation detection is useful for Named Entity Recognition because the relation labels between different named entities can help to understand the context of the document, and also recognize other entities within the document, or corpora. Relation Detection is heavily dependent on the “Entity Type” and “Semantic Dependency Tree” for different entities. In the field of Natural Language Processing and Named Entity Recognition, there are more than twenty different Relation Label such as “located-in”, “being-part-of”, “included-in”.

Semantic Annotations and Relation Detection are two closely related terms for each other for Named Entity Recognition. The differences between relation detection and semantic annotations for the named entity recognition are listed below.

- Scale Difference: Semantic Annotations are for different documents while relation detection is for the same document.
- Functional Difference: Semantic Annotations are for detecting relevant entities, while Relation Detection is for understanding the type of the relationship between entities.
- NER Phases: In the context of Named Entity Recognition, Semantic Annotations and Relation Detection are two different phases of the NER. Without finding the relevant entities, the relation type can’t be understood. Thus Relation Detection and Semantic Annotations are complementary for each other in the context of NER.

In terms of Named Entity Recognition, Relation Detection is beneficial to understand the ontologic and taxonomic differences and similarities between different entities.

![Named Entity Recognition and Relation Detection](https://www.holisticseo.digital/wp-content/uploads/2021/07/named-entity-recognition-relation-detection.png)Relation Detection for Named Entity Recognition.

## What is the Relation Between Taxonomy and Named Entity Recognition?

Taxonomy is the science and practice of categorizing or classifying things based on discrete sets. It is derived from the Greek words taxis (meaning ‘order’, ‘arrangement’) and nomos (meaning ‘law’ or ‘science’). The taxonomy (or taxonomical classification) is a system of classification, especially a hierarchical classification in which entities are classified according to their properties. In the field of Named Entity Recognition, taxonomic classification for entities help for recognizing the entities. Thus, every entity has a place within a taxonomy for its own entity type. For instance, “continent”, “region”, “country”, “city”, “district”, “street” is a taxonomy instance for the certain types of entities that are from these types. A Search Engine can recognize the entities, their types from a document, and the context of the document can be determined according to their taxonomy. A Search Engine can compare different documents’ relevance, and context via a taxonomy of entities from these documents. Below, there are some usage examples of taxonomy for Named Entity Recognition (NER).

- Entity-type Association: Different entities from the same type and different entities from the superior type from the same hierarchy can signal the context of the document.
- Entity Prominance: According to the taxonomy of the entities for a topic, a search engine can understand the central entity for a document better.
- Entity Relevance for Queries: Entities from the queries, and possible, related search activities can be understood via the taxonomy of entities.
- Document Context: According to the Entities from the document, and their hierarchy between us, a search engine can see the web page’s purpose.

If there are 5 entities from the same type with different hierarchical values, a search engine can recognize the related entities from the document better, and if the document has been clustered with similar documents, recognizing the related entities from other documents for the same context will be more efficient for the search engine. A Natural Language Processing Engineer, and Program can use a taxonomy of entities to recognize the related entities, and document context from these entities by checking their hierarchical relation. In this context, Relation Types, and Relation Detection are also connected to the Taxonomy of Entities. Below, you will see the other usage examples of taxonomy.

Taxonomy (arrangement of things) is used for different industries and topics such as Natural Sciences or Business, Economics. In Natural Sciences, there are different types of taxonomies such as “Alpha Taxonomy”, “Evolutionary Taxonomy” or “Folk Taxonomy”. In the field of Business and Economics, taxonomy types are “Corporate Taxonomy”, “Economic Taxonomy”, “Records Management Taxonomy”. According to the main context, taxonomy’s context, pattern, and logic might be different. Other types of taxonomy usage areas are Computing, Education, Academia, Safety, Military.

Entities are connected to each other. Named entities can be attributes of each other for different contexts. Above, there is an example of named entity recognition, and information extraction based on entity taxonomy, and hierarchy.

To learn more about Taxonomy for Semantic SEO, you can check the related guideline.

## What is the Relation Between Ontology and Named Entity Recognition?

Ontology means the essence of things. It derives from the Greek Worlds “onto” and “logos”. The ontology includes the questions for entities to understand their connection between them. Ontology is related to the Named Entity Recognition, because according to the mutual points, features, and attributes between different entities, recognizing process for entities will be more efficient. Different entities have different mutual attributes according to their types, relevance, and definitions. For instance, if there are 5 different entities within a document, they should have a mutual point to create a context for the Natural Language Processing principles. In this context, the mutual point between the entities will help to recognize more entities for the same and similar documents, while signaling the context of the document.

Named Entity Recognition and Ontology between Entities are complementary terms for natural language processing. A mutual attribute between two different entities can signal an ontology reference between them. Ontology reference is the ontology content between two entities. In this context, you will see two different ontology of entities example for named entity recognition and search engines’ usage, below

- Country Ontology Example: If Portugal, France, Spain, Germany, Italy are entities from the same type which is country, all these countries have mutual attributes such as “capital city”, “currency”, “population”, “cities”, “founder”, “assembly”, “laws”, “courts”, “army”, “economy”, “language”, “history”, “architecture” and more. All these mutual attributes between the entities with the type country from a document can signal the ontology between these entities in the context of the named entity recognition. If in the document, there are more references for the “architecture” than “courts”, it means that the context is actually the architecture of these countries or their culture for architecture. In this context, the entities for the architecture for these countries will be recognized easier while their salience and relevance will be higher for the context of the document.
- Person Ontology Example: If Donal Trump, Joe Biden, Barrack Obama, Hilary Clinton are the entities from the same type which is person, all these persons have mutual attributes such as “height”, “weight”, “age”, “birthplace”, “birth date”, “education”, “nationality”, “politic title”, “spouse”, “book” and more. For these entities with type person, all these mutual attributes are ontology between them for a better and more confident named entity recognition process. In this example, all of the entities were competitors to each other at least once. For instance, Barrack Obama and Hilary Clinton were competitors for Democrat Part’s candidate election. Hilary Clinton and Donald Trump were competitors to each other for the presidential election in 2016. And, Joe Biden and Donald Trump were competitors again for the 2020 presidential election. Also, Barrack Obama and Joe Biden competed for a while during their political career. Also, Barrack Obama and Joe Biden had a mutual administration. And, Hilary Clinton supported Joe Biden against Donald Trump. All of these mutual relations between these entities are the ontology references between them in the context of “being a competitor”, and “being a supporter”. Also, Barrack Obama, Joe Biden, and Donald Trump have other ontology references between them as “being a successor” and “being a “predecessor”. The ontology references between these entities can be found only via their mutual attributes which is “American Politician”, and “United States President” or “The United States President Candidate”. After the mutual attributes, the ontology will be used for understanding their relationship between them, to recognize the entities, and understand the context and topic of the document better.

![Named Entity Recognition and Ontology](https://www.holisticseo.digital/wp-content/uploads/2021/07/ontology-named-entity-recognition.jpg)An example of an ontology graph for named entity recognition.

Ontology is also related to the Relation Detection, Semantic Role Labeling, and Lexical Semantics besides Named Entity Recognition. To learn more about Ontology in the context of Semantic SEO, read the related Ontology Guideline.

## What is the Relation Between Onomastics and Named Entity Recognition?

Onomastics (onomatology) is the discipline of naming things according to certain types of relations, or types of things. Onomastics are related to the Named Entity Recognition, because different types of names, and naming patterns help a Natural Language Processing machine to understand the entity type, name, and attributes. Onomastics and Lexical Semantics are also connected to each other in the context of Named Entity Recognition. Different word types, or lexical meanings of words and also names can signal different entities or different contexts for these entities. Hypernyms, Hyponyms, Holonyms, Meronyms, Antonyms, Hydronyms, Polinoym, and Synonyms are some of the different and useful types of Onomastics for Named Entity Recognition. Below, there is an example for Onomastics in the context of Named Entity Recognition.

- City Names: If an undiscovered entity with type city from the web is in a document, a search engine or NLP-based machine can discover it via Onomastics patterns. If the city name ends with “police”, or “burg”, it can signal that it is actually a Greek or German City name. In this context, a Search Engine and NLP Machine can recognize a new entity from the web with the surrounding facts for these entities from the documents. In Onomasics, city names and city naming patterns are called “polionym”. In the context of NER and Onomastics, “polionym” is helpful for recognizing entities with the type city.
- Color Names: If there is a new or lesser-known color name within a document, a Search Engine can understand that it is actually a color thanks to the onomastics. For instance, most of the color names in Latin ends with “us, is” or “lin” suffixes. If the color names are “Aureolin” (Yellow Pigment), “Vermilion” (Red Pigment), or “Caeruleus” (Blue), and if the context of the document is not a history of states or politics, Search Engine can audit the co-occurrence of different phrases on the document for the paints, or drawing and recognize these phrases as colors with the help of previously clustered documents and queries that include these phrases. In Onomastics, color names and color naming patterns are called “chromonym”. In the context of NER and Onomastics, “chromonym” is helpful for recognizing entities with the type color.
- Historical Family Names: If there is a new or lesser-known last name from Roman History, an NLP Machine, or Search Engine can recognize these last names as the family name of Romans thanks to the Onomastics’ sub-discipline “gentilice”. “Gentilice” is the name patterns of Roman Clans and Families. Thus, the complex historical facts, prepositions of the web sources can be audited by a search engine to see the web source’s quality and reliability via the recognized family name entities, and facts about them. Roman family names usually end with “a”, or “us” suffixes. And, there are usually two different family names in ancient Rome, one is for the branch of the family, the other one is for the root of the family. According to the historical documents on the web, a Search Engine can recognize the Roman Last Names within a text, and these last names can help a Search Engine recognizing the entities and disambiguate the entity from others. Since most of the Romans have similar names, entity disambiguation is one of the important parts of understanding these documents. In this context, “gentilice” is an important term for Onosmatics and Named Entity Recognition.

Three different Onosmatics and Named Entity Recognition examples are given above. Using these concepts, and their benefits for content production and authorship can help to write more clear content for the Search Engines. To understand the Onosmatics better, read the related guideline.

![Named Entity Recognition and Onomastics](https://www.holisticseo.digital/wp-content/uploads/2021/07/onomastics-named-entity-recognition.png)Onomastics can recognize entities based on their names, and help a machine to understand content with the stored name patterns.

## What is the Importance of Named Entity Recognition for Semantic SEO?

Semantic SEO is the SEO Process for a structured search engine. Semantic Search Engines and Structured Search Engines are the same things. Named Entity Recognition is the first phase of understanding the content of the website and the query of the user for a semantic Search Engine. The Named Entity Recognition process can help a semantic search engine to understand the content, content’s purpose, context, and accuracy. Entity-seeking queries can be understood via Named Entity Recognition too. Named Entity Recognition and Semantic SEO are connected to each other via entities, their attributes, and meanings. Semantic SEO is different than traditional SEO because it includes meanings, and concepts for increasing the relevance, quality, and reliability of the content to satisfy the search intent or need behind the query.

In the context of Semantic SEO and Named Entity Recognition, the articles below can be read.

- [Semantic SEO](https://www.holisticseo.digital/theoretical-seo/semantic/)
- [Semantic Search](https://www.holisticseo.digital/theoretical-seo/semantic-search/)

## Last Thoughts on Named Entity Recognition and Holistic SEO

Named Entity Recognition is the process of recognizing the related entities while auditing their co-occurrence and attributes for the context of the document. Holistic SEO is the process of uniting different types of approaches and verticals for the search for the benefit of SEO. Named Entity Recognition, and Entity-oriented search and search engine optimization can be used together for satisfying the relevance threshold, and user’s visit intent for the landing pages. A Holistic SEO can understand the entities within a document, their attributes, and how these entities can affect a search engine’s perception of a document. If a search engine can’t recognize the entities within a document, it might be because of the broken grammar, or non-clear language within the document. Or, the wrong entities are used within a document, the content can be perceived differently by the Search Engine than it should be. To use the most related entities together with the most important attributes, sentence, and paragraph structure, a Holistic SEO can train the authors, and help Search Engines to have more information from the web, while making every content more factual, and informative for every user to improve the user experience.

The Named Entity Recognition guide, and article will be updated in the lights of new information and events over time.

- [Author](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#abh_about)
- [Recent Posts](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#abh_posts)

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

## 1 thought on “Named Entity Recognition: Definition, Examples, and Guide”

1. this artical is good but one

[Reply](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#comment-118670)


### Leave a Comment [Cancel reply](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/\#respond)

Comment

NameEmailWebsite

Save my name, email, and website in this browser for the next time I comment.

Δ

[Scroll back to top](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/# "Scroll back to top")

[Theoretical SEO](https://www.holisticseo.digital/theoretical-seo/)

## Named Entity Recognition: Definition, Examples, and Guide

by Koray Tuğberk GÜBÜRtime to read: 23 min

![](https://www.holisticseo.digital/wp-content/uploads/2021/09/seo-career-path.jpeg)

Theoretical SEO
SEO Career Path: How to start a Successful SEO Car…

![](https://www.holisticseo.digital/wp-content/uploads/2021/02/content-farm.jpg)

Theoretical SEO
Content Farming and Content Farm: How to Detect an…

- [0](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/# "Share on Facebook")
- [Share on Twitter](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/# "Share on Twitter")
- [0](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/# "Share on Linkedin")

[1](https://www.holisticseo.digital/theoretical-seo/named-entity-recognition/#comments)

✕

- Hi! Send your SEO Question.


![Holistic SEO](https://backend.chatbase.co/storage/v1/object/public/chat-icons/d795dd62-a437-45d9-8f3a-fc3b1f64e476/DioW-mj3dUiK7VlHnV6_F.jpg)