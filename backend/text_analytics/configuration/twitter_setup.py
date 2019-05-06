import tweepy

from .credentials import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_SECRET, ACCESS_TOKEN


def twitter_setup():

    # authentification et acceder utilisant les clés (credentials):
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

    # return API avec authentification
    api = tweepy.API(auth)

    return api

