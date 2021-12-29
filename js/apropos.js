const messages_file = "messages.json";
const prenom = document.getElementById("prenom");
const email = document.getElementById("email");
const message = document.getElementById("message");
const form = document.getElementById("message-form");

const send_message = (author, email, message) => {
  console.log(author, email, message);
  // TODO open message file and write the new message
  data = document.cookie;
  if (data === "") data = "messages=[]";
  console.log(data);
  messages = JSON.parse(data.split("=")[1]);
  messages.push({ author, email, message });
  document.cookie = "messages=" + JSON.stringify(messages);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  send_message(prenom.value, email.value, message.value);
  login_form.reset();
});
