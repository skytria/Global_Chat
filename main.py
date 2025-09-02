import data as dt
import time as tm
import os
import sys

def main():
    os.system("clear")
    nama = dt.nama()
    dt.login(nama)
    dt.load_data()

    print("============PESAN SAAT INI============")
    dt.ref.listen(dt.listen)

    while True:
        dt.masukan_pesan(nama)

if __name__ == "__main__":
    main()



