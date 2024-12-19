import os
import pandas as pd
from django.core.management.base import BaseCommand
from drop_0.models import DropoutData, State

class Command(BaseCommand):
    help = 'Import dropout data from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('directory', type=str, help='The path to the CSV files to be imported')

    def handle(self, *args, **kwargs):
        directory = kwargs['directory']

        for filename in os.listdir(directory):
            # check if file is csv
            if not filename.endswith('.csv'):
                continue
            
            csv_file = os.path.join(directory, filename)

            df = pd.read_csv(csv_file)

            statename = filename[:-7]
            
            for _, row in df.iterrows():
                state, created = State.objects.get_or_create(name=statename)
                DropoutData.objects.create(
                    state=state,
                    location=row.iloc[0],
                    social_category=row.iloc[1],
                    year_end            =int(filename[-6:-4]),
                    primary_girls       =float(row.iloc[2]),
                    primary_boys        =float(row.iloc[3]),
                    primary_overall     =float(row.iloc[4]),
                    upper_primary_girls =float(row.iloc[5]),
                    upper_primary_boys  =float(row.iloc[6]),
                    upper_primary_overall=float(row.iloc[7]),
                    secondary_girls     =float(row.iloc[8]),
                    secondary_boys      =float(row.iloc[9]),
                    secondary_overall   =float(row.iloc[10])
                )
            
        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
