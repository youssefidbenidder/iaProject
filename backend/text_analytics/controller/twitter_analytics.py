from textblob import TextBlob

from ..configuration.twitter_setup import twitter_setup


class AnalyseTwitter:

    #Creation de l'extractor
    extractor = twitter_setup()

    def keyword_analyse(self, query):
        #extraire les tweets concernant un keyword
        results = self.extractor.search(q=query)
        return results

    def user_analyse(self, name):
        #extraire les tweets d'un utilisateur
        results = self.extractor.user_timeline(id=name, count=100)
        return results

    @staticmethod
    def calculate_sentiment(tweets):
        #clacul de la polarity de sentiment
        sentiment = 0
        if len(tweets) == 0:
            return {}
        for tweet in tweets:
            temp = TextBlob(tweet.text)
            sentiment = sentiment + 100 * (temp.sentiment.polarity + 1) / 2
        return sentiment / len(tweets)

