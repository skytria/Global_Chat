import firebase_admin
from firebase_admin import credentials, db
import time
import sys
from dotenv import load_dotenv
import os

load_dotenv()

KEY = os.getenv("KEY")
LINK = os.getenv("LINK")


cred = credentials.Certificate(KEY)
firebase_admin.initialize_app(cred, {
    "databaseURL":LINK
})

ref = db.reference("chat_global")

def nama():
    nama = input("masukan nama : ")
    return nama

def load_data():
    load_pesan_lama = ref.get()
    print("============PESAN LAMA============")
    for key,isi in load_pesan_lama.items():
        print(f"{isi["nama"]} : {isi["pesan"]}")

def listen(event):
    nama = event.data.get("nama","")
    pesan = event.data.get("pesan","")
    if nama and pesan:
        print(f"{nama} : {pesan}")

def masukan_pesan(nama):
    pesan = input("")
    if pesan == "exit":
        print("anda keluar dari chat")
        sys.exit()
    ref.push({
        "nama":nama,
        "pesan":pesan
    })

def login(nama):
    pesan = {
    "nama":nama,
    "pesan":"BERGABUNG KE DALAM CHAT"
    }
    ref.push(pesan)
