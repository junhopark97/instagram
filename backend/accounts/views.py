from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny

from .serializers import RegisterSerializer, SuggestionUserSerializer


class RegisterView(CreateAPIView):
    model = get_user_model()
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)


class SuggestionListAPIView(ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = SuggestionUserSerializer
