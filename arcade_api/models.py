from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    following = models.ManyToManyField('self', through='Follower', related_name='followers', blank=True, symmetrical=False)
    gender = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f'{self.username}'
    
class Follower(models.Model):
    seguidor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seguidor')
    siguiendo = models.ForeignKey(User, on_delete=models.CASCADE, related_name='siguiendo')

    def __str__(self):
        return f'{self.seguidor} siguiendo a {self.siguiendo}'
    
class Game(models.Model):
    game = models.CharField(max_length=40)
    record = models.PositiveIntegerField(default=0)
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='player', null=True, blank=True)

    def __str__(self):
        return f'{self.game}'
    
class Trophie(models.Model):
    trophie = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    achiever = models.ManyToManyField('User', through='Trophier',related_name='achiever')
    juego = models.ForeignKey('Game', on_delete=models.CASCADE, related_name='juego', null=True)
    metal = models.CharField(max_length=10, null=True)

    def __str__(self):
        return f'{self.juego}:{self.trophie}'
    
#Calling Trophier --> Achiever in other places
    
class Trophier(models.Model):
    gamer = models.ForeignKey(User, on_delete=models.CASCADE)
    trofeo = models.ForeignKey(Trophie, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.trofeo}: {self.gamer}'
    
class Clan(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    creator = models.ForeignKey('User', on_delete=models.CASCADE, related_name='creator')
    member = models.ManyToManyField('User', through="Membership", related_name='clans')
    posts = models.ManyToManyField('User', through='Post', related_name='posts' )

    def __str__(self):
        return f'{self.title}'
    
class Membership(models.Model):
    miembro = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    clan = models.ForeignKey(Clan, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.clan}: {self.miembro}'

class Post(models.Model):
    clan = models.ForeignKey(Clan, on_delete=models.CASCADE, null=True)
    person = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    content = models.TextField(blank=True)

    def __str__(self):
        return f'{self.clan}: {self.person}'