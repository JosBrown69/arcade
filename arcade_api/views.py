from .models import User, Game, Trophie, Clan, Membership, Trophier, Follower, Post
from rest_framework import generics
from .serializers import UserSerializer, GameSerializer, TrophieSerializer, ClanSerializer, MemberSerializer, AchieverSerializer, FollowerSerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class GetUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'user_id'

class GetUserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class FollowerView(generics.CreateAPIView):
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'user_id'

class FollowerListView(generics.ListAPIView):
    serializer_class = FollowerSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Follower.objects.filter(seguidor=user) 
    
class GetGameView(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'game_id'

class GetTrophieListView(generics.ListAPIView):
    queryset = Trophie.objects.all()
    serializer_class = TrophieSerializer
    permission_classes = [IsAuthenticated]

class GetTrophieView(generics.RetrieveAPIView):
    queryset = Trophie.objects.all()
    serializer_class = TrophieSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'trophie_id'

class AchieverView(generics.CreateAPIView):
    queryset = Trophier.objects.all()
    serializer_class = AchieverSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'trophie_id'

class GetClanListView(generics.ListAPIView):
    queryset = Clan.objects.all()
    serializer_class = ClanSerializer
    permission_classes = [IsAuthenticated]

class CreateClanView(generics.CreateAPIView):
    queryset = Clan.objects.all()
    serializer_class = ClanSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.validated_data['creator'] = self.request.user
        serializer.save()

class GetClanView(generics.RetrieveAPIView):
    queryset = Clan.objects.all()
    serializer_class = ClanSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'clan_id'

class BecomeMember(generics.CreateAPIView):
    queryset = Membership.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'clan_id'

class DeleteMember(generics.DestroyAPIView):
    serializer_class = MemberSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'member_id'

    def get_queryset(self):
        user = self.request.user
        return Membership.objects.filter(miembro=user)

class RetriveMembers(generics.ListAPIView):
    serializer_class = MemberSerializer
    permission_classes = [IsAuthenticated]
    queryset = Membership.objects.all()

class CreatePost(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'clan_id'

class GetPostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'clan_id'


"""
Metodos gerics

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

class ProductCreateAPIView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductUpdateAPIView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

class ProductDeleteAPIView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    lookup_field = 'pk'

"""

