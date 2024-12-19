from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import DropoutData, State
from .serializers import DropoutDataSerializer, StateSerializer

class DropoutDataList(APIView):
    def get(self, request, format=None):
        state_id = request.query_params.get('state', None)
        if state_id:
            try:
                state_id = int(state_id)
                queryset = DropoutData.objects.filter(state=state_id)
            except Exception as e:
                return Response({'error': 'Invalid state id'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            queryset = DropoutData.objects.all()
        serializer = DropoutDataSerializer(queryset, many=True)
        data = serializer.data
        grouped_data = {}
        for item in data:
            year = item['year_end']
            grouped_data.setdefault(year, []).append(item)
        return Response(grouped_data)
        

class StateList(APIView):
    def get(self, request, format=None):
        queryset = State.objects.all()
        states = {state.id: state.name for state in queryset}
        return Response(states)