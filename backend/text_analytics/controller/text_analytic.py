from textblob import TextBlob


class AnalyseText:

    @staticmethod
    def analyse_sentiments(words):
        #Utiliser TextBlob pour detecter la polarity de sentiments
        analyse = TextBlob(words)
        return 100 * (analyse.sentiment.polarity + 1) / 2

    @staticmethod
    def detect_lang(words):
        #Utiliser TextBlob pour detecter la langue de text
        analyse = TextBlob(words)
        return analyse.detect_language()
