from django.conf.urls import patterns, url
from . import feeds


urlpatterns = patterns('blog.views',
    url(r'^$', 'list_posts',
        name='blog_list_posts'),
    url(r'^view/(?P<slug>[-a-zA-Z0-9]+)/$', 'view_post',
        name='blog_view_post'),
    url(r'^rss/', feeds.PostFeed(), name='blog_feed'),
)

