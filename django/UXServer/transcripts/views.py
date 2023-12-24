from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json

# Create your views here.

def user(request):
    
    data = [
        {"username" : "joshua", "password" : "goodman", "userID": 1 }
    ]

    return JsonResponse(data, safe=False)

def userInfo(request):
    
    dataOne = [
        {"userID": 1, "firstName": "joshua", "lastName": "goodman", "accountCreationDate": "12/24/67", "address": "you thought"}
    ]

    return JsonResponse(dataOne, safe=False)

def summary(request, id):
    
    dataTwo = [
        {"summaryID": 1, "typeID": "negative", "statementID": 1, "quoteID": 0, "lastEditDate": "12/19/23", "noteID": 0, "statement": "This is a statement, it is statement 1"},
        {"summaryID": 1, "typeID": "positive", "statementID": 2, "quoteID": 1, "lastEditDate": "12/19/23", "noteID": 1, "statement": "This is a statement, it is statement 2"},
        {"summaryID": 1, "typeID": "negative", "statementID": 3, "quoteID": 2, "lastEditDate": "12/19/23", "noteID": 2, "statement": "This is a statement, it is statement 3"},
        {"summaryID": 1, "typeID": "negative", "statementID": 4, "quoteID": 3, "lastEditDate": "12/19/23", "noteID": 3, "statement": "This is a statement, it is statement 4"},
        {"summaryID": 1, "typeID": "positive", "statementID": 5, "quoteID": 4, "lastEditDate": "12/19/23", "noteID": 4, "statement": "This is a statement, it is statement 5"},
        {"summaryID": 1, "typeID": "positive", "statementID": 6, "quoteID": 5, "lastEditDate": "12/19/23", "noteID": 5, "statement": "This is a statement, it is statement 6"},
        {"summaryID": 1, "typeID": "positive", "statementID": 7, "quoteID": 6, "lastEditDate": "12/19/23", "noteID": 6, "statement": "This is a statement, it is statement 7"},
        {"summaryID": 1, "typeID": "positive", "statementID": 8, "quoteID": 7, "lastEditDate": "12/19/23", "noteID": 7, "statement": "This is a statement, it is statement 8"},
    ]

    # Get the projectID from the request parameters
    summary_id = (id)

    # Ensure projectID is provided in the request
    if summary_id is None:
        return JsonResponse({"error": "projectID is required"}, status=400)

    # Convert project_id to int for comparison
    summary_id = int(summary_id)

    # Filter data based on projectID
    filtered_data = [recording for recording in dataTwo if recording.get('summaryID') == summary_id]


    return JsonResponse(filtered_data, safe=False)

def projects(request):
    
    dataThree = [
        {"projectID": 1, "userID": 1, "status": "inprogress", "collaboration": "false", "collabarationID": 0, "uploadDate": "10/16/2020", "projectDueDate": "10/24/2022", "projectName": "one"},
        {"projectID": 2, "userID": 1, "status": "inprogress", "collaboration": "false", "collabarationID": 0, "uploadDate": "10/16/2020", "projectDueDate": "10/24/2022", "projectName": "two"},
        {"projectID": 3, "userID": 1, "status": "inprogress", "collaboration": "false", "collabarationID": 0, "uploadDate": "10/16/2020", "projectDueDate": "10/24/2022", "projectName": "three"},
        {"projectID": 4, "userID": 1, "status": "inprogress", "collaboration": "false", "collabarationID": 0, "uploadDate": "10/16/2020", "projectDueDate": "10/24/2022", "projectName": "four"},
        {"projectID": 5, "userID": 1, "status": "inprogress", "collaboration": "false", "collabarationID": 0, "uploadDate": "10/16/2020", "projectDueDate": "10/24/2022", "projectName": "five"},
        {"projectID": 6, "userID": 1, "status": "inprogress", "collaboration": "false", "collabarationID": 0, "uploadDate": "10/16/2020", "projectDueDate": "10/24/2022", "projectName": "six"},
        {"projectID": 7, "userID": 1, "status": "inprogress", "collaboration": "false", "collabarationID": 0, "uploadDate": "10/16/2020", "projectDueDate": "10/24/2022", "projectName": "seven"},
        {"projectID": 8, "userID": 1, "status": "inprogress", "collaboration": "false", "collabarationID": 0, "uploadDate": "10/16/2020", "projectDueDate": "10/24/2022", "projectName": "eight"},
        {"projectID": 9, "userID": 1, "status": "inprogress", "collaboration": "false", "collabarationID": 0, "uploadDate": "10/16/2020", "projectDueDate": "10/24/2022", "projectName": "nine"},
    ]

    return JsonResponse(dataThree, safe=False)




def recordings(request, id):
    
    dataFour = [
        {"snippetID": 1, "typeID": "JS", "userID": 1, "snippetName": "Recording 1", "snippetDescription": ".mp3", "snippetCodes": ["two","one"], "snippetWriteups": ["one", "two"], "snippetDate": "10/16/2022", "snippetSource": "Self", "snippetNumberOfProjectsUsed": 3 },
         {"snippetID": 2, "typeID": "Python", "userID": 1, "snippetName": "Recording 1", "snippetDescription": ".mp3", "snippetCodes": ["two","one"], "snippetWriteups": ["one", "two"], "snippetDate": "10/16/2022", "snippetSource": "Self", "snippetNumberOfProjectsUsed": 3 },
          {"snippetID": 3, "typeID": "HTML", "userID": 1, "snippetName": "Recording 1", "snippetDescription": ".mp3", "snippetCodes": ["two","one"], "snippetWriteups": ["one", "two"], "snippetDate": "10/16/2022", "snippetSource": "Self", "snippetNumberOfProjectsUsed": 3 },
           {"snippetID": 4, "typeID": "CSS", "userID": 1, "snippetName": "Recording 1", "snippetDescription": ".mp3", "snippetCodes": ["two","one"], "snippetWriteups": ["one", "two"], "snippetDate": "10/16/2022", "snippetSource": "Self", "snippetNumberOfProjectsUsed": 3 },
    ]

 # Get the projectID from the request parameters
    project_id = (id)

    # If project_id is 0, return all items
    if project_id == 0:
        return JsonResponse(dataFour, safe=False)

    # Ensure projectID is provided in the request
    if project_id is None:
        return JsonResponse({"error": "projectID is required"}, status=400)

    # Convert project_id to int for comparison
    project_id = int(project_id)

    # Filter data based on projectID
    filtered_data = [recording for recording in dataFour if recording.get('projectID') == project_id]

    return JsonResponse(filtered_data, safe=False)