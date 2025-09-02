// Konfigurasi Firebase (isi sesuai project kamu)
const firebaseConfig = {
  apiKey: "AIzaSyA7vc1JMhSTNcKVGpc8p87OXdynGrNa8bw",
  authDomain: "chat-e698a.firebaseapp.com",
  databaseURL: "https://chat-e698a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-e698a",
  storageBucket: "chat-e698a.firebasestorage.app",
  messagingSenderId: "937047900511",
  appId: "1:937047900511:web:5bd17f4a374483486b36ea",
  measurementId: "G-LM8N1BCMVS"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let username = "";

// Login user
function login() {
  const input = document.getElementById("username");
  username = input.value.trim();
  if (!username) {
    alert("Nama tidak boleh kosong!");
    return;
  }

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("chatBox").style.display = "block";

  // Kirim pesan join
  db.ref("chat_global").push({
    nama: username,
    pesan: "BERGABUNG KE DALAM CHAT"
  });

  loadMessages();
}

// Kirim pesan
function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (!message) return;

  db.ref("chat_global").push({
    nama: username,
    pesan: message
  });

  input.value = "";
}

// Load pesan lama + realtime listener
function loadMessages() {
  const messagesDiv = document.getElementById("messages");

  db.ref("chat_global").on("child_added", snapshot => {
    const data = snapshot.val();
    if (data) {
      const msg = document.createElement("div");
      msg.classList.add("message");
      msg.innerText = `${data.nama}: ${data.pesan}`;
      messagesDiv.appendChild(msg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  });
}
