from django.http import HttpResponse

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
import json

from .controller.twitter_analytics import AnalyseTwitter
from .controller.text_analytic import AnalyseText


@csrf_exempt
def text_analytic(request):
    data = json.loads(request.body.decode('utf-8'))
    obj = AnalyseText()
    #Analyse le paragraphe
    sentiment = obj.analyse_sentiments(data["text"])
    #Detecter la langue
    lang = obj.detect_lang(data["text"])
    date_response = {
        "sentiment": sentiment,
        "lang": lang
    }
    return HttpResponse(json.dumps(date_response), content_type='application/json')


@csrf_exempt
def twitter_analytic(request):
    data = json.loads(request.body.decode('utf-8'))
    obj = AnalyseTwitter()

    tweets = dict()
    if data["mode"] == "keyword":
        #extraire les tweets à partir d'un keyword
        tweets = obj.keyword_analyse(data["text"])
    else:
        #extraire les tweets d'un user spécifique
        tweets = obj.user_analyse(data["text"])
    #Analyser les tweets
    if tweets == {} :
        date_response = {
            "sentiment": "NotFound",
        }
    else:
        sentiment = obj.calculate_sentiment(tweets)
        date_response = {
            "sentiment": sentiment,
        }
    return HttpResponse(json.dumps(date_response), content_type='application/json')

