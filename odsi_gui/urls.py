from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()
from odsiapp.views import *
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'odsi_gui.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^homepage/$',homepage),
    url(r'^homepage1/$',homepage1),

)
