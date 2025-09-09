from django.db import models
from django.utils.html import format_html


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    class Meta:
        verbose_name_plural = "Tags"
    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    github_link = models.URLField(blank=True)
    detail_url = models.URLField(blank=True)
    tags = models.ManyToManyField(Tag, related_name='projects', blank=True)

    class Meta:
        ordering = ['-id'] 

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='projects/gallery/')

    def __str__(self):
        return f"Image for {self.project.title} ({self.image.name})"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=150)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email})"