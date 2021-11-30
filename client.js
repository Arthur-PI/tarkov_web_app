let url =
  "https://tarkov-market.com/api/v1/items/all?&x-api-key=Cgi4Dt1f4hCO4xTN";

let items = [];

fetch(url).then(function(response) {
  response.text().then(function(text) {
    JSON.parse(text).forEach((element, index) => {
      if (index < 20) {
        addItems(element);
      }
      items.push(element);
    });
  });
});

function addItems(data) {
  /*
       <div class="item">
          <img src="https://cdn.glitch.me/4132c70b-5a02-42f3-9e09-316dc9c35ecc%2F7169928a-6328-45f3-bb05-8dca637842d5.image.png?v=1637432211601" />
          <p>
            blablablabla
          </p>
          <p>
            blablablabla
          </p>
        </div>
      */
  const container = document.getElementById("items");

  /*
  var item = document.createElement("div");
  item.classList.add("item");
  var image = new Image();
  image.src = data.icon;
  image.style.width = '100%'
  image.style.height = 'auto'
  var p = document.createElement("p");
  p.innerHTML = data.name;
  item.appendChild(image);
  item.appendChild(p);
  */

  //item
  var item = document.createElement("div");
  item.classList.add("item");

  //title
  var title = document.createElement("div");
  title.classList.add("title");
  var h1 = document.createElement("h3");
  h1.innerHTML = data.name;
  title.appendChild(h1);

  //price
  var price = document.createElement("div");
  price.classList.add("price-container");
  //1
  var price1 = document.createElement("div");
  price1.classList.add("price-block");
  var info1 = document.createElement("div");
  info1.innerHTML = "Prix";
  var info2 = document.createElement("div");
  info2.innerHTML = data.price + " ₽";
  info2.classList.add("price");
  var info3 = document.createElement("div");
  info3.innerHTML = "(Dernier prix le plus bas)";
  price1.appendChild(info1);
  price1.appendChild(info2);
  price1.appendChild(info3);
  //2
  var price2 = document.createElement("div");
  price2.classList.add("price-block");
  var info21 = document.createElement("div");
  info21.innerHTML = "Prix par slots";
  var info22 = document.createElement("div");
  info22.innerHTML = data.price / data.slots + " ₽";
  info22.classList.add("price");
  var info23 = document.createElement("div");
  info23.innerHTML = data.slots + "(slots)";
  price2.appendChild(info21);
  price2.appendChild(info22);
  price2.appendChild(info23);
  //3
  var price3 = document.createElement("div");
  price3.classList.add("price-block");
  var info31 = document.createElement("div");
  info31.innerHTML = "Prix moyen 24h";
  var info32 = document.createElement("div");
  info32.innerHTML = data.avg24hPrice + " ₽";
  info32.classList.add("price");
  var info33 = document.createElement("div");
  info33.innerHTML = "Prix moyen 7 jours";
  var info34 = document.createElement("div");
  info34.innerHTML = data.avg7daysPrice + " ₽";
  info34.classList.add("price");
  price3.appendChild(info31);
  price3.appendChild(info32);
  price3.appendChild(info33);
  price3.appendChild(info34);

  //4
  var price4 = document.createElement("div");
  price4.classList.add("price-block");
  var info41 = document.createElement("div");
  info41.innerHTML = "Différence de prix 24h";
  var info42 = document.createElement("div");
  info42.innerHTML = data.diff24h + " %";
  info42.classList.add("price");
  if (data.diff24h < 0) {
    info42.style.color = "red";
  } else {
    info42.style.color = "green";
  }
  var info43 = document.createElement("div");
  info43.innerHTML = "Différence de prix 7 jours";
  var info44 = document.createElement("div");
  info44.innerHTML = data.diff7days + " %";
  info44.classList.add("price");
  if (data.diff7days < 0) {
    info44.style.color = "red";
  } else {
    info44.style.color = "green";
  }
  price4.appendChild(info41);
  price4.appendChild(info42);
  price4.appendChild(info43);
  price4.appendChild(info44);

  //item
  price.appendChild(price1);
  price.appendChild(price2);
  price.appendChild(price3);
  price.appendChild(price4);
  item.appendChild(title);
  item.appendChild(price);

  //img
  var img_content = document.createElement("div");
  img_content.classList.add("img_content");
  var imgIcon = new Image();
  imgIcon.src = data.img;
  imgIcon.classList.add("icon");
  var imgBack = new Image();
  imgBack.src = data.imgBig;
  imgBack.classList.add("back");
  img_content.appendChild(imgIcon);
  img_content.appendChild(imgBack);

  //itemcard
  var item_card = document.createElement("div");
  item_card.classList.add("item_card");
  item_card.appendChild(item);
  item_card.appendChild(img_content);

  container.appendChild(item_card);
}

document.getElementById("envoi").addEventListener("click", event => {
  event.preventDefault(); // stop our form submission from refreshing the page
  console.log(document.getElementById("search").value);

  const e = document.getElementById("items");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }

  items.forEach((element, index) => {
    if(element.name.includes(document.getElementById("search").value)){
      addItems(element);
      console.log(element.name)
    }
  });
});

document.getElementById("search").addEventListener("keydown", event => {
  if (event.keyCode === 13) {
    //checks whether the pressed key is "Enter"
    const e = document.getElementById("items");
    var child = e.lastElementChild;
    while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }

    items.forEach((element, index) => {
    if(element.name.toLowerCase().includes(document.getElementById("search").value.toLowerCase())){
      addItems(element);
      console.log(element.name)
    }
  });
  }
});
