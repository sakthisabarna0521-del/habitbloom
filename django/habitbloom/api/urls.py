from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import signup, login_user, get_user_info, HabitViewSet

router = DefaultRouter()
router.register('habits', HabitViewSet, basename='habit')

urlpatterns = [
    path('signup/', signup),
    path('login/', login_user),
    path('user/', get_user_info),
]

urlpatterns += router.urls