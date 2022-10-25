from django.http import HttpResponse
from django.shortcuts import render
from datetime import date
from bmstu_lab.models import *


tmp_data = {
'date': {
            'current_date': date.today()
        },
'data': {
    'mangas': [
        {'name': 'MyOwnManga', 'score': 9.8},
        {'name': 'Berserk', 'score': 9.46},
        {'name': 'JoJo no Kimyou na Bouken Part 7: Steel Ball Run', 'score': 9.27},
        {'name': 'One Piece', 'score': 9.19}
    ]
}
}


def hello(request):
    return render(request, 'index.html', tmp_data)


def GetMangaList(request):

    return render(request, 'manga_list.html', {
        'manga_list': Manga.objects.all()
    })


def base(request):
    return render(request, 'base.html')


def GetManga(request, id):
    data = {
        'manga': Manga.objects.filter(id=id)[0]
    }
    try:
        data['stock'] = Stock.objects.filter(id_manga=id)[0]
    except:
        data['stock'] = 'null'
    return render(request, 'manga.html', data)

