from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils.timezone import now

from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Habit, HabitLog
from .serializers import HabitSerializer


# =========================
# 🔐 SIGNUP
# =========================
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({'error': 'All fields required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    refresh = RefreshToken.for_user(user)

    return Response({
        'message': 'Account created successfully',
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    })


# =========================
# 🔐 LOGIN
# =========================
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({'error': 'Invalid credentials'}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        'message': 'Login successful',
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    })


# =========================
# 👤 USER INFO
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email,
    })


# =========================
# 🌱 HABIT VIEWSET
# =========================
class HabitViewSet(viewsets.ModelViewSet):
    serializer_class = HabitSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        habit = self.get_object()
        today = now().date()

        # 🔒 Prevent duplicate completion same day
        if HabitLog.objects.filter(habit=habit, date=today).exists():
            return Response(
                {"message": "Already completed today"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ✅ Create log entry
        HabitLog.objects.create(
            habit=habit,
            date=today,
            completed=True
        )

        # 🔥 Update habit stats
        habit.streak += 1
        habit.total_completions += 1
        habit.update_plant_stage()  # if this method exists
        habit.save()

        return Response(HabitSerializer(habit).data)