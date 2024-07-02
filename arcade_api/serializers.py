from rest_framework import serializers
from .models import User, Game, Trophie, Clan, Membership, Trophier, Follower, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'gender', 'following']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class FollowerSerializer(serializers.ModelSerializer):
    seguidor = UserSerializer(read_only=True)
    siguiendo = UserSerializer(read_only=True)

    def create(self, validated_data):
        view = self.context['view']
        siguiendo = User.objects.get(id=view.kwargs.get('user_id'))
        validated_data['siguiendo'] = siguiendo
        validated_data['seguidor'] = self.context.get('request').user
        return Follower.objects.create(**validated_data)

    class Meta:
        model = Follower
        fields = '__all__'
        depth = 2

class TrophieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trophie
        fields = '__all__'
        depth = 1
        extra_kwargs = {'achiever':{'read_only':True}}

class AchieverSerializer(serializers.ModelSerializer):
    gamer = UserSerializer(read_only=True)
    trofeo = TrophieSerializer(read_only=True)

    def create(self, validated_data):
        view = self.context['view']
        trofeo = Trophie.objects.get(id=view.kwargs.get('trophie_id'))
        validated_data['gamer']=self.context.get('request').user
        return Trophier.objects.create(trofeo=trofeo, **validated_data)
    
    class Meta:
        model = Trophier
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class ClanSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    def get_creator(self):
        return self.context.get('request').user

    class Meta:
        model = Clan
        depth = 1
        fields = '__all__'
        extra_kwargs = {'creator': {'read_only': True}}

class MemberSerializer(serializers.ModelSerializer):
    miembro = UserSerializer(read_only=True)
    clan = ClanSerializer(read_only=True)

    def create(self, validated_data):
        view = self.context['view']
        clan = view.kwargs.get('clan_id')
        validated_data['clan_id'] = clan
        validated_data['miembro'] = self.context.get('request').user
        return Membership.objects.create(**validated_data)

    class Meta:
        model = Membership
        fields = '__all__'
        depth = 2

class PostSerializer(serializers.ModelSerializer):
    clan = ClanSerializer(read_only=True)
    person = UserSerializer(read_only=True)

    class Meta:
        model = Post
        depth = 2
        fields = '__all__'

    def create(self, validated_data):
        view = self.context['view']
        clan = view.kwargs.get('clan_id')
        user = self.context.get('request').user
        content = self.context['request'].data.get('content')
        validated_data['clan_id'] = clan
        validated_data['person'] = user
        validated_data['content'] = content
        return Post.objects.create(**validated_data)
        
