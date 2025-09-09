from django.contrib import admin
from django.utils.html import format_html
from .models import Project, ProjectImage, Tag, ContactMessage
from django.conf import settings


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ['name']


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 0
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 100px; height: auto;" />', obj.image.url)
        return ""
    image_preview.short_description = "Preview"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'github_link', 'detail_url')
    search_fields = ['title']
    filter_horizontal = ('tags',)
    list_filter = ['tags']
    inlines = [ProjectImageInline]


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ('project', 'image_thumbnail')
    readonly_fields = ('image_thumbnail',)

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 80px; height: auto;" />', obj.image.url)
        return ""
    image_thumbnail.short_description = "Thumbnail"


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at',)


admin.site.site_header = getattr(settings, 'ADMIN_SITE_HEADER', 'Admin')
admin.site.site_title = getattr(settings, 'ADMIN_SITE_TITLE', 'Admin Portal')
admin.site.index_title = getattr(settings, 'ADMIN_INDEX_TITLE', 'Welcome')