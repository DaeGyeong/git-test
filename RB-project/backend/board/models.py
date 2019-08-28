from django.db import models
from users import models as userModels


class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class PublicBoard(TimeStampModel):
    title = models.CharField(max_length=140)
    contents = models.TextField()
    creator = models.ForeignKey(userModels.User, null=True, related_name='creator')
    file = models.FileField(null=True)

    class Meta:
        ordering = ['-created_at']


class Comment(TimeStampModel):
    creator = models.ForeignKey(userModels.User, null=True)
    message = models.TextField(blank=True, null=True)
    board = models.ForeignKey(PublicBoard, blank=True, null=True, related_name='comments')
    
    class Meta:
        ordering = ['-updated_at']




# class BoardComment(models.Model):
#     created_at = models.DateTimeField()
#     updated_at = models.DateTimeField()
#     message = models.TextField(blank=True, null=True)
#     creator = models.ForeignKey('UsersUser', models.DO_NOTHING, blank=True, null=True)
#     board = models.ForeignKey('BoardPublicboard', models.DO_NOTHING, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'board_comment'
