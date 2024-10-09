from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('docs/', include_docs_urls(title='arcade API', authentication_classes=[], permission_classes=[])),
    path('user/register/', views.CreateUserView.as_view(), name='register'),
    path('user/<int:user_id>/', views.GetUserView.as_view(), name='user'),
    path('user/<int:user_id>/follow/', views.FollowerView.as_view(), name='user'),
    path('unfollow/<int:follower_id>/', views.FollowerDelete.as_view(), name='unfollow'),
    path('user/following/', views.FollowerListView.as_view(), name='following'),
    path('users/', views.GetUserListView.as_view(), name='users'),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('game/<int:game_id>/', views.GetGameView.as_view(), name='game'),
    path('game/<int:game_id>/update_record', views.updateGameRecordView.as_view(), name='game_record'),
    path('games/', views.GetGamesView.as_view(), name='games'),
    path('trophies/', views.GetTrophieListView.as_view(), name='trophies'),
    path('trophie/<int:trophie_id>/', views.GetTrophieView.as_view(), name='trophie'),
    path('trophie/<int:trophie_id>/win_trophie/', views.AchieverView.as_view(), name='win'),
    path('clan/create/', views.CreateClanView.as_view(), name='clan_create'),
    path('clanes/', views.GetClanListView.as_view(), name='clanes'),
    path('clan/<int:clan_id>/', views.GetClanView.as_view(), name='clan'),
    path('clan/<int:clan_id>/post/', views.CreatePost.as_view(), name='clan_post'),
    path('clan/<int:clan_id>/posts/', views.GetPostList.as_view(), name='clan_posts'),
    path('clan/<int:clan_id>/become_member/', views.BecomeMember.as_view(), name='member'),
    path('member/<int:member_id>/delete/', views.DeleteMember.as_view(), name='member_delete'),
    path('members/', views.RetriveMembers.as_view(), name='getMember')
]
