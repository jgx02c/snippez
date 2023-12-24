from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.
# appname/views.py

from rest_framework import generics


# Create your views here.

def api(request):
    
    data = [
        {"quoteID": 1, "quote": "Change the add to cart button button style", "quoteTitle": "Change the add to cart button button style", "redQuote": ["“Oh, I didn’t even see that”", "Maybe it should be a brighter color", "I skipped that"], "greenQuote": ["green quote", "black quote"]},
        {"quoteID": 2, "quote": "john", "quoteTitle": "Title 1", "redQuote": ["red quote", "white Quote"], "greenQuote": ["green quote", "black quote"]},
        {"quoteID": 3, "quote": "john", "quoteTitle": "Title 1", "redQuote": ["red quote", "white Quote"], "greenQuote": ["green quote", "black quote"]},
        {"quoteID": 4, "quote": "john", "quoteTitle": "Title 1", "redQuote": ["red quote", "white Quote"], "greenQuote": ["green quote", "black quote"]},
        {"quoteID": 5, "quote": "john", "quoteTitle": "Title 1", "redQuote": ["red quote", "white Quote"], "greenQuote": ["green quote", "black quote"]},
    ]

    return JsonResponse(data, safe=False)