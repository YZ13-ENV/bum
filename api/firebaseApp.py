import firebase_admin
from firebase_admin import firestore_async, auth
from firebase_admin import credentials

cred = credentials.Certificate(cert='api/service.json')
firebase_app = firebase_admin.initialize_app(cred)
db = firestore_async.client(app=firebase_app)
auth = auth.Client(app=firebase_app)