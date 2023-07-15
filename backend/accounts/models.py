from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models
from django.shortcuts import resolve_url


class User(AbstractUser):
    MALE = 'M'
    FEMALE = 'F'
    GENDER_CHOICES = [
        (MALE, '남'),
        (FEMALE, '여'),
    ]

    follower_set = models.ManyToManyField('self', blank=True)
    following_set = models.ManyToManyField('self', blank=True)

    website_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(
        max_length=13,
        blank=True,
        validators=[RegexValidator(r'^010-?[1-9]\d{3}-?\d{4}$')],
    )
    gender = models.CharField(max_length=1, blank=True,
                              choices=GENDER_CHOICES)
    avatar = models.ImageField(
        blank=True, upload_to='accounts/avatar/%Y/%m/%d',
        help_text='48px * 48px 크기의 png/jpg 파일을 업로드해주세요.'
    )

    @property
    def name(self):
        return f'{self.first_name} {self.last_name}'.strip()

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url('pydenticon_image', self.username)
