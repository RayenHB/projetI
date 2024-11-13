from django.contrib import admin
from .models import User, Prestatire, Client, Service
from django.conf import settings
from django.core.mail import send_mail

class PrestatireAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_approved')  # Display approval status
    list_filter = ('is_approved',)  # Filter by approval status
    actions = ['approve_prestataires', 'refuse_prestataires']  # Custom actions for approval/refusal

    def approve_prestataires(self, request, queryset):
        """Action to approve selected prestataires"""
        queryset.update(is_approved=True)  # Set `is_approved` to True for approval
        self.message_user(request, "Selected prestataires have been approved.")

        # Send email to approved prestataires
        for prestataire in queryset:
            send_mail(
                'Your account has been approved',
                'Congratulations! Your prestataire account has been approved by the admin.',
                settings.DEFAULT_FROM_EMAIL,
                [prestataire.user.email],
                fail_silently=False,
            )

    def refuse_prestataires(self, request, queryset):
        """Action to refuse selected prestataires"""
        queryset.update(is_approved=False)  # Keep `is_approved` as False for refusal
        self.message_user(request, "Selected prestataires have been refused.")

        # Send email to refused prestataires
        for prestataire in queryset:
            send_mail(
                'Your account has been refused',
                'Unfortunately, your prestataire account has been refused by the admin.',
                settings.DEFAULT_FROM_EMAIL,
                [prestataire.user.email],
                fail_silently=False,
            )

    approve_prestataires.short_description = 'Approve selected prestataires'
    refuse_prestataires.short_description = 'Refuse selected prestataires'

# Register the models with appropriate admin classes
admin.site.register(User)  # Default admin for User
admin.site.register(Prestatire, PrestatireAdmin)  # Use custom admin for Prestatire
admin.site.register(Client)
admin.site.register(Service)
