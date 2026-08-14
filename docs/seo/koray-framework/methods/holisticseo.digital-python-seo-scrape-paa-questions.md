[Skip to content](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#content "Skip to content")

![How to Scrape PAA Questions on SERP via Python](https://www.holisticseo.digital/wp-content/uploads/2020/07/scrape-paa-question-on-serp-via-python.jpg)

“People Also Ask” Questions is one of the most important guides of Holistic SEOs. People Also Ask (PAA) Questions on the SERP shows the questions which are the most relevant with the search term. Understanding the search intent and user intent, different sides of the topic can be easier via PAA. In addition to these, Google has different terminology in their patents such as “Information Gain Score” or “Gibberish Score”. Information Gain Score is for determining the unique content with the added value while the Gibberish Score is for determining the content without any added value or function. In this guideline, we will use GQuestions Master Python Library for collecting the PAA Questions for determining queries.

If you want to learn more about Search Engine Theories and Concepts, I recommend you read our guidelines which tell about how Google generates questions from the text, unifying the queries, rewriting queries, creating content clusters, calculating content’s structure efficiency and determine the content’s authority. PAA is just one side of all these processes. You may see a screenshot below which shows how Google wants to add questions to its database from users.

![How Google wants questions from users](https://www.holisticseo.digital/wp-content/uploads/2020/08/google-wants-questions.png)Google’s experiment for taking questions from users, it is being performed in India for now.

Sometimes, on the internet, some questions or sub-topics may not have a valuable search volume, but still, writing about these topics can be valuable. Because Information Gain Score and Authority in a specific Knowledge Domain can be increased by these kinds of unique movements. Because giving the unique content and information to the Search Engine in a topic will create expertise in the eyes of Search Engine. To learn more, you may follow the anchor texts for reading relevant articles. After submitting a question to Google, you may see Google’s response to validate this.

![Google Explanation for Question Requirement](https://www.holisticseo.digital/wp-content/uploads/2020/08/google-questions.png)Google explains how your questions may help it to create a better SERP.

Note: Scraping PAA Questions is not allowed by Google. Google’s Robots.txt file doesn’t let crawlers to crawl PAA Questions. Scraping something not allowed may cause a lawsuit and also it is against TOS (Laws and Ethics of Scraping). But, if you use these information for making web a better and user-friendly place, for increasing your content’s quality, I believe this will be okay for Google. You may see my dialogue with John Mueller about this subject.

![John Mueller and Koray Tuğberk GÜBÜR](https://www.holisticseo.digital/wp-content/uploads/2020/08/john-mueller-koray-tugberk-gubur.png)A question of Koray Tuğberk Gübür and John Mueller’s answer to it.

After I have said, I am using this information for the good of users, John Mueller liked my answer. So, we can see the point of Google. Do not harm Google, do not harm users while using this guideline. Lastly, you should know that Gquestion Library is not an official Google Library.

To learn more about Python SEO, you may read the related guidelines:

01. [How to resize images in bulk with Python](https://www.holisticseo.digital/python-seo/resize-image/)
02. [How to perform TF-IDF Analysis with Python](https://www.holisticseo.digital/python-seo/tf-idf-analyse/)
03. [How to crawl and analyze a Website via Python](https://www.holisticseo.digital/python-seo/crawl-analyse-website/)
04. [How to perform text analysis via Python](https://www.holisticseo.digital/python-seo/perform-text-analysis/)
05. [How to test a robots.txt file via Python](https://www.holisticseo.digital/python-seo/verify-test-robots-txt-file/)
06. [How to Compare and Analyse Robots.txt File via Python](https://www.holisticseo.digital/python-seo/analyse-compare-robots-txt/)
07. [How to Categorize URL Parameters and Queries via Python?](https://www.holisticseo.digital/python-seo/categorize-url-parameter/)
08. [How to Perform a Content Structure Analysis via Python and Sitemaps](https://www.holisticseo.digital/python-seo/content-analysis-with-sitemaps/)
09. [How to Check Grammar and Language Errors with Python](https://www.holisticseo.digital/python-seo/check-fix-grammar-errors/)
10. [How to check Status Codes of URLs in a Sitemap via Python](https://www.holisticseo.digital/python-seo/check-status-codes/)
11. [How to Categorize Queries with Apriori Algorithm and Python](https://www.holisticseo.digital/python-seo/categorize-url-parameter/)
12. [How to check Status Codes of URLs in a Sitemap via Python](https://www.holisticseo.digital/python-seo/check-status-codes/)

**Contents of the Article**[show](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#)

1. [1.What is Gquestions Library for PAA Questions?](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#What-is-Gquestions-Library-for-PAA-Questions)
2. [2.How to Download the Gquestions Library?](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#How-to-Download-the-Gquestions-Library)
3. [3.How to Use Gquestions Library for Scraping PAA Questions?](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#How-to-Use-Gquestions-Library-for-Scraping-PAA-Questions)
4. [4.Importance of PAA Questions and How to Use Them?](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#Importance-of-PAA-Questions-and-How-to-Use-Them)

## What is Gquestions Library for PAA Questions?

Gquestions is a Python Library which uses Selenium, Pandas, Pytz, Numpy and urllib3 for collecting the PAA Questions.

## How to Download the Gquestions Library?

You need to install the dependencies of the Gquestions first. You may use the code below to download all dependencies. But, you also should know where to use this code. First, you should go to the [https://github.com/nittolese/gquestions](https://github.com/nittolese/gquestions) address and download the necessary files. When you open the file, you will see “requirements.txt” in it.

![Gquestions Python Package](https://www.holisticseo.digital/wp-content/uploads/2020/08/files-of-gquestions.png)Files in the Gquestions Python Package.

Open your terminal as administrator here and write the code below.

```
pip install -r requirements.txt
```

![Gquestions Installation](https://www.holisticseo.digital/wp-content/uploads/2020/08/install-requirements.png)Installation screenshot of the Gquestions.

Now, you have downloaded the Gquestions and also necessary dependencies.

## How to Use Gquestions Library for Scraping PAA Questions?

After these two simple questions and answers, we may begin our brief guideline. Gquestions can be used over CLI (Command Line Prompt). To use it correctly, you should go to the folder you have downloaded the Gquestions in your system. You may use “cd /path/pat\_level\_2” command to go to the necessary location. But before this step, I need to warn you about one more thing. If you didn’t use Selenium or install the Selenium before, you may not use the Gquestion as it should.

In Gquestions Library, we use Chromium via Selenium. To controll the chrome in headless mode, you need to download the necessary Chromedriver. From [https://chromedriver.chromium.org/](https://chromedriver.chromium.org/) address, you may download the necessary version. I recommend you to download current stable version.

![Chrome Driver Downloading](https://www.holisticseo.digital/wp-content/uploads/2020/08/chrome-webdriver.png)You should download the “stable release” for more reliable usage.

After downloading the necessary file, open a new folder in your “C:\\” path. For instance: I have put the name of the file as “webdrivers” like below:

![Chromedriver.exe](https://www.holisticseo.digital/wp-content/uploads/2020/08/chrome-drievr-installing.png)Chrome Web Driver Installation into local machine.

Now, you need to add this folder into your Path. If you don’t know what is Path in Windows System or how to add some program into path, I recommend you to read our guidelines. In this article, I won’t give so much details about adding a variable into the path, but simply you may follow the processes below:

- Click to the start and type into search “System variables” and click the first result
- Click Environment Variables
- In both of “Variables for Users” and “Variables for System” click to the “PATH”.
- Click New, copy/paste your ChromeDriver.exe file’s path there and save.

You may see the most of the steps here.

![How to add Chromedriver into the Path?](https://www.holisticseo.digital/wp-content/uploads/2020/08/chromedriver-adding-path.png)How to add Chromedriver into the Path?

Now, I believe even if you have zero coding experience, with these details and our guidelines which try to prevent all possible errors, you will succeed it. Let’s continue, we are ready to use Gquestions now.

First, use the “cd” command to come to the Gquestions-master Library’s folder in CMD or open the CMD in that folder.

![CMD Usage for Python](https://www.holisticseo.digital/wp-content/uploads/2020/08/cd-command-cmd.png)We have used the CD Command in CMD so that we can enter into the necessary folder.

The necessary code for creating a scraping process below:

```
python gquestions.py query <keyword> (en|es) [depth <depth>] [--csv] [--headless]
```

- “Python” part is for using the Python environment
- “gquestions.py” part is for making the main scripts work.
- “Keyword” attribute is for determining the query which will be scrape about.
- “(en\|es)” attribute is for determining the search activity’s language.
- “Depth” attribute is for determining how many times the scraper will continue to dig in PAA Questions.
- “CSV” attribute is for determining output file’s extension.
- “Headless” attribute is for determining whether the scraper should use graphical interface of Chrome or not.

Let’s make an example use.

python gquestions.py query “creatine” en depth 1

After the starting code, the browser will open and it will start to scrape all questions like below.

![Gquestions Scraping People Also Asked for Questions](https://www.holisticseo.digital/wp-content/uploads/2020/08/scraping-questions-on-google-serp.png)We have started to scrape the Google People Also Asked for Questions via Gquestions.

You may see how the browser work with Selenium without “headless” mode in automatic mode.

You may see that our script uses Google Chrome to script the data, it clicks the questions to open the tab and takes the information needed.

Now let’s check our results.

Since, we didn’t add the “–csv” attribute to the our code, we won’t get CSV Output, but we have a better structured and logical question tree.

You may use contextual tree of the output in a visual way.

We can see here all of the PAA questions in a hierarchy and contextual order. Like in our [**PyTrend Guideline for SEO**](https://www.holisticseo.digital/python-seo/google-trends/), with Gquestions-master, we can simply see the users thinking ways, information need, their concerns, desires, search journeys, and important points for them. Using Python or other programming languages to understand users with a broader perspective is a must for Holistic SEO. We are writing these guidelines with detail and such a error preventive methodology so that coding skills can be a permanent necessity for SEO. Now, let’s get our CSV Output.

![CSV Output for People Also Ask for Questions](https://www.holisticseo.digital/wp-content/uploads/2020/08/csv-output-for-questions.png)CSV Output view for People Also Asked for Questions.

The logical structure exist in CSV to. If you don’t know what to do in Gquestion-master, you should simply use the “python gquestion.py -h” command. You may see the related visual below.

![Gquestions.py -h command output](https://www.holisticseo.digital/wp-content/uploads/2020/08/h-command.png)You can see all the necessary examples and variations for usage of Gquestions Python Module.

## Importance of PAA Questions and How to Use Them?

PAA Questions are the insights to see what users think and how they think. PAA Questions show how a topic can be detailed, also in this Guideline, we only used one query which is “creatine”. We also might use “creatine acne” or “creatine power” queries to see what else users think, wonder and ask. We also may scrape the answers, title’s of the answer pages to see how to create a better content strategy. As Holistic SEOs, we always believe the difference of non-known and non-tried methodologies. With classical approaches and traditional SEO methods, in 2020 and beyond, SEO Projects can’t create amazing success stories. Holistic SEO should know coding, data science, analytical thinking and marketing, branding along with more.

We will continue to improve our guideline for using Gquestions.

- [Author](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#abh_about)
- [Recent Posts](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#abh_posts)

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

## 8 thoughts on “How to Scrape PAA Questions on SERP via Python for SEO”

1. Wow



So perfect

[Reply](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#comment-26136)

   - Thank you, Ale.

     [Reply](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#comment-26387)
2. Hi koray,


Bu konuda seo geri dönüşü, kopya içerik tespiti ve adsense reklam başarısı konusunda bana bilgi yorumu yazar mısın? şimdiden teşekkürler.

[Reply](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#comment-27011)

3. I was looking for copper and found gold. Amazing explanation Koray!

[Reply](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#comment-47660)

   - Thank you so much, Leo!

     [Reply](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#comment-57690)
4. Thank You, Sir, But I tried this method, and it’s not working.

[Reply](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#comment-67534)

   - Hello Akash,



     What is the error message that you get from the code editor?

     [Reply](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#comment-68256)
5. Thanks for a great tool. Only one suggestion. Please, renew the requirements. These are outdated now..

[Reply](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#comment-115665)


### Leave a Comment [Cancel reply](https://www.holisticseo.digital/python-seo/scrape-paa-questions/\#respond)

Comment

NameEmailWebsite

Save my name, email, and website in this browser for the next time I comment.

Δ

[Scroll back to top](https://www.holisticseo.digital/python-seo/scrape-paa-questions/# "Scroll back to top")

[Python SEO](https://www.holisticseo.digital/python-seo/)

## How to Scrape PAA Questions on SERP via Python for SEO

by Koray Tuğberk GÜBÜRtime to read: 6 min

![](https://www.holisticseo.digital/wp-content/uploads/2020/07/check-status-codes-of-urls-via-python-for-seo.jpg)

Python SEO
How to Check Status Codes of URLs in a Sitemap via…

![](https://www.holisticseo.digital/wp-content/uploads/2020/07/pytrend-guideline-for-seo-analysis.jpg)

Python SEO
PyTrend Guideline: Create Dashboard for Google Tre…

- [0](https://www.holisticseo.digital/python-seo/scrape-paa-questions/# "Share on Facebook")
- [Share on Twitter](https://www.holisticseo.digital/python-seo/scrape-paa-questions/# "Share on Twitter")
- [0](https://www.holisticseo.digital/python-seo/scrape-paa-questions/# "Share on Linkedin")

[8](https://www.holisticseo.digital/python-seo/scrape-paa-questions/#comments)