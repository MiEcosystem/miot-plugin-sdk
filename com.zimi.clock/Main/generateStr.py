#!/usr/bin/env python
# #coding=utf-8
import sys
import os
import string

path = os.getcwd()
files= os.listdir(path) #得到文件夹下的所有文件名称
importTemplate = "import {} from '{}';\n"
rootTemplate = "{}: {},\n"
str1 = ""
str2 = ""
filepath = "./"
for file in files: #遍历文件夹
    filepath += file
    if os.path.isdir(file):
        subfiles = os.listdir(path+"/"+file)
        for subfile in subfiles: #遍历文件夹
            filename = os.path.splitext(subfile)[0]
            str1 += importTemplate.format(filename,filepath + '/' + filename)
            str2 += rootTemplate.format(filename,filename)
    else:
        filename = os.path.splitext(file)[0]
        str1 += importTemplate.format(filename,'./' + filename)
        str2 += rootTemplate.format(filename,filename)
    filepath = './'
print(str1)
print(str2)