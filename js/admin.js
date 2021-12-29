const login_form = document.getElementById("login-form");
const login_pseudo = document.getElementById("login");
const login_password = document.getElementById("password");
const messages_container = document.getElementById("messages");

const credentials = {
  login: "admin",
  password: "admin",
};

const add_message = (message) => {
  const new_message = document.createElement("div");
  const m_author = document.createElement("p");
  const m_email = document.createElement("p");
  const m_message = document.createElement("p");
  new_message.classList.add("message");
  new_message.appendChild(m_author);
  new_message.appendChild(m_email);
  new_message.appendChild(m_message);
  m_author.innerText = "Auteur: " + message.author;
  m_email.innerText = "Email: " + message.email;
  m_message.innerText = "Message: " + message.message;
  messages_container.appendChild(new_message);
};

const load_messages = () => {
  messages_container.style.display = "flex";
  let cookie = document.cookie;
  if (cookie === "") cookie = "messages=[]";
  messages = JSON.parse(cookie.split("=")[1]);
  messages.forEach((el) => {
    add_message(el);
  });
};

login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    login_pseudo.value === credentials.login &&
    login_password.value === credentials.password
  ) {
    login_form.style.display = "none";
    alert("Login success !");
    load_messages();
  } else {
    alert("Login failed !");
    login_form.reset();
  }
});
