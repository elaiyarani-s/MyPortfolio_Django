from django import forms
from .models import ContactMessage

class ContactForm(forms.ModelForm):
    honeypot = forms.CharField(required=False, widget=forms.HiddenInput)

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Your Name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Your Email'}),
            'subject': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Subject'}),
            'message': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Message', 'rows': 5}),
        }
    
    def clean_honeypot(self):
        if self.cleaned_data['honeypot']:
            raise forms.ValidationError("Bot detected.")
        return self.cleaned_data['honeypot']
