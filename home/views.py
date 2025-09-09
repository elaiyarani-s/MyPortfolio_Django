from django.shortcuts import render, redirect
from django.urls import reverse
from .forms import ContactForm
from .models import Project, Tag

def index(request):
    projects = Project.objects.prefetch_related('images', 'tags').all()
    tags = Tag.objects.all()

    form = ContactForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect(reverse('index') + '#contact')

    return render(request, 'index.html', {
        'projects': projects,
        'tags': tags,
        'form': form,
    })


# def project(request):
#     projects = Project.objects.prefetch_related('images', 'tags').all()
#     return render(request, 'project.html', {'projects': projects})
