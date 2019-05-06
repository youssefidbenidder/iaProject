from django.urls import path

from . import views

urlpatterns = [
    path('text', views.text_analytic, name='text_analytics'),
    path('twitter', views.twitter_analytic, name='twitter_analytic'),
]