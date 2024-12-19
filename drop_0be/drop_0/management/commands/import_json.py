import os
import json
from django.core.management.base import BaseCommand
from drop_0.models import DropoutData, State

class Command(BaseCommand):
    help = 'Import dropout data from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('directory', type=str, help='The path to the CSV files to be imported')

    def handle(self, *args, **kwargs):
        directory = kwargs['directory']
        i=0
        for filename in os.listdir(directory):
            # check if file is csv
            if not filename.endswith('.json'):
                continue
            
            filepath = os.path.join(directory, filename)
            data=[]
            with open(filepath) as f:
                data = json.load(f)

            statename = 'National'
            state, created = State.objects.get_or_create(name=statename)
            
            for row in data:
                DropoutData.objects.create(
                    state=state,
                    location=row['Location'],
                    social_category=row['Social Category'],
                    year_end            =int(filename[:2]),
                    primary_girls       =float(row['Girls_1']),
                    primary_boys        =float(row['Boys_1']),
                    primary_overall     =float(row['Overall_1']),
                    upper_primary_girls =float(row['Girls_2']),
                    upper_primary_boys  =float(row['Boys_2']),
                    upper_primary_overall=float(row['Overall_2']),
                    secondary_girls     =float(row['Girls_3']),
                    secondary_boys      =float(row['Boys_3']),
                    secondary_overall   =float(row['Overall_3']),
                )
            i+=1
            
        self.stdout.write(self.style.SUCCESS('Data imported successfully from {} files'.format(i)))
