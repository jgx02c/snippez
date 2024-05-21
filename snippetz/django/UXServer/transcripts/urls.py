from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.user, name='user'),
    path('userInfo/', views.userInfo, name='userInfo'),
    path('summary/<int:id>/', views.summary, name='summary'),
    path('projects/', views.projects, name='projects'),
    path('languages/', views. languages, name=' languages'),
    path('recordings/<int:id>/', views.recordings, name='recordings')
   

]