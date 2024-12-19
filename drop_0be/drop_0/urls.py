from django.urls import path
from .views import DropoutDataList, StateList

urlpatterns = [
    path('dropoutdata/', DropoutDataList.as_view(), name='dropoutdata-list'),
    path('states/', StateList.as_view(), name='state-list'),
]