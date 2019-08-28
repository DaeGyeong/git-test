#! /usr/bin/python3.6
import sys
import os

WSGI_DIR = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, WSGI_DIR)

from run import app as application
