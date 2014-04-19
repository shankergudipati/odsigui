from django.shortcuts import render

import urllib2
import simplejson as json
from urllib import urlencode
import time
import json
import ast
from django.http import *
from django.conf import settings
import pdb




class Services:
     def __init__(self,service_id,service_name,service_tags):
         self.service_id = service_id
         self.service_name = service_name
         self.service_tags = service_tags

class TagClass():
     def __init__(self,service_id,service_tag,software_id_name):
         self.service_id=service_id
         self.service_tag=service_tag
         self.software_id_name=software_id_name

class ProductInfo:
     def __init__(self,service_id,service_tag,product_info_list):
         self.service_id=service_id
         self.service_tag=service_tag
         self.product_info_list=product_info_list




""" get_services() method returns the list of services avaialble in ODSI """
def get_services():
   
   request =  urllib2.Request(settings.SERVICES_URL+"services/ ")
   response = urllib2.urlopen(request) 
   return response


"""get_service_by_tag() method returns the tag list by taking the service_id and tag_name as its input """
def get_service_by_tag(service_id,tag_name):
   url = settings.TAGS_URL
   request=urllib2.Request(url+service_id+"/"+tag_name+"/")
   response = urllib2.urlopen(request) 
   return response






""" This method renders homepage to ODSI portal 
Creates a requestuest object calling responset api
Calls the responset api using urllib2 storesponse into a responseponse object
Reading the responseponse object and sorting it into a service object returns a single element list
Converts the single element list into a json object
Iterating through the service list obtained 
Renders the local variables to homepage.html"""
def homepage(request):
    #pdb.set_trace()
    response = get_services()
    list_service = []
    service=response.readlines()
    service_list = ast.literal_eval(service[0])
    for key in service_list:
        list_service.append(Services(key,service_list[key],get_tags_by_service(key)))
    total_list=total_tags(list_service)
    product_information=get_product_info(total_list)
    return render(request,"homepage.html",locals())

""" get_tags_by_service method returns the tags by taking the services """
def get_tags_by_service(service_id):
    request = urllib2.Request(settings.TAGS_BY_SERVICEID_URL+service_id+"/")
    response = urllib2.urlopen(request)
    service = response.readlines()
    for each_service in service:
        service_tag = ast.literal_eval(each_service)
        return service_tag

""" total_tags method returns the entire tags for the respective services """
def total_tags(list_service):
#    pdb.set_trace()
    total_list=[]
    try:
        for item in list_service:
           for item1 in item.service_tags:
               tag_1 = item1
               service_id1 = item.service_id
               response = get_service_by_tag(service_id1,tag_1)
               software_dictionary = response.readlines()
               #software_dictionary=ast.literal_eval(software_dictionary[0])
               software_dictionary = software_dictionary[0]
               json_acceptable_string = software_dictionary.replace("'", "\"")
               software_dictionary = json.loads(json_acceptable_string)
               total_list.append(TagClass(service_id1,tag_1,software_dictionary))
    finally:
        return total_list

def get_product_info(total_list):
    product_information=[]
    for item in total_list:
        if type(item.software_id_name) is dict:
            for key,value in item.software_id_name.iteritems():
                url=settings.PRODUCT_INFO_URL+item.service_id+"/"+key
                request = urllib2.Request(url)
 	        response = urllib2.urlopen(request)
                product_info = response.readlines()
                product_info_dictionary=ast.literal_eval(product_info[0])
                product_information.append(ProductInfo(item.service_id,item.service_tag,product_info_dictionary))
    return product_information











def homepage1(request):
    #pdb.set_trace()
    response = get_services()
    list_service = []
    service=response.readlines()
    service_list = ast.literal_eval(service[0])
    for key in service_list:
        list_service.append(Services(key,service_list[key],get_tags_by_service(key)))
    total_list=total_tags(list_service)
    product_information=get_product_info(total_list)
    return render(request,"homepage1.html",locals())








def submitdetails(request):
    import pdb
   # pdb.set_trace()
    service_id = request.POST.get('serviceid')
    product_id = request.POST.get('productid')
    product_name = request.POST.get('productname')
    machinename=request.POST.get('username')
    machinepassword=request.POST.get('password')
    operatingsystem=request.POST.get('os')
    machineip=request.POST.get('ipaddress')
    product_details=product_info(service_id,product_id)
    for key in product_details.keys():
        os=product_details[key][2]
        architecture=product_details[key][3]
        username="odsiuser"
        validate_result=validate(username,service_id,product_id,machineip,machinename,machinepassword,os,architecture)
    return render(request,"totaldetails.html",locals())





def validate(username,service_id,product_id,ip,machineusername,machinepassword,os,architecture):
#    url = "http://10.233.52.111:8001/validate"
#    pdb.set_trace()
    url="http://10.233.52.111:8001/request/"
    dic={"username":username,"service_id":service_id,"product_id":product_id,"machine_details":{"ip_address":ip,"machine_username":machineusername,"machine_password":machinepassword},"parameters":{},"os":os}
    jsondata = json.dumps(dic)
    req = urllib2.Request(url, \
                         headers = {

                                     "Content-Type": "application/json",
                                   },                        \
                         data = jsondata)
    f = urllib2.urlopen(req)
    response = f.read()
    res = json.loads(response)
    return res







def product_info(service_id,product_id):
     import pdb
 #pdb.set_trace()
     req = urllib2.Request("http://10.233.52.111:8001/products/"+service_id+"/"+product_id)
     res = urllib2.urlopen(req)
     product=res.readlines()
     product_infolist = ast.literal_eval(product[0])
     return product_infolist


























