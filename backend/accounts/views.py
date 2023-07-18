from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from .serializers import RegisterSerializer


class RegisterView(CreateAPIView):
    model = get_user_model()
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
