from django.db import models

class State(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class SocialCatagoryChoices(models.TextChoices):
    SC = 'SC'
    ST = 'ST'
    OBC = 'OBC'
    General = 'General'

class DropoutData(models.Model):
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    social_category = models.CharField(max_length=10, choices=SocialCatagoryChoices, default=SocialCatagoryChoices.General)
    year_end = models.IntegerField()
    primary_girls = models.FloatField()
    primary_boys = models.FloatField()
    primary_overall = models.FloatField()
    upper_primary_girls = models.FloatField()
    upper_primary_boys = models.FloatField()
    upper_primary_overall = models.FloatField()
    secondary_girls = models.FloatField()
    secondary_boys = models.FloatField()
    secondary_overall = models.FloatField()
