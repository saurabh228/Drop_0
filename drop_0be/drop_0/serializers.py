from rest_framework import serializers
from .models import DropoutData, State


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = '__all__'


class DropoutDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DropoutData
        fields = '__all__'

